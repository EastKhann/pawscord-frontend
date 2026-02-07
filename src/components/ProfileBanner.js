// frontend/src/components/ProfileBanner.js
// 🔥 FEATURE 30: Profile banner upload/display
// Shows a banner image at top of user profile, with upload capability

import React, { useState, useRef, memo, useCallback } from 'react';
import { FaCamera, FaTrash } from 'react-icons/fa';

const ProfileBanner = ({ bannerUrl, editable = false, onUpload, onRemove, accentColor = '#5865f2' }) => {
    const [hover, setHover] = useState(false);
    const fileRef = useRef(null);

    const handleFileChange = useCallback((e) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            onUpload?.(file);
        }
        e.target.value = '';
    }, [onUpload]);

    const hasBanner = !!bannerUrl;

    return (
        <div
            style={{
                ...S.container,
                backgroundImage: hasBanner ? `url(${bannerUrl})` : 'none',
                backgroundColor: hasBanner ? 'transparent' : accentColor,
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {/* Gradient overlay */}
            <div style={S.gradient} />

            {/* Edit overlay */}
            {editable && hover && (
                <div style={S.editOverlay}>
                    <button
                        type="button"
                        style={S.editBtn}
                        onClick={() => fileRef.current?.click()}
                        title="Banner Yükle"
                    >
                        <FaCamera style={{ fontSize: 16 }} />
                        <span>Banner Değiştir</span>
                    </button>
                    {hasBanner && (
                        <button
                            type="button"
                            style={{ ...S.editBtn, ...S.removeBtn }}
                            onClick={onRemove}
                            title="Banner Kaldır"
                        >
                            <FaTrash style={{ fontSize: 14 }} />
                        </button>
                    )}
                </div>
            )}

            <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </div>
    );
};

const S = {
    container: {
        position: 'relative', width: '100%', height: 120,
        backgroundSize: 'cover', backgroundPosition: 'center',
        borderRadius: '8px 8px 0 0',
    },
    gradient: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 40,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.3))',
    },
    editOverlay: {
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 8, backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: '8px 8px 0 0',
    },
    editBtn: {
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '8px 14px', borderRadius: 6,
        border: 'none', backgroundColor: 'rgba(0,0,0,0.5)',
        color: '#fff', cursor: 'pointer', fontSize: 13,
        fontWeight: 500, transition: 'all 0.15s',
    },
    removeBtn: {
        padding: '8px 10px',
    },
};

export default memo(ProfileBanner);
