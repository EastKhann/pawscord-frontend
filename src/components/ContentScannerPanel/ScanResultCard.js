import { FaCheckCircle, FaExclamationTriangle, FaBan, FaShieldAlt, FaEye } from 'react-icons/fa';
import { styles } from './contentScannerStyles';

const STATUS_CONFIG = {
  safe: { icon: FaCheckCircle, color: '#43b581' },
  flagged: { icon: FaExclamationTriangle, color: '#faa61a' },
  blocked: { icon: FaBan, color: '#f04747' },
};

const ScanResultCard = ({ result, onReview }) => {
  const cfg = STATUS_CONFIG[result.status] || { icon: FaShieldAlt, color: '#99aab5' };
  const StatusIcon = cfg.icon;

  return (
    <div style={styles.resultCard}>
      <div style={styles.resultHeader}>
        <div style={styles.resultStatus}>
          <StatusIcon style={{ color: cfg.color }} />
          <span style={{ marginLeft: '8px', color: cfg.color, fontWeight: '600' }}>{result.status.toUpperCase()}</span>
        </div>
        <div style={styles.timestamp}>{new Date(result.scanned_at).toLocaleString()}</div>
      </div>
      <div style={styles.resultBody}>
        <div style={styles.resultInfo}>
          <div style={styles.infoRow}><strong>Type:</strong> {result.content_type}</div>
          {result.confidence_score && (
            <div style={styles.infoRow}>
              <strong>Confidence:</strong>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: `${result.confidence_score}%`, backgroundColor: result.confidence_score > 80 ? '#f04747' : result.confidence_score > 50 ? '#faa61a' : '#43b581' }} />
              </div>
              <span>{result.confidence_score}%</span>
            </div>
          )}
          {result.flags?.length > 0 && (
            <div style={styles.infoRow}>
              <strong>Flags:</strong>
              <div style={styles.flags}>{result.flags.map((f, i) => <span key={i} style={styles.flag}>{f}</span>)}</div>
            </div>
          )}
          {result.reason && <div style={styles.infoRow}><strong>Reason:</strong> {result.reason}</div>}
        </div>
        {result.status === 'flagged' && (
          <div style={styles.actions}>
            <button onClick={() => onReview(result.id, 'approve')} style={{ ...styles.actionButton, ...styles.approveButton }}>
              <FaCheckCircle style={{ marginRight: '5px' }} /> Approve
            </button>
            <button onClick={() => onReview(result.id, 'block')} style={{ ...styles.actionButton, ...styles.blockButton }}>
              <FaBan style={{ marginRight: '5px' }} /> Block
            </button>
            <button onClick={() => onReview(result.id, 'ignore')} style={{ ...styles.actionButton, ...styles.ignoreButton }}>
              <FaEye style={{ marginRight: '5px' }} /> Ignore
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanResultCard;
