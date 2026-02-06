// frontend/src/components/CommunitySettingsPanel.js - Community Server Management
import React, { useState, useEffect } from 'react';
import {
    FaUsers, FaTimes, FaCog, FaShieldAlt, FaClipboardList,
    FaSave, FaToggleOn, FaToggleOff, FaExclamationTriangle,
    FaQuestionCircle, FaGavel, FaUserCheck, FaGlobe,
    FaComments, FaHashtag, FaBullhorn
} from 'react-icons/fa';
import toast from '../utils/toast';
import './CommunitySettingsPanel.css';

const CommunitySettingsPanel = ({ apiBaseUrl, serverId, onClose }) => {
    const [settings, setSettings] = useState({
        is_community: false,
        rules_channel_id: '',
        public_updates_channel_id: '',
        verification_level: 'medium',
        explicit_content_filter: 'medium',
        default_notifications: 'mentions',
        description: '',
        preferred_locale: 'tr',
        features: {
            welcome_screen: true,
            member_screening: false,
            discovery: false
        }
    });
    const [rules, setRules] = useState([]);
    const [screeningQuestions, setScreeningQuestions] = useState([]);
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('general');

    useEffect(() => {
        fetchCommunitySettings();
        fetchChannels();
    }, []);

    const fetchCommunitySettings = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/community/settings/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setSettings(prev => ({ ...prev, ...data }));
                setRules(data.rules || []);
                setScreeningQuestions(data.screening_questions || []);
            }
        } catch (error) {
            console.error('Fetch settings error:', error);
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
                setChannels((data.channels || data || []).filter(c => c.type !== 'category'));
            }
        } catch (error) {
            console.error('Fetch channels error:', error);
        }
    };

    const saveSettings = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/community/settings/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...settings,
                    rules,
                    screening_questions: screeningQuestions
                })
            });

            if (response.ok) {
                toast.success('✅ Topluluk ayarları kaydedildi');
            }
        } catch (error) {
            console.error('Save error:', error);
            toast.error('Kaydetme başarısız');
        } finally {
            setSaving(false);
        }
    };

    const addRule = () => {
        setRules(prev => [...prev, { id: Date.now(), title: '', description: '' }]);
    };

    const updateRule = (id, field, value) => {
        setRules(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
    };

    const removeRule = (id) => {
        setRules(prev => prev.filter(r => r.id !== id));
    };

    const addQuestion = () => {
        setScreeningQuestions(prev => [...prev, { id: Date.now(), question: '', required: false }]);
    };

    const updateQuestion = (id, field, value) => {
        setScreeningQuestions(prev => prev.map(q => q.id === id ? { ...q, [field]: value } : q));
    };

    const removeQuestion = (id) => {
        setScreeningQuestions(prev => prev.filter(q => q.id !== id));
    };

    const verificationLevels = [
        { value: 'none', label: 'Yok', description: 'Herkes mesaj gönderebilir' },
        { value: 'low', label: 'Düşük', description: 'E-posta doğrulaması gerekli' },
        { value: 'medium', label: 'Orta', description: '5 dakika kayıtlı olmalı' },
        { value: 'high', label: 'Yüksek', description: '10 dakika sunucuda olmalı' },
        { value: 'highest', label: 'En Yüksek', description: 'Telefon doğrulaması gerekli' }
    ];

    const contentFilters = [
        { value: 'disabled', label: 'Kapalı', description: 'İçerik filtresi yok' },
        { value: 'medium', label: 'Orta', description: 'Rolsüz üyeler için filtrele' },
        { value: 'high', label: 'Yüksek', description: 'Tüm mesajları filtrele' }
    ];

    if (loading) {
        return (
            <div className="community-settings-overlay" onClick={onClose}>
                <div className="community-settings-panel" onClick={e => e.stopPropagation()}>
                    <div className="loading">Yükleniyor...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="community-settings-overlay" onClick={onClose}>
            <div className="community-settings-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2><FaUsers /> Topluluk Ayarları</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="community-toggle">
                    <div className="toggle-info">
                        <span className="toggle-label">Topluluk Sunucusu</span>
                        <span className="toggle-description">
                            Topluluk özelliklerini aktifleştir (keşfet, karşılama ekranı vb.)
                        </span>
                    </div>
                    <button
                        className={`toggle-btn ${settings.is_community ? 'active' : ''}`}
                        onClick={() => setSettings(prev => ({ ...prev, is_community: !prev.is_community }))}
                    >
                        {settings.is_community ? <FaToggleOn /> : <FaToggleOff />}
                    </button>
                </div>

                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'general' ? 'active' : ''}`}
                        onClick={() => setActiveTab('general')}
                    >
                        <FaCog /> Genel
                    </button>
                    <button
                        className={`tab ${activeTab === 'rules' ? 'active' : ''}`}
                        onClick={() => setActiveTab('rules')}
                    >
                        <FaGavel /> Kurallar
                    </button>
                    <button
                        className={`tab ${activeTab === 'screening' ? 'active' : ''}`}
                        onClick={() => setActiveTab('screening')}
                    >
                        <FaUserCheck /> Üye Tarama
                    </button>
                    <button
                        className={`tab ${activeTab === 'safety' ? 'active' : ''}`}
                        onClick={() => setActiveTab('safety')}
                    >
                        <FaShieldAlt /> Güvenlik
                    </button>
                </div>

                <div className="panel-content">
                    {activeTab === 'general' && (
                        <GeneralSettings
                            settings={settings}
                            setSettings={setSettings}
                            channels={channels}
                        />
                    )}

                    {activeTab === 'rules' && (
                        <RulesSettings
                            rules={rules}
                            onAdd={addRule}
                            onUpdate={updateRule}
                            onRemove={removeRule}
                        />
                    )}

                    {activeTab === 'screening' && (
                        <ScreeningSettings
                            questions={screeningQuestions}
                            onAdd={addQuestion}
                            onUpdate={updateQuestion}
                            onRemove={removeQuestion}
                        />
                    )}

                    {activeTab === 'safety' && (
                        <SafetySettings
                            settings={settings}
                            setSettings={setSettings}
                            verificationLevels={verificationLevels}
                            contentFilters={contentFilters}
                        />
                    )}
                </div>

                <div className="panel-footer">
                    <button className="cancel-btn" onClick={onClose}>İptal</button>
                    <button className="save-btn" onClick={saveSettings} disabled={saving}>
                        <FaSave /> {saving ? 'Kaydediliyor...' : 'Kaydet'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// General Settings Tab
const GeneralSettings = ({ settings, setSettings, channels }) => (
    <div className="settings-tab">
        <div className="form-group">
            <label>Sunucu Açıklaması</label>
            <textarea
                value={settings.description}
                onChange={(e) => setSettings(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Sunucunuz hakkında kısa bir açıklama..."
                rows="3"
                maxLength={300}
            />
            <span className="char-count">{settings.description?.length || 0}/300</span>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label><FaGavel /> Kurallar Kanalı</label>
                <select
                    value={settings.rules_channel_id}
                    onChange={(e) => setSettings(prev => ({ ...prev, rules_channel_id: e.target.value }))}
                >
                    <option value="">Seçin...</option>
                    {channels.map(ch => (
                        <option key={ch.id} value={ch.id}>#{ch.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label><FaBullhorn /> Güncellemeler Kanalı</label>
                <select
                    value={settings.public_updates_channel_id}
                    onChange={(e) => setSettings(prev => ({ ...prev, public_updates_channel_id: e.target.value }))}
                >
                    <option value="">Seçin...</option>
                    {channels.map(ch => (
                        <option key={ch.id} value={ch.id}>#{ch.name}</option>
                    ))}
                </select>
            </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label><FaGlobe /> Tercih Edilen Dil</label>
                <select
                    value={settings.preferred_locale}
                    onChange={(e) => setSettings(prev => ({ ...prev, preferred_locale: e.target.value }))}
                >
                    <option value="tr">🇹🇷 Türkçe</option>
                    <option value="en">🇬🇧 English</option>
                    <option value="de">🇩🇪 Deutsch</option>
                    <option value="fr">🇫🇷 Français</option>
                </select>
            </div>

            <div className="form-group">
                <label><FaComments /> Varsayılan Bildirimler</label>
                <select
                    value={settings.default_notifications}
                    onChange={(e) => setSettings(prev => ({ ...prev, default_notifications: e.target.value }))}
                >
                    <option value="all">Tüm Mesajlar</option>
                    <option value="mentions">Sadece Etiketler</option>
                </select>
            </div>
        </div>

        <div className="feature-toggles">
            <h4>Özellikler</h4>
            <label className="feature-item">
                <span>Karşılama Ekranı</span>
                <input
                    type="checkbox"
                    checked={settings.features?.welcome_screen}
                    onChange={(e) => setSettings(prev => ({
                        ...prev,
                        features: { ...prev.features, welcome_screen: e.target.checked }
                    }))}
                />
            </label>
            <label className="feature-item">
                <span>Üye Tarama</span>
                <input
                    type="checkbox"
                    checked={settings.features?.member_screening}
                    onChange={(e) => setSettings(prev => ({
                        ...prev,
                        features: { ...prev.features, member_screening: e.target.checked }
                    }))}
                />
            </label>
            <label className="feature-item">
                <span>Sunucu Keşfet</span>
                <input
                    type="checkbox"
                    checked={settings.features?.discovery}
                    onChange={(e) => setSettings(prev => ({
                        ...prev,
                        features: { ...prev.features, discovery: e.target.checked }
                    }))}
                />
            </label>
        </div>
    </div>
);

// Rules Settings Tab
const RulesSettings = ({ rules, onAdd, onUpdate, onRemove }) => (
    <div className="settings-tab">
        <div className="tab-header">
            <h4>Sunucu Kuralları</h4>
            <button className="add-btn" onClick={onAdd}>+ Kural Ekle</button>
        </div>

        {rules.length === 0 ? (
            <div className="empty-rules">
                <FaClipboardList />
                <p>Henüz kural eklenmemiş</p>
            </div>
        ) : (
            <div className="rules-list">
                {rules.map((rule, idx) => (
                    <div key={rule.id} className="rule-item">
                        <span className="rule-number">{idx + 1}</span>
                        <div className="rule-content">
                            <input
                                type="text"
                                placeholder="Kural başlığı..."
                                value={rule.title}
                                onChange={(e) => onUpdate(rule.id, 'title', e.target.value)}
                            />
                            <textarea
                                placeholder="Kural açıklaması..."
                                value={rule.description}
                                onChange={(e) => onUpdate(rule.id, 'description', e.target.value)}
                                rows="2"
                            />
                        </div>
                        <button className="remove-btn" onClick={() => onRemove(rule.id)}>
                            <FaTimes />
                        </button>
                    </div>
                ))}
            </div>
        )}
    </div>
);

// Screening Settings Tab
const ScreeningSettings = ({ questions, onAdd, onUpdate, onRemove }) => (
    <div className="settings-tab">
        <div className="tab-header">
            <h4>Üye Tarama Soruları</h4>
            <button className="add-btn" onClick={onAdd}>+ Soru Ekle</button>
        </div>

        <p className="tab-description">
            Yeni üyeler sunucuya katılmadan önce bu soruları yanıtlamalıdır.
        </p>

        {questions.length === 0 ? (
            <div className="empty-rules">
                <FaQuestionCircle />
                <p>Henüz soru eklenmemiş</p>
            </div>
        ) : (
            <div className="questions-list">
                {questions.map((q, idx) => (
                    <div key={q.id} className="question-item">
                        <span className="question-number">{idx + 1}</span>
                        <div className="question-content">
                            <input
                                type="text"
                                placeholder="Soruyu yazın..."
                                value={q.question}
                                onChange={(e) => onUpdate(q.id, 'question', e.target.value)}
                            />
                            <label className="required-toggle">
                                <input
                                    type="checkbox"
                                    checked={q.required}
                                    onChange={(e) => onUpdate(q.id, 'required', e.target.checked)}
                                />
                                <span>Zorunlu</span>
                            </label>
                        </div>
                        <button className="remove-btn" onClick={() => onRemove(q.id)}>
                            <FaTimes />
                        </button>
                    </div>
                ))}
            </div>
        )}
    </div>
);

// Safety Settings Tab
const SafetySettings = ({ settings, setSettings, verificationLevels, contentFilters }) => (
    <div className="settings-tab">
        <div className="form-group">
            <label><FaShieldAlt /> Doğrulama Seviyesi</label>
            <div className="level-options">
                {verificationLevels.map(level => (
                    <label
                        key={level.value}
                        className={`level-option ${settings.verification_level === level.value ? 'selected' : ''}`}
                    >
                        <input
                            type="radio"
                            name="verification"
                            value={level.value}
                            checked={settings.verification_level === level.value}
                            onChange={(e) => setSettings(prev => ({ ...prev, verification_level: e.target.value }))}
                        />
                        <div className="level-info">
                            <span className="level-label">{level.label}</span>
                            <span className="level-desc">{level.description}</span>
                        </div>
                    </label>
                ))}
            </div>
        </div>

        <div className="form-group">
            <label><FaExclamationTriangle /> İçerik Filtresi</label>
            <div className="level-options">
                {contentFilters.map(filter => (
                    <label
                        key={filter.value}
                        className={`level-option ${settings.explicit_content_filter === filter.value ? 'selected' : ''}`}
                    >
                        <input
                            type="radio"
                            name="content-filter"
                            value={filter.value}
                            checked={settings.explicit_content_filter === filter.value}
                            onChange={(e) => setSettings(prev => ({ ...prev, explicit_content_filter: e.target.value }))}
                        />
                        <div className="level-info">
                            <span className="level-label">{filter.label}</span>
                            <span className="level-desc">{filter.description}</span>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    </div>
);

export default CommunitySettingsPanel;
