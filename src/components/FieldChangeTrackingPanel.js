import React, { useState, useEffect } from 'react';
import { FaTimes, FaHistory, FaDownload } from 'react-icons/fa';
import { toast } from '../utils/toast';

const FieldChangeTrackingPanel = ({ fetchWithAuth, apiBaseUrl, onClose, entityType, entityId }) => {
    const [changes, setChanges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchChanges();
    }, []);

    const fetchChanges = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/audit/field-changes/?entity_type=${entityType}&entity_id=${entityId}`
            );
            const data = await response.json();
            setChanges(data.changes || []);
        } catch (error) {
            toast.error('Failed to load change history');
        } finally {
            setLoading(false);
        }
    };

    const exportChanges = () => {
        const csv = [
            ['Date', 'Field', 'Old Value', 'New Value', 'Changed By'],
            ...filteredChanges.map(c => [
                new Date(c.changed_at).toLocaleString(),
                c.field_name,
                c.old_value || '',
                c.new_value || '',
                c.changed_by_username
            ])
        ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `field_changes_${entityType}_${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        toast.success('Changes exported');
    };

    const fieldNames = [...new Set(changes.map(c => c.field_name))];

    const filteredChanges = filter === 'all'
        ? changes
        : changes.filter(c => c.field_name === filter);

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaHistory style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Field Change History</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.toolbar}>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)} style={styles.filterSelect}>
                        <option value="all">All Fields ({changes.length})</option>
                        {fieldNames.map(field => (
                            <option key={field} value={field}>
                                {field} ({changes.filter(c => c.field_name === field).length})
                            </option>
                        ))}
                    </select>
                    <button onClick={exportChanges} style={styles.exportButton}>
                        <FaDownload style={{ marginRight: '6px' }} />
                        Export
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading changes...</div>
                    ) : filteredChanges.length === 0 ? (
                        <div style={styles.empty}>No changes recorded</div>
                    ) : (
                        <div style={styles.changesList}>
                            {filteredChanges.map((change, idx) => (
                                <div key={idx} style={styles.changeCard}>
                                    <div style={styles.changeField}>{change.field_name}</div>
                                    <div style={styles.changeValues}>
                                        <div style={styles.oldValue}>
                                            <div style={styles.valueLabel}>Old:</div>
                                            <div style={styles.value}>{change.old_value || <em style={{ color: '#99aab5' }}>empty</em>}</div>
                                        </div>
                                        <div style={styles.arrow}>→</div>
                                        <div style={styles.newValue}>
                                            <div style={styles.valueLabel}>New:</div>
                                            <div style={styles.value}>{change.new_value || <em style={{ color: '#99aab5' }}>empty</em>}</div>
                                        </div>
                                    </div>
                                    <div style={styles.changeMeta}>
                                        Changed by <span style={styles.username}>{change.changed_by_username}</span> on {new Date(change.changed_at).toLocaleString()}
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
        maxWidth: '800px',
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
    toolbar: {
        display: 'flex',
        gap: '12px',
        padding: '15px 20px',
        borderBottom: '1px solid #2c2f33',
    },
    filterSelect: {
        flex: 1,
        padding: '8px 12px',
        backgroundColor: '#2c2f33',
        border: '1px solid #2c2f33',
        borderRadius: '4px',
        color: '#ffffff',
        fontSize: '14px',
    },
    exportButton: {
        padding: '8px 16px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '13px',
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
    changesList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    changeCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '16px',
    },
    changeField: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#5865f2',
        marginBottom: '12px',
    },
    changeValues: {
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        marginBottom: '12px',
        padding: '12px',
        backgroundColor: '#1e1e1e',
        borderRadius: '6px',
    },
    oldValue: {
        flex: 1,
    },
    newValue: {
        flex: 1,
    },
    arrow: {
        fontSize: '20px',
        color: '#5865f2',
    },
    valueLabel: {
        fontSize: '12px',
        color: '#99aab5',
        marginBottom: '4px',
    },
    value: {
        fontSize: '14px',
        color: '#ffffff',
        wordBreak: 'break-word',
    },
    changeMeta: {
        fontSize: '12px',
        color: '#99aab5',
    },
    username: {
        color: '#5865f2',
        fontWeight: '500',
    },
};

export default FieldChangeTrackingPanel;
