import { FaTimes, FaShieldAlt, FaDownload } from 'react-icons/fa';
import { styles } from './ContentScannerPanel/contentScannerStyles';
import useContentScanner from './ContentScannerPanel/useContentScanner';
import ScanResultCard from './ContentScannerPanel/ScanResultCard';

const FILTERS = [
  { key: 'all', label: 'All', icon: '' },
  { key: 'safe', label: 'Safe', icon: '✅ ' },
  { key: 'flagged', label: 'Flagged', icon: '⚠️ ' },
  { key: 'blocked', label: 'Blocked', icon: '🚫 ' },
];

const ContentScannerPanel = ({ fetchWithAuth, apiBaseUrl, onClose, messageId }) => {
  const { scanResults, filteredResults, loading, filter, setFilter, exportResults, reviewResult } = useContentScanner(fetchWithAuth, apiBaseUrl, messageId);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <FaShieldAlt style={{ marginRight: '10px', color: '#5865f2' }} />
            <h2 style={styles.title}>Content Scanner Results</h2>
          </div>
          <button onClick={onClose} style={styles.closeButton}><FaTimes /></button>
        </div>

        <div style={styles.filters}>
          {FILTERS.map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              style={{ ...styles.filterButton, ...(filter === f.key && styles.filterButtonActive) }}>
              {f.icon}{f.label} ({f.key === 'all' ? scanResults.length : scanResults.filter(r => r.status === f.key).length})
            </button>
          ))}
          <button onClick={exportResults} style={styles.exportButton}>
            <FaDownload style={{ marginRight: '5px' }} /> Export
          </button>
        </div>

        <div style={styles.content}>
          {loading ? (
            <div style={styles.loading}>Loading scan results...</div>
          ) : filteredResults.length === 0 ? (
            <div style={styles.empty}>No scan results found</div>
          ) : (
            <div style={styles.resultsList}>
              {filteredResults.map((result, index) => (
                <ScanResultCard key={index} result={result} onReview={reviewResult} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentScannerPanel;
