/* eslint-disable no-undef */
import {
    FaUsers,
    FaComments,
    FaClock,
    FaInfoCircle,
    FaChartBar,
    FaHeart,
    FaGlobe,
    FaLink,
} from 'react-icons/fa';
import { formatNumber, renderSimpleChart } from './useAdvancedAnalytics';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export const ChartsSection = ({ memberActivity, messageActivity, peakHours }) => {
    const { t } = useTranslation();

    const renderPeakHoursChart = () => {
        const hours = Array(24)
            .fill(0)
            .map((_, i) => {
                const h = peakHours.find((x) => x.hour === i);
                return { hour: i, value: h?.value || 0 };
            });
        const max = Math.max(...hours.map((h) => h.value));
        return (
            <div aria-label={t('analytics.chartsSection', 'Charts section')} className="peak-hours-chart">
                {hours.map((h, idx) => {
                    const hourBarStyle = {
                        height: `${max > 0 ? (h.value / max) * 100 : 0}%`,
                        background:
                            h.value > max * 0.8
                                ? '#23a559'
                                : h.value > max * 0.5
                                    ? '#5865f2'
                                    : '#1e2024',
                    };
                    return (
                        <div
                            key={`item-${idx}`}
                            className="hour-bar"
                            style={hourBarStyle}
                            title={`${h.hour}:00 - ${h.value} message`}
                        >
                            <span className="hour-label">{h.hour}</span>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="charts-grid">
            <div className="chart-card">
                <div className="chart-header">
                    <h3>
                        <FaUsers /> {t('advAnalytics.memberActivity', 'Member Activity')}
                    </h3>
                </div>
                <div className="chart-body">
                    {memberActivity.length > 0 ? (
                        renderSimpleChart(memberActivity, '#5865f2', 120)
                    ) : (
                        <div className="no-data">{t('veri_yok')}</div>
                    )}
                </div>
            </div>
            <div className="chart-card">
                <div className="chart-header">
                    <h3>
                        <FaComments />
                        {t('mesaj_aktivitesi')}
                    </h3>
                </div>
                <div className="chart-body">
                    {messageActivity.length > 0 ? (
                        renderSimpleChart(messageActivity, '#23a559', 120)
                    ) : (
                        <div className="no-data">{t('veri_yok')}</div>
                    )}
                </div>
            </div>
            <div className="chart-card wide">
                <div className="chart-header">
                    <h3>
                        <FaClock /> {t('advAnalytics.peakHours', 'Peak Hours')}
                    </h3>
                    <span className="chart-info">
                        <FaInfoCircle /> {t('advAnalytics.peakHint', 'Peak hours are shown in green')}
                    </span>
                </div>
                <div className="chart-body">
                    {peakHours.length > 0 ? (
                        renderPeakHoursChart()
                    ) : (
                        <div className="no-data">{t('veri_yok')}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const ListsSection = ({ topChannels, topMembers, reactionStats, geoData }) => (
    <div className="lists-grid">
        <div className="list-card">
            <div className="list-header">
                <h3>
                    <FaChartBar />
                    {t('en_active_channellar')}
                </h3>
            </div>
            <div className="list-body">
                {topChannels.length > 0 ? (
                    topChannels.map((ch, idx) => {
                        const chBarStyle = {
                            width: `${(ch.messages / topChannels[0].messages) * 100}%`,
                        };
                        return (
                            <div key={ch.id} className="list-item">
                                <span className="rank">{idx + 1}</span>
                                <span className="name">{ch.name}</span>
                                <div className="bar-container">
                                    <div className="bar" style={chBarStyle} />
                                </div>
                                <span className="value">{formatNumber(ch.messages)}</span>
                            </div>
                        );
                    })
                ) : (
                    <div className="no-data">{t('veri_yok')}</div>
                )}
            </div>
        </div>
        <div className="list-card">
            <div className="list-header">
                <h3>
                    <FaUsers /> {t('advAnalytics.mostActiveMembers', 'Most Active Members')}
                </h3>
            </div>
            <div className="list-body">
                {topMembers.length > 0 ? (
                    topMembers.map((m, idx) => (
                        <div key={m.id} className="list-item">
                            <span className="rank">{idx + 1}</span>
                            <img
                                src={m.avatar || '/default-avatar.png'}
                                alt={m.username}
                                className="avatar"
                            />
                            <span className="name">{m.username}</span>
                            <span className="value">{formatNumber(m.messages)} message</span>
                        </div>
                    ))
                ) : (
                    <div className="no-data">{t('veri_yok')}</div>
                )}
            </div>
        </div>
        <div className="list-card">
            <div className="list-header">
                <h3>
                    <FaHeart /> {t('advAnalytics.topReactions', 'Top Reactions')}
                </h3>
            </div>
            <div className="list-body">
                {reactionStats.length > 0 ? (
                    <div className="reactions-grid">
                        {reactionStats.map((r, idx) => (
                            <div key={`item-${idx}`} className="reaction-item">
                                <span className="emoji">{r.emoji}</span>
                                <span className="count">{formatNumber(r.count)}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-data">{t('veri_yok')}</div>
                )}
            </div>
        </div>
        <div className="list-card">
            <div className="list-header">
                <h3>
                    <FaGlobe /> {t('advAnalytics.geoDistribution', 'Geographic Distribution')}
                </h3>
            </div>
            <div className="list-body">
                {geoData.length > 0 ? (
                    geoData.map((g, idx) => {
                        const geoBarStyle = { width: `${(g.count / geoData[0].count) * 100}%` };
                        return (
                            <div key={`item-${idx}`} className="list-item">
                                <span className="flag">{g.flag || '🌍'}</span>
                                <span className="name">{g.country}</span>
                                <div className="bar-container">
                                    <div className="bar geo" style={geoBarStyle} />
                                </div>
                                <span className="value">{g.percentage}%</span>
                            </div>
                        );
                    })
                ) : (
                    <div className="no-data">{t('veri_yok')}</div>
                )}
            </div>
        </div>
    </div>
);

export const LinkClicksSection = ({ linkClicks }) => {
    const { t } = useTranslation();
    if (linkClicks.length === 0) return null;
    return (
        <div className="links-section">
            <h3>
                <FaLink /> {t('advAnalytics.linkClicks', 'Link Clicks')}
            </h3>
            <div className="links-table">
                <div className="table-header">
                    <span>{t('url')}</span>
                    <span>{t('advAnalytics.clicks', 'Clicks')}</span>
                    <span>{t('benzersiz')}</span>
                </div>
                {linkClicks.map((link, idx) => (
                    <div key={`item-${idx}`} className="table-row">
                        <span className="link-url" title={link.url}>
                            {link.url.length > 50 ? link.url.substring(0, 50) + '...' : link.url}
                        </span>
                        <span>{formatNumber(link.clicks)}</span>
                        <span>{formatNumber(link.unique_clicks)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

ChartsSection.propTypes = {
    memberActivity: PropTypes.object,
    messageActivity: PropTypes.string,
    peakHours: PropTypes.array,
};

ListsSection.propTypes = {
    topChannels: PropTypes.array,
    topMembers: PropTypes.array,
    reactionStats: PropTypes.array,
    geoData: PropTypes.array,
};

LinkClicksSection.propTypes = {
    linkClicks: PropTypes.array,
};
