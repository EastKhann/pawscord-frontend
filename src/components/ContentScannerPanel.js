import React, { useState, useEffect } from 'react';
import { FaTimes, FaShieldAlt, FaCheckCircle, FaExclamationTriangle, FaBan, FaEye, FaDownload } from 'react-icons/fa';
import { toast } from '../utils/toast';

const ContentScannerPanel = ({ fetchWithAuth, apiBaseUrl, onClose, messageId }) => {
    const [scanResults, setScanResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all'); // all, safe, flagged, blocked

    useEffect(() => {
        if (messageId) {
            fetchResults();
        } else {
            fetchAllResults();
        }
    }, [messageId]);

    const fetchResults = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/messages/${messageId}/scan_results/`);
            const data = await response.json();
            setScanResults(data.results || []);
        } catch (error) {
            toast.error('Failed to load scan results');
        } finally {
            setLoading(false);
        }
    };

    const fetchAllResults = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/content_scanner/results/`);
            const data = await response.json();
            setScanResults(data.results || []);
        } catch (error) {
            toast.error('Failed to load scan results');
        } finally {
            setLoading(false);
        }
    };

    const exportResults = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/content_scanner/export/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filter })
            });

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `scan_results_${new Date().toISOString()}.csv`;
            document.body.appendChild(a);
            a.click();
            a.remove();

            toast.success('Results exported successfully');
        } catch (error) {
            toast.error('Failed to export results');
        }
    };

    const reviewResult = async (resultId, action) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/content_scanner/results/${resultId}/review/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action }) // approve, block, ignore
            });

            toast.success(`Content ${action}ed successfully`);
            if (messageId) {
                fetchResults();
            } else {
                fetchAllResults();
            }
        } catch (error) {
            toast.error('Failed to review content');
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'safe':
                return <FaCheckCircle style={{ color: '#43b581' }} />;
            case 'flagged':
                return <FaExclamationTriangle style={{ color: '#faa61a' }} />;
            case 'blocked':
                return <FaBan style={{ color: '#f04747' }} />;
            default:
                return <FaShieldAlt />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'safe':
                return '#43b581';
            case 'flagged':
                return '#faa61a';
            case 'blocked':
                return '#f04747';
            default:
                return '#99aab5';
        }
    };

    const filteredResults = scanResults.filter(result => {
        if (filter === 'all') return true;
        return result.status === filter;
    });

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaShieldAlt style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Content Scanner Results</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.filters}>
                    <button
                        onClick={() => setFilter('all')}
                        style={{ ...styles.filterButton, ...(filter === 'all' && styles.filterButtonActive) }}
                    >
                        All ({scanResults.length})
                    </button>
                    <button
                        onClick={() => setFilter('safe')}
                        style={{ ...styles.filterButton, ...(filter === 'safe' && styles.filterButtonActive) }}
                    >
                        ✅ Safe ({scanResults.filter(r => r.status === 'safe').length})
                    </button>
                    <button
                        onClick={() => setFilter('flagged')}
                        style={{ ...styles.filterButton, ...(filter === 'flagged' && styles.filterButtonActive) }}
                    >
                        ⚠️ Flagged ({scanResults.filter(r => r.status === 'flagged').length})
                    </button>
                    <button
                        onClick={() => setFilter('blocked')}
                        style={{ ...styles.filterButton, ...(filter === 'blocked' && styles.filterButtonActive) }}
                    >
                        🚫 Blocked ({scanResults.filter(r => r.status === 'blocked').length})
                    </button>
                    <button onClick={exportResults} style={styles.exportButton}>
                        <FaDownload style={{ marginRight: '5px' }} />
                        Export
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
                                <div key={index} style={styles.resultCard}>
                                    <div style={styles.resultHeader}>
                                        <div style={styles.resultStatus}>
                                            {getStatusIcon(result.status)}
                                            <span style={{ marginLeft: '8px', color: getStatusColor(result.status), fontWeight: '600' }}>
                                                {result.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <div style={styles.timestamp}>
                                            {new Date(result.scanned_at).toLocaleString()}
                                        </div>
                                    </div>

                                    <div style={styles.resultBody}>
                                        <div style={styles.resultInfo}>
                                            <div style={styles.infoRow}>
                                                <strong>Type:</strong> {result.content_type}
                                            </div>
                                            {result.confidence_score && (
                                                <div style={styles.infoRow}>
                                                    <strong>Confidence:</strong>
                                                    <div style={styles.progressBar}>
                                                        <div
                                                            style={{
                                                                ...styles.progressFill,
                                                                width: `${result.confidence_score}%`,
                                                                backgroundColor: result.confidence_score > 80 ? '#f04747' : result.confidence_score > 50 ? '#faa61a' : '#43b581'
                                                            }}
                                                        />
                                                    </div>
                                                    <span>{result.confidence_score}%</span>
                                                </div>
                                            )}
                                            {result.flags && result.flags.length > 0 && (
                                                <div style={styles.infoRow}>
                                                    <strong>Flags:</strong>
                                                    <div style={styles.flags}>
                                                        {result.flags.map((flag, idx) => (
                                                            <span key={idx} style={styles.flag}>{flag}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {result.reason && (
                                                <div style={styles.infoRow}>
                                                    <strong>Reason:</strong> {result.reason}
                                                </div>
                                            )}
                                        </div>

                                        {result.status === 'flagged' && (
                                            <div style={styles.actions}>
                                                <button
                                                    onClick={() => reviewResult(result.id, 'approve')}
                                                    style={{ ...styles.actionButton, ...styles.approveButton }}
                                                >
                                                    <FaCheckCircle style={{ marginRight: '5px' }} />
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => reviewResult(result.id, 'block')}
                                                    style={{ ...styles.actionButton, ...styles.blockButton }}
                                                >
                                                    <FaBan style={{ marginRight: '5px' }} />
                                                    Block
                                                </button>
                                                <button
                                                    onClick={() => reviewResult(result.id, 'ignore')}
                                                    style={{ ...styles.actionButton, ...styles.ignoreButton }}
                                                >
                                                    <FaEye style={{ marginRight: '5px' }} />
                                                    Ignore
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '900px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #2c2f33',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#ffffff',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#99aab5',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '5px',
    },
    filters: {
        display: 'flex',
        gap: '10px',
        padding: '15px 20px',
        borderBottom: '1px solid #2c2f33',
        flexWrap: 'wrap',
    },
    filterButton: {
        padding: '8px 16px',
        backgroundColor: '#2c2f33',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.2s',
    },
    filterButtonActive: {
        backgroundColor: '#5865f2',
    },
    exportButton: {
        marginLeft: 'auto',
        padding: '8px 16px',
        backgroundColor: '#43b581',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1,
    },
    loading: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '40px',
    },
    resultsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    resultCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '6px',
        padding: '15px',
    },
    resultHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
    },
    resultStatus: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
    },
    timestamp: {
        fontSize: '12px',
        color: '#99aab5',
    },
    resultBody: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    resultInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    infoRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '14px',
        color: '#dcddde',
    },
    progressBar: {
        flex: 1,
        height: '8px',
        backgroundColor: '#1e1e1e',
        borderRadius: '4px',
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        transition: 'width 0.3s',
    },
    flags: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px',
    },
    flag: {
        padding: '4px 8px',
        backgroundColor: '#f04747',
        borderRadius: '4px',
        fontSize: '12px',
        color: '#ffffff',
    },
    actions: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'flex-end',
    },
    actionButton: {
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
    },
    approveButton: {
        backgroundColor: '#43b581',
    },
    blockButton: {
        backgroundColor: '#f04747',
    },
    ignoreButton: {
        backgroundColor: '#99aab5',
    },
};

export default ContentScannerPanel;
