from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = os.path.join(os.path.expanduser("~"), "Desktop", "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure upload folder exists

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    print("Transcribing audio...")
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files['audio']
    if audio_file.filename == '':
        return jsonify({"error": "Empty file name"}), 400

    # Save the uploaded file
    file_path = os.path.join(UPLOAD_FOLDER, "recording.wav")
    audio_file.save(file_path)

    print(f"Audio saved at: {file_path}")

    # Mock transcription response
    transcription = "This is a mock transcription."

    return jsonify({"transcription": transcription})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
