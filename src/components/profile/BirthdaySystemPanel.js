/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import './BirthdaySystemPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const BirthdaySystemPanel = ({ serverId, onClose }) => {
    const { t } = useTranslation();
    const apiBaseUrl = getApiBase();

    const [config, setConfig] = useState({
        enabled: false,
        announcement_channel_id: '',
        birthday_role_id: '',
        message_template: "🎉 Today @{user}'birthday! Happy birthday! 🎂",
        give_role: true,
        remove_role_after_day: true,
    });
    const [birthdays, setBirthdays] = useState([]);
    const [upcomingBirthdays, setUpcomingBirthgüns] = useState([]);
    const [channels, setChannels] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchConfig();
        fetchBirthdays();
        fetchChannels();
        fetchRoles();
    }, [serverId]);

    const fetchConfig = async () => {
        try {
            const response = await fetch(
                `${apiBaseUrl}/birthday-system/server/${serverId}/config/`,
                {
                    headers: { Authorization: `Bearer ${getToken()}` },
                }
            );
            if (response.ok) {
                const data = await response.json();
                setConfig(data);
            }
        } catch (error) {
            logger.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBirthdays = async () => {
        try {
            const response = await fetch(
                `${apiBaseUrl}/birthday-system/server/${serverId}/birthdays/`,
                {
                    headers: { Authorization: `Bearer ${getToken()}` },
                }
            );
            if (response.ok) {
                const data = await response.json();
                setBirthdays(data.all_birthdays);
                setUpcomingBirthgüns(data.upcoming);
            }
        } catch (error) {
            logger.error('Error:', error);
        }
    };

    const fetchChannels = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/channels/server/${serverId}/`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (response.ok) {
                const data = await response.json();
                setChannels(data.filter((ch) => ch.type === 'text'));
            }
        } catch (error) {
            logger.error('Error:', error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/roles/server/${serverId}/`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (response.ok) {
                const data = await response.json();
                setRoles(data);
            }
        } catch (error) {
            logger.error('Error:', error);
        }
    };

    const saveConfig = async () => {
        try {
            const response = await fetch(
                `${apiBaseUrl}/birthday-system/server/${serverId}/config/`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(config),
                }
            );

            if (response.ok) {
                toast.success(t('birthday.settingsSaved'));
            } else {
                toast.error(t('birthday.saveError'));
            }
        } catch (error) {
            toast.error(t('birthday.connectionError'));
        }
    };

    const testMessage = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/birthday-system/server/${serverId}/test/`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (response.ok) {
                toast.success(t('birthday.testSent'));
            }
        } catch (error) {
            toast.error(t('ui.sendim_hatasi'));
        }
    };

    const formatBirthday = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
    };

    const getDaysUntil = (date) => {
        const now = new Date();
        const birthday = new Date(date);
        birthday.setFullYear(now.getFullYear());
        if (birthday < now) birthday.setFullYear(now.getFullYear() + 1);
        const diff = Math.ceil((birthday - now) / (1000 * 60 * 60 * 24));
        return diff;
    };

    return (
        <div
            className="birthday-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="birthday-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="birthday-header">
                    <h2>🎂 {t('birthday.title')}</h2>
                    <button aria-label="Close" className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="birthday-content">
                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>{t('common.loading')}</p>
                        </div>
                    ) : (
                        <>
                            <div className="config-section">
                                <div className="section-header">
                                    <h3>⚙️ {t('birthday.settings')}</h3>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={config.enabled}
                                            onChange={(e) =>
                                                setConfig({ ...config, enabled: e.target.checked })
                                            }
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>

                                <div className="config-grid">
                                    <div className="form-group">
                                        <label>📢 {t('birthday.announcementChannel')}</label>
                                        <select
                                            value={config.announcement_channel_id}
                                            onChange={(e) =>
                                                setConfig({
                                                    ...config,
                                                    announcement_channel_id: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="">{t('birthday.select')}</option>
                                            {channels.map((ch) => (
                                                <option key={ch.id} value={ch.id}>
                                                    {ch.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>🎭 {t('birthday.birthdayRole')}</label>
                                        <select
                                            value={config.birthday_role_id}
                                            onChange={(e) =>
                                                setConfig({
                                                    ...config,
                                                    birthday_role_id: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="">{t('common.none')}</option>
                                            {roles.map((r) => (
                                                <option key={r.id} value={r.id}>
                                                    @{r.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group full-width">
                                        <label>💬 {t('birthday.messageTemplate')}</label>
                                        <textarea
                                            value={config.message_template}
                                            onChange={(e) =>
                                                setConfig({
                                                    ...config,
                                                    message_template: e.target.value,
                                                })
                                            }
                                            rows="2"
                                        />
                                        <small>
                                            {t('birthday.availableVars')}: {'{user}'}, {'{age}'},{' '}
                                            {'{server}'}
                                        </small>
                                    </div>

                                    <div className="form-group">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={config.give_role}
                                                onChange={(e) =>
                                                    setConfig({
                                                        ...config,
                                                        give_role: e.target.checked,
                                                    })
                                                }
                                            />
                                            <span>{t('birthday.giveRole')}</span>
                                        </label>
                                    </div>

                                    <div className="form-group">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={config.remove_role_after_day}
                                                onChange={(e) =>
                                                    setConfig({
                                                        ...config,
                                                        remove_role_after_day: e.target.checked,
                                                    })
                                                }
                                            />
                                            <span>{t('birthday.removeRoleAfterDay')}</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="config-actions">
                                    <button
                                        aria-label="save Config"
                                        className="save-btn"
                                        onClick={saveConfig}
                                    >
                                        💾 {t('common.save')}
                                    </button>
                                    <button
                                        aria-label="test Message"
                                        className="test-btn"
                                        onClick={testMessage}
                                    >
                                        ✉️ {t('birthday.testMessage')}
                                    </button>
                                </div>
                            </div>

                            <div className="upcoming-section">
                                <h3>📅 {t('birthday.upcomingBirthdays')}</h3>
                                {upcomingBirthdays.length === 0 ? (
                                    <div className="empty-state-small">
                                        <p>{t('birthday.noUpcoming')}</p>
                                    </div>
                                ) : (
                                    <div className="upcoming-list">
                                        {upcomingBirthdays.map((bd) => (
                                            <div key={bd.user_id} className="upcoming-card">
                                                <div className="upcoming-avatar">
                                                    {bd.user_avatar ? (
                                                        <img src={bd.user_avatar} alt="" />
                                                    ) : (
                                                        <div className="default-avatar">👤</div>
                                                    )}
                                                </div>
                                                <div className="upcoming-info">
                                                    <h4>{bd.user_name}</h4>
                                                    <p>{formatBirthday(bd.birthday)}</p>
                                                </div>
                                                <div className="upcoming-days">
                                                    <span className="days-badge">
                                                        {getDaysUntil(bd.birthday)}{' '}
                                                        {t('birthday.day')}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="all-birthdays-section">
                                <h3>
                                    📋 {t('birthday.allBirthdays')} ({birthdays.length})
                                </h3>
                                <div className="birthdays-grid">
                                    {birthdays.map((bd) => (
                                        <div key={bd.user_id} className="birthday-item">
                                            <span className="user-name">{bd.user_name}</span>
                                            <span className="birthday-date">
                                                {formatBirthday(bd.birthday)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

BirthdaySystemPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default BirthdaySystemPanel;
