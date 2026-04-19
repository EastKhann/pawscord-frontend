/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-undef */
// components/APIKeysPanel.js
// 🔑 API Keys Management Panel

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from '../../utils/toast';
import { FaKey, FaTrash, FaCopy, FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
import confirmDialog from '../../utils/confirmDialog';

const S = {
    bg3: {
        padding: '12px',
        backgroundColor: 'rgba(250, 166, 26, 0.1)',
        borderLeft: '3px solid #f0b232',
        borderRadius: '4px',
        fontSize: '13px',
        color: '#dbdee1',
    },
    bg2: {
        background: 'none',
        border: 'none',
        color: '#f23f42',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '4px',
    },
    txt2: { marginTop: '8px', fontSize: '12px', color: '#949ba4' },
    flex2: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px',
        backgroundColor: '#0d0e10',
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontSize: '13px',
        color: '#b5bac1',
    },
    bg: {
        padding: '16px',
        backgroundColor: '#111214',
        borderRadius: '8px',
        border: '1px solid #182135',
    },
    mar: { fontSize: '48px', marginBottom: '16px', opacity: 0.5 },
    flex: {
        padding: '8px 16px',
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: 'bold',
    },
    txt: { margin: '5px 0 0 0', color: '#949ba4', fontSize: '13px' },
};

const APIKeysPanel = ({ fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const [keys, setKeys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showKey, setShowKey] = useState({});

    useEffect(() => {
        loadKeys();
    }, []);

    const loadKeys = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/apikeys/list/`);
            if (res.ok) {
                const data = await res.json();
                setKeys(data);
            }
        } catch (e) {
            logger.error('API keys load error:', e);
        } finally {
            setLoading(false);
        }
    };

    const createKey = async () => {
        const name = prompt('API Key name:');
        if (!name) return;

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/apikeys/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });

            if (res.ok) {
                const newKey = await res.json();
                toast.success(t('apiKeys.created', { key: newKey.key }));
                loadKeys();
            }
        } catch (e) {
            toast.error(t('apiKeys.createFailed'));
        }
    };

    const deleteKey = async (keyId) => {
        if (!(await confirmDialog(t('apiKeys.deleteConfirm')))) return;

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/apikeys/${keyId}/delete/`, {
                method: 'DELETE',
            });
            if (res.ok) {
                loadKeys();
            }
        } catch (e) {
            toast.error(t('apiKeys.deleteFailed'));
        }
    };

    const copyKey = (key) => {
        navigator.clipboard.writeText(key);
        toast.success(t('apiKeys.copied'));
    };

    const maskKey = (key) => {
        if (!key) return '';
        return key.substring(0, 8) + '•'.repeat(24);
    };

    if (loading) return <div className="pad-20-b5">{t('common.loading')}</div>;

    return (
        <div className="flex-col-gap20">
            <div className="flex-between-center">
                <div>
                    <h4 className="text-dbd-m0">API Anahtarları</h4>
                    <p style={S.txt}>
                        Harici entegrasyonlar için API anahtarları oluşturun ve yönetin
                    </p>
                </div>
                <button aria-label="create Key" onClick={createKey} style={S.flex}>
                    <FaPlus /> Yeni Anahtar
                </button>
            </div>

            {keys.length === 0 ? (
                <div className={css.emptyStatePad40}>
                    <FaKey style={S.mar} />
                    <p>Henüz API anahtarı yok</p>
                </div>
            ) : (
                <div className="flex-col-gap12">
                    {keys.map((key) => (
                        <div key={key.id} style={S.bg}>
                            <div className="flex-between-start">
                                <div className="flex-1">
                                    <div className="flex-align-8-mb">
                                        <FaKey className="icon-primary" />
                                        <span className="text-dbd-bold">{key.name}</span>
                                    </div>
                                    <div style={S.flex2}>
                                        <span>{showKey[key.id] ? key.key : maskKey(key.key)}</span>
                                        <button
                                            aria-label="Toggle visibility"
                                            onClick={() =>
                                                setShowKey((prev) => ({
                                                    ...prev,
                                                    [key.id]: !prev[key.id],
                                                }))
                                            }
                                            className={css.btnGhostPad4}
                                        >
                                            {showKey[key.id] ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                        <button
                                            aria-label="Action button"
                                            onClick={() => copyKey(key.key)}
                                            className={css.btnGhostPad4}
                                        >
                                            <FaCopy />
                                        </button>
                                    </div>
                                    <div style={S.txt2}>
                                        Oluşturuldu: {new Date(key.created_at).toLocaleDateString()}
                                        {key.last_used && (
                                            <>
                                                {' '}
                                                • Son kullanım:{' '}
                                                {new Date(key.last_used).toLocaleDateString()}
                                            </>
                                        )}
                                    </div>
                                </div>
                                <button
                                    aria-label="Action button"
                                    onClick={() => deleteKey(key.id)}
                                    style={S.bg2}
                                    title="Anahtarı sil"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div style={S.bg3}>
                ⚠️ <strong>Güvenlik:</strong> API anahtarlarınızı gizli tutun! Anahtarınıza sahip
                olan herkes hesabınıza erişebilir.
            </div>
        </div>
    );
};

APIKeysPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default APIKeysPanel;
