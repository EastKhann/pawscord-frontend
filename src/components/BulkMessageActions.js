// components/BulkMessageActions.js
// ✂️ Bulk Message Selection & Actions

import React from 'react';
import { FaTrash, FaThumbtack, FaDownload, FaTimes, FaCheckSquare } from 'react-icons/fa';

const BulkMessageActions = ({
    selectedMessages,
    onClearSelection,
    onBulkDelete,
    onBulkPin,
    onBulkExport
}) => {
    const count = selectedMessages.size;

    if (count === 0) return null;

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <div style={styles.leftSection}>
                    <FaCheckSquare style={{ color: '#5865f2', fontSize: '18px' }} />
                    <span style={styles.count}>{count} message{count > 1 ? 's' : ''} selected</span>
                </div>

                <div style={styles.actions}>
                    <button
                        onClick={onBulkPin}
                        style={styles.actionButton}
                        title="Pin selected messages"
                    >
                        <FaThumbtack /> Pin
                    </button>

                    <button
                        onClick={onBulkExport}
                        style={styles.actionButton}
                        title="Export selected messages"
                    >
                        <FaDownload /> Export
                    </button>

                    <button
                        onClick={onBulkDelete}
                        style={{ ...styles.actionButton, ...styles.deleteButton }}
                        title="Delete selected messages"
                    >
                        <FaTrash /> Delete
                    </button>

                    <div style={styles.divider} />

                    <button
                        onClick={onClearSelection}
                        style={styles.cancelButton}
                        title="Clear selection"
                    >
                        <FaTimes /> Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        border: '1px solid #40444b',
        animation: 'slideUp 0.3s ease'
    },
    content: {
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    },
    leftSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    count: {
        color: '#dcddde',
        fontWeight: 'bold',
        fontSize: '14px'
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    actionButton: {
        padding: '8px 14px',
        backgroundColor: '#40444b',
        color: '#dcddde',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.2s'
    },
    deleteButton: {
        backgroundColor: '#f04747',
        color: 'white'
    },
    cancelButton: {
        padding: '8px 14px',
        backgroundColor: 'transparent',
        color: '#b9bbbe',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.2s'
    },
    divider: {
        width: '1px',
        height: '24px',
        backgroundColor: '#40444b',
        margin: '0 4px'
    }
};

export default BulkMessageActions;



