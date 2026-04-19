import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from '../../../utils/toast';
import { FaComment, FaUser, FaFlag } from 'react-icons/fa';
import logger from '../../../utils/logger';

export const useReportSystem = ({ serverId, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const [reports, setReports] = useState([]);
    const [filter, setFilter] = useState('pending');
    const [typeFilter, setTypeFilter] = useState('all');
    const [selectedReport, setSelectedReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        pending: 0,
        resolved: 0,
        dismissed: 0,
        total: 0,
    });

    const loadReports = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                server: serverId,
                status: filter !== 'all' ? filter : '',
                report_type: typeFilter !== 'all' ? typeFilter : '',
            });

            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/reports/?${queryParams}`);
            if (res.ok) {
                const data = await res.json();
                setReports(data.results || data);
            }
        } catch (error) {
            logger.error('Failed to load reports:', error);
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
            logger.error('Failed to load stats:', error);
        }
    };

    const handleReport = async (reportId, action, reason = '') => {
        try {
            const res = await fetchWithAuth(
                `${apiBaseUrl}/moderation/reports/${reportId}/handle/`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        action,
                        reason,
                        moderator_notes: reason,
                    }),
                }
            );

            if (res.ok) {
                loadReports();
                loadStats();
                setSelectedReport(null);
            } else {
                toast.error(t('reportSystem.handleFailed'));
            }
        } catch (error) {
            logger.error('Failed to handle report:', error);
        }
    };

    const getReportIcon = (type) => {
        switch (type) {
            case 'message':
                return <FaComment />;
            case 'user':
                return <FaUser />;
            case 'server':
                return <FaFlag />;
            default:
                return <FaFlag />;
        }
    };

    const getReportBadgeColor = (status) => {
        switch (status) {
            case 'pending':
                return '#f0b132';
            case 'resolved':
                return '#23a559';
            case 'dismissed':
                return '#949ba4';
            default:
                return '#5865f2';
        }
    };

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'low':
                return '#23a559';
            case 'medium':
                return '#f0b132';
            case 'high':
                return '#f23f42';
            case 'critical':
                return '#a12929';
            default:
                return '#949ba4';
        }
    };

    return {
        reports,
        filter,
        setFilter,
        typeFilter,
        setTypeFilter,
        selectedReport,
        setSelectedReport,
        loading,
        stats,
        loadReports,
        loadStats,
        handleReport,
        getReportIcon,
        getReportBadgeColor,
        getSeverityColor,
    };
};
