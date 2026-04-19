import { FaCheckCircle, FaExclamationTriangle, FaBan, FaShieldAlt, FaEye } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { styles } from './contentScannerStyles';
import { useTranslation } from 'react-i18next';

const S = {
    el3: { ...styles.actionButton, ...styles.ignoreButton },
    el2: { ...styles.actionButton, ...styles.blockButton },
    el: { ...styles.actionButton, ...styles.approveButton },
};

const STATUS_CONFIG = {
    safe: { icon: FaCheckCircle, color: '#23a559' },
    flagged: { icon: FaExclamationTriangle, color: '#f0b232' },
    blocked: { icon: FaBan, color: '#f23f42' },
};

const ScanResultCard = ({ result, onReview }) => {
    const { t } = useTranslation();

    const cfg = STATUS_CONFIG[result.status] || { icon: FaShieldAlt, color: '#949ba4' };
    const StatusIcon = cfg.icon;
    const iconStyle = { color: cfg.color };
    const statusLabelStyle = { marginLeft: '8px', color: cfg.color, fontWeight: '600' };
    const progressFillStyle = {
        ...styles.progressFill,
        width: `${result.confidence_score}%`,
        backgroundColor:
            result.confidence_score > 80
                ? '#f23f42'
                : result.confidence_score > 50
                  ? '#f0b232'
                  : '#23a559',
    };

    return (
        <div aria-label="scan result card" style={styles.resultCard}>
            <div style={styles.resultHeader}>
                <div style={styles.resultStatus}>
                    <StatusIcon style={iconStyle} />
                    <span style={statusLabelStyle}>{result.status.toUpperCase()}</span>
                </div>
                <div style={styles.timestamp}>{new Date(result.scanned_at).toLocaleString()}</div>
            </div>
            <div style={styles.resultBody}>
                <div style={styles.resultInfo}>
                    <div style={styles.infoRow}>
                        <strong>{t('type')}</strong> {result.content_type}
                    </div>
                    {result.confidence_score && (
                        <div style={styles.infoRow}>
                            <strong>{t('confidence')}</strong>
                            <div style={styles.progressBar}>
                                <div style={progressFillStyle} />
                            </div>
                            <span>{result.confidence_score}%</span>
                        </div>
                    )}
                    {result.flags?.length > 0 && (
                        <div style={styles.infoRow}>
                            <strong>{t('flags')}</strong>
                            <div style={styles.flags}>
                                {result.flags.map((f, i) => (
                                    <span key={`item-${i}`} style={styles.flag}>
                                        {f}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    {result.reason && (
                        <div style={styles.infoRow}>
                            <strong>{t('reason')}</strong> {result.reason}
                        </div>
                    )}
                </div>
                {result.status === 'flagged' && (
                    <div style={styles.actions}>
                        <button onClick={() => onReview(result.id, 'approve')} style={S.el}>
                            <FaCheckCircle className="mr-5" /> Approve
                        </button>
                        <button onClick={() => onReview(result.id, 'block')} style={S.el2}>
                            <FaBan className="mr-5" /> Block
                        </button>
                        <button onClick={() => onReview(result.id, 'ignore')} style={S.el3}>
                            <FaEye className="mr-5" /> Ignore
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

ScanResultCard.propTypes = {
    result: PropTypes.object,
    onReview: PropTypes.func,
};
export default ScanResultCard;
