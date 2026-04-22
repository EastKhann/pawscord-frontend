// frontend/src/ReplyPreview.js

import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../i18n';

const ReplyPreview = ({ message, onCancel }) => {
    if (!message) return null;

    return (
        <div aria-label={i18n.t('aria.replyPreview', { defaultValue: 'Reply Preview' })} style={styles.container}>
            <div style={styles.content}>
                <span style={styles.replyingTo}>
                    {t('replyPreview.replyingTo','Replying to')} <strong>@{message.username}</strong>
                </span>
                <p style={styles.messageText}>{message.content}</p>
            </div>
            <button onClick={onCancel} style={styles.cancelButton}>
                ×
            </button>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#111214',
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
        color: '#b5bac1',
    },
    messageText: {
        margin: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: '#dbdee1',
        fontSize: '0.9em',
    },
    cancelButton: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        fontSize: '1.5em',
        cursor: 'pointer',
        marginLeft: '10px',
    },
};

ReplyPreview.propTypes = {
    message: PropTypes.string,
    onCancel: PropTypes.func,
};
export default React.memo(ReplyPreview);
