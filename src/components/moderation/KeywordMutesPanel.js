// frontend/src/components/KeywordMutesPanel.js

import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { FaTimes, FaFilter, FaPlus, FaTrash } from 'react-icons/fa';

import toast from '../../utils/toast';

import { useTranslation } from 'react-i18next';

import logger from '../../utils/logger';

/**





 * 🎉  Keyword Mutes Panel





 * Kelime bazl message filterleme





 */

const KeywordMutesPanel = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
    const { t } = useTranslation();

    const [keywords, setKeywords] = useState([]);

    const [newKeyword, setNewKeyword] = useState('');

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadKeywords();
    }, []);

    const loadKeywords = async () => {
        try {
            setLoading(true);

            const response = await fetchWithAuth(`${apiBaseUrl}/mutekeyword/list/`);

            if (response.ok) {
                const data = await response.json();

                setKeywords(data);
            }
        } catch (error) {
            logger.error(t('ui.keyword_load_hatasi'), error);
        } finally {
            setLoading(false);
        }
    };

    const addKeyword = async () => {
        if (!newKeyword.trim()) {
            toast.error(t('keywordMutes.wordRequired'));

            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/mutekeyword/add/`, {
                method: 'POST',

                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({ keyword: newKeyword.trim() }),
            });

            if (response.ok) {
                toast.success(t('keywordMutes.wordAdded'));

                setNewKeyword('');

                loadKeywords();
            } else {
                toast.error(t('keywordMutes.wordAddFailed'));
            }
        } catch (error) {
            logger.error(t('ui.keyword_addme_hatasi'), error);

            toast.error(t('common.error'));
        }
    };

    const removeKeyword = async (keywordId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/mutekeyword/remove/`, {
                method: 'DELETE',

                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({ keyword_id: keywordId }),
            });

            if (response.ok) {
                toast.success(t('keywordMutes.wordRemoved'));

                loadKeywords();
            } else {
                toast.error(t('ui.kelime_kaldirilamadi'));
            }
        } catch (error) {
            logger.error(t('ui.keyword_kaldirma_hatasi'), error);

            toast.error(t('common.error'));
        }
    };

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
                    <div className="flex-align-10">
                        <FaFilter className="icon-danger" />

                        <h2 className="m-0">Kelime Filtreleri</h2>
                    </div>

                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.addSection}>
                    <input
                        type="text"
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addKeyword()}
                        placeholder="Filternecek kelime/ifade girin..."
                        style={styles.input}
                        aria-label="New Keyword"
                    />

                    <button aria-label="add Keyword" onClick={addKeyword} style={styles.addBtn}>
                        <FaPlus /> Add
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>{t('common.loading')}</div>
                    ) : keywords.length === 0 ? (
                        <div style={styles.empty}>
                            <FaFilter className="icon-lg-mb10" />

                            <p>Henüz filtrelenmiş kelime yok</p>

                            <p className="text-gray-12">
                                Bu kelimeler içeren messagelar sizden gizlenecek
                            </p>
                        </div>
                    ) : (
                        <div style={styles.keywordList}>
                            {keywords.map((kw) => (
                                <div key={kw.id} style={styles.keywordItem}>
                                    <div style={styles.keywordText}>
                                        <FaFilter className="text-888-14" />

                                        <span>{kw.keyword}</span>
                                    </div>

                                    <button
                                        aria-label="Action button"
                                        onClick={() => removeKeyword(kw.id)}
                                        style={styles.removeBtn}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={styles.footer}>
                    <div style={styles.hint}>
                        💡 Tip: Bu kelimeleri içeren messagelar size gösterilmeyecek
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

        backgroundColor: 'rgba(0,0,0,0.7)',

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

        color: '#fff',
    },

    header: {
        display: 'flex',

        justifyContent: 'space-between',

        alignItems: 'center',

        padding: '20px',

        borderBottom: '1px solid #333',
    },

    closeBtn: {
        cursor: 'pointer',

        fontSize: '24px',

        color: '#888',
    },

    addSection: {
        display: 'flex',

        gap: '10px',

        padding: '20px',

        borderBottom: '1px solid #333',
    },

    input: {
        flex: 1,

        padding: '12px',

        backgroundColor: '#111214',

        border: '1px solid #444',

        borderRadius: '4px',

        color: '#fff',

        fontSize: '14px',
    },

    addBtn: {
        backgroundColor: '#23a559',

        color: '#fff',

        border: 'none',

        padding: '12px 20px',

        borderRadius: '4px',

        cursor: 'pointer',

        fontSize: '14px',

        fontWeight: '600',

        display: 'flex',

        alignItems: 'center',

        gap: '8px',
    },

    content: {
        flex: 1,

        overflowY: 'auto',

        padding: '20px',
    },

    keywordList: {
        display: 'flex',

        flexDirection: 'column',

        gap: '10px',
    },

    keywordItem: {
        display: 'flex',

        justifyContent: 'space-between',

        alignItems: 'center',

        padding: '15px',

        backgroundColor: '#111214',

        borderRadius: '8px',
    },

    keywordText: {
        display: 'flex',

        alignItems: 'center',

        gap: '10px',

        flex: 1,
    },

    removeBtn: {
        backgroundColor: '#f23f42',

        color: '#fff',

        border: 'none',

        padding: '8px 12px',

        borderRadius: '4px',

        cursor: 'pointer',

        fontSize: '14px',
    },

    loading: {
        textAlign: 'center',

        padding: '40px',

        color: '#888',
    },

    empty: {
        textAlign: 'center',

        padding: '60px 20px',

        color: '#888',
    },

    footer: {
        padding: '15px 20px',

        borderTop: '1px solid #333',
    },

    hint: {
        fontSize: '13px',

        color: '#888',

        textAlign: 'center',
    },
};

KeywordMutesPanel.propTypes = {
    fetchWithAuth: PropTypes.func,

    apiBaseUrl: PropTypes.string,

    onClose: PropTypes.func,
};

export default KeywordMutesPanel;
