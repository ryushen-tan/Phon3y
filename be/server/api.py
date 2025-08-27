from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import os
import requests
from allosaurus.app import read_recognizer
from werkzeug.utils import secure_filename
from services.transcription_service import transcribe_uploaded_file
from utils.ngrok import fetch_public_url, NgrokError
from services.mouth_service import FaceMeshDetector

# instantiate a single detector for the app
_face_mesh_detector = FaceMeshDetector()
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)

limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)
limiter.init_app(app) 

# Enable CORS for production and local development (allow localhost dev server origins)
CORS(app, resources={r"/*": {"origins": ["https://www.p3y.app", "http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"]}})
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100MB

UPLOAD_FOLDER = os.path.join(os.path.expanduser("~"), "Desktop", "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True) 

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    """Endpoint: receives uploaded audio as form file 'audio', returns JSON transcription."""
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files['audio']
    if audio_file.filename == '':
        return jsonify({"error": "Empty file name"}), 400

    try:
        transcription = transcribe_uploaded_file(audio_file, upload_folder=UPLOAD_FOLDER)
    except Exception as e:
        # Keep error messages for debugging but do not leak internal state
        app.logger.exception("Transcription failed")
        return jsonify({"error": f"Transcription failed: {str(e)}"}), 500

    return jsonify({"transcription": transcription})

@app.route('/get-ngrok-url', methods=['GET'])
def get_ngrok_url():
    """Fetches the public Ngrok URL dynamically"""
    try:
        public_url = fetch_public_url()
        if not public_url:
            return jsonify({"error": "No active Ngrok tunnels found"}), 404
        return jsonify({"ngrok_url": public_url})
    except NgrokError as e:
        app.logger.exception("Ngrok API fetch failed")
        return jsonify({"error": f"Failed to fetch Ngrok URL: {str(e)}"}), 500


@app.route('/mouth/track', methods=['POST'])
@limiter.exempt
def mouth_track():
    """Accepts a single frame under form key 'frame' (image file) and optional 'session_id'.

    Processes it with MediaPipe FaceMesh and persists mouth landmarks. Returns path to stored JSON.
    """
    if 'frame' not in request.files:
        return jsonify({'error': 'No frame provided'}), 400

    frame = request.files['frame']
    session_id = request.form.get('session_id')

    try:
        image_bytes = frame.read()
        landmarks = _face_mesh_detector.process_image_bytes(image_bytes)
        if landmarks is None:
            return jsonify({'error': 'No face detected'}), 422

        path = _face_mesh_detector.save_frame_landmarks(landmarks, session_id=session_id)
        return jsonify({'saved_path': path, 'landmarks': landmarks}), 200
    except Exception as e:
        app.logger.exception('Failed processing frame')
        return jsonify({'error': f'Failed to process frame: {str(e)}'}), 500

@app.errorhandler(429)
def ratelimit_handler(e):
    return make_response(jsonify(error="Rate limit exceeded. Please try again later."), 429)

if __name__ == '__main__':
    app.run(debug=True)
