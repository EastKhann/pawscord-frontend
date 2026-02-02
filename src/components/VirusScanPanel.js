// frontend/src/components/VirusScanPanel.js
import React, { useState, useEffect } from 'react';
import { FaShieldAlt, FaCheckCircle, FaExclamationTriangle, FaTrash, FaDownload, FaSync } from 'react-icons/fa';
import './VirusScanPanel.css';

/**
 * 🛡️ Virus Scan Panel
 * View virus scan results for uploaded files
 */
const VirusScanPanel = ({ serverId, apiBaseUrl, fetchWithAuth, onClose }) => {
    const [scans, setScans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total_scanned: 0,
        clean: 0,
        infected: 0,
        unknown: 0
    });
    const [filter, setFilter] = useState('all'); // 'all', 'clean', 'infected', 'unknown'

    useEffect(() => {
        loadScans();
    }, [serverId]);

    const loadScans = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/virus-scans/${serverId}/`);
            if (response.ok) {
                const data = await response.json();
                setScans(data.scans || []);
                setStats(data.stats || {});
            }
        } catch (error) {
            console.error('Failed to load virus scans:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRescan = async (messageId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/virus-scans/${messageId}/rescan/`, {
                method: 'POST'
            });
            if (response.ok) {
                loadScans(); // Reload after rescan
            }
        } catch (error) {
            console.error('Rescan failed:', error);
        }
    };

    const handleDelete = async (messageId) => {
        if (!window.confirm('Are you sure you want to delete this file?')) {
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/messages/${messageId}/`, {
                method: 'DELETE'
            });
            if (response.ok) {
                loadScans(); // Reload after deletion
            }
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'clean':
                return <FaCheckCircle className="virus-scan-status-icon clean" />;
            case 'infected':
                return <FaExclamationTriangle className="virus-scan-status-icon infected" />;
            default:
                return <FaShieldAlt className="virus-scan-status-icon unknown" />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'clean':
                return 'Clean';
            case 'infected':
                return 'Infected';
            default:
                return 'Unknown';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'clean':
                return '#43b581';
            case 'infected':
                return '#ed4245';
            default:
                return '#faa61a';
        }
    };

    const filteredScans = scans.filter(scan => {
        if (filter === 'all') return true;
        return scan.status === filter;
    });

    return (
        <div className="virus-scan-overlay" onClick={onClose}>
            <div className="virus-scan-modal" onClick={(e) => e.stopPropagation()}>
                <div className="virus-scan-header">
                    <h2><FaShieldAlt /> Virus Scan Results</h2>
                    <button className="virus-scan-close" onClick={onClose}>×</button>
                </div>

                <div className="virus-scan-content">
                    {/* Stats */}
                    <div className="virus-scan-stats">
                        <div className="virus-scan-stat">
                            <div className="virus-scan-stat-label">Total Scanned</div>
                            <div className="virus-scan-stat-value">{stats.total_scanned || 0}</div>
                        </div>
                        <div className="virus-scan-stat clean">
                            <div className="virus-scan-stat-label">Clean</div>
                            <div className="virus-scan-stat-value">{stats.clean || 0}</div>
                        </div>
                        <div className="virus-scan-stat infected">
                            <div className="virus-scan-stat-label">Infected</div>
                            <div className="virus-scan-stat-value">{stats.infected || 0}</div>
                        </div>
                        <div className="virus-scan-stat unknown">
                            <div className="virus-scan-stat-label">Unknown</div>
                            <div className="virus-scan-stat-value">{stats.unknown || 0}</div>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="virus-scan-filters">
                        <button
                            className={`virus-scan-filter ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All ({scans.length})
                        </button>
                        <button
                            className={`virus-scan-filter ${filter === 'clean' ? 'active' : ''}`}
                            onClick={() => setFilter('clean')}
                        >
                            <FaCheckCircle /> Clean ({stats.clean || 0})
                        </button>
                        <button
                            className={`virus-scan-filter ${filter === 'infected' ? 'active' : ''}`}
                            onClick={() => setFilter('infected')}
                        >
                            <FaExclamationTriangle /> Infected ({stats.infected || 0})
                        </button>
                        <button
                            className={`virus-scan-filter ${filter === 'unknown' ? 'active' : ''}`}
                            onClick={() => setFilter('unknown')}
                        >
                            <FaShieldAlt /> Unknown ({stats.unknown || 0})
                        </button>
                    </div>

                    {/* Scan Results */}
                    {loading ? (
                        <div className="virus-scan-loading">
                            <div className="virus-scan-spinner"></div>
                            <p>Loading scan results...</p>
                        </div>
                    ) : filteredScans.length === 0 ? (
                        <div className="virus-scan-empty">
                            <FaShieldAlt size={48} />
                            <p>No {filter !== 'all' ? filter : ''} files found</p>
                        </div>
                    ) : (
                        <div className="virus-scan-list">
                            {filteredScans.map((scan) => (
                                <div key={scan.id} className="virus-scan-item">
                                    <div className="virus-scan-item-header">
                                        <div className="virus-scan-item-info">
                                            {getStatusIcon(scan.status)}
                                            <div>
                                                <div className="virus-scan-filename">{scan.filename}</div>
                                                <div className="virus-scan-meta">
                                                    Engine: {scan.engine} •
                                                    Uploaded by {scan.uploaded_by} •
                                                    {new Date(scan.scanned_at).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="virus-scan-item-actions">
                                            {scan.status === 'unknown' && (
                                                <button
                                                    className="virus-scan-btn-rescan"
                                                    onClick={() => handleRescan(scan.message_id)}
                                                    title="Rescan"
                                                >
                                                    <FaSync />
                                                </button>
                                            )}
                                            {scan.status === 'infected' ? (
                                                <button
                                                    className="virus-scan-btn-delete"
                                                    onClick={() => handleDelete(scan.message_id)}
                                                    title="Delete Infected File"
                                                >
                                                    <FaTrash />
                                                </button>
                                            ) : scan.file_url && (
                                                <a
                                                    href={scan.file_url}
                                                    download
                                                    className="virus-scan-btn-download"
                                                    title="Download"
                                                >
                                                    <FaDownload />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Scan Details */}
                                    {scan.scan_data && Object.keys(scan.scan_data).length > 0 && (
                                        <div className="virus-scan-details">
                                            <div className="virus-scan-details-title">Scan Details:</div>
                                            <pre className="virus-scan-details-json">
                                                {JSON.stringify(scan.scan_data, null, 2)}
                                            </pre>
                                        </div>
                                    )}

                                    {/* Warning for Infected Files */}
                                    {scan.status === 'infected' && (
                                        <div className="virus-scan-warning">
                                            ⚠️ This file has been flagged as potentially malicious.
                                            It has been quarantined and is not accessible by server members.
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Footer */}
                <div className="virus-scan-footer">
                    <p>
                        <FaShieldAlt /> All uploaded files are automatically scanned for viruses and malware.
                    </p>
                    <p className="virus-scan-footer-note">
                        Files flagged as infected are quarantined and cannot be downloaded.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VirusScanPanel;


