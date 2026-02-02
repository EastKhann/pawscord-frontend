import React, { useState, useEffect } from 'react';
import './ServerStatsPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';

const ServerStatsPanel = ({ serverId, onClose }) => {
  const [stats, setStats] = useState(null);
  const [timeRange, setTimeRange] = useState('7d'); // 24h, 7d, 30d, all
  const [loading, setLoading] = useState(true);

  const apiBaseUrl = getApiBase();

  useEffect(() => {
    if (serverId) {
      fetchStats();
    }
  }, [serverId, timeRange]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiBaseUrl}/server-stats/${serverId}/?range=${timeRange}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('❌ İstatistikler yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const exportStats = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiBaseUrl}/server-stats/${serverId}/export/?range=${timeRange}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `server_stats_${serverId}_${timeRange}.csv`;
        a.click();
        toast.success('✅ İstatistikler dışa aktarıldı');
      }
    } catch (error) {
      console.error('Error exporting stats:', error);
      toast.error('❌ Dışa aktarma başarısız');
    }
  };

  if (loading) {
    return (
      <div className="server-stats-overlay">
        <div className="server-stats-panel">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>İstatistikler yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="server-stats-overlay" onClick={onClose}>
      <div className="server-stats-panel" onClick={(e) => e.stopPropagation()}>
        <div className="stats-header">
          <h2>📊 Sunucu İstatistikleri</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="stats-controls">
          <div className="time-range-selector">
            {['24h', '7d', '30d', 'all'].map(range => (
              <button
                key={range}
                className={`range-btn ${timeRange === range ? 'active' : ''}`}
                onClick={() => setTimeRange(range)}
              >
                {range === '24h' ? '24 Saat' : 
                 range === '7d' ? '7 Gün' : 
                 range === '30d' ? '30 Gün' : 'Tümü'}
              </button>
            ))}
          </div>

          <button className="export-btn" onClick={exportStats}>
            📥 CSV İndir
          </button>
        </div>

        {stats && (
          <div className="stats-content">
            <div className="stats-grid">
              <div className="stat-card primary">
                <span className="stat-icon">👥</span>
                <span className="stat-value">{stats.total_members || 0}</span>
                <span className="stat-label">Toplam Üye</span>
                <span className="stat-change positive">+{stats.new_members || 0} yeni</span>
              </div>

              <div className="stat-card success">
                <span className="stat-icon">🟢</span>
                <span className="stat-value">{stats.online_members || 0}</span>
                <span className="stat-label">Çevrimiçi</span>
                <span className="stat-change">{stats.online_percentage || 0}%</span>
              </div>

              <div className="stat-card info">
                <span className="stat-icon">💬</span>
                <span className="stat-value">{stats.total_messages || 0}</span>
                <span className="stat-label">Toplam Mesaj</span>
                <span className="stat-change">{stats.messages_per_day || 0}/gün</span>
              </div>

              <div className="stat-card warning">
                <span className="stat-icon">📢</span>
                <span className="stat-value">{stats.total_channels || 0}</span>
                <span className="stat-label">Kanallar</span>
                <span className="stat-change">{stats.active_channels || 0} aktif</span>
              </div>
            </div>

            <div className="charts-row">
              <div className="chart-card">
                <h3>Üye Aktivitesi</h3>
                <div className="activity-chart">
                  {stats.activity_by_hour?.map((hour, index) => (
                    <div key={index} className="hour-bar" title={`${index}:00 - ${hour} mesaj`}>
                      <div 
                        className="hour-fill" 
                        style={{ height: `${(hour / Math.max(...stats.activity_by_hour)) * 100}%` }}
                      ></div>
                      <span className="hour-label">{index}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chart-card">
                <h3>Üye Büyümesi</h3>
                <div className="growth-chart">
                  {stats.member_growth?.map((day, index) => (
                    <div key={index} className="growth-bar">
                      <div 
                        className="growth-fill" 
                        style={{ width: `${(day.count / Math.max(...stats.member_growth.map(d => d.count))) * 100}%` }}
                      >
                        <span className="growth-value">{day.count}</span>
                      </div>
                      <span className="growth-date">{day.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rankings-row">
              <div className="ranking-card">
                <h3>🏆 En Aktif Üyeler</h3>
                <div className="ranking-list">
                  {stats.top_members?.map((member, index) => (
                    <div key={index} className="ranking-item">
                      <span className="rank">{index + 1}</span>
                      <div className="member-avatar">
                        {member.avatar ? (
                          <img src={member.avatar} alt={member.username} />
                        ) : (
                          <span>{member.username[0]}</span>
                        )}
                      </div>
                      <span className="member-name">{member.username}</span>
                      <span className="member-score">{member.message_count} mesaj</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ranking-card">
                <h3>📢 En Aktif Kanallar</h3>
                <div className="ranking-list">
                  {stats.top_channels?.map((channel, index) => (
                    <div key={index} className="ranking-item">
                      <span className="rank">{index + 1}</span>
                      <span className="channel-icon">#</span>
                      <span className="channel-name">{channel.name}</span>
                      <span className="channel-score">{channel.message_count} mesaj</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="insights-section">
              <h3>💡 İçgörüler</h3>
              <div className="insights-grid">
                <div className="insight-card">
                  <span className="insight-icon">🔥</span>
                  <div className="insight-content">
                    <h4>En Yoğun Saat</h4>
                    <p>{stats.peak_hour || 'N/A'}</p>
                  </div>
                </div>

                <div className="insight-card">
                  <span className="insight-icon">📈</span>
                  <div className="insight-content">
                    <h4>Büyüme Oranı</h4>
                    <p>{stats.growth_rate || 0}% / hafta</p>
                  </div>
                </div>

                <div className="insight-card">
                  <span className="insight-icon">⭐</span>
                  <div className="insight-content">
                    <h4>Ortalama Aktivite</h4>
                    <p>{stats.avg_messages_per_member || 0} mesaj/üye</p>
                  </div>
                </div>

                <div className="insight-card">
                  <span className="insight-icon">🎯</span>
                  <div className="insight-content">
                    <h4>Tutma Oranı</h4>
                    <p>{stats.retention_rate || 0}%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="demographics-section">
              <h3>🌍 Demografi</h3>
              <div className="demographics-grid">
                <div className="demographic-item">
                  <h4>Diller</h4>
                  {stats.languages?.map((lang, index) => (
                    <div key={index} className="demo-bar">
                      <span className="demo-label">{lang.name}</span>
                      <div className="demo-progress">
                        <div className="demo-fill" style={{ width: `${lang.percentage}%` }}></div>
                      </div>
                      <span className="demo-value">{lang.percentage}%</span>
                    </div>
                  ))}
                </div>

                <div className="demographic-item">
                  <h4>Zaman Dilimleri</h4>
                  {stats.timezones?.map((tz, index) => (
                    <div key={index} className="demo-bar">
                      <span className="demo-label">{tz.name}</span>
                      <div className="demo-progress">
                        <div className="demo-fill" style={{ width: `${tz.percentage}%` }}></div>
                      </div>
                      <span className="demo-value">{tz.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServerStatsPanel;

