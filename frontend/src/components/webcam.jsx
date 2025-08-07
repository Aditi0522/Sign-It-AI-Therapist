import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const WebcamStream = () => {
  const webcamRef = useRef(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (
        webcamRef.current &&
        webcamRef.current.video.readyState === 4
      ) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          try {
            const response = await axios.post('http://localhost:8000/process_frame', {
              image: imageSrc,
            });
            const { sign, confidence } = response.data;
            setPrediction({ sign, confidence });
          } catch (error) {
            console.error('Frame send failed:', error);
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'relative', width: '640px', height: '480px' }}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
      />
      {prediction && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '18px',
          }}
        >
          <div><strong>Sign:</strong> {prediction.sign}</div>
          <div><strong>Confidence:</strong> {(prediction.confidence * 100).toFixed(1)}%</div>
        </div>
      )}
    </div>
  );
};

export default WebcamStream;
