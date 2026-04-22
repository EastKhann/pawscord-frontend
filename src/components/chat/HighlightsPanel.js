/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { getToken } from '../../utils/tokenStorage';

import PropTypes from 'prop-types';

import './HighlightsPanel.css';

import { toast } from 'react-toastify';

import DOMPurify from 'dompurify';

import { api } from '../../services/ApiService'; // 🚀 Centralized API service

import confirmDialog from '../../utils/confirmDialog';

import { useTranslation } from 'react-i18next';

import logger from '../../utils/logger';

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const HighlightsPanel = ({ serverId, onClose }) => {
    const { t } = useTranslation();

    const [config, setConfig] = useState({
        enabled: false,

        keywords: [],

        dm_notifications: true,

        highlight_color: '#fbbf24',
    });

    const [highlights, setHighlights] = useState([]);

    const [loading, setLoading] = useState(true);

    const [newKeyword, setNewKeyword] = useState('');

    useEffect(() => {
        fetchConfig();

        fetchHighlights();
    }, [serverId]);

    const fetchConfig = async () => {
        try {
            // 🚀 Using centralized ApiService instead of direct fetch

            const data = await api.get(`/highlights/server/${serverId}/config/`);

            setConfig(data);
        } catch (error) {
            logger.error('Fetch config error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchHighlights = async () => {
        try {
            // 🚀 Using centralized ApiService

            const data = await api.get(`/highlights/server/${serverId}/messages/`);

            setHighlights(data);
        } catch (error) {
            logger.error('Fetch highlights error:', error);
        }
    };

    const saveConfig = async () => {
        try {
            // 🚀 Using centralized ApiService

            await api.post(`/highlights/server/${serverId}/config/`, config);

            toast.success(t('ui.highlight_ayarları_kaydedildi'));
        } catch (error) {
            logger.error('Save config error:', error);

            toast.error(t('highlights.saveError'));
        }
    };

    const addKeyword = () => {
        if (!newKeyword.trim()) return;

        if (config.keywords.includes(newKeyword.toLowerCase())) {
            toast.warning(t('highlights.wordAlreadyAdded'));

            return;
        }

        setConfig({ ...config, keywords: [...config.keywords, newKeyword.toLowerCase()] });

        setNewKeyword('');
    };

    const removeKeyword = (keyword) => {
        setConfig({ ...config, keywords: config.keywords.filter((k) => k !== keyword) });
    };

    const clearHighlights = async () => {
        if (!(await confirmDialog(t('highlights.clearConfirm', 'Are you sure you want to clear all highlight history?'))))
            return;

        try {
            const response = await fetch(`${apiBaseUrl}/highlights/server/${serverId}/clear/`, {
                method: 'POST',

                headers: { Authorization: `Bearer ${getToken()}` },
            });

            if (response.ok) {
                toast.success(t('highlights.historyCleared'));

                setHighlights([]);
            }
        } catch (error) {
            toast.error(t('ui.clearme_hatasi'));
        }
    };

    return (
        <div
            className="highlights-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="highlights-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="highlights-header">
                    <h2>✨ Highlight Sistemi</h2>

                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="highlights-content">
                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>

                            <p>{t('common.loading')}</p>
                        </div>
                    ) : (
                        <>
                            <div className="config-section">
                                <div className="section-header">
                                    <h3>⚙ Ayarlar</h3>

                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={config.enabled}
                                            onChange={(e) =>
                                                setConfig({ ...config, enabled: e.target.checked })
                                            }
                                        />

                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>

                                <div className="keywords-section">
                                    <h4>🔑 Keywords</h4>

                                    <div className="keyword-input">
                                        <input
                                            type="text"
                                            value={newKeyword}
                                            onChange={(e) => setNewKeyword(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && addKeyword()}
                                            placeholder={t('highlights.addKeyword', 'Add keyword...')}
                                            aria-label={t('highlights.keywordInput', 'New keyword')}
                                        />

                                        <button
                                            aria-label={t('highlights.addKeywordBtn', 'Add keyword')}
                                            onClick={addKeyword}
                                        >
                                            ➕
                                        </button>
                                    </div>

                                    {config.keywords.length > 0 && (
                                        <div className="keywords-list">
                                            {config.keywords.map((keyword, idx) => (
                                                <div key={`item-${idx}`} className="keyword-tag">
                                                    <span>{keyword}</span>

                                                    <button
                                                        aria-label={t('common.delete')}
                                                        onClick={() => removeKeyword(keyword)}
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="config-options">
                                    <div className="form-group">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={config.dm_notifications}
                                                onChange={(e) =>
                                                    setConfig({
                                                        ...config,
                                                        dm_notifications: e.target.checked,
                                                    })
                                                }
                                            />

                                            <span>{t('highlights.sendDmNotifs', 'Send DM notifications')}</span>
                                        </label>
                                    </div>

                                    <div className="form-group">
                                        <label>Vurgu Rengi</label>

                                        <input
                                            type="color"
                                            value={config.highlight_color}
                                            onChange={(e) =>
                                                setConfig({
                                                    ...config,
                                                    highlight_color: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <button
                                    aria-label={t('highlights.saveConfig', 'Save highlight settings')}
                                    className="save-btn"
                                    onClick={saveConfig}
                                >
                                    💾 Kaydet
                                </button>
                            </div>

                            <div className="highlights-section">
                                <div className="section-header">
                                    <h3> {t('highlights.history', 'Highlight History')} ({highlights.length})</h3>

                                    {highlights.length > 0 && (
                                        <button
                                            aria-label={t('highlights.clearHighlights', 'Clear highlights')}
                                            className="clear-btn"
                                            onClick={clearHighlights}
                                        >
                                            🗑 Clear
                                        </button>
                                    )}
                                </div>

                                {highlights.length === 0 ? (
                                    <div className="empty-state">
                                        <span className="empty-icon">✨</span>

                                        <p>{t('highlights.none', 'No highlights yet')}</p>
                                    </div>
                                ) : (
                                    <div className="highlights-list">
                                        {highlights.map((hl) => (
                                            <div key={hl.id} className="highlight-card">
                                                <div className="highlight-header">
                                                    <div className="highlight-author">
                                                        {hl.author_avatar ? (
                                                            <img src={hl.author_avatar} alt="" />
                                                        ) : (
                                                            <div className="default-avatar">👤</div>
                                                        )}

                                                        <div className="author-info">
                                                            <span className="author-name">
                                                                {hl.author_name}
                                                            </span>

                                                            <span className="channel-name">
                                                                {hl.channel_name}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <span className="highlight-time">
                                                        {new Date(hl.created_at).toLocaleString(
                                                            'tr-TR'
                                                        )}
                                                    </span>
                                                </div>

                                                <div className="highlight-content">
                                                    <p
                                                        dangerouslySetInnerHTML={{
                                                            __html: DOMPurify.sanitize(
                                                                config.keywords.length > 0
                                                                    ? hl.content.replace(
                                                                        new RegExp(
                                                                            `(${config.keywords.map(escapeRegex).join('|')})`,
                                                                            'gi'
                                                                        ),

                                                                        `<mark style="background: ${config.highlight_color}; color: #000; padding: 2px 4px; border-radius: 4px;">$1</mark>`
                                                                    )
                                                                    : hl.content
                                                            ),
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div >
    );
};

HighlightsPanel.propTypes = {
    serverId: PropTypes.string,

    onClose: PropTypes.func,
};

export default HighlightsPanel;
