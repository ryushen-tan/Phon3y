#!/usr/bin/env python3

import sys
import os

# Add the backend directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), 'be', 'server'))

from services.mouth_service import FaceMeshDetector

def test_landmark_indices():
    """Test that the landmark indices are properly defined"""
    detector = FaceMeshDetector()
    
    print(f"Total lip landmarks: {len(detector.LIPS_IDX)}")
    print(f"Landmark indices: {detector.LIPS_IDX}")
    
    # Check for duplicates
    unique_indices = set(detector.LIPS_IDX)
    if len(unique_indices) != len(detector.LIPS_IDX):
        print("WARNING: Duplicate indices found!")
    else:
        print("✓ No duplicate indices")
    
    # Check range (MediaPipe has 468 landmarks, so indices should be 0-467)
    max_idx = max(detector.LIPS_IDX)
    min_idx = min(detector.LIPS_IDX)
    print(f"Index range: {min_idx} to {max_idx}")
    
    if max_idx < 468 and min_idx >= 0:
        print("✓ All indices are within valid range")
    else:
        print("WARNING: Some indices are outside valid range!")

if __name__ == "__main__":
    test_landmark_indices()
