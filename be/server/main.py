from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from allosaurus.app import read_recognizer

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = os.path.join(os.path.expanduser("~"), "Desktop", "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure upload folder exists

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

    # Define file path
    file_path = os.path.join(UPLOAD_FOLDER, "recording.wav")
    
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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
