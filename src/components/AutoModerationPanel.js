// frontend/src/components/AutoModerationPanel.js
import React, { useState, useEffect } from 'react';
import { 
    FaShieldAlt, FaBan, FaExclamationTriangle, FaRobot,
    FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff
} from 'react-icons/fa';
import toast from '../utils/toast';
import './AutoModerationPanel.css';

const AutoModerationPanel = ({ serverId, onClose }) => {
    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateRule, setShowCreateRule] = useState(false);
    const [editingRule, setEditingRule] = useState(null);
    const [newRule, setNewRule] = useState({
        name: '',
        type: 'spam',
        action: 'warn',
        enabled: true,
        keywords: [],
        threshold: 5,
        duration: 60
    });

    useEffect(() => {
        fetchRules();
    }, [serverId]);

    const fetchRules = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/moderation/auto-mod/rules/${serverId}/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setRules(data.rules || []);
            }
        } catch (error) {
            toast.error('❌ Kurallar yüklenemedi');
        } finally {
            setLoading(false);
        }
    };

    const createRule = async () => {
        if (!newRule.name.trim()) {
            toast.error('❌ Kural adı girin');
            return;
        }

        try {
            const response = await fetch(`/api/moderation/auto-mod/rules/${serverId}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRule)
            });

            if (response.ok) {
                const data = await response.json();
                setRules([...rules, data.rule]);
                setShowCreateRule(false);
                resetNewRule();
                toast.success('✅ Kural oluşturuldu');
            } else {
                toast.error('❌ Kural oluşturulamadı');
            }
        } catch (error) {
            toast.error('❌ Bağlantı hatası');
        }
    };

    const updateRule = async (ruleId, updates) => {
        try {
            const response = await fetch(`/api/moderation/auto-mod/rules/${serverId}/${ruleId}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updates)
            });

            if (response.ok) {
                const data = await response.json();
                setRules(rules.map(r => r.id === ruleId ? data.rule : r));
                setEditingRule(null);
                toast.success('✅ Kural güncellendi');
            }
        } catch (error) {
            toast.error('❌ Güncelleme başarısız');
        }
    };

    const deleteRule = async (ruleId) => {
        if (!confirm('Bu kuralı silmek istediğinizden emin misiniz?')) return;

        try {
            const response = await fetch(`/api/moderation/auto-mod/rules/${serverId}/${ruleId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                setRules(rules.filter(r => r.id !== ruleId));
                toast.success('✅ Kural silindi');
            }
        } catch (error) {
            toast.error('❌ Silme başarısız');
        }
    };

    const toggleRule = async (ruleId, enabled) => {
        await updateRule(ruleId, { enabled });
    };

    const resetNewRule = () => {
        setNewRule({
            name: '',
            type: 'spam',
            action: 'warn',
            enabled: true,
            keywords: [],
            threshold: 5,
            duration: 60
        });
    };

    const addKeyword = (keyword) => {
        if (keyword.trim() && !newRule.keywords.includes(keyword.trim())) {
            setNewRule({
                ...newRule,
                keywords: [...newRule.keywords, keyword.trim()]
            });
        }
    };

    const removeKeyword = (keyword) => {
        setNewRule({
            ...newRule,
            keywords: newRule.keywords.filter(k => k !== keyword)
        });
    };

    const getRuleIcon = (type) => {
        switch(type) {
            case 'spam': return <FaBan />;
            case 'profanity': return <FaExclamationTriangle />;
            case 'caps': return '🔤';
            case 'links': return '🔗';
            case 'mentions': return '@';
            default: return <FaShieldAlt />;
        }
    };

    const getActionColor = (action) => {
        switch(action) {
            case 'warn': return '#faa61a';
            case 'mute': return '#ff9500';
            case 'kick': return '#ff3b30';
            case 'ban': return '#ff0000';
            default: return '#8b5cf6';
        }
    };

    return (
        <div className="auto-mod-panel-overlay" onClick={onClose}>
            <div className="auto-mod-panel" onClick={(e) => e.stopPropagation()}>
                <div className="panel-header">
                    <FaRobot className="header-icon" />
                    <h2>Otomatik Moderasyon</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="panel-actions">
                    <button className="btn-create" onClick={() => setShowCreateRule(true)}>
                        <FaPlus /> Yeni Kural
                    </button>
                </div>

                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Yükleniyor...</p>
                    </div>
                ) : (
                    <div className="rules-list">
                        {rules.length === 0 ? (
                            <div className="empty-state">
                                <FaShieldAlt size={48} />
                                <h3>Kural Yok</h3>
                                <p>Otomatik moderasyon kuralları oluşturun</p>
                            </div>
                        ) : (
                            rules.map((rule) => (
                                <div key={rule.id} className={`rule-card ${!rule.enabled ? 'disabled' : ''}`}>
                                    <div className="rule-header">
                                        <div className="rule-icon">{getRuleIcon(rule.type)}</div>
                                        <div className="rule-info">
                                            <h3>{rule.name}</h3>
                                            <span className="rule-type">{rule.type}</span>
                                        </div>
                                        <div className="rule-actions">
                                            <button 
                                                className="action-btn toggle"
                                                onClick={() => toggleRule(rule.id, !rule.enabled)}
                                                title={rule.enabled ? 'Devre Dışı Bırak' : 'Etkinleştir'}
                                            >
                                                {rule.enabled ? <FaToggleOn /> : <FaToggleOff />}
                                            </button>
                                            <button 
                                                className="action-btn edit"
                                                onClick={() => setEditingRule(rule)}
                                                title="Düzenle"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button 
                                                className="action-btn delete"
                                                onClick={() => deleteRule(rule.id)}
                                                title="Sil"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="rule-details">
                                        <div className="detail-item">
                                            <span className="label">Aksiyon:</span>
                                            <span 
                                                className="value action-badge"
                                                style={{ backgroundColor: getActionColor(rule.action) }}
                                            >
                                                {rule.action}
                                            </span>
                                        </div>
                                        {rule.keywords && rule.keywords.length > 0 && (
                                            <div className="detail-item">
                                                <span className="label">Anahtar Kelimeler:</span>
                                                <div className="keywords">
                                                    {rule.keywords.map((kw, i) => (
                                                        <span key={i} className="keyword">{kw}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {rule.threshold && (
                                            <div className="detail-item">
                                                <span className="label">Eşik:</span>
                                                <span className="value">{rule.threshold}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {showCreateRule && (
                    <div className="rule-editor-modal">
                        <div className="rule-editor">
                            <h3>Yeni Kural Oluştur</h3>
                            
                            <div className="form-group">
                                <label>Kural Adı</label>
                                <input
                                    type="text"
                                    value={newRule.name}
                                    onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                                    placeholder="Örn: Spam Engelleme"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Kural Tipi</label>
                                    <select
                                        value={newRule.type}
                                        onChange={(e) => setNewRule({...newRule, type: e.target.value})}
                                    >
                                        <option value="spam">Spam</option>
                                        <option value="profanity">Küfür</option>
                                        <option value="caps">Büyük Harf</option>
                                        <option value="links">Link</option>
                                        <option value="mentions">Mention</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Aksiyon</label>
                                    <select
                                        value={newRule.action}
                                        onChange={(e) => setNewRule({...newRule, action: e.target.value})}
                                    >
                                        <option value="warn">Uyar</option>
                                        <option value="mute">Sustur</option>
                                        <option value="kick">At</option>
                                        <option value="ban">Yasakla</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Anahtar Kelimeler (Enter ile ekle)</label>
                                <input
                                    type="text"
                                    placeholder="Kelime girin ve Enter'a basın"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            addKeyword(e.target.value);
                                            e.target.value = '';
                                        }
                                    }}
                                />
                                <div className="keywords-list">
                                    {newRule.keywords.map((kw, i) => (
                                        <span key={i} className="keyword-chip">
                                            {kw}
                                            <button onClick={() => removeKeyword(kw)}>×</button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Eşik</label>
                                    <input
                                        type="number"
                                        value={newRule.threshold}
                                        onChange={(e) => setNewRule({...newRule, threshold: parseInt(e.target.value)})}
                                        min="1"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Süre (saniye)</label>
                                    <input
                                        type="number"
                                        value={newRule.duration}
                                        onChange={(e) => setNewRule({...newRule, duration: parseInt(e.target.value)})}
                                        min="1"
                                    />
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button className="btn-cancel" onClick={() => setShowCreateRule(false)}>
                                    İptal
                                </button>
                                <button className="btn-save" onClick={createRule}>
                                    Oluştur
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AutoModerationPanel;
