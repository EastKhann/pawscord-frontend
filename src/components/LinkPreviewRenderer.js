import { useState, useEffect } from 'react';
import { FaExternalLinkAlt, FaImage, FaVideo, FaPlay, FaTimes } from 'react-icons/fa';

const LinkPreviewRenderer = ({ url, onRemove }) => {
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchPreview();
    }, [url]);

    const fetchPreview = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await fetch(`/api/link-preview/?url=${encodeURIComponent(url)}`);
            if (!response.ok) throw new Error('Failed to fetch preview');
            const data = await response.json();
            setPreview(data);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const getProviderColor = (provider) => {
        const colors = {
            youtube: '#FF0000',
            twitter: '#1DA1F2',
            github: '#333333',
            spotify: '#1DB954',
            twitch: '#9146FF',
        };
        return colors[provider?.toLowerCase()] || '#5865f2';
    };

    const isVideo = (url) => {
        return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com') || preview?.type === 'video';
    };

    const getVideoThumbnail = (url) => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
            return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
        }
        return preview?.image;
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}></div>
                <span style={styles.loadingText}>Loading preview...</span>
            </div>
        );
    }

    if (error || !preview) {
        return null;
    }

    return (
        <div style={styles.container}>
            {onRemove && (
                <button onClick={onRemove} style={styles.removeButton}>
                    <FaTimes />
                </button>
            )}

            {isVideo(url) ? (
                <div style={styles.videoPreview}>
                    {getVideoThumbnail(url) && (
                        <div style={styles.videoThumbnail}>
                            <img src={getVideoThumbnail(url)} alt="Video thumbnail" style={styles.videoImage} />
                            <div style={styles.playOverlay}>
                                <FaPlay style={styles.playIcon} />
                            </div>
                        </div>
                    )}
                    <div style={styles.videoInfo}>
                        <div style={styles.videoTitle}>{preview.title || 'Video'}</div>
                        {preview.description && (
                            <div style={styles.videoDescription}>{preview.description.substring(0, 150)}...</div>
                        )}
                        <a href={url} target="_blank" rel="noopener noreferrer" style={styles.videoLink}>
                            <FaExternalLinkAlt style={{ marginRight: '6px' }} />
                            Watch on {preview.provider || 'YouTube'}
                        </a>
                    </div>
                </div>
            ) : (
                <a href={url} target="_blank" rel="noopener noreferrer" style={styles.linkPreview}>
                    {preview.image && (
                        <div style={styles.imageContainer}>
                            <img src={preview.image} alt={preview.title} style={styles.image} />
                        </div>
                    )}
                    <div style={styles.contentContainer}>
                        {preview.provider && (
                            <div style={{ ...styles.provider, borderLeftColor: getProviderColor(preview.provider) }}>
                                {preview.provider}
                            </div>
                        )}
                        <div style={styles.title}>{preview.title}</div>
                        {preview.description && (
                            <div style={styles.description}>{preview.description}</div>
                        )}
                        <div style={styles.url}>
                            <FaExternalLinkAlt style={{ marginRight: '6px', fontSize: '10px' }} />
                            {new URL(url).hostname}
                        </div>
                    </div>
                </a>
            )}
        </div>
    );
};

const styles = {
    container: {
        position: 'relative',
        marginTop: '12px',
        marginBottom: '8px',
    },
    loadingContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        borderLeft: '4px solid #5865f2',
    },
    loadingSpinner: {
        width: '20px',
        height: '20px',
        border: '3px solid #2c2f33',
        borderTop: '3px solid #5865f2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    loadingText: {
        fontSize: '13px',
        color: '#99aab5',
    },
    removeButton: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        background: 'rgba(0, 0, 0, 0.7)',
        border: 'none',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        cursor: 'pointer',
        zIndex: 10,
        fontSize: '12px',
    },
    linkPreview: {
        display: 'flex',
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'transform 0.2s',
        borderLeft: '4px solid #5865f2',
        maxWidth: '500px',
    },
    imageContainer: {
        minWidth: '120px',
        maxWidth: '120px',
        height: '120px',
        overflow: 'hidden',
        backgroundColor: '#1e1e1e',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    contentContainer: {
        padding: '12px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    provider: {
        fontSize: '11px',
        fontWeight: '600',
        color: '#5865f2',
        textTransform: 'uppercase',
        borderLeft: '3px solid #5865f2',
        paddingLeft: '8px',
    },
    title: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#ffffff',
        lineHeight: '1.3',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
    description: {
        fontSize: '12px',
        color: '#dcddde',
        lineHeight: '1.4',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
    url: {
        fontSize: '11px',
        color: '#99aab5',
        display: 'flex',
        alignItems: 'center',
        marginTop: 'auto',
    },
    videoPreview: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        overflow: 'hidden',
        borderLeft: '4px solid #FF0000',
        maxWidth: '500px',
    },
    videoThumbnail: {
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%',
        backgroundColor: '#1e1e1e',
        overflow: 'hidden',
    },
    videoImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    playOverlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60px',
        height: '60px',
        backgroundColor: 'rgba(255, 0, 0, 0.9)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    playIcon: {
        color: '#ffffff',
        fontSize: '24px',
        marginLeft: '4px',
    },
    videoInfo: {
        padding: '12px',
    },
    videoTitle: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '6px',
        lineHeight: '1.3',
    },
    videoDescription: {
        fontSize: '12px',
        color: '#dcddde',
        marginBottom: '8px',
        lineHeight: '1.4',
    },
    videoLink: {
        fontSize: '12px',
        color: '#5865f2',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '600',
    },
};

export default LinkPreviewRenderer;
