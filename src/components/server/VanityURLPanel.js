import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { FaTimes, FaLink, FaHistory, FaCheck } from 'react-icons/fa';
import { toast } from '../../utils/toast';

const VanityURLPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
    const { t } = useTranslation();
    const [vanityUrl, setVanityUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentVanity, setCurrentVanity] = useState(null);
    const [history, setHistory] = useState([]);
    const [checking, setChecking] = useState(false);
    const [available, setAvailable] = useState(null);
    const setButtonStyle = {
        ...styles.setButton,
        ...(!available ? styles.setButtonDisabled : {}),
    };

    useEffect(() => {
        fetchVanity();
    }, []);

    const fetchVanity = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/vanity/get/${serverId}/`);
            const data = await response.json();
            setCurrentVanity(data.vanity_url);
            setHistory(data.history || []);
        } catch (error) {
            // No vanity URL set yet
        }
    };

    const checkAvailability = async (url) => {
        if (!url || url.length < 3) {
            setAvailable(null);
            return;
        }

        setChecking(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/vanity/check/?url=${url}`);
            const data = await response.json();
            setAvailable(data.available);
        } catch (error) {
            setAvailable(false);
        } finally {
            setChecking(false);
        }
    };

    const setVanity = async () => {
        if (!vanityUrl || vanityUrl.length < 3) {
            toast.error(t('vanity.tooShort'));
            return;
        }

        if (!available) {
            toast.error(t('vanity.unavailable'));
            return;
        }

        try {
            await fetchWithAuth(`${apiBaseUrl}/vanity/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    server_id: serverId,
                    vanity_url: vanityUrl,
                }),
            });

            toast.success(t('vanity.setSuccess'));
            setVanityUrl('');
            setAvailable(null);
            fetchVanity();
        } catch (error) {
            toast.error(t('vanity.setFailed'));
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaLink className="icon-primary-mr10" />
                        <h2 style={styles.title}>Vanity URL</h2>
                    </div>
                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {currentVanity && (
                        <div style={styles.currentSection}>
                            <div style={styles.label}>Current Vanity URL:</div>
                            <div style={styles.currentUrl}>pawscord.com/{currentVanity}</div>
                        </div>
                    )}

                    <div style={styles.section}>
                        <div style={styles.label}>Yeni Vanity URL Ayarla</div>
                        <div style={styles.inputRow}>
                            <div style={styles.prefix}>pawscord.com/</div>
                            <input
                                type="text"
                                value={vanityUrl}
                                onChange={(e) => {
                                    const val = e.target.value
                                        .toLowerCase()
                                        .replace(/[^a-z0-9-]/g, '');
                                    setVanityUrl(val);
                                    checkAvailability(val);
                                }}
                                placeholder={t('vanityUrl.slug', 'my-server')}
                                style={styles.input}
                                maxLength={32}
                            />
                            {checking && <div style={styles.checking}>Checking...</div>}
                            {!checking && available === true && (
                                <FaCheck className="icon-success" />
                            )}
                            {!checking && available === false && (
                                <div style={styles.unavailable}>Unavailable</div>
                            )}
                        </div>
                        <div style={styles.hint}>
                            3-32 characters, letters, numbers, and hyphens only
                        </div>
                        <button
                            aria-label={t('vanityURL.setVanity', 'Set vanity URL')}
                            onClick={setVanity}
                            disabled={!available}
                            style={setButtonStyle}
                        >
                            Set Vanity URL
                        </button>
                    </div>

                    {history.length > 0 && (
                        <div style={styles.section}>
                            <div style={styles.sectionTitle}>
                                <FaHistory className="mr-8" />
                                History
                            </div>
                            <div style={styles.historyList}>
                                {history.map((item, idx) => (
                                    <div key={`item-${idx}`} style={styles.historyItem}>
                                        <div style={styles.historyUrl}>{item.vanity_url}</div>
                                        <div style={styles.historyDate}>
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
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
    currentSection: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '24px',
    },
    currentUrl: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#5865f2',
        fontFamily: 'monospace',
    },
    section: {
        marginBottom: '24px',
    },
    label: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#dbdee1',
        marginBottom: '8px',
    },
    inputRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#111214',
        borderRadius: '4px',
        padding: '10px 12px',
    },
    prefix: {
        fontSize: '14px',
        color: '#949ba4',
    },
    input: {
        flex: 1,
        background: 'none',
        border: 'none',
        color: '#ffffff',
        fontSize: '14px',
        outline: 'none',
    },
    checking: {
        fontSize: '12px',
        color: '#f0b232',
    },
    unavailable: {
        fontSize: '12px',
        color: '#f23f42',
    },
    hint: {
        fontSize: '12px',
        color: '#949ba4',
        marginTop: '8px',
        marginBottom: '16px',
    },
    setButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
    },
    setButtonDisabled: {
        backgroundColor: '#111214',
        cursor: 'not-allowed',
    },
    sectionTitle: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#dbdee1',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
    },
    historyList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    historyItem: {
        backgroundColor: '#111214',
        borderRadius: '4px',
        padding: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    historyUrl: {
        fontSize: '14px',
        color: '#dbdee1',
        fontFamily: 'monospace',
    },
    historyDate: {
        fontSize: '12px',
        color: '#949ba4',
    },
};

VanityURLPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    serverId: PropTypes.string,
};
export default VanityURLPanel;
