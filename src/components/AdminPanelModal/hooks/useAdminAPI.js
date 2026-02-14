import { useState, useEffect } from 'react';
import useAdminFetch from './useAdminFetch';
import useAdminActions from './useAdminActions';

const useAdminAPI = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedTab, setSelectedTab] = useState('overview');

    const fetch = useAdminFetch({ fetchWithAuth, apiBaseUrl });
    const actions = useAdminActions({
        fetchWithAuth, apiBaseUrl,
        refetchUsers: fetch.fetchUsers,
        refetchBannedUsers: fetch.fetchBannedUsers,
        refetchServers: fetch.fetchServers,
    });

    // Wrap handleExportLogs to pass current log filter state
    const handleExportLogs = (format) =>
        actions.handleExportLogs(format, fetch.logType, fetch.logDateFrom, fetch.logDateTo);

    // Initial fetch
    useEffect(() => {
        fetch.fetchStats();
        fetch.fetchSystemHealth();
        fetch.fetchDetailedStats();
        fetch.fetchLiveActivity();
        fetch.fetchSecurityAlerts();
    }, [fetch.fetchStats, fetch.fetchSystemHealth, fetch.fetchDetailedStats, fetch.fetchLiveActivity, fetch.fetchSecurityAlerts]);

    // Tab-based fetch
    useEffect(() => {
        if (activeTab === 'users') fetch.fetchUsers();
        if (activeTab === 'servers') fetch.fetchServers();
        if (activeTab === 'logs') { fetch.fetchLogs(); fetch.fetchSystemLogs(); }
        if (activeTab === 'moderation') fetch.fetchBannedUsers();
        if (activeTab === 'database') fetch.fetchDbStats();
    }, [activeTab, fetch.fetchUsers, fetch.fetchServers, fetch.fetchLogs, fetch.fetchBannedUsers, fetch.fetchDbStats, fetch.fetchSystemLogs]);

    // Realtime auto-refresh every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            fetch.fetchDetailedStats();
            fetch.fetchLiveActivity();
            fetch.fetchSecurityAlerts();
        }, 10000);
        return () => clearInterval(interval);
    }, [fetch.fetchDetailedStats, fetch.fetchLiveActivity, fetch.fetchSecurityAlerts]);

    return {
        activeTab, setActiveTab, selectedTab, setSelectedTab,
        ...fetch, ...actions,
        handleExportLogs,
    };
};

export default useAdminAPI;
