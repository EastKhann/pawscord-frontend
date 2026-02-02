// frontend/src/ReplyPreview.js

import React from 'react';

const ReplyPreview = ({ message, onCancel }) => {
    if (!message) return null;

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <span style={styles.replyingTo}>Yanıtlanıyor: <strong>@{message.username}</strong></span>
                <p style={styles.messageText}>{message.content}</p>
            </div>
            <button onClick={onCancel} style={styles.cancelButton}>×</button>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#2f3136',
        padding: '8px 20px',
        margin: '0 -20px 10px -20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #444',
    },
    content: {
        overflow: 'hidden',
    },
    replyingTo: {
        fontSize: '0.8em',
        color: '#b9bbbe',
    },
    messageText: {
        margin: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: '#dcddde',
        fontSize: '0.9em',
    },
    cancelButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        fontSize: '1.5em',
        cursor: 'pointer',
        marginLeft: '10px',
    },
};

export default React.memo(ReplyPreview);

