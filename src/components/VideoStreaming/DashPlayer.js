// frontend/src/components/VideoStreaming/DashPlayer.js
// 🎬 DASH Player - Lazy loaded (saves 988KB on initial load)

import { useEffect, useRef, memo, useCallback } from 'react';

import PropTypes from 'prop-types';
import logger from '../../utils/logger';

const bgStyle = (style) => ({
    width: '100%',
    maxWidth: '720px',
    borderRadius: '8px',
    backgroundColor: '#000',
    ...style,
});

const DashPlayer = memo(
    ({ src, controls = true, style = {}, onLoaded, onPause, onEnded, onError }) => {
        const videoRef = useRef(null);
        const playerRef = useRef(null);

        useEffect(() => {
            let isMounted = true;

            const initPlayer = async () => {
                try {
                    // Dynamic import - only loads when this component is rendered
                    const dashjs = await import('dashjs');

                    if (!isMounted || !videoRef.current) return;

                    const player = dashjs.MediaPlayer().create();
                    playerRef.current = player;

                    // Configure for best performance
                    player.updateSettings({
                        streaming: {
                            abr: {
                                autoSwitchBitrate: { audio: true, video: true },
                                ABRStrategy: 'abrThroughput',
                            },
                            buffer: {
                                fastSwitchEnabled: true,
                                stableBufferTime: 12,
                                bufferTimeAtTopQuality: 30,
                            },
                            delay: {
                                liveDelay: 3,
                            },
                        },
                    });

                    player.initialize(videoRef.current, src, false);

                    player.on('canPlay', () => {
                        if (isMounted) {
                            onLoaded?.();
                            videoRef.current?.play();
                        }
                    });

                    player.on('error', (e) => {
                        logger.error('DASH Player Error:', e);
                        onError?.(e);
                    });
                } catch (error) {
                    logger.error('Failed to load DASH player:', error);
                    onError?.(error);
                }
            };

            initPlayer();

            return () => {
                isMounted = false;
                if (playerRef.current) {
                    playerRef.current.destroy();
                    playerRef.current = null;
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
                aria-label="dash video player"
                ref={videoRef}
                controls={controls}
                onPause={handlePause}
                onEnded={handleEnded}
                style={bgStyle(style)}
            >
                <track kind="captions" />
            </video>
        );
    }
);

DashPlayer.displayName = 'DashPlayer';

DashPlayer.propTypes = {};

export default DashPlayer;
