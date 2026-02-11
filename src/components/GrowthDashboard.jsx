// Growth Analytics Dashboard (Admin Only)
import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './GrowthDashboard.css';

export default function GrowthDashboard() {
    const [metrics, setMetrics] = useState([]);
    const [totals, setTotals] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
        // Auto-refresh every 5 minutes
        const interval = setInterval(loadDashboard, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const loadDashboard = async () => {
        try {
            const response = await axios.get('/api/growth/dashboard/');
            setMetrics(response.data.metrics);
            setTotals(response.data.totals);
        } catch (error) {
            console.error('Failed to load dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading growth dashboard...</div>;
    }

    // Calculate source breakdown for pie chart
    const sourceData = metrics.reduce((acc, day) => {
        Object.entries(day.sources || {}).forEach(([source, count]) => {
            acc[source] = (acc[source] || 0) + count;
        });
        return acc;
    }, {});

    const pieData = Object.entries(sourceData).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

    // Calculate daily active users rate
    const avgActiveRate = metrics.length > 0
        ? (metrics.reduce((sum, m) => sum + m.active_users, 0) / metrics.length).toFixed(0)
        : 0;

    // Calculate growth rate
    const lastWeekUsers = metrics.slice(-7).reduce((sum, m) => sum + m.new_users, 0);
    const prevWeekUsers = metrics.slice(-14, -7).reduce((sum, m) => sum + m.new_users, 0);
    const growthRate = prevWeekUsers > 0
        ? (((lastWeekUsers - prevWeekUsers) / prevWeekUsers) * 100).toFixed(1)
        : 0;

    return (
        <div className="growth-dashboard">
            <div className="dashboard-header">
                <h1>📈 Growth Dashboard</h1>
                <button onClick={loadDashboard} className="refresh-btn">🔄 Refresh</button>
            </div>

            {/* Key Metrics */}
            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-icon">👥</div>
                    <div className="metric-value">{totals.users?.toLocaleString()}</div>
                    <div className="metric-label">Total Users</div>
                    <div className="metric-change positive">+{lastWeekUsers} this week</div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon">⚡</div>
                    <div className="metric-value">{avgActiveRate}</div>
                    <div className="metric-label">Avg Daily Active</div>
                    <div className="metric-change">{((avgActiveRate / totals.users) * 100).toFixed(1)}% rate</div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon">💰</div>
                    <div className="metric-value">${totals.revenue?.toLocaleString()}</div>
                    <div className="metric-label">Total Revenue</div>
                    <div className="metric-change positive">MRR: ${(totals.revenue / 12).toFixed(2)}</div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon">📧</div>
                    <div className="metric-value">{totals.waitlist?.toLocaleString()}</div>
                    <div className="metric-label">Waitlist Signups</div>
                    <div className="metric-change">{((totals.waitlist / (totals.users || 1)) * 100).toFixed(0)}% conversion</div>
                </div>
            </div>

            {/* Growth Rate */}
            <div className="growth-rate-banner">
                <h3>📊 Week-over-Week Growth</h3>
                <div className={`growth-percentage ${growthRate > 0 ? 'positive' : 'negative'}`}>
                    {growthRate > 0 ? '+' : ''}{growthRate}%
                </div>
                <p>Last week: {lastWeekUsers} users | Previous week: {prevWeekUsers} users</p>
            </div>

            {/* Charts */}
            <div className="charts-grid">
                {/* New Users Chart */}
                <div className="chart-card">
                    <h3>New Users (Last 14 Days)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={metrics}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="new_users" stroke="#8884d8" strokeWidth={2} name="New Users" />
                            <Line type="monotone" dataKey="active_users" stroke="#82ca9d" strokeWidth={2} name="Active Users" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Revenue Chart */}
                <div className="chart-card">
                    <h3>Revenue & Premium Signups</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={metrics}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
                            <Bar dataKey="premium" fill="#ffc658" name="Premium Signups" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Traffic Sources */}
                <div className="chart-card">
                    <h3>Traffic Sources</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Source Breakdown */}
                <div className="chart-card">
                    <h3>Source Breakdown (Last 7 Days)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={metrics.slice(-7)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sources.producthunt" stackId="a" fill="#ff6384" name="ProductHunt" />
                            <Bar dataKey="sources.reddit" stackId="a" fill="#36a2eb" name="Reddit" />
                            <Bar dataKey="sources.hackernews" stackId="a" fill="#ffce56" name="Hacker News" />
                            <Bar dataKey="sources.organic" stackId="a" fill="#4bc0c0" name="Organic" />
                            <Bar dataKey="sources.referral" stackId="a" fill="#9966ff" name="Referral" />
                            <Bar dataKey="sources.paid" stackId="a" fill="#ff9f40" name="Paid Ads" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Daily Stats Table */}
            <div className="stats-table-card">
                <h3>📅 Daily Statistics</h3>
                <table className="stats-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>New Users</th>
                            <th>Active Users</th>
                            <th>Premium</th>
                            <th>Revenue</th>
                            <th>Top Source</th>
                        </tr>
                    </thead>
                    <tbody>
                        {metrics.slice().reverse().map((day, index) => {
                            const topSource = Object.entries(day.sources || {}).sort((a, b) => b[1] - a[1])[0];
                            return (
                                <tr key={index}>
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
                <h3>🎯 Launch Goals (Jan 22 - Feb 5)</h3>
                <div className="goal-item">
                    <div className="goal-label">1000 Users</div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${Math.min((totals.users / 1000) * 100, 100)}%` }}
                        />
                    </div>
                    <div className="goal-value">{totals.users} / 1000 ({((totals.users / 1000) * 100).toFixed(1)}%)</div>
                </div>

                <div className="goal-item">
                    <div className="goal-label">$250 MRR</div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${Math.min((totals.revenue / 12 / 250) * 100, 100)}%` }}
                        />
                    </div>
                    <div className="goal-value">${(totals.revenue / 12).toFixed(2)} / $250</div>
                </div>

                <div className="goal-item">
                    <div className="goal-label">200 Waitlist</div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${Math.min((totals.waitlist / 200) * 100, 100)}%` }}
                        />
                    </div>
                    <div className="goal-value">{totals.waitlist} / 200 ({((totals.waitlist / 200) * 100).toFixed(1)}%)</div>
                </div>
            </div>
        </div>
    );
}
