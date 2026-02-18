import { FaCheck, FaTimes, FaTrash, FaBan } from 'react-icons/fa';
import confirmDialog from '../../utils/confirmDialog';
import styles from './styles';
import useModalA11y from '../../hooks/useModalA11y';

const ReportDetailModal = ({ report, onClose, onHandle, getReportBadgeColor, getSeverityColor }) => {
    const { overlayProps, dialogProps } = useModalA11y({ onClose, isOpen: !!report, label: 'Rapor Detay' });
    if (!report) return null;

    return (
        <div style={styles.modalOverlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                <div style={styles.modalHeader}>
                    <h3 style={styles.modalTitle}>Report Details</h3>
                    <button onClick={onClose} style={styles.modalClose}>
                        <FaTimes />
                    </button>
                </div>
                <div style={styles.modalContent}>
                    <div style={styles.detailRow}>
                        <strong>Report Type:</strong>
                        <span>{report.report_type}</span>
                    </div>
                    <div style={styles.detailRow}>
                        <strong>Status:</strong>
                        <span style={{ ...styles.badge, backgroundColor: getReportBadgeColor(report.status) }}>
                            {report.status}
                        </span>
                    </div>
                    <div style={styles.detailRow}>
                        <strong>Severity:</strong>
                        <span style={{ ...styles.badge, backgroundColor: getSeverityColor(report.severity) }}>
                            {report.severity || 'N/A'}
                        </span>
                    </div>
                    <div style={styles.detailRow}>
                        <strong>Reporter:</strong>
                        <span>{report.reporter_username}</span>
                    </div>
                    <div style={styles.detailRow}>
                        <strong>Reported User:</strong>
                        <span>{report.reported_username || 'N/A'}</span>
                    </div>
                    <div style={styles.detailRow}>
                        <strong>Created:</strong>
                        <span>{new Date(report.created_at).toLocaleString()}</span>
                    </div>
                    <div style={styles.detailSection}>
                        <strong>Reason:</strong>
                        <p style={styles.detailText}>{report.reason}</p>
                    </div>
                    <div style={styles.detailSection}>
                        <strong>Description:</strong>
                        <p style={styles.detailText}>{report.description}</p>
                    </div>
                    {report.message_content && (
                        <div style={styles.detailSection}>
                            <strong>Reported Message:</strong>
                            <div style={styles.messageBox}>{report.message_content}</div>
                        </div>
                    )}
                    {report.moderator_notes && (
                        <div style={styles.detailSection}>
                            <strong>Moderator Notes:</strong>
                            <p style={styles.detailText}>{report.moderator_notes}</p>
                        </div>
                    )}
                </div>
                {report.status === 'pending' && (
                    <div style={styles.modalActions}>
                        <button
                            onClick={() => {
                                const reason = prompt('Resolution notes (optional):');
                                onHandle(report.id, 'resolve', reason || '');
                            }}
                            style={styles.actionBtn}
                        >
                            <FaCheck /> Resolve
                        </button>
                        {report.message_id && (
                            <button
                                onClick={async () => {
                                    if (await confirmDialog('Delete this message?')) {
                                        onHandle(report.id, 'delete_message');
                                    }
                                }}
                                style={{ ...styles.actionBtn, backgroundColor: '#ed4245' }}
                            >
                                <FaTrash /> Delete Message
                            </button>
                        )}
                        {report.reported_user && (
                            <button
                                onClick={async () => {
                                    if (await confirmDialog('Ban this user?')) {
                                        const reason = prompt('Ban reason:');
                                        if (reason) {
                                            onHandle(report.id, 'ban_user', reason);
                                        }
                                    }
                                }}
                                style={{ ...styles.actionBtn, backgroundColor: '#a12929' }}
                            >
                                <FaBan /> Ban User
                            </button>
                        )}
                        <button
                            onClick={() => {
                                const reason = prompt('Dismiss reason:');
                                if (reason) {
                                    onHandle(report.id, 'dismiss', reason);
                                }
                            }}
                            style={{ ...styles.actionBtn, backgroundColor: '#72767d' }}
                        >
                            <FaTimes /> Dismiss
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportDetailModal;
