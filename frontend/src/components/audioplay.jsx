import React from 'react';

const AudioPlayer = ({ audioUrl }) => {
    return (
        audioUrl ? (
            <audio controls autoPlay>
                <source src = {audioUrl} type = "audio/mpeg"/>
                Your browser does not support the audio element.
            </audio>
        ):null
    );
};

export default AudioPlayer;