/* eslint-disable jsx-a11y/label-has-associated-control */
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import {
    FaMicrophone,
    FaWaveSquare,
    FaKeyboard,
    FaSlidersH,
    FaMicrophoneSlash,
} from 'react-icons/fa';

import { useTranslation } from 'react-i18next';

const VoiceTab = ({ settings, updateSetting, updateSettings, micLevel, voice }) => {
    const { t } = useTranslation();

    const { isPTTMode, togglePTTMode, vadSensitivity, updateVadSensitivity, pttKey, updatePTTKey } =
        voice;

    return (
        <div className="tab-content">
            {/* Entry Modu */}

            <div className="settings-card">
                <div className="card-header">
                    <FaMicrophone className="card-icon" />

                    <h3>{t('🎙_entry_modu')}</h3>
                </div>

                <div className="input-mode-selector">
                    <label
                        className={`mode-card ${!isPTTMode && settings.voice_activity ? 'selected' : ''}`}
                    >
                        <input
                            type="radio"
                            checked={!isPTTMode}
                            onChange={() => {
                                updateSettings({
                                    ...settings,
                                    voice_activity: true,
                                    push_to_talk: false,
                                });

                                if (isPTTMode && togglePTTMode) togglePTTMode();

                                toast.success(t('ui.ses_aktivasyonu_acildi'));
                            }}
                        />

                        <div className="mode-content">
                            <FaWaveSquare className="mode-icon" />

                            <span className="mode-title">{t('ses_aktivasyonu')}</span>

                            <span className="mode-desc">
                                {t('konuştuğunuzda_otomatik_aktif_olur')}
                            </span>
                        </div>
                    </label>
                    <label
                        className={`mode-card ${isPTTMode || settings.push_to_talk ? 'selected' : ''}`}
                    >
                        <input
                            type="radio"
                            checked={isPTTMode}
                            onChange={() => {
                                updateSettings({
                                    ...settings,
                                    voice_activity: false,
                                    push_to_talk: true,
                                });

                                if (!isPTTMode && togglePTTMode) togglePTTMode();

                                toast.success(t('ui.bas_konus_modu_acildi'));
                            }}
                        />

                        <div className="mode-content">
                            <FaKeyboard className="mode-icon" />

                            <span className="mode-title">{t('bas_konuş')}</span>

                            <span className="mode-desc">{t('tuşa_basılı_tutarak_konuşun')}</span>
                        </div>
                    </label>
                </div>
            </div>

            {/* Ses Aktivasyonu Ayarları */}

            {!isPTTMode && (
                <div className="settings-card">
                    <div className="card-header">
                        <FaSlidersH className="card-icon" />

                        <h3>{t('hassasiyet_ayarları')}</h3>
                    </div>

                    <div className="sensitivity-control">
                        <div className="sensitivity-header">
                            <span>{t('mikrofon_hassasiyeti')}</span>

                            <span className="value-badge">
                                {vadSensitivity || settings.input_sensitivity}%
                            </span>
                        </div>

                        <input
                            type="range"
                            min="20"
                            max="80"
                            value={vadSensitivity || settings.input_sensitivity}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);

                                updateSetting('input_sensitivity', val);

                                if (updateVadSensitivity) updateVadSensitivity(val);
                            }}
                            className="premium-slider sensitivity"
                        />

                        <div className="sensitivity-hint">
                            <FaMicrophoneSlash />

                            <span>{t('low_daha_sessiz_sesleri_algılar')}</span>
                        </div>

                        <div className="sensitivity-visualizer">
                            <div
                                className="threshold-line"
                                style={{
                                    left: `${(((vadSensitivity || settings.input_sensitivity) - 20) / 60) * 100}%`,
                                }}
                            />

                            <div className="level-indicator" style={{ width: `${micLevel}%` }} />
                        </div>

                        <div className="visualizer-labels">
                            <span>{t('sessiz')}</span>
                            <span>{t('high')}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Bas Konuş Ayarları */}

            {isPTTMode && (
                <div className="settings-card">
                    <div className="card-header">
                        <FaKeyboard className="card-icon" />

                        <h3>{t('bas_konuş_ayarları')}</h3>
                    </div>

                    <div className="ptt-settings">
                        <div className="ptt-key-bind">
                            <label>{t('tuş_ataması')}</label>

                            <input
                                type="text"
                                value={pttKey || settings.push_to_talk_key}
                                onKeyDown={(e) => {
                                    e.preventDefault();

                                    updateSetting('push_to_talk_key', e.code);

                                    if (updatePTTKey) updatePTTKey(e.code);

                                    toast.info(t('voice.keyBind', { key: e.code }));
                                }}
                                placeholder={t('bir_tuşa_basın')}
                                className="key-input"
                                readOnly
                                aria-label="Push To Talk Key"
                            />
                        </div>

                        <div className="ptt-delay">
                            <label>{t('bırakma_gecikmesi')}</label>

                            <select
                                value={settings.ptt_release_delay}
                                onChange={(e) =>
                                    updateSetting('ptt_release_delay', parseInt(e.target.value))
                                }
                            >
                                <option value="0">{t('0ms_anında')}</option>

                                <option value="100">{t('100ms')}</option>

                                <option value="200">{t('200ms_önerilen')}</option>

                                <option value="300">{t('300ms')}</option>

                                <option value="500">{t('500ms')}</option>
                            </select>

                            <span className="hint">
                                {t('tuşu_bıraktıktan_sonra_mikrofon_açık_kalma_süresi')}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

VoiceTab.propTypes = {
    settings: PropTypes.object,

    updateSetting: PropTypes.func,

    updateSettings: PropTypes.func,

    micLevel: PropTypes.object,

    voice: PropTypes.object,
};

export default VoiceTab;
