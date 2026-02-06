// frontend/src/components/AnnouncementTemplatesPanel.js - Announcement Templates Management
import React, { useState, useEffect } from 'react';
import {
    FaBullhorn, FaTimes, FaPlus, FaEdit, FaTrash, FaCopy,
    FaSearch, FaCheck, FaHashtag, FaPaperPlane, FaEye,
    FaStar, FaBolt, FaCalendar, FaTags, FaImage
} from 'react-icons/fa';
import toast from '../utils/toast';
import './AnnouncementTemplatesPanel.css';

const AnnouncementTemplatesPanel = ({ serverId, apiBaseUrl, onClose }) => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [previewTemplate, setPreviewTemplate] = useState(null);
    const [channels, setChannels] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        title: '',
        content: '',
        color: '#6366f1',
        category: 'general',
        image_url: '',
        footer: '',
        is_pinned: false
    });

    const categories = [
        { id: 'general', label: 'Genel', icon: <FaBullhorn /> },
        { id: 'update', label: 'Güncelleme', icon: <FaBolt /> },
        { id: 'event', label: 'Etkinlik', icon: <FaCalendar /> },
        { id: 'important', label: 'Önemli', icon: <FaStar /> }
    ];

    const colors = [
        '#ef4444', '#f97316', '#f59e0b', '#84cc16',
        '#10b981', '#06b6d4', '#3b82f6', '#6366f1',
        '#8b5cf6', '#ec4899'
    ];

    useEffect(() => {
        fetchTemplates();
        fetchChannels();
    }, [serverId]);

    const fetchTemplates = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/announcements/${serverId}/templates/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setTemplates(data.templates || []);
            }
        } catch (error) {
            console.error('Fetch templates error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchChannels = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setChannels(data.channels?.filter(c => c.type === 'text') || []);
            }
        } catch (error) {
            console.error('Fetch channels error:', error);
        }
    };

    const saveTemplate = async () => {
        if (!formData.name.trim() || !formData.content.trim()) {
            toast.error('Ad ve içerik gerekli');
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            const endpoint = editingTemplate
                ? `${apiBaseUrl}/announcements/${serverId}/templates/${editingTemplate.id}/update/`
                : `${apiBaseUrl}/announcements/${serverId}/templates/create/`;

            const response = await fetch(endpoint, {
                method: editingTemplate ? 'PUT' : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success(editingTemplate ? '✅ Şablon güncellendi' : '✅ Şablon oluşturuldu');
                fetchTemplates();
                closeModal();
            }
        } catch (error) {
            console.error('Save template error:', error);
        }
    };

    const deleteTemplate = async (templateId) => {
        if (!window.confirm('Bu şablonu silmek istiyor musunuz?')) return;

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/announcements/${serverId}/templates/${templateId}/delete/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('🗑️ Şablon silindi');
                setTemplates(prev => prev.filter(t => t.id !== templateId));
            }
        } catch (error) {
            console.error('Delete template error:', error);
        }
    };

    const useTemplate = async (template, channelId) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/announcements/${serverId}/send/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    template_id: template.id,
                    channel_id: channelId
                })
            });

            if (response.ok) {
                toast.success('📢 Duyuru gönderildi');
            }
        } catch (error) {
            console.error('Send announcement error:', error);
        }
    };

    const duplicateTemplate = (template) => {
        setFormData({
            name: `${template.name} (Kopya)`,
            title: template.title,
            content: template.content,
            color: template.color,
            category: template.category,
            image_url: template.image_url || '',
            footer: template.footer || '',
            is_pinned: false
        });
        setEditingTemplate(null);
        setShowModal(true);
    };

    const openEditModal = (template) => {
        setFormData({
            name: template.name,
            title: template.title,
            content: template.content,
            color: template.color,
            category: template.category,
            image_url: template.image_url || '',
            footer: template.footer || '',
            is_pinned: template.is_pinned
        });
        setEditingTemplate(template);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingTemplate(null);
        setFormData({
            name: '',
            title: '',
            content: '',
            color: '#6366f1',
            category: 'general',
            image_url: '',
            footer: '',
            is_pinned: false
        });
    };

    const filteredTemplates = templates.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="announcement-templates-overlay" onClick={onClose}>
            <div className="announcement-templates-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2><FaBullhorn /> Duyuru Şablonları</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="toolbar">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Şablon ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="create-btn" onClick={() => setShowModal(true)}>
                        <FaPlus /> Yeni Şablon
                    </button>
                </div>

                <div className="panel-content">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : filteredTemplates.length === 0 ? (
                        <div className="empty-state">
                            <FaBullhorn />
                            <p>Duyuru şablonu bulunmuyor</p>
                            <span>Yeni bir şablon oluşturarak başlayın</span>
                        </div>
                    ) : (
                        <div className="templates-grid">
                            {filteredTemplates.map(template => (
                                <TemplateCard
                                    key={template.id}
                                    template={template}
                                    categories={categories}
                                    channels={channels}
                                    onEdit={() => openEditModal(template)}
                                    onDelete={() => deleteTemplate(template.id)}
                                    onDuplicate={() => duplicateTemplate(template)}
                                    onUse={useTemplate}
                                    onPreview={() => setPreviewTemplate(template)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {showModal && (
                    <TemplateModal
                        formData={formData}
                        setFormData={setFormData}
                        categories={categories}
                        colors={colors}
                        editing={!!editingTemplate}
                        onSave={saveTemplate}
                        onClose={closeModal}
                    />
                )}

                {previewTemplate && (
                    <PreviewModal
                        template={previewTemplate}
                        onClose={() => setPreviewTemplate(null)}
                    />
                )}
            </div>
        </div>
    );
};

// Template Card
const TemplateCard = ({ template, categories, channels, onEdit, onDelete, onDuplicate, onUse, onPreview }) => {
    const [showChannelSelect, setShowChannelSelect] = useState(false);
    const category = categories.find(c => c.id === template.category) || categories[0];

    return (
        <div className="template-card" style={{ borderTopColor: template.color }}>
            <div className="template-header">
                <span className="category-badge" style={{ background: `${template.color}20`, color: template.color }}>
                    {category.icon} {category.label}
                </span>
                {template.is_pinned && <FaStar className="pinned-icon" />}
            </div>

            <h4 className="template-name">{template.name}</h4>
            {template.title && <p className="template-title">{template.title}</p>}
            <p className="template-content">{template.content.substring(0, 100)}...</p>

            <div className="template-actions">
                <button className="preview-btn" onClick={onPreview} title="Önizle">
                    <FaEye />
                </button>
                <button className="edit-btn" onClick={onEdit} title="Düzenle">
                    <FaEdit />
                </button>
                <button className="duplicate-btn" onClick={onDuplicate} title="Kopyala">
                    <FaCopy />
                </button>
                <button className="delete-btn" onClick={onDelete} title="Sil">
                    <FaTrash />
                </button>
            </div>

            <div className="use-section">
                {!showChannelSelect ? (
                    <button
                        className="use-btn"
                        onClick={() => setShowChannelSelect(true)}
                    >
                        <FaPaperPlane /> Kullan
                    </button>
                ) : (
                    <div className="channel-select">
                        <select onChange={(e) => { onUse(template, e.target.value); setShowChannelSelect(false); }}>
                            <option value="">Kanal seç...</option>
                            {channels.map(ch => (
                                <option key={ch.id} value={ch.id}>#{ch.name}</option>
                            ))}
                        </select>
                        <button onClick={() => setShowChannelSelect(false)}>
                            <FaTimes />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// Template Modal
const TemplateModal = ({ formData, setFormData, categories, colors, editing, onSave, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="template-modal" onClick={e => e.stopPropagation()}>
                <h3>{editing ? 'Şablonu Düzenle' : 'Yeni Şablon Oluştur'}</h3>

                <div className="form-row">
                    <div className="form-group">
                        <label>Şablon Adı *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="örn: Haftalık Güncelleme"
                        />
                    </div>
                    <div className="form-group">
                        <label>Kategori</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        >
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label>Başlık</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Duyuru başlığı"
                    />
                </div>

                <div className="form-group">
                    <label>İçerik *</label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Duyuru içeriğini yazın... (Markdown desteklenir)"
                        rows="5"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label><FaImage /> Görsel URL</label>
                        <input
                            type="url"
                            value={formData.image_url}
                            onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                            placeholder="https://..."
                        />
                    </div>
                    <div className="form-group">
                        <label>Alt Bilgi</label>
                        <input
                            type="text"
                            value={formData.footer}
                            onChange={(e) => setFormData(prev => ({ ...prev, footer: e.target.value }))}
                            placeholder="Alt bilgi metni"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Embed Rengi</label>
                    <div className="color-picker">
                        {colors.map(color => (
                            <button
                                key={color}
                                className={`color-option ${formData.color === color ? 'selected' : ''}`}
                                style={{ background: color }}
                                onClick={() => setFormData(prev => ({ ...prev, color }))}
                            >
                                {formData.color === color && <FaCheck />}
                            </button>
                        ))}
                    </div>
                </div>

                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={formData.is_pinned}
                        onChange={(e) => setFormData(prev => ({ ...prev, is_pinned: e.target.checked }))}
                    />
                    Sık kullanılanlara ekle
                </label>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>İptal</button>
                    <button className="save-btn" onClick={onSave}>
                        {editing ? 'Güncelle' : 'Oluştur'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Preview Modal
const PreviewModal = ({ template, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="preview-modal" onClick={e => e.stopPropagation()}>
                <div className="preview-header">
                    <h3>Önizleme</h3>
                    <button onClick={onClose}><FaTimes /></button>
                </div>
                <div className="preview-content">
                    <div className="embed-preview" style={{ borderLeftColor: template.color }}>
                        {template.title && <h4 className="embed-title">{template.title}</h4>}
                        <p className="embed-description">{template.content}</p>
                        {template.image_url && (
                            <img src={template.image_url} alt="Preview" className="embed-image" />
                        )}
                        {template.footer && (
                            <div className="embed-footer">{template.footer}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementTemplatesPanel;
