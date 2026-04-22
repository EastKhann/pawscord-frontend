/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// frontend/src/components/ImageGalleryGroup.js
// Extracted from App.js - WhatsApp-style image gallery
// =============================================

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
const _s = (o) => o;

// -- dynamic style helpers (pass 2) --
const _st1174 = {
    display: 'grid',
    gap: '3px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
};

// --- 🖼️ WhatsApp-style Image Gallery Group ---
const ImageGalleryGroup = React.memo(
    ({
        messages,
        currentUser,
        absoluteHostUrl,
        isAdmin,
        onOpenGallery,
        onViewProfile,
        onDelete,
        allUsers,
        getDeterministicAvatar,
        fetchWithAuth,
        onVisible,
    }) => {
        const [error, setError] = useState(null);
        const { t } = useTranslation();
        const firstMsg = messages[0];

        // Avatar
        const userAvatarBase = (() => {
            let url = firstMsg.avatar;
            if (!url) {
                const userObj = allUsers?.find((u) => u.username === firstMsg.username);
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
        const allImages = messages
            .map((msg) => {
                const imgUrl = msg.image_url || msg.image;
                if (imgUrl) return getFullUrl(imgUrl);
                const fileUrl = msg.file_url || msg.file;
                if (fileUrl && /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(msg.file_name || '')) {
                    return getFullUrl(fileUrl);
                }
                return null;
            })
            .filter(Boolean);

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
        const timeStr = timestamp
            ? timestamp.toDateString() === new Date().toDateString()
                ? timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : timestamp.toLocaleString([], { hour: '2-digit', minute: '2-digit' })
            : '';

        const handleImageClick = (clickedIndex) => {
            if (onOpenGallery) {
                onOpenGallery(allImages, clickedIndex);
            }
        };

        const S = {
            wrapper: {
                display: 'flex',
                padding: '4px 48px 4px 16px',
                gap: '12px',
                position: 'relative',
            },
            avatarWrap: { flexShrink: 0, width: '40px', paddingTop: '2px' },
            avatarImg: {
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                objectFit: 'cover',
            },
            timeSpan: { color: '#949ba4', fontSize: '0.75em' },
            photoCount: { color: '#5865f2', fontSize: '0.72em', fontWeight: 600 },
            overlay: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
            },
            overlayCnt: {
                color: '#fff',
                fontSize: '2rem',
                fontWeight: 700,
                textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                letterSpacing: '1px',
            },
        };
        return (
            <div aria-label={t('gallery.imageGroup', 'Image gallery')} style={S.wrapper}>
                {/* Avatar */}
                <div style={S.avatarWrap}>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                    <img
                        src={userAvatarBase}
                        alt={firstMsg.username}
                        style={S.avatarImg}
                        onClick={() => onViewProfile(firstMsg.username)}
                    />
                </div>

                {/* Content */}
                <div className="flex-min0">
                    {/* Header */}
                    <div className="flex-align-8-mb4">
                        <span
                            role="button"
                            tabIndex={0}
                            style={_s({
                                cursor: 'pointer',
                                color:
                                    isAdmin && firstMsg.username === currentUser
                                        ? '#f0b232'
                                        : '#fff',
                                fontSize: '0.95em',
                            })}
                            onClick={() => onViewProfile(firstMsg.username)}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') &&
                                onViewProfile(firstMsg.username)
                            }
                        >
                            {firstMsg.username}
                        </span>
                        <span style={S.timeSpan}>{timeStr}</span>
                        {totalCount > 1 && (
                            <span style={S.photoCount}>📷 {totalCount} {t('imageGallery.photos', 'photos')}</span>
                        )}
                    </div>

                    {/* 🖼️ Image Grid - Max 4 visible */}
                    <div style={_s({ ..._st1174, ...getGridStyle() })}>
                        {visibleImages.map((imgUrl, idx) => {
                            const isLastWithExtra = idx === MAX_VISIBLE - 1 && extraCount > 0;
                            return (
                                <div
                                    key={messages[idx]?.id || idx}
                                    style={_s({
                                        aspectRatio:
                                            visibleCount === 1
                                                ? 'auto'
                                                : visibleCount === 3 && idx === 0
                                                    ? '2/1'
                                                    : '1/1',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        ...(visibleCount === 3 && idx === 0
                                            ? { gridColumn: '1 / -1' }
                                            : {}),
                                        maxHeight:
                                            visibleCount === 1
                                                ? '300px'
                                                : visibleCount === 3 && idx === 0
                                                    ? '200px'
                                                    : '200px',
                                        cursor: 'pointer',
                                    })}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => handleImageClick(idx)}
                                    onKeyDown={(e) =>
                                        (e.key === 'Enter' || e.key === ' ') &&
                                        e.currentTarget.click()
                                    }
                                >
                                    <img
                                        src={imgUrl}
                                        alt={`gallery-${idx}`}
                                        style={_s({
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            display: 'block',
                                            transition: 'transform 0.2s, filter 0.2s',
                                            filter: isLastWithExtra ? 'brightness(0.4)' : 'none',
                                        })}
                                        loading="lazy"
                                        onMouseEnter={(e) => {
                                            e.target.style.transform = 'scale(1.05)';
                                            if (!isLastWithExtra)
                                                e.target.style.filter = 'brightness(0.85)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.transform = 'scale(1)';
                                            if (!isLastWithExtra) e.target.style.filter = 'none';
                                            else e.target.style.filter = 'brightness(0.4)';
                                        }}
                                    />
                                    {/* +N overlay on last visible image */}
                                    {isLastWithExtra && (
                                        <div style={S.overlay}>
                                            <span style={S.overlayCnt}>+{extraCount}</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
);

ImageGalleryGroup.propTypes = {
    messages: PropTypes.array,
    currentUser: PropTypes.object,
    absoluteHostUrl: PropTypes.string,
    isAdmin: PropTypes.bool,
    onOpenGallery: PropTypes.func,
    onViewProfile: PropTypes.func,
    onDelete: PropTypes.func,
    allUsers: PropTypes.array,
    getDeterministicAvatar: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    onVisible: PropTypes.func,
};
export default ImageGalleryGroup;
