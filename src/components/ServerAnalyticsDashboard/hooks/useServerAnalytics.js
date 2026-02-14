import { useState, useCallback } from 'react';

export const useServerAnalytics = ({ serverId, fetchWithAuth, apiBaseUrl }) => {
    const [analytics, setAnalytics] = useState(null);
    const [comparison, setComparison] = useState(null);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState('30d');

    const fetchAnalytics = useCallback(async () => {
        if (!serverId) return;

        setLoading(true);
        try {
            const [analyticsRes, comparisonRes] = await Promise.all([
                fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/analytics/?period=${period}`),
                fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/analytics/compare/`)
            ]);

            if (analyticsRes.ok) {
                const data = await analyticsRes.json();
                setAnalytics(data);
            }

            if (comparisonRes.ok) {
                const data = await comparisonRes.json();
                setComparison(data);
            }
        } catch (e) {
            console.error('Analytics fetch error:', e);
        } finally {
            setLoading(false);
        }
    }, [serverId, period, fetchWithAuth, apiBaseUrl]);

    return { analytics, comparison, loading, period, setPeriod, fetchAnalytics };
};
