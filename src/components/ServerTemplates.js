// frontend/src/components/ServerTemplates.js
import { useState, useEffect } from 'react';
import { FaGamepad, FaGraduationCap, FaUsers, FaMusic, FaCode, FaRocket, FaCheck, FaStar } from 'react-icons/fa';
import toast from '../utils/toast';
import './ServerTemplates.css';

const ServerTemplates = ({ onSelectTemplate, onClose }) => {
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
            const response = await fetch('/api/templates/list/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setTemplates(data.templates || []);
            }
        } catch (error) {
            toast.error('❌ Şablonlar yüklenemedi');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/templates/categories/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setCategories(data.categories || []);
            }
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const getTemplateDetails = async (templateId) => {
        try {
            const response = await fetch(`/api/templates/${templateId}/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setPreviewTemplate(data.template);
            }
        } catch (error) {
            toast.error('❌ Şablon detayları yüklenemedi');
        }
    };

    const useTemplate = async (templateId) => {
        try {
            const response = await fetch(`/api/templates/${templateId}/use/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                toast.success('✅ Sunucu oluşturuldu!');
                if (onSelectTemplate) {
                    onSelectTemplate(data.server);
                }
                onClose();
            } else {
                toast.error('❌ Sunucu oluşturulamadı');
            }
        } catch (error) {
            toast.error('❌ Bağlantı hatası');
        }
    };

    const getCategoryIcon = (category) => {
        const icons = {
            gaming: <FaGamepad />,
            education: <FaGraduationCap />,
            community: <FaUsers />,
            music: <FaMusic />,
            tech: <FaCode />,
            other: <FaRocket />
        };
        return icons[category] || <FaUsers />;
    };

    const filteredTemplates = selectedCategory === 'all' 
        ? templates 
        : templates.filter(t => t.category === selectedCategory);

    return (
        <div className="templates-overlay" onClick={onClose}>
            <div className="templates-panel" onClick={(e) => e.stopPropagation()}>
                <div className="templates-header">
                    <h2>Sunucu Şablonları</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="category-filters">
                    <button 
                        className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('all')}
                    >
                        Tümü
                    </button>
                    {categories.map(cat => (
                        <button
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
                        <p>Yükleniyor...</p>
                    </div>
                ) : (
                    <div className="templates-grid">
                        {filteredTemplates.map(template => (
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
                                                <FaStar /> Öne Çıkan
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="template-actions">
                                    <button 
                                        className="btn-preview"
                                        onClick={() => getTemplateDetails(template.id)}
                                    >
                                        Önizle
                                    </button>
                                    <button 
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
                    <div className="preview-modal" onClick={() => setPreviewTemplate(null)}>
                        <div className="preview-content" onClick={(e) => e.stopPropagation()}>
                            <div className="preview-header">
                                <h3>{previewTemplate.name}</h3>
                                <button onClick={() => setPreviewTemplate(null)}>×</button>
                            </div>
                            <div className="preview-body">
                                <p>{previewTemplate.description}</p>
                                
                                {previewTemplate.channels && (
                                    <div className="preview-section">
                                        <h4>Kanallar ({previewTemplate.channels.length})</h4>
                                        <div className="channel-list">
                                            {previewTemplate.channels.map((ch, i) => (
                                                <div key={i} className="channel-item">
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
                                                    key={i} 
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
                                    className="btn-use-large"
                                    onClick={() => {
                                        useTemplate(previewTemplate.id);
                                        setPreviewTemplate(null);
                                    }}
                                >
                                    <FaCheck /> Bu Şablonu Kullan
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServerTemplates;
