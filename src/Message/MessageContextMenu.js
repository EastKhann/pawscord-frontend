import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
    FaSmile,
    FaReply,
    FaEdit,
    FaFileAlt,
    FaThumbtack,
    FaShareSquare,
    FaComments,
    FaBell,
    FaExclamationTriangle,
    FaTrash,
} from 'react-icons/fa';
const _s = (o) => o;
import styles from './styles';
import toast from '../utils/toast';
import confirmDialog from '../utils/confirmDialog';

const MessageContextMenu = ({
    contextMenu,
    msg,
    isMyMessage,
    displayContent,
    onSetReply,
    onStartEdit,
    onDelete,
    onTogglePin,
    onStartForward,
    setShowReactionPicker,
    setShowThreadModal,
    setShowReminderModal,
    setContextMenu,
    fetchWithAuth,
    absoluteHostUrl,
}) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    if (!contextMenu) return null;

    const menuItem = (icon, label, onClick, danger) => (
        <div
            className="context-menu-item"
            style={_s({ ...styles.contextMenuItem, ...(danger ? { color: '#f23f42' } : {}) })}
            role="menuitem"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(e)}
        >
            {icon} {label}
        </div>
    );

    return (
        <div
            aria-label="message context menu"
            role="menu"
            tabIndex={-1}
            style={_s({
                ...styles.contextMenu,
                left: `${contextMenu.x}>px`,
                top: `${contextMenu.y}px`,
            })}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
        >
            {menuItem(<FaSmile />, t('messageMenu.addReaction', 'Tepki Ekle'), () => {
                setShowReactionPicker(true);
                setContextMenu(null);
            })}
            {menuItem(<FaReply />, t('messageMenu.reply', 'Yanıtla'), () => {
                onSetReply(msg);
                setContextMenu(null);
            })}

            {isMyMessage &&
                msg.content &&
                menuItem(<FaEdit />, t('messageMenu.edit', 'Düzenle'), () => {
                    onStartEdit(msg);
                    setContextMenu(null);
                })}

            {menuItem(<FaFileAlt />, t('messageMenu.copyMessage', 'Mesajı Kopyala'), () => {
                navigator.clipboard.writeText(displayContent);
                toast.success(t('messageMenu.copied', '✅ Mesaj kopyalandı'));
                setContextMenu(null);
            })}

            {menuItem(
                <FaThumbtack />,
                msg.is_pinned
                    ? t('messageMenu.unpin', 'Sabitlendiği Kaldır')
                    : t('messageMenu.pin', 'Sabitle'),
                async () => {
                    await onTogglePin(msg.id);
                    setContextMenu(null);
                }
            )}

            {menuItem(<FaShareSquare />, t('messageMenu.forward', 'İlet'), () => {
                onStartForward(msg);
                setContextMenu(null);
            })}
            {menuItem(<FaComments />, t('messageMenu.startThread', 'Konu Başlat'), () => {
                setShowThreadModal(true);
                setContextMenu(null);
            })}
            {menuItem(<FaBell />, t('messageMenu.setReminder', 'Hatırlatıcı Ayarla'), () => {
                setShowReminderModal(true);
                setContextMenu(null);
            })}

            <div style={styles.contextMenuDivider}></div>

            {isMyMessage &&
                menuItem(
                    <FaTrash />,
                    t('messageMenu.delete', 'Sil'),
                    async () => {
                        if (
                            await confirmDialog(
                                t(
                                    'messageMenu.deleteConfirm',
                                    'Bu mesajı silmek istediğinizden emin misiniz?'
                                )
                            )
                        ) {
                            await onDelete(msg.id);
                            setContextMenu(null);
                        }
                    },
                    true
                )}

            {!isMyMessage &&
                menuItem(
                    <FaExclamationTriangle />,
                    t('messageMenu.report', 'Bildir'),
                    async () => {
                        const reason = prompt(t('messageMenu.reportReason', 'Bildirme sebebi:'));
                        if (reason) {
                            await fetchWithAuth(`${absoluteHostUrl}/api/messages/report/`, {
                                method: 'POST',
                                body: JSON.stringify({ message_id: msg.id, reason }),
                            });
                            toast.success(t('messageMenu.reportSent', '✅ Bildiri gönderildi'));
                            setContextMenu(null);
                        }
                    },
                    true
                )}
        </div>
    );
};

MessageContextMenu.propTypes = {
    contextMenu: PropTypes.object,
    msg: PropTypes.object,
    isMyMessage: PropTypes.bool,
    displayContent: PropTypes.object,
    onSetReply: PropTypes.func,
    onStartEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onTogglePin: PropTypes.func,
    onStartForward: PropTypes.func,
    setShowReactionPicker: PropTypes.func,
    setShowThreadModal: PropTypes.func,
    setShowReminderModal: PropTypes.func,
    setContextMenu: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    absoluteHostUrl: PropTypes.string,
};
export default MessageContextMenu;
