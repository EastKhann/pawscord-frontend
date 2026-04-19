/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
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
    const styles = profileStyles;
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <div aria-label="premium tab" style={styles.card}>
            <h3 style={styles.sectionTitle}>💎 Premium Üyelik</h3>

            {premiumStatus?.is_active ? (
                <div>
                    <div style={_st1}>
                        <h4 style={_st2}>⭐ Premium Üye</h4>
                        <p style={_st3}>Premium'unuz aktif! Tüm özel özelliklere erişiminiz var.</p>
                        {premiumStatus.expires_at && (
                            <p style={_st4}>
                                📅 Bitiş:{' '}
                                {new Date(premiumStatus.expires_at).toLocaleDateString('tr-TR')}
                            </p>
                        )}
                    </div>

                    <h4 style={_st5}>✨ Premium Özellikler</h4>
                    <div style={_st6}>
                        {[
                            { icon: '🎨', text: 'Özel temalar ve renkler' },
                            { icon: '🎭', text: 'Hareketli avatar çerçeveleri' },
                            { icon: '💬', text: 'Gelişmiş mesaj araçları' },
                            { icon: '🎵', text: 'Özel emojiler ve çıkartmalar' },
                            { icon: '🏆', text: 'Özel rozetler' },
                            { icon: '🚀', text: 'Öncelikli destek' },
                        ].map((feature, idx) => (
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
                        <h4 style={_st12}>Premium'a Yükselt</h4>
                        <p style={_st13}>Özel özelliklerle deneyimini geliştir</p>
                        <div style={_st14}>
                            ₺4.99<span style={_st15}>/ay</span>
                        </div>
                        <button style={_st1114}>🚀 Satın Al</button>
                    </div>

                    <h4 style={_st5}>✨ Premium ile Aç</h4>
                    <div style={_st6}>
                        {[
                            { icon: '🎨', text: 'Özel temalar ve renkler' },
                            { icon: '🎭', text: 'Hareketli avatar çerçeveleri' },
                            { icon: '💬', text: 'Gelişmiş mesaj araçları' },
                            { icon: '🎵', text: 'Özel emojiler ve çıkartmalar' },
                            { icon: '🏆', text: 'Özel rozetler' },
                            { icon: '🚀', text: 'Öncelikli destek' },
                            { icon: '📁', text: '100GB Bulut Depolama' },
                            { icon: '🎬', text: 'HD Video Paylaşımı' },
                        ].map((feature, idx) => (
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
