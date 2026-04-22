/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaDownload, FaFilter } from 'react-icons/fa';
import { toast } from '../../utils/toast';
import { useTranslation } from 'react-i18next';

const InviteExportPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
    const { t } = useTranslation();
    const [invites, setInvites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [includeExpired, setIncludeExpired] = useState(false);
    const [includeRevoked, setIncludeRevoked] = useState(false);
    const exportJsonButtonStyle = { ...styles.exportButton, backgroundColor: '#5865f2' };
    const activeStatusBadgeStyle = { ...styles.statusBadge, backgroundColor: '#23a559' };
    const expiredStatusBadgeStyle = { ...styles.statusBadge, backgroundColor: '#949ba4' };
    const revokedStatusBadgeStyle = { ...styles.statusBadge, backgroundColor: '#f23f42' };

    useEffect(() => {
        fetchInvites();
    }, [includeExpired, includeRevoked]);

    const fetchInvites = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                include_expired: includeExpired,
                include_revoked: includeRevoked,
            });
            const response = await fetchWithAuth(
                `${apiBaseUrl}/servers/${serverId}/invites/?${params}`
            );
            const data = await response.json();
            setInvites(data.invites || []);
        } catch (error) {
            toast.error(t('invite.loadFailed'));
        } finally {
            setLoading(false);
        }
    };

    const exportCSV = () => {
        const csv = [
            ['Code', 'Creator', 'Uses', 'Max Uses', 'Created', 'Expires', 'Status'],
            ...invites.map((inv) => [
                inv.code,
                inv.creator_username,
                inv.uses,
                inv.max_uses || t('common.unlimited', 'Unlimited'),
                new Date(inv.created_at).toLocaleString(),
                inv.expires_at ? new Date(inv.expires_at).toLocaleString() : t('dataRetention.never', 'Never'),
                inv.revoked ? t('invite.revoked', 'Revoked') : inv.is_expired ? t('invite.expired', 'Expired') : t('invite.active', 'Active'),
            ]),
        ]
            .map((row) => row.map((cell) => `"${cell}"`).join(','))
            .join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `server_invites_${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        toast.success(t('invite.exported'));
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

        toast.success(t('invite.exported'));
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaDownload className="icon-primary-mr10" />
                        <h2 style={styles.title}>{t('inviteExport.title', 'Export Invites')}</h2>
                    </div>
                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeButton}>
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
                            <span style={styles.checkboxLabel}>{t('inviteExport.includeExpired', 'Include expired')}</span>
                        </label>
                        <label style={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={includeRevoked}
                                onChange={(e) => setIncludeRevoked(e.target.checked)}
                            />
                            <span style={styles.checkboxLabel}>{t('inviteExport.includeRevoked', 'Include revoked')}</span>
                        </label>
                    </div>
                    <div style={styles.exportButtons}>
                        <button
                            aria-label={t('inviteExport.exportCSV', 'Export as CSV')}
                            onClick={exportCSV}
                            style={styles.exportButton}
                        >
                            <FaDownload className="mr-6" />
                            CSV'ye Aktar
                        </button>
                        <button
                            aria-label={t('inviteExport.exportJSON', 'Export as JSON')}
                            onClick={exportJSON}
                            style={exportJsonButtonStyle}
                        >
                            <FaDownload className="mr-6" />
                            JSON'a Aktar
                        </button>
                    </div>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>{t('inviteExport.loading', 'Loading invites...')}</div>
                    ) : invites.length === 0 ? (
                        <div style={styles.empty}>{t('inviteExport.notFound', 'No invites found')}</div>
                    ) : (
                        <>
                            <div style={styles.summary}>
                                <div style={styles.summaryItem}>
                                    <div style={styles.summaryValue}>{invites.length}</div>
                                    <div style={styles.summaryLabel}>Toplam Davetler</div>
                                </div>
                                <div style={styles.summaryItem}>
                                    <div style={styles.summaryValue}>
                                        {invites.filter((i) => !i.revoked && !i.is_expired).length}
                                    </div>
                                    <div style={styles.summaryLabel}>Active</div>
                                </div>
                                <div style={styles.summaryItem}>
                                    <div style={styles.summaryValue}>
                                        {invites.reduce((sum, i) => sum + i.uses, 0)}
                                    </div>
                                    <div style={styles.summaryLabel}>{t('admin.totalUsage', 'Total Usage')}</div>
                                </div>
                            </div>

                            <div style={styles.invitesList}>
                                {invites.map((invite, idx) => (
                                    <div key={`item-${idx}`} style={styles.inviteCard}>
                                        <div style={styles.inviteCode}>{invite.code}</div>
                                        <div style={styles.inviteDetails}>
                                            <div style={styles.inviteDetail}>
                                                Creator:{' '}
                                                <span style={styles.inviteValue}>
                                                    {invite.creator_username}
                                                </span>
                                            </div>
                                            <div style={styles.inviteDetail}>
                                                Uses:{' '}
                                                <span style={styles.inviteValue}>
                                                    {invite.uses}/{invite.max_uses || '∞'}
                                                </span>
                                            </div>
                                            <div style={styles.inviteDetail}>
                                                Created:{' '}
                                                <span style={styles.inviteValue}>
                                                    {new Date(
                                                        invite.created_at
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <div style={styles.inviteStatus}>
                                            {invite.revoked ? (
                                                <span style={revokedStatusBadgeStyle}>Revoked</span>
                                            ) : invite.is_expired ? (
                                                <span style={expiredStatusBadgeStyle}>Expired</span>
                                            ) : (
                                                <span style={activeStatusBadgeStyle}>Active</span>
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
        borderBottom: '1px solid #0e1222',
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
        color: '#949ba4',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '5px',
    },
    toolbar: {
        padding: '15px 20px',
        borderBottom: '1px solid #0e1222',
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
        color: '#dbdee1',
    },
    exportButtons: {
        display: 'flex',
        gap: '8px',
    },
    exportButton: {
        padding: '8px 16px',
        backgroundColor: '#23a559',
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
        color: '#949ba4',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#949ba4',
        padding: '40px',
    },
    summary: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '24px',
    },
    summaryItem: {
        backgroundColor: '#111214',
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
        color: '#949ba4',
    },
    invitesList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    inviteCard: {
        backgroundColor: '#111214',
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
        color: '#949ba4',
    },
    inviteValue: {
        color: '#dbdee1',
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

InviteExportPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    serverId: PropTypes.string,
};
export default InviteExportPanel;
