import React, { useState, useEffect } from 'react';
import {
    FaThumbtack, FaTimes, FaPlus, FaEdit, FaTrash, FaFolder,
    FaFolderOpen, FaSearch, FaChevronDown, FaChevronRight,
    FaHashtag, FaUser, FaClock, FaStar, FaGripVertical,
    FaCheck, FaExclamationCircle, FaBookmark
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './PinCategoryPanel.css';
import confirmDialog from '../utils/confirmDialog';

const PinCategoryPanel = ({ channelId, channelName, onClose }) => {
    const [categories, setCategories] = useState([]);
    const [pins, setPins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryColor, setNewCategoryColor] = useState('#9c27b0');
    const [draggedPin, setDraggedPin] = useState(null);
    const token = localStorage.getItem('access_token');

    const colorOptions = [
        '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
        '#2196f3', '#00bcd4', '#009688', '#4caf50', '#8bc34a',
        '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b'
    ];

    useEffect(() => {
        fetchPinsAndCategories();
    }, [channelId]);

    const fetchPinsAndCategories = async () => {
        setLoading(true);
        try {
            const [catsRes, pinsRes] = await Promise.all([
                fetch(`/api/channels/${channelId}/pins/categories/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch(`/api/channels/${channelId}/pins/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]);

            if (catsRes.ok && pinsRes.ok) {
                setCategories((await catsRes.json()).categories || []);
                setPins((await pinsRes.json()).pins || []);
            } else {
                setCategories([]);
                setPins([]);
            }
        } catch (error) {
            console.error('Error fetching pins:', error);
            setCategories([]);
            setPins([]);
        }
        setLoading(false);
    };

    const handleCreateCategory = async () => {
        if (!newCategoryName.trim()) return;

        const newCategory = {
            id: Date.now(),
            name: newCategoryName,
            color: newCategoryColor,
            order: categories.length
        };

        try {
            await fetch(`/api/channels/${channelId}/pins/categories/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCategory)
            });
        } catch (error) { console.error('Create category error:', error); }

        setCategories([...categories, newCategory]);
        setNewCategoryName('');
        setNewCategoryColor('#9c27b0');
        setShowCreateModal(false);
        toast.success('Kategori oluşturuldu');
    };

    const handleEditCategory = async () => {
        if (!newCategoryName.trim() || !editingCategory) return;

        try {
            await fetch(`/api/channels/${channelId}/pins/categories/${editingCategory.id}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newCategoryName, color: newCategoryColor })
            });
        } catch (error) { console.error('Edit category error:', error); }

        setCategories(categories.map(c =>
            c.id === editingCategory.id
                ? { ...c, name: newCategoryName, color: newCategoryColor }
                : c
        ));
        setEditingCategory(null);
        setNewCategoryName('');
        setNewCategoryColor('#9c27b0');
        toast.success('Kategori güncellendi');
    };

    const handleDeleteCategory = async (categoryId) => {
        if (!await confirmDialog('Bu kategoriyi silmek istediğinizden emin misiniz?')) return;

        try {
            await fetch(`/api/channels/${channelId}/pins/categories/${categoryId}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (error) { console.error('Delete category error:', error); }

        setCategories(categories.filter(c => c.id !== categoryId));
        setPins(pins.map(p => p.category_id === categoryId ? { ...p, category_id: null } : p));
        toast.success('Kategori silindi');
    };

    const handleMovePin = async (pinId, newCategoryId) => {
        try {
            await fetch(`/api/channels/${channelId}/pins/${pinId}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ category_id: newCategoryId })
            });
        } catch (error) { console.error('Move pin error:', error); }

        setPins(pins.map(p => p.id === pinId ? { ...p, category_id: newCategoryId } : p));
        setDraggedPin(null);
        toast.success('Pin taşındı');
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const getPinsForCategory = (categoryId) => {
        return pins.filter(p => p.category_id === categoryId);
    };

    const getUncategorizedPins = () => {
        return pins.filter(p => !p.category_id);
    };

    const getFilteredCategories = () => {
        if (!searchQuery) return categories;
        const query = searchQuery.toLowerCase();
        return categories.filter(c =>
            c.name.toLowerCase().includes(query) ||
            getPinsForCategory(c.id).some(p => p.content.toLowerCase().includes(query))
        );
    };

    return (
        <div className="pincategory-overlay" onClick={(e) => e.target.className === 'pincategory-overlay' && onClose()}>
            <div className="pincategory-panel">
                <div className="panel-header">
                    <h2><FaThumbtack /> Pin Kategorileri</h2>
                    <span className="channel-name">#{channelName}</span>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                {/* Toolbar */}
                <div className="toolbar">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Pin veya kategori ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="create-btn" onClick={() => setShowCreateModal(true)}>
                        <FaPlus /> Kategori Ekle
                    </button>
                </div>

                {/* Stats */}
                <div className="stats-row">
                    <div className="stat">
                        <FaFolder />
                        <span>{categories.length} Kategori</span>
                    </div>
                    <div className="stat">
                        <FaThumbtack />
                        <span>{pins.length} Pin</span>
                    </div>
                    <div className="stat">
                        <FaExclamationCircle />
                        <span>{getUncategorizedPins().length} Kategorisiz</span>
                    </div>
                </div>

                {/* Categories List */}
                <div className="categories-list">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : (
                        <>
                            {getFilteredCategories().map(category => (
                                <div
                                    key={category.id}
                                    className={`category-item ${expandedCategory === category.id ? 'expanded' : ''}`}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => draggedPin && handleMovePin(draggedPin, category.id)}
                                >
                                    <div
                                        className="category-header"
                                        onClick={() => setExpandedCategory(
                                            expandedCategory === category.id ? null : category.id
                                        )}
                                    >
                                        <span className="category-icon" style={{ background: category.color }}>
                                            {expandedCategory === category.id ? <FaFolderOpen /> : <FaFolder />}
                                        </span>
                                        <span className="category-name">{category.name}</span>
                                        <span className="pin-count">{getPinsForCategory(category.id).length}</span>
                                        <div className="category-actions">
                                            <button onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingCategory(category);
                                                setNewCategoryName(category.name);
                                                setNewCategoryColor(category.color);
                                            }}>
                                                <FaEdit />
                                            </button>
                                            <button onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteCategory(category.id);
                                            }}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                        <span className="expand-icon">
                                            {expandedCategory === category.id ? <FaChevronDown /> : <FaChevronRight />}
                                        </span>
                                    </div>

                                    {expandedCategory === category.id && (
                                        <div className="pins-list">
                                            {getPinsForCategory(category.id).length === 0 ? (
                                                <div className="empty-pins">Pin yok</div>
                                            ) : (
                                                getPinsForCategory(category.id).map(pin => (
                                                    <div
                                                        key={pin.id}
                                                        className="pin-item"
                                                        draggable
                                                        onDragStart={() => setDraggedPin(pin.id)}
                                                        onDragEnd={() => setDraggedPin(null)}
                                                    >
                                                        <FaGripVertical className="drag-handle" />
                                                        <div className="pin-content">
                                                            <p>{pin.content}</p>
                                                            <div className="pin-meta">
                                                                <span><FaUser /> {pin.author.username}</span>
                                                                <span><FaClock /> {formatDate(pin.pinned_at)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Uncategorized Pins */}
                            {getUncategorizedPins().length > 0 && (
                                <div
                                    className={`category-item uncategorized ${expandedCategory === 'uncategorized' ? 'expanded' : ''}`}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => draggedPin && handleMovePin(draggedPin, null)}
                                >
                                    <div
                                        className="category-header"
                                        onClick={() => setExpandedCategory(
                                            expandedCategory === 'uncategorized' ? null : 'uncategorized'
                                        )}
                                    >
                                        <span className="category-icon" style={{ background: '#666' }}>
                                            <FaBookmark />
                                        </span>
                                        <span className="category-name">Kategorisiz</span>
                                        <span className="pin-count">{getUncategorizedPins().length}</span>
                                        <span className="expand-icon">
                                            {expandedCategory === 'uncategorized' ? <FaChevronDown /> : <FaChevronRight />}
                                        </span>
                                    </div>

                                    {expandedCategory === 'uncategorized' && (
                                        <div className="pins-list">
                                            {getUncategorizedPins().map(pin => (
                                                <div
                                                    key={pin.id}
                                                    className="pin-item"
                                                    draggable
                                                    onDragStart={() => setDraggedPin(pin.id)}
                                                    onDragEnd={() => setDraggedPin(null)}
                                                >
                                                    <FaGripVertical className="drag-handle" />
                                                    <div className="pin-content">
                                                        <p>{pin.content}</p>
                                                        <div className="pin-meta">
                                                            <span><FaUser /> {pin.author.username}</span>
                                                            <span><FaClock /> {formatDate(pin.pinned_at)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Create/Edit Modal */}
                {(showCreateModal || editingCategory) && (
                    <div className="modal-overlay" onClick={() => { setShowCreateModal(false); setEditingCategory(null); }}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3>{editingCategory ? 'Kategori Düzenle' : 'Yeni Kategori'}</h3>
                            <div className="form-group">
                                <label>Kategori Adı</label>
                                <input
                                    type="text"
                                    placeholder="Örn: Kurallar"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Renk</label>
                                <div className="color-options">
                                    {colorOptions.map(color => (
                                        <button
                                            key={color}
                                            className={`color-btn ${newCategoryColor === color ? 'selected' : ''}`}
                                            style={{ background: color }}
                                            onClick={() => setNewCategoryColor(color)}
                                        >
                                            {newCategoryColor === color && <FaCheck />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button className="cancel-btn" onClick={() => { setShowCreateModal(false); setEditingCategory(null); }}>
                                    İptal
                                </button>
                                <button className="save-btn" onClick={editingCategory ? handleEditCategory : handleCreateCategory}>
                                    {editingCategory ? 'Güncelle' : 'Oluştur'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Drag Hint */}
                {draggedPin && (
                    <div className="drag-hint">
                        <FaGripVertical /> Pini bir kategoriye sürükleyin
                    </div>
                )}
            </div>
        </div>
    );
};

export default PinCategoryPanel;
