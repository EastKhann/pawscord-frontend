/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaClock, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { toast } from '../../utils/toast';
import { useTranslation } from 'react-i18next';

const EphemeralMessagesPanel = ({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
    const { t } = useTranslation();
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ttl, setTtl] = useState(3600); // Default 1 hour
    const inactiveToggleStyle = { fontSize: '32px', color: '#949ba4' };
    const activeToggleStyle = { fontSize: '32px', color: '#23a559' };
    const getOptionButtonStyle = (value) => ({
        ...styles.optionButton,
        ...(ttl === value ? styles.optionButtonActive : {}),
    });

    const ttlOptions = [
        { value: 300, label: '5 minutes' },
        { value: 600, label: '10 minutes' },
        { value: 1800, label: '30 minutes' },
        { value: 3600, label: '1 hour' },
        { value: 7200, label: '2 hours' },
        { value: 14400, label: '4 hours' },
        { value: 28800, label: '8 hours' },
        { value: 86400, label: '24 hours' },
        { value: 604800, label: '7 days' },
    ];

    useEffect(() => {
        fetchSettings();
    }, [roomSlug]);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/rooms/${roomSlug}/ephemeral/`);
            const data = await response.json();
            setSettings(data);
            if (data.ttl) setTtl(data.ttl);
        } catch (error) {
            toast.error(t('ephemeral.loadFailed'));
        } finally {
            setLoading(false);
        }
    };

    const toggleEphemeral = async () => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/rooms/${roomSlug}/ephemeral/set/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    enabled: !settings?.enabled,
                    ttl: ttl,
                }),
            });

            toast.success(!settings?.enabled ? t('ephemeral.enabled') : t('ephemeral.disabled'));
            fetchSettings();
        } catch (error) {
            toast.error(t('ephemeral.updateFailed'));
        }
    };

    const updateTTL = async (newTTL) => {
        setTtl(newTTL);
        if (settings?.enabled) {
            try {
                await fetchWithAuth(`${apiBaseUrl}/rooms/${roomSlug}/ephemeral/set/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        enabled: true,
                        ttl: newTTL,
                    }),
                });

                toast.success(t('ephemeral.ttlUpdated'));
                fetchSettings();
            } catch (error) {
                toast.error(t('ephemeral.ttlUpdateFailed'));
            }
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaClock className="icon-primary-mr10" />
                        <h2 style={styles.title}>Otomatik Mesaj Silme</h2>
                    </div>
                    <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Ayarlar yükleniyor...</div>
                    ) : (
                        <>
                            <div style={styles.toggleSection}>
                                <div>
                                    <div style={styles.toggleLabel}>
                                        Otomatik Silmeyi Etkinleştir
                                    </div>
                                    <div style={styles.toggleDescription}>
                                        Mesajlar belirtilen süreden sonra otomatik olarak silinecek
                                    </div>
                                </div>
                                <button
                                    aria-label="toggle Ephemeral"
                                    onClick={toggleEphemeral}
                                    style={styles.toggleButton}
                                >
                                    {settings?.enabled ? (
                                        <FaToggleOn style={activeToggleStyle} />
                                    ) : (
                                        <FaToggleOff style={inactiveToggleStyle} />
                                    )}
                                </button>
                            </div>

                            {settings?.enabled && (
                                <div style={styles.ttlSection}>
                                    <label style={styles.label}>Şu Süreden Sonra Sil</label>
                                    <div style={styles.optionsGrid}>
                                        {ttlOptions.map((option) => (
                                            <button
                                                aria-label="Action button"
                                                key={option.value}
                                                onClick={() => updateTTL(option.value)}
                                                style={getOptionButtonStyle(option.value)}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>

                                    <div style={styles.info}>
                                        ⏱️ Mevcut ayar: Mesajlar şu süreden sonra silinir:
                                        <strong>
                                            {ttlOptions.find((o) => o.value === ttl)?.label ||
                                                `${ttl} saniye`}
                                        </strong>
                                    </div>
                                </div>
                            )}

                            {!settings?.enabled && (
                                <div style={styles.disabledMessage}>
                                    Geçici mesajlar şu anda devre dışı. Mesajların belirli bir
                                    süreden sonra otomatik silinmesi için etkinleştirin.
                                </div>
                            )}
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
        maxWidth: '600px',
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
    loading: {
        textAlign: 'center',
        color: '#949ba4',
        padding: '40px',
    },
    toggleSection: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    toggleLabel: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '4px',
    },
    toggleDescription: {
        fontSize: '13px',
        color: '#949ba4',
    },
    toggleButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '5px',
    },
    ttlSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    label: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#dbdee1',
    },
    optionsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
    },
    optionButton: {
        padding: '12px',
        backgroundColor: '#111214',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.2s',
    },
    optionButtonActive: {
        backgroundColor: '#5865f2',
    },
    info: {
        backgroundColor: '#111214',
        borderRadius: '6px',
        padding: '12px',
        fontSize: '14px',
        color: '#dbdee1',
        textAlign: 'center',
    },
    disabledMessage: {
        backgroundColor: '#111214',
        borderRadius: '6px',
        padding: '20px',
        fontSize: '14px',
        color: '#949ba4',
        textAlign: 'center',
    },
};

EphemeralMessagesPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    roomSlug: PropTypes.string,
};
export default EphemeralMessagesPanel;
