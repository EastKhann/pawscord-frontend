// frontend/src/components/RoleColorPreview.js
// 🔥 FEATURE 41: Role color live preview
// Shows a real-time preview of role color changes before saving

import React, { useState, memo, useCallback, useMemo } from 'react';
import { FaPalette, FaEyeDropper, FaCheck, FaUndo } from 'react-icons/fa';

const PRESET_COLORS = [
    '#5865f2', '#57f287', '#fee75c', '#ed4245', '#eb459e',
    '#f47fff', '#9146ff', '#00b0f4', '#1abc9c', '#e67e22',
    '#e91e63', '#2ecc71', '#3498db', '#9b59b6', '#f1c40f',
    '#e74c3c', '#1abc9c', '#95a5a6', '#607d8b', '#ff6b6b',
];

const RoleColorPreview = ({ roleName = 'Rol', initialColor = '#5865f2', onColorChange, onSave }) => {
    const [color, setColor] = useState(initialColor);
    const [customInput, setCustomInput] = useState(initialColor);

    const hasChanged = color !== initialColor;

    const handleColorChange = useCallback((newColor) => {
        setColor(newColor);
        setCustomInput(newColor);
        onColorChange?.(newColor);
    }, [onColorChange]);

    const handleCustomInput = useCallback((val) => {
        setCustomInput(val);
        if (/^#[0-9a-fA-F]{6}$/.test(val)) {
            setColor(val);
            onColorChange?.(val);
        }
    }, [onColorChange]);

    const handleReset = useCallback(() => {
        handleColorChange(initialColor);
    }, [initialColor, handleColorChange]);

    const handleSave = useCallback(() => {
        onSave?.(color);
    }, [color, onSave]);

    // Generate lighter shade for background preview
    const lighterColor = useMemo(() => {
        return `${color}15`;
    }, [color]);

    return (
        <div style={S.container}>
            <div style={S.header}>
                <FaPalette style={{ fontSize: 14, color }} />
                <span style={S.title}>Rol Rengi</span>
            </div>

            {/* Live Preview */}
            <div style={S.previewSection}>
                <div style={S.previewLabel}>Önizleme</div>
                <div style={S.previewCard}>
                    {/* Username preview */}
                    <div style={S.previewRow}>
                        <div style={{ ...S.previewAvatar, backgroundColor: color }}>
                            {roleName[0]?.toUpperCase()}
                        </div>
                        <div>
                            <span style={{ ...S.previewName, color }}>{roleName} Üyesi</span>
                            <span style={S.previewMsg}>Bu bir örnek mesajdır</span>
                        </div>
                    </div>
                    {/* Role badge preview */}
                    <div style={S.badgeRow}>
                        <span style={{ ...S.roleBadge, borderColor: color, color }}>
                            <span style={{ ...S.roleDot, backgroundColor: color }} />
                            {roleName}
                        </span>
                    </div>
                    {/* Mention preview */}
                    <div style={S.mentionRow}>
                        Bahsetme: <span style={{ ...S.mention, backgroundColor: lighterColor, color }}>@{roleName}</span>
                    </div>
                </div>
            </div>

            {/* Color Grid */}
            <div style={S.colorGrid}>
                {PRESET_COLORS.map(c => (
                    <button
                        key={c}
                        type="button"
                        style={{
                            ...S.colorBtn,
                            backgroundColor: c,
                            border: c === color ? '2px solid #fff' : '2px solid transparent',
                            transform: c === color ? 'scale(1.15)' : 'scale(1)',
                        }}
                        onClick={() => handleColorChange(c)}
                    />
                ))}
            </div>

            {/* Custom Input */}
            <div style={S.customRow}>
                <FaEyeDropper style={{ fontSize: 12, color: '#4e5058' }} />
                <input
                    type="color"
                    value={color}
                    onChange={e => handleColorChange(e.target.value)}
                    style={S.colorPicker}
                />
                <input
                    type="text"
                    value={customInput}
                    onChange={e => handleCustomInput(e.target.value)}
                    placeholder="#5865f2"
                    style={S.hexInput}
                    maxLength={7}
                />
            </div>

            {/* Actions */}
            {hasChanged && (
                <div style={S.actions}>
                    <button type="button" style={S.resetBtn} onClick={handleReset}>
                        <FaUndo style={{ fontSize: 12 }} /> Geri Al
                    </button>
                    <button type="button" style={S.saveBtn} onClick={handleSave}>
                        <FaCheck style={{ fontSize: 12 }} /> Kaydet
                    </button>
                </div>
            )}
        </div>
    );
};

const S = {
    container: { padding: 16 },
    header: {
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16,
    },
    title: {
        fontSize: 14, fontWeight: 600, color: '#f2f3f5',
    },
    previewSection: { marginBottom: 16 },
    previewLabel: {
        fontSize: 11, fontWeight: 700, color: '#b5bac1',
        textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8,
    },
    previewCard: {
        backgroundColor: '#2b2d31', borderRadius: 8, padding: 12,
        display: 'flex', flexDirection: 'column', gap: 8,
    },
    previewRow: {
        display: 'flex', alignItems: 'center', gap: 8,
    },
    previewAvatar: {
        width: 32, height: 32, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontSize: 14, fontWeight: 700,
    },
    previewName: {
        display: 'block', fontWeight: 600, fontSize: 14,
    },
    previewMsg: {
        display: 'block', color: '#dcddde', fontSize: 13,
    },
    badgeRow: {
        display: 'flex', gap: 4,
    },
    roleBadge: {
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '2px 8px', borderRadius: 10,
        border: '1px solid', fontSize: 12, fontWeight: 500,
    },
    roleDot: {
        width: 8, height: 8, borderRadius: '50%', display: 'inline-block',
    },
    mentionRow: {
        fontSize: 13, color: '#dcddde',
    },
    mention: {
        padding: '1px 4px', borderRadius: 3, fontWeight: 500,
    },
    colorGrid: {
        display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)',
        gap: 4, marginBottom: 12,
    },
    colorBtn: {
        width: 24, height: 24, borderRadius: 4,
        cursor: 'pointer', transition: 'all 0.15s',
    },
    customRow: {
        display: 'flex', alignItems: 'center', gap: 8,
        marginBottom: 12,
    },
    colorPicker: {
        width: 28, height: 28, padding: 0, border: 'none',
        borderRadius: 4, cursor: 'pointer', backgroundColor: 'transparent',
    },
    hexInput: {
        flex: 1, padding: '6px 10px',
        backgroundColor: '#1e1f22', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 4, color: '#dcddde', fontSize: 13,
        outline: 'none', fontFamily: 'monospace',
    },
    actions: {
        display: 'flex', gap: 8, justifyContent: 'flex-end',
    },
    resetBtn: {
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '6px 14px', borderRadius: 4,
        border: 'none', backgroundColor: 'rgba(255,255,255,0.06)',
        color: '#dcddde', fontSize: 13, cursor: 'pointer',
    },
    saveBtn: {
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '6px 14px', borderRadius: 4,
        border: 'none', backgroundColor: '#5865f2',
        color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer',
    },
};

export default memo(RoleColorPreview);
