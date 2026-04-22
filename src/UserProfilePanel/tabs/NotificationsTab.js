import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import profileStyles from '../styles';
const _s = (o) => o;

const _st1 = { color: '#b5bac1', marginBottom: '24px' };

const Toggle = ({ checked, onToggle, ariaLabel }) => (
  <div
    role="switch"
    aria-checked={checked}
    tabIndex={0}
    onClick={onToggle}
    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onToggle()}
    aria-label={ariaLabel}
    style={_s({
      width: '50px',
      height: '26px',
      background: checked ? '#5865f2' : 'rgba(255, 255, 255, 0.1)',
      borderRadius: '26px',
      cursor: 'pointer',
      position: 'relative',
      transition: 'all 0.3s',
    })}
  >
    <div
      style={_s({
        position: 'absolute',
        width: '20px',
        height: '20px',
        background: '#fff',
        borderRadius: '50%',
        top: '3px',
        left: checked ? '27px' : '3px',
        transition: 'all 0.3s',
      })}
    />
  </div>
);

Toggle.propTypes = { checked: PropTypes.bool, onToggle: PropTypes.func, ariaLabel: PropTypes.string };

const SETTINGS = [
  { key: 'message_notifications', icon: '💬', titleKey: 'notifications.message', titleDefault: 'Message Notifications', descKey: 'notifications.messageDesc', descDefault: 'Show notification when a new message arrives', toggleKey: 'notifications.messageToggle', toggleDefault: 'Message notifications toggle' },
  { key: 'mention_notifications', icon: '@️⃣', titleKey: 'notifications.mention', titleDefault: 'Mention Notifications', descKey: 'notifications.mentionDesc', descDefault: 'Show notification when someone mentions you', toggleKey: 'notifications.mentionToggle', toggleDefault: 'Mention notifications toggle' },
  { key: 'dm_notifications', icon: '📨', titleKey: 'notifications.dm', titleDefault: 'DM Notifications', descKey: 'notifications.dmDesc', descDefault: 'Show notification when a direct message arrives', toggleKey: 'notifications.dmToggle', toggleDefault: 'DM notifications toggle' },
  { key: 'email_notifications', icon: '📧', titleKey: 'notifications.email', titleDefault: 'Email Notifications', descKey: 'notifications.emailDesc', descDefault: 'Send email for important events', toggleKey: 'notifications.emailToggle', toggleDefault: 'Email notifications toggle' },
];

const NotificationsTab = ({ handleNotificationSettingsUpdate, notificationSettings }) => {
  const { t } = useTranslation();
  const styles = profileStyles;
  return (
    <div aria-label={t('aria.notificationsTab', 'Notifications')} style={styles.card}>
      <h3 style={styles.sectionTitle}>🔔 {t('notifications.settings', 'Notification Settings')}</h3>
      <p style={_st1}>{t('notifications.settingsDesc', 'Choose which notifications you want to receive.')}</p>
      {SETTINGS.map((s) => (
        <div key={s.key} style={styles.settingRow}>
          <div>
            <h4 style={styles.settingRowTitle}>{s.icon} {t(s.titleKey, s.titleDefault)}</h4>
            <p style={styles.settingRowDesc}>{t(s.descKey, s.descDefault)}</p>
          </div>
          <Toggle
            checked={!!notificationSettings[s.key]}
            onToggle={() => handleNotificationSettingsUpdate(s.key, !notificationSettings[s.key])}
            ariaLabel={t(s.toggleKey, s.toggleDefault)}
          />
        </div>
      ))}
    </div>
  );
};

NotificationsTab.propTypes = { handleNotificationSettingsUpdate: PropTypes.func, notificationSettings: PropTypes.object };
export default NotificationsTab;
