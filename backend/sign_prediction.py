import numpy as np
from utils.mediapipe_utils import mediapipe_detection
from sign_recorder import SignRecorder
from utils.dataset_utils import load_dataset, load_reference_signs
import mediapipe

reference_signs = load_reference_signs(load_dataset())
sign_recorder = SignRecorder(reference_signs)

def predict_sign(image):
    with mediapipe.solutions.holistic.Holistic(
        static_image_mode = True,
        min_detection_confidence = 0.5,
        min_tracking_confidence=0.5
    ) as holistic:
        image, results = mediapipe_detection(image,holistic)
        sign_detected,confidence=sign_recorder.process_results(results)
        return sign_detected or "No sign detected",confidence