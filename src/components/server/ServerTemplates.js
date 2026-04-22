/* eslint-disable react-hooks/rules-of-hooks */
import { getToken } from '../../utils/tokenStorage';
// frontend/src/components/ServerTemplates.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    FaGamepad,
    FaGraduationCap,
    FaUsers,
    FaMusic,
    FaCode,
    FaRocket,
    FaCheck,
    FaStar,
} from 'react-icons/fa';
import toast from '../../utils/toast';
import './ServerTemplates.css';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
import { API_BASE_URL } from '../../utils/apiEndpoints';

const ServerTemplates = ({ onSelectTemplate, onClose }) => {
    const { t } = useTranslation();
    const [templates, setTemplates] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [previewTemplate, setPreviewTemplate] = useState(null);

    useEffect(() => {
        fetchTemplates();
        fetchCategories();
    }, []);

    const fetchTemplates = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/templates/`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTemplates(data.templates || []);
            }
        } catch (error) {
            toast.error(t('serverTemplate.loadFailed'));
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/templates/categories/`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCategories(data.categories || []);
            }
        } catch (error) {
            logger.error('Failed to fetch categories:', error);
        }
    };

    const getTemplateDetails = async (templateId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/templates/${templateId}/`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPreviewTemplate(data.template);
            }
        } catch (error) {
            toast.error(t('serverTemplate.detailsFailed'));
        }
    };

    const useTemplate = async (templateId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/templates/${templateId}/create/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(t('serverTemplate.created'));
                if (onSelectTemplate) {
                    onSelectTemplate(data.server);
                }
                onClose();
            } else {
                toast.error(t('serverTemplate.createFailed'));
            }
        } catch (error) {
            toast.error(t('common.connectionError'));
        }
    };

    const getCategoryIcon = (category) => {
        const icons = {
            gaming: <FaGamepad />,
            education: <FaGraduationCap />,
            community: <FaUsers />,
            music: <FaMusic />,
            tech: <FaCode />,
            other: <FaRocket />,
        };
        return icons[category] || <FaUsers />;
    };

    const filteredTemplates =
        selectedCategory === 'all'
            ? templates
            : templates.filter((t) => t.category === selectedCategory);

    return (
        <div
            className="templates-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="templates-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="templates-header">
                    <h2>{t('serverTemplates.title', 'Server Templates')}</h2>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="category-filters">
                    <button
                        aria-label={t('serverTemplates.allCategories', 'All categories')}
                        className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('all')}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            aria-label={cat.name}
                            key={cat.id}
                            className={`category-btn ${selectedCategory === cat.slug ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat.slug)}
                        >
                            {getCategoryIcon(cat.slug)}
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>{t('common.loading')}</p>
                    </div>
                ) : (
                    <div className="templates-grid">
                        {filteredTemplates.map((template) => (
                            <div key={template.id} className="template-card">
                                <div className="template-icon">
                                    {getCategoryIcon(template.category)}
                                </div>
                                <div className="template-info">
                                    <h3>{template.name}</h3>
                                    <p>{template.description}</p>
                                    <div className="template-stats">
                                        <span className="stat">
                                            📝 {template.channels_count || 0} kanal
                                        </span>
                                        <span className="stat">
                                            👥 {template.roles_count || 0} rol
                                        </span>
                                        {template.is_featured && (
                                            <span className="featured-badge">
                                                <FaStar /> Featured
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="template-actions">
                                    <button
                                        aria-label={t('serverTemplates.preview', 'Preview template')}
                                        className="btn-preview"
                                        onClick={() => getTemplateDetails(template.id)}
                                    >
                                        Preview
                                    </button>
                                    <button
                                        aria-label={t('serverTemplates.useTemplate', 'Use template')}
                                        className="btn-use"
                                        onClick={() => useTemplate(template.id)}
                                    >
                                        <FaCheck /> Kullan
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {previewTemplate && (
                    <div
                        className="preview-modal"
                        role="button"
                        tabIndex={0}
                        onClick={() => setPreviewTemplate(null)}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        <div
                            className="preview-content"
                            role="button"
                            tabIndex={0}
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                            }
                        >
                            <div className="preview-header">
                                <h3>{previewTemplate.name}</h3>
                                <button
                                    aria-label={t('common.close', 'Close')}
                                    onClick={() => setPreviewTemplate(null)}
                                >
                                    ×
                                </button>
                            </div>
                            <div className="preview-body">
                                <p>{previewTemplate.description}</p>

                                {previewTemplate.channels && (
                                    <div className="preview-section">
                                        <h4>Kanallar ({previewTemplate.channels.length})</h4>
                                        <div className="channel-list">
                                            {previewTemplate.channels.map((ch, i) => (
                                                <div key={`item-${i}`} className="channel-item">
                                                    {ch.type === 'text' ? '💬' : '🔊'} {ch.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {previewTemplate.roles && (
                                    <div className="preview-section">
                                        <h4>Roller ({previewTemplate.roles.length})</h4>
                                        <div className="role-list">
                                            {previewTemplate.roles.map((role, i) => (
                                                <div
                                                    key={`item-${i}`}
                                                    className="role-item"
                                                    style={{ borderLeftColor: role.color }}
                                                >
                                                    {role.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="preview-actions">
                                <button
                                    aria-label={t('serverTemplates.useThis', 'Use This Template')}
                                    className="btn-use-large"
                                    onClick={() => {
                                        useTemplate(previewTemplate.id);
                                        setPreviewTemplate(null);
                                    }}
                                >
                                    <FaCheck /> {t('serverTemplates.useThis', 'Use This Template')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

ServerTemplates.propTypes = {
    onSelectTemplate: PropTypes.func,
    onClose: PropTypes.func,
};
export default ServerTemplates;
