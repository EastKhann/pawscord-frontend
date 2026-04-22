/* eslint-disable jsx-a11y/label-has-associated-control */
// Referral Program Component
import { useState, useEffect, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { authFetch } from '../../utils/authFetch';
import toast from '../../utils/toast';
import { PRODUCTION_URL } from '../../utils/constants';
import './ReferralProgram.css';

import PropTypes from 'prop-types';
import logger from '../../utils/logger';

const ReferralProgram = memo(function ReferralProgram({ user }) {
    const { t } = useTranslation();
    const [referralCode, setReferralCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
            const res = await authFetch('/api/user/profile/');
            const profile = await res.json();
            setReferralCode(profile.referral_code || generateCode());
            setReferralCount(profile.referral_count || 0);
        } catch (error) {
            logger.error('Failed to load referral data:', error);
        }
    };

    const generateCode = () => {
        return Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    const copyReferralLink = useCallback(() => {
        const link = `${PRODUCTION_URL}/join/${referralCode}`;
        navigator.clipboard
            .writeText(link)
            .catch((err) => logger.warn('[ReferralProgram] Copy failed:', err));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [referralCode]);

    const shareOnTwitter = useCallback(() => {
        const text = t('referral.shareTwitterText', {
            defaultValue: `Join me on Pawscord - a privacy-first Discord alternative! \n\nNo tracking. No ads. 100% open source.\n\nSign up with my link for 3 months free premium:`,
        });
        const url = `${PRODUCTION_URL}/join/${referralCode}`;
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            '_blank'
        );
    }, [referralCode, t]);

    const claimReward = useCallback(async () => {
        try {
            const response = await axios.post('/api/referral/claim/');
            toast.success(
                t('referral.claimReward', {
                    reward: response.data.reward,
                    defaultValue: `Reward claimed! You got ${response.data.reward}`,
                })
            );
            loadReferralData();
        } catch (error) {
            toast.error(
                error.response?.data?.error ||
                t('referral.claimFailed', { defaultValue: 'Failed to claim reward' })
            );
        }
    }, [t]);

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
                <h2> {t('referral.title', 'Invite Friends, Get Rewards')}</h2>
                <p>
                    {t(
                        'referral.subtitle',
                        'Share Pawscord and earn free premium for every friend who joins!'
                    )}
                </p>
            </div>

            {/* Referral Link */}
            <div className="referral-link-card">
                <label>{t('referral.yourLink', 'Your Referral Link:')}</label>
                <div className="link-container">
                    <input
                        type="text"
                        value={`${PRODUCTION_URL}/join/${referralCode}`}
                        readOnly
                        className="referral-input"
                        aria-label={t('referral.referralLink', 'Referral link')}
                    />
                    <button
                        onClick={copyReferralLink}
                        className="copy-btn"
                        aria-label={
                            copied
                                ? t('referral.copied', 'Copied!')
                                : t('referral.copyLink', 'Copy referral link')
                        }
                    >
                        {copied
                            ? `✅ ${t('referral.copied', 'Copied!')}`
                            : `📋 ${t('referral.copy', 'Copy')}`}
                    </button>
                </div>
                <button
                    onClick={shareOnTwitter}
                    className="share-btn twitter"
                    aria-label={t('referral.shareTwitter', 'Share on Twitter')}
                >
                    {t('referral.shareTwitter', 'Share on Twitter')}
                </button>
            </div>

            {/* Referral Stats */}
            <div className="referral-stats">
                <div className="stat-card">
                    <div className="stat-value">{referralCount}</div>
                    <div className="stat-label">
                        {t('referral.friendsReferred', 'Friends Referred')}
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">
                        {tier === 'lifetime'
                            ? '∞'
                            : tier === '6months'
                                ? '6mo'
                                : tier === '1month'
                                    ? '1mo'
                                    : '0'}
                    </div>
                    <div className="stat-label">
                        {t('referral.premiumEarned', 'Premium Earned')}
                    </div>
                </div>
            </div>

            {/* Rewards Tiers */}
            <div className="rewards-tiers">
                <h3>{t('referral.rewardTiers', 'Reward Tiers:')}</h3>
                <div className="tier-list">
                    <div className={`tier-item ${referralCount >= 1 ? 'unlocked' : ''}`}>
                        <div className="tier-icon">🥉</div>
                        <div className="tier-info">
                            <div className="tier-title">{t('referral.bronze')}</div>
                            <div className="tier-reward">{t('referral.oneMonthPremium')}</div>
                            <div className="tier-requirement">{t('referral.oneFriend')}</div>
                        </div>
                        {referralCount >= 1 && referralCount < 5 && (
                            <button
                                aria-label={t('referral.claimReward', 'Claim reward')}
                                onClick={claimReward}
                                className="claim-btn"
                            >
                                {t('referral.claim')}
                            </button>
                        )}
                    </div>

                    <div className={`tier-item ${referralCount >= 5 ? 'unlocked' : ''}`}>
                        <div className="tier-icon">🥈</div>
                        <div className="tier-info">
                            <div className="tier-title">{t('referral.silver')}</div>
                            <div className="tier-reward">{t('referral.sixMonthsPremium')}</div>
                            <div className="tier-requirement">{t('referral.fiveFriends')}</div>
                        </div>
                        {referralCount >= 5 && referralCount < 10 && (
                            <button
                                aria-label={t('referral.claimReward', 'Claim reward')}
                                onClick={claimReward}
                                className="claim-btn"
                            >
                                {t('referral.claim')}
                            </button>
                        )}
                    </div>

                    <div className={`tier-item ${referralCount >= 10 ? 'unlocked' : ''}`}>
                        <div className="tier-icon">🥇</div>
                        <div className="tier-info">
                            <div className="tier-title">{t('referral.gold')}</div>
                            <div className="tier-reward">{t('referral.lifetimePremium')}</div>
                            <div className="tier-requirement">{t('referral.tenFriends')}</div>
                        </div>
                        {referralCount >= 10 && (
                            <button
                                aria-label={t('referral.claimReward', 'Claim reward')}
                                onClick={claimReward}
                                className="claim-btn"
                            >
                                {t('referral.claim')}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-section">
                <h3>{t('referral.yourProgress')}</h3>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={_s({ width: `${Math.min((referralCount / 10) * 100, 100)}%` })}
                    >
                        <span>{referralCount} / 10</span>
                    </div>
                </div>
                <p className="progress-hint">
                    {referralCount >= 10
                        ? t('referral.unlockedLifetime')
                        : referralCount >= 5
                            ? t('referral.moreForLifetime', { count: 10 - referralCount })
                            : referralCount >= 1
                                ? t('referral.moreForSixMonths', { count: 5 - referralCount })
                                : t('referral.shareToStart')}
                </p>
            </div>

            {/* How It Works */}
            <div className="how-it-works">
                <h3>{t('referral.howItWorks')}</h3>
                <ol>
                    <li>{t('referral.step1')}</li>
                    <li>{t('referral.step2')}</li>
                    <li>{t('referral.step3')}</li>
                    <li>{t('referral.step4')}</li>
                </ol>
            </div>

            {/* Social Share Buttons */}
            <div className="social-share">
                <h3>{t('referral.shareOn')}</h3>
                <div className="share-buttons">
                    <button
                        aria-label={t('referral.shareFacebook', 'Share on Facebook')}
                        onClick={() =>
                            window.open(
                                `https://www.facebook.com/sharer/sharer.php?u=${PRODUCTION_URL}/join/${referralCode}`,
                                '_blank'
                            )
                        }
                        className="share-btn facebook"
                    >
                        📘 Facebook
                    </button>
                    <button
                        aria-label={t('referral.shareReddit', 'Share on Reddit')}
                        onClick={() =>
                            window.open(
                                `https://www.reddit.com/submit?url=${PRODUCTION_URL}/join/${referralCode}&title=Check out Pawscord!`,
                                '_blank'
                            )
                        }
                        className="share-btn reddit"
                    >
                        🤖 Reddit
                    </button>
                    <button
                        aria-label={t('referral.shareWhatsApp', 'Share on WhatsApp')}
                        onClick={() =>
                            window.open(
                                `https://wa.me/?text=Join me on Pawscord! ${PRODUCTION_URL}/join/${referralCode}`,
                                '_blank'
                            )
                        }
                        className="share-btn whatsapp"
                    >
                        💬 WhatsApp
                    </button>
                    <button
                        aria-label={t('referral.shareTelegram', 'Share on Telegram')}
                        onClick={() =>
                            window.open(
                                `https://t.me/share/url?url=${PRODUCTION_URL}/join/${referralCode}&text=Check out Pawscord!`,
                                '_blank'
                            )
                        }
                        className="share-btn telegram"
                    >
                        ✈ Telegram
                    </button>
                </div>
            </div>
        </div>
    );
});

ReferralProgram.propTypes = {
    user: PropTypes.object,
};

export default ReferralProgram;
