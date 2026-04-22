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
    const [reportMode, setReportMode] = useState(false);
    const [reportReason, setReportReason] = useState('');
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
            aria-label={t('aria.messageContextMenu', 'Message Menu')}
            role="menu"
            tabIndex={-1}
            style={_s({
                ...styles.contextMenu,
                left: `${contextMenu.x}px`,
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
                                    t('msgContextMenu.deleteConfirm', 'Are you sure you want to delete this message?')
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
                (reportMode ? (
                    <div style={{ padding: '8px 12px' }}>
                        <textarea
                            autoFocus
                            value={reportReason}
                            onChange={(e) => setReportReason(e.target.value)}
                            placeholder={t('messageMenu.reportReason', 'Bildirme sebebi...')}
                            rows={3}
                            style={{ width: '100%', padding: '6px 8px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.15)', background: '#1e1f23', color: '#fff', fontSize: 12, resize: 'none', boxSizing: 'border-box' }}
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                        <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                            <button
                                style={{ flex: 1, padding: '5px', background: '#f23f42', border: 'none', borderRadius: 6, color: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
                                onClick={async () => {
                                    if (!reportReason.trim()) return;
                                    await fetchWithAuth(`${absoluteHostUrl}/api/messages/report/`, {
                                        method: 'POST',
                                        body: JSON.stringify({ message_id: msg.id, reason: reportReason.trim() }),
                                    });
                                    toast.success(t('messageMenu.reportSent', '✅ Bildiri gönderildi'));
                                    setReportMode(false);
                                    setReportReason('');
                                    setContextMenu(null);
                                }}
                            >{t('messageMenu.submitReport', 'Gönder')}</button>
                            <button
                                style={{ padding: '5px 10px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 6, color: '#b5bac1', cursor: 'pointer', fontSize: 12 }}
                                onClick={() => { setReportMode(false); setReportReason(''); }}
                            >{t('common.cancel', 'İptal')}</button>
                        </div>
                    </div>
                ) : (
                    menuItem(
                        <FaExclamationTriangle />,
                        t('messageMenu.report', 'Bildir'),
                        () => setReportMode(true),
                        true
                    )
                ))}
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
