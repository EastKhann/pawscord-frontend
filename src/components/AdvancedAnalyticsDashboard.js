import { FaChartLine, FaTimes, FaSyncAlt, FaDownload } from 'react-icons/fa';
import './AdvancedAnalyticsDashboard.css';
import useAdvancedAnalytics from './AdvancedAnalyticsDashboard/useAdvancedAnalytics';
import OverviewCards from './AdvancedAnalyticsDashboard/OverviewCards';
import { ChartsSection, ListsSection, LinkClicksSection } from './AdvancedAnalyticsDashboard/AnalyticsSections';

const TIME_RANGES = [
  { value: '24h', label: '24 Saat' }, { value: '7d', label: '7 Gün' },
  { value: '30d', label: '30 Gün' }, { value: '90d', label: '90 Gün' },
];

const AdvancedAnalyticsDashboard = ({ serverId, apiBaseUrl, onClose }) => {
  const {
    timeRange, setTimeRange, loading, refreshing,
    overview, memberActivity, messageActivity, topChannels, topMembers,
    geoData, reactionStats, linkClicks, peakHours,
    handleRefresh, handleExport,
  } = useAdvancedAnalytics(serverId, apiBaseUrl);

  if (loading) {
    return (
      <div className="analytics-overlay" onClick={onClose}>
        <div className="analytics-panel" onClick={e => e.stopPropagation()}>
          <div className="loading-state"><div className="spinner" /><p>Analitik verileri y{'ü'}kleniyor...</p></div>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-overlay" onClick={onClose}>
      <div className="analytics-panel" onClick={e => e.stopPropagation()}>
        <div className="analytics-header">
          <h2><FaChartLine /> Geli{'ş'}mi{'ş'} Analitik</h2>
          <div className="header-controls">
            <div className="time-range-selector">
              {TIME_RANGES.map(r => (
                <button key={r.value} className={`range-btn ${timeRange === r.value ? 'active' : ''}`} onClick={() => setTimeRange(r.value)}>{r.label}</button>
              ))}
            </div>
            <button className="action-btn" onClick={handleRefresh} disabled={refreshing}>
              <FaSyncAlt className={refreshing ? 'spinning' : ''} />
            </button>
            <button className="action-btn" onClick={handleExport}><FaDownload /></button>
          </div>
          <button className="close-btn" onClick={onClose}><FaTimes /></button>
        </div>

        <div className="analytics-content">
          <OverviewCards overview={overview} />
          <ChartsSection memberActivity={memberActivity} messageActivity={messageActivity} peakHours={peakHours} />
          <ListsSection topChannels={topChannels} topMembers={topMembers} reactionStats={reactionStats} geoData={geoData} />
          <LinkClicksSection linkClicks={linkClicks} />
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalyticsDashboard;
