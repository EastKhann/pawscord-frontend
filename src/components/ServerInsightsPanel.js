import React, { useState, useEffect } from 'react';
import './ServerInsightsPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';

const ServerInsightsPanel = ({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();

  const [insights, setInsights] = useState({
    member_growth: [],
    message_trends: [],
    active_hours: [],
    top_channels: [],
    top_users: [],
    engagement_score: 0
  });
  const [stats, setStats] = useState({
    total_members: 0,
    online_members: 0,
    messages_today: 0,
    active_users: 0,
    growth_rate: 0
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    fetchInsights();
    fetchStats();
  }, [serverId, timeRange]);

  const fetchInsights = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/insights/server/${serverId}/?range=${timeRange}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setInsights(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/insights/server/${serverId}/stats/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const exportReport = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/insights/server/${serverId}/export/?range=${timeRange}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `insights_${serverId}_${timeRange}.pdf`;
        a.click();
        toast.success('✅ Rapor indiriliyor');
      }
    } catch (error) {
      toast.error('❌ İndirme hatası');
    }
  };

  const getEngagementColor = (score) => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="insights-overlay" onClick={onClose}>
      <div className="insights-panel" onClick={(e) => e.stopPropagation()}>
        <div className="insights-header">
          <h2>📊 Sunucu İstatistikleri</h2>
          <div className="header-actions">
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <option value="24h">Son 24 Saat</option>
              <option value="7d">Son 7 Gün</option>
              <option value="30d">Son 30 Gün</option>
              <option value="90d">Son 90 Gün</option>
            </select>
            <button className="export-btn" onClick={exportReport}>📥 Rapor İndir</button>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
        </div>

        <div className="insights-content">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Yükleniyor...</p>
            </div>
          ) : (
            <>
              <div className="overview-section">
                <div className="stat-card">
                  <span className="stat-icon">👥</span>
                  <div className="stat-info">
                    <h3>{stats.total_members}</h3>
                    <p>Toplam Üye</p>
                    <span className="stat-trend positive">+{stats.growth_rate}%</span>
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-icon">🟢</span>
                  <div className="stat-info">
                    <h3>{stats.online_members}</h3>
                    <p>Çevrimiçi</p>
                    <span className="stat-percentage">{Math.round((stats.online_members / stats.total_members) * 100)}%</span>
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-icon">💬</span>
                  <div className="stat-info">
                    <h3>{stats.messages_today}</h3>
                    <p>Bugünkü Mesajlar</p>
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-icon">⚡</span>
                  <div className="stat-info">
                    <h3>{stats.active_users}</h3>
                    <p>Aktif Kullanıcı</p>
                  </div>
                </div>
              </div>

              <div className="engagement-section">
                <div className="engagement-card">
                  <h3>💎 Etkileşim Skoru</h3>
                  <div className="engagement-circle" style={{background: `conic-gradient(${getEngagementColor(insights.engagement_score)} ${insights.engagement_score * 3.6}deg, rgba(255,255,255,.1) 0deg)`}}>
                    <div className="engagement-inner">
                      <span className="engagement-value">{insights.engagement_score}</span>
                      <span className="engagement-max">/100</span>
                    </div>
                  </div>
                  <p className="engagement-label">
                    {insights.engagement_score >= 80 ? '🔥 Mükemmel' : insights.engagement_score >= 60 ? '👍 İyi' : '📉 Geliştirilmeli'}
                  </p>
                </div>

                <div className="active-hours-card">
                  <h3>⏰ En Aktif Saatler</h3>
                  <div className="hours-chart">
                    {insights.active_hours.map((hour, idx) => (
                      <div key={idx} className="hour-bar">
                        <div className="bar-fill" style={{height: `${(hour.count / Math.max(...insights.active_hours.map(h => h.count))) * 100}%`}}></div>
                        <span className="hour-label">{hour.hour}:00</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="charts-section">
                <div className="chart-card">
                  <h3>📈 Üye Büyümesi</h3>
                  <div className="line-chart">
                    {insights.member_growth.map((point, idx) => (
                      <div key={idx} className="chart-point" style={{left: `${(idx / (insights.member_growth.length - 1)) * 100}%`, bottom: `${(point.count / Math.max(...insights.member_growth.map(p => p.count))) * 80}%`}}>
                        <div className="point-dot"></div>
                        <div className="point-tooltip">{point.count} üye</div>
                      </div>
                    ))}
                  </div>
                  <div className="chart-labels">
                    {insights.member_growth.map((point, idx) => (
                      <span key={idx}>{point.date}</span>
                    ))}
                  </div>
                </div>

                <div className="chart-card">
                  <h3>💬 Mesaj Trendleri</h3>
                  <div className="bar-chart">
                    {insights.message_trends.map((day, idx) => (
                      <div key={idx} className="chart-bar">
                        <div className="bar-fill" style={{height: `${(day.count / Math.max(...insights.message_trends.map(d => d.count))) * 100}%`}}>
                          <span className="bar-value">{day.count}</span>
                        </div>
                        <span className="bar-label">{day.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rankings-section">
                <div className="ranking-card">
                  <h3>🏆 En Aktif Kanallar</h3>
                  <div className="ranking-list">
                    {insights.top_channels.map((channel, idx) => (
                      <div key={idx} className="ranking-item">
                        <span className="rank">#{idx + 1}</span>
                        <span className="name"># {channel.name}</span>
                        <span className="count">{channel.messages} mesaj</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="ranking-card">
                  <h3>⭐ En Aktif Kullanıcılar</h3>
                  <div className="ranking-list">
                    {insights.top_users.map((user, idx) => (
                      <div key={idx} className="ranking-item">
                        <span className="rank">#{idx + 1}</span>
                        <div className="user-info">
                          {user.avatar ? <img src={user.avatar} alt="" /> : <div className="default-avatar">👤</div>}
                          <span className="name">{user.name}</span>
                        </div>
                        <span className="count">{user.messages} mesaj</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServerInsightsPanel;

