import os
import time
import json
from typing import Dict, List, Optional

import cv2
import mediapipe as mp
import numpy as np


class FaceMeshDetector:
    """Wraps MediaPipe FaceMesh to extract mouth landmarks and persist them per session.

    Usage:
        detector = FaceMeshDetector(data_dir='data/mouth')
        landmarks = detector.process_image_bytes(image_bytes)
        detector.save_frame_landmarks(landmarks, session_id='user123')
    """

    # Official MediaPipe lip landmarks for complete upper and lower lip tracking
    # Based on MediaPipe's official FACEMESH_LIPS definition
    # These indices are ordered to create a continuous contour around both lips
    LIPS_IDX = [
        # Complete lip outline (both upper and lower)
        61, 146, 91, 181, 84, 17, 314, 405, 320, 307, 375, 291, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95,
        # Additional upper lip detail points
        185, 40, 39, 37, 0, 267, 269, 270, 409, 415, 310, 311, 312, 13, 82, 81, 42, 183, 78
    ]

    def __init__(self, data_dir: Optional[str] = None):
        self.mp_face_mesh = mp.solutions.face_mesh
        # Improved configuration for stable detection
        self.face_mesh = self.mp_face_mesh.FaceMesh(
            static_image_mode=True, 
            max_num_faces=1, 
            refine_landmarks=True, 
            min_detection_confidence=0.7,  # Higher confidence for stability
            min_tracking_confidence=0.5
        )
        self.data_dir = data_dir or os.path.join(os.path.dirname(__file__), '..', 'data', 'mouth')
        os.makedirs(self.data_dir, exist_ok=True)

    def _image_from_bytes(self, b: bytes):
        # Decode bytes into OpenCV image (BGR)
        arr = np.frombuffer(b, np.uint8)
        img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
        return img

    def process_image_bytes(self, image_bytes: bytes) -> Optional[Dict[str, List[Dict[str, float]]]]:
        """Process an image (bytes) and return mouth landmarks normalized (x,y in [0,1]).

        Returns None if no face was detected.
        The return format:
        { 'lips': [{'x':..., 'y':...}, ...] }
        """
        img = self._image_from_bytes(image_bytes)
        if img is None:
            return None

        # Convert BGR to RGB for MediaPipe
        rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        results = self.face_mesh.process(rgb)
        if not results.multi_face_landmarks:
            return None

        # Take first face
        face_landmarks = results.multi_face_landmarks[0]
        h, w, _ = img.shape

        def to_point(idx: int):
            lm = face_landmarks.landmark[idx]
            # normalized coords
            return { 'x': float(lm.x), 'y': float(lm.y), 'px': int(lm.x * w), 'py': int(lm.y * h) }

        # Use complete lip contour for full mouth tracking
        lips = [to_point(i) for i in self.LIPS_IDX]

        return { 'lips': lips }

    def save_frame_landmarks(self, landmarks: Dict[str, List[Dict[str, float]]], session_id: Optional[str] = None) -> str:
        """Append landmarks for a frame to a per-session JSON file.

        If session_id is None, a timestamped file is created.
        Returns the path to the JSON file updated.
        """
        timestamp = int(time.time() * 1000)
        payload = {
            'timestamp': timestamp,
            'landmarks': landmarks
        }

        if session_id:
            safe_name = ''.join(c for c in session_id if c.isalnum() or c in ('-', '_')) or 'session'
            file_path = os.path.join(self.data_dir, f"session_{safe_name}.json")
            # load existing list or create
            try:
                if os.path.exists(file_path):
                    with open(file_path, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                else:
                    data = []
            except Exception:
                data = []
            data.append(payload)
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f)
            return file_path
        else:
            file_path = os.path.join(self.data_dir, f"frame_{timestamp}.json")
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump([payload], f)
            return file_path

    def close(self):
        try:
            self.face_mesh.close()
        except Exception:
            pass
