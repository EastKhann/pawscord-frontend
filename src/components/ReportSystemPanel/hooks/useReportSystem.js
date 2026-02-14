import { useState } from 'react';
import toast from '../../../utils/toast';
import { FaComment, FaUser, FaFlag } from 'react-icons/fa';

export const useReportSystem = ({ serverId, fetchWithAuth, apiBaseUrl }) => {
    const [reports, setReports] = useState([]);
    const [filter, setFilter] = useState('pending');
    const [typeFilter, setTypeFilter] = useState('all');
    const [selectedReport, setSelectedReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        pending: 0,
        resolved: 0,
        dismissed: 0,
        total: 0
    });

    const loadReports = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                server: serverId,
                status: filter !== 'all' ? filter : '',
                report_type: typeFilter !== 'all' ? typeFilter : ''
            });

            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/reports/?${queryParams}`);
            if (res.ok) {
                const data = await res.json();
                setReports(data.results || data);
            }
        } catch (error) {
            console.error('Failed to load reports:', error);
        }
        setLoading(false);
    };

    const loadStats = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/reports/stats/${serverId}/`);
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Failed to load stats:', error);
        }
    };

    const handleReport = async (reportId, action, reason = '') => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/reports/${reportId}/handle/`, {
                method: 'POST',
                body: JSON.stringify({
                    action,
                    reason,
                    moderator_notes: reason
                })
            });

            if (res.ok) {
                loadReports();
                loadStats();
                setSelectedReport(null);
            } else {
                toast.error('\u274C Failed to handle report');
            }
        } catch (error) {
            console.error('Failed to handle report:', error);
        }
    };

    const getReportIcon = (type) => {
        switch (type) {
            case 'message': return <FaComment />;
            case 'user': return <FaUser />;
            case 'server': return <FaFlag />;
            default: return <FaFlag />;
        }
    };

    const getReportBadgeColor = (status) => {
        switch (status) {
            case 'pending': return '#f0b132';
            case 'resolved': return '#43b581';
            case 'dismissed': return '#72767d';
            default: return '#5865f2';
        }
    };

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'low': return '#43b581';
            case 'medium': return '#f0b132';
            case 'high': return '#ed4245';
            case 'critical': return '#a12929';
            default: return '#72767d';
        }
    };

    return {
        reports, filter, setFilter, typeFilter, setTypeFilter,
        selectedReport, setSelectedReport, loading, stats,
        loadReports, loadStats, handleReport,
        getReportIcon, getReportBadgeColor, getSeverityColor
    };
};
