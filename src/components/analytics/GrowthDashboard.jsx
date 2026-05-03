// Growth Analytics Dashboard (Admin Only)
import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { authFetch } from '../../utils/authFetch';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import './GrowthDashboard.css';

import PropTypes from 'prop-types';
import logger from '../../utils/logger';

GrowthDashboard.propTypes = {};

export default function GrowthDashboard() {
    const { t } = useTranslation();
    const [metrics, setMetrics] = useState([]);
    const [totals, setTotals] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Backend not yet implemented — growth dashboard API doesn't exist
        setLoading(false);
    }, []);

    const loadDashboard = async () => {
        try {
            const res = await authFetch('/api/growth/dashboard/');
            const json = await res.json();
            setMetrics(json.metrics);
            setTotals(json.totals);
        } catch (error) {
            logger.error('Failed to load dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    // Memoize expensive chart data computations — must be before any early return
    const { sourceData, pieData, avgActiveRate, growthRate, lastWeekUsers, prevWeekUsers } =
        useMemo(() => {
            const src = metrics.reduce((acc, day) => {
                Object.entries(day.sources || {}).forEach(([source, count]) => {
                    acc[source] = (acc[source] || 0) + count;
                });
                return acc;
            }, {});

            const pie = Object.entries(src).map(([name, value]) => ({
                name: name.charAt(0).toUpperCase() + name.slice(1),
                value,
            }));

            const avgActive =
                metrics.length > 0
                    ? (
                        metrics.reduce((sum, m) => sum + m.active_users, 0) / metrics.length
                    ).toFixed(0)
                    : 0;

            const lastWeek = metrics.slice(-7).reduce((sum, m) => sum + m.new_users, 0);
            const prevWeek = metrics.slice(-14, -7).reduce((sum, m) => sum + m.new_users, 0);
            const growth = prevWeek > 0 ? (((lastWeek - prevWeek) / prevWeek) * 100).toFixed(1) : 0;

            return {
                sourceData: src,
                pieData: pie,
                avgActiveRate: avgActive,
                growthRate: growth,
                lastWeekUsers: lastWeek,
                prevWeekUsers: prevWeek,
            };
        }, [metrics]);

    if (loading) {
        return <div className="loading">{t('growth.loading', 'Loading growth dashboard...')}</div>;
    }

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
    const goalUsersFillStyle = { width: `${Math.min((totals.users / 1000) * 100, 100)}%` };
    const goalRevFillStyle = { width: `${Math.min((totals.revenue / 12 / 250) * 100, 100)}%` };
    const goalWaitlistFillStyle = { width: `${Math.min((totals.waitlist / 200) * 100, 100)}%` };

    return (
        <div aria-label={t('analytics.growthDashboard', 'Growth dashboard')} className="growth-dashboard">
            <div className="dashboard-header">
                <h1>📈 {t('growth.title', 'Growth Dashboard')}</h1>
                <button onClick={loadDashboard} className="refresh-btn">
                    🔄 {t('growth.refresh', 'Refresh')}
                </button>
            </div>

            {/* Key Metrics */}
            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-icon">👥</div>
                    <div className="metric-value">{totals.users?.toLocaleString()}</div>
                    <div className="metric-label">{t('growth.totalUsers', 'Total Users')}</div>
                    <div className="metric-change positive">
                        +{lastWeekUsers} {t('growth.thisWeek', 'this week')}
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon">⚡</div>
                    <div className="metric-value">{avgActiveRate}</div>
                    <div className="metric-label">
                        {t('growth.avgDailyActive', 'Avg Daily Active')}
                    </div>
                    <div className="metric-change">
                        {((avgActiveRate / totals.users) * 100).toFixed(1)}%{' '}
                        {t('growth.rate', 'rate')}
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon">💰</div>
                    <div className="metric-value">${totals.revenue?.toLocaleString()}</div>
                    <div className="metric-label">{t('growth.totalRevenue', 'Total Revenue')}</div>
                    <div className="metric-change positive">
                        {t('growth.mrr', 'MRR')}: ${(totals.revenue / 12).toFixed(2)}
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon">📧</div>
                    <div className="metric-value">{totals.waitlist?.toLocaleString()}</div>
                    <div className="metric-label">
                        {t('growth.waitlistSignups', 'Waitlist Signups')}
                    </div>
                    <div className="metric-change">
                        {((totals.waitlist / (totals.users || 1)) * 100).toFixed(0)}%{' '}
                        {t('growth.conversion', 'conversion')}
                    </div>
                </div>
            </div>

            {/* Growth Rate */}
            <div className="growth-rate-banner">
                <h3>📊 {t('growth.weekOverWeek', 'Week-over-Week Growth')}</h3>
                <div className={`growth-percentage ${growthRate > 0 ? 'positive' : 'negative'}`}>
                    {growthRate > 0 ? '+' : ''}
                    {growthRate}%
                </div>
                <p>
                    {t('growth.lastWeek', 'Last week')}: {lastWeekUsers}{' '}
                    {t('growth.users', 'users')} | {t('growth.prevWeek', 'Previous week')}:{' '}
                    {prevWeekUsers} {t('growth.users', 'users')}
                </p>
            </div>

            {/* Charts */}
            <div className="charts-grid">
                {/* New Users Chart */}
                <div className="chart-card">
                    <h3>{t('growth.newUsers', 'New Users (Last 14 Days)')}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={metrics}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="new_users"
                                stroke="#8884d8"
                                strokeWidth={2}
                                name={t('growth.newUsersLabel', 'New Users')}
                            />
                            <Line
                                type="monotone"
                                dataKey="active_users"
                                stroke="#82ca9d"
                                strokeWidth={2}
                                name={t('growth.activeUsersLabel', 'Active Users')}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Revenue Chart */}
                <div className="chart-card">
                    <h3>{t('growth.revenuePremium', 'Revenue & Premium Signups')}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={metrics}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="revenue"
                                fill="#82ca9d"
                                name={t('growth.revenueLabel', 'Revenue ($)')}
                            />
                            <Bar
                                dataKey="premium"
                                fill="#ffc658"
                                name={t('growth.premiumSignups', 'Premium Signups')}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Traffic Sources */}
                <div className="chart-card">
                    <h3>{t('growth.trafficSources', 'Traffic Sources')}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) =>
                                    `${name}: ${(percent * 100).toFixed(0)}%`
                                }
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Source Breakdown */}
                <div className="chart-card">
                    <h3>{t('growth.sourceBreakdown', 'Source Breakdown (Last 7 Days)')}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={metrics.slice(-7)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="sources.producthunt"
                                stackId="a"
                                fill="#ff6384"
                                name="ProductHunt"
                            />
                            <Bar
                                dataKey="sources.reddit"
                                stackId="a"
                                fill="#36a2eb"
                                name="Reddit"
                            />
                            <Bar
                                dataKey="sources.hackernews"
                                stackId="a"
                                fill="#ffce56"
                                name="Hacker News"
                            />
                            <Bar
                                dataKey="sources.organic"
                                stackId="a"
                                fill="#4bc0c0"
                                name="Organic"
                            />
                            <Bar
                                dataKey="sources.referral"
                                stackId="a"
                                fill="#9966ff"
                                name="Referral"
                            />
                            <Bar
                                dataKey="sources.paid"
                                stackId="a"
                                fill="#ff9f40"
                                name="Paid Ads"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Daily Stats Table */}
            <div className="stats-table-card">
                <h3>📅 {t('growth.dailyStats', 'Daily Statistics')}</h3>
                <table className="stats-table">
                    <thead>
                        <tr>
                            <th>{t('date')}</th>
                            <th>{t('new_users')}</th>
                            <th>{t('active_users')}</th>
                            <th>{t('premium')}</th>
                            <th>{t('revenue')}</th>
                            <th>{t('top_source')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {metrics
                            .slice()
                            .reverse()
                            .map((day, index) => {
                                const topSource = Object.entries(day.sources || {}).sort(
                                    (a, b) => b[1] - a[1]
                                )[0];
                                return (
                                    <tr key={`item-${index}`}>
                                        <td>{day.date}</td>
                                        <td className="number">{day.new_users}</td>
                                        <td className="number">{day.active_users}</td>
                                        <td className="number">{day.premium}</td>
                                        <td className="number">${day.revenue}</td>
                                        <td>{topSource ? topSource[0] : 'N/A'}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>

            {/* Goals Progress */}
            <div className="goals-card">
                <h3>{t('🎯_launch_goals_jan_22_-_feb_5')}</h3>
                <div className="goal-item">
                    <div className="goal-label">{t('1000_users')}</div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={goalUsersFillStyle} />
                    </div>
                    <div className="goal-value">
                        {totals.users} / 1000 ({((totals.users / 1000) * 100).toFixed(1)}%)
                    </div>
                </div>

                <div className="goal-item">
                    <div className="goal-label">$250 {t('growth.mrr', 'MRR')}</div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={goalRevFillStyle} />
                    </div>
                    <div className="goal-value">${(totals.revenue / 12).toFixed(2)} / $250</div>
                </div>

                <div className="goal-item">
                    <div className="goal-label">{t('200_waitlist')}</div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={goalWaitlistFillStyle} />
                    </div>
                    <div className="goal-value">
                        {totals.waitlist} / 200 ({((totals.waitlist / 200) * 100).toFixed(1)}%)
                    </div>
                </div>
            </div>
        </div>
    );
}
