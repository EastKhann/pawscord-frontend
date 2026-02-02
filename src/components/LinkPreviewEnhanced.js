// frontend/src/components/LinkPreviewEnhanced.js - FEATURE #20
import React, { useState, useEffect } from 'react';
import { FaYoutube, FaTwitter, FaSpotify, FaTwitch, FaExternalLinkAlt } from 'react-icons/fa';

const LinkPreviewEnhanced = ({ url }) => {
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPreview();
    }, [url]);

    const fetchPreview = async () => {
        // Simulate preview fetch
        const type = detectLinkType(url);
        setPreview({
            type,
            title: 'Preview Title',
            description: 'This is a preview description...',
            image: 'https://via.placeholder.com/400x200',
            url
        });
        setLoading(false);
    };

    const detectLinkType = (url) => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
        if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
        if (url.includes('spotify.com')) return 'spotify';
        if (url.includes('twitch.tv')) return 'twitch';
        return 'generic';
    };

    const getIcon = () => {
        switch (preview?.type) {
            case 'youtube': return <FaYoutube style={{ color: '#ff0000' }} />;
            case 'twitter': return <FaTwitter style={{ color: '#1da1f2' }} />;
            case 'spotify': return <FaSpotify style={{ color: '#1db954' }} />;
            case 'twitch': return <FaTwitch style={{ color: '#9146ff' }} />;
            default: return <FaExternalLinkAlt />;
        }
    };

    if (loading) {
        return (
            <div style={styles.loading}>
                <div style={styles.loadingBar}></div>
            </div>
        );
    }

    if (!preview) return null;

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" style={styles.container}>
            <div style={styles.sidebar} />
            <div style={styles.content}>
                <div style={styles.header}>
                    {getIcon()}
                    <span style={styles.domain}>{new URL(url).hostname}</span>
                </div>
                <div style={styles.title}>{preview.title}</div>
                <div style={styles.description}>{preview.description}</div>
                {preview.image && (
                    <img src={preview.image} alt="" style={styles.image} />
                )}
            </div>
        </a>
    );
};

const styles = {
    container: {
        display: 'flex',
        backgroundColor: '#2b2d31',
        borderRadius: '4px',
        overflow: 'hidden',
        marginTop: '8px',
        maxWidth: '500px',
        textDecoration: 'none',
        transition: 'background-color 0.15s'
    },
    sidebar: {
        width: '4px',
        backgroundColor: '#5865f2',
        flexShrink: 0
    },
    content: {
        padding: '12px',
        flex: 1,
        minWidth: 0
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        marginBottom: '4px',
        fontSize: '12px'
    },
    domain: {
        color: '#b9bbbe',
        fontSize: '11px',
        fontWeight: '500'
    },
    title: {
        color: '#00b0f4',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '4px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    description: {
        color: '#dcddde',
        fontSize: '13px',
        marginBottom: '8px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical'
    },
    image: {
        width: '100%',
        borderRadius: '4px',
        maxHeight: '200px',
        objectFit: 'cover'
    },
    loading: {
        padding: '12px',
        backgroundColor: '#2b2d31',
        borderRadius: '4px',
        marginTop: '8px'
    },
    loadingBar: {
        height: '4px',
        backgroundColor: '#5865f2',
        borderRadius: '2px',
        animation: 'pulse 1.5s ease-in-out infinite'
    }
};

export default LinkPreviewEnhanced;



