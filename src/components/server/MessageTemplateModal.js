/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaPlus, FaTrash, FaCheck, FaStickyNote } from 'react-icons/fa';
import useModalA11y from '../../hooks/useModalA11y';
import confirmDialog from '../../utils/confirmDialog';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const S = {
    font: {
        fontSize: '12px',
        opacity: 0.7,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '200px',
    },
    flex: { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' },
};

const MessageTemplateModal = ({ onClose, onSelect, fetchWithAuth, apiBaseUrl, isAdmin }) => {
    const { t } = useTranslation();
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [newTemplate, setNewTemplate] = useState({ name: '', content: '', is_global: false });
    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        isOpen: true,
        label: 'Message Templates',
    });

    useEffect(() => {
        loadTemplates();
    }, []);

    const loadTemplates = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/templates/`);
            if (res.ok) {
                const data = await res.json();
                setTemplates(data || []);
            }
        } catch (e) {
            logger.error(e);
        }
        setLoading(false);
    };

    const handleCreate = async () => {
        if (!newTemplate.name || !newTemplate.content) return;
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/templates/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTemplate),
            });
            if (res.ok) {
                setNewTemplate({ name: '', content: '', is_global: false });
                setCreating(false);
                loadTemplates();
            }
        } catch (e) {
            logger.error(e);
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (!(await confirmDialog(t('msgTemplate.deleteConfirm', 'Are you sure you want to delete this template?')))) return;
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/templates/${id}/`, { method: 'DELETE' });
            if (res.ok) {
                setTemplates((prev) => prev.filter((t) => t.id !== id));
            }
        } catch (e) {
            logger.error(e);
        }
    };

    return (
        <div style={overlayStyle} {...overlayProps}>
            <div style={modalStyle} {...dialogProps}>
                {/* HEAD */}
                <div style={headerStyle}>
                    <h3 className="flex-align-m0">
                        <FaStickyNote /> {t('msgTemplate.templates', 'Ready Templates')}
                    </h3>
                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={closeButtonStyle}>
                        <FaTimes />
                    </button>
                </div>

                {/* CONTENT */}
                <div style={contentStyle}>
                    {creating ? (
                        <div style={formStyle}>
                            <input
                                placeholder={t('ui.sablon_adi')}
                                value={newTemplate.name}
                                onChange={(e) =>
                                    setNewTemplate({ ...newTemplate, name: e.target.value })
                                }
                                style={inputStyle}
                            />
                            <textarea
                                placeholder={t('ui.sablon_icerigi')}
                                value={newTemplate.content}
                                onChange={(e) =>
                                    setNewTemplate({ ...newTemplate, content: e.target.value })
                                }
                                style={textareaStyle}
                            />
                            {isAdmin && (
                                <label style={S.flex}>
                                    <input
                                        type="checkbox"
                                        checked={newTemplate.is_global}
                                        onChange={(e) =>
                                            setNewTemplate({
                                                ...newTemplate,
                                                is_global: e.target.checked,
                                            })
                                        }
                                    />
                                    {t('msgTemplate.global', 'Public (Global)')}
                                </label>
                            )}
                            <div className="flex-10-mt10">
                                <button
                                    aria-label={t('msgTemplateModal.createBtn', 'Create template')}
                                    onClick={handleCreate}
                                    style={saveButtonStyle}
                                >
                                    <FaCheck /> Kaydet
                                </button>
                                <button
                                    aria-label={t('common.cancel', 'Cancel')}
                                    style={cancelButtonStyle}
                                >
                                    {t('common.cancel')}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <button
                                aria-label={t('common.add')}
                                onClick={() => setCreating(true)}
                                style={addButtonStyle}
                            >
                                <FaPlus /> {t('msgTemplate.createNew', '+ Create New Template')}
                            </button>
                            <div style={listStyle}>
                                {loading ? (
                                    <p>{t('common.loading')}</p>
                                ) : templates.length === 0 ? (
                                    <p className="opacity-5">{t('msgTemplate.noTemplates', 'No templates yet.')}</p>
                                ) : (
                                    templates.map((t) => (
                                        <div
                                            key={t.id}
                                            style={itemStyle}
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => onSelect(t.content)}
                                            onKeyDown={(e) =>
                                                (e.key === 'Enter' || e.key === ' ') &&
                                                e.currentTarget.click()
                                            }
                                        >
                                            <div>
                                                <div className="fw-bold">{t.name}</div>
                                                <div style={S.font}>{t.content}</div>
                                            </div>
                                            <div className="flex-gap-10">
                                                {t.is_global && (
                                                    <span style={badgeStyle}>Global</span>
                                                )}
                                                <button
                                                    aria-label={t('common.delete')}
                                                    onClick={(e) => handleDelete(t.id, e)}
                                                    style={deleteButtonStyle}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- STYLES ---
const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)',
};
const modalStyle = {
    backgroundColor: '#17191c',
    width: '400px',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '80vh',
};
const headerStyle = {
    padding: '16px',
    backgroundColor: '#111214',
    borderBottom: '1px solid #16203a',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};
const closeButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#B5BAC1',
    cursor: 'pointer',
    fontSize: '16px',
};
const contentStyle = { padding: '16px', overflowY: 'auto' };
const addButtonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#5865F2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    marginBottom: '15px',
};
const listStyle = { display: 'flex', flexDirection: 'column', gap: '8px' };
const itemStyle = {
    backgroundColor: '#111214',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: '0.2s',
};
const badgeStyle = {
    fontSize: '10px',
    backgroundColor: '#f0b232',
    color: 'black',
    padding: '2px 6px',
    borderRadius: '10px',
    fontWeight: 'bold',
};
const deleteButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#DA373C',
    cursor: 'pointer',
};
const formStyle = { display: 'flex', flexDirection: 'column', gap: '10px' };
const inputStyle = {
    padding: '8px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#0d0e10',
    color: 'white',
};
const textareaStyle = {
    padding: '8px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#0d0e10',
    color: 'white',
    minHeight: '100px',
    resize: 'vertical',
};
const saveButtonStyle = {
    flex: 1,
    padding: '8px',
    backgroundColor: '#23A559',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};
const cancelButtonStyle = {
    flex: 1,
    padding: '8px',
    backgroundColor: '#DA373C',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

MessageTemplateModal.propTypes = {
    onClose: PropTypes.func,
    onSelect: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    isAdmin: PropTypes.bool,
};
export default MessageTemplateModal;
