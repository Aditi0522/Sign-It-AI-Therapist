from fastapi import WebSocket
from fastapi import FastAPI
from pydantic import BaseModel
import base64
from PIL import Image
from io import BytesIO
import cv2
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
   "https://localhost:3000"
]

app.add_middleware(
   CORSMiddleware,
   allow_origins = origins,
   allow_credentials=True,
   allow_methods=["*"],
   allow_headers=["*"]
)

class ConnectionManager:
    def __init__(self):
      self.active_connections = []

    async def connect(self, websocket : WebSocket):
      await websocket.accept()
      self.active_connections.append(websocket)
    
    async def send_personal_message(self, message: str, websocket: WebSocket):
       await websocket.send_text(message)

    async def disconnect(self, websocket: WebSocket):
       self.active_connections.remove(websocket)
   
manager = ConnectionManager()

class FrameRequest(BaseModel):
    image: str  # base64 JPEG

def decode_image(base64_str):
   img_data = base64_str.split(',')[1]
   img_bytes = base64.b64decode(img_data)
   img_np = np.array(Image.open(BytesIO(img_bytes)))
   return cv2.cvtColor(img_np, cv2.COLOR_RGB2BGR)

@app.get("/")
async def process_frame(req: FrameRequest):
   image = decode_image(req.image)
   # sign = predict_sign(image)
   # return {"sign":sign}
   return {"sign":10}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
   await websocket.accept()
   while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")

@app.post("/gesture")
def gesture_detect():
   return {"key":"value"}

@app.post("/chat")
def chat_integration():
   return {"key":"value"}

@app.post("/speak")
def text_to_speech():
   return {"key":"value"}