import {
    FaUsers, FaComments, FaEye, FaUserPlus, FaMobile, FaDesktop
} from 'react-icons/fa';
import {
    AreaChart, Area, BarChart, Bar, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer
} from 'recharts';
import { formatNumber, StatCard, GrowthCard, ActivityItem } from './helpers';
import styles from './styles';

const tooltipStyle = (borderColor) => ({
    backgroundColor: '#1e1f22',
    border: `1px solid ${borderColor}`,
    borderRadius: '6px',
    color: '#fff'
});

const axisProps = {
    stroke: '#b9bbbe',
    tick: { fill: '#b9bbbe', fontSize: 12 },
    interval: 4
};

const OverviewTab = ({ stats }) => (
    <div style={styles.tabContent}>
        {/* Growth Indicators */}
        <div style={styles.growthSection}>
            <GrowthCard label="Mesaj Artışı (24h)" value={stats.message_growth_24h || 0} isPositive={(stats.message_growth_24h || 0) >= 0} />
            <GrowthCard label="Kayıt Artışı (24h)" value={stats.signup_growth_24h || 0} isPositive={(stats.signup_growth_24h || 0) >= 0} />
            <GrowthCard label="Günlük Ort. Mesaj" value={stats.avg_messages_per_day || 0} isPositive={true} suffix="" icon={<FaComments />} />
            <GrowthCard label="Günlük Ort. Kayıt" value={stats.avg_signups_per_day || 0} isPositive={true} suffix="" icon={<FaUserPlus />} />
        </div>

        <div style={styles.statsGrid}>
            <StatCard icon={<FaUsers />} label="Toplam Kullanıcı" value={stats.total_users || 0} color="#5865f2"
                subtitle={`Online: ${stats.online_users || 0} | Aktif: ${stats.active_users || 0}`} />
            <StatCard icon={<FaComments />} label="Toplam Sunucu" value={stats.total_servers || 0} color="#23a559"
                subtitle={`Son 24h: +${stats.new_servers_24h || 0}`} />
            <StatCard icon={<FaComments />} label="Toplam Mesaj" value={formatNumber(stats.total_messages || 0)} color="#f0b132"
                subtitle={`Son 24h: ${formatNumber(stats.messages_24h || 0)}`} />
            <StatCard icon={<FaEye />} label="Toplam Ziyaret" value={formatNumber(stats.total_page_views || 0)} color="#e91e63"
                subtitle={`Son 24h: ${formatNumber(stats.page_views_24h || 0)}`} />
            <StatCard icon={<FaUsers />} label="Premium Kullanıcı" value={stats.premium_users || 0} color="#9b59b6"
                subtitle={`Gelir: ${stats.monthly_revenue || 0} TL/ay`} />
            <StatCard icon={<FaUsers />} label="Benzersiz Ziyaretçi" value={formatNumber(stats.unique_visitors_30d || 0)} color="#00bcd4"
                subtitle={`Son 24h: ${formatNumber(stats.unique_visitors_24h || 0)}`} />
        </div>

        {/* Device Distribution */}
        {(stats.mobile_views > 0 || stats.desktop_views > 0) && (
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>📱 Cihaz Dağılımı (Son 7 Gün)</h3>
                <div style={styles.deviceStats}>
                    <div style={styles.deviceCard}>
                        <FaMobile size={32} color="#5865f2" />
                        <div style={styles.deviceInfo}>
                            <span style={styles.deviceLabel}>Mobil</span>
                            <span style={styles.deviceValue}>{formatNumber(stats.mobile_views || 0)}</span>
                            <span style={styles.devicePercent}>
                                {Math.round((stats.mobile_views || 0) / ((stats.mobile_views || 0) + (stats.desktop_views || 1)) * 100)}%
                            </span>
                        </div>
                    </div>
                    <div style={styles.deviceCard}>
                        <FaDesktop size={32} color="#23a559" />
                        <div style={styles.deviceInfo}>
                            <span style={styles.deviceLabel}>Masaüstü</span>
                            <span style={styles.deviceValue}>{formatNumber(stats.desktop_views || 0)}</span>
                            <span style={styles.devicePercent}>
                                {Math.round((stats.desktop_views || 0) / ((stats.mobile_views || 0) + (stats.desktop_views || 1)) * 100)}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Daily Charts */}
        {stats.daily_stats && stats.daily_stats.length > 0 && (
            <>
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>📨 Günlük Mesaj Sayısı (Son 30 Gün)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={stats.daily_stats}>
                            <defs>
                                <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#5865f2" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#5865f2" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e1f22" />
                            <XAxis dataKey="label" {...axisProps} />
                            <YAxis stroke="#b9bbbe" tick={{ fill: '#b9bbbe', fontSize: 12 }} />
                            <Tooltip contentStyle={tooltipStyle('#5865f2')} />
                            <Area type="monotone" dataKey="messages" stroke="#5865f2" strokeWidth={2} fillOpacity={1} fill="url(#colorMessages)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>👥 Günlük Aktif Kullanıcı (Son 30 Gün)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={stats.daily_stats}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e1f22" />
                            <XAxis dataKey="label" {...axisProps} />
                            <YAxis stroke="#b9bbbe" tick={{ fill: '#b9bbbe', fontSize: 12 }} />
                            <Tooltip contentStyle={tooltipStyle('#23a559')} />
                            <Line type="monotone" dataKey="active_users" stroke="#23a559" strokeWidth={3} dot={{ fill: '#23a559', r: 4 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>🆕 Günlük Yeni Kayıtlar (Son 30 Gün)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={stats.daily_stats}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e1f22" />
                            <XAxis dataKey="label" {...axisProps} />
                            <YAxis stroke="#b9bbbe" tick={{ fill: '#b9bbbe', fontSize: 12 }} />
                            <Tooltip contentStyle={tooltipStyle('#f0b132')} />
                            <Bar dataKey="signups" fill="#f0b132" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>👁️ Günlük Ziyaret Sayısı (Son 30 Gün)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={stats.daily_stats}>
                            <defs>
                                <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#e91e63" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#e91e63" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e1f22" />
                            <XAxis dataKey="label" {...axisProps} />
                            <YAxis stroke="#b9bbbe" tick={{ fill: '#b9bbbe', fontSize: 12 }} />
                            <Tooltip contentStyle={tooltipStyle('#e91e63')} />
                            <Area type="monotone" dataKey="page_views" stroke="#e91e63" strokeWidth={2} fillOpacity={1} fill="url(#colorPageViews)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>👥 Günlük Benzersiz Ziyaretçi (Son 30 Gün)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={stats.daily_stats}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e1f22" />
                            <XAxis dataKey="label" {...axisProps} />
                            <YAxis stroke="#b9bbbe" tick={{ fill: '#b9bbbe', fontSize: 12 }} />
                            <Tooltip contentStyle={tooltipStyle('#00bcd4')} />
                            <Line type="monotone" dataKey="unique_visitors" stroke="#00bcd4" strokeWidth={3} dot={{ fill: '#00bcd4', r: 4 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </>
        )}

        {/* Recent Activity */}
        <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Son Aktiviteler (24 Saat)</h3>
            <div style={styles.activityList}>
                <ActivityItem icon={<FaUserPlus />} label="Yeni Kayıtlar" value={stats.new_signups_24h || 0} />
                <ActivityItem icon={<FaComments />} label="Yeni Sunucular" value={stats.new_servers_24h || 0} />
                <ActivityItem icon={<FaComments />} label="Mesajlar" value={stats.messages_24h || 0} />
                <ActivityItem icon={<FaEye />} label="Aktif Kullanıcı" value={stats.active_users_24h || 0} />
                <ActivityItem icon={<FaEye />} label="Sayfa Ziyareti" value={stats.page_views_24h || 0} color="#e91e63" />
                <ActivityItem icon={<FaUsers />} label="Benzersiz Ziyaretçi" value={stats.unique_visitors_24h || 0} color="#00bcd4" />
            </div>
        </div>

        {/* Top Pages */}
        {stats.top_pages && stats.top_pages.length > 0 && (
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>📊 En Çok Ziyaret Edilen Sayfalar (Son 30 Gün)</h3>
                <div style={styles.list}>
                    {stats.top_pages.slice(0, 10).map((page, index) => (
                        <div key={index} style={styles.listItem}>
                            <span>{index + 1} {page?.path || 'Unknown'}</span>
                            <span style={{ color: '#e91e63', fontWeight: 'bold' }}>{(page?.views || 0).toLocaleString()} ziyaret</span>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
);

export default OverviewTab;
