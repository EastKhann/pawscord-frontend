/* eslint-disable no-useless-escape */
// frontend/src/LinkPreview.js (DISCORD-STYLE ÖNİZLEME - V2.0)

import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// -- dynamic style helpers (pass 2) --

// -- extracted inline style constants --
const _st1 = { width: '100%', height: '152px', border: 'none', borderRadius: '8px' };
const _st2 = { display: 'block', marginTop: '8px' };
const _st1030 = { width: '4px', backgroundColor: '#FF0000', borderRadius: '4px 0 0 4px' };
const _st1031 = { fontSize: '0.85em', color: '#949ba4', fontWeight: 500 };
const _st1032 = { width: '4px', backgroundColor: '#1DB954', borderRadius: '4px 0 0 4px' };
const _st1033 = { fontSize: '0.85em', color: '#949ba4', fontWeight: 500 };

// YouTube linkinden video ID'sini çıkaran fonksiyon
const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) return match[2];
    return null;
};

const getYouTubeEmbedUrl = (url) => {
    const id = getYouTubeVideoId(url);
    return id ? `https://www.youtube.com/embed/${id}` : null;
};

// Spotify linkinden embed URL'ini çıkaran fonksiyon
const getSpotifyEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(
        /https:\/\/open\.spotify\.com\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)/
    );
    if (match) return `https://open.spotify.com/embed/${match[1]}/${match[2]}`;
    return null;
};

// Provider detection for accent color
const getProviderInfo = (url, siteName) => {
    if (!url) return { name: 'Website', color: '#5865f2' };
    const u = url.toLowerCase();
    if (u.includes('youtube.com') || u.includes('youtu.be'))
        return { name: 'YouTube', color: '#FF0000' };
    if (u.includes('spotify.com')) return { name: 'Spotify', color: '#1DB954' };
    if (u.includes('twitter.com') || u.includes('x.com'))
        return { name: 'Twitter', color: '#1DA1F2' };
    if (u.includes('github.com')) return { name: 'GitHub', color: '#f0f6fc' };
    if (u.includes('twitch.tv')) return { name: 'Twitch', color: '#9146FF' };
    if (u.includes('reddit.com')) return { name: 'Reddit', color: '#FF4500' };
    if (u.includes('instagram.com')) return { name: 'Instagram', color: '#E4405F' };
    if (u.includes('tiktok.com')) return { name: 'TikTok', color: '#00f2ea' };
    if (u.includes('steam')) return { name: 'Steam', color: '#66c0f4' };
    if (u.includes('wikipedia.org')) return { name: 'Wikipedia', color: '#636466' };
    return { name: siteName || getDomain(url), color: '#5865f2' };
};

const getDomain = (url) => {
    try {
        return new URL(url).hostname.replace('www.', '');
    } catch {
        return '';
    }
};

