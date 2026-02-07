// frontend/src/components/VoiceChannelStatus.js
// 🔥 FEATURE 28: Voice channel status/topic display
// Shows a topic or status above the voice channel

import React, { memo, useState } from 'react';
import { FaPen, FaCheck, FaTimes, FaMicrophone } from 'react-icons/fa';

const VoiceChannelStatus = ({ status, channelId, isAdmin = false, onSave }) => {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(status || '');

    const handleSave = () => {
        onSave?.(channelId, draft.trim());
        setEditing(false);
    };

    const handleCancel = () => {
        setDraft(status || '');
        setEditing(false);
    };

    if (editing) {
        return (
            <div style={S.editContainer}>
                <input
                    type="text"
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    placeholder="Sesli kanal durumu..."
                    style={S.input}
                    maxLength={100}
                    autoFocus
                    onKeyDown={e => {
                        if (e.key === 'Enter') handleSave();
                        if (e.key === 'Escape') handleCancel();
                    }}
                />
                <button type="button" style={S.iconBtn} onClick={handleSave}>
                    <FaCheck style={{ color: '#57f287', fontSize: 12 }} />
                </button>
                <button type="button" style={S.iconBtn} onClick={handleCancel}>
                    <FaTimes style={{ color: '#ed4245', fontSize: 12 }} />
                </button>
            </div>
        );
    }

    return (
        <div style={S.container}>
            {status ? (
                <span style={S.status}>{status}</span>
            ) : (
                <span style={S.placeholder}>
                    <FaMicrophone style={{ fontSize: 10 }} /> Sesli Kanal
                </span>
            )}
            {isAdmin && (
                <button type="button" style={S.editBtn} onClick={() => setEditing(true)} title="Durumu Düzenle">
                    <FaPen style={{ fontSize: 10 }} />
                </button>
            )}
        </div>
    );
};

const S = {
    container: {
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '2px 0', minHeight: 18,
    },
    status: {
        fontSize: 11, color: '#b5bac1', fontStyle: 'italic',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        maxWidth: 180,
    },
    placeholder: {
        fontSize: 11, color: '#4e5058', display: 'flex', alignItems: 'center', gap: 4,
    },
    editBtn: {
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 18, height: 18, borderRadius: 4,
        border: 'none', background: 'transparent',
        color: '#4e5058', cursor: 'pointer', opacity: 0.6,
        transition: 'opacity 0.15s',
    },
    editContainer: {
        display: 'flex', alignItems: 'center', gap: 4, padding: '2px 0',
    },
    input: {
        flex: 1, padding: '2px 6px', fontSize: 11,
        backgroundColor: '#1e1f22', border: '1px solid rgba(88,101,242,0.4)',
        borderRadius: 4, color: '#dcddde', outline: 'none',
        maxWidth: 160,
    },
    iconBtn: {
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 18, height: 18, borderRadius: 4,
        border: 'none', background: 'transparent', cursor: 'pointer',
    },
};

export default memo(VoiceChannelStatus);
