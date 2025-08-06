import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const WebcamCapture = () => {
  const webcamRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (
        webcamRef.current &&
        webcamRef.current.video.readyState === 4
      ) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          try {
            await axios.post('http://localhost:8000/process_frame', {
              image: imageSrc,
            });
          } catch (error) {
            console.error('Frame send failed:', error);
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
      />
    </div>
  );
};

export default WebcamCapture;
