// frontend/src/components/AutoModBuilder.js
// 🔥 FEATURE 44: Auto-mod visual rule builder
// Visual interface to create auto-moderation rules

import React, { useState, memo, useCallback } from 'react';
import { FaShieldAlt, FaPlus, FaTrash, FaToggleOn, FaToggleOff, FaExclamationTriangle, FaBan, FaEraser, FaClock, FaSave } from 'react-icons/fa';

const ACTION_TYPES = [
    { key: 'delete', label: 'Mesajı Sil', icon: FaEraser, color: '#ed4245' },
    { key: 'warn', label: 'Uyar', icon: FaExclamationTriangle, color: '#fee75c' },
    { key: 'mute', label: 'Sustur', icon: FaClock, color: '#5865f2' },
    { key: 'ban', label: 'Yasakla', icon: FaBan, color: '#ed4245' },
];

const TRIGGER_TYPES = [
    { key: 'words', label: 'Yasaklı Kelimeler', desc: 'Belirli kelimeleri içeren mesajlar' },
    { key: 'spam', label: 'Spam Algılama', desc: 'Çok hızlı mesaj gönderme' },
    { key: 'links', label: 'Link Filtresi', desc: 'Belirli veya tüm linkleri engelle' },
    { key: 'mentions', label: 'Toplu Bahsetme', desc: 'Çok fazla @mention engelle' },
    { key: 'caps', label: 'BÜYÜK HARF', desc: 'Aşırı büyük harf kullanımı' },
    { key: 'invites', label: 'Davet Linkleri', desc: 'Discord/Pawscord davet linklerini engelle' },
    { key: 'attachments', label: 'Dosya Filtresi', desc: 'Belirli dosya türlerini engelle' },
];

