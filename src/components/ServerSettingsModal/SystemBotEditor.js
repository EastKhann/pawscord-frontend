/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaRobot } from 'react-icons/fa';
import toast from '../../utils/toast';

import { useTranslation } from 'react-i18next';
import css from './ServerTabs.module.css';
import logger from '../../utils/logger';

const S = {
    flex4: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        backgroundColor: '#111214',
        borderRadius: '6px',
    },
    bg3: {
        backgroundColor: '#5865f2',
        color: '#fff',
        fontSize: '10px',
        padding: '1px 5px',
        borderRadius: '3px',
        fontWeight: '600',
    },
    flex3: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundColor: '#111214',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bg2: {
        width: '100%',
        padding: '10px 14px',
        backgroundColor: '#0d0e10',
        border: '1px solid #182135',
        borderRadius: '8px',
        color: '#dbdee1',
        fontSize: '14px',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    bg: {
        padding: '5px 12px',
        backgroundColor: 'transparent',
        border: '1px solid #da373c',
        borderRadius: '4px',
        color: '#da373c',
        cursor: 'pointer',
        fontSize: '12px',
        transition: 'all 0.2s',
    },
    abs: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '3px 0',
        fontSize: '10px',
        color: '#fff',
        textAlign: 'center',
    },
    flex2: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '3px solid #5865f2',
        cursor: 'pointer',
        position: 'relative',
        backgroundColor: '#0d0e10',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.2s',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '16px',
        backgroundColor: '#111214',
        borderRadius: '10px',
    },
};

