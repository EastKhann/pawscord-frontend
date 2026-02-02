// Referral Program Component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from '../utils/toast';
import './ReferralProgram.css';

export default function ReferralProgram({ user }) {
    const [referralCode, setReferralCode] = useState('');
    const [referralCount, setReferralCount] = useState(0);
    const [rewards, setRewards] = useState([]);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (user) {
            loadReferralData();
        }
    }, [user]);

    const loadReferralData = async () => {
        try {
            const response = await axios.get('/api/user/profile/');
            setReferralCode(response.data.referral_code || generateCode());
            setReferralCount(response.data.referral_count || 0);
        } catch (error) {
            console.error('Failed to load referral data:', error);
        }
    };

    const generateCode = () => {
        return Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    const copyReferralLink = () => {
        const link = `https://pawscord.com/join/${referralCode}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareOnTwitter = () => {
        const text = `Join me on Pawscord - a privacy-first Discord alternative! 🐾\n\nNo tracking. No ads. 100% open source.\n\nSign up with my link for 3 months free premium:`;
        const url = `https://pawscord.com/join/${referralCode}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    const claimReward = async () => {
        try {
            const response = await axios.post('/api/referral/claim/');
            toast.success(`Reward claimed! You got ${response.data.reward}`);
            loadReferralData();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to claim reward');
        }
    };

    const getReferralTier = () => {
        if (referralCount >= 10) return 'lifetime';
        if (referralCount >= 5) return '6months';
        if (referralCount >= 1) return '1month';
        return 'none';
    };

    const tier = getReferralTier();

    return (
        <div className="referral-program">
            <div className="referral-header">
                <h2>🎁 Invite Friends, Get Rewards</h2>
                <p>Share Pawscord and earn free premium for every friend who joins!</p>
            </div>

            {/* Referral Link */}
            <div className="referral-link-card">
                <label>Your Referral Link:</label>
                <div className="link-container">
                    <input
                        type="text"
                        value={`https://pawscord.com/join/${referralCode}`}
                        readOnly
                        className="referral-input"
                    />
                    <button onClick={copyReferralLink} className="copy-btn">
                        {copied ? '✅ Copied!' : '📋 Copy'}
                    </button>
                </div>
                <button onClick={shareOnTwitter} className="share-btn twitter">
                    🐦 Share on Twitter
                </button>
            </div>

            {/* Referral Stats */}
            <div className="referral-stats">
                <div className="stat-card">
                    <div className="stat-value">{referralCount}</div>
                    <div className="stat-label">Friends Referred</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{tier === 'lifetime' ? '∞' : tier === '6months' ? '6mo' : tier === '1month' ? '1mo' : '0'}</div>
                    <div className="stat-label">Premium Earned</div>
                </div>
            </div>

            {/* Rewards Tiers */}
            <div className="rewards-tiers">
                <h3>Reward Tiers:</h3>
                <div className="tier-list">
                    <div className={`tier-item ${referralCount >= 1 ? 'unlocked' : ''}`}>
                        <div className="tier-icon">🥉</div>
                        <div className="tier-info">
                            <div className="tier-title">Bronze</div>
                            <div className="tier-reward">1 Month Premium</div>
                            <div className="tier-requirement">1 Friend</div>
                        </div>
                        {referralCount >= 1 && referralCount < 5 && (
                            <button onClick={claimReward} className="claim-btn">Claim</button>
                        )}
                    </div>

                    <div className={`tier-item ${referralCount >= 5 ? 'unlocked' : ''}`}>
                        <div className="tier-icon">🥈</div>
                        <div className="tier-info">
                            <div className="tier-title">Silver</div>
                            <div className="tier-reward">6 Months Premium</div>
                            <div className="tier-requirement">5 Friends</div>
                        </div>
                        {referralCount >= 5 && referralCount < 10 && (
                            <button onClick={claimReward} className="claim-btn">Claim</button>
                        )}
                    </div>

                    <div className={`tier-item ${referralCount >= 10 ? 'unlocked' : ''}`}>
                        <div className="tier-icon">🥇</div>
                        <div className="tier-info">
                            <div className="tier-title">Gold</div>
                            <div className="tier-reward">Lifetime Premium 🚀</div>
                            <div className="tier-requirement">10 Friends</div>
                        </div>
                        {referralCount >= 10 && (
                            <button onClick={claimReward} className="claim-btn">Claim</button>
                        )}
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-section">
                <h3>Your Progress:</h3>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${Math.min((referralCount / 10) * 100, 100)}%` }}
                    >
                        <span>{referralCount} / 10</span>
                    </div>
                </div>
                <p className="progress-hint">
                    {referralCount >= 10 ? (
                        '🎉 You unlocked Lifetime Premium!'
                    ) : referralCount >= 5 ? (
                        `${10 - referralCount} more friends for Lifetime Premium!`
                    ) : referralCount >= 1 ? (
                        `${5 - referralCount} more for 6 Months Premium!`
                    ) : (
                        'Share your link to start earning rewards!'
                    )}
                </p>
            </div>

            {/* How It Works */}
            <div className="how-it-works">
                <h3>How It Works:</h3>
                <ol>
                    <li>📤 Share your unique referral link with friends</li>
                    <li>✅ They sign up using your link</li>
                    <li>🎁 You automatically earn premium time!</li>
                    <li>🔁 Keep sharing to unlock more rewards</li>
                </ol>
            </div>

            {/* Social Share Buttons */}
            <div className="social-share">
                <h3>Share on:</h3>
                <div className="share-buttons">
                    <button
                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=https://pawscord.com/join/${referralCode}`, '_blank')}
                        className="share-btn facebook"
                    >
                        📘 Facebook
                    </button>
                    <button
                        onClick={() => window.open(`https://www.reddit.com/submit?url=https://pawscord.com/join/${referralCode}&title=Check out Pawscord!`, '_blank')}
                        className="share-btn reddit"
                    >
                        🤖 Reddit
                    </button>
                    <button
                        onClick={() => window.open(`https://wa.me/?text=Join me on Pawscord! https://pawscord.com/join/${referralCode}`, '_blank')}
                        className="share-btn whatsapp"
                    >
                        💬 WhatsApp
                    </button>
                    <button
                        onClick={() => window.open(`https://t.me/share/url?url=https://pawscord.com/join/${referralCode}&text=Check out Pawscord!`, '_blank')}
                        className="share-btn telegram"
                    >
                        ✈️ Telegram
                    </button>
                </div>
            </div>
        </div>
    );
}
