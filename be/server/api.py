from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import os
import requests
from allosaurus.app import read_recognizer
from werkzeug.utils import secure_filename
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)

limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)
limiter.init_app(app) 

# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "https://www.p3y.app"}})
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100MB

UPLOAD_FOLDER = os.path.join(os.path.expanduser("~"), "Desktop", "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True) 

# Load Allosaurus model once
model = read_recognizer()

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    print("Transcribing audio...")

    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files['audio']
    if audio_file.filename == '':
        return jsonify({"error": "Empty file name"}), 400

    # Secure filename to prevent path traversal attacks
    filename = secure_filename(audio_file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)

    # Save the file
    try:
        audio_file.save(file_path)
        print(f"File saved at: {file_path}, Exists: {os.path.exists(file_path)}")
    except Exception as e:
        return jsonify({"error": f"Failed to save file: {str(e)}"}), 500

    # Ensure the model is loaded
    if model is None:
        return jsonify({"error": "Failed to load Allosaurus model"}), 500

    try:
        print("Attempting transcription...")
        transcription = model.recognize(os.path.abspath(file_path), 'eng')
        print("Transcription successful!")
    except Exception as e:
        print(f"Transcription failed: {str(e)}")
        return jsonify({"error": f"Transcription failed: {str(e)}"}), 500
    finally:
        # Delete file *after* transcription
        if os.path.exists(file_path):
            os.remove(file_path)

    return jsonify({"transcription": transcription})

@app.route('/get-ngrok-url', methods=['GET'])
def get_ngrok_url():
    """Fetches the public Ngrok URL dynamically"""
    try:
        response = requests.get("http://127.0.0.1:4040/api/tunnels", timeout=5)
        response.raise_for_status()  # Raise an error for bad responses

        data = response.json()
        public_url = data["tunnels"][0]["public_url"] if data["tunnels"] else None

        if not public_url:
            return jsonify({"error": "No active Ngrok tunnels found"}), 404

        return jsonify({"ngrok_url": public_url})

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Failed to fetch Ngrok URL: {str(e)}"}), 500

@app.errorhandler(429)
def ratelimit_handler(e):
    return make_response(jsonify(error="Rate limit exceeded. Please try again later."), 429)

if __name__ == '__main__':
    app.run(debug=True)
