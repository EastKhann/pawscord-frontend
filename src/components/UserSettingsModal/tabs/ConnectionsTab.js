import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    FaSteam,
    FaSpotify,
    FaInstagram,
    FaTwitter,
    FaXbox,
    FaPlaystation,
    FaGithub,
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import SettingSection from '../components/SettingSection';
import ut from './UserTabs.module.css';

const CONNECTIONS = [
    { id: 'steam', name: 'Steam', icon: FaSteam, color: '#171a21' },
    { id: 'spotify', name: 'Spotify', icon: FaSpotify, color: '#1DB954' },
    { id: 'instagram', name: 'Instagram', icon: FaInstagram, color: '#E4405F' },
    { id: 'twitter', name: 'X (Twitter)', icon: FaTwitter, color: '#1DA1F2' },
    { id: 'xbox', name: 'Xbox', icon: FaXbox, color: '#107C10' },
    { id: 'playstation', name: 'PlayStation', icon: FaPlaystation, color: '#003791' },
    { id: 'github', name: 'GitHub', icon: FaGithub, color: '#333' },
];

const ConnectionsTab = () => {
    const { t } = useTranslation();
    const [connectedIds, setConnectedIds] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('pawscord_connections') || '[]');
        } catch {
            return [];
        }
    });

    const toggleConnection = (id) => {
        setConnectedIds((prev) => {
            const next = prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id];
            localStorage.setItem('pawscord_connections', JSON.stringify(next));
            return next;
        });
    };

    return (
        <div>
            <SettingSection title={t('settings.tabs.connections.connectedAccounts')}>
                <p className={ut.mutedMdMb16}>{t('settings.tabs.connections.manageDesc')}</p>
                <div className={ut.flexColGap8}>
                    {CONNECTIONS.map((c) => {
                        const isConnected = connectedIds.includes(c.id);
                        const Icon = c.icon;
                        return (
                            <div
                                key={c.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '12px 16px',
                                    backgroundColor: '#0d0e10',
                                    borderRadius: 8,
                                    border: isConnected
                                        ? `1px solid ${c.color}44`
                                        : '1px solid transparent',
                                }}
                            >
                                <div className={ut.flexAlignGap12}>
                                    <Icon
                                        style={{
                                            fontSize: 24,
                                            color: isConnected ? c.color : '#949ba4',
                                        }}
                                    />
                                    <div>
                                        <div className={ut.whiteBold14}>{c.name}</div>
                                        <div
                                            style={{
                                                color: isConnected ? '#3ba55c' : '#949ba4',
                                                fontSize: 12,
                                            }}
                                        >
                                            {isConnected
                                                ? t('settings.tabs.connections.connected')
                                                : t('settings.tabs.connections.notConnected')}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => toggleConnection(c.id)}
                                    aria-label={
                                        isConnected
                                            ? t('settings.tabs.connections.disconnect') +
                                              ' ' +
                                              c.name
                                            : t('settings.tabs.connections.connect') + ' ' + c.name
                                    }
                                    style={{
                                        padding: '6px 16px',
                                        borderRadius: 4,
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: 13,
                                        fontWeight: 600,
                                        backgroundColor: isConnected
                                            ? 'rgba(218,55,60,0.15)'
                                            : 'rgba(88,101,242,0.15)',
                                        color: isConnected ? '#da373c' : '#5865f2',
                                    }}
                                >
                                    {isConnected
                                        ? t('settings.tabs.connections.disconnect')
                                        : t('settings.tabs.connections.connect')}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </SettingSection>
        </div>
    );
};

ConnectionsTab.propTypes = {};
export default ConnectionsTab;
