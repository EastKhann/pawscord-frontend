import PropTypes from 'prop-types';
import { FaUsers, FaComments, FaEye, FaUserPlus, FaMobile, FaDesktop } from 'react-icons/fa';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { formatNumber, StatCard, GrowthCard, ActivityItem } from './helpers';
import styles from './styles';
import { useTranslation } from 'react-i18next';

const S = {
    txt: { color: '#e91e63', fontWeight: 'bold' },
};

const tooltipStyle = (borderColor) => ({
    backgroundColor: '#0d0e10',
    border: `1px solid ${borderColor}`,
    borderRadius: '6px',
    color: '#fff',
});

const axisProps = {
    stroke: '#b5bac1',
    tick: { fill: '#b5bac1', fontSize: 12 },
    interval: 4,
};

const OverviewTab = ({ stats }) => {
    const { t } = useTranslation();
    return (
        <div aria-label={t('admin.overviewTab', 'Overview tab')} style={styles.tabContent}>
            {/* Growth Indicators */}
            <div style={styles.growthSection}>
                <GrowthCard
                    label={t('ui.mesaj_artisi_24h')}
                    value={stats.message_growth_24h || 0}
                    isPositive={(stats.message_growth_24h || 0) >= 0}
                />
                <GrowthCard
                    label={t('ui.kayit_artisi_24h')}
                    value={stats.signup_growth_24h || 0}
                    isPositive={(stats.signup_growth_24h || 0) >= 0}
                />
                <GrowthCard
                    label={t('ui.gunluk_ort_mesaj')}
                    value={stats.avg_messages_per_day || 0}
                    isPositive={true}
                    suffix=""
                    icon={<FaComments />}
                />
                <GrowthCard
                    label={t('ui.gunluk_ort_kayit')}
                    value={stats.avg_signups_per_day || 0}
                    isPositive={true}
                    suffix=""
                    icon={<FaUserPlus />}
                />
            </div>

            <div style={styles.statsGrid}>
                <StatCard
                    icon={<FaUsers />}
                    label={t('analytics.totalUsers')}
                    value={stats.total_users || 0}
                    color="#5865f2"
                    subtitle={`${t('analytics.online')}: ${stats.online_users || 0} | ${t('analytics.active')}: ${stats.active_users || 0}`}
                />
                <StatCard
                    icon={<FaComments />}
                    label={t('analytics.totalServers')}
                    value={stats.total_servers || 0}
                    color="#23a559"
                    subtitle={`${t('analytics.last24h')}: +${stats.new_servers_24h || 0}`}
                />
                <StatCard
                    icon={<FaComments />}
                    label={t('analytics.totalMessages')}
                    value={formatNumber(stats.total_messages || 0)}
                    color="#f0b132"
                    subtitle={`${t('analytics.last24h')}: ${formatNumber(stats.messages_24h || 0)}`}
                />
                <StatCard
                    icon={<FaEye />}
                    label={t('analytics.totalVisits')}
                    value={formatNumber(stats.total_page_views || 0)}
                    color="#e91e63"
                    subtitle={`${t('analytics.last24h')}: ${formatNumber(stats.page_views_24h || 0)}`}
                />
                <StatCard
                    icon={<FaUsers />}
                    label={t('analytics.premiumUsers')}
                    value={stats.premium_users || 0}
                    color="#5865f2"
                    subtitle={`${t('analytics.revenue')}: ${stats.monthly_revenue || 0} TL/${t('analytics.month')}`}
                />
                <StatCard
                    icon={<FaUsers />}
                    label={t('ui.benzersiz_ziyaretci')}
                    value={formatNumber(stats.unique_visitors_30d || 0)}
                    color="#00bcd4"
                    subtitle={`${t('analytics.last24h')}: ${formatNumber(stats.unique_visitors_24h || 0)}`}
                />
            </div>

            {/* Device Distribution */}
            {(stats.mobile_views > 0 || stats.desktop_views > 0) && (
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>{t('??_cihaz_dagilimi_last_7_days')}</h3>
                    <div style={styles.deviceStats}>
                        <div style={styles.deviceCard}>
                            <FaMobile size={32} color="#5865f2" />
                            <div style={styles.deviceInfo}>
                                <span style={styles.deviceLabel}>{t('mobil')}</span>
                                <span style={styles.deviceValue}>
                                    {formatNumber(stats.mobile_views || 0)}
                                </span>
                                <span style={styles.deviceThucent}>
                                    {Math.round(
                                        ((stats.mobile_views || 0) /
                                            ((stats.mobile_views || 0) +
                                                (stats.desktop_views || 1))) *
                                        100
                                    )}
                                    %
                                </span>
                            </div>
                        </div>
                        <div style={styles.deviceCard}>
                            <FaDesktop size={32} color="#23a559" />
                            <div style={styles.deviceInfo}>
                                <span style={styles.deviceLabel}>{t('masaüstü')}</span>
                                <span style={styles.deviceValue}>
                                    {formatNumber(stats.desktop_views || 0)}
                                </span>
                                <span style={styles.deviceThucent}>
                                    {Math.round(
                                        ((stats.desktop_views || 0) /
                                            ((stats.mobile_views || 0) +
                                                (stats.desktop_views || 1))) *
                                        100
                                    )}
                                    %
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
                        <h3 style={styles.sectionTitle}>
                            {t('??_g�nl�k_message_count_last_30_days')}
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={stats.daily_stats}>
                                <defs>
                                    <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#5865f2" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#5865f2" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#0d0e10" />
                                <XAxis dataKey="label" {...axisProps} />
                                <YAxis stroke="#b5bac1" tick={{ fill: '#b5bac1', fontSize: 12 }} />
                                <Tooltip contentStyle={tooltipStyle('#5865f2')} />
                                <Area
                                    type="monotone"
                                    dataKey="messages"
                                    stroke="#5865f2"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorMessages)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>
                            {t('??_g�nl�k_active_user_last_30_days')}
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={stats.daily_stats}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#0d0e10" />
                                <XAxis dataKey="label" {...axisProps} />
                                <YAxis stroke="#b5bac1" tick={{ fill: '#b5bac1', fontSize: 12 }} />
                                <Tooltip contentStyle={tooltipStyle('#23a559')} />
                                <Line
                                    type="monotone"
                                    dataKey="active_users"
                                    stroke="#23a559"
                                    strokeWidth={3}
                                    dot={{ fill: '#23a559', r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>
                            {t('??_g�nl�k_yeni_kayitlar_last_30_days')}
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={stats.daily_stats}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#0d0e10" />
                                <XAxis dataKey="label" {...axisProps} />
                                <YAxis stroke="#b5bac1" tick={{ fill: '#b5bac1', fontSize: 12 }} />
                                <Tooltip contentStyle={tooltipStyle('#f0b132')} />
                                <Bar dataKey="signups" fill="#f0b132" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>
                            {t('???_daily_visits_sayisi_last_30_days')}
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={stats.daily_stats}>
                                <defs>
                                    <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#e91e63" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#e91e63" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#0d0e10" />
                                <XAxis dataKey="label" {...axisProps} />
                                <YAxis stroke="#b5bac1" tick={{ fill: '#b5bac1', fontSize: 12 }} />
                                <Tooltip contentStyle={tooltipStyle('#e91e63')} />
                                <Area
                                    type="monotone"
                                    dataKey="page_views"
                                    stroke="#e91e63"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorPageViews)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>
                            {t('??_g�nl�k_benzersiz_ziyaret�i_last_30_days')}
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={stats.daily_stats}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#0d0e10" />
                                <XAxis dataKey="label" {...axisProps} />
                                <YAxis stroke="#b5bac1" tick={{ fill: '#b5bac1', fontSize: 12 }} />
                                <Tooltip contentStyle={tooltipStyle('#00bcd4')} />
                                <Line
                                    type="monotone"
                                    dataKey="unique_visitors"
                                    stroke="#00bcd4"
                                    strokeWidth={3}
                                    dot={{ fill: '#00bcd4', r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}

            {/* Recent Activity */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>{t('son_aktiviteler_24_saat')}</h3>
                <div style={styles.activityList}>
                    <ActivityItem
                        icon={<FaUserPlus />}
                        label={t('ui.yeni_kayitlar')}
                        value={stats.new_signups_24h || 0}
                    />
                    <ActivityItem
                        icon={<FaComments />}
                        label={t('analytics.newServers')}
                        value={stats.new_servers_24h || 0}
                    />
                    <ActivityItem
                        icon={<FaComments />}
                        label={t('analytics.messages')}
                        value={stats.messages_24h || 0}
                    />
                    <ActivityItem
                        icon={<FaEye />}
                        label={t('analytics.activeUsers')}
                        value={stats.active_users_24h || 0}
                    />
                    <ActivityItem
                        icon={<FaEye />}
                        label={t('analytics.pageVisits')}
                        value={stats.page_views_24h || 0}
                        color="#e91e63"
                    />
                    <ActivityItem
                        icon={<FaUsers />}
                        label={t('ui.benzersiz_ziyaretci_2')}
                        value={stats.unique_visitors_24h || 0}
                        color="#00bcd4"
                    />
                </div>
            </div>

            {/* Top Pages */}
            {stats.top_pages && stats.top_pages.length > 0 && (
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>
                        {t('??_en_�ok_ziyaret_edilen_sayfalar_last_30_days')}
                    </h3>
                    <div style={styles.list}>
                        {stats.top_pages.slice(0, 10).map((page, index) => (
                            <div key={`item-${index}`} style={styles.listItem}>
                                <span>
                                    {index + 1} {page?.path || t('common.unknown')}
                                </span>
                                <span style={S.txt}>
                                    {(page?.views || 0).toLocaleString()} {t('analytics.visits')}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

OverviewTab.propTypes = {
    stats: PropTypes.array,
};
export default OverviewTab;
