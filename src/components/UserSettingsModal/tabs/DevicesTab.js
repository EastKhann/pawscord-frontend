import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FaDesktop } from 'react-icons/fa';
import PropTypes from 'prop-types';
import SettingSection from '../components/SettingSection';
import importedS from '../styles';
import ut from './UserTabs.module.css';

const S = {
    ...importedS,
    font: { fontSize: 14 },
    bg2: {
        ...importedS.actionBtn,
        backgroundColor: 'rgba(218,55,60,0.1)',
        color: '#da373c',
        borderColor: '#da373c',
    },
    bg: {
        padding: '6px 12px',
        borderRadius: 4,
        border: 'none',
        cursor: 'pointer',
        backgroundColor: 'rgba(218,55,60,0.15)',
        color: '#da373c',
        fontSize: 12,
        fontWeight: 600,
    },
    txt: { color: '#3ba55c', fontSize: 11, fontWeight: 400 },
};

const DevicesTab = () => {
    const { t } = useTranslation();
    const [sessions, setSessions] = useState([
        {
            id: 1,
            device: '\u{1F4BB} Windows PC',
            browser: 'Chrome 132',
            ip: '88.238.xx.xxx',
            location: 'Istanbul',
            lastActive: t('settings.tabs.devices.currentSession'),
            current: true,
        },
        {
            id: 2,
            device: '\u{1F4F1} Android',
            browser: 'Chrome Mobile 144',
            ip: '88.238.xx.xxx',
            location: 'Istanbul',
            lastActive: '2 hours ago',
            current: false,
        },
    ]);

    const endSession = useCallback((sessionId) => {
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    }, []);

    const endAllSessions = useCallback(() => {
        setSessions((prev) => prev.filter((s) => s.current));
    }, []);

    return (
        <div>
            <SettingSection title={t('settings.tabs.devices.activeSessions')}>
                <p className={ut.mutedMdMb16}>{t('settings.tabs.devices.sessionsDesc')}</p>
                <div className={ut.flexColGap8}>
                    {sessions.map((s) => (
                        <div
                            key={s.id}
                            style={{
                                padding: '14px 16px',
                                backgroundColor: '#0d0e10',
                                borderRadius: 8,
                                border: s.current
                                    ? '1px solid rgba(59,165,92,0.3)'
                                    : '1px solid transparent',
                            }}
                        >
                            <div className="flex-between-start">
                                <div>
                                    <div className={ut.whiteBold15}>
                                        {s.device}{' '}
                                        {s.current && (
                                            <span style={S.txt}>
                                                {t('settings.tabs.devices.currentSession')}
                                            </span>
                                        )}
                                    </div>
                                    <div className={ut.mutedMd}>{s.browser}</div>
                                    <div className={ut.mutedSm}>
                                        {s.location} • {s.ip} • {s.lastActive}
                                    </div>
                                </div>
                                {!s.current && (
                                    <button
                                        type="button"
                                        onClick={() => endSession(s.id)}
                                        aria-label={t('settings.tabs.devices.endSession')}
                                        style={S.bg}
                                    >
                                        {t('settings.tabs.devices.endSession')}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </SettingSection>
            <SettingSection title={t('settings.tabs.devices.activeSessions', 'Active Sessions')}>
                <button type="button" onClick={endAllSessions} style={S.bg2}>
                    <FaDesktop style={S.font} /> {t('settings.tabs.devices.endAllSessions')}
                </button>
            </SettingSection>
        </div>
    );
};

DevicesTab.propTypes = {};
export default DevicesTab;
