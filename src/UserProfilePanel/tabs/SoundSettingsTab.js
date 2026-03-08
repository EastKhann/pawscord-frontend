import React from 'react';
import profileStyles from '../styles';

const SoundSettingsTab = ({ handleSoundSettingsUpdate, soundSettings }) => {
  const styles = profileStyles;

  return (
    <div style={styles.card}>
      <h3 style={styles.sectionTitle}>🎵 Ses Ayarları</h3>

      <p style={{ color: '#b5bac1', marginBottom: '24px' }}>
        Uygulama seslerini özelleştirin.
      </p>

      <div style={styles.settingRow}>
        <div>
          <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>💬 Mesaj Sesi</h4>
          <p style={{ color: '#b5bac1', fontSize: '12px', margin: '4px 0 0 0' }}>
            Mesaj geldiğinde ses çal
          </p>
        </div>
        <div
          onClick={() => handleSoundSettingsUpdate('message_sound', !soundSettings.message_sound)}
          style={{
            width: '50px',
            height: '26px',
            background: soundSettings.message_sound ? '#5865f2' : 'rgba(255, 255, 255, 0.1)',
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
            left: soundSettings.message_sound ? '27px' : '3px',
            transition: 'all 0.3s',
          }} />
        </div>
      </div>

      <div style={styles.settingRow}>
        <div>
          <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>🔔 Bildirim Sesi</h4>
          <p style={{ color: '#b5bac1', fontSize: '12px', margin: '4px 0 0 0' }}>
            Bildirim geldiğinde ses çal
          </p>
        </div>
        <div
          onClick={() => handleSoundSettingsUpdate('notification_sound', !soundSettings.notification_sound)}
          style={{
            width: '50px',
            height: '26px',
            background: soundSettings.notification_sound ? '#5865f2' : 'rgba(255, 255, 255, 0.1)',
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
            left: soundSettings.notification_sound ? '27px' : '3px',
            transition: 'all 0.3s',
          }} />
        </div>
      </div>

      <div style={styles.settingRow}>
        <div>
          <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>🎤 Sesli Sohbet Ayrılma Sesi</h4>
          <p style={{ color: '#b5bac1', fontSize: '12px', margin: '4px 0 0 0' }}>
            Sesli sohbetten ayrıldığınızda ses çal
          </p>
        </div>
        <div
          onClick={() => handleSoundSettingsUpdate('voice_disconnect_sound', !soundSettings.voice_disconnect_sound)}
          style={{
            width: '50px',
            height: '26px',
            background: soundSettings.voice_disconnect_sound ? '#5865f2' : 'rgba(255, 255, 255, 0.1)',
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
            left: soundSettings.voice_disconnect_sound ? '27px' : '3px',
            transition: 'all 0.3s',
          }} />
        </div>
      </div>

      <div style={{ marginTop: '32px' }}>
        <h4 style={{ color: '#fff', marginBottom: '12px' }}>🔊 Ana Ses Seviyesi</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: '#b5bac1', fontSize: '14px', minWidth: '40px' }}>
            {soundSettings.volume}%
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={soundSettings.volume}
            onChange={(e) => handleSoundSettingsUpdate('volume', parseInt(e.target.value))}
            style={{
              flex: 1,
              height: '6px',
              borderRadius: '3px',
              background: `linear-gradient(to right, #5865f2 0%, #5865f2 ${soundSettings.volume}%, rgba(255,255,255,0.1) ${soundSettings.volume}%, rgba(255,255,255,0.1) 100%)`,
              outline: 'none',
              cursor: 'pointer',
            }}
          />
        </div>
      </div>

      {/* 🔥 YENİ: Gelişmiş Ses İyileştirme Ayarları */}
      <div style={{ marginTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
        <h3 style={{ ...styles.sectionTitle, fontSize: '16px', marginBottom: '16px' }}>
          🎙️ Gelişmiş Ses İyileştirme
        </h3>

        <div style={styles.settingRow}>
          <div>
            <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>🔇 Krisp Gürültü Engelleme</h4>
            <p style={{ color: '#b5bac1', fontSize: '12px', margin: '4px 0 0 0' }}>
              Arka plan gürültülerini akıllıca bastırır (AI powered)
            </p>
          </div>
          <div
            onClick={() => {
              const newValue = !soundSettings.krisp_enabled;
              handleSoundSettingsUpdate('krisp_enabled', newValue);
              if (newValue) toast.success('🔇 Krisp gürültü engelleme aktif!');
            }}
            style={{
              width: '50px',
              height: '26px',
              background: soundSettings.krisp_enabled ? '#23a559' : 'rgba(255, 255, 255, 0.1)',
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
              left: soundSettings.krisp_enabled ? '27px' : '3px',
              transition: 'all 0.3s',
            }} />
          </div>
        </div>

        {soundSettings.krisp_enabled && (
          <div style={{ marginTop: '16px', paddingLeft: '12px', borderLeft: '3px solid #23a559' }}>
            <h4 style={{ color: '#fff', marginBottom: '8px', fontSize: '13px' }}>
              🎚️ Gürültü Bastırma Seviyesi
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: '#b5bac1', fontSize: '12px', minWidth: '60px' }}>
                {soundSettings.noise_suppression_level || 80}%
                {(soundSettings.noise_suppression_level || 80) >= 90 && ' 🔥'}
              </span>
              <input
                type="range"
                min="50"
                max="100"
                value={soundSettings.noise_suppression_level || 80}
                onChange={(e) => handleSoundSettingsUpdate('noise_suppression_level', parseInt(e.target.value))}
                style={{
                  flex: 1,
                  height: '4px',
                  borderRadius: '2px',
                  background: `linear-gradient(to right, #23a559 0%, #23a559 ${(soundSettings.noise_suppression_level || 80) - 50}%, rgba(255,255,255,0.1) ${(soundSettings.noise_suppression_level || 80) - 50}%, rgba(255,255,255,0.1) 100%)`,
                  outline: 'none',
                  cursor: 'pointer',
                }}
              />
            </div>
            <p style={{ color: '#949ba4', fontSize: '11px', marginTop: '4px' }}>
              💡 Yüksek değerler daha fazla gürültü engeller ama sesinizi de etkileyebilir
            </p>
          </div>
        )}

        <div style={{ ...styles.settingRow, marginTop: '20px' }}>
          <div>
            <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>🎵 Yankı Önleme</h4>
            <p style={{ color: '#b5bac1', fontSize: '12px', margin: '4px 0 0 0' }}>
              Hoparlör sesinin mikrofona geri yansımasını engeller
            </p>
          </div>
          <div
            onClick={() => {
              const newValue = !soundSettings.echo_cancellation;
              handleSoundSettingsUpdate('echo_cancellation', newValue);
            }}
            style={{
              width: '50px',
              height: '26px',
              background: soundSettings.echo_cancellation !== false ? '#23a559' : 'rgba(255, 255, 255, 0.1)',
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
              left: soundSettings.echo_cancellation !== false ? '27px' : '3px',
              transition: 'all 0.3s',
            }} />
          </div>
        </div>

        <div style={styles.settingRow}>
          <div>
            <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>📊 Otomatik Ses Seviyesi</h4>
            <p style={{ color: '#b5bac1', fontSize: '12px', margin: '4px 0 0 0' }}>
              Mikrofonunuzu otomatik normalize eder (Auto Gain Control)
            </p>
          </div>
          <div
            onClick={() => {
              const newValue = !soundSettings.auto_gain_control;
              handleSoundSettingsUpdate('auto_gain_control', newValue);
            }}
            style={{
              width: '50px',
              height: '26px',
              background: soundSettings.auto_gain_control !== false ? '#23a559' : 'rgba(255, 255, 255, 0.1)',
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
              left: soundSettings.auto_gain_control !== false ? '27px' : '3px',
              transition: 'all 0.3s',
            }} />
          </div>
        </div>

        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: 'rgba(114, 137, 218, 0.1)', borderRadius: '8px', borderLeft: '3px solid #5865f2' }}>
          <p style={{ color: '#b5bac1', fontSize: '12px', margin: 0 }}>
            💡 <strong style={{ color: '#fff' }}>Profesyonel İpucu:</strong> En iyi sonuç için tüm iyileştirmeleri açık tutun.
            Eğer ses robotikleşirse gürültü bastırma seviyesini 70-80% arası deneyin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SoundSettingsTab;
