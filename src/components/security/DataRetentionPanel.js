/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaTrash, FaClock, FaSave } from 'react-icons/fa';
import { toast } from '../../utils/toast';
import { useTranslation } from 'react-i18next';
import confirmDialog from '../../utils/confirmDialog';

const _st1160 = {
    padding: '8px 12px',
    backgroundColor: '#1e1e1e',
    border: '1px solid #0e1222',
    borderRadius: '4px',
    color: '#dbdee1',
    cursor: 'pointer',
    fontSize: '13px',
};

const DataRetentionPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
    const { t } = useTranslation();
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newPolicy, setNewPolicy] = useState({
        content_type: 'messages',
        retention_days: 30,
        enabled: true,
    });

    const contentTypes = [
        { value: 'messages', label: 'Messages' },
        { value: 'media', label: 'Media Files' },
        { value: 'voice_recordings', label: 'Voice Recordings' },
        { value: 'audit_logs', label: 'Audit Logs' },
        { value: 'deleted_messages', label: 'Deleted Messages' },
    ];

    const retentionPresets = [
        { days: 7, label: '7 Days' },
        { days: 30, label: '30 Days' },
        { days: 90, label: '90 Days' },
        { days: 180, label: '6 Months' },
        { days: 365, label: '1 Year' },
        { days: 730, label: '2 Years' },
        { days: -1, label: 'Forever' },
    ];

    useEffect(() => {
        fetchPolicies();
    }, []);

    const fetchPolicies = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/retention/`);
            const data = await response.json();
            setPolicies(data.policies || []);
        } catch (error) {
            toast.error(t('dataRetention.loadFailed'));
        } finally {
            setLoading(false);
        }
    };

    const savePolicy = async () => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/retention/policies/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newPolicy, server_id: serverId }),
            });

            toast.success(t('dataRetention.created'));
            setNewPolicy({ content_type: 'messages', retention_days: 30, enabled: true });
            fetchPolicies();
        } catch (error) {
            toast.error(t('dataRetention.createFailed'));
        }
    };

    const togglePolicy = async (policyId, enabled) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/retention/policies/${policyId}/toggle/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ enabled }),
            });

            toast.success(enabled ? 'Policy enabled' : 'Policy disabled');
            fetchPolicies();
        } catch (error) {
            toast.error(t('dataRetention.toggleFailed'));
        }
    };

    const deletePolicy = async (policyId) => {
        if (!(await confirmDialog(t('retention.deletePolicyConfirm')))) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/retention/policies/${policyId}/delete/`, {
                method: 'DELETE',
            });

            toast.success(t('dataRetention.deleted'));
            fetchPolicies();
        } catch (error) {
            toast.error(t('dataRetention.deleteFailed'));
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaClock className="icon-primary-mr10" />
                        <h2 style={styles.title}>Veri Saklama Politikaları</h2>
                    </div>
                    <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>Yeni Politika Oluştur</h3>
                        <div style={styles.form}>
                            <div style={styles.formRow}>
                                <label style={styles.label}>İçerik Türü</label>
                                <select
                                    value={newPolicy.content_type}
                                    onChange={(e) =>
                                        setNewPolicy({ ...newPolicy, content_type: e.target.value })
                                    }
                                    style={styles.select}
                                >
                                    {contentTypes.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div style={styles.formRow}>
                                <label style={styles.label}>Saklama Süresi</label>
                                <div style={styles.presetButtons}>
                                    {retentionPresets.map((preset) => (
                                        <button
                                            aria-label="Action button"
                                            key={preset.days}
                                            onClick={() =>
                                                setNewPolicy({
                                                    ...newPolicy,
                                                    retention_days: preset.days,
                                                })
                                            }
                                            style={_st1160}
                                        >
                                            {preset.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                aria-label="save Policy"
                                onClick={savePolicy}
                                style={styles.saveButton}
                            >
                                <FaSave className="mr-8" />
                                Create Policy
                            </button>
                        </div>
                    </div>

                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>Active Policies ({policies.length})</h3>
                        {loading ? (
                            <div style={styles.loading}>{t('common.loading')}</div>
                        ) : policies.length === 0 ? (
                            <div style={styles.empty}>
                                Hiçbir saklama politikası yapılandırılmamış
                            </div>
                        ) : (
                            <div style={styles.policiesList}>
                                {policies.map((policy, idx) => (
                                    <div key={`item-${idx}`} style={styles.policyCard}>
                                        <div style={styles.policyInfo}>
                                            <div style={styles.policyType}>
                                                {contentTypes.find(
                                                    (t) => t.value === policy.content_type
                                                )?.label || policy.content_type}
                                            </div>
                                            <div style={styles.policyRetention}>
                                                {policy.retention_days === -1
                                                    ? 'Sonsuza kadar'
                                                    : `${policy.retention_days} gün`}
                                            </div>
                                            <div style={styles.policyMeta}>
                                                Son çalışma:{' '}
                                                {policy.last_run
                                                    ? new Date(policy.last_run).toLocaleString()
                                                    : 'Hiçbir zaman'}
                                            </div>
                                            {policy.items_deleted > 0 && (
                                                <div style={styles.policyMeta}>
                                                    Silinen öğe:{' '}
                                                    {policy.items_deleted.toLocaleString()}
                                                </div>
                                            )}
                                        </div>
                                        <div style={styles.policyActions}>
                                            <label style={styles.toggleSwitch}>
                                                <input
                                                    type="checkbox"
                                                    checked={policy.enabled}
                                                    onChange={(e) =>
                                                        togglePolicy(policy.id, e.target.checked)
                                                    }
                                                />
                                                <span style={styles.toggleSlider}></span>
                                            </label>
                                            <button
                                                aria-label="Action button"
                                                onClick={() => deletePolicy(policy.id)}
                                                style={styles.deleteButton}
                                                title="Politikayı sil"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
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
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1,
    },
    section: {
        marginBottom: '30px',
    },
    sectionTitle: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '16px',
    },
    form: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        padding: '20px',
    },
    formRow: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        fontSize: '14px',
        fontWeight: '600',
        color: '#dbdee1',
        marginBottom: '8px',
    },
    select: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#1e1e1e',
        border: '1px solid #0e1222',
        borderRadius: '4px',
        color: '#ffffff',
        fontSize: '14px',
    },
    presetButtons: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '8px',
    },
    presetButton: {
        padding: '8px 12px',
        backgroundColor: '#1e1e1e',
        border: '1px solid #0e1222',
        borderRadius: '4px',
        color: '#dbdee1',
        cursor: 'pointer',
        fontSize: '13px',
    },
    presetButtonActive: {
        backgroundColor: '#5865f2',
        borderColor: '#5865f2',
        color: '#ffffff',
    },
    saveButton: {
        padding: '10px 20px',
        backgroundColor: '#23a559',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    policiesList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    policyCard: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    policyInfo: {
        flex: 1,
    },
    policyType: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '4px',
    },
    policyRetention: {
        fontSize: '14px',
        color: '#5865f2',
        marginBottom: '8px',
    },
    policyMeta: {
        fontSize: '12px',
        color: '#949ba4',
        marginTop: '4px',
    },
    policyActions: {
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
    },
    toggleSwitch: {
        position: 'relative',
        display: 'inline-block',
        width: '44px',
        height: '24px',
    },
    toggleSlider: {
        position: 'absolute',
        cursor: 'pointer',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#111214',
        transition: '0.3s',
        borderRadius: '24px',
    },
    deleteButton: {
        background: 'none',
        border: 'none',
        color: '#f23f42',
        cursor: 'pointer',
        fontSize: '16px',
        padding: '8px',
    },
};

DataRetentionPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    serverId: PropTypes.string,
};
export default DataRetentionPanel;
