import { FaCheck, FaTimes, FaTrash, FaBan } from 'react-icons/fa';
import PropTypes from 'prop-types';
import confirmDialog from '../../utils/confirmDialog';
import styles from './styles';
import useModalA11y from '../../hooks/useModalA11y';
import { useTranslation } from 'react-i18next';

const S = {
    bg3: { ...styles.actionBtn, backgroundColor: '#949ba4' },
    bg2: { ...styles.actionBtn, backgroundColor: '#a12929' },
    bg: { ...styles.actionBtn, backgroundColor: '#f23f42' },
};

const ReportDetailModal = ({
    report,
    onClose,
    onHandle,
    getReportBadgeColor,
    getSeverityColor,
}) => {
    const { t } = useTranslation();

    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        isOpen: !!report,
        label: 'Rapor Detmonth',
    });
    if (!report) return null;
    const statusBadgeStyle = {
        ...styles.badge,
        backgroundColor: getReportBadgeColor(report.status),
    };
    const severityBadgeStyle = {
        ...styles.badge,
        backgroundColor: getSeverityColor(report.severity),
    };

    return (
        <div aria-label={t('reportDetail.modal', 'Report detail')} style={styles.modalOverlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                <div style={styles.modalHeader}>
                    <h3 style={styles.modalTitle}>{t('report_details')}</h3>
                    <button onClick={onClose} style={styles.modalClose}>
                        <FaTimes />
                    </button>
                </div>
                <div style={styles.modalContent}>
                    <div style={styles.detailRow}>
                        <strong>{t('report_type')}</strong>
                        <span>{report.report_type}</span>
                    </div>
                    <div style={styles.detailRow}>
                        <strong>{t('status')}</strong>
                        <span style={statusBadgeStyle}>{report.status}</span>
                    </div>
                    <div style={styles.detailRow}>
                        <strong>{t('severity')}</strong>
                        <span style={severityBadgeStyle}>{report.severity || 'N/A'}</span>
                    </div>
                    <div style={styles.detailRow}>
                        <strong>{t('reporter')}</strong>
                        <span>{report.reporter_username}</span>
                    </div>
                    <div style={styles.detailRow}>
                        <strong>{t('reported_user')}</strong>
                        <span>{report.reported_username || 'N/A'}</span>
                    </div>
                    <div style={styles.detailRow}>
                        <strong>{t('created')}</strong>
                        <span>{new Date(report.created_at).toLocaleString()}</span>
                    </div>
                    <div style={styles.detailSection}>
                        <strong>{t('reason')}</strong>
                        <p style={styles.detailText}>{report.reason}</p>
                    </div>
                    <div style={styles.detailSection}>
                        <strong>{t('description')}</strong>
                        <p style={styles.detailText}>{report.description}</p>
                    </div>
                    {report.message_content && (
                        <div style={styles.detailSection}>
                            <strong>{t('reported_message')}</strong>
                            <div style={styles.messageBox}>{report.message_content}</div>
                        </div>
                    )}
                    {report.moderator_notes && (
                        <div style={styles.detailSection}>
                            <strong>{t('moderator_notes')}</strong>
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
                                    if (
                                        await confirmDialog(
                                            t('reports.deleteMsgConfirm', 'Are you sure you want to delete this message?')
                                        )
                                    ) {
                                        onHandle(report.id, 'delete_message');
                                    }
                                }}
                                style={S.bg}
                            >
                                <FaTrash /> {t('reports.deleteMsg', 'Delete Message')}
                            </button>
                        )}
                        {report.reported_user && (
                            <button
                                onClick={async () => {
                                    if (
                                        await confirmDialog(
                                            t('reports.banUserConfirm', 'Are you sure you want to ban this user?')
                                        )
                                    ) {
                                        const reason = prompt('Ban reason:');
                                        if (reason) {
                                            onHandle(report.id, 'ban_user', reason);
                                        }
                                    }
                                }}
                                style={S.bg2}
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
                            style={S.bg3}
                        >
                            <FaTimes /> Dismiss
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

ReportDetailModal.propTypes = {
    report: PropTypes.object,
    onClose: PropTypes.func,
    onHandle: PropTypes.func,
    getReportBadgeColor: PropTypes.func,
    getSeverityColor: PropTypes.func,
};
export default ReportDetailModal;
