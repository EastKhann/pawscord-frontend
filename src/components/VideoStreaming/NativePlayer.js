// frontend/src/components/VideoStreaming/NativePlayer.js
// 🎥 Native HTML5 Video Player - Minimal overhead

import React, { useRef, memo, useCallback, useEffect } from 'react';

const NativePlayer = memo(({
    src,
    controls = true,
    style = {},
    onLoaded,
    onPause,
    onEnded,
    onError
}) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [src]);

    const handleCanPlay = useCallback(() => {
        onLoaded?.();
        videoRef.current?.play().catch(e => {
            // Autoplay blocked - that's okay, user can click play
            console.log('Autoplay prevented:', e);
        });
    }, [onLoaded]);

    const handlePause = useCallback(() => {
        onPause?.();
    }, [onPause]);

    const handleEnded = useCallback(() => {
        onEnded?.();
    }, [onEnded]);

    const handleError = useCallback((e) => {
        console.error('Video Error:', e);
        onError?.(e);
    }, [onError]);

    return (
        <video
            ref={videoRef}
            src={src}
            controls={controls}
            onCanPlay={handleCanPlay}
            onPause={handlePause}
            onEnded={handleEnded}
            onError={handleError}
            playsInline
            preload="metadata"
            style={{
                width: '100%',
                maxWidth: '720px',
                borderRadius: '8px',
                backgroundColor: '#000',
                ...style
            }}
        >
            <source src={src} />
            Tarayıcınız video oynatmayı desteklemiyor.
        </video>
    );
});

NativePlayer.displayName = 'NativePlayer';

export default NativePlayer;
