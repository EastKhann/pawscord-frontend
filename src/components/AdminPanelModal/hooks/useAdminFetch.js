import { useState, useCallback } from 'react';
import toast from '../../../utils/toast';

const useAdminFetch = ({ fetchWithAuth, apiBaseUrl }) => {
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState(null);
    const [detailedStats, setDetailedStats] = useState(null);
    const [liveActivities, setLiveActivities] = useState([]);
    const [securityAlerts, setSecurityAlerts] = useState([]);
    const [users, setUsers] = useState([]);
    const [servers, setServers] = useState([]);
    const [logs, setLogs] = useState([]);
    const [systemHealth, setSystemHealth] = useState(null);
    const [bannedUsers, setBannedUsers] = useState([]);
    const [dbStats, setDbStats] = useState(null);
    const [realtimeStats, setRealtimeStats] = useState({ online: 0, messages: 0, voice: 0 });

    // Pagination & filters
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortField, setSortField] = useState('created');
    const [sortOrder, setSortOrder] = useState('desc');
    const [filterStatus, setFilterStatus] = useState('all');

    // Enhanced logs
    const [systemLogs, setSystemLogs] = useState([]);
    const [logStats, setLogStats] = useState(null);
    const [logType, setLogType] = useState('all');
    const [logSearch, setLogSearch] = useState('');
    const [logSeverity, setLogSeverity] = useState('');
    const [logDateFrom, setLogDateFrom] = useState('');
    const [logDateTo, setLogDateTo] = useState('');
    const [logLoading, setLogLoading] = useState(false);

    const fetchDetailedStats = useCallback(async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/detailed-stats/`);
            if (res.ok) {
                const data = await res.json();
                setDetailedStats(data);
                setRealtimeStats({ online: data.users?.online || 0, messages: data.messages?.last_1h || 0, voice: 0 });
            }
        } catch (err) { console.error('Detailed stats fetch error:', err); }
    }, [fetchWithAuth, apiBaseUrl]);

    const fetchLiveActivity = useCallback(async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/live-activity/`);
            if (res.ok) { const data = await res.json(); setLiveActivities(data.activities || []); }
        } catch (err) { console.error('Live activity fetch error:', err); }
    }, [fetchWithAuth, apiBaseUrl]);

    const fetchSecurityAlerts = useCallback(async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/security-alerts/`);
            if (res.ok) { const data = await res.json(); setSecurityAlerts(data.alerts || []); }
        } catch (err) { console.error('Security alerts fetch error:', err); }
    }, [fetchWithAuth, apiBaseUrl]);

    const fetchStats = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/stats/`);
            if (res.ok) { setStats(await res.json()); }
            else {
                console.error('Admin stats API error:', res.status);
                toast.error('\u0130statistikler y\u00FCklenemedi');
                setStats({ totalUsers: 0, onlineUsers: 0, totalServers: 0, totalMessages: 0, activeVoiceCalls: 0, premiumUsers: 0, newUsersToday: 0, messagesToday: 0, voiceMinutesToday: 0, reportsToday: 0, storageUsed: '0 GB', bandwidthToday: '0 GB', apiCalls: 0, avgResponseTime: 0, errorRate: '0', weeklyGrowth: '0', monthlyRevenue: 0 });
            }
        } catch (err) { console.error('Stats fetch error:', err); toast.error('\u0130statistikler y\u00FCklenemedi'); }
        setLoading(false);
    }, [fetchWithAuth, apiBaseUrl]);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/users/?search=${searchQuery}&page=${currentPage}&sort=${sortField}&order=${sortOrder}&status=${filterStatus}`);
            if (res.ok) { const data = await res.json(); setUsers(data.users || data.results || []); setTotalPages(data.total_pages || Math.ceil((data.count || 1) / 20)); }
            else { console.error('Admin users API error:', res.status); setUsers([]); }
        } catch (err) { console.error('Users fetch error:', err); setUsers([]); }
        setLoading(false);
    }, [fetchWithAuth, apiBaseUrl, searchQuery, currentPage, sortField, sortOrder, filterStatus]);

    const fetchServers = useCallback(async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/servers/`);
            if (res.ok) { const data = await res.json(); setServers(data.servers || data || []); }
            else { console.error('Admin servers API error:', res.status); setServers([]); }
        } catch (err) { console.error('Servers fetch error:', err); setServers([]); }
    }, [fetchWithAuth, apiBaseUrl]);

    const fetchLogs = useCallback(async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/logs/`);
            if (res.ok) { const data = await res.json(); setLogs(data.logs || data || []); }
            else { console.error('Admin logs API error:', res.status); setLogs([]); }
        } catch (err) { console.error('Logs fetch error:', err); setLogs([]); }
    }, [fetchWithAuth, apiBaseUrl]);

    const fetchSystemHealth = useCallback(async () => {
        const fallback = { cpu: 0, memory: 0, disk: 0, uptime: 'Bilinmiyor', activeConnections: 0, requestsPerMinute: 0, dbConnections: 0, cacheHitRate: '0', wsConnections: 0 };
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/health/`);
            if (res.ok) { setSystemHealth(await res.json()); } else { console.error('Admin health API error:', res.status); setSystemHealth(fallback); }
        } catch (err) { console.error('Health fetch error:', err); setSystemHealth(fallback); }
    }, [fetchWithAuth, apiBaseUrl]);

    const fetchBannedUsers = useCallback(async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/banned-users/`);
            if (res.ok) { const data = await res.json(); setBannedUsers(data.users || data || []); }
            else { console.error('Admin banned-users API error:', res.status); setBannedUsers([]); }
        } catch (err) { console.error('Banned users fetch error:', err); setBannedUsers([]); }
    }, [fetchWithAuth, apiBaseUrl]);

    const fetchDbStats = useCallback(async () => {
        const fallback = { users: { count: 0, size: '0 MB' }, messages: { count: 0, size: '0 MB' }, servers: { count: 0, size: '0 MB' }, attachments: { count: 0, size: '0 GB' }, voice_logs: { count: 0, size: '0 MB' }, total_size: '0 GB' };
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/db-stats/`);
            if (res.ok) { setDbStats(await res.json()); } else { console.error('Admin db-stats API error:', res.status); setDbStats(fallback); }
        } catch (err) { console.error('DB stats fetch error:', err); setDbStats(fallback); }
    }, [fetchWithAuth, apiBaseUrl]);

    const fetchSystemLogs = useCallback(async () => {
        setLogLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('type', logType);
            params.append('limit', '100');
            if (logSearch) params.append('search', logSearch);
            if (logSeverity) params.append('severity', logSeverity);
            if (logDateFrom) params.append('date_from', logDateFrom);
            if (logDateTo) params.append('date_to', logDateTo);
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/system-logs/?${params}`);
            if (res.ok) { const data = await res.json(); setSystemLogs(data.logs || []); setLogStats(data.stats); }
        } catch (err) { console.error('System logs fetch error:', err); }
        setLogLoading(false);
    }, [fetchWithAuth, apiBaseUrl, logType, logSearch, logSeverity, logDateFrom, logDateTo]);

    return {
        loading, stats, detailedStats, liveActivities, securityAlerts,
        users, servers, logs, systemHealth, bannedUsers, dbStats, realtimeStats,
        systemLogs, logStats, logLoading,
        searchQuery, setSearchQuery, currentPage, setCurrentPage, totalPages,
        sortField, setSortField, sortOrder, setSortOrder, filterStatus, setFilterStatus,
        logType, setLogType, logSearch, setLogSearch, logSeverity, setLogSeverity,
        logDateFrom, setLogDateFrom, logDateTo, setLogDateTo,
        fetchDetailedStats, fetchLiveActivity, fetchSecurityAlerts, fetchStats,
        fetchUsers, fetchServers, fetchLogs, fetchSystemHealth,
        fetchBannedUsers, fetchDbStats, fetchSystemLogs,
    };
};

export default useAdminFetch;
