import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import i18n from '../i18n';
const _s = (o) => o;

const VideoFeed = ({ stream, fullscreen }) => {
    const videoRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <video
            aria-label={i18n.t('aria.videoChatFeed', { defaultValue: 'Video' })}
            ref={videoRef}
            autoPlay
            playsInline
            muted={false}
            style={_s({
                width: '100%',
                height: '100%',
                objectFit: fullscreen ? 'contain' : 'cover',
                background: '#000',
            })}
        >
            <track kind="captions" />
        </video>
    );
};

VideoFeed.propTypes = {
    stream: PropTypes.object,
    fullscreen: PropTypes.object,
};
export default VideoFeed;
