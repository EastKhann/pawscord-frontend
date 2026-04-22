/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect, useCallback, memo } from 'react';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import './SuggestionsPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const SuggestionsPanel = ({ serverId, onClose }) => {
    const { t } = useTranslation();
    const apiBaseUrl = getApiBase();

    const [config, setConfig] = useState({
        enabled: false,
        channel_id: '',
        review_channel_id: '',
        auto_approve: false,
        upvote_emoji: '👍',
        downvote_emoji: '👎',
        min_votes_to_approve: 10,
    });
    const [suggestions, setSuggestions] = useState([]);
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchConfig();
        fetchSuggestions();
        fetchChannels();
    }, [serverId]);

    const fetchConfig = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/suggestions/server/${serverId}/config/`, {
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

    const fetchSuggestions = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/suggestions/server/${serverId}/`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (response.ok) {
                const data = await response.json();
                setSuggestions(data);
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
            const response = await fetch(`${apiBaseUrl}/suggestions/server/${serverId}/config/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(config),
            });

            if (response.ok) {
                toast.success(t('ui.oneri_ayarları_kaydedildi'));
            } else {
                toast.error(t('common.saveFailed'));
            }
        } catch (error) {
            toast.error(t('common.connectionError'));
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const response = await fetch(`${apiBaseUrl}/suggestions/${id}/status/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });
            if (response.ok) {
                toast.success(
                    t(
                        status === 'approved'
                            ? 'suggestions.approved'
                            : status === 'rejected'
                                ? 'suggestions.rejected'
                                : 'suggestions.updated'
                    )
                );
                fetchSuggestions();
            }
        } catch (error) {
            toast.error(t('suggestions.updateError'));
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: { text: 'Pending', color: '#f59e0b', icon: '⏳' },
            approved: { text: 'Confirmed', color: '#22c55e', icon: '✅' },
            rejected: { text: 'Rejected', color: '#f23f42', icon: '❌' },
            implemented: { text: t('ui.uygulandi'), color: '#5865f2', icon: '🎉' },
        };
        return badges[status] || badges.pending;
    };

    const filteredSuggestions = suggestions.filter((s) => filter === 'all' || s.status === filter);

    // 🎯 Performance: Memoized event handlers
    const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
    const handleEnabledChange = useCallback(
        (e) => setConfig((prev) => ({ ...prev, enabled: e.target.checked })),
        []
    );
    const handleChannelIdChange = useCallback(
        (e) => setConfig((prev) => ({ ...prev, channel_id: e.target.value })),
        []
    );
    const handleReviewChannelChange = useCallback(
        (e) => setConfig((prev) => ({ ...prev, review_channel_id: e.target.value })),
        []
    );
    const handleUpvoteEmojiChange = useCallback(
        (e) => setConfig((prev) => ({ ...prev, upvote_emoji: e.target.value })),
        []
    );
    const handleDownvoteEmojiChange = useCallback(
        (e) => setConfig((prev) => ({ ...prev, downvote_emoji: e.target.value })),
        []
    );
    const handleMinVotesChange = useCallback(
        (e) => setConfig((prev) => ({ ...prev, min_votes_to_approve: parseInt(e.target.value) })),
        []
    );
    const handleAutoApproveChange = useCallback(
        (e) => setConfig((prev) => ({ ...prev, auto_approve: e.target.checked })),
        []
    );
    const handleFilterAll = useCallback(() => setFilter('all'), []);
    const handleFilterPending = useCallback(() => setFilter('pending'), []);
    const handleFilterApproved = useCallback(() => setFilter('approved'), []);
    const handleFilterRejected = useCallback(() => setFilter('rejected'), []);

    return (
        <div
            className="suggestions-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="suggestions-panel"
                role="button"
                tabIndex={0}
                onClick={handleStopPropagation}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="suggestions-header">
                    <h2>💡 {t('suggestions.title', 'Suggestion System')}</h2>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="suggestions-content">
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
                                            onChange={handleEnabledChange}
                                            aria-label={t('suggestions.enableToggle', 'Enable suggestions')}>
                                    </label>
                                </div>

                                <div className="config-grid">
                                    <div className="form-group">
                                        <label>{t('suggestions.suggestionChannel', '📢 Suggestion Channel')}</label>
                                        <select
                                            value={config.channel_id}
                                            onChange={handleChannelIdChange}
                                            aria-label={t('suggestions.channelSelect', 'Select suggestion channel')}
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
                                        <label>{t('suggestions.likeEmoji', '👍 Like Emoji')}</label>
                                        <input
                                            type="text"
                                            value={config.upvote_emoji}
                                            onChange={handleUpvoteEmojiChange}
                                            aria-label={t('suggestions.upvoteEmoji', 'Upvote emoji')}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>{t('suggestions.autoApproveThreshold', '🎯 Auto Approve Threshold')}</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={config.min_votes_to_approve}
                                            onChange={handleMinVotesChange}
                                            aria-label={t('suggestions.minVotes', 'Minimum votes to approve')}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={config.auto_approve}
                                                onChange={handleAutoApproveChange}
                                                aria-label={t('suggestions.autoApprove', 'Auto approve')}>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    aria-label={t('common.save', 'Save')}
                                    className="save-btn"
                                    onClick={saveConfig}
                                >
                                    💾 Kaydet
                                </button>
                            </div>

                            <div className="suggestions-section">
                                <div className="suggestions-filters">
                                    <button
                                        aria-label={t('suggestions.filterAll', 'Show all suggestions')}
                                        className={filter === 'all' ? 'active' : ''}
                                        onClick={handleFilterAll}
                                    >
                                        Hepsi ({suggestions.length})
                                    </button>
                                    <button
                                        aria-label={t('suggestions.filterPending', 'Show pending suggestions')}
                                        className={filter === 'pending' ? 'active' : ''}
                                        onClick={handleFilterPending}
                                    >
                                        Bekliyor (
                                        {suggestions.filter((s) => s.status === 'pending').length})
                                    </button>
                                    <button
                                        aria-label={t('suggestions.filterApproved', 'Show approved suggestions')}
                                        className={filter === 'approved' ? 'active' : ''}
                                        onClick={handleFilterApproved}
                                    >
                                        {t('suggestions.approved', 'Approved (')}
                                        {suggestions.filter((s) => s.status === 'approved').length})
                                    </button>
                                    <button
                                        aria-label={t('suggestions.filterRejected', 'Show rejected suggestions')}
                                        className={filter === 'rejected' ? 'active' : ''}
                                        onClick={handleFilterRejected}
                                    >
                                        Reddedildi (
                                        {suggestions.filter((s) => s.status === 'rejected').length})
                                    </button>
                                </div>

                                {filteredSuggestions.length === 0 ? (
                                    <div className="empty-state">
                                        <span className="empty-icon">💡</span>
                                        <p>{t('suggestions.notFound', 'No suggestions found')}</p>
                                    </div>
                                ) : (
                                    <div className="suggestions-list">
                                        {filteredSuggestions.map((suggestion) => {
                                            const badge = getStatusBadge(suggestion.status);
                                            return (
                                                <div
                                                    key={suggestion.id}
                                                    className="suggestion-card"
                                                >
                                                    <div className="suggestion-header">
                                                        <div className="suggestion-author">
                                                            {suggestion.author_avatar ? (
                                                                <img
                                                                    src={suggestion.author_avatar}
                                                                    alt=""
                                                                />
                                                            ) : (
                                                                <div className="default-avatar">
                                                                    👤
                                                                </div>
                                                            )}
                                                            <span>{suggestion.author_name}</span>
                                                        </div>
                                                        <span
                                                            className="status-badge"
                                                            style={{ background: badge.color }}
                                                        >
                                                            {badge.icon} {badge.text}
                                                        </span>
                                                    </div>
                                                    <div className="suggestion-content">
                                                        <h4>{suggestion.title}</h4>
                                                        <p>{suggestion.description}</p>
                                                    </div>
                                                    <div className="suggestion-votes">
                                                        <span className="upvotes">
                                                            {config.upvote_emoji}{' '}
                                                            {suggestion.upvotes}
                                                        </span>
                                                        <span className="downvotes">
                                                            {config.downvote_emoji}{' '}
                                                            {suggestion.downvotes}
                                                        </span>
                                                    </div>
                                                    {suggestion.status === 'pending' && (
                                                        <div className="suggestion-actions">
                                                            <button
                                                                aria-label={t('suggestions.approve', 'Approve suggestion')}
                                                                className="approve-btn"
                                                                onClick={() =>
                                                                    updateStatus(
                                                                        suggestion.id,
                                                                        'approved'
                                                                    )
                                                                }
                                                            >
                                                                ✅ Onayla
                                                            </button>
                                                            <button
                                                                aria-label={t('suggestions.reject', 'Reject suggestion')}
                                                                className="reject-btn"
                                                                onClick={() =>
                                                                    updateStatus(
                                                                        suggestion.id,
                                                                        'rejected'
                                                                    )
                                                                }
                                                            >
                                                                ❌ Reddet
                                                            </button>
                                                            <button
                                                                aria-label={t('common.implemented', 'Implemented')}
                                                                className="implement-btn"
                                                                onClick={() =>
                                                                    updateStatus(
                                                                        suggestion.id,
                                                                        'implemented'
                                                                    )
                                                                }
                                                            >
                                                                {t('suggestions.implemented', '🎉 Implemented')}
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
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

SuggestionsPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default memo(SuggestionsPanel);