const AutoModBuilder = ({ rules = [], onSaveRules }) => {
    const [ruleList, setRuleList] = useState(rules.length > 0 ? rules : [
        { id: 1, name: 'Küfür Filtresi', trigger: 'words', action: 'delete', enabled: true, config: { words: '' } },
    ]);

    const addRule = useCallback(() => {
        const id = Date.now();
        setRuleList(prev => [...prev, {
            id, name: 'Yeni Kural', trigger: 'words', action: 'delete',
            enabled: true, config: { words: '' },
        }]);
    }, []);

    const removeRule = useCallback((id) => {
        setRuleList(prev => prev.filter(r => r.id !== id));
    }, []);

    const updateRule = useCallback((id, field, value) => {
        setRuleList(prev => prev.map(r =>
            r.id === id ? { ...r, [field]: value } : r
        ));
    }, []);

    const handleSave = useCallback(() => {
        onSaveRules?.(ruleList);
    }, [ruleList, onSaveRules]);

    return (
        <div style={S.container}>
            <div style={S.header}>
                <FaShieldAlt style={{ fontSize: 18, color: '#57f287' }} />
                <div>
                    <h3 style={S.title}>Otomatik Moderasyon</h3>
                    <span style={S.subtitle}>{ruleList.length} kural aktif</span>
                </div>
                <button type="button" style={S.addBtn} onClick={addRule}>
                    <FaPlus /> Kural Ekle
                </button>
            </div>

            <div style={S.ruleList}>
                {ruleList.map((rule) => (
                    <div key={rule.id} style={{
                        ...S.ruleCard,
                        borderLeftColor: rule.enabled ? '#57f287' : '#4e5058',
                    }}>
                        {/* Rule Header */}
                        <div style={S.ruleHeader}>
                            <input
                                type="text"
                                value={rule.name}
                                onChange={e => updateRule(rule.id, 'name', e.target.value)}
                                style={S.ruleName}
                                maxLength={30}
                            />
                            <button
                                type="button"
                                style={S.toggleBtn}
                                onClick={() => updateRule(rule.id, 'enabled', !rule.enabled)}
                            >
                                {rule.enabled ? (
                                    <FaToggleOn style={{ fontSize: 22, color: '#57f287' }} />
                                ) : (
                                    <FaToggleOff style={{ fontSize: 22, color: '#4e5058' }} />
                                )}
                            </button>
                            <button type="button" style={S.deleteBtn} onClick={() => removeRule(rule.id)}>
                                <FaTrash />
                            </button>
                        </div>

                        {/* Trigger Type */}
                        <div style={S.field}>
                            <label style={S.label}>Tetikleyici</label>
                            <select
                                style={S.select}
                                value={rule.trigger}
                                onChange={e => updateRule(rule.id, 'trigger', e.target.value)}
                            >
                                {TRIGGER_TYPES.map(t => (
                                    <option key={t.key} value={t.key}>{t.label} — {t.desc}</option>
                                ))}
                            </select>
                        </div>

                        {/* Config: Words input for word-based triggers */}
                        {rule.trigger === 'words' && (
                            <div style={S.field}>
                                <label style={S.label}>Yasaklı Kelimeler (virgülle ayır)</label>
                                <input
                                    type="text"
                                    value={rule.config?.words || ''}
                                    onChange={e => updateRule(rule.id, 'config', { ...rule.config, words: e.target.value })}
                                    placeholder="kelime1, kelime2, kelime3..."
                                    style={S.input}
                                />
                            </div>
                        )}

                        {rule.trigger === 'spam' && (
                            <div style={S.field}>
                                <label style={S.label}>Maks mesaj (10 saniyede)</label>
                                <input
                                    type="number"
                                    value={rule.config?.maxMessages || 5}
                                    onChange={e => updateRule(rule.id, 'config', { ...rule.config, maxMessages: Number(e.target.value) })}
                                    style={S.input}
                                    min={2}
                                    max={20}
                                />
                            </div>
                        )}

                        {rule.trigger === 'mentions' && (
                            <div style={S.field}>
                                <label style={S.label}>Maks mention sayısı</label>
                                <input
                                    type="number"
                                    value={rule.config?.maxMentions || 5}
                                    onChange={e => updateRule(rule.id, 'config', { ...rule.config, maxMentions: Number(e.target.value) })}
                                    style={S.input}
                                    min={1}
                                    max={50}
                                />
                            </div>
                        )}

                        {/* Action */}
                        <div style={S.field}>
                            <label style={S.label}>Eylem</label>
                            <div style={S.actionGrid}>
                                {ACTION_TYPES.map(action => {
                                    const Icon = action.icon;
                                    const isSelected = rule.action === action.key;
                                    return (
                                        <button
                                            key={action.key}
                                            type="button"
                                            style={{
                                                ...S.actionBtn,
                                                borderColor: isSelected ? action.color : 'rgba(255,255,255,0.06)',
                                                backgroundColor: isSelected ? `${action.color}15` : 'transparent',
                                            }}
                                            onClick={() => updateRule(rule.id, 'action', action.key)}
                                        >
                                            <Icon style={{ fontSize: 14, color: action.color }} />
                                            <span style={{ color: isSelected ? action.color : '#b5bac1' }}>{action.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button type="button" style={S.saveBtn} onClick={handleSave}>
                <FaSave /> Kuralları Kaydet
            </button>
        </div>
    );
};

const S = {
    container: { padding: 16 },
    header: {
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
    },
    title: { fontSize: 16, fontWeight: 700, color: '#f2f3f5', margin: 0 },
    subtitle: { fontSize: 12, color: '#b5bac1', display: 'block' },
    addBtn: {
        display: 'flex', alignItems: 'center', gap: 6,
        marginLeft: 'auto', padding: '8px 14px', borderRadius: 4,
        border: 'none', backgroundColor: '#5865f2',
        color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer',
    },
    ruleList: {
        display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16,
    },
    ruleCard: {
        backgroundColor: '#2b2d31', borderRadius: 8, padding: 14,
        borderLeft: '3px solid',
    },
    ruleHeader: {
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
    },
    ruleName: {
        flex: 1, background: 'transparent', border: 'none',
        color: '#f2f3f5', fontSize: 15, fontWeight: 600,
        outline: 'none', fontFamily: 'inherit',
    },
    toggleBtn: {
        background: 'transparent', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center',
    },
    deleteBtn: {
        width: 28, height: 28, borderRadius: 4,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: 'none', background: 'transparent',
        color: '#ed4245', cursor: 'pointer', fontSize: 12,
    },
    field: {
        marginBottom: 10,
    },
    label: {
        display: 'block', fontSize: 11, fontWeight: 700, color: '#b5bac1',
        textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4,
    },
    select: {
        width: '100%', backgroundColor: '#1e1f22', border: 'none', borderRadius: 4,
        color: '#dcddde', fontSize: 13, padding: '8px 10px', outline: 'none',
    },
    input: {
        width: '100%', backgroundColor: '#1e1f22', border: 'none', borderRadius: 4,
        color: '#dcddde', fontSize: 13, padding: '8px 10px', outline: 'none',
        boxSizing: 'border-box',
    },
    actionGrid: {
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6,
    },
    actionBtn: {
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '8px 10px', borderRadius: 6,
        border: '1px solid', cursor: 'pointer', background: 'transparent',
        fontSize: 13, transition: 'all 0.15s',
    },
    saveBtn: {
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        padding: '10px 24px', borderRadius: 4,
        border: 'none', backgroundColor: '#57f287',
        color: '#000', fontSize: 14, fontWeight: 600,
        cursor: 'pointer', width: '100%',
    },
};

export default memo(AutoModBuilder);
