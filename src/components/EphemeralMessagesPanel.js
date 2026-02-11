import { useState, useEffect } from 'react';
import { FaTimes, FaClock, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { toast } from '../utils/toast';

const EphemeralMessagesPanel = ({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ttl, setTtl] = useState(3600); // Default 1 hour

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
            toast.error('Failed to load ephemeral settings');
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
                    ttl: ttl
                })
            });

            toast.success(`Ephemeral messages ${!settings?.enabled ? 'enabled' : 'disabled'}`);
            fetchSettings();
        } catch (error) {
            toast.error('Failed to update settings');
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
                        ttl: newTTL
                    })
                });

                toast.success('Auto-delete time updated');
                fetchSettings();
            } catch (error) {
                toast.error('Failed to update TTL');
            }
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaClock style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Auto-Delete Messages</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading settings...</div>
                    ) : (
                        <>
                            <div style={styles.toggleSection}>
                                <div>
                                    <div style={styles.toggleLabel}>Enable Auto-Delete</div>
                                    <div style={styles.toggleDescription}>
                                        Messages will automatically delete after the specified time
                                    </div>
                                </div>
                                <button onClick={toggleEphemeral} style={styles.toggleButton}>
                                    {settings?.enabled ? (
                                        <FaToggleOn style={{ fontSize: '32px', color: '#43b581' }} />
                                    ) : (
                                        <FaToggleOff style={{ fontSize: '32px', color: '#99aab5' }} />
                                    )}
                                </button>
                            </div>

                            {settings?.enabled && (
                                <div style={styles.ttlSection}>
                                    <label style={styles.label}>Auto-Delete After</label>
                                    <div style={styles.optionsGrid}>
                                        {ttlOptions.map(option => (
                                            <button
                                                key={option.value}
                                                onClick={() => updateTTL(option.value)}
                                                style={{
                                                    ...styles.optionButton,
                                                    ...(ttl === option.value && styles.optionButtonActive)
                                                }}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>

                                    <div style={styles.info}>
                                        ⏱️ Current setting: Messages auto-delete after{' '}
                                        <strong>{ttlOptions.find(o => o.value === ttl)?.label || `${ttl} seconds`}</strong>
                                    </div>
                                </div>
                            )}

                            {!settings?.enabled && (
                                <div style={styles.disabledMessage}>
                                    Ephemeral messages are currently disabled. Enable them to automatically delete messages after a set time period.
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
    toggleSection: {
        backgroundColor: '#2c2f33',
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
        color: '#99aab5',
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
        color: '#dcddde',
    },
    optionsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
    },
    optionButton: {
        padding: '12px',
        backgroundColor: '#2c2f33',
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
        backgroundColor: '#2c2f33',
        borderRadius: '6px',
        padding: '12px',
        fontSize: '14px',
        color: '#dcddde',
        textAlign: 'center',
    },
    disabledMessage: {
        backgroundColor: '#2c2f33',
        borderRadius: '6px',
        padding: '20px',
        fontSize: '14px',
        color: '#99aab5',
        textAlign: 'center',
    },
};

export default EphemeralMessagesPanel;
