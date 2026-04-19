import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaUsers, FaLink, FaCheckCircle } from 'react-icons/fa';
import { toast } from '../../utils/toast';
import { useTranslation } from 'react-i18next';

const WaitlistPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
    const { t } = useTranslation();
    const [waitlist, setWaitlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [referralCode, setReferralCode] = useState('');

    useEffect(() => {
        fetchWaitlist();
    }, []);

    const fetchWaitlist = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/waitlist/`);
            const data = await response.json();
            setWaitlist(data.entries || []);
            setReferralCode(data.referral_code || '');
        } catch (error) {
            toast.error(t('waitlist.loadFailed'));
        } finally {
            setLoading(false);
        }
    };

    const approveEntry = async (entryId) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/waitlist/${entryId}/approve/`, {
                method: 'POST',
            });
            toast.success(t('waitlist.approved'));
            fetchWaitlist();
        } catch (error) {
            toast.error(t('waitlist.approveFailed'));
        }
    };

    const rejectEntry = async (entryId) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/waitlist/${entryId}/reject/`, {
                method: 'POST',
            });
            toast.success(t('waitlist.rejected'));
            fetchWaitlist();
        } catch (error) {
            toast.error(t('waitlist.rejectFailed'));
        }
    };

    const copyReferralCode = () => {
        navigator.clipboard.writeText(referralCode);
        toast.success(t('waitlist.referralCopied'));
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaUsers className="icon-primary-mr10" />
                        <h2 style={styles.title}>Sunucu Bekleme Listesi</h2>
                    </div>
                    <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                {referralCode && (
                    <div style={styles.referralSection}>
                        <div style={styles.referralLabel}>Yönlendirme Kodunuz</div>
                        <div style={styles.referralCode}>
                            <code>{referralCode}</code>
                            <button
                                aria-label="copy Referral Code"
                                onClick={copyReferralCode}
                                style={styles.copyButton}
                            >
                                <FaLink />
                            </button>
                        </div>
                        <div style={styles.referralHint}>
                            Share this code with others to move up in the waitlist
                        </div>
                    </div>
                )}

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Bekleme listesi yükleniyor...</div>
                    ) : waitlist.length === 0 ? (
                        <div style={styles.empty}>Bekleme listesi boş</div>
                    ) : (
                        <div style={styles.entriesList}>
                            {waitlist.map((entry, idx) => (
                                <div key={`item-${idx}`} style={styles.entryCard}>
                                    <div style={styles.entryInfo}>
                                        <div style={styles.entryHeader}>
                                            <span style={styles.entryPosition}>
                                                {entry.position}
                                            </span>
                                            <span style={styles.entryEmail}>{entry.email}</span>
                                        </div>
                                        <div style={styles.entryMeta}>
                                            <span>
                                                Joined:{' '}
                                                {new Date(entry.created_at).toLocaleDateString()}
                                            </span>
                                            {entry.referrals_count > 0 && (
                                                <>
                                                    <span> • </span>
                                                    <span style={styles.referralsCount}>
                                                        {entry.referrals_count} referral
                                                        {entry.referrals_count !== 1 ? 's' : ''}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        {entry.status === 'approved' && (
                                            <div style={styles.approvedBadge}>
                                                <FaCheckCircle /> Approved
                                            </div>
                                        )}
                                        {entry.status === 'rejected' && (
                                            <div style={styles.rejectedBadge}>Rejected</div>
                                        )}
                                    </div>
                                    {entry.status === 'pending' && (
                                        <div style={styles.entryActions}>
                                            <button
                                                aria-label="Action button"
                                                onClick={() => approveEntry(entry.id)}
                                                style={styles.approveButton}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                aria-label="Action button"
                                                onClick={() => rejectEntry(entry.id)}
                                                style={styles.rejectButton}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
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
        maxWidth: '700px',
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
    referralSection: {
        padding: '20px',
        borderBottom: '1px solid #0e1222',
        backgroundColor: '#111214',
    },
    referralLabel: {
        fontSize: '13px',
        color: '#dbdee1',
        marginBottom: '8px',
    },
    referralCode: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '8px',
    },
    copyButton: {
        padding: '8px 12px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
    },
    referralHint: {
        fontSize: '12px',
        color: '#949ba4',
        fontStyle: 'italic',
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
    entriesList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    entryCard: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    entryInfo: {
        flex: 1,
    },
    entryHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '8px',
    },
    entryPosition: {
        fontSize: '16px',
        fontWeight: '700',
        color: '#5865f2',
    },
    entryEmail: {
        fontSize: '14px',
        color: '#ffffff',
    },
    entryMeta: {
        fontSize: '12px',
        color: '#949ba4',
        marginBottom: '8px',
    },
    referralsCount: {
        color: '#23a559',
        fontWeight: '600',
    },
    approvedBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        backgroundColor: '#23a559',
        borderRadius: '4px',
        fontSize: '12px',
        color: '#ffffff',
        fontWeight: '600',
    },
    rejectedBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        backgroundColor: '#f23f42',
        borderRadius: '4px',
        fontSize: '12px',
        color: '#ffffff',
        fontWeight: '600',
    },
    entryActions: {
        display: 'flex',
        gap: '8px',
    },
    approveButton: {
        padding: '8px 16px',
        backgroundColor: '#23a559',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '600',
    },
    rejectButton: {
        padding: '8px 16px',
        backgroundColor: '#f23f42',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '600',
    },
};

WaitlistPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    serverId: PropTypes.string,
};
export default WaitlistPanel;