const LinkPreview = ({ data }) => {
    const { t } = useTranslation();

    if (!data || !data.url) return null;

    const youtubeEmbedUrl = getYouTubeEmbedUrl(data.url);
    const spotifyEmbedUrl = getSpotifyEmbedUrl(data.url);
    const provider = getProviderInfo(data.url, data.site_name);

    // 1. YOUTUBE GÖSTERİMİ - Discord tarzı
    if (youtubeEmbedUrl) {
        return (
            <div aria-label={t('aria.youtubeEmbed', 'YouTube Video')} style={styles.embedContainer}>
                <div style={_st1030} />
                <div style={styles.embedBody}>
                    <div style={styles.providerRow}>
                        <span style={_st1031}>{provider.name}</span>
                    </div>
                    <a
                        href={data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.embedTitle}
                    >
                        {data.title || 'YouTube Video'}
                    </a>
                    {data.description && (
                        <p style={styles.embedDescription}>
                            {data.description.length > 200
                                ? data.description.substring(0, 200) + '…'
                                : data.description}
                        </p>
                    )}
                    <div style={styles.videoWrapper}>
                        <iframe
                            src={youtubeEmbedUrl}
                            style={styles.videoIframe}
                            title={t('media.youtubePlayer', 'YouTube video player')}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>
        );
    }

    // 2. SPOTIFY GÖSTERİMİ
    if (spotifyEmbedUrl) {
        return (
            <div style={styles.embedContainer}>
                <div style={_st1032} />
                <div style={styles.embedBody}>
                    <div style={styles.providerRow}>
                        <span style={_st1033}>Spotify</span>
                    </div>
                    <div style={styles.spotifyWrapper}>
                        <iframe
                            src={spotifyEmbedUrl}
                            style={_st1}
                            title={t('media.spotifyPlayer', 'Spotify Player')}
                            allow="encrypted-media"
                        />
                    </div>
                </div>
            </div>
        );
    }

    // 3. STANDART SİTE ÖNİZLEMESİ (Discord Embed Style)
    const hasLargeImage = data.image && (data.title || data.description);

    return (
        <div style={styles.embedContainer}>
            <div style={_st1030} />
            <div style={styles.embedBody}>
                <div style={styles.providerRow}>
                    <span style={_st1031}>{provider.name}</span>
                </div>
                <div style={styles.embedContent}>
                    <div style={styles.embedTextArea}>
                        {data.title && (
                            <a
                                href={data.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.embedTitle}
                            >
                                {data.title}
                            </a>
                        )}
                        {data.description && (
                            <p style={styles.embedDescription}>
                                {data.description.length > 300
                                    ? data.description.substring(0, 300) + '…'
                                    : data.description}
                            </p>
                        )}
                    </div>
                    {/* Kk thumbnail sağda (image varsa ve description kısa ise) */}
                    {data.image && data.description && data.description.length < 100 && (
                        <div style={styles.thumbnailContainer}>
                            <img
                                src={data.image}
                                alt=""
                                style={styles.thumbnailImg}
                                loading="lazy"
                            />
                        </div>
                    )}
                </div>
                {/* Büyük image altta */}
                {hasLargeImage && (!data.description || data.description.length >= 100) && (
                    <a href={data.url} target="_blank" rel="noopener noreferrer" style={_st2}>
                        <img src={data.image} alt="" style={styles.largeImage} loading="lazy" />
                    </a>
                )}
            </div>
        </div>
    );
};

const styles = {
    embedContainer: {
        display: 'flex',
        marginTop: 6,
        maxWidth: 516,
        borderRadius: 4,
        overflow: 'hidden',
        backgroundColor: '#111214',
        border: '1px solid rgba(255,255,255,0.04)',
    },
    accentBar: {
        width: 4,
        flexShrink: 0,
        borderRadius: '4px 0 0 4px',
    },
    embedBody: {
        padding: '8px 16px 16px 12px',
        flex: 1,
        minWidth: 0,
        overflow: 'hidden',
    },
    providerRow: {
        marginBottom: 4,
    },
    providerName: {
        fontSize: 12,
        fontWeight: 500,
        lineHeight: '16px',
    },
    embedTitle: {
        display: 'block',
        color: '#00a8fc',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '1rem',
        lineHeight: '1.25rem',
        marginBottom: 4,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    embedDescription: {
        fontSize: '0.875rem',
        color: '#dbdee1',
        margin: 0,
        lineHeight: '1.125rem',
        maxHeight: 54,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
    },
    embedContent: {
        display: 'flex',
        gap: 16,
    },
    embedTextArea: {
        flex: 1,
        minWidth: 0,
    },
    thumbnailContainer: {
        flexShrink: 0,
        width: 80,
        height: 80,
        borderRadius: 4,
        overflow: 'hidden',
    },
    thumbnailImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    largeImage: {
        maxWidth: '100%',
        maxHeight: 300,
        borderRadius: 4,
        objectFit: 'cover',
        display: 'block',
    },
    videoWrapper: {
        position: 'relative',
        width: '100%',
        maxWidth: 400,
        aspectRatio: '16/9',
        borderRadius: 4,
        overflow: 'hidden',
        marginTop: 8,
        backgroundColor: '#000',
    },
    videoIframe: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
    },
    spotifyWrapper: {
        marginTop: 4,
        borderRadius: 8,
        overflow: 'hidden',
    },
};

LinkPreview.propTypes = {
    data: PropTypes.array,
};
export default memo(LinkPreview);
