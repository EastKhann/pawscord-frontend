/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import profileStyles from '../styles';
const _s = (o) => o;

// -- dynamic style helpers (pass 2) --
const _st1109 = { ...profileStyles.button('primary'), marginTop: '16px' };

// -- extracted inline style constants --
const _st1 = { marginBottom: '24px' };
const _st2 = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    marginTop: '8px',
};
const _st3 = { fontSize: '24px', marginBottom: '8px' };
const _st4 = { color: '#fff', fontSize: '12px', fontWeight: '500' };
const _st5 = { color: '#b5bac1', fontSize: '12px', marginTop: '4px' };

const CustomStatusTab = ({
    customStatus: rawCustomStatus,
    setCustomStatus,
    updateCustomStatus,
}) => {
    const customStatus = rawCustomStatus || {
        status: 'online',
        emoji: '',
        text: '',
        expires_at: null,
    };
    const styles = profileStyles;
    const { t } = useTranslation();
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <div style={styles.card}>
            <h3 style={styles.sectionTitle}>{t('status.customTitle')}</h3>

            <div style={_st1}>
                <label id="status-selector-label" style={styles.label}>
                    Durum
                </label>
                <div role="radiogroup" aria-labelledby="status-selector-label" style={_st2}>
                    {[
                        { value: 'online', icon: '🟢', label: 'Çevrimiçi', color: '#23a559' },
                        { value: 'idle', icon: '🟡', label: 'Boşta', color: '#f0b232' },
                        { value: 'dnd', icon: '🔴', label: 'Rahatsız Etme', color: '#f23f42' },
                        { value: 'invisible', icon: '⚫', label: 'Görünmez', color: '#80848e' },
                    ].map((status) => (
                        <button
                            key={status.value}
                            aria-label={status.label}
                            aria-pressed={customStatus.status === status.value}
                            onClick={() =>
                                setCustomStatus({ ...customStatus, status: status.value })
                            }
                            style={_s({
                                padding: '16px 12px',
                                background:
                                    customStatus.status === status.value
                                        ? `linear-gradient(135deg, ${status.color}33 0%, ${status.color}11 100%)`
                                        : 'rgba(255, 255, 255, 0.03)',
                                border:
                                    customStatus.status === status.value
                                        ? `2px solid ${status.color}`
                                        : '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                textAlign: 'center',
                            })}
                        >
                            <div style={_st3}>{status.icon}</div>
                            <div style={_st4}>{status.label}</div>
                        </button>
                    ))}
                </div>
            </div>

            <div style={styles.inputGroup}>
                <label htmlFor="custom-status-text" style={styles.label}>
                    Özel Mesaj
                </label>
                <input
                    id="custom-status-text"
                    type="text"
                    value={customStatus.text || ''}
                    onChange={(e) => setCustomStatus({ ...customStatus, text: e.target.value })}
                    placeholder={t('status.placeholder')}
                    style={styles.input}
                    maxLength={128}
                    aria-label="Custom Status"
                />
                <p style={_st5}>
                    {t('status.characterCount', {
                        current: (customStatus.text || '').length,
                        max: 128,
                    })}
                </p>
            </div>

            <button style={_st1109} aria-label="updateCustomStatus" onClick={updateCustomStatus}>
                {t('status.save')}
            </button>
        </div>
    );
};

CustomStatusTab.propTypes = {
    customStatus: PropTypes.object,
    setCustomStatus: PropTypes.func,
    updateCustomStatus: PropTypes.func,
};
export default CustomStatusTab;
