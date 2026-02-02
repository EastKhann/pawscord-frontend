// frontend/src/components/LinkPreview.js
import React, { useState, useEffect } from 'react';
import { FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import LazyImage from './LazyImage'; // ⚡ OPTIMIZATION: Progressive image loading
import { getApiBase } from '../utils/apiEndpoints';

/**
 * 🔗 Link Preview Component
 * Mesajlardaki linkleri tespit edip zengin önizleme gösterir (Discord/Telegram tarzı)
 * 
 * Features:
 * - URL detection
 * - Metadata fetching (title, description, image)
 * - YouTube/Twitter/GitHub özel embed'leri
 * - ⚡ Progressive image loading (blur → sharp)
 * - Lazy loading
 * - Error handling
 */

const LinkPreview = ({ url, onClose }) => {
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchPreview();
    }, [url]);

    const fetchPreview = async () => {
        try {
            setLoading(true);
            setError(false);

            // 🎯 Özel embed'ler için kontrol
            const specialEmbed = getSpecialEmbed(url);
            if (specialEmbed) {
                setPreview(specialEmbed);
                setLoading(false);
                return;
            }

            // 📡 Backend'den metadata çek (Open Graph, Twitter Cards)
            const baseUrl = getApiBase();
            const response = await fetch(`${baseUrl}/api/link-preview/?url=${encodeURIComponent(url)}`);

            if (response.ok) {
                const data = await response.json();
                setPreview({
                    title: data.title || extractDomain(url),
                    description: data.description || '',
                    image: data.image || null,
                    url: url,
                    siteName: data.site_name || extractDomain(url)
                });
            } else {
                // Fallback: sadece domain bilgisi göster
                setPreview({
                    title: extractDomain(url),
                    description: '',
                    image: null,
                    url: url,
                    siteName: extractDomain(url)
                });
            }
        } catch (err) {
            console.error('Link preview hatası:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    // 🎬 YouTube embed
    const getYouTubeEmbed = (url) => {
        const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
        const match = url.match(regex);

        if (match) {
            return {
                type: 'youtube',
                videoId: match[1],
                title: 'YouTube Video',
                thumbnail: `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`,
                url: url
            };
        }
        return null;
    };

    // 🐦 Twitter embed
    const getTwitterEmbed = (url) => {
        if (url.includes('twitter.com') || url.includes('x.com')) {
            return {
                type: 'twitter',
                title: 'Twitter Post',
                url: url
            };
        }
        return null;
    };

    // 🐙 GitHub embed
    const getGitHubEmbed = (url) => {
        const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
        const match = url.match(regex);

        if (match) {
            return {
                type: 'github',
                owner: match[1],
                repo: match[2],
                title: `${match[1]}/${match[2]}`,
                url: url
            };
        }
        return null;
    };

    // ✨ Özel embed kontrolü
    const getSpecialEmbed = (url) => {
        return getYouTubeEmbed(url) || getTwitterEmbed(url) || getGitHubEmbed(url);
    };

    // 🌐 Domain çıkar
    const extractDomain = (url) => {
        try {
            const domain = new URL(url).hostname.replace('www.', '');
            return domain;
        } catch {
            return 'Link';
        }
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>
                    <div style={styles.spinner} />
                    <span>Önizleme yükleniyor...</span>
                </div>
            </div>
        );
    }

    if (error || !preview) {
        return null;
    }

    // 🎬 YouTube video embed
    if (preview.type === 'youtube') {
        return (
            <div style={styles.container}>
                {onClose && (
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                )}
                <div style={styles.youtubeContainer}>
                    <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${preview.videoId}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={styles.iframe}
                    />
                </div>
            </div>
        );
    }

    // 📦 Standart link preview
    return (
        <a
            href={preview.url}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.linkContainer}
        >
            <div style={styles.previewCard}>
                {onClose && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onClose();
                        }}
                        style={styles.closeButton}
                    >
                        <FaTimes />
                    </button>
                )}

                {preview.image && (
                    <div style={styles.imageContainer}>
                        <LazyImage src={preview.image} alt={preview.title} style={styles.image} />
                    </div>
                )}

                <div style={styles.content}>
                    <div style={styles.siteName}>
                        {preview.siteName}
                        <FaExternalLinkAlt style={styles.externalIcon} />
                    </div>

                    {preview.title && (
                        <div style={styles.title}>{preview.title}</div>
                    )}

                    {preview.description && (
                        <div style={styles.description}>{preview.description}</div>
                    )}
                </div>
            </div>
        </a>
    );
};

const styles = {
    container: {
        marginTop: '8px',
        borderRadius: '4px',
        overflow: 'hidden',
        position: 'relative',
    },
    loading: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        backgroundColor: 'rgba(88, 101, 242, 0.1)',
        borderLeft: '4px solid #5865f2',
        color: '#b9bbbe',
        fontSize: '13px',
    },
    spinner: {
        width: '16px',
        height: '16px',
        border: '2px solid rgba(88, 101, 242, 0.3)',
        borderTopColor: '#5865f2',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
    },
    linkContainer: {
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        marginTop: '8px',
    },
    previewCard: {
        display: 'flex',
        backgroundColor: '#2b2d31',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderLeft: '4px solid #5865f2',
        borderRadius: '4px',
        overflow: 'hidden',
        transition: 'all 0.2s',
        position: 'relative',
        maxWidth: '520px',
    },
    imageContainer: {
        flexShrink: 0,
        width: '120px',
        height: '120px',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    content: {
        padding: '12px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        minWidth: 0,
    },
    siteName: {
        fontSize: '11px',
        color: '#b9bbbe',
        textTransform: 'uppercase',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    },
    externalIcon: {
        fontSize: '9px',
    },
    title: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#00b0f4',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    description: {
        fontSize: '12px',
        color: '#dcddde',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        lineHeight: '1.4',
    },
    closeButton: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        background: 'rgba(0, 0, 0, 0.6)',
        border: 'none',
        color: 'white',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '12px',
        zIndex: 10,
        transition: 'all 0.2s',
    },
    youtubeContainer: {
        position: 'relative',
        paddingBottom: '56.25%', // 16:9 aspect ratio
        height: 0,
        overflow: 'hidden',
        maxWidth: '100%',
        backgroundColor: '#000',
        borderRadius: '4px',
    },
    iframe: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '4px',
    },
};

// Add spin animation
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        a:hover .previewCard {
            background-color: #32353b;
            border-left-width: 6px;
        }
        
        button:hover {
            background: rgba(0, 0, 0, 0.8) !important;
            transform: scale(1.1);
        }
    `;
    if (!document.head.querySelector('style[data-link-preview]')) {
        styleSheet.setAttribute('data-link-preview', 'true');
        document.head.appendChild(styleSheet);
    }
}

export default React.memo(LinkPreview);


