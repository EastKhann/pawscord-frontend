/* eslint-disable no-undef */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaShieldAlt, FaDownload } from 'react-icons/fa';
import { styles } from '../ContentScannerPanel/contentScannerStyles';
import useContentScanner from '../ContentScannerPanel/useContentScanner';
import ScanResultCard from '../ContentScannerPanel/ScanResultCard';

const S = {
    el: { ...styles.filterButton, ...(filter === f.key && styles.filterButtonActive) },
};

const FILTERS = [
    { key: 'all', label: 'All', icon: '' },
    { key: 'safe', label: 'Safe', icon: '✅ ' },
    { key: 'flagged', label: 'Flagged', icon: '⚠️ ' },
    { key: 'blocked', label: 'Blocked', icon: '🚫 ' },
];

const ContentScannerPanel = ({ fetchWithAuth, apiBaseUrl, onClose, messageId }) => {
    const { t } = useTranslation();
    const [error, setError] = useState(null);
    const {
        scanResults,
        filteredResults,
        loading,
        filter,
        setFilter,
        exportResults,
        reviewResult,
    } = useContentScanner(fetchWithAuth, apiBaseUrl, messageId);

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaShieldAlt className="icon-primary-mr10" />
                        <h2 style={styles.title}>{t('contentScanner.title', 'Content Scanner Results')}</h2>
                    </div>
                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.filters}>
                    {FILTERS.map((f) => (
                        <button
                            aria-label={f.label}
                            key={f.key}
                            onClick={() => setFilter(f.key)}
                            style={S.el}
                        >
                            {f.icon}
                            {f.label} (
                            {f.key === 'all'
                                ? scanResults.length
                                : scanResults.filter((r) => r.status === f.key).length}
                            )
                        </button>
                    ))}
                    <button
                        aria-label={t('contentScanner.exportResults', 'Export results')}
                        onClick={exportResults}
                        style={styles.exportButton}
                    >
                        <FaDownload className="mr-5" /> Export
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>{t('contentScanner.loading', 'Loading scan results...')}</div>
                    ) : filteredResults.length === 0 ? (
                        <div style={styles.empty}>{t('contentScanner.noResults', 'No scan results found')}</div>
                    ) : (
                        <div style={styles.resultsList}>
                            {filteredResults.map((result, index) => (
                                <ScanResultCard
                                    key={`item-${index}`}
                                    result={result}
                                    onReview={reviewResult}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

ContentScannerPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    messageId: PropTypes.string,
};
export default ContentScannerPanel;
