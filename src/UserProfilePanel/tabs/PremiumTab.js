import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import profileStyles from '../styles';

// -- dynamic style helpers (pass 2) --
const _st1114 = {
    ...profileStyles.button('primary'),
    marginTop: '16px',
    padding: '16px 48px',
    fontSize: '16px',
};

// -- extracted inline style constants --
const _st1 = {
    padding: '24px',
    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.05) 100%)',
    borderRadius: '12px',
    border: '2px solid rgba(255, 215, 0, 0.3)',
    marginBottom: '24px',
};
const _st2 = { color: '#ffd700', margin: '0 0 12px 0', fontSize: '20px' };
const _st3 = { color: '#b5bac1', margin: 0 };
const _st4 = { color: '#b5bac1', margin: '8px 0 0 0', fontSize: '13px' };
const _st5 = { color: '#fff', marginBottom: '16px' };
const _st6 = { display: 'grid', gap: '12px' };
const _st7 = {
    padding: '12px',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
};
const _st8 = { fontSize: '24px' };
const _st9 = { color: '#fff', fontSize: '14px' };
const _st10 = {
    padding: '24px',
    background:
        'linear-gradient(135deg, rgba(88, 101, 242, 0.2) 0%, rgba(88, 101, 242, 0.05) 100%)',
    borderRadius: '12px',
    border: '2px solid rgba(88, 101, 242, 0.3)',
    marginBottom: '24px',
    textAlign: 'center',
};
const _st11 = { fontSize: '64px', marginBottom: '16px' };
const _st12 = { color: '#fff', margin: '0 0 12px 0', fontSize: '24px' };
const _st13 = { color: '#b5bac1', margin: '0 0 24px 0' };
const _st14 = { fontSize: '32px', fontWeight: '700', color: '#5865f2', marginBottom: '8px' };
const _st15 = { fontSize: '16px', color: '#b5bac1' };

const PremiumTab = ({ premiumStatus }) => {
    const { t } = useTranslation();
    const styles = profileStyles;
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const activeFeatures = [
        { icon: '🎨', text: t('premium.customThemes') },
        { icon: '🎭', text: t('premium.animatedFrames') },
        { icon: '💬', text: t('premium.advancedMessages') },
        { icon: '🎵', text: t('premium.customEmojisStickers') },
        { icon: '🏆', text: t('premium.customBadges') },
        { icon: '🚀', text: t('premium.prioritySupport') },
    ];

    const upgradeFeatures = [
        ...activeFeatures,
        { icon: '📁', text: t('premium.cloudStorage') },
        { icon: '🎬', text: t('premium.hdVideo') },
    ];

    return (
        <div aria-label={t('aria.premiumTab', 'Premium')} style={styles.card}>
            <h3 style={styles.sectionTitle}>💎 {t('premium.membership')}</h3>

            {premiumStatus?.is_active ? (
                <div>
                    <div style={_st1}>
                        <h4 style={_st2}>{t('premium.activeMember')}</h4>
                        <p style={_st3}>{t('premium.isActiveDesc')}</p>
                        {premiumStatus.expires_at && (
                            <p style={_st4}>
                                📅 {t('premium.expires')}{' '}
                                {new Date(premiumStatus.expires_at).toLocaleDateString()}
                            </p>
                        )}
                    </div>

                    <h4 style={_st5}>✨ {t('premium.premiumFeatures')}</h4>
                    <div style={_st6}>
                        {activeFeatures.map((feature, idx) => (
                            <div key={`item-${idx}`} style={_st7}>
                                <span style={_st8}>{feature.icon}</span>
                                <span style={_st9}>{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <div style={_st10}>
                        <div style={_st11}>💎</div>
                        <h4 style={_st12}>{t('premium.upgradeToPremium')}</h4>
                        <p style={_st13}>{t('premium.upgradeDesc')}</p>
                        <div style={_st14}>
                            ₺4.99<span style={_st15}>{t('premium.perMonth')}</span>
                        </div>
                        <button style={_st1114}>🚀 {t('premium.buyNow')}</button>
                    </div>

                    <h4 style={_st5}>✨ {t('premium.unlockWithPremium')}</h4>
                    <div style={_st6}>
                        {upgradeFeatures.map((feature, idx) => (
                            <div key={`item-${idx}`} style={_st7}>
                                <span style={_st8}>{feature.icon}</span>
                                <span style={_st9}>{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

PremiumTab.propTypes = {
    premiumStatus: PropTypes.array,
};
export default PremiumTab;
