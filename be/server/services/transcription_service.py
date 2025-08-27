import os
from typing import Optional
from werkzeug.utils import secure_filename
from allosaurus.app import read_recognizer

# Default upload folder (can be overridden by caller)
DEFAULT_UPLOAD_FOLDER = os.path.join(os.path.expanduser("~"), "Desktop", "uploads")
os.makedirs(DEFAULT_UPLOAD_FOLDER, exist_ok=True)


# Load model once at import time
_MODEL = None

def _ensure_model() -> None:
    global _MODEL
    if _MODEL is None:
        _MODEL = read_recognizer()


def save_upload_file(file, upload_folder: Optional[str] = None) -> str:
    """Save a Werkzeug FileStorage to disk and return the absolute path."""
    target_folder = upload_folder or DEFAULT_UPLOAD_FOLDER
    os.makedirs(target_folder, exist_ok=True)
    filename = secure_filename(file.filename or "upload")
    file_path = os.path.join(target_folder, filename)
    file.save(file_path)
    return os.path.abspath(file_path)


def transcribe_file_path(file_path: str) -> str:
    """Transcribe the given file path using Allosaurus and return the transcription string."""
    _ensure_model()
    if _MODEL is None:
        raise RuntimeError("Allosaurus model failed to load")
    # Allosaurus recognize expects a path
    transcription = _MODEL.recognize(file_path, 'eng')
    return transcription


def transcribe_uploaded_file(file, upload_folder: Optional[str] = None) -> str:
    """High-level helper: save an uploaded file, transcribe it, then delete the saved file.

    Returns the transcription string or raises on error.
    """
    file_path = save_upload_file(file, upload_folder=upload_folder)
    try:
        transcription = transcribe_file_path(file_path)
        return transcription
    finally:
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
        except Exception:
            # best-effort cleanup; do not mask the original error
            pass
