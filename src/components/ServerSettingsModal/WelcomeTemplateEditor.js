/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaRobot } from 'react-icons/fa';
import toast from '../../utils/toast';

import { useTranslation } from 'react-i18next';
import css from './ServerTabs.module.css';
import logger from '../../utils/logger';

const S = {
    bg4: {
        padding: '14px',
        backgroundColor: '#0d0e10',
        borderRadius: '8px',
        border: '1px solid #182135',
        color: '#dbdee1',
        fontSize: '14px',
        lineHeight: '1.5',
        fontStyle: 'italic',
    },
    bg3: {
        padding: '6px 12px',
        backgroundColor: '#0d0e10',
        border: '1px solid #182135',
        borderRadius: '6px',
        color: '#5865f2',
        cursor: 'pointer',
        fontFamily: 'monospace',
        fontSize: '13px',
        transition: 'all 0.15s',
    },
    bg2: {
        width: '100%',
        minHeight: '120px',
        padding: '12px',
        backgroundColor: '#0d0e10',
        border: '1px solid #182135',
        borderRadius: '8px',
        color: '#dbdee1',
        fontFamily: 'inherit',
        resize: 'vertical',
        fontSize: '14px',
        lineHeight: '1.5',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    bg: {
        width: '100%',
        padding: '10px 14px',
        backgroundColor: '#0d0e10',
        border: '1px solid #182135',
        borderRadius: '8px',
        color: '#dbdee1',
        fontSize: '14px',
        outline: 'none',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
    },
    txt: { color: '#5865f2', fontSize: '16px' },
    flex: {
        padding: '10px 14px',
        backgroundColor: '#111214',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
};

const WelcomeTemplateEditor = ({ serverId, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const [template, setTemplate] = useState('');
    const [enabled, setEnabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [preview, setPreview] = useState('');
    const [welcomeChannelId, setWelcomeChannelId] = useState('');
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const loadTemplate = async () => {
            try {
                const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/welcome/`);
                if (res.ok) {
                    const data = await res.json();
                    // Yeni config formatını destekle + eski format uyumu
                    if (data.config) {
                        setTemplate(data.config.welcome_message || data.template || '');
                        setEnabled(data.config.welcome_enabled ?? data.enabled ?? false);
                        setWelcomeChannelId(data.config.welcome_channel_id || '');
                    } else {
                        setTemplate(data.template || '');
                        setEnabled(data.enabled || false);
                    }
                }
            } catch (e) {
                logger.error('Welcome template load error:', e);
            } finally {
                setLoading(false);
            }
        };
        const loadChannels = async () => {
            try {
                const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/channels/`);
                if (res.ok) {
                    const data = await res.json();
                    setChannels(data.channels || []);
                }
            } catch (e) {
                logger.error('Channels load error:', e);
            }
        };
        loadTemplate();
        loadChannels();
    }, [serverId, fetchWithAuth, apiBaseUrl]);

    // Live preview
    useEffect(() => {
        if (!template) {
            setPreview('');
            return;
        }
        let p = template
            .replace(/\{user\}/g, 'User')
            .replace(/\{user_mention\}/g, '@User')
            .replace(/\{server\}/g, 'Server')
            .replace(/\{member_count\}/g, '42')
            .replace(/\{user_id\}/g, '1')
            // Eski format uyumluluğu
            .replace(/\{username\}/g, 'User')
            .replace(/\{mention\}/g, '@User')
            .replace(/\{memberCount\}/g, '42')
            .replace(/\{date\}/g, new Date().toLocaleDateString(undefined));
        setPreview(p);
    }, [template]);

    const handleSave = async () => {
        setSaving(true);
        try {
            let res;
            res = await fetchWithAuth(`${apiBaseUrl}/servers/welcome/set/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    server_id: serverId,
                    template,
                    welcome_message: template,
                    enabled,
                    welcome_enabled: enabled,
                    welcome_channel_id: welcomeChannelId || null,
                }),
            });
            if (res.ok) {
                toast.success(t('welcomeTemplate.settingsSaved'));
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

    const variables = [
        { key: '{user}', label: 'Username' },
        { key: '{user_mention}', label: '@Tag' },
        { key: '{server}', label: 'Server Name' },
        { key: '{member_count}', label: 'Member Count' },
    ];

    if (loading) return <div className={css.textCenter20Muted}>{t('common.loading')}</div>;

    const toggleSwitchStyle = {
        width: '44px',
        height: '24px',
        borderRadius: '12px',
        backgroundColor: enabled ? '#23a559' : '#949ba4',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background-color 0.2s',
    };
    const toggleKnobStyle = {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        position: 'absolute',
        top: '2px',
        left: enabled ? '22px' : '2px',
        transition: 'left 0.2s',
    };
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
        <div className={css.flexColGap18}>
            {/* Enable Toggle */}
            <div className={css.flexAlignGap12Mb12}>
                <div
                    role="button"
                    aria-label={enabled ? 'Disable welcome messages' : 'Enable welcome messages'}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setEnabled(!enabled)}
                    onClick={() => setEnabled(!enabled)}
                    style={toggleSwitchStyle}
                >
                    <div style={toggleKnobStyle} />
                </div>
                <div>
                    <div className={css.dbdText14}>
                        {enabled ? '✓ Welcome Messages Active' : '✗ Welcome Messages Disabled'}
                    </div>
                    <div className={css.mutedTime}>
                        A message is automatically sent when new members join
                    </div>
                </div>
            </div>

            {/* Bot avatar artık "Sistem Botu" sekmesinden ayarlanıyor */}
            <div style={S.flex}>
                <FaRobot style={S.txt} />
                <div className={css.mutedXs}>
                    Bot profile picture{' '}
                    <strong className="text-dbd-only">{t('sistem_botu')}</strong> tab.
                </div>
            </div>

            {/* Channel Selector */}
            <div>
                <label className={css.fieldLabel}>Welcome Channel</label>
                <select
                    value={welcomeChannelId}
                    onChange={(e) => setWelcomeChannelId(e.target.value)}
                    style={S.bg}
                    onFocus={(e) => {
                        e.target.style.borderColor = '#5865f2';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = '#1e2024';
                    }}
                >
                    <option value="">{t('automatic_default_channel')}</option>
                    {channels.map((ch) => (
                        <option key={ch.id} value={ch.id}>
                            {ch.name} {ch.category ? `(${ch.category})` : ''}
                        </option>
                    ))}
                </select>
                <div className={css.fieldHint}>Select the channel to send welcome messages to</div>
            </div>

            {/* Template Editor */}
            <div>
                <label className={css.fieldLabel}>Message Template</label>
                <textarea
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    placeholder={t('welcome_mention_server_sunucusuna_katıldın_sen_membercount_m')}
                    maxLength={500}
                    style={S.bg2}
                    onFocus={(e) => {
                        e.target.style.borderColor = '#5865f2';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = '#1e2024';
                    }}
                />
                <div className={css.fieldHintRight}>{template.length} / 500 characters</div>
            </div>

            {/* Variables */}
            <div>
                <label className={css.fieldLabel}>Available Variables</label>
                <div className={css.flexWrapGap8}>
                    {variables.map((v) => (
                        <button
                            key={v.key}
                            onClick={() =>
                                setTemplate(
                                    (prev) =>
                                        prev + (prev.endsWith(' ') || !prev ? '' : ' ') + v.key
                                )
                            }
                            title={v.label}
                            aria-label={`Insert variable ${v.key}`}
                            style={S.bg3}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#5865f2';
                                e.target.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#0d0e10';
                                e.target.style.color = '#5865f2';
                            }}
                        >
                            {v.key}
                        </button>
                    ))}
                </div>
            </div>

            {/* Live Preview */}
            {preview && (
                <div>
                    <label className={css.fieldLabel}>Preview</label>
                    <div style={S.bg4}>{preview}</div>
                </div>
            )}

            {/* Save Button */}
            <div className={css.saveRow}>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    aria-label={t('serverSettings.saveWelcome', 'Save welcome message settings')}
                    style={saveBtnStyle}
                >
                    {saving ? '⏳ Saving...' : t('ui.hos_geldin_mesajini_save')}
                </button>
            </div>
        </div>
    );
};

WelcomeTemplateEditor.propTypes = {
    serverId: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default WelcomeTemplateEditor;
