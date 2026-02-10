// frontend/src/components/ImageGalleryGroup.js
// Extracted from App.js - WhatsApp-style image gallery
// =============================================

import React from 'react';

// --- 🖼️ WhatsApp-style Image Gallery Group ---
const ImageGalleryGroup = React.memo(({ messages, currentUser, absoluteHostUrl, isAdmin, onOpenGallery, onViewProfile, onDelete, allUsers, getDeterministicAvatar, fetchWithAuth, onVisible }) => {
    const firstMsg = messages[0];

    // Avatar
    const userAvatarBase = (() => {
        let url = firstMsg.avatar;
        if (!url) {
            const userObj = allUsers?.find(u => u.username === firstMsg.username);
            url = userObj?.avatar;
        }
        if (!url) url = getDeterministicAvatar(firstMsg.username);
        if (url && !url.startsWith('http') && !url.startsWith('blob:')) {
            url = `${absoluteHostUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
        }
        return url;
    })();

    // Get full URL for image
    const getFullUrl = (url) => {
        if (!url) return null;
        if (url.startsWith('http') || url.startsWith('blob:')) return url;
        return `${absoluteHostUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
    };

    // Collect all image URLs
    const allImages = messages.map(msg => {
        const imgUrl = msg.image_url || msg.image;
        if (imgUrl) return getFullUrl(imgUrl);
        const fileUrl = msg.file_url || msg.file;
        if (fileUrl && /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(msg.file_name || '')) {
            return getFullUrl(fileUrl);
        }
        return null;
    }).filter(Boolean);

    const MAX_VISIBLE = 4;
    const totalCount = allImages.length;
    const visibleImages = allImages.slice(0, MAX_VISIBLE);
    const visibleCount = visibleImages.length;
    const extraCount = Math.max(0, totalCount - MAX_VISIBLE);

    // Grid layout based on visible count
    const getGridStyle = () => {
        if (visibleCount === 1) return { gridTemplateColumns: '1fr', maxWidth: '300px' };
        if (visibleCount === 2) return { gridTemplateColumns: '1fr 1fr', maxWidth: '400px' };
        if (visibleCount === 3) return { gridTemplateColumns: '1fr 1fr', maxWidth: '400px' };
        return { gridTemplateColumns: '1fr 1fr', maxWidth: '400px' };
    };

    const timestamp = firstMsg.timestamp ? new Date(firstMsg.timestamp) : null;
    const timeStr = timestamp ?
        (timestamp.toDateString() === new Date().toDateString()
            ? timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : timestamp.toLocaleString([], { hour: '2-digit', minute: '2-digit' }))
        : '';

    const handleImageClick = (clickedIndex) => {
        if (onOpenGallery) {
            onOpenGallery(allImages, clickedIndex);
        }
    };

    return (
        <div style={{
            display: 'flex',
            padding: '4px 48px 4px 16px',
            gap: '12px',
            position: 'relative',
        }}>
            {/* Avatar */}
            <div style={{ flexShrink: 0, width: '40px', paddingTop: '2px' }}>
                <img
                    src={userAvatarBase}
                    alt={firstMsg.username}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', objectFit: 'cover' }}
                    onClick={() => onViewProfile(firstMsg.username)}
                />
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <strong style={{
                        cursor: 'pointer',
                        color: isAdmin && firstMsg.username === currentUser ? '#f0b232' : '#fff',
                        fontSize: '0.95em'
                    }} onClick={() => onViewProfile(firstMsg.username)}>
                        {firstMsg.username}
                    </strong>
                    <span style={{ color: '#72767d', fontSize: '0.75em' }}>{timeStr}</span>
                    {totalCount > 1 && (
                        <span style={{ color: '#5865f2', fontSize: '0.72em', fontWeight: 600 }}>
                            📷 {totalCount} fotoğraf
                        </span>
                    )}
                </div>

                {/* 🖼️ Image Grid - Max 4 visible */}
                <div style={{
                    display: 'grid',
                    ...getGridStyle(),
                    gap: '3px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}>
                    {visibleImages.map((imgUrl, idx) => {
                        const isLastWithExtra = idx === MAX_VISIBLE - 1 && extraCount > 0;
                        return (
                            <div
                                key={messages[idx]?.id || idx}
                                style={{
                                    aspectRatio: visibleCount === 1 ? 'auto' : (visibleCount === 3 && idx === 0 ? '2/1' : '1/1'),
                                    overflow: 'hidden',
                                    position: 'relative',
                                    ...(visibleCount === 3 && idx === 0 ? { gridColumn: '1 / -1' } : {}),
                                    maxHeight: visibleCount === 1 ? '300px' : (visibleCount === 3 && idx === 0 ? '200px' : '200px'),
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleImageClick(idx)}
                            >
                                <img
                                    src={imgUrl}
                                    alt={`gallery-${idx}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block',
                                        transition: 'transform 0.2s, filter 0.2s',
                                        filter: isLastWithExtra ? 'brightness(0.4)' : 'none',
                                    }}
                                    loading="lazy"
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'scale(1.05)';
                                        if (!isLastWithExtra) e.target.style.filter = 'brightness(0.85)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'scale(1)';
                                        if (!isLastWithExtra) e.target.style.filter = 'none';
                                        else e.target.style.filter = 'brightness(0.4)';
                                    }}
                                />
                                {/* +N overlay on last visible image */}
                                {isLastWithExtra && (
                                    <div style={{
                                        position: 'absolute',
                                        top: 0, left: 0, right: 0, bottom: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        pointerEvents: 'none',
                                    }}>
                                        <span style={{
                                            color: '#fff',
                                            fontSize: '2rem',
                                            fontWeight: 700,
                                            textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                                            letterSpacing: '1px',
                                        }}>
                                            +{extraCount}
                                        </span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});


export default ImageGalleryGroup;
