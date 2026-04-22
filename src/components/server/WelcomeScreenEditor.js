/* eslint-disable jsx-a11y/label-has-associated-control */
// frontend/src/components/WelcomeScreenEditor.js

// 🔥 FEATURE 40: Welcome screen editor

// Admin can configure what new members see when joining

import { useState, memo, useCallback } from 'react';

import PropTypes from 'prop-types';

import { FaEdit, FaPlus, FaTrash, FaHashtag, FaGripVertical, FaSave, FaEye } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const EMOJI_PRESETS = ['👋', '📢', '📖', '🎮', '💬', '🎵', '🎨', '📌', '🔧', '', '🚀', ''];

const WelcomeScreenEditor = ({ serverName, initialConfig, channels = [], onSave }) => {
    const { t } = useTranslation();
    const [description, setDescription] = useState(
        initialConfig?.description || `${serverName} Welcome!`
    );

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);

    const [welcomeChannels, setWelcomeChannels] = useState(
        initialConfig?.channels || [{ channelId: null, description: 'Join the chat', emoji: '💬' }]
    );

    const [preview, setPreview] = useState(false);

    const addChannel = useCallback(() => {
        if (welcomeChannels.length >= 5) return;

        setWelcomeChannels((prev) => [...prev, { channelId: null, description: '', emoji: '📌' }]);
    }, [welcomeChannels.length]);

    const removeChannel = useCallback((index) => {
        setWelcomeChannels((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const updateChannel = useCallback((index, field, value) => {
        setWelcomeChannels((prev) => {
            const updated = [...prev];

            updated[index] = { ...updated[index], [field]: value };

            return updated;
        });
    }, []);

    const handleSave = useCallback(() => {
        onSave?.({
            description,

            channels: welcomeChannels.filter((c) => c.channelId),
        });
    }, [description, welcomeChannels, onSave]);

    if (preview) {
        return (
            <div style={S.previewContainer}>
                <div style={S.previewHeader}>
                    <h2 style={S.previewTitle}>{serverName}</h2>

                    <p style={S.previewDesc}>{description}</p>
                </div>

                <div style={S.previewChannels}>
                    {welcomeChannels
                        .filter((c) => c.channelId || c.description)
                        .map((wc, i) => {
                            const channel = channels.find((c) => c.id === wc.channelId);

                            return (
                                <div key={`item-${i}`} style={S.previewChannel}>
                                    <span style={S.previewEmoji}>{wc.emoji}</span>

                                    <div>
                                        <span style={S.previewChannelName}>
                                            {channel?.name || 'kanal'}
                                        </span>

                                        <span style={S.previewChannelDesc}>{wc.description}</span>
                                    </div>
                                </div>
                            );
                        })}
                </div>

                <button
                    aria-label={t('welcomeEditor.backToEdit', 'Back to edit')}
                    onClick={() => setPreview(false)}
                >
                    <FaEdit /> {t('welcomeEditor.backToEdit', 'Back to Edit')}
                </button>
            </div>
        );
    }

    return (
        <div style={S.container}>
            <div style={S.headerRow}>
                <h3 style={S.title}>{t('welcomeEditor.title', 'Welcome Screen')}</h3>

                <button
                    aria-label={t('welcomeEditor.preview', 'Preview welcome screen')}
                    onClick={() => setPreview(true)}
                >
                    <FaEye /> {t('common.preview', 'Preview')}
                </button>
            </div>

            {/* Description */}

            <div style={S.field}>
                <label style={S.label}>{t('common.description', 'Description')}</label>

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t('server.descriptionPlaceholder', 'Server description...')}
                    style={S.textarea}
                    maxLength={300}
                    rows={2}
                />

                <span style={S.charCount}>{description.length}/300</span>
            </div>

            {/* Welcome Channels */}

            <div style={S.field}>
                <label style={S.label}>{t('welcomeEditor.suggestedChannels', 'Suggested Channels ({count}/5)', { count: welcomeChannels.length })}</label>

                {welcomeChannels.map((wc, i) => (
                    <div key={`item-${i}`} style={S.channelRow}>
                        <FaGripVertical style={S.txt} />

                        <select
                            style={S.emojiSelect}
                            value={wc.emoji}
                            onChange={(e) => updateChannel(i, 'emoji', e.target.value)}
                        >
                            {EMOJI_PRESETS.map((em) => (
                                <option key={em} value={em}>
                                    {em}
                                </option>
                            ))}
                        </select>

                        <select
                            style={S.channelSelect}
                            value={wc.channelId || ''}
                            onChange={(e) => updateChannel(i, 'channelId', e.target.value || null)}
                        >
                            <option value="">{t('giveaway.selectChannel', 'Select Channel')}</option>

                            {channels.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            value={wc.description}
                            onChange={(e) => updateChannel(i, 'description', e.target.value)}
                            placeholder={t('channel.descriptionPlaceholder', 'Channel description')}
                            style={S.descInput}
                            maxLength={50}
                            aria-label={t('welcomeEditor.channelDescription', 'Channel description')}
                        />

                        <button
                            aria-label={t('welcomeEditor.removeChannel', 'Remove channel')}
                            onClick={() => removeChannel(i)}
                        >
                            <FaTrash className="fs-12" />
                        </button>
                    </div>
                ))}

                {welcomeChannels.length < 5 && (
                    <button
                        aria-label={t('welcomeEditor.addChannel', 'Add channel')}
                        type="button"
                        style={S.addBtn}
                        onClick={addChannel}
                    >
                        <FaPlus /> Kanal Ekle
                    </button>
                )}
            </div>

            <button aria-label={t('welcomeEditor.save', 'Save welcome screen')} type="button" style={S.saveBtn} onClick={handleSave}>
                <FaSave /> Save
            </button>
        </div>
    );
};

const S = {
    container: { padding: 20 },

    headerRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        marginBottom: 20,
    },

    title: { fontSize: 18, fontWeight: 700, color: '#f2f3f5', margin: 0 },

    previewBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,

        padding: '6px 12px',
        borderRadius: 4,

        border: 'none',
        backgroundColor: 'rgba(255,255,255,0.06)',

        color: '#dbdee1',
        fontSize: 13,
        cursor: 'pointer',
    },

    field: {
        marginBottom: 20,
        position: 'relative',
    },

    label: {
        display: 'block',
        fontSize: 12,
        fontWeight: 700,
        color: '#b5bac1',

        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: 8,
    },

    textarea: {
        width: '100%',
        resize: 'none',
        padding: '8px 10px',

        backgroundColor: '#0d0e10',
        border: '1px solid rgba(255,255,255,0.06)',

        borderRadius: 6,
        color: '#dbdee1',
        fontSize: 14,

        outline: 'none',
        fontFamily: 'inherit',
        boxSizing: 'border-box',
    },

    charCount: {
        position: 'absolute',
        right: 8,
        bottom: 8,

        fontSize: 11,
        color: '#4e5058',
    },

    channelRow: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,

        marginBottom: 8,
        padding: '6px 8px',

        backgroundColor: '#0d0e10',
        borderRadius: 6,
    },

    emojiSelect: {
        width: 42,
        backgroundColor: '#111214',
        border: 'none',
        borderRadius: 4,

        color: '#dbdee1',
        fontSize: 16,
        padding: '4px',
        textAlign: 'center',

        outline: 'none',
        cursor: 'pointer',
    },

    channelSelect: {
        flex: 1,
        backgroundColor: '#111214',
        border: 'none',
        borderRadius: 4,

        color: '#dbdee1',
        fontSize: 13,
        padding: '6px 8px',
        outline: 'none',
    },

    descInput: {
        flex: 1,
        backgroundColor: '#111214',
        border: 'none',
        borderRadius: 4,

        color: '#dbdee1',
        fontSize: 13,
        padding: '6px 8px',
        outline: 'none',
    },

    removeBtn: {
        width: 28,
        height: 28,
        borderRadius: 4,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        border: 'none',
        background: 'transparent',

        color: '#f23f42',
        cursor: 'pointer',
    },

    addBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,

        padding: '8px 12px',
        borderRadius: 6,

        border: '1px dashed rgba(255,255,255,0.1)',

        background: 'transparent',
        color: '#5865f2',

        fontSize: 13,
        cursor: 'pointer',
        width: '100%',

        justifyContent: 'center',
    },

    saveBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,

        padding: '10px 24px',
        borderRadius: 4,

        border: 'none',
        backgroundColor: '#5865f2',

        color: '#fff',
        fontSize: 14,
        fontWeight: 500,

        cursor: 'pointer',
    },

    // Preview styles

    previewContainer: {
        padding: 20,
        textAlign: 'center',
    },

    previewHeader: {
        marginBottom: 20,
    },

    previewTitle: {
        fontSize: 24,
        fontWeight: 700,
        color: '#f2f3f5',
        margin: 0,
    },

    previewDesc: {
        fontSize: 14,
        color: '#b5bac1',
        margin: '8px 0 0',
    },

    previewChannels: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,

        maxWidth: 400,
        margin: '0 auto',
    },

    previewChannel: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,

        padding: '10px 14px',
        backgroundColor: '#111214',

        borderRadius: 8,
        textAlign: 'left',
    },

    previewEmoji: { fontSize: 24 },

    previewChannelName: {
        display: 'block',
        fontSize: 14,
        fontWeight: 600,
        color: '#f2f3f5',
    },

    previewChannelDesc: {
        display: 'block',
        fontSize: 12,
        color: '#b5bac1',
        marginTop: 2,
    },

    backBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,

        margin: '20px auto 0',
        padding: '8px 16px',

        borderRadius: 4,
        border: 'none',

        backgroundColor: 'rgba(255,255,255,0.06)',

        color: '#dbdee1',
        fontSize: 14,
        cursor: 'pointer',
    },

    txt: { fontSize: 12, color: '#4e5058', cursor: 'grab' },
};

WelcomeScreenEditor.propTypes = {
    serverName: PropTypes.string,

    initialConfig: PropTypes.object,

    channels: PropTypes.array,

    onSave: PropTypes.func,
};

export default memo(WelcomeScreenEditor);
