import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import './ServerBoost.css';
import confirmDialog from '../../utils/confirmDialog';
import logger from '../../utils/logger';
import { API_BASE_URL } from '../../utils/apiEndpoints';

const ServerBoost = ({ serverId, onClose }) => {
    const [boostData, setBoostData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [boostHistory, setBoostHistory] = useState([]);
    const [showBoostModal, setShowBoostModal] = useState(false);

    const tiers = [
        {
            level: 1,
            boosts: 2,
            perks: [
                '🎨 50 Custom Emojis',
                '🔊 128 Kbps Audio Quality',
                '📺 720p 30fps Streaming',
                '🖼️ Custom Server Icon',
                '🎯 Server Invite Background',
            ],
        },
        {
            level: 2,
            boosts: 7,
            perks: [
                '🎨 100 Custom Emojis',
                '🔊 256 Kbps Audio Quality',
                '📺 1080p 60fps Streaming',
                '🎬 Custom Server Banner',
                '🔗 Vanity URL',
                '📁 50 MB Upload Limit',
            ],
        },
        {
            level: 3,
            boosts: 14,
            perks: [
                '🎨 250 Custom Emojis',
                '🔊 384 Kbps Audio Quality',
                '📺 4K 60fps Streaming',
                '✨ Animated Server Icon',
                '🌟 Custom Server Invite Splash',
                '📁 100 MB Upload Limit',
                '🎪 Discoverable',
            ],
        },
    ];

    useEffect(() => {
        fetchBoostData();
        fetchBoostHistory();
    }, [serverId]);

    const fetchBoostData = async () => {
        try {
            setLoading(true);
            const token = getToken();
            const response = await fetch(`${API_BASE_URL}/boost/${serverId}/status/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setBoostData(data);
            } else {
                logger.error('Failed to fetch boost data');
            }
        } catch (error) {
            logger.error('Error fetching boost data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBoostHistory = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${API_BASE_URL}/boost/${serverId}/history/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setBoostHistory(data.history || []);
            }
        } catch (error) {
            logger.error('Error fetching boost history:', error);
        }
    };

    const boostServer = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${API_BASE_URL}/boost/${serverId}/boost/`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                setShowBoostModal(false);
                fetchBoostData();
                fetchBoostHistory();
            } else {
                const data = await response.json();
                logger.error('❌', data.error || 'Failed to boost server');
            }
        } catch (error) {
            logger.error('Error boosting server:', error);
        }
    };

    const removeBoost = async (boostId) => {
        if (!(await confirmDialog(t('serverBoost.removeConfirm', 'Do you want to remove your boost from this server?'))))
            return;

        try {
            const token = getToken();
            const response = await fetch(`${API_BASE_URL}/boost/${serverId}/${boostId}/remove/`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                fetchBoostData();
                fetchBoostHistory();
            } else {
                logger.error('❌ Failed to remove boost');
            }
        } catch (error) {
            logger.error('Error removing boost:', error);
        }
    };

    const getPerks = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${API_BASE_URL}/boost/${serverId}/perks/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                return data.perks || [];
            }
        } catch (error) {
            logger.error('Error fetching perks:', error);
        }
        return [];
    };

    const getCurrentTier = () => {
        if (!boostData) return 0;
        const boosts = boostData.boost_count || 0;
        if (boosts >= 14) return 3;
        if (boosts >= 7) return 2;
        if (boosts >= 2) return 1;
        return 0;
    };

    const getNextTier = () => {
        const current = getCurrentTier();
        return current < 3 ? current + 1 : null;
    };

    const getProgressToNextTier = () => {
        if (!boostData) return 0;
        const boosts = boostData.boost_count || 0;
        const current = getCurrentTier();

        if (current === 0) return (boosts / 2) * 100;
        if (current === 1) return ((boosts - 2) / 5) * 100;
        if (current === 2) return ((boosts - 7) / 7) * 100;
        return 100;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="boost-overlay">
                <div className="boost-modal">
                    <div className="loading-spinner">{t('serverBoost.loading', 'Loading boost data...')}</div>
                </div>
            </div>
        );
    }

    const currentTier = getCurrentTier();
    const nextTier = getNextTier();
    const progress = getProgressToNextTier();

    return (
        <div
            className="boost-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="boost-modal"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="boost-header">
                    <h2>🚀 Server Boost</h2>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="boost-content">
                    {/* Current Status */}
                    <div className="boost-status-card">
                        <div className="boost-status-header">
                            <div className="current-tier">
                                <span className="tier-label">Mevcut Seviye</span>
                                <span className={`tier-number tier-${currentTier}`}>
                                    {currentTier === 0 ? 'None' : `Tier ${currentTier}`}
                                </span>
                            </div>
                            <div className="boost-count">
                                <span className="boost-icon">🚀</span>
                                <span className="boost-number">
                                    {boostData?.boost_count || 0} Boosts
                                </span>
                            </div>
                        </div>

                        {nextTier && (
                            <div className="boost-progress">
                                <div className="progress-header">
                                    <span>Progress to Tier {nextTier}</span>
                                    <span>
                                        {boostData?.boost_count || 0} / {tiers[nextTier - 1].boosts}
                                    </span>
                                </div>
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${Math.min(progress, 100)}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {currentTier === 3 && (
                            <div className="max-tier-badge">⭐ Maximum Tier Achieved!</div>
                        )}
                    </div>

                    {/* Boost Button */}
                    <div className="boost-action">
                        <button
                            aria-label={t('serverBoost.openBoostModal', 'Boost this server')}
                            className="boost-server-btn"
                            onClick={() => setShowBoostModal(true)}
                        >
                            🚀 Boost This Server
                        </button>
                        <p className="boost-hint">
                            {boostData?.user_has_boost
                                ? '✅ You are currently boosting this server'
                                : 'Support this server with your Nitro boost'}
                        </p>
                    </div>

                    {/* Tier Comparison */}
                    <div className="tiers-grid">
                        {tiers.map((tier, index) => (
                            <div
                                key={tier.level}
                                className={`tier-card ${currentTier >= tier.level ? 'unlocked' : 'locked'}`}
                            >
                                <div className="tier-header">
                                    <span className={`tier-badge tier-${tier.level}`}>
                                        Tier {tier.level}
                                    </span>
                                    <span className="tier-requirement">{tier.boosts} Boosts</span>
                                </div>
                                <div className="tier-perks">
                                    {tier.perks.map((perk, i) => (
                                        <div key={`item-${i}`} className="perk-item">
                                            {currentTier >= tier.level ? '✅' : '🔒'} {perk}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Boost History */}
                    <div className="boost-history-section">
                        <h3>📜 Boost History</h3>
                        {boostHistory.length === 0 ? (
                            <div className="empty-history">
                                <p>{t('serverBoost.noBoosters', 'No one has boosted this server yet')}</p>
                                <p className="empty-hint">Destekleyen ilk siz olun! 🚀</p>
                            </div>
                        ) : (
                            <div className="history-list">
                                {boostHistory.map((boost) => (
                                    <div key={boost.id} className="history-item">
                                        <img
                                            src={boost.user_avatar || '/default-avatar.png'}
                                            alt=""
                                            className="history-avatar"
                                        />
                                        <div className="history-info">
                                            <div className="history-user">{boost.username}</div>
                                            <div className="history-date">
                                                Boosted on {formatDate(boost.created_at)}
                                            </div>
                                        </div>
                                        {boost.is_current_user && (
                                            <button
                                                aria-label={t('serverBoost.removeBoost', 'Remove boost')}
                                                className="remove-boost-btn"
                                                onClick={() => removeBoost(boost.id)}
                                            >
                                                Remove Boost
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Boost Confirmation Modal */}
                {showBoostModal && (
                    <div
                        className="boost-confirm-overlay"
                        role="button"
                        tabIndex={0}
                        onClick={() => setShowBoostModal(false)}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        <div
                            className="boost-confirm-modal"
                            role="button"
                            tabIndex={0}
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                            }
                        >
                            <div className="boost-confirm-icon">🚀</div>
                            <h3>Boost This Server?</h3>
                            <p className="boost-confirm-text">
                                You're about to use one of your Nitro boosts on this server. This
                                will help unlock server perks and features!
                            </p>

                            {nextTier && (
                                <div className="next-tier-preview">
                                    <p className="preview-label">
                                        {boostData?.boost_count + 1 >= tiers[nextTier - 1].boosts
                                            ? `🎉 This boost will unlock Tier ${nextTier}!`
                                            : `Progress towards Tier ${nextTier}`}
                                    </p>
                                </div>
                            )}

                            <div className="modal-actions">
                                <button
                                    aria-label={t('serverBoost.cancelBoost', 'Cancel boost')}
                                    className="cancel-btn"
                                    onClick={() => setShowBoostModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    aria-label={t('serverBoost.confirmBoost', 'Confirm boost')}
                                    className="confirm-boost-btn"
                                    onClick={boostServer}
                                >
                                    🚀 Confirm Boost
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

ServerBoost.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default ServerBoost;
