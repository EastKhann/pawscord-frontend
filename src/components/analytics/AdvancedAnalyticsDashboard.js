import { FaChartLine, FaTimes, FaSyncAlt, FaDownload } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './AdvancedAnalyticsDashboard.css';
import useAdvancedAnalytics from '../AdvancedAnalyticsDashboard/useAdvancedAnalytics';
import OverviewCards from '../AdvancedAnalyticsDashboard/OverviewCards';
import {
    ChartsSection,
    ListsSection,
    LinkClicksSection,
} from '../AdvancedAnalyticsDashboard/AnalyticsSections';
import { useTranslation } from 'react-i18next';

const TIME_RANGES = [
    { value: '24h', label: '24 Saat' },
    { value: '7d', label: '7 Gün' },
    { value: '30d', label: '30 Gün' },
    { value: '90d', label: '90 Days' },
];

const AdvancedAnalyticsDashboard = ({ serverId, apiBaseUrl, onClose }) => {
    const { t } = useTranslation();

    const {
        timeRange,
        setTimeRange,
        loading,
        refreshing,
        overview,
        memberActivity,
        messageActivity,
        topChannels,
        topMembers,
        geoData,
        reactionStats,
        linkClicks,
        peakHours,
        handleRefresh,
        handleExport,
    } = useAdvancedAnalytics(serverId, apiBaseUrl);

    if (loading) {
        return (
            <div
                aria-label="advanced analytics dashboard"
                className="analytics-overlay"
                role="button"
                tabIndex={0}
                onClick={onClose}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div
                    className="analytics-panel"
                    role="button"
                    tabIndex={0}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <div className="loading-state">
                        <div className="spinner" />
                        <p>Analitik verileri yükleniyor...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="analytics-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="analytics-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="analytics-header">
                    <h2>
                        <FaChartLine /> Gelişmiş Analitik
                    </h2>
                    <div className="header-controls">
                        <div className="time-range-selector">
                            {TIME_RANGES.map((r) => (
                                <button
                                    key={r.value}
                                    className={`range-btn ${timeRange === r.value ? 'active' : ''}`}
                                    onClick={() => setTimeRange(r.value)}
                                >
                                    {r.label}
                                </button>
                            ))}
                        </div>
                        <button
                            className="action-btn"
                            onClick={handleRefresh}
                            disabled={refreshing}
                        >
                            <FaSyncAlt className={refreshing ? 'spinning' : ''} />
                        </button>
                        <button
                            aria-label="Export analytics"
                            className="action-btn"
                            onClick={handleExport}
                        >
                            <FaDownload />
                        </button>
                    </div>
                    <button aria-label="Close" className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="analytics-content">
                    <OverviewCards overview={overview} />
                    <ChartsSection
                        memberActivity={memberActivity}
                        messageActivity={messageActivity}
                        peakHours={peakHours}
                    />
                    <ListsSection
                        topChannels={topChannels}
                        topMembers={topMembers}
                        reactionStats={reactionStats}
                        geoData={geoData}
                    />
                    <LinkClicksSection linkClicks={linkClicks} />
                </div>
            </div>
        </div>
    );
};

AdvancedAnalyticsDashboard.propTypes = {
    serverId: PropTypes.string,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
};
export default AdvancedAnalyticsDashboard;
