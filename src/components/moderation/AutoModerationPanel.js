/* eslint-disable no-irregular-whitespace */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { getToken } from '../../utils/tokenStorage';
// frontend/src/components/AutoModerationPanel.js

import { useState, useEffect, useCallback, memo } from 'react';

import PropTypes from 'prop-types';

import {
    FaShieldAlt,
    FaBan,
    FaExclamationTriangle,
    FaRobot,
    FaPlus,
    FaEdit,
    FaTrash,
    FaToggleOn,
    FaToggleOff,
} from 'react-icons/fa';

import toast from '../../utils/toast';

import './AutoModerationPanel.css';

import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';

const AutoModerationPanel = memo(({ serverId, onClose }) => {
    const { t } = useTranslation();

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

        duration: 60,
    });

    useEffect(() => {
        fetchRules();
    }, [serverId]);

    const fetchRules = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/moderation/${serverId}/rules/`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            if (response.ok) {
                const data = await response.json();

                setRules(data.rules || []);
            }
        } catch (error) {
            toast.error(t('autoMod.loadFailed'));
        } finally {
            setLoading(false);
        }
    };

    const createRule = async () => {
        if (!newRule.name.trim()) {
            toast.error(t('ui.kural_adi_girin'));

            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/moderation/${serverId}/rules/create/`, {
                method: 'POST',

                headers: {
                    Authorization: `Bearer ${getToken()}`,

                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(newRule),
            });

            if (response.ok) {
                const data = await response.json();

                setRules([...rules, data.rule]);

                setShowCreateRule(false);

                resetNewRule();

                toast.success(t('autoMod.created'));
            } else {
                toast.error(t('ui.kural_olusturulamadi'));
            }
        } catch (error) {
            toast.error(t('autoMod.connectionError'));
        }
    };

    const updateRule = async (ruleId, updates) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/moderation/${serverId}/rules/${ruleId}/`,
                {
                    method: 'PUT',

                    headers: {
                        Authorization: `Bearer ${getToken()}`,

                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify(updates),
                }
            );

            if (response.ok) {
                const data = await response.json();

                setRules(rules.map((r) => (r.id === ruleId ? data.rule : r)));

                setEditingRule(null);

                toast.success(t('autoMod.updated'));
            }
        } catch (error) {
            toast.error(t('autoMod.updateFailed'));
        }
    };

    const deleteRule = async (ruleId) => {
        if (!(await confirmDialog(t('moderation.deleteRuleConfirm')))) return;

        try {
            const response = await fetch(
                `${API_BASE_URL}/moderation/${serverId}/rules/${ruleId}/`,
                {
                    method: 'DELETE',

                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                }
            );

            if (response.ok) {
                setRules(rules.filter((r) => r.id !== ruleId));

                toast.success(t('autoMod.deleted'));
            }
        } catch (error) {
            toast.error(t('autoMod.deleteFailed'));
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

            duration: 60,
        });
    };

    const addKeyword = useCallback((keyword) => {
        if (keyword.trim()) {
            setNewRule((prev) => {
                if (prev.keywords.includes(keyword.trim())) return prev;

                return { ...prev, keywords: [...prev.keywords, keyword.trim()] };
            });
        }
    }, []);

    const removeKeyword = useCallback((keyword) => {
        setNewRule((prev) => ({ ...prev, keywords: prev.keywords.filter((k) => k !== keyword) }));
    }, []);

    const getRuleIcon = (type) => {
        switch (type) {
            case 'spam':
                return <FaBan />;

            case 'profanity':
                return <FaExclamationTriangle />;

            case 'caps':
                return '🔤';

            case 'links':
                return '🔗';

            case 'mentions':
                return '@';

            default:
                return <FaShieldAlt />;
        }
    };

    const getActionColor = (action) => {
        switch (action) {
            case 'warn':
                return '#f0b232';

            case 'mute':
                return '#ff9500';

            case 'kick':
                return '#f23f42';

            case 'ban':
                return '#ff0000';

            default:
                return '#5865f2';
        }
    };

    const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);

    const handleShowCreateRule = useCallback(() => setShowCreateRule(true), []);

    const handleHideCreateRule = useCallback(() => setShowCreateRule(false), []);

    const handleNameChange = useCallback(
        (e) => setNewRule((prev) => ({ ...prev, name: e.target.value })),
        []
    );

    const handleTypeChange = useCallback(
        (e) => setNewRule((prev) => ({ ...prev, type: e.target.value })),
        []
    );

    const handleActionChange = useCallback(
        (e) => setNewRule((prev) => ({ ...prev, action: e.target.value })),
        []
    );

    const handleThresholdChange = useCallback(
        (e) => setNewRule((prev) => ({ ...prev, threshold: parseInt(e.target.value) })),
        []
    );

    const handleDurationChange = useCallback(
        (e) => setNewRule((prev) => ({ ...prev, duration: parseInt(e.target.value) })),
        []
    );

    const handleKeywordKeyPress = useCallback(
        (e) => {
            if (e.key === 'Enter') {
                addKeyword(e.target.value);
                e.target.value = '';
            }
        },
        [addKeyword]
    );

    return (
        <div
            className="auto-mod-panel-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="auto-mod-panel"
                role="button"
                tabIndex={0}
                onClick={handleStopPropagation}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="panel-header">
                    <FaRobot className="header-icon" />

                    <h2>Otomatik Moderasyon</h2>

                    <button aria-label="Close" className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="panel-actions">
                    <button
                        aria-label="handle Show Create Rule"
                        className="btn-create"
                        onClick={handleShowCreateRule}
                    >
                        <FaPlus /> Yeni Kural
                    </button>
                </div>

                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>

                        <p>{t('common.loading')}</p>
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
                                <div
                                    key={rule.id}
                                    className={`rule-card ${!rule.enabled ? 'disabled' : ''}`}
                                >
                                    <div className="rule-header">
                                        <div className="rule-icon">{getRuleIcon(rule.type)}</div>

                                        <div className="rule-info">
                                            <h3>{rule.name}</h3>

                                            <span className="rule-type">{rule.type}</span>
                                        </div>

                                        <div className="rule-actions">
                                            <button
                                                aria-label="Action button"
                                                className="action-btn toggle"
                                                onClick={() => toggleRule(rule.id, !rule.enabled)}
                                                title={
                                                    rule.enabled
                                                        ? t('ui.devre_disi_birak')
                                                        : 'Enable'
                                                }
                                            >
                                                {rule.enabled ? <FaToggleOn /> : <FaToggleOff />}
                                            </button>

                                            <button
                                                aria-label="Action button"
                                                className="action-btn edit"
                                                onClick={() => setEditingRule(rule)}
                                                title={t('common.edit')}
                                            >
                                                <FaEdit />
                                            </button>

                                            <button
                                                aria-label="Action button"
                                                className="action-btn delete"
                                                onClick={() => deleteRule(rule.id)}
                                                title={t('common.delete')}
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
                                                style={{
                                                    backgroundColor: getActionColor(rule.action),
                                                }}
                                            >
                                                {rule.action}
                                            </span>
                                        </div>

                                        {rule.keywords && rule.keywords.length > 0 && (
                                            <div className="detail-item">
                                                <span className="label">Keywords:</span>

                                                <div className="keywords">
                                                    {rule.keywords.map((kw, i) => (
                                                        <span key={`item-${i}`} className="keyword">
                                                            {kw}
                                                        </span>
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
                                    onChange={handleNameChange}
                                    placeholder={t('ui.orn_spam_blockme')}
                                    aria-label="Name"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Kural Tipi</label>

                                    <select
                                        value={newRule.type}
                                        onChange={handleTypeChange}
                                        aria-label="select"
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
                                        onChange={handleActionChange}
                                        aria-label="select"
                                    >
                                        <option value="warn">Uyar</option>

                                        <option value="mute">Mute</option>

                                        <option value="kick">At</option>

                                        <option value="ban">Ban</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Keywords (Enter with add)</label>

                                <input
                                    type="text"
                                    placeholder="Kelime girin ve Enter'a basın"
                                    onKeyDown={handleKeywordKeyPress}
                                    aria-label="Kelime girin ve Enter'a basın"
                                />

                                <div className="keywords-list">
                                    {newRule.keywords.map((kw, i) => (
                                        <span key={`item-${i}`} className="keyword-chip">
                                            {kw}

                                            <button
                                                aria-label="Delete"
                                                onClick={() => removeKeyword(kw)}
                                            >
                                                ×
                                            </button>
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
                                        onChange={handleThresholdChange}
                                        min="1"
                                        aria-label="number"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Duration (saniye)</label>

                                    <input
                                        type="number"
                                        value={newRule.duration}
                                        onChange={handleDurationChange}
                                        min="1"
                                        aria-label="number"
                                    />
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button
                                    aria-label="handle Hide Create Rule"
                                    className="btn-cancel"
                                    onClick={handleHideCreateRule}
                                >
                                    Cancel
                                </button>

                                <button
                                    aria-label="create Rule"
                                    className="btn-save"
                                    onClick={createRule}
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

AutoModerationPanel.propTypes = {
    serverId: PropTypes.string,

    onClose: PropTypes.func,
};

export default AutoModerationPanel;
