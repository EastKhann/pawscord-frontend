import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import profileStyles from '../styles';
const _s = (o) => o;

// -- dynamic style helpers (pass 2) --
const _st1119 = { ...profileStyles.sectionTitle, fontSize: '16px', marginBottom: '16px' };
const _st1120 = { ...profileStyles.settingRow, marginTop: '20px' };

// -- extracted inline style constants --
const _st1 = { color: '#b5bac1', marginBottom: '24px' };
const _st2 = { marginTop: '32px' };
const _st3 = { color: '#fff', marginBottom: '12px' };
const _st4 = { display: 'flex', alignItems: 'center', gap: '16px' };
const _st5 = { color: '#b5bac1', fontSize: '14px', minWidth: '40px' };
const _st6 = {
    marginTop: '32px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    paddingTop: '24px',
};
const _st7 = { marginTop: '16px', paddingLeft: '12px', borderLeft: '3px solid #23a559' };
const _st8 = { color: '#fff', marginBottom: '8px', fontSize: '13px' };
const _st9 = { display: 'flex', alignItems: 'center', gap: '12px' };
const _st10 = { color: '#b5bac1', fontSize: '12px', minWidth: '60px' };
const _st11 = { color: '#949ba4', fontSize: '11px', marginTop: '4px' };
const _st12 = {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: 'rgba(114, 137, 218, 0.1)',
    borderRadius: '8px',
    borderLeft: '3px solid #5865f2',
};
const _st13 = { color: '#b5bac1', fontSize: '12px', margin: 0 };
const _st14 = { color: '#fff' };

