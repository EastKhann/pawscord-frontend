// frontend/src/LinkPreview.js (NİHAİ VERSİYON: Fonksiyonel + Şık)

import React from 'react';

// YouTube linkinden video ID'sini çıkaran fonksiyon
const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    }
    return null;
};

// Spotify linkinden embed URL'ini çıkaran fonksiyon (Standart Embed URL güncellendi)
const getSpotifyEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(/https:\/\/open\.spotify\.com\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)/);
    if (match) {
        // Spotify'ın resmi embed yapısı:
        return `https://open.spotify.com/embed/${match[1]}/${match[2]}`;
    }
    return null;
};

const LinkPreview = ({ data }) => {
    if (!data || !data.url) return null;

    const youtubeEmbedUrl = getYouTubeEmbedUrl(data.url);
    const spotifyEmbedUrl = getSpotifyEmbedUrl(data.url);

    // 1. YOUTUBE GÖSTERİMİ
    if (youtubeEmbedUrl) {
        return (
            <div style={styles.container}>
                <div style={styles.borderBarYouTube}></div>
                <div style={styles.contentFull}>
                    <div style={styles.siteName}>YouTube</div>
                    <a href={data.url} target="_blank" rel="noopener noreferrer" style={styles.titleLink}>
                        {data.title || data.url}
                    </a>
                    <div style={styles.embedWrapper}>
                        <iframe
                            src={youtubeEmbedUrl}
                            style={styles.iframe}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        );
    }

    // 2. SPOTIFY GÖSTERİMİ
    if (spotifyEmbedUrl) {
        return (
            <div style={styles.container}>
                <div style={styles.borderBarSpotify}></div>
                <div style={styles.contentFull}>
                    <div style={{...styles.embedWrapper, height: '80px', aspectRatio: 'auto'}}>
                        <iframe
                            src={spotifyEmbedUrl}
                            style={styles.iframe}
                            title="Spotify Player"
                            frameBorder="0"
                            allow="encrypted-media"
                        ></iframe>
                    </div>
                </div>
            </div>
        );
    }

    // 3. STANDART SİTE ÖNİZLEMESİ (Resim + Yazı)
    return (
        <div style={styles.container}>
            <div style={styles.borderBar}></div>
            <div style={styles.content}>
                <div style={styles.siteName}>{data.site_name || 'Website'}</div>
                <a href={data.url} target="_blank" rel="noopener noreferrer" style={styles.titleLink}>
                    {data.title}
                </a>
                <p style={styles.description}>{data.description}</p>
                {data.image && (
                    <img src={data.image} style={styles.image} alt="preview" />
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        marginTop: '8px',
        backgroundColor: 'var(--background-secondary)', // Tema rengi
        borderRadius: '4px',
        maxWidth: '480px',
        width: '100%',
        overflow: 'hidden',
        border: '1px solid var(--background-tertiary)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
    },
    // Sol taraftaki renkli şerit (Discord stili)
    borderBar: { width: '4px', backgroundColor: '#5865f2', flexShrink: 0 },
    borderBarYouTube: { width: '4px', backgroundColor: '#ff0000', flexShrink: 0 },
    borderBarSpotify: { width: '4px', backgroundColor: '#1db954', flexShrink: 0 },

    content: {
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflow: 'hidden'
    },
    contentFull: {
        padding: '10px',
        width: '100%',
        overflow: 'hidden'
    },
    siteName: {
        fontSize: '0.75em',
        color: 'var(--text-muted)',
        marginBottom: '4px',
        fontWeight: '600'
    },
    titleLink: {
        display: 'block',
        color: 'var(--text-link)',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1em',
        marginBottom: '6px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    description: {
        fontSize: '0.85em',
        color: 'var(--text-secondary)',
        margin: '0 0 10px 0',
        lineHeight: '1.4',
        maxHeight: '60px',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical'
    },
    image: {
        maxWidth: '100%',
        borderRadius: '4px',
        maxHeight: '250px',
        objectFit: 'cover',
        marginTop: '5px'
    },
    embedWrapper: {
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%', // 16:9 Oranı
        height: 0,
        borderRadius: '4px',
        overflow: 'hidden',
        backgroundColor: '#000'
    },
    iframe: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
    }
};

export default LinkPreview;

