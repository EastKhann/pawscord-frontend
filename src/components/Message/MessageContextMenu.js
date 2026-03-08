// frontend/src/components/Message/MessageContextMenu.js
// 📋 MESSAGE CONTEXT MENU - Right-click menu

import { memo, useCallback } from 'react';
import {
    FaReply, FaEdit, FaTrash, FaSmile, FaShareSquare,
    FaFileAlt, FaThumbtack, FaBell, FaComments, FaExclamationTriangle
} from 'react-icons/fa';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';

export const MessageContextMenu = memo(({
    msg,
    contextMenu,
    displayContent,
    isMyMessage,
    onSetReply,
    onStartEdit,
    onDelete,
    onTogglePin,
    onStartForward,
    onShowReactionPicker,
    onShowThreadModal,
    onShowReminderModal,
    onClose,
    fetchWithAuth,
    absoluteHostUrl
}) => {
    if (!contextMenu) return null;

    // Copy message to clipboard
    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(displayContent);
        toast.success('✅ Mesaj kopyalandı');
        onClose();
    }, [displayContent, onClose]);

    // Report message
    const handleReport = useCallback(async () => {
        const reason = prompt('Rapor sebebi:');
        if (reason) {
            await fetchWithAuth(`${absoluteHostUrl}/api/messages/report/`, {
                method: 'POST',
                body: JSON.stringify({ message_id: msg.id, reason })
            });
            toast.success('✅ Rapor gönderildi');
            onClose();
        }
    }, [msg.id, fetchWithAuth, absoluteHostUrl, onClose]);

    return (
        <div
            style={{
                ...styles.contextMenu,
                left: `${contextMenu.x}px`,
                top: `${contextMenu.y}px`
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <div
                className="context-menu-item"
                style={styles.contextMenuItem}
                onClick={() => { onShowReactionPicker(); onClose(); }}
            >
                <FaSmile /> Tepki Ekle
            </div>

            <div
                className="context-menu-item"
                style={styles.contextMenuItem}
                onClick={() => { onSetReply(msg); onClose(); }}
            >
                <FaReply /> Yanıtla
            </div>

            {isMyMessage && msg.content && (
                <div
                    className="context-menu-item"
                    style={styles.contextMenuItem}
                    onClick={() => { onStartEdit(msg); onClose(); }}
                >
                    <FaEdit /> Düzenle
                </div>
            )}

            <div
                className="context-menu-item"
                style={styles.contextMenuItem}
                onClick={handleCopy}
            >
                <FaFileAlt /> Mesajı Kopyala
            </div>

            <div
                className="context-menu-item"
                style={styles.contextMenuItem}
                onClick={async () => { await onTogglePin(msg.id); onClose(); }}
            >
                <FaThumbtack /> {msg.is_pinned ? 'Sabitlemeyi Kaldır' : 'Sabitle'}
            </div>

            <div
                className="context-menu-item"
                style={styles.contextMenuItem}
                onClick={() => { onStartForward(msg); onClose(); }}
            >
                <FaShareSquare /> İlet
            </div>

            <div
                className="context-menu-item"
                style={styles.contextMenuItem}
                onClick={() => { onShowThreadModal(); onClose(); }}
            >
                <FaComments /> Thread Başlat
            </div>

            <div
                className="context-menu-item"
                style={styles.contextMenuItem}
                onClick={() => { onShowReminderModal(); onClose(); }}
            >
                <FaBell /> Hatırlatıcı Kur
            </div>

            <div style={styles.contextMenuDivider}></div>

            {isMyMessage && (
                <div
                    className="context-menu-item danger"
                    style={{ ...styles.contextMenuItem, color: '#f23f42' }}
                    onClick={async () => {
                        if (await confirmDialog('Bu mesajı silmek istediğinize emin misiniz?')) {
                            await onDelete(msg.id);
                            onClose();
                        }
                    }}
                >
                    <FaTrash /> Sil
                </div>
            )}

            {!isMyMessage && (
                <div
                    className="context-menu-item danger"
                    style={{ ...styles.contextMenuItem, color: '#f23f42' }}
                    onClick={handleReport}
                >
                    <FaExclamationTriangle /> Rapor Et
                </div>
            )}
        </div>
    );
});

const styles = {
    contextMenu: {
        position: 'fixed',
        backgroundColor: '#18191c',
        border: '1px solid #0e1222',
        borderRadius: '6px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
        zIndex: 10000,
        minWidth: '220px',
        overflow: 'hidden',
        padding: '6px 0'
    },
    contextMenuItem: {
        padding: '10px 14px',
        cursor: 'pointer',
        color: '#b5bac1',
        fontSize: '0.9em',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'all 0.15s',
        backgroundColor: 'transparent'
    },
    contextMenuDivider: {
        height: '1px',
        backgroundColor: '#111214',
        margin: '6px 0'
    }
};

MessageContextMenu.displayName = 'MessageContextMenu';
export default MessageContextMenu;
