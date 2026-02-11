// frontend/src/components/VideoStreaming/index.js
// 🎬 VIDEO STREAMING - Lazy loaded video components
// dash.all.min.js (988KB) + hls.js (520KB) sadece video oynatılırken yüklenir

import { lazy, Suspense, useState, useCallback, memo } from 'react';

// ⚡ ULTRA LAZY: Video player'lar sadece kullanıcı tıkladığında yüklenir
const DashPlayer = lazy(() => import('./DashPlayer'));
const HLSPlayer = lazy(() => import('./HLSPlayer'));
const NativePlayer = lazy(() => import('./NativePlayer'));

// Video Loading Placeholder
const VideoPlaceholder = memo(({ onClick, thumbnail, duration }) => (
    <div
        onClick={onClick}
        style={{
            width: '100%',
            maxWidth: '720px',
            aspectRatio: '16/9',
            backgroundColor: '#000',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
        }}
    >
        {thumbnail && (
            <img
                src={thumbnail}
                alt="Video thumbnail"
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.7
                }}
            />
        )}
        <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: 'rgba(88, 101, 242, 0.9)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            transition: 'transform 0.2s',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
            </svg>
        </div>
        {duration && (
            <span style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                backgroundColor: 'rgba(0,0,0,0.8)',
                color: '#fff',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '12px',
                zIndex: 1
            }}>
                {duration}
            </span>
        )}
        <span style={{
            marginTop: '12px',
            color: '#b9bbbe',
            fontSize: '14px',
            zIndex: 1
        }}>
            Oynatmak için tıklayın
        </span>
    </div>
));

// Video Loading Spinner
const VideoLoadingSpinner = memo(() => (
    <div style={{
        width: '100%',
        maxWidth: '720px',
        aspectRatio: '16/9',
        backgroundColor: '#000',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <div className="video-spinner" style={{
            width: '48px',
            height: '48px',
            border: '4px solid rgba(255,255,255,0.1)',
            borderTop: '4px solid #5865f2',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        }} />
        <span style={{ color: '#b9bbbe', marginTop: '12px', fontSize: '14px' }}>
            Video yükleniyor...
        </span>
        <style>{`
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}</style>
    </div>
));

// Detect video type from URL
const getVideoType = (url) => {
    if (!url) return 'unknown';
    const lowerUrl = url.toLowerCase();

    if (lowerUrl.includes('.mpd') || lowerUrl.includes('dash')) return 'dash';
    if (lowerUrl.includes('.m3u8') || lowerUrl.includes('hls')) return 'hls';
    if (lowerUrl.match(/\.(mp4|webm|mov|mkv|ogg)(\?|$)/i)) return 'native';

    return 'native'; // Default to native
};

// Main Smart Video Player
export const SmartVideoPlayer = memo(({
    src,
    thumbnail,
    duration,
    autoPlay = false,
    controls = true,
    style = {},
    onPlay,
    onPause,
    onEnded,
    onError
}) => {
    const [isActivated, setIsActivated] = useState(autoPlay);
    const [isLoading, setIsLoading] = useState(false);
    const videoType = getVideoType(src);

    const handleActivate = useCallback(() => {
        setIsLoading(true);
        setIsActivated(true);
        onPlay?.();
    }, [onPlay]);

    const handleLoaded = useCallback(() => {
        setIsLoading(false);
    }, []);

    const handleError = useCallback((error) => {
        setIsLoading(false);
        console.error('Video error:', error);
        onError?.(error);
    }, [onError]);

    // Not activated yet - show placeholder
    if (!isActivated) {
        return (
            <VideoPlaceholder
                onClick={handleActivate}
                thumbnail={thumbnail}
                duration={duration}
            />
        );
    }

    // Loading state
    if (isLoading) {
        return <VideoLoadingSpinner />;
    }

    // Render appropriate player based on video type
    return (
        <Suspense fallback={<VideoLoadingSpinner />}>
            {videoType === 'dash' && (
                <DashPlayer
                    src={src}
                    controls={controls}
                    style={style}
                    onLoaded={handleLoaded}
                    onPause={onPause}
                    onEnded={onEnded}
                    onError={handleError}
                />
            )}
            {videoType === 'hls' && (
                <HLSPlayer
                    src={src}
                    controls={controls}
                    style={style}
                    onLoaded={handleLoaded}
                    onPause={onPause}
                    onEnded={onEnded}
                    onError={handleError}
                />
            )}
            {videoType === 'native' && (
                <NativePlayer
                    src={src}
                    controls={controls}
                    style={style}
                    onLoaded={handleLoaded}
                    onPause={onPause}
                    onEnded={onEnded}
                    onError={handleError}
                />
            )}
        </Suspense>
    );
});

VideoPlaceholder.displayName = 'VideoPlaceholder';
VideoLoadingSpinner.displayName = 'VideoLoadingSpinner';
SmartVideoPlayer.displayName = 'SmartVideoPlayer';

export default SmartVideoPlayer;
