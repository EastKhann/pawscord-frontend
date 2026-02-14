import { FaExclamationTriangle, FaBan, FaEye } from 'react-icons/fa';

const FlagCard = ({ flag, styles, onAction }) => (
  <div style={styles.flagCard}>
    <div style={styles.flagHeader}>
      <div>
        <span style={styles.flagType(flag.type)}>
          <FaExclamationTriangle /> {flag.type.toUpperCase()}
        </span>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>
          {flag.user} {'•'} {flag.timestamp}
        </div>
      </div>
      <div style={{ fontSize: '18px', fontWeight: '700', color: flag.confidence > 80 ? '#da373c' : '#f0b732' }}>
        {flag.confidence}%
      </div>
    </div>
    <div style={styles.flagMessage}>{flag.message}</div>
    <div style={styles.flagActions}>
      <button onClick={() => onAction(flag.id, 'delete')} style={styles.actionBtn('delete')}><FaBan /> Delete</button>
      <button onClick={() => onAction(flag.id, 'timeout')} style={styles.actionBtn('timeout')}>Timeout User</button>
      <button onClick={() => onAction(flag.id, 'dismiss')} style={styles.actionBtn('dismiss')}><FaEye /> Dismiss</button>
    </div>
  </div>
);

export default FlagCard;
