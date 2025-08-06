import React, {useState} from "react";
import WebcamStream from "./components/webcam";
import ChatBox from './components/chatbox';
import AudioPlayer from './components/audioplay';
import ButtonPanel from './components/buttonpanel';
import api from './api'

const App = () => {
  const [messages, setMessages] = useState([]);
  const [audioUrl,setAudioUrl] = useState('');

  
  const handleSend = async () => {
    try {
      const gestureResponse = await api.post("/gesture", {
        gesture: "wave" // example gesture; replace with real data later
      });

      const textFromGesture = gestureResponse.data.text;

      const userMsg = { sender: "User", text: textFromGesture };

      // Step 2: Send text to AI chatbot
      const chatResponse = await api.post("/chat", {
        message: textFromGesture
      });

      const aiText = chatResponse.data.response;
      const aiMsg = { sender: "AI", text: aiText };

      // Step 3: Get TTS audio for AI response
      const audioResponse = await api.post("/speak", {
        text: aiText
      });

      const audioURL = audioResponse.data.audio_url;

      // Step 4: Update UI
      setMessages([...messages, userMsg, aiMsg]);
      setAudioUrl(audioURL);

    } catch (error) {
      console.error("Error during handleSend:", error);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setAudioUrl('');
  };

  const handleStart =()=>{
    //trigger camera if needed
  };

  return (
    <div className = "App" style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>SIgn-It (Coz you really don't have to say it) </h1>
      <WebcamStream />
      <ChatBox messages={messages} />
      <AudioPlayer audioUrl={audioUrl} />
      <ButtonPanel onSend={handleSend} onReset={handleReset} onStart={handleStart} />
    </div> 
    );
};

export default App;