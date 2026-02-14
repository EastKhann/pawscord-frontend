import {
    FaSmile, FaReply, FaEdit, FaFileAlt, FaThumbtack,
    FaShareSquare, FaComments, FaBell, FaExclamationTriangle, FaTrash
} from 'react-icons/fa';
import styles from './styles';
import toast from '../utils/toast';
import confirmDialog from '../utils/confirmDialog';

const MessageContextMenu = ({
    contextMenu, msg, isMyMessage, displayContent,
    onSetReply, onStartEdit, onDelete, onTogglePin,
    onStartForward, setShowReactionPicker, setShowThreadModal,
    setShowReminderModal, setContextMenu, fetchWithAuth, absoluteHostUrl
}) => {
    if (!contextMenu) return null;

    const menuItem = (icon, label, onClick, danger) => (
        <div className="context-menu-item"
            style={{ ...styles.contextMenuItem, ...(danger ? { color: '#ed4245' } : {}) }}
            onClick={onClick}
        >
            {icon} {label}
        </div>
    );

    return (
        <div
            style={{ ...styles.contextMenu, left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
            onClick={(e) => e.stopPropagation()}
        >
            {menuItem(<FaSmile />, 'Tepki Ekle', () => { setShowReactionPicker(true); setContextMenu(null); })}
            {menuItem(<FaReply />, 'Yanıtla', () => { onSetReply(msg); setContextMenu(null); })}

            {isMyMessage && msg.content && menuItem(<FaEdit />, 'Düzenle', () => { onStartEdit(msg); setContextMenu(null); })}

            {menuItem(<FaFileAlt />, 'Mesajı Kopyala', () => {
                navigator.clipboard.writeText(displayContent);
                toast.success('✅ Mesaj kopyalandı');
                setContextMenu(null);
            })}

            {menuItem(<FaThumbtack />, msg.is_pinned ? 'Sabitlemeyi Kaldır' : 'Sabitle', async () => {
                await onTogglePin(msg.id);
                setContextMenu(null);
            })}

            {menuItem(<FaShareSquare />, 'İlet', () => { onStartForward(msg); setContextMenu(null); })}
            {menuItem(<FaComments />, 'Thread Başlat', () => { setShowThreadModal(true); setContextMenu(null); })}
            {menuItem(<FaBell />, 'Hatırlatıcı Kur', () => { setShowReminderModal(true); setContextMenu(null); })}

            <div style={styles.contextMenuDivider}></div>

            {isMyMessage && menuItem(<FaTrash />, 'Sil', async () => {
                if (await confirmDialog('Bu mesajı silmek istediğinize emin misiniz?')) {
                    await onDelete(msg.id);
                    setContextMenu(null);
                }
            }, true)}

            {!isMyMessage && menuItem(<FaExclamationTriangle />, 'Rapor Et', async () => {
                const reason = prompt('Rapor sebebi:');
                if (reason) {
                    await fetchWithAuth(`${absoluteHostUrl}/api/messages/report/`, {
                        method: 'POST', body: JSON.stringify({ message_id: msg.id, reason })
                    });
                    toast.success('✅ Rapor gönderildi');
                    setContextMenu(null);
                }
            }, true)}
        </div>
    );
};

export default MessageContextMenu;
