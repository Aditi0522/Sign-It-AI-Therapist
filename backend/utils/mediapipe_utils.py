import mediapipe as mp
import cv2

def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image.flag.writeables = False
    results = model.process(image)
