import React from 'react';
import profileStyles from '../styles';

const NotificationsTab = ({ handleNotificationSettingsUpdate, notificationSettings }) => {
  const styles = profileStyles;

  return (
    <div style={styles.card}>
      <h3 style={styles.sectionTitle}>🔔 Bildirim Ayarları</h3>

      <p style={{ color: '#b5bac1', marginBottom: '24px' }}>
        Hangi bildirimlerle uyarılmak istediğinizi seçin.
      </p>

      <div style={styles.settingRow}>
        <div>
          <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>💬 Mesaj Bildirimleri</h4>
          <p style={{ color: '#b5bac1', fontSize: '12px', margin: '4px 0 0 0' }}>
            Yeni mesaj geldiğinde bildirim göster
          </p>
        </div>
        <div
          onClick={() => handleNotificationSettingsUpdate('message_notifications', !notificationSettings.message_notifications)}
          style={{
            width: '50px',
            height: '26px',
            background: notificationSettings.message_notifications ? '#5865f2' : 'rgba(255, 255, 255, 0.1)',
            borderRadius: '26px',
            cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.3s',
          }}
        >
          <div style={{
            position: 'absolute',
            width: '20px',
            height: '20px',
            background: '#fff',
            borderRadius: '50%',
            top: '3px',
            left: notificationSettings.message_notifications ? '27px' : '3px',
            transition: 'all 0.3s',
          }} />
        </div>
      </div>

      <div style={styles.settingRow}>
        <div>
          <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>@️⃣ Bahsetme Bildirimleri</h4>
          <p style={{ color: '#b5bac1', fontSize: '12px', margin: '4px 0 0 0' }}>
            Biri sizi etiketlediğinde bildirim göster
          </p>
        </div>
        <div
          onClick={() => handleNotificationSettingsUpdate('mention_notifications', !notificationSettings.mention_notifications)}
          style={{
            width: '50px',
            height: '26px',
            background: notificationSettings.mention_notifications ? '#5865f2' : 'rgba(255, 255, 255, 0.1)',
            borderRadius: '26px',
            cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.3s',
          }}
        >
          <div style={{
            position: 'absolute',
            width: '20px',
            height: '20px',
            background: '#fff',
            borderRadius: '50%',
            top: '3px',
            left: notificationSettings.mention_notifications ? '27px' : '3px',
            transition: 'all 0.3s',
          }} />
        </div>
      </div>

      <div style={styles.settingRow}>
        <div>
          <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>📨 DM Bildirimleri</h4>
          <p style={{ color: '#b5bac1', fontSize: '12px', margin: '4px 0 0 0' }}>
            Direkt mesaj geldiğinde bildirim göster
          </p>
        </div>
        <div
          onClick={() => handleNotificationSettingsUpdate('dm_notifications', !notificationSettings.dm_notifications)}
          style={{
            width: '50px',
            height: '26px',
            background: notificationSettings.dm_notifications ? '#5865f2' : 'rgba(255, 255, 255, 0.1)',
            borderRadius: '26px',
            cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.3s',
          }}
        >
          <div style={{
            position: 'absolute',
            width: '20px',
            height: '20px',
            background: '#fff',
            borderRadius: '50%',
            top: '3px',
            left: notificationSettings.dm_notifications ? '27px' : '3px',
            transition: 'all 0.3s',
          }} />
        </div>
      </div>

      <div style={styles.settingRow}>
        <div>
          <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>📧 E-posta Bildirimleri</h4>
          <p style={{ color: '#b5bac1', fontSize: '12px', margin: '4px 0 0 0' }}>
            Önemli olaylar için e-posta gönder
          </p>
        </div>
        <div
          onClick={() => handleNotificationSettingsUpdate('email_notifications', !notificationSettings.email_notifications)}
          style={{
            width: '50px',
            height: '26px',
            background: notificationSettings.email_notifications ? '#5865f2' : 'rgba(255, 255, 255, 0.1)',
            borderRadius: '26px',
            cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.3s',
          }}
        >
          <div style={{
            position: 'absolute',
            width: '20px',
            height: '20px',
            background: '#fff',
            borderRadius: '50%',
            top: '3px',
            left: notificationSettings.email_notifications ? '27px' : '3px',
            transition: 'all 0.3s',
          }} />
        </div>
      </div>
    </div>
  );
};

export default NotificationsTab;
