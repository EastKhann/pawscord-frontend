// components/MessageEditHistoryModal.js
// 📝 Message Edit History Viewer

import React, { useState, useEffect } from 'react';
import { FaTimes, FaHistory, FaClock, FaUser } from 'react-icons/fa';

const MessageEditHistoryModal = ({ messageId, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHistory();
    }, [messageId]);

    const loadHistory = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/messages/${messageId}/edit_history/`);
            if (res.ok) {
                const data = await res.json();
                setHistory(data);
            }
        } catch (e) {
            console.error('Edit history load error:', e);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('tr-TR', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaHistory style={{ color: '#5865f2' }} />
                        <h3 style={styles.title}>Edit History</h3>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#b9bbbe' }}>
                            Loading history...
                        </div>
                    ) : history.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#72767d' }}>
                            No edit history found
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {history.map((edit, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        padding: '16px',
                                        backgroundColor: idx === 0 ? '#2f3136' : '#1e1f22',
                                        borderRadius: '8px',
                                        border: idx === 0 ? '2px solid #5865f2' : '1px solid #40444b'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '12px',
                                        paddingBottom: '8px',
                                        borderBottom: '1px solid #40444b'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{
                                                padding: '4px 8px',
                                                backgroundColor: idx === 0 ? '#5865f2' : '#40444b',
                                                color: 'white',
                                                borderRadius: '4px',
                                                fontSize: '12px',
                                                fontWeight: 'bold'
                                            }}>
                                                {idx === 0 ? 'CURRENT' : `Version ${history.length - idx}`}
                                            </span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#b9bbbe', fontSize: '13px' }}>
                                                <FaUser style={{ fontSize: '11px' }} />
                                                {edit.edited_by || 'Unknown'}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#72767d', fontSize: '12px' }}>
                                            <FaClock />
                                            {formatTime(edit.edited_at || edit.timestamp)}
                                        </div>
                                    </div>

                                    <div style={{
                                        padding: '12px',
                                        backgroundColor: '#40444b',
                                        borderRadius: '4px',
                                        color: '#dcddde',
                                        fontSize: '14px',
                                        lineHeight: '1.5',
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word'
                                    }}>
                                        {edit.content || edit.old_content}
                                    </div>

                                    {idx > 0 && idx < history.length - 1 && (
                                        <div style={{
                                            marginTop: '8px',
                                            padding: '6px 10px',
                                            backgroundColor: 'rgba(250, 166, 26, 0.1)',
                                            borderLeft: '3px solid #faa61a',
                                            borderRadius: '4px',
                                            fontSize: '12px',
                                            color: '#faa61a'
                                        }}>
                                            {getDifference(history[idx - 1].content, edit.content)}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={styles.footer}>
                    <button onClick={onClose} style={styles.closeBtn}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const getDifference = (newContent, oldContent) => {
    if (!newContent || !oldContent) return 'Content changed';
    const newLen = newContent.length;
    const oldLen = oldContent.length;
    if (newLen > oldLen) return `+${newLen - oldLen} characters added`;
    if (newLen < oldLen) return `-${oldLen - newLen} characters removed`;
    return 'Content modified';
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
    },
    modal: {
        backgroundColor: '#36393f',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
    },
    header: {
        padding: '20px',
        borderBottom: '1px solid #2f3136',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        margin: 0,
        color: '#ffffff',
        fontSize: '18px'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '8px',
        borderRadius: '4px',
        transition: 'background 0.2s'
    },
    content: {
        flex: 1,
        padding: '20px',
        overflowY: 'auto'
    },
    footer: {
        padding: '16px 20px',
        borderTop: '1px solid #2f3136',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    closeBtn: {
        padding: '8px 16px',
        backgroundColor: '#2f3136',
        color: '#dcddde',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold'
    }
};

export default MessageEditHistoryModal;



