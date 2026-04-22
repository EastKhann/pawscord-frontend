// frontend/src/components/VanityURLManager.js

import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { FaTimes, FaLink, FaCopy, FaTrash } from 'react-icons/fa';

import toast from '../../utils/toast';

import confirmDialog from '../../utils/confirmDialog';

import { PRODUCTION_URL } from '../../utils/constants';

import { useTranslation } from 'react-i18next';

import logger from '../../utils/logger';

const S = {
    txt: { fontSize: '0.85em', color: '#949ba4', marginTop: '8px', marginBottom: '15px' },
};

const VanityURLManager = ({ onClose, fetchWithAuth, apiBaseUrl, serverId, embedded = false }) => {
    const { t } = useTranslation();

    const [vanityPath, setVanityPath] = useState('');

    const [loading, setLoading] = useState(false);

    const [existingVanity, setExistingVanity] = useState(null);

    const [loadingExisting, setLoadingExisting] = useState(true);

    // Mevcut vanity URL'i upload

    useEffect(() => {
        loadExistingVanity();
    }, [serverId]);

    const loadExistingVanity = async () => {
        if (!serverId) {
            setLoadingExisting(false);
            return;
        }

        setLoadingExisting(true);

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/vanity/get/${serverId}/`);

            if (res.ok) {
                const contentType = res.headers.get('content-type') || '';

                if (!contentType.includes('application/json')) {
                    logger.warn('[Vanity] Non-JSON response:', contentType);

                    setExistingVanity(null);

                    return;
                }

                const data = await res.json();

                if (data.exists) {
                    setExistingVanity(data);

                    setVanityPath(data.path);
                } else {
                    setExistingVanity(null);
                }
            }
        } catch (error) {
            logger.error(t('ui.vanity_url_load_hatasi'), error);
        } finally {
            setLoadingExisting(false);
        }
    };

    const handleCreate = async () => {
        if (!vanityPath.trim()) {
            toast.warning(t('vanity.pathRequired'));

            return;
        }

        if (vanityPath.length < 3) {
            toast.warning(t('ui.path_en_az_3_karakter_olmali'));

            return;
        }

        setLoading(true);

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/vanity/create/`, {
                method: 'POST',

                body: JSON.stringify({
                    path: vanityPath,

                    server_id: serverId,
                }),
            });

            if (res.ok) {
                const data = await res.json();

                toast.success(t('vanity.created'));

                loadExistingVanity(); // Listeyi yenile
            } else {
                const data = await res.json();

                toast.error(data.error || t('vanity.pathConflict'));
            }
        } catch (error) {
            logger.error('Vanity URL error:', error);

            toast.error(t('common.serverError'));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!(await confirmDialog(t('vanityUrl.deleteConfirm', 'Are you sure you want to delete this vanity URL?')))) {
            return;
        }

        setLoading(true);

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/vanity/delete/${serverId}/`, {
                method: 'DELETE',
            });

            if (res.ok) {
                toast.success(t('vanity.deleted'));

                setExistingVanity(null);

                setVanityPath('');
            } else {
                const data = await res.json();

                toast.error(data.error || t('common.deleteFailed'));
            }
        } catch (error) {
            logger.error(t('ui.vanity_url_silme_hatasi'), error);

            toast.error(t('common.serverError'));
        } finally {
            setLoading(false);
        }
    };

    const copyUrl = () => {
        const fullUrl = `${PRODUCTION_URL}/join/${existingVanity.path}`;

        navigator.clipboard.writeText(fullUrl);

        toast.success(t('vanity.copied'));
    };

    // Content alanını oluştur

    const content = (
        <>
            {loadingExisting ? (
                <div style={styles.description}>{t('common.loading')}</div>
            ) : (
                <>
                    <div style={styles.description}>
                        {t('vanityUrl.description')}

                        <br />

                        <span className="text-949-09em">
                            Format:{' '}
                            <strong className="icon-primary">pawscord.com/join/yourpath</strong>
                        </span>
                    </div>

                    {existingVanity && (
                        <div style={styles.existingSection}>
                            <div style={styles.existingLabel}>📌 Mevcut Vanity URL:</div>

                            <div style={styles.existingUrl}>
                                <span style={styles.urlText}>
                                    pawscord.com/join/{existingVanity.path}
                                </span>

                                <div className="flex-gap-10">
                                    <button
                                        aria-label={t('vanityUrl.copyUrl', 'Copy URL')}
                                        onClick={copyUrl}
                                        style={styles.copyButton}
                                    >
                                        <FaCopy /> Copy
                                    </button>

                                    <button
                                        aria-label={t('vanityUrl.delete', 'Delete vanity URL')}
                                        onClick={handleDelete}
                                        style={styles.deleteButton}
                                        disabled={loading}
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div style={styles.inputGroup}>
                        <span style={styles.prefix}>pawscord.com/join/</span>

                        <input
                            type="text"
                            value={vanityPath}
                            onChange={(e) =>
                                setVanityPath(
                                    e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                                )
                            }
                            placeholder={t('vanityUrlManager.slug', 'myserver')}
                            style={styles.input}
                            maxLength={32}
                            aria-label={t('vanityUrl.pathInput', 'Vanity URL path')}
                        />
                    </div>

                    <div style={S.txt}>
                        • En az 3, en fazla 32 karakter
                        <br />
                        {t('vanityUrl.rule1', '• Only lowercase letters, numbers and hyphens (-) can be used')}
                        <br />{t('vanityUrl.rule2', '• System words (api, admin, etc.) cannot be used')}
                    </div>

                    <button
                        aria-label={t('vanityUrl.create', 'Create vanity URL')}
                        onClick={handleCreate}
                        disabled={loading || !vanityPath.trim()}
                        style={styles.createButton}
                    >
                        {loading
                            ? 'Processing...'
                            : existingVanity
                                ? '🔗 Vanity URL Currentle'
                                : '🔗 Vanity URL Create'}
                    </button>
                </>
            )}
        </>
    );

    // Embedded mode: sadece içeriği render et

    if (embedded) {
        return <div style={styles.content}>{content}</div>;
    }

    // Standalone mode: overlay ve modal with render et

    return (
        <div
            style={styles.overlay}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                style={styles.modal}
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div style={styles.header}>
                    <h3 style={styles.title}>
                        <FaLink /> Vanity URL Create
                    </h3>

                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>{content}</div>
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

        zIndex: 10000,
    },

    modal: {
        backgroundColor: '#111214',

        borderRadius: '8px',

        width: '90%',

        maxWidth: '500px',
    },

    header: {
        display: 'flex',

        justifyContent: 'space-between',

        alignItems: 'center',

        padding: '20px',

        borderBottom: '1px solid #182135',
    },

    title: {
        color: 'white',

        margin: 0,

        fontSize: '1.3em',

        display: 'flex',

        alignItems: 'center',

        gap: '8px',
    },

    closeButton: {
        background: 'none',

        border: 'none',

        color: '#b5bac1',

        cursor: 'pointer',

        fontSize: '1.3em',
    },

    content: {
        padding: '20px',
    },

    description: {
        color: '#b5bac1',

        fontSize: '0.9em',

        marginBottom: '15px',

        padding: '10px',

        backgroundColor: '#1e2024',

        borderRadius: '4px',
    },

    existingSection: {
        marginBottom: '20px',

        padding: '15px',

        backgroundColor: '#111214',

        borderRadius: '8px',

        border: '1px solid #5865f2',
    },

    existingLabel: {
        color: '#5865f2',

        fontWeight: 'bold',

        marginBottom: '10px',

        fontSize: '0.9em',
    },

    existingUrl: {
        display: 'flex',

        justifyContent: 'space-between',

        alignItems: 'center',

        flexWrap: 'wrap',

        gap: '10px',
    },

    urlText: {
        color: '#fff',

        fontWeight: 'bold',

        fontSize: '1em',
    },

    inputGroup: {
        display: 'flex',

        alignItems: 'center',

        backgroundColor: '#1e2024',

        borderRadius: '4px',

        padding: '5px',

        marginBottom: '15px',
    },

    prefix: {
        color: '#b5bac1',

        padding: '0 10px',

        fontWeight: 'bold',
    },

    input: {
        flex: 1,

        padding: '10px',

        backgroundColor: 'transparent',

        border: 'none',

        color: 'white',

        fontSize: '1em',

        outline: 'none',
    },

    copyButton: {
        padding: '8px 12px',

        backgroundColor: '#23a559',

        border: 'none',

        borderRadius: '4px',

        color: 'white',

        cursor: 'pointer',

        display: 'flex',

        alignItems: 'center',

        gap: '5px',

        fontWeight: 'bold',
    },

    deleteButton: {
        padding: '8px 12px',

        backgroundColor: '#f23f42',

        border: 'none',

        borderRadius: '4px',

        color: 'white',

        cursor: 'pointer',

        display: 'flex',

        alignItems: 'center',

        gap: '5px',

        fontWeight: 'bold',
    },

    createButton: {
        width: '100%',

        padding: '12px',

        backgroundColor: '#5865f2',

        border: 'none',

        borderRadius: '4px',

        color: 'white',

        fontWeight: 'bold',

        cursor: 'pointer',

        fontSize: '1em',
    },
};

VanityURLManager.propTypes = {
    onClose: PropTypes.func,

    fetchWithAuth: PropTypes.func,

    apiBaseUrl: PropTypes.string,

    serverId: PropTypes.string,

    embedded: PropTypes.bool,
};

export default VanityURLManager;
