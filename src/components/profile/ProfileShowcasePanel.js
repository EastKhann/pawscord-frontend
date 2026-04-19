/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import {
    FaStar,
    FaTimes,
    FaPlus,
    FaEdit,
    FaTrash,
    FaGripVertical,
    FaGamepad,
    FaTrophy,
    FaPalette,
    FaLink,
    FaMusic,
    FaImage,
    FaVideo,
    FaCode,
    FaSave,
    FaArrowUp,
    FaArrowDown,
    FaEye,
    FaCheck,
    FaExternalLinkAlt,
} from 'react-icons/fa';
const _s = (o) => o;
import { toast } from 'react-toastify';
import './ProfileShowcasePanel.css';
import confirmDialog from '../../utils/confirmDialog';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
import { API_BASE_URL } from '../../utils/apiEndpoints';
const ProfileShowcasePanel = ({ userId, onClose, onUpdate, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const [showcases, setShowcases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        type: 'game',
        title: '',
        description: '',
        image_url: '',
        link_url: '',
    });
    const [dragging, setDragging] = useState(null);

    const handleOverlayClick = useCallback(
        (e) => e.target.className === 'showcase-overlay' && onClose(),
        [onClose]
    );
    const handleOpenAddModal = useCallback(() => setShowAddModal(true), []);
    const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
    const handleFormInput = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const showcaseTypes = [
        { key: 'game', label: t('showcase.game'), icon: <FaGamepad />, color: '#9c27b0' },
        { key: 'achievement', label: t('ui.basari'), icon: <FaTrophy />, color: '#ffc107' },
        { key: 'art', label: t('showcase.art'), icon: <FaPalette />, color: '#e91e63' },
        { key: 'music', label: t('ui.muzik'), icon: <FaMusic />, color: '#00bcd4' },
        { key: 'video', label: t('showcase.video'), icon: <FaVideo />, color: '#f44336' },
        { key: 'code', label: t('showcase.project'), icon: <FaCode />, color: '#4caf50' },
        { key: 'link', label: t('showcase.link'), icon: <FaLink />, color: '#2196f3' },
    ];

    useEffect(() => {
        fetchShowcases();
    }, [userId]);

    const fetchShowcases = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/users/${userId}/showcase/`);

            if (response.ok) {
                const data = await response.json();
                setShowcases(data.items || []);
            } else {
                // Set empty state on API error
                setShowcases([]);
            }
        } catch (error) {
            logger.error('Error fetching showcases:', error);
            setShowcases([]);
        }
        setLoading(false);
    };

    const handleAdd = async () => {
        if (!formData.title.trim()) {
            toast.error(t('showcase.titleRequired'));
            return;
        }

        const newItem = {
            id: Date.now(),
            ...formData,
            order: showcases.length,
        };

        try {
            await fetchWithAuth(`${apiBaseUrl}/users/${userId}/showcase/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });
        } catch (error) {
            logger.error('Add showcase error:', error);
        }

        setShowcases([...showcases, newItem]);
        resetForm();
        toast.success(t('ui.vitrin_ogesi_added'));
    };

    const handleEdit = async () => {
        if (!formData.title.trim() || !editingItem) return;

        try {
            await fetch(`${API_BASE_URL}/users/${userId}/showcase/${editingItem.id}/`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        } catch (error) {
            logger.error('Edit showcase error:', error);
        }

        setShowcases(
            showcases.map((item) => (item.id === editingItem.id ? { ...item, ...formData } : item))
        );
        resetForm();
        toast.success(t('ui.vitrin_ogesi_updated'));
    };

    const handleDelete = async (id) => {
        if (!(await confirmDialog(t('showcase.confirmDelete')))) return;

        try {
            await fetch(`${API_BASE_URL}/users/${userId}/showcase/${id}/`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            logger.error('Delete showcase error:', error);
        }

        setShowcases(showcases.filter((item) => item.id !== id));
        toast.success(t('ui.vitrin_ogesi_deleted'));
    };

    const handleReorder = async (id, direction) => {
        const index = showcases.findIndex((s) => s.id === id);
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === showcases.length - 1)
        )
            return;

        const newShowcases = [...showcases];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        [newShowcases[index], newShowcases[swapIndex]] = [
            newShowcases[swapIndex],
            newShowcases[index],
        ];

        newShowcases.forEach((item, i) => (item.order = i));
        setShowcases(newShowcases);

        try {
            await fetch(`${API_BASE_URL}/users/${userId}/showcase/reorder/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ order: newShowcases.map((s) => s.id) }),
            });
        } catch (error) {
            logger.error('Reorder showcase error:', error);
        }
    };

    const resetForm = () => {
        setFormData({ type: 'game', title: '', description: '', image_url: '', link_url: '' });
        setShowAddModal(false);
        setEditingItem(null);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setFormData({
            type: item.type,
            title: item.title,
            description: item.description || '',
            image_url: item.image_url || '',
            link_url: item.link_url || '',
        });
        setShowAddModal(true);
    };

    const getTypeInfo = (type) => {
        return showcaseTypes.find((t) => t.key === type) || showcaseTypes[0];
    };

    return (
        <div
            className="showcase-overlay"
            role="button"
            tabIndex={0}
            onClick={handleOverlayClick}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div className="showcase-panel">
                <div className="panel-header">
                    <h2>
                        <FaStar /> {t('showcase.title')}
                    </h2>
                    <button aria-label="Close" className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="panel-info">
                    <FaEye />
                    <p>{t('showcase.maxItems')}</p>
                </div>

                {/* Showcase Items */}
                <div className="showcase-list">
                    {loading ? (
                        <div className="loading">{t('common.loading')}</div>
                    ) : showcases.length === 0 ? (
                        <div className="empty-state">
                            <FaStar />
                            <p>{t('showcase.empty')}</p>
                            <button aria-label="handle Open Add Modal" onClick={handleOpenAddModal}>
                                <FaPlus /> {t('showcase.addFirst')}
                            </button>
                        </div>
                    ) : (
                        showcases.map((item, index) => {
                            const typeInfo = getTypeInfo(item.type);
                            return (
                                <div key={item.id} className="showcase-item">
                                    <div className="item-drag">
                                        <button
                                            aria-label="Action button"
                                            onClick={() => handleReorder(item.id, 'up')}
                                            disabled={index === 0}
                                        >
                                            <FaArrowUp />
                                        </button>
                                        <button
                                            aria-label="Action button"
                                            onClick={() => handleReorder(item.id, 'down')}
                                            disabled={index === showcases.length - 1}
                                        >
                                            <FaArrowDown />
                                        </button>
                                    </div>
                                    <div
                                        className="item-icon"
                                        style={_s({ background: typeInfo.color })}
                                    >
                                        {typeInfo.icon}
                                    </div>
                                    {item.image_url && (
                                        <div className="item-image">
                                            <img src={item.image_url} alt={item.title} />
                                        </div>
                                    )}
                                    <div className="item-info">
                                        <span className="item-type">{typeInfo.label}</span>
                                        <h4>{item.title}</h4>
                                        {item.description && <p>{item.description}</p>}
                                        {item.link_url && (
                                            <a
                                                href={item.link_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <FaExternalLinkAlt /> {t('showcase.goToLink')}
                                            </a>
                                        )}
                                    </div>
                                    <div className="item-actions">
                                        <button
                                            aria-label="Edit"
                                            onClick={() => openEditModal(item)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            aria-label="Delete"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Add Button */}
                {showcases.length < 6 && showcases.length > 0 && (
                    <div className="add-section">
                        <button
                            aria-label="handle Open Add Modal"
                            className="add-btn"
                            onClick={handleOpenAddModal}
                        >
                            <FaPlus /> {t('showcase.addNew')}
                        </button>
                        <span className="remaining">
                            {t('showcase.slotsRemaining', { count: 6 - showcases.length })}
                        </span>
                    </div>
                )}

                {/* Add/Edit Modal */}
                {showAddModal && (
                    <div
                        className="modal-overlay"
                        role="button"
                        tabIndex={0}
                        onClick={resetForm}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        <div
                            className="modal-content"
                            role="button"
                            tabIndex={0}
                            onClick={handleStopPropagation}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                            }
                        >
                            <h3>{editingItem ? t('ui.ogeyi_edit') : t('showcase.newItem')}</h3>

                            <div className="form-group">
                                <label>{t('showcase.type')}</label>
                                <div className="type-selector">
                                    {showcaseTypes.map((type) => (
                                        <button
                                            aria-label="Action button"
                                            key={type.key}
                                            className={`type-btn ${formData.type === type.key ? 'selected' : ''}`}
                                            style={_s({ '--color': type.color })}
                                            onClick={() =>
                                                setFormData({ ...formData, type: type.key })
                                            }
                                        >
                                            {type.icon}
                                            <span>{type.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>{t('showcase.titleLabel')} *</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder={t('ui.orn_valorant')}
                                    value={formData.title}
                                    onChange={handleFormInput}
                                    aria-label={t('ui.orn_valorant_2')}
                                />
                            </div>

                            <div className="form-group">
                                <label>{t('showcase.description')}</label>
                                <input
                                    type="text"
                                    name="description"
                                    placeholder={t('ui.orn_diamond_3_rank')}
                                    value={formData.description}
                                    onChange={handleFormInput}
                                    aria-label={t('ui.orn_diamond_3_rank_2')}
                                />
                            </div>

                            <div className="form-group">
                                <label>{t('showcase.imageUrl')}</label>
                                <input
                                    type="text"
                                    name="image_url"
                                    placeholder="https://..."
                                    value={formData.image_url}
                                    onChange={handleFormInput}
                                    aria-label="https://..."
                                />
                            </div>

                            <div className="form-group">
                                <label>Bağlantı URL'si</label>
                                <input
                                    type="text"
                                    name="link_url"
                                    placeholder="https://..."
                                    value={formData.link_url}
                                    onChange={handleFormInput}
                                    aria-label="https://..."
                                />
                            </div>

                            <div className="modal-actions">
                                <button
                                    aria-label="reset Form"
                                    className="cancel-btn"
                                    onClick={resetForm}
                                >
                                    {t('common.cancel')}
                                </button>
                                <button
                                    aria-label="editing Item handle Edit handle Add"
                                    className="save-btn"
                                    onClick={editingItem ? handleEdit : handleAdd}
                                >
                                    <FaSave /> {editingItem ? t('common.update') : t('common.add')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

ProfileShowcasePanel.propTypes = {
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClose: PropTypes.func,
    onUpdate: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default memo(ProfileShowcasePanel);
