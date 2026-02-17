// frontend/src/components/VideoStreaming/HLSPlayer.js
// 📺 HLS Player - Lazy loaded (saves 520KB on initial load)

import { useEffect, useRef, memo, useCallback } from 'react';

const HLSPlayer = memo(({
    src,
    controls = true,
    style = {},
    onLoaded,
    onPause,
    onEnded,
    onError
}) => {
    const videoRef = useRef(null);
    const hlsRef = useRef(null);

    useEffect(() => {
        let isMounted = true;
        let loadedMetadataHandler = null;

        const initPlayer = async () => {
            try {
                // Dynamic import - only loads when this component is rendered
                const HlsModule = await import('hls.js');
                const Hls = HlsModule.default;

                if (!isMounted || !videoRef.current) return;

                // Check if HLS is supported
                if (Hls.isSupported()) {
                    const hls = new Hls({
                        enableWorker: true,
                        lowLatencyMode: true,
                        backBufferLength: 90,
                        maxBufferLength: 30,
                        maxMaxBufferLength: 600,
                        maxBufferSize: 60 * 1000 * 1000, // 60MB
                        maxBufferHole: 0.5,
                        fragLoadingTimeOut: 20000,
                        fragLoadingMaxRetry: 6
                    });

                    hlsRef.current = hls;

                    hls.loadSource(src);
                    hls.attachMedia(videoRef.current);

                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        if (isMounted) {
                            onLoaded?.();
                            videoRef.current?.play();
                        }
                    });

                    hls.on(Hls.Events.ERROR, (event, data) => {
                        if (data.fatal) {
                            switch (data.type) {
                                case Hls.ErrorTypes.NETWORK_ERROR:
                                    console.error('HLS Network Error:', data);
                                    hls.startLoad();
                                    break;
                                case Hls.ErrorTypes.MEDIA_ERROR:
                                    console.error('HLS Media Error:', data);
                                    hls.recoverMediaError();
                                    break;
                                default:
                                    console.error('HLS Fatal Error:', data);
                                    hls.destroy();
                                    onError?.(data);
                                    break;
                            }
                        }
                    });

                } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                    // Native HLS support (Safari)
                    videoRef.current.src = src;
                    loadedMetadataHandler = () => {
                        if (isMounted) {
                            onLoaded?.();
                            videoRef.current?.play();
                        }
                    };
                    videoRef.current.addEventListener('loadedmetadata', loadedMetadataHandler);
                } else {
                    console.error('HLS is not supported in this browser');
                    onError?.(new Error('HLS not supported'));
                }

            } catch (error) {
                console.error('Failed to load HLS player:', error);
                onError?.(error);
            }
        };

        initPlayer();

        return () => {
            isMounted = false;
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
            if (loadedMetadataHandler && videoRef.current) {
                videoRef.current.removeEventListener('loadedmetadata', loadedMetadataHandler);
            }
        };
    }, [src, onLoaded, onError]);

    const handlePause = useCallback(() => {
        onPause?.();
    }, [onPause]);

    const handleEnded = useCallback(() => {
        onEnded?.();
    }, [onEnded]);

    return (
        <video
            ref={videoRef}
            controls={controls}
            onPause={handlePause}
            onEnded={handleEnded}
            playsInline
            style={{
                width: '100%',
                maxWidth: '720px',
                borderRadius: '8px',
                backgroundColor: '#000',
                ...style
            }}
        />
    );
});

HLSPlayer.displayName = 'HLSPlayer';

export default HLSPlayer;
