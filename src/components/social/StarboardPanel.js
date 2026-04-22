/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import './StarboardPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
const StarboardPanel = ({ serverId, onClose }) => {
    const { t } = useTranslation();
    const apiBaseUrl = getApiBase();

    const [config, setConfig] = useState({
        enabled: false,
        channel_id: '',
        emoji: '⭐',
        threshold: 3,
        self_star: false,
        allow_nsfw: false,
    });
    const [stars, setStars] = useState([]);
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchConfig();
        fetchStars();
        fetchChannels();
    }, [serverId]);

    const fetchConfig = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/starboard/server/${serverId}/config/`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (response.ok) {
                const data = await response.json();
                setConfig(data);
            }
        } catch (error) {
            logger.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStars = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/starboard/server/${serverId}/messages/`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (response.ok) {
                const data = await response.json();
                setStars(data);
            }
        } catch (error) {
            logger.error('Error:', error);
        }
    };

    const fetchChannels = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/channels/server/${serverId}/`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (response.ok) {
                const data = await response.json();
                setChannels(data.filter((ch) => ch.type === 'text'));
            }
        } catch (error) {
            logger.error('Error:', error);
        }
    };

    const saveConfig = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/starboard/server/${serverId}/config/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(config),
            });

            if (response.ok) {
                toast.success(t('ui.starboard_ayarları_kaydedildi'));
            } else {
                toast.error(t('common.saveFailed'));
            }
        } catch (error) {
            toast.error(t('common.connectionError'));
        }
    };

    const removeMessage = async (messageId) => {
        try {
            const response = await fetch(`${apiBaseUrl}/starboard/message/${messageId}/remove/`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (response.ok) {
                toast.success(t('starboard.unpinned'));
                fetchStars();
            }
        } catch (error) {
            toast.error(t('common.deleteFailed'));
        }
    };

    return (
        <div
            className="starboard-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="starboard-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="starboard-header">
                    <h2>⭐ Starboard</h2>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="starboard-content">
                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>{t('common.loading')}</p>
                        </div>
                    ) : (
                        <>
                            <div className="config-section">
                                <div className="section-header">
                                    <h3>⚙️ Ayarlar</h3>
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

                                <div className="config-grid">
                                    <div className="form-group">
                                        <label>{t('starboard.channel', '📢 Starboard Channel')}</label>
                                        <select
                                            value={config.channel_id}
                                            onChange={(e) =>
                                                setConfig({ ...config, channel_id: e.target.value })
                                            }
                                        >
                                            <option value="">Selectin</option>
                                            {channels.map((ch) => (
                                                <option key={ch.id} value={ch.id}>
                                                    {ch.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>⭐ Emoji</label>
                                        <input
                                            type="text"
                                            value={config.emoji}
                                            onChange={(e) =>
                                                setConfig({ ...config, emoji: e.target.value })
                                            }
                                            placeholder={t('starboard.emoji', '⭐')}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>{t('starboard.threshold', '🎯 Threshold Value')}</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="50"
                                            value={config.threshold}
                                            onChange={(e) =>
                                                setConfig({
                                                    ...config,
                                                    threshold: parseInt(e.target.value),
                                                })
                                            }
                                        />
                                        <small>
                                            {t('starboard.thresholdDesc', 'Minimum number of stars required for a message to be added to starboard.')}
                                            {t('starboard.starCount', '')}
                                        </small>
                                    </div>

                                    <div className="form-group">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={config.self_star}
                                                onChange={(e) =>
                                                    setConfig({
                                                        ...config,
                                                        self_star: e.target.checked,
                                                    })
                                                }
                                            />
                                            <span>{t('starboard.selfStar', 'Can star own message')}</span>
                                        </label>
                                    </div>

                                    <div className="form-group">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={config.allow_nsfw}
                                                onChange={(e) =>
                                                    setConfig({
                                                        ...config,
                                                        allow_nsfw: e.target.checked,
                                                    })
                                                }
                                            />
                                            <span>NSFW kanallardan izin ver</span>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    aria-label={t('starboard.saveConfig', 'Save configuration')}
                                    className="save-btn"
                                    onClick={saveConfig}
                                >
                                    💾 Kaydet
                                </button>
                            </div>

                            <div className="stars-section">
                                <h3>⭐ {t('starboard.messages', 'Starboard Messages')} ({stars.length})</h3>
                                {stars.length === 0 ? (
                                    <div className="empty-state">
                                        <span className="empty-icon">⭐</span>
                                        <p>{t('starboard.noMessages', 'No starboard messages yet')}</p>
                                    </div>
                                ) : (
                                    <div className="stars-list">
                                        {stars.map((star) => (
                                            <div key={star.message_id} className="star-card">
                                                <div className="star-header">
                                                    <div className="star-author">
                                                        {star.author_avatar ? (
                                                            <img src={star.author_avatar} alt="" />
                                                        ) : (
                                                            <div className="default-avatar">👤</div>
                                                        )}
                                                        <span>{star.author_name}</span>
                                                    </div>
                                                    <div className="star-count">
                                                        <span>
                                                            {config.emoji} {star.star_count}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="star-content">
                                                    <p>{star.content}</p>
                                                    {star.attachments &&
                                                        star.attachments.length > 0 && (
                                                            <div className="star-attachments">
                                                                {star.attachments.map(
                                                                    (att, idx) => (
                                                                        <img
                                                                            key={`item-${idx}`}
                                                                            src={att}
                                                                            alt=""
                                                                        />
                                                                    )
                                                                )}
                                                            </div>
                                                        )}
                                                </div>
                                                <div className="star-footer">
                                                    <span className="star-channel">
                                                        {star.channel_name}
                                                    </span>
                                                    <span className="star-time">
                                                        {new Date(star.created_at).toLocaleString(
                                                            'tr-TR'
                                                        )}
                                                    </span>
                                                    <button
                                                        aria-label={t('starboard.removeMessage', 'Remove from starboard')}
                                                        onClick={() =>
                                                            removeMessage(star.message_id)
                                                        }
                                                    >
                                                        🗑️
                                                    </button>
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
        </div>
    );
};

StarboardPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default StarboardPanel;
