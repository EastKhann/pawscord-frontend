/* eslint-disable react-hooks/rules-of-hooks */
// frontend/src/components/MessageTemplatesPanel.js

import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { FaTimes, FaFileAlt, FaPlus, FaTrash, FaCopy } from 'react-icons/fa';

import toast from '../../utils/toast';

import { useTranslation } from 'react-i18next';

import logger from '../../utils/logger';

/**





 *  Message Templates Panel





 * Hazır message şablonları





 */

const MessageTemplatesPanel = ({ fetchWithAuth, apiBaseUrl, onSelectTemplate, onClose }) => {
    const { t } = useTranslation();

    const [templates, setTemplates] = useState([]);

    const [newTemplate, setNewTemplate] = useState({ name: '', content: '' });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTemplates();
    }, []);

    const loadTemplates = async () => {
        try {
            setLoading(true);

            const response = await fetchWithAuth(`${apiBaseUrl}/templates/`);

            if (response.ok) {
                const data = await response.json();

                setTemplates(data);
            }
        } catch (error) {
            logger.error('Template loading error:', error);
        } finally {
            setLoading(false);
        }
    };

    const createTemplate = async () => {
        if (!newTemplate.name.trim() || !newTemplate.content.trim()) {
            toast.error(t('ui.name_ve_icerik_gerekli'));

            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/templates/`, {
                method: 'POST',

                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify(newTemplate),
            });

            if (response.ok) {
                toast.success(t('ui.sablon_created'));

                setNewTemplate({ name: '', content: '' });

                loadTemplates();
            } else {
                toast.error(t('ui.sablon_olusturulamadi'));
            }
        } catch (error) {
            logger.error(t('ui.sablon_olusturma_hatasi'), error);

            toast.error(t('common.error'));
        }
    };

    const deleteTemplate = async (templateId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/templates/${templateId}/`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success(t('ui.sablon_deleted'));

                loadTemplates();
            } else {
                toast.error(t('messageTemplates.deleteFailed'));
            }
        } catch (error) {
            logger.error(t('ui.sablon_silme_hatasi'), error);

            toast.error(t('common.error'));
        }
    };

    const useTemplate = (template) => {
        if (onSelectTemplate) {
            onSelectTemplate(template.content);

            toast.success(t('messageTemplates.applied'));

            onClose();
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
                        <FaFileAlt className="icon-primary" />

                        <h2 className="m-0">Mesaj Şablonları</h2>
                    </div>

                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.createSection}>
                    <input
                        type="text"
                        value={newTemplate.name}
                        onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                        placeholder={t('ui.sablon_adi_orn_toplanti_daveti')}
                        style={styles.input}
                        aria-label="Name"
                    />

                    <textarea
                        value={newTemplate.content}
                        onChange={(e) =>
                            setNewTemplate({ ...newTemplate, content: e.target.value })
                        }
                        placeholder={t('ui.sablon_icerigi_3')}
                        style={styles.textarea}
                        rows={3}
                    />

                    <button
                        aria-label="create Template"
                        onClick={createTemplate}
                        style={styles.createBtn}
                    >
                        <FaPlus /> Şablon Oluştur
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>{t('common.loading')}</div>
                    ) : templates.length === 0 ? (
                        <div style={styles.empty}>
                            <FaFileAlt className="icon-lg-mb10" />

                            <p>Henüz şablon yok</p>

                            <p className="text-gray-12">
                                Save frequently used messages as templates
                            </p>
                        </div>
                    ) : (
                        templates.map((template) => (
                            <div key={template.id} style={styles.templateCard}>
                                <div style={styles.templateIcon}>
                                    <FaFileAlt className="icon-primary" />
                                </div>

                                <div style={styles.templateContent}>
                                    <div style={styles.templateName}>{template.name}</div>

                                    <div style={styles.templatePreview}>
                                        {template.content.substring(0, 100)}

                                        {template.content.length > 100 && '...'}
                                    </div>

                                    <div style={styles.templateMeta}>
                                        {template.use_count || 0} kez kullanld
                                    </div>
                                </div>

                                <div style={styles.templateActions}>
                                    <button
                                        aria-label="Action button"
                                        onClick={() => useTemplate(template)}
                                        style={styles.useBtn}
                                        title={t('ui.sablonu_kullan')}
                                    >
                                        <FaCopy /> Kullan
                                    </button>

                                    <button
                                        aria-label="Action button"
                                        onClick={() => deleteTemplate(template.id)}
                                        style={styles.deleteBtn}
                                        title={t('ui.sablonu_delete')}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))
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

        maxWidth: '700px',

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

    createSection: {
        padding: '20px',

        borderBottom: '1px solid #333',
    },

    input: {
        width: '100%',

        padding: '10px',

        backgroundColor: '#111214',

        border: '1px solid #444',

        borderRadius: '4px',

        color: '#fff',

        fontSize: '14px',

        marginBottom: '10px',
    },

    textarea: {
        width: '100%',

        padding: '12px',

        backgroundColor: '#111214',

        border: '1px solid #444',

        borderRadius: '4px',

        color: '#fff',

        fontSize: '14px',

        resize: 'vertical',

        marginBottom: '10px',
    },

    createBtn: {
        width: '100%',

        backgroundColor: '#5865f2',

        color: '#fff',

        border: 'none',

        padding: '12px',

        borderRadius: '4px',

        cursor: 'pointer',

        fontSize: '14px',

        fontWeight: '600',

        display: 'flex',

        alignItems: 'center',

        justifyContent: 'center',

        gap: '8px',
    },

    content: {
        flex: 1,

        overflowY: 'auto',

        padding: '20px',
    },

    templateCard: {
        display: 'flex',

        gap: '15px',

        padding: '15px',

        backgroundColor: '#111214',

        borderRadius: '8px',

        marginBottom: '10px',
    },

    templateIcon: {
        width: '40px',

        height: '40px',

        borderRadius: '50%',

        backgroundColor: '#5865f21a',

        display: 'flex',

        alignItems: 'center',

        justifyContent: 'center',

        fontSize: '18px',

        flexShrink: 0,
    },

    templateContent: {
        flex: 1,
    },

    templateName: {
        fontWeight: '600',

        fontSize: '16px',

        marginBottom: '6px',

        color: '#dbdee1',
    },

    templatePreview: {
        fontSize: '13px',

        color: '#888',

        lineHeight: '1.4',

        marginBottom: '6px',
    },

    templateMeta: {
        fontSize: '12px',

        color: '#666',
    },

    templateActions: {
        display: 'flex',

        flexDirection: 'column',

        gap: '8px',
    },

    useBtn: {
        backgroundColor: '#23a559',

        color: '#fff',

        border: 'none',

        padding: '8px 12px',

        borderRadius: '4px',

        cursor: 'pointer',

        fontSize: '13px',

        fontWeight: '500',

        display: 'flex',

        alignItems: 'center',

        gap: '6px',

        whiteSpace: 'nowrap',
    },

    deleteBtn: {
        backgroundColor: '#f23f42',

        color: '#fff',

        border: 'none',

        padding: '8px 12px',

        borderRadius: '4px',

        cursor: 'pointer',

        fontSize: '13px',
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
};

MessageTemplatesPanel.propTypes = {
    fetchWithAuth: PropTypes.func,

    apiBaseUrl: PropTypes.string,

    onSelectTemplate: PropTypes.func,

    onClose: PropTypes.func,
};

export default MessageTemplatesPanel;
