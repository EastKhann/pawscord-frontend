import React, { useState, useEffect } from 'react';
import {
    FaUserPlus, FaTimes, FaLink, FaCopy, FaGift, FaTrophy,
    FaUsers, FaChartLine, FaCalendar, FaCheckCircle, FaClock,
    FaCoins, FaShare, FaQrcode, FaHistory
} from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';
import './ReferralManagementPanel.css';
import toast from '../utils/toast';

const ReferralManagementPanel = ({ userId, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [referralData, setReferralData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        loadReferralData();
    }, [userId]);

    const loadReferralData = async () => {
        setLoading(true);
        try {
            const baseUrl = apiBaseUrl || getApiBase();
            if (fetchWithAuth) {
                const response = await fetchWithAuth(`${baseUrl}/api/referrals/`);
                if (response.ok) {
                    const data = await response.json();
                    setReferralData(data || {
                        referral_code: '',
                        referral_link: '',
                        stats: { total_referrals: 0, active_referrals: 0, pending_referrals: 0, total_rewards: 0, available_rewards: 0, this_month: 0 },
                        rewards: [],
                        recent_referrals: [],
                        leaderboard: []
                    });
                } else {
                    setReferralData({
                        referral_code: '',
                        referral_link: '',
                        stats: { total_referrals: 0, active_referrals: 0, pending_referrals: 0, total_rewards: 0, available_rewards: 0, this_month: 0 },
                        rewards: [],
                        recent_referrals: [],
                        leaderboard: []
                    });
                }
            } else {
                setReferralData({
                    referral_code: '',
                    referral_link: '',
                    stats: { total_referrals: 0, active_referrals: 0, pending_referrals: 0, total_rewards: 0, available_rewards: 0, this_month: 0 },
                    rewards: [],
                    recent_referrals: [],
                    leaderboard: []
                });
            }
        } catch (error) {
            console.error('Error loading referral data:', error);
            setReferralData({
                referral_code: '',
                referral_link: '',
                stats: { total_referrals: 0, active_referrals: 0, pending_referrals: 0, total_rewards: 0, available_rewards: 0, this_month: 0 },
                rewards: [],
                recent_referrals: [],
                leaderboard: []
            });
        }
        setLoading(false);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClaimReward = (tier) => {
        toast.info(`Claiming reward for Tier ${tier}...`);
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString();
    };

    const getBadgeColor = (badge) => {
        const colors = {
            bronze: '#cd7f32',
            silver: '#c0c0c0',
            gold: '#ffd700',
            platinum: '#e5e4e2',
            diamond: '#b9f2ff'
        };
        return colors[badge] || '#6366f1';
    };

    if (loading) {
        return (
            <div className="referral-overlay" onClick={onClose}>
                <div className="referral-panel" onClick={e => e.stopPropagation()}>
                    <div className="loading">Loading referral data...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="referral-overlay" onClick={onClose}>
            <div className="referral-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <div className="header-info">
                        <h2>
                            <FaUserPlus />
                            Referral Program
                        </h2>
                        <span className="subtitle">Invite friends and earn rewards!</span>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Referral Link Section */}
                <div className="referral-link-section">
                    <div className="link-box">
                        <div className="link-info">
                            <span className="link-label">Your Referral Link</span>
                            <div className="link-row">
                                <FaLink className="link-icon" />
                                <input
                                    type="text"
                                    value={referralData?.referral_link}
                                    readOnly
                                />
                                <button
                                    className={`copy-btn ${copied ? 'copied' : ''}`}
                                    onClick={() => copyToClipboard(referralData?.referral_link)}
                                >
                                    {copied ? <FaCheckCircle /> : <FaCopy />}
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                            <span className="referral-code">
                                Code: <strong>{referralData?.referral_code}</strong>
                            </span>
                        </div>
                        <div className="share-buttons">
                            <button className="share-btn">
                                <FaShare /> Share
                            </button>
                            <button className="qr-btn">
                                <FaQrcode /> QR Code
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="stats-bar">
                    <div className="stat-item">
                        <span className="stat-value">{referralData?.stats.total_referrals}</span>
                        <span className="stat-label">Total</span>
                    </div>
                    <div className="stat-item active">
                        <span className="stat-value">{referralData?.stats.active_referrals}</span>
                        <span className="stat-label">Active</span>
                    </div>
                    <div className="stat-item pending">
                        <span className="stat-value">{referralData?.stats.pending_referrals}</span>
                        <span className="stat-label">Pending</span>
                    </div>
                    <div className="stat-item rewards">
                        <span className="stat-value">
                            <FaCoins /> {referralData?.stats.available_rewards}
                        </span>
                        <span className="stat-label">Available</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs-bar">
                    <button
                        className={activeTab === 'overview' ? 'active' : ''}
                        onClick={() => setActiveTab('overview')}
                    >
                        <FaChartLine /> Overview
                    </button>
                    <button
                        className={activeTab === 'rewards' ? 'active' : ''}
                        onClick={() => setActiveTab('rewards')}
                    >
                        <FaGift /> Rewards
                    </button>
                    <button
                        className={activeTab === 'history' ? 'active' : ''}
                        onClick={() => setActiveTab('history')}
                    >
                        <FaHistory /> History
                    </button>
                    <button
                        className={activeTab === 'leaderboard' ? 'active' : ''}
                        onClick={() => setActiveTab('leaderboard')}
                    >
                        <FaTrophy /> Leaderboard
                    </button>
                </div>

                <div className="content">
                    {activeTab === 'overview' && referralData && (
                        <div className="overview-tab">
                            {/* Progress Card */}
                            <div className="progress-card">
                                <h3>Next Reward</h3>
                                <div className="progress-info">
                                    <span className="progress-text">
                                        {referralData.stats.total_referrals} / 25 referrals
                                    </span>
                                    <span className="progress-reward">Gold Badge + 3000 Coins</span>
                                </div>
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${(referralData.stats.total_referrals / 25) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="progress-remaining">
                                    {25 - referralData.stats.total_referrals} more referrals needed
                                </span>
                            </div>

                            {/* Recent Referrals Preview */}
                            <div className="section">
                                <h3><FaUsers /> Recent Referrals</h3>
                                <div className="referrals-preview">
                                    {referralData.recent_referrals.slice(0, 3).map(ref => (
                                        <div key={ref.id} className="referral-item">
                                            <div className="referral-avatar">
                                                {ref.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="referral-info">
                                                <span className="referral-name">{ref.username}</span>
                                                <span className="referral-date">
                                                    <FaCalendar /> {formatDate(ref.joined)}
                                                </span>
                                            </div>
                                            <span className={`status-badge ${ref.status}`}>
                                                {ref.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'rewards' && referralData && (
                        <div className="rewards-tab">
                            <div className="rewards-list">
                                {referralData.rewards.map((reward, i) => (
                                    <div
                                        key={i}
                                        className={`reward-item ${reward.claimed ? 'claimed' : ''} ${referralData.stats.total_referrals >= reward.referrals_needed ? 'unlocked' : ''}`}
                                    >
                                        <div className="reward-tier">
                                            <span className="tier-number">Tier {reward.tier}</span>
                                            <span className="tier-requirement">{reward.referrals_needed} Referrals</span>
                                        </div>
                                        <div className="reward-details">
                                            <span className="reward-description">{reward.description}</span>
                                            <div className="reward-value">
                                                <FaCoins /> {reward.reward}
                                            </div>
                                        </div>
                                        <div className="reward-action">
                                            {reward.claimed ? (
                                                <span className="claimed-badge">
                                                    <FaCheckCircle /> Claimed
                                                </span>
                                            ) : referralData.stats.total_referrals >= reward.referrals_needed ? (
                                                <button
                                                    className="claim-btn"
                                                    onClick={() => handleClaimReward(reward.tier)}
                                                >
                                                    Claim
                                                </button>
                                            ) : (
                                                <span className="locked-badge">
                                                    <FaClock /> {reward.referrals_needed - referralData.stats.total_referrals} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && referralData && (
                        <div className="history-tab">
                            <div className="history-list">
                                {referralData.recent_referrals.map(ref => (
                                    <div key={ref.id} className="history-item">
                                        <div className="history-avatar">
                                            {ref.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="history-info">
                                            <span className="history-name">{ref.username}</span>
                                            <span className="history-date">
                                                <FaCalendar /> Joined {formatDate(ref.joined)}
                                            </span>
                                        </div>
                                        <span className={`status-badge ${ref.status}`}>
                                            {ref.status === 'active' && <FaCheckCircle />}
                                            {ref.status === 'pending' && <FaClock />}
                                            {ref.status}
                                        </span>
                                        <span className="history-reward">
                                            {ref.reward_earned > 0 ? (
                                                <>+{ref.reward_earned} <FaCoins /></>
                                            ) : (
                                                '-'
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'leaderboard' && referralData && (
                        <div className="leaderboard-tab">
                            <div className="leaderboard-list">
                                {referralData.leaderboard.map((user, i) => (
                                    <div
                                        key={i}
                                        className={`leaderboard-item ${user.isUser ? 'current-user' : ''} ${user.rank <= 3 ? 'top-three' : ''}`}
                                    >
                                        <span className={`rank rank-${user.rank}`}>
                                            {user.rank <= 3 ? <FaTrophy /> : `#${user.rank}`}
                                        </span>
                                        <div
                                            className="lb-avatar"
                                            style={{ borderColor: getBadgeColor(user.badge) }}
                                        >
                                            {user.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="lb-info">
                                            <span className="lb-name">{user.username}</span>
                                            <span
                                                className="lb-badge"
                                                style={{ background: getBadgeColor(user.badge) }}
                                            >
                                                {user.badge}
                                            </span>
                                        </div>
                                        <span className="lb-referrals">{user.referrals} referrals</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReferralManagementPanel;
