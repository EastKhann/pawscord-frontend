import React, { useState, useEffect } from 'react';
import { FaTimes, FaDownload, FaFilter } from 'react-icons/fa';
import { toast } from '../utils/toast';

const InviteExportPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
    const [invites, setInvites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [includeExpired, setIncludeExpired] = useState(false);
    const [includeRevoked, setIncludeRevoked] = useState(false);

    useEffect(() => {
        fetchInvites();
    }, [includeExpired, includeRevoked]);

    const fetchInvites = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                include_expired: includeExpired,
                include_revoked: includeRevoked
            });
            const response = await fetchWithAuth(
                `${apiBaseUrl}/api/servers/${serverId}/invites/?${params}`
            );
            const data = await response.json();
            setInvites(data.invites || []);
        } catch (error) {
            toast.error('Failed to load invites');
        } finally {
            setLoading(false);
        }
    };

    const exportCSV = () => {
        const csv = [
            ['Code', 'Creator', 'Uses', 'Max Uses', 'Created', 'Expires', 'Status'],
            ...invites.map(inv => [
                inv.code,
                inv.creator_username,
                inv.uses,
                inv.max_uses || 'Unlimited',
                new Date(inv.created_at).toLocaleString(),
                inv.expires_at ? new Date(inv.expires_at).toLocaleString() : 'Never',
                inv.revoked ? 'Revoked' : inv.is_expired ? 'Expired' : 'Active'
            ])
        ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `server_invites_${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        toast.success('Invites exported');
    };

    const exportJSON = () => {
        const json = JSON.stringify(invites, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `server_invites_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        toast.success('Invites exported');
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaDownload style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Export Invites</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.toolbar}>
                    <div style={styles.filters}>
                        <label style={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={includeExpired}
                                onChange={(e) => setIncludeExpired(e.target.checked)}
                            />
                            <span style={styles.checkboxLabel}>Include expired</span>
                        </label>
                        <label style={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={includeRevoked}
                                onChange={(e) => setIncludeRevoked(e.target.checked)}
                            />
                            <span style={styles.checkboxLabel}>Include revoked</span>
                        </label>
                    </div>
                    <div style={styles.exportButtons}>
                        <button onClick={exportCSV} style={styles.exportButton}>
                            <FaDownload style={{ marginRight: '6px' }} />
                            Export CSV
                        </button>
                        <button onClick={exportJSON} style={{ ...styles.exportButton, backgroundColor: '#5865f2' }}>
                            <FaDownload style={{ marginRight: '6px' }} />
                            Export JSON
                        </button>
                    </div>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading invites...</div>
                    ) : invites.length === 0 ? (
                        <div style={styles.empty}>No invites found</div>
                    ) : (
                        <>
                            <div style={styles.summary}>
                                <div style={styles.summaryItem}>
                                    <div style={styles.summaryValue}>{invites.length}</div>
                                    <div style={styles.summaryLabel}>Total Invites</div>
                                </div>
                                <div style={styles.summaryItem}>
                                    <div style={styles.summaryValue}>
                                        {invites.filter(i => !i.revoked && !i.is_expired).length}
                                    </div>
                                    <div style={styles.summaryLabel}>Active</div>
                                </div>
                                <div style={styles.summaryItem}>
                                    <div style={styles.summaryValue}>
                                        {invites.reduce((sum, i) => sum + i.uses, 0)}
                                    </div>
                                    <div style={styles.summaryLabel}>Total Uses</div>
                                </div>
                            </div>

                            <div style={styles.invitesList}>
                                {invites.map((invite, idx) => (
                                    <div key={idx} style={styles.inviteCard}>
                                        <div style={styles.inviteCode}>{invite.code}</div>
                                        <div style={styles.inviteDetails}>
                                            <div style={styles.inviteDetail}>
                                                Creator: <span style={styles.inviteValue}>{invite.creator_username}</span>
                                            </div>
                                            <div style={styles.inviteDetail}>
                                                Uses: <span style={styles.inviteValue}>{invite.uses}/{invite.max_uses || '∞'}</span>
                                            </div>
                                            <div style={styles.inviteDetail}>
                                                Created: <span style={styles.inviteValue}>{new Date(invite.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div style={styles.inviteStatus}>
                                            {invite.revoked ? (
                                                <span style={{ ...styles.statusBadge, backgroundColor: '#f04747' }}>Revoked</span>
                                            ) : invite.is_expired ? (
                                                <span style={{ ...styles.statusBadge, backgroundColor: '#99aab5' }}>Expired</span>
                                            ) : (
                                                <span style={{ ...styles.statusBadge, backgroundColor: '#43b581' }}>Active</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
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
    toolbar: {
        padding: '15px 20px',
        borderBottom: '1px solid #2c2f33',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    filters: {
        display: 'flex',
        gap: '16px',
    },
    checkbox: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
    },
    checkboxLabel: {
        fontSize: '13px',
        color: '#dcddde',
    },
    exportButtons: {
        display: 'flex',
        gap: '8px',
    },
    exportButton: {
        padding: '8px 16px',
        backgroundColor: '#43b581',
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
    summary: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '24px',
    },
    summaryItem: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
    },
    summaryValue: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#5865f2',
        marginBottom: '8px',
    },
    summaryLabel: {
        fontSize: '13px',
        color: '#99aab5',
    },
    invitesList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    inviteCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
    },
    inviteCode: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#ffffff',
        fontFamily: 'monospace',
        minWidth: '120px',
    },
    inviteDetails: {
        flex: 1,
        display: 'flex',
        gap: '20px',
    },
    inviteDetail: {
        fontSize: '13px',
        color: '#99aab5',
    },
    inviteValue: {
        color: '#dcddde',
        fontWeight: '500',
    },
    inviteStatus: {
        minWidth: '80px',
        textAlign: 'right',
    },
    statusBadge: {
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: '600',
        color: '#ffffff',
    },
};

export default InviteExportPanel;
