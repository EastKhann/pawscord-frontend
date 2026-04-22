// frontend/src/components/VideoStreaming/NativePlayer.js
// 🎥 Native HTML5 Video Player - Minimal overhead

import { useRef, memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import logger from '../../utils/logger';

const bgStyle = (style) => ({
    width: '100%',
    maxWidth: '720px',
    borderRadius: '8px',
    backgroundColor: '#000',
    ...style,
});

const NativePlayer = memo(
    ({ src, controls = true, style = {}, onLoaded, onPause, onEnded, onError }) => {
        const videoRef = useRef(null);
        const { t } = useTranslation();

        useEffect(() => {
            if (videoRef.current) {
                videoRef.current.load();
            }
        }, [src]);

        const handleCanPlay = useCallback(() => {
            onLoaded?.();
            videoRef.current?.play().catch((e) => {
                // Autoplay blocked - that's okay, user can click play
            });
        }, [onLoaded]);

        const handlePause = useCallback(() => {
            onPause?.();
        }, [onPause]);

        const handleEnded = useCallback(() => {
            onEnded?.();
        }, [onEnded]);

        const handleError = useCallback(
            (e) => {
                logger.error('Video Error:', e);
                onError?.(e);
            },
            [onError]
        );

        return (
            <video
                aria-label={t('videoStreaming.nativePlayer', 'Video player')}
                ref={videoRef}
                src={src}
                controls={controls}
                onCanPlay={handleCanPlay}
                onPause={handlePause}
                onEnded={handleEnded}
                onError={handleError}
                playsInline
                preload="metadata"
                style={bgStyle(style)}
            >
                <track kind="captions" />
                <source src={src} />
                Your browser does not support video playback.
            </video>
        );
    }
);

NativePlayer.displayName = 'NativePlayer';

NativePlayer.propTypes = {};

export default NativePlayer;
