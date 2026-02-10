// frontend/src/components/RateLimitConfigPanel.js - Rate Limit Configuration
import React, { useState, useEffect } from 'react';
import {
    FaTachometerAlt, FaTimes, FaSave, FaUndo, FaShieldAlt,
    FaEdit, FaPlus, FaTrash, FaExclamationTriangle, FaCheck,
    FaCog, FaUsers, FaRobot, FaHashtag, FaInfoCircle
} from 'react-icons/fa';
import toast from '../utils/toast';
import './RateLimitConfigPanel.css';
import confirmDialog from '../utils/confirmDialog';

const RateLimitConfigPanel = ({ serverId, apiBaseUrl, onClose }) => {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [activeCategory, setActiveCategory] = useState('messages');

    const categories = [
        { id: 'messages', label: 'Mesajlar', icon: <FaHashtag /> },
        { id: 'commands', label: 'Komutlar', icon: <FaCog /> },
        { id: 'api', label: 'API', icon: <FaRobot /> },
        { id: 'users', label: 'Kullanıcılar', icon: <FaUsers /> }
    ];

    const defaultConfig = {
        messages: {
            enabled: true,
            max_per_minute: 30,
            max_per_hour: 300,
            cooldown_seconds: 1,
            burst_limit: 5,
            slowmode_trigger: 50,
            slowmode_duration: 30
        },
        commands: {
            enabled: true,
            max_per_minute: 20,
            max_per_hour: 100,
            cooldown_seconds: 2,
            per_command_limits: {}
        },
        api: {
            enabled: true,
            max_per_minute: 60,
            max_per_hour: 1000,
            webhook_limit: 30
        },
        users: {
            new_account_limit: 10,
            new_account_period_hours: 24,
            suspicious_activity_threshold: 100
        },
        exemptions: [],
        custom_limits: []
    };

    useEffect(() => {
        fetchConfig();
    }, [serverId]);

    const fetchConfig = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/rate-limits/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setConfig({ ...defaultConfig, ...data });
            } else {
                setConfig(defaultConfig);
            }
        } catch (error) {
            console.error('Fetch rate limit config error:', error);
            setConfig(defaultConfig);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/rate-limits/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(config)
            });

            if (response.ok) {
                toast.success('✅ Rate limit ayarları kaydedildi');
                setHasChanges(false);
            } else {
                const err = await response.json();
                toast.error(err.error || 'Kaydetme başarısız');
            }
        } catch (error) {
            console.error('Save rate limit config error:', error);
            toast.error('Bir hata oluştu');
        } finally {
            setSaving(false);
        }
    };

    const handleReset = async () => {
        if (!await confirmDialog('Tüm ayarları varsayılana sıfırlamak istiyor musunuz?')) return;
        setConfig(defaultConfig);
        setHasChanges(true);
    };

    const updateConfig = (category, field, value) => {
        setConfig(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: value
            }
        }));
        setHasChanges(true);
    };

    const addExemption = (type, id) => {
        if (!id) return;
        setConfig(prev => ({
            ...prev,
            exemptions: [...prev.exemptions, { type, id, added_at: new Date().toISOString() }]
        }));
        setHasChanges(true);
    };

    const removeExemption = (index) => {
        setConfig(prev => ({
            ...prev,
            exemptions: prev.exemptions.filter((_, i) => i !== index)
        }));
        setHasChanges(true);
    };

    if (loading) {
        return (
            <div className="rate-limit-overlay">
                <div className="rate-limit-panel">
                    <div className="loading">Yükleniyor...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="rate-limit-overlay" onClick={onClose}>
            <div className="rate-limit-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2><FaTachometerAlt /> Rate Limit Ayarları</h2>
                    <div className="header-actions">
                        {hasChanges && (
                            <span className="unsaved-badge">
                                <FaExclamationTriangle /> Kaydedilmemiş değişiklikler
                            </span>
                        )}
                        <button className="close-btn" onClick={onClose}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                <div className="panel-body">
                    <div className="category-sidebar">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.icon}
                                <span>{cat.label}</span>
                            </button>
                        ))}
                        <button
                            className={`category-btn ${activeCategory === 'exemptions' ? 'active' : ''}`}
                            onClick={() => setActiveCategory('exemptions')}
                        >
                            <FaShieldAlt />
                            <span>Muafiyetler</span>
                        </button>
                    </div>

                    <div className="config-content">
                        {activeCategory === 'messages' && (
                            <MessageLimitsConfig
                                config={config.messages}
                                updateConfig={(field, value) => updateConfig('messages', field, value)}
                            />
                        )}

                        {activeCategory === 'commands' && (
                            <CommandLimitsConfig
                                config={config.commands}
                                updateConfig={(field, value) => updateConfig('commands', field, value)}
                            />
                        )}

                        {activeCategory === 'api' && (
                            <APILimitsConfig
                                config={config.api}
                                updateConfig={(field, value) => updateConfig('api', field, value)}
                            />
                        )}

                        {activeCategory === 'users' && (
                            <UserLimitsConfig
                                config={config.users}
                                updateConfig={(field, value) => updateConfig('users', field, value)}
                            />
                        )}

                        {activeCategory === 'exemptions' && (
                            <ExemptionsConfig
                                exemptions={config.exemptions}
                                addExemption={addExemption}
                                removeExemption={removeExemption}
                            />
                        )}
                    </div>
                </div>

                <div className="panel-footer">
                    <button className="reset-btn" onClick={handleReset}>
                        <FaUndo /> Varsayılana Sıfırla
                    </button>
                    <button
                        className="save-btn"
                        onClick={handleSave}
                        disabled={!hasChanges || saving}
                    >
                        {saving ? 'Kaydediliyor...' : <><FaSave /> Kaydet</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Message Limits Config
const MessageLimitsConfig = ({ config, updateConfig }) => (
    <div className="config-section">
        <h3><FaHashtag /> Mesaj Rate Limitleri</h3>

        <div className="config-toggle">
            <label>
                <input
                    type="checkbox"
                    checked={config.enabled}
                    onChange={(e) => updateConfig('enabled', e.target.checked)}
                />
                Rate Limiting Aktif
            </label>
        </div>

        <div className="config-grid">
            <div className="config-item">
                <label>Dakikada Maks. Mesaj</label>
                <input
                    type="number"
                    value={config.max_per_minute}
                    onChange={(e) => updateConfig('max_per_minute', parseInt(e.target.value))}
                    min="1"
                    max="100"
                />
            </div>

            <div className="config-item">
                <label>Saatte Maks. Mesaj</label>
                <input
                    type="number"
                    value={config.max_per_hour}
                    onChange={(e) => updateConfig('max_per_hour', parseInt(e.target.value))}
                    min="1"
                    max="1000"
                />
            </div>

            <div className="config-item">
                <label>Bekleme Süresi (sn)</label>
                <input
                    type="number"
                    value={config.cooldown_seconds}
                    onChange={(e) => updateConfig('cooldown_seconds', parseInt(e.target.value))}
                    min="0"
                    max="60"
                />
            </div>

            <div className="config-item">
                <label>Burst Limit</label>
                <input
                    type="number"
                    value={config.burst_limit}
                    onChange={(e) => updateConfig('burst_limit', parseInt(e.target.value))}
                    min="1"
                    max="20"
                />
                <small>Arka arkaya gönderilebilecek maksimum mesaj</small>
            </div>

            <div className="config-item">
                <label>Slowmode Tetikleyici</label>
                <input
                    type="number"
                    value={config.slowmode_trigger}
                    onChange={(e) => updateConfig('slowmode_trigger', parseInt(e.target.value))}
                    min="10"
                    max="200"
                />
                <small>Bu sayıda mesajdan sonra slowmode aktif olur</small>
            </div>

            <div className="config-item">
                <label>Slowmode Süresi (sn)</label>
                <input
                    type="number"
                    value={config.slowmode_duration}
                    onChange={(e) => updateConfig('slowmode_duration', parseInt(e.target.value))}
                    min="5"
                    max="300"
                />
            </div>
        </div>
    </div>
);

// Command Limits Config
const CommandLimitsConfig = ({ config, updateConfig }) => (
    <div className="config-section">
        <h3><FaCog /> Komut Rate Limitleri</h3>

        <div className="config-toggle">
            <label>
                <input
                    type="checkbox"
                    checked={config.enabled}
                    onChange={(e) => updateConfig('enabled', e.target.checked)}
                />
                Komut Rate Limiting Aktif
            </label>
        </div>

        <div className="config-grid">
            <div className="config-item">
                <label>Dakikada Maks. Komut</label>
                <input
                    type="number"
                    value={config.max_per_minute}
                    onChange={(e) => updateConfig('max_per_minute', parseInt(e.target.value))}
                    min="1"
                    max="60"
                />
            </div>

            <div className="config-item">
                <label>Saatte Maks. Komut</label>
                <input
                    type="number"
                    value={config.max_per_hour}
                    onChange={(e) => updateConfig('max_per_hour', parseInt(e.target.value))}
                    min="1"
                    max="500"
                />
            </div>

            <div className="config-item">
                <label>Komut Bekleme Süresi (sn)</label>
                <input
                    type="number"
                    value={config.cooldown_seconds}
                    onChange={(e) => updateConfig('cooldown_seconds', parseInt(e.target.value))}
                    min="0"
                    max="30"
                />
            </div>
        </div>

        <div className="info-box">
            <FaInfoCircle />
            <p>Belirli komutlar için özel limitler Bot Developer Portal üzerinden ayarlanabilir.</p>
        </div>
    </div>
);

// API Limits Config
const APILimitsConfig = ({ config, updateConfig }) => (
    <div className="config-section">
        <h3><FaRobot /> API Rate Limitleri</h3>

        <div className="config-toggle">
            <label>
                <input
                    type="checkbox"
                    checked={config.enabled}
                    onChange={(e) => updateConfig('enabled', e.target.checked)}
                />
                API Rate Limiting Aktif
            </label>
        </div>

        <div className="config-grid">
            <div className="config-item">
                <label>Dakikada Maks. İstek</label>
                <input
                    type="number"
                    value={config.max_per_minute}
                    onChange={(e) => updateConfig('max_per_minute', parseInt(e.target.value))}
                    min="10"
                    max="300"
                />
            </div>

            <div className="config-item">
                <label>Saatte Maks. İstek</label>
                <input
                    type="number"
                    value={config.max_per_hour}
                    onChange={(e) => updateConfig('max_per_hour', parseInt(e.target.value))}
                    min="100"
                    max="10000"
                />
            </div>

            <div className="config-item">
                <label>Webhook Limiti (dakika)</label>
                <input
                    type="number"
                    value={config.webhook_limit}
                    onChange={(e) => updateConfig('webhook_limit', parseInt(e.target.value))}
                    min="5"
                    max="100"
                />
            </div>
        </div>
    </div>
);

// User Limits Config
const UserLimitsConfig = ({ config, updateConfig }) => (
    <div className="config-section">
        <h3><FaUsers /> Kullanıcı Limitleri</h3>

        <div className="config-grid">
            <div className="config-item">
                <label>Yeni Hesap Mesaj Limiti</label>
                <input
                    type="number"
                    value={config.new_account_limit}
                    onChange={(e) => updateConfig('new_account_limit', parseInt(e.target.value))}
                    min="1"
                    max="50"
                />
                <small>Yeni hesapların belirli süre içinde gönderebileceği mesaj</small>
            </div>

            <div className="config-item">
                <label>Yeni Hesap Süresi (saat)</label>
                <input
                    type="number"
                    value={config.new_account_period_hours}
                    onChange={(e) => updateConfig('new_account_period_hours', parseInt(e.target.value))}
                    min="1"
                    max="168"
                />
                <small>Bu süreden eski olmayan hesaplar "yeni" sayılır</small>
            </div>

            <div className="config-item">
                <label>Şüpheli Aktivite Eşiği</label>
                <input
                    type="number"
                    value={config.suspicious_activity_threshold}
                    onChange={(e) => updateConfig('suspicious_activity_threshold', parseInt(e.target.value))}
                    min="10"
                    max="500"
                />
                <small>Bu eşiği aşan aktivite şüpheli olarak işaretlenir</small>
            </div>
        </div>
    </div>
);

// Exemptions Config
const ExemptionsConfig = ({ exemptions, addExemption, removeExemption }) => {
    const [newType, setNewType] = useState('role');
    const [newId, setNewId] = useState('');

    const handleAdd = () => {
        if (newId.trim()) {
            addExemption(newType, newId.trim());
            setNewId('');
        }
    };

    return (
        <div className="config-section">
            <h3><FaShieldAlt /> Rate Limit Muafiyetleri</h3>
            <p className="section-desc">Bu roller veya kullanıcılar rate limitlerden muaf tutulur.</p>

            <div className="add-exemption">
                <select value={newType} onChange={(e) => setNewType(e.target.value)}>
                    <option value="role">Rol</option>
                    <option value="user">Kullanıcı</option>
                    <option value="bot">Bot</option>
                </select>
                <input
                    type="text"
                    placeholder="Rol veya Kullanıcı ID"
                    value={newId}
                    onChange={(e) => setNewId(e.target.value)}
                />
                <button onClick={handleAdd}>
                    <FaPlus /> Ekle
                </button>
            </div>

            <div className="exemptions-list">
                {exemptions.length > 0 ? (
                    exemptions.map((ex, idx) => (
                        <div key={idx} className="exemption-item">
                            <span className={`type-badge ${ex.type}`}>
                                {ex.type === 'role' ? 'Rol' : ex.type === 'user' ? 'Kullanıcı' : 'Bot'}
                            </span>
                            <span className="exemption-id">{ex.id}</span>
                            <button
                                className="remove-btn"
                                onClick={() => removeExemption(idx)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="no-exemptions">
                        <p>Henüz muafiyet eklenmemiş</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RateLimitConfigPanel;
