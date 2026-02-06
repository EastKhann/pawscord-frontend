import React, { useState, useEffect } from 'react';
import {
    FaStar, FaTimes, FaPlus, FaEdit, FaTrash, FaGripVertical,
    FaGamepad, FaTrophy, FaPalette, FaLink, FaMusic, FaImage,
    FaVideo, FaCode, FaSave, FaArrowUp, FaArrowDown, FaEye,
    FaCheck, FaExternalLinkAlt
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './ProfileShowcasePanel.css';

const ProfileShowcasePanel = ({ userId, onClose, onUpdate, fetchWithAuth, apiBaseUrl }) => {
    const [showcases, setShowcases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        type: 'game',
        title: '',
        description: '',
        image_url: '',
        link_url: ''
    });
    const [dragging, setDragging] = useState(null);

    const showcaseTypes = [
        { key: 'game', label: 'Oyun', icon: <FaGamepad />, color: '#9c27b0' },
        { key: 'achievement', label: 'Başarı', icon: <FaTrophy />, color: '#ffc107' },
        { key: 'art', label: 'Sanat', icon: <FaPalette />, color: '#e91e63' },
        { key: 'music', label: 'Müzik', icon: <FaMusic />, color: '#00bcd4' },
        { key: 'video', label: 'Video', icon: <FaVideo />, color: '#f44336' },
        { key: 'code', label: 'Proje', icon: <FaCode />, color: '#4caf50' },
        { key: 'link', label: 'Link', icon: <FaLink />, color: '#2196f3' }
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
            console.error('Error fetching showcases:', error);
            setShowcases([]);
        }
        setLoading(false);
    };

    const handleAdd = async () => {
        if (!formData.title.trim()) {
            toast.error('Başlık gerekli');
            return;
        }

        const newItem = {
            id: Date.now(),
            ...formData,
            order: showcases.length
        };

        try {
            await fetchWithAuth(`${apiBaseUrl}/users/${userId}/showcase/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newItem)
            });
        } catch (error) { console.error('Add showcase error:', error); }

        setShowcases([...showcases, newItem]);
        resetForm();
        toast.success('Vitrin öğesi eklendi');
    };

    const handleEdit = async () => {
        if (!formData.title.trim() || !editingItem) return;

        try {
            await fetch(`/api/users/${userId}/showcase/${editingItem.id}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        } catch (error) { console.error('Edit showcase error:', error); }

        setShowcases(showcases.map(item =>
            item.id === editingItem.id ? { ...item, ...formData } : item
        ));
        resetForm();
        toast.success('Vitrin öğesi güncellendi');
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bu öğeyi silmek istediğinizden emin misiniz?')) return;

        try {
            await fetch(`/api/users/${userId}/showcase/${id}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (error) { console.error('Delete showcase error:', error); }

        setShowcases(showcases.filter(item => item.id !== id));
        toast.success('Vitrin öğesi silindi');
    };

    const handleReorder = async (id, direction) => {
        const index = showcases.findIndex(s => s.id === id);
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === showcases.length - 1)) return;

        const newShowcases = [...showcases];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        [newShowcases[index], newShowcases[swapIndex]] = [newShowcases[swapIndex], newShowcases[index]];

        newShowcases.forEach((item, i) => item.order = i);
        setShowcases(newShowcases);

        try {
            await fetch(`/api/users/${userId}/showcase/reorder/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ order: newShowcases.map(s => s.id) })
            });
        } catch (error) { console.error('Reorder showcase error:', error); }
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
            link_url: item.link_url || ''
        });
        setShowAddModal(true);
    };

    const getTypeInfo = (type) => {
        return showcaseTypes.find(t => t.key === type) || showcaseTypes[0];
    };

    return (
        <div className="showcase-overlay" onClick={(e) => e.target.className === 'showcase-overlay' && onClose()}>
            <div className="showcase-panel">
                <div className="panel-header">
                    <h2><FaStar /> Profil Vitrini</h2>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                <div className="panel-info">
                    <FaEye />
                    <p>Profilinizde gösterilecek en fazla 6 öğe seçebilirsiniz</p>
                </div>

                {/* Showcase Items */}
                <div className="showcase-list">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : showcases.length === 0 ? (
                        <div className="empty-state">
                            <FaStar />
                            <p>Henüz vitrin öğesi yok</p>
                            <button onClick={() => setShowAddModal(true)}>
                                <FaPlus /> İlk Öğeyi Ekle
                            </button>
                        </div>
                    ) : (
                        showcases.map((item, index) => {
                            const typeInfo = getTypeInfo(item.type);
                            return (
                                <div key={item.id} className="showcase-item">
                                    <div className="item-drag">
                                        <button
                                            onClick={() => handleReorder(item.id, 'up')}
                                            disabled={index === 0}
                                        >
                                            <FaArrowUp />
                                        </button>
                                        <button
                                            onClick={() => handleReorder(item.id, 'down')}
                                            disabled={index === showcases.length - 1}
                                        >
                                            <FaArrowDown />
                                        </button>
                                    </div>
                                    <div className="item-icon" style={{ background: typeInfo.color }}>
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
                                            <a href={item.link_url} target="_blank" rel="noopener noreferrer">
                                                <FaExternalLinkAlt /> Linke Git
                                            </a>
                                        )}
                                    </div>
                                    <div className="item-actions">
                                        <button onClick={() => openEditModal(item)}>
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(item.id)}>
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
                        <button className="add-btn" onClick={() => setShowAddModal(true)}>
                            <FaPlus /> Yeni Öğe Ekle
                        </button>
                        <span className="remaining">{6 - showcases.length} slot kaldı</span>
                    </div>
                )}

                {/* Add/Edit Modal */}
                {showAddModal && (
                    <div className="modal-overlay" onClick={() => resetForm()}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3>{editingItem ? 'Öğeyi Düzenle' : 'Yeni Vitrin Öğesi'}</h3>

                            <div className="form-group">
                                <label>Tür</label>
                                <div className="type-selector">
                                    {showcaseTypes.map(type => (
                                        <button
                                            key={type.key}
                                            className={`type-btn ${formData.type === type.key ? 'selected' : ''}`}
                                            style={{ '--color': type.color }}
                                            onClick={() => setFormData({ ...formData, type: type.key })}
                                        >
                                            {type.icon}
                                            <span>{type.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Başlık *</label>
                                <input
                                    type="text"
                                    placeholder="Örn: Valorant"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Açıklama</label>
                                <input
                                    type="text"
                                    placeholder="Örn: Diamond 3 Rank"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Görsel URL</label>
                                <input
                                    type="text"
                                    placeholder="https://..."
                                    value={formData.image_url}
                                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Link URL</label>
                                <input
                                    type="text"
                                    placeholder="https://..."
                                    value={formData.link_url}
                                    onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                                />
                            </div>

                            <div className="modal-actions">
                                <button className="cancel-btn" onClick={resetForm}>İptal</button>
                                <button className="save-btn" onClick={editingItem ? handleEdit : handleAdd}>
                                    <FaSave /> {editingItem ? 'Güncelle' : 'Ekle'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileShowcasePanel;
