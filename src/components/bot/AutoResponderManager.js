/* eslint-disable no-irregular-whitespace */
/* eslint-disable jsx-a11y/label-has-associated-control */
// frontend/src/components/AutoResponderManager.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from '../../utils/toast';
import { FaTimes, FaPlus, FaRobot, FaTrash } from 'react-icons/fa';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const S = {
    txt: { marginLeft: '8px', color: '#b5bac1' },
};

const AutoResponderManager = ({
    onClose,
    fetchWithAuth,
    apiBaseUrl,
    serverId,
    embedded = false,
}) => {
    const { t } = useTranslation();
    const [responders, setResponders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [newResponder, setNewResponder] = useState({
        trigger: '',
        response: '',
        is_regex: false,
    });

    useEffect(() => {
        loadResponders();
    }, []);

    const loadResponders = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/autoresponders/list/`);
            if (res.ok) {
                const data = await res.json();
                setResponders(data.responders || []);
            }
        } catch (error) {
            logger.error('Load responders error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!newResponder.trigger || !newResponder.response) {
            toast.error(t('autoResponder.requiredFields'));
            return;
        }

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/autoresponders/create/`, {
                method: 'POST',
                body: JSON.stringify(newResponder),
            });

            if (res.ok) {
                toast.success(t('autoResponder.created'));
                setShowCreate(false);
                setNewResponder({ trigger: '', response: '', is_regex: false });
                loadResponders();
            }
        } catch (error) {
            logger.error('Create responder error:', error);
        }
    };

    // Content alanını oluştur
    const content = (
        <>
            {!showCreate && (
                <button
                    aria-label="Create"
                    onClick={() => setShowCreate(true)}
                    style={styles.createButton}
                >
                    <FaPlus /> {t('autoResponder.newButton')}
                </button>
            )}

            {showCreate && (
                <div style={styles.createForm}>
                    <input
                        type="text"
                        placeholder={t('autoResponder.triggerPlaceholder')}
                        value={newResponder.trigger}
                        onChange={(e) =>
                            setNewResponder({ ...newResponder, trigger: e.target.value })
                        }
                        style={styles.input}
                    />
                    <textarea
                        placeholder={t('autoResponder.responsePlaceholder')}
                        value={newResponder.response}
                        onChange={(e) =>
                            setNewResponder({ ...newResponder, response: e.target.value })
                        }
                        style={styles.textarea}
                    />
                    <label style={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={newResponder.is_regex}
                            onChange={(e) =>
                                setNewResponder({ ...newResponder, is_regex: e.target.checked })
                            }
                        />
                        <span style={S.txt}>{t('autoResponder.useRegex')}</span>
                    </label>
                    <div className="flex-gap-10">
                        <button
                            aria-label="handle Create"
                            onClick={handleCreate}
                            style={styles.submitButton}
                        >
                            {t('common.create')}
                        </button>
                        <button
                            aria-label="Create"
                            onClick={() => setShowCreate(false)}
                            style={styles.cancelButton}
                        >
                            {t('common.cancel')}
                        </button>
                    </div>
                </div>
            )}

            {loading ? (
                <div style={styles.loading}>{t('common.loading')}</div>
            ) : responders.length === 0 ? (
                <div style={styles.empty}>{t('autoResponder.empty')}</div>
            ) : (
                <div style={styles.responderList}>
                    {responders.map((resp) => (
                        <div key={resp.id} style={styles.responderItem}>
                            <div>
                                <div style={styles.trigger}>🤖 {resp.trigger}</div>
                                <div style={styles.response}>{resp.response}</div>
                            </div>
                        </div>
                    ))}
                </div>
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
                    <h2 style={styles.title}>
                        <FaRobot /> {t('autoResponder.title')}
                    </h2>
                    <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
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
        maxWidth: '600px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
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
        fontSize: '1.5em',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: '1.5em',
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1,
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '15px',
    },
    createForm: {
        backgroundColor: '#1e2024',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#111214',
        border: '1px solid #5865f2',
        borderRadius: '4px',
        color: 'white',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        minHeight: '80px',
        backgroundColor: '#111214',
        border: '1px solid #5865f2',
        borderRadius: '4px',
        color: 'white',
        resize: 'vertical',
    },
    checkbox: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    submitButton: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#3ba55d',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    cancelButton: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#f23f42',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    loading: {
        textAlign: 'center',
        color: '#b5bac1',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#b5bac1',
        padding: '40px',
    },
    responderList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    responderItem: {
        backgroundColor: '#1e2024',
        padding: '15px',
        borderRadius: '8px',
    },
    trigger: {
        color: '#5865f2',
        fontWeight: 'bold',
        marginBottom: '8px',
    },
    response: {
        color: '#dbdee1',
        fontSize: '0.9em',
    },
};

AutoResponderManager.propTypes = {
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    serverId: PropTypes.string,
    embedded: PropTypes.bool,
};
export default AutoResponderManager;