const SoundSettingsTab = ({ handleSoundSettingsUpdate, soundSettings }) => {
    const { t } = useTranslation();
    const styles = profileStyles;
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <div aria-label={t('aria.soundSettingsTab', 'Sound Settings')} style={styles.card}>
            <h3 style={styles.sectionTitle}>🎵 Voice Settings</h3>

            <p style={_st1}>Customize application sounds.</p>

            <div style={styles.settingRow}>
                <div>
                    <h4 style={styles.settingRowTitle}>💬 Message Sound</h4>
                    <p style={styles.settingRowDesc}>Play audio when a message arrives</p>
                </div>
                <div
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                        handleSoundSettingsUpdate('message_sound', !soundSettings.message_sound)
                    }
                    style={_s({
                        width: '50px',
                        height: '26px',
                        background: soundSettings.message_sound
                            ? '#5865f2'
                            : 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '26px',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.3s',
                    })}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <div
                        style={_s({
                            position: 'absolute',
                            width: '20px',
                            height: '20px',
                            background: '#fff',
                            borderRadius: '50%',
                            top: '3px',
                            left: soundSettings.message_sound ? '27px' : '3px',
                            transition: 'all 0.3s',
                        })}
                    />
                </div>
            </div>

            <div style={styles.settingRow}>
                <div>
                    <h4 style={styles.settingRowTitle}>🔔 Reportim Sesi</h4>
                    <p style={styles.settingRowDesc}>Play audio when a notification arrives</p>
                </div>
                <div
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                        handleSoundSettingsUpdate(
                            'notification_sound',
                            !soundSettings.notification_sound
                        )
                    }
                    style={_s({
                        width: '50px',
                        height: '26px',
                        background: soundSettings.notification_sound
                            ? '#5865f2'
                            : 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '26px',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.3s',
                    })}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <div
                        style={_s({
                            position: 'absolute',
                            width: '20px',
                            height: '20px',
                            background: '#fff',
                            borderRadius: '50%',
                            top: '3px',
                            left: soundSettings.notification_sound ? '27px' : '3px',
                            transition: 'all 0.3s',
                        })}
                    />
                </div>
            </div>

            <div style={styles.settingRow}>
                <div>
                    <h4 style={styles.settingRowTitle}>🎤 Voice Chat Leavema Sesi</h4>
                    <p style={styles.settingRowDesc}>Play audio when leaving voice chat</p>
                </div>
                <div
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                        handleSoundSettingsUpdate(
                            'voice_disconnect_sound',
                            !soundSettings.voice_disconnect_sound
                        )
                    }
                    style={_s({
                        width: '50px',
                        height: '26px',
                        background: soundSettings.voice_disconnect_sound
                            ? '#5865f2'
                            : 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '26px',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.3s',
                    })}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <div
                        style={_s({
                            position: 'absolute',
                            width: '20px',
                            height: '20px',
                            background: '#fff',
                            borderRadius: '50%',
                            top: '3px',
                            left: soundSettings.voice_disconnect_sound ? '27px' : '3px',
                            transition: 'all 0.3s',
                        })}
                    />
                </div>
            </div>

            <div style={_st2}>
                <h4 style={_st3}>🔊 Ana Volume Level</h4>
                <div style={_st4}>
                    <span style={_st5}>{soundSettings.volume}%</span>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={soundSettings.volume}
                        onChange={(e) =>
                            handleSoundSettingsUpdate('volume', parseInt(e.target.value))
                        }
                        style={_s({
                            flex: 1,
                            height: '6px',
                            borderRadius: '3px',
                            background: `linear-gradient(to right, #5865f2 0%, #5865f2 ${soundSettings.volume}%, rgba(255,255,255,0.1) ${soundSettings.volume}%, rgba(255,255,255,0.1) 100%)`,
                            outline: 'none',
                            cursor: 'pointer',
                        })}
                    />
                </div>
            </div>

            {/* 🔥 YENİ: Advanced Audio Tuning Ayarları */}
            <div style={_st6}>
                <h3 style={_st1119}>🎙️ Advanced Audio Tuning</h3>

                <div style={styles.settingRow}>
                    <div>
                        <h4 style={styles.settingRowTitle}>🔇 Krisp Noise Cancellation</h4>
                        <p style={styles.settingRowDesc}>
                            Intelligently suppresses background noise (AI powered)
                        </p>
                    </div>
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                            const newValue = !soundSettings.krisp_enabled;
                            handleSoundSettingsUpdate('krisp_enabled', newValue);
                            if (newValue) toast.success(t('settings.krispActive'));
                        }}
                        style={_s({
                            width: '50px',
                            height: '26px',
                            background: soundSettings.krisp_enabled
                                ? '#23a559'
                                : 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '26px',
                            cursor: 'pointer',
                            position: 'relative',
                            transition: 'all 0.3s',
                        })}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        <div
                            style={_s({
                                position: 'absolute',
                                width: '20px',
                                height: '20px',
                                background: '#fff',
                                borderRadius: '50%',
                                top: '3px',
                                left: soundSettings.krisp_enabled ? '27px' : '3px',
                                transition: 'all 0.3s',
                            })}
                        />
                    </div>
                </div>

                {soundSettings.krisp_enabled && (
                    <div style={_st7}>
                        <h4 style={_st8}>🎚️ Noise Suppression Level</h4>
                        <div style={_st9}>
                            <span style={_st10}>
                                {soundSettings.noise_suppression_level || 80}%
                                {(soundSettings.noise_suppression_level || 80) >= 90 && ' 🔥'}
                            </span>
                            <input
                                type="range"
                                min="50"
                                max="100"
                                value={soundSettings.noise_suppression_level || 80}
                                onChange={(e) =>
                                    handleSoundSettingsUpdate(
                                        'noise_suppression_level',
                                        parseInt(e.target.value)
                                    )
                                }
                                style={_s({
                                    flex: 1,
                                    height: '4px',
                                    borderRadius: '2px',
                                    background: `linear-gradient(to right, #23a559 0%, #23a559 ${(soundSettings.noise_suppression_level || 80) - 50}%, rgba(255,255,255,0.1) ${(soundSettings.noise_suppression_level || 80) - 50}%, rgba(255,255,255,0.1) 100%)`,
                                    outline: 'none',
                                    cursor: 'pointer',
                                })}
                            />
                        </div>
                        <p style={_st11}>
                            💡 High values suppress more noise but may also affect your voice
                        </p>
                    </div>
                )}

                <div style={_st1120}>
                    <div>
                        <h4 style={styles.settingRowTitle}>🎵 Echo Prevention</h4>
                        <p style={styles.settingRowDesc}>
                            Prevents speaker audio from feeding back into the microphone
                        </p>
                    </div>
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                            const newValue = !soundSettings.echo_cancellation;
                            handleSoundSettingsUpdate('echo_cancellation', newValue);
                        }}
                        style={_s({
                            width: '50px',
                            height: '26px',
                            background:
                                soundSettings.echo_cancellation !== false
                                    ? '#23a559'
                                    : 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '26px',
                            cursor: 'pointer',
                            position: 'relative',
                            transition: 'all 0.3s',
                        })}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        <div
                            style={_s({
                                position: 'absolute',
                                width: '20px',
                                height: '20px',
                                background: '#fff',
                                borderRadius: '50%',
                                top: '3px',
                                left: soundSettings.echo_cancellation !== false ? '27px' : '3px',
                                transition: 'all 0.3s',
                            })}
                        />
                    </div>
                </div>

                <div style={styles.settingRow}>
                    <div>
                        <h4 style={styles.settingRowTitle}>📊 Auto Volume</h4>
                        <p style={styles.settingRowDesc}>
                            Mikrofonunuzu otomatik normalize eder (Auto Gain Control)
                        </p>
                    </div>
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                            const newValue = !soundSettings.auto_gain_control;
                            handleSoundSettingsUpdate('auto_gain_control', newValue);
                        }}
                        style={_s({
                            width: '50px',
                            height: '26px',
                            background:
                                soundSettings.auto_gain_control !== false
                                    ? '#23a559'
                                    : 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '26px',
                            cursor: 'pointer',
                            position: 'relative',
                            transition: 'all 0.3s',
                        })}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        <div
                            style={_s({
                                position: 'absolute',
                                width: '20px',
                                height: '20px',
                                background: '#fff',
                                borderRadius: '50%',
                                top: '3px',
                                left: soundSettings.auto_gain_control !== false ? '27px' : '3px',
                                transition: 'all 0.3s',
                            })}
                        />
                    </div>
                </div>

                <div style={_st12}>
                    <p style={_st13}>
                        💡 <strong style={_st14}>Pro Tip:</strong> For best results, enable all
                        settings. If audio sounds robotic, try lowering noise suppression to 70-80%.
                    </p>
                </div>
            </div>
        </div>
    );
};

SoundSettingsTab.propTypes = {
    handleSoundSettingsUpdate: PropTypes.func,
    soundSettings: PropTypes.object,
};
export default SoundSettingsTab;