const SystemBotEditor = ({ serverId, serverIcon, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const [botAvatar, setBotAvatar] = useState(null);
    const [botAvatarFile, setBotAvatarFile] = useState(null);
    const [botAvatarPreview, setBotAvatarPreview] = useState(null);
    const [botName, setBotName] = useState('🎉 Sistem');
    const [isCustomAvatar, setIsCustomAvatar] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadBotSettings = async () => {
            try {
                const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/system-bot/`);
                if (res.ok) {
                    const data = await res.json();
                    setBotAvatar(data.bot_avatar || null);
                    setIsCustomAvatar(data.is_custom_avatar || false);
                    setBotName(data.bot_name || '🎉 Sistem');
                }
            } catch (e) {
                logger.error('System bot settings load error:', e);
            } finally {
                setLoading(false);
            }
        };
        loadBotSettings();
    }, [serverId, fetchWithAuth, apiBaseUrl]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const formData = new FormData();
            if (botAvatarFile) {
                formData.append('system_bot_avatar', botAvatarFile);
            }
            formData.append('bot_name', botName);

            // Eğer avatar removedysa
            if (!botAvatarFile && !botAvatar && !botAvatarPreview) {
                formData.append('remove_bot_avatar', 'true');
            }

            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/system-bot/`, {
                method: 'POST',
                body: formData,
            });
            if (res.ok) {
                const data = await res.json();
                setBotAvatar(data.bot_avatar || null);
                setIsCustomAvatar(data.is_custom_avatar || false);
                setBotAvatarFile(null);
                setBotAvatarPreview(null);
                toast.success(t('bot.settingsSaved'));
            } else {
                const data = await res.json().catch(() => ({}));
                toast.error(data.error || 'Save failed');
            }
        } catch (e) {
            logger.error('Save error:', e);
            toast.error(t('common.saveFailed'));
        } finally {
            setSaving(false);
        }
    };

    const handleRemoveAvatar = () => {
        setBotAvatar(null);
        setBotAvatarFile(null);
        setBotAvatarPreview(null);
        setIsCustomAvatar(false);
    };

    if (loading) return <div className={css.textCenter20Muted}>{t('common.loading')}</div>;

    const displayAvatar = botAvatarPreview || botAvatar || serverIcon;
    const saveBtnStyle = {
        padding: '12px 24px',
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: saving ? 'not-allowed' : 'pointer',
        fontWeight: '600',
        fontSize: '14px',
        opacity: saving ? 0.5 : 1,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'opacity 0.2s',
    };

    return (
        <div className={css.flexColGap20}>
            {/* Bilgi Kartı */}
            <div className={css.infoCard}>
                <div className={css.flexAlignGap10Mb8}>
                    <FaRobot className={css.primaryIcon18} />
                    <span className={css.dbdBold15}>{t('about_system_bot')}</span>
                </div>
                <p className={css.muted949 - 13 - lh}>
                    The system bot sends all system messages such as welcome messages and automatic
                    notifications. Customize the bot's profile picture and name here. By default the
                    server icon is used.
                </p>
            </div>

            {/* Bot Avatar */}
            <div>
                <label className={css.labelUppercaseBlock}>Bot Profile Picture</label>
                <div style={S.flex}>
                    <div
                        style={S.flex2}
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                if (file.size > 5 * 1024 * 1024) {
                                    toast.warning(t('systemBot.fileTooLarge'));
                                    return;
                                }
                                setBotAvatarFile(file);
                                setBotAvatarPreview(URL.createObjectURL(file));
                            };
                            input.click();
                        }}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        {displayAvatar ? (
                            <img src={displayAvatar} alt="Bot Avatar" className="img-cover" />
                        ) : (
                            <span className="fs-32">🤖</span>
                        )}
                        <div style={S.abs}>Change</div>
                    </div>
                    <div className={css.flex1}>
                        <div className={css.dbdBold15}>{botName}</div>
                        <div className={css.muted - mt6}>
                            {botAvatarPreview
                                ? '📷 New photo selected (applied on save)'
                                : isCustomAvatar
                                  ? '✓ Custom avatar set'
                                  : '🖼️ Using server icon (default)'}
                        </div>
                        <div className={css.flex - 8 - mt8}>
                            {(isCustomAvatar || botAvatarPreview) && (
                                <button
                                    onClick={handleRemoveAvatar}
                                    aria-label="Remove bot avatar"
                                    style={S.bg}
                                >
                                    ✗ Remove Avatar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bot Name */}
            <div>
                <label className={css.fieldLabel}>Bot Name</label>
                <input
                    value={botName}
                    onChange={(e) => setBotName(e.target.value)}
                    maxLength={50}
                    placeholder={t('🎉_sistem')}
                    style={S.bg2}
                    onFocus={(e) => {
                        e.target.style.borderColor = '#5865f2';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = '#1e2024';
                    }}
                />
                <div className={css.fieldHint}>Bot name shown in system messages</div>
            </div>

            {/* Preview */}
            <div>
                <label className={css.fieldLabel}>Preview</label>
                <div className={css.previewBox}>
                    <div className={css.flexStartGap12}>
                        <div style={S.flex3}>
                            {displayAvatar ? (
                                <img src={displayAvatar} alt="" className="img-cover" />
                            ) : (
                                <span className="fs-18">🤖</span>
                            )}
                        </div>
                        <div>
                            <div className="flex-align-6">
                                <span className={css.primary14 - 600}>
                                    {botName || '🎉 Sistem'}
                                </span>
                                <span style={S.bg3}>{t('bot')}</span>
                                <span className="text-949-11">
                                    {new Date().toLocaleTimeString(undefined, {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>
                            <div className="text-dbd-14-lh">
                                Welcome User! 🎉 You joined the server!
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Kullanım Alanları */}
            <div>
                <label className={css.fieldLabel}>Where Is This Bot Used?</label>
                <div className={css.flexColGap6}>
                    {[
                        { icon: '👋', text: 'Welcome messages' },
                        { icon: '👋', text: 'Leave messages' },
                        { icon: '📢', text: 'System notifications' },
                    ].map((item, i) => (
                        <div key={`item-${i}`} style={S.flex4}>
                            <span>{item.icon}</span>
                            <span className="text-dbd-13">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Save */}
            <div className={css.saveRow}>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    aria-label="Save system bot settings"
                    style={saveBtnStyle}
                >
                    {saving ? '⏳ Kaydediliyor…' : '💾 Sistem Bot Ayarlarını Kaydet'}
                </button>
            </div>
        </div>
    );
};

SystemBotEditor.propTypes = {
    serverId: PropTypes.string,
    serverIcon: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default SystemBotEditor;
