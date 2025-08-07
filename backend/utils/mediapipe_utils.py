import mediapipe as mp
import cv2
from mediapipe.python.solutions.hands_connections import HAND_CONNECTIONS

def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image.flags.writeable = False
    results = model.process(image)
    image.flags.writeable = True
    image = cv2.cvtColor(image,cv2.COLOR_RGB2BGR)
    return image, results

def draw_landmarks(image, results):
    mp_holistic = mp.solutions.holistic
    mp_drawing = mp.solutions.drawing_utils
    image = mp_drawing.draw_landmarks(
        image,
        landmarks_list = results.left_hand_landmarks,
        connections = HAND_CONNECTIONS,
        landmark_drawing_spec = mp.drawing.DrawingSpec(
            color=(232, 254, 255), thickness = 1,circle_radius=4
        ),
        connection_drawing_spec = mp_drawing.DrawingSpec(
            color=(255,249,161), thickness = 2,circle_radius=2
        ),

    )

    image = mp_drawing.draw_landmarks(
        image,
        landmarks_list = results.right_hand_landmarks,
        connections = HAND_CONNECTIONS,
        landmark_drawing_spec = mp.drawing.DrawingSpec(
            color=(232, 254, 255), thickness = 1,circle_radius=4
        ),
        connection_drawing_spec = mp_drawing.DrawingSpec(
            color=(255,249,161), thickness = 2,circle_radius=2
        ),

    )
    return image