import React, { useEffect, useRef } from 'react';

const VideoFeed = ({ stream, fullscreen }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={false}
            style={{
                width: '100%',
                height: '100%',
                objectFit: fullscreen ? 'contain' : 'cover',
                background: '#000',
            }}
        />
    );
};

export default VideoFeed;
