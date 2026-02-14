import { FaUsers, FaComments, FaClock, FaInfoCircle, FaChartBar, FaHeart, FaGlobe, FaLink } from 'react-icons/fa';
import { formatNumber, renderSimpleChart } from './useAdvancedAnalytics';

export const ChartsSection = ({ memberActivity, messageActivity, peakHours }) => {
  const renderPeakHoursChart = () => {
    const hours = Array(24).fill(0).map((_, i) => {
      const h = peakHours.find(x => x.hour === i);
      return { hour: i, value: h?.value || 0 };
    });
    const max = Math.max(...hours.map(h => h.value));
    return (
      <div className="peak-hours-chart">
        {hours.map((h, idx) => (
          <div key={idx} className="hour-bar" style={{ height: `${max > 0 ? (h.value / max) * 100 : 0}%`, background: h.value > max * 0.8 ? '#23a559' : h.value > max * 0.5 ? '#5865f2' : '#3f4147' }} title={`${h.hour}:00 - ${h.value} mesaj`}>
            <span className="hour-label">{h.hour}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="charts-grid">
      <div className="chart-card">
        <div className="chart-header"><h3><FaUsers /> {'Ü'}ye Aktivitesi</h3></div>
        <div className="chart-body">{memberActivity.length > 0 ? renderSimpleChart(memberActivity, '#5865f2', 120) : <div className="no-data">Veri yok</div>}</div>
      </div>
      <div className="chart-card">
        <div className="chart-header"><h3><FaComments /> Mesaj Aktivitesi</h3></div>
        <div className="chart-body">{messageActivity.length > 0 ? renderSimpleChart(messageActivity, '#23a559', 120) : <div className="no-data">Veri yok</div>}</div>
      </div>
      <div className="chart-card wide">
        <div className="chart-header"><h3><FaClock /> Yo{'ğ'}unluk Saatleri</h3><span className="chart-info"><FaInfoCircle /> En yo{'ğ'}un saatler ye{'ş'}il ile g{'ö'}sterilir</span></div>
        <div className="chart-body">{peakHours.length > 0 ? renderPeakHoursChart() : <div className="no-data">Veri yok</div>}</div>
      </div>
    </div>
  );
};

export const ListsSection = ({ topChannels, topMembers, reactionStats, geoData }) => (
  <div className="lists-grid">
    <div className="list-card">
      <div className="list-header"><h3><FaChartBar /> En Aktif Kanallar</h3></div>
      <div className="list-body">
        {topChannels.length > 0 ? topChannels.map((ch, idx) => (
          <div key={ch.id} className="list-item">
            <span className="rank">{idx + 1}</span>
            <span className="name"># {ch.name}</span>
            <div className="bar-container"><div className="bar" style={{ width: `${(ch.messages / topChannels[0].messages) * 100}%` }} /></div>
            <span className="value">{formatNumber(ch.messages)}</span>
          </div>
        )) : <div className="no-data">Veri yok</div>}
      </div>
    </div>
    <div className="list-card">
      <div className="list-header"><h3><FaUsers /> En Aktif {'Ü'}yeler</h3></div>
      <div className="list-body">
        {topMembers.length > 0 ? topMembers.map((m, idx) => (
          <div key={m.id} className="list-item">
            <span className="rank">{idx + 1}</span>
            <img src={m.avatar || '/default-avatar.png'} alt={m.username} className="avatar" />
            <span className="name">{m.username}</span>
            <span className="value">{formatNumber(m.messages)} mesaj</span>
          </div>
        )) : <div className="no-data">Veri yok</div>}
      </div>
    </div>
    <div className="list-card">
      <div className="list-header"><h3><FaHeart /> En {'Ç'}ok Kullan{'ı'}lan Reaksiyonlar</h3></div>
      <div className="list-body">
        {reactionStats.length > 0 ? (
          <div className="reactions-grid">
            {reactionStats.map((r, idx) => <div key={idx} className="reaction-item"><span className="emoji">{r.emoji}</span><span className="count">{formatNumber(r.count)}</span></div>)}
          </div>
        ) : <div className="no-data">Veri yok</div>}
      </div>
    </div>
    <div className="list-card">
      <div className="list-header"><h3><FaGlobe /> Co{'ğ'}rafi Da{'ğı'}l{'ı'}m</h3></div>
      <div className="list-body">
        {geoData.length > 0 ? geoData.map((g, idx) => (
          <div key={idx} className="list-item">
            <span className="flag">{g.flag || '🌍'}</span>
            <span className="name">{g.country}</span>
            <div className="bar-container"><div className="bar geo" style={{ width: `${(g.count / geoData[0].count) * 100}%` }} /></div>
            <span className="value">{g.percentage}%</span>
          </div>
        )) : <div className="no-data">Veri yok</div>}
      </div>
    </div>
  </div>
);

export const LinkClicksSection = ({ linkClicks }) => {
  if (linkClicks.length === 0) return null;
  return (
    <div className="links-section">
      <h3><FaLink /> Link T{'ı'}klamalar{'ı'}</h3>
      <div className="links-table">
        <div className="table-header"><span>URL</span><span>T{'ı'}klama</span><span>Benzersiz</span></div>
        {linkClicks.map((link, idx) => (
          <div key={idx} className="table-row">
            <span className="link-url" title={link.url}>{link.url.length > 50 ? link.url.substring(0, 50) + '...' : link.url}</span>
            <span>{formatNumber(link.clicks)}</span>
            <span>{formatNumber(link.unique_clicks)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
