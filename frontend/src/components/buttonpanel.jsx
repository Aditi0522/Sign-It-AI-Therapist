import React from 'react';

const ButtonPanel = ({ onSend, onReset, onStart }) => {
  return (
    <div style={{ marginTop: '15px' }}>
      <button onClick={onStart}>Start</button>
      <button onClick={onSend}>Send</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

export default ButtonPanel;