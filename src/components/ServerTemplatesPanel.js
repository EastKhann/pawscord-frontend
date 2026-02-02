// frontend/src/components/ServerTemplatesPanel.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import toast from '../utils/toast';
import './ServerTemplatesPanel.css';

const ServerTemplatesPanel = ({ onClose, onServerCreated, apiBaseUrl }) => {
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [serverName, setServerName] = useState('');

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/templates/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setTemplates(data.templates || []);
            } else {
                toast.error('❌ Template\'ler yüklenemedi');
            }
        } catch (error) {
            console.error('Template fetch error:', error);
            toast.error('❌ Bağlantı hatası');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectTemplate = async (template) => {
        setSelectedTemplate(template);
        setServerName(template.name);
    };

    const handleCreateServer = async () => {
        if (!selectedTemplate) {
            toast.error('⚠️ Lütfen bir template seçin');
            return;
        }

        if (!serverName.trim()) {
            toast.error('⚠️ Sunucu adı giriniz');
            return;
        }

        setCreating(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/templates/${selectedTemplate.id}/create/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: serverName })
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(`✅ ${serverName} sunucusu oluşturuldu!`);
                if (onServerCreated) onServerCreated(data.server);
                onClose();
            } else {
                const error = await response.json();
                toast.error(error.error || '❌ Sunucu oluşturulamadı');
            }
        } catch (error) {
            console.error('Server creation error:', error);
            toast.error('❌ Sunucu oluşturma hatası');
        } finally {
            setCreating(false);
        }
    };

    const getTemplateIcon = (category) => {
        const icons = {
            gaming: '🎮',
            study: '📚',
            community: '👥',
            creative: '🎨',
            music: '🎵',
            tech: '💻',
            anime: '🎌',
            sports: '⚽',
            business: '💼'
        };
        return icons[category] || '🌟';
    };

    const modalContent = (
        <div className="server-templates-overlay" onClick={onClose}>
            <div className="server-templates-modal" onClick={e => e.stopPropagation()}>
                <div className="templates-header">
                    <h2>🎁 Sunucu Template'leri</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                {loading ? (
                    <div className="templates-loading">
                        <div className="spinner"></div>
                        <p>Template'ler yükleniyor...</p>
                    </div>
                ) : (
                    <div className="templates-content">
                        {!selectedTemplate ? (
                            <div className="templates-grid">
                                {templates.map(template => (
                                    <div
                                        key={template.id}
                                        className="template-card"
                                        onClick={() => handleSelectTemplate(template)}
                                    >
                                        <div className="template-icon">
                                            {getTemplateIcon(template.category)}
                                        </div>
                                        <h3>{template.name}</h3>
                                        <p className="template-description">{template.description}</p>
                                        <div className="template-stats">
                                            <span>📝 {template.channels_count} kanal</span>
                                            <span>🎭 {template.roles_count} rol</span>
                                        </div>
                                        <button className="select-template-btn">
                                            Seç
                                        </button>
                                    </div>
                                ))}

                                {templates.length === 0 && (
                                    <div className="no-templates">
                                        <p>🎁 Henüz template yok</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="template-preview">
                                <button
                                    className="back-btn"
                                    onClick={() => setSelectedTemplate(null)}
                                >
                                    ← Geri
                                </button>

                                <div className="preview-header">
                                    <div className="preview-icon">
                                        {getTemplateIcon(selectedTemplate.category)}
                                    </div>
                                    <div className="preview-info">
                                        <h2>{selectedTemplate.name}</h2>
                                        <p>{selectedTemplate.description}</p>
                                    </div>
                                </div>

                                <div className="preview-details">
                                    <div className="detail-section">
                                        <h4>📝 Kanallar ({selectedTemplate.channels_count})</h4>
                                        <ul>
                                            {(selectedTemplate.channels || []).map((channel, idx) => (
                                                <li key={idx}>
                                                    {channel.type === 'text' ? '#' : '🔊'} {channel.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="detail-section">
                                        <h4>🎭 Roller ({selectedTemplate.roles_count})</h4>
                                        <ul>
                                            {(selectedTemplate.roles || []).map((role, idx) => (
                                                <li key={idx}>
                                                    <span
                                                        className="role-color"
                                                        style={{ backgroundColor: role.color }}
                                                    ></span>
                                                    {role.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="create-section">
                                    <input
                                        type="text"
                                        className="server-name-input"
                                        placeholder="Sunucu adı..."
                                        value={serverName}
                                        onChange={(e) => setServerName(e.target.value)}
                                        maxLength={100}
                                    />

                                    <button
                                        className="create-server-btn"
                                        onClick={handleCreateServer}
                                        disabled={creating || !serverName.trim()}
                                    >
                                        {creating ? '⏳ Oluşturuluyor...' : '✨ Sunucu Oluştur'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

export default ServerTemplatesPanel;
