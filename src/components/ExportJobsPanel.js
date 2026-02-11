// frontend/src/components/ExportJobsPanel.js
import { useState, useEffect } from 'react';
import { FaTimes, FaDownload, FaFile, FaClock, FaCheckCircle, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import toast from '../utils/toast';
import confirmDialog from '../utils/confirmDialog';

/**
 * 📥 Export Jobs Panel
 * Unified export system for all data types
 * 
 * Features:
 * - Request data exports (messages, server, users, etc.)
 * - Monitor export job progress
 * - Download completed exports
 * - Export history
 */
const ExportJobsPanel = ({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [exportType, setExportType] = useState('messages');
    const [creating, setCreating] = useState(false);

    const exportTypes = [
        { id: 'messages', name: 'Messages', description: 'Export all your messages' },
        { id: 'server', name: 'Server Data', description: 'Export server content' },
        { id: 'dm', name: 'Direct Messages', description: 'Export DM history' },
        { id: 'media', name: 'Media Files', description: 'Export uploaded media' },
        { id: 'profile', name: 'Profile Data', description: 'Export your profile info' },
        { id: 'analytics', name: 'Analytics', description: 'Export analytics data' }
    ];

    useEffect(() => {
        loadExportJobs();
        const interval = setInterval(loadExportJobs, 5000); // Refresh every 5s
        return () => clearInterval(interval);
    }, []);

    const loadExportJobs = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/exports/jobs/`);
            const data = await response.json();
            setJobs(data.jobs || []);
        } catch (error) {
            console.error('Failed to load export jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const createExport = async () => {
        setCreating(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/exports/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    export_type: exportType
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Export job created! Processing...');
                loadExportJobs();
            } else {
                toast.error(data.error || 'Failed to create export');
            }
        } catch (error) {
            console.error('Export creation error:', error);
            toast.error('Failed to create export');
        } finally {
            setCreating(false);
        }
    };

    const downloadExport = async (jobId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/exports/${jobId}/download/`);
            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `export_${jobId}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            toast.success('Download started!');
        } catch (error) {
            console.error('Download error:', error);
            toast.error('Download failed');
        }
    };

    const deleteJob = async (jobId) => {
        if (!await confirmDialog('Delete this export job?')) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/exports/${jobId}/delete/`, {
                method: 'DELETE'
            });
            toast.success('Export job deleted');
            loadExportJobs();
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Failed to delete job');
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <FaCheckCircle style={{ color: '#43b581' }} />;
            case 'processing':
                return <FaSpinner style={{ color: '#faa61a' }} className="fa-spin" />;
            case 'failed':
                return <FaExclamationCircle style={{ color: '#f04747' }} />;
            default:
                return <FaClock style={{ color: '#99aab5' }} />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return '#43b581';
            case 'processing': return '#faa61a';
            case 'failed': return '#f04747';
            default: return '#99aab5';
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaDownload style={{ fontSize: '24px', color: '#5865f2' }} />
                        <h2 style={{ margin: 0, fontSize: '20px' }}>Export Jobs</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeBtn}>
                        <FaTimes />
                    </button>
                </div>

                {/* Content */}
                <div style={styles.content}>
                    {/* Create Export Section */}
                    <div style={styles.createSection}>
                        <h3 style={styles.sectionTitle}>Create New Export</h3>
                        <div style={styles.exportTypeSelector}>
                            <select
                                value={exportType}
                                onChange={(e) => setExportType(e.target.value)}
                                style={styles.select}
                            >
                                {exportTypes.map(type => (
                                    <option key={type.id} value={type.id}>
                                        {type.name} - {type.description}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={createExport}
                                disabled={creating}
                                style={styles.createBtn}
                            >
                                {creating ? (
                                    <>
                                        <FaSpinner className="fa-spin" /> Creating...
                                    </>
                                ) : (
                                    <>
                                        <FaDownload /> Create Export
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Export Jobs List */}
                    <div style={styles.jobsSection}>
                        <h3 style={styles.sectionTitle}>Your Export Jobs</h3>
                        {loading ? (
                            <div style={styles.loading}>Loading jobs...</div>
                        ) : jobs.length === 0 ? (
                            <div style={styles.empty}>
                                <FaFile style={{ fontSize: '48px', color: '#99aab5', marginBottom: '16px' }} />
                                <p>No export jobs yet</p>
                                <p style={{ fontSize: '14px', color: '#99aab5' }}>
                                    Create your first export to get started
                                </p>
                            </div>
                        ) : (
                            <div style={styles.jobsList}>
                                {jobs.map(job => (
                                    <div key={job.id} style={styles.jobCard}>
                                        <div style={styles.jobIcon}>
                                            {getStatusIcon(job.status)}
                                        </div>
                                        <div style={styles.jobDetails}>
                                            <div style={styles.jobTitle}>
                                                {exportTypes.find(t => t.id === job.type)?.name || job.type}
                                            </div>
                                            <div style={styles.jobMeta}>
                                                <span>Created: {new Date(job.created_at).toLocaleString()}</span>
                                                {job.completed_at && (
                                                    <>
                                                        <span style={{ margin: '0 8px' }}>•</span>
                                                        <span>Completed: {new Date(job.completed_at).toLocaleString()}</span>
                                                    </>
                                                )}
                                            </div>
                                            {job.status === 'processing' && job.progress && (
                                                <div style={styles.progressBar}>
                                                    <div
                                                        style={{
                                                            ...styles.progressFill,
                                                            width: `${job.progress}%`
                                                        }}
                                                    />
                                                    <span style={styles.progressText}>{job.progress}%</span>
                                                </div>
                                            )}
                                            {job.file_size && (
                                                <div style={styles.fileSize}>
                                                    Size: {formatFileSize(job.file_size)}
                                                </div>
                                            )}
                                        </div>
                                        <div style={styles.jobActions}>
                                            <span
                                                style={{
                                                    ...styles.statusBadge,
                                                    backgroundColor: getStatusColor(job.status)
                                                }}
                                            >
                                                {job.status}
                                            </span>
                                            {job.status === 'completed' && (
                                                <button
                                                    onClick={() => downloadExport(job.id)}
                                                    style={styles.downloadBtn}
                                                    title="Download"
                                                >
                                                    <FaDownload />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteJob(job.id)}
                                                style={styles.deleteBtn}
                                                title="Delete"
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div style={styles.info}>
                        <p style={styles.infoText}>
                            📦 Exports are processed in the background and may take a few minutes
                        </p>
                        <p style={styles.infoText}>
                            💾 Completed exports are available for 7 days before auto-deletion
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
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
        zIndex: 999999
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '900px',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff'
    },
    header: {
        padding: '20px',
        borderBottom: '1px solid #444',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#fff',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '8px'
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1
    },
    createSection: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '24px'
    },
    sectionTitle: {
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '16px'
    },
    exportTypeSelector: {
        display: 'flex',
        gap: '12px'
    },
    select: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#202225',
        border: '1px solid #444',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '14px'
    },
    createBtn: {
        padding: '10px 24px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        whiteSpace: 'nowrap'
    },
    jobsSection: {
        marginBottom: '24px'
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#99aab5'
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#dcddde'
    },
    jobsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    jobCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    jobIcon: {
        fontSize: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    jobDetails: {
        flex: 1
    },
    jobTitle: {
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '4px'
    },
    jobMeta: {
        fontSize: '12px',
        color: '#99aab5',
        marginBottom: '8px'
    },
    progressBar: {
        position: 'relative',
        height: '20px',
        backgroundColor: '#202225',
        borderRadius: '10px',
        overflow: 'hidden',
        marginTop: '8px'
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#5865f2',
        transition: 'width 0.3s ease'
    },
    progressText: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '12px',
        fontWeight: '600',
        color: '#fff'
    },
    fileSize: {
        fontSize: '12px',
        color: '#99aab5',
        marginTop: '4px'
    },
    jobActions: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    statusBadge: {
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600',
        color: '#fff',
        textTransform: 'uppercase'
    },
    downloadBtn: {
        padding: '8px 12px',
        backgroundColor: '#43b581',
        border: 'none',
        borderRadius: '6px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '14px'
    },
    deleteBtn: {
        padding: '8px 12px',
        backgroundColor: '#f04747',
        border: 'none',
        borderRadius: '6px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '14px'
    },
    info: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '16px'
    },
    infoText: {
        fontSize: '14px',
        color: '#dcddde',
        margin: '8px 0',
        lineHeight: '1.6'
    }
};

export default ExportJobsPanel;
