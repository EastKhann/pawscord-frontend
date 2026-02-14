import { useState, useEffect } from 'react';
import toast from '../../utils/toast';

const useAPIUsage = (fetchWithAuth, apiBaseUrl) => {
    const [stats, setStats] = useState(null);
    const [endpoints, setEndpoints] = useState([]);
    const [timeline, setTimeline] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('24h');
    const [selectedEndpoint, setSelectedEndpoint] = useState(null);

    useEffect(() => {
        loadAPIUsage();
    }, [timeRange]);

    const loadAPIUsage = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/analytics/usage/?range=${timeRange}`);
            const data = await response.json();

            setStats(data.stats || {});
            setEndpoints(data.endpoints || []);
            setTimeline(data.timeline || []);
        } catch (error) {
            console.error('Failed to load API usage:', error);
            toast.error('Failed to load analytics');
        } finally {
            setLoading(false);
        }
    };

    const getRateLimitStatus = () => {
        if (!stats || !stats.rate_limit) return { color: '#43b581', text: 'Normal' };

        const requestsMade = stats.requests_made || 0;
        const usage = (requestsMade / stats.rate_limit) * 100;

        if (usage >= 90) return { color: '#f04747', text: 'Critical' };
        if (usage >= 70) return { color: '#faa61a', text: 'Warning' };
        return { color: '#43b581', text: 'Normal' };
    };

    const safeStats = stats || { requests_made: 0, rate_limit: 10000, success_rate: 0, avg_response_time: 0, errors: 0 };
    const rateLimitStatus = getRateLimitStatus();

    return {
        safeStats,
        endpoints,
        timeline,
        loading,
        timeRange, setTimeRange,
        selectedEndpoint, setSelectedEndpoint,
        rateLimitStatus
    };
};

export default useAPIUsage;
