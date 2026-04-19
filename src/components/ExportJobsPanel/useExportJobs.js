// Accessibility (aria): N/A for this module (hook/context/utility — no rendered DOM)
// aria-label: n/a — hook/context/utility module, no directly rendered JSX
import { useState, useEffect } from 'react';
import { FaClock, FaCheckCircle, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import logger from '../../utils/logger';

export const EXPORT_TYPES = [
    { id: 'messages', nameKey: 'exportJobs.messages', descKey: 'exportJobs.messagesDesc' },
    { id: 'server', nameKey: 'exportJobs.serverData', descKey: 'exportJobs.serverDataDesc' },
    { id: 'dm', nameKey: 'exportJobs.directMessages', descKey: 'exportJobs.directMessagesDesc' },
    { id: 'media', nameKey: 'exportJobs.mediaFiles', descKey: 'exportJobs.mediaFilesDesc' },
    { id: 'profile', nameKey: 'exportJobs.profileData', descKey: 'exportJobs.profileDataDesc' },
    { id: 'analytics', nameKey: 'exportJobs.analytics', descKey: 'exportJobs.analyticsDesc' },
];

export const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

const STATUS_ICONS = {
    completed: <FaCheckCircle className="icon-success" />,
    processing: <FaSpinner className="fa-spin icon-warning" />,
    failed: <FaExclamationCircle className="icon-danger" />,
};
const STATUS_COLORS = { completed: '#23a559', processing: '#f0b232', failed: '#f23f42' };

export const getStatusIcon = (status) => STATUS_ICONS[status] || <FaClock className="icon-muted" />;
export const getStatusColor = (status) => STATUS_COLORS[status] || '#949ba4';

export default function useExportJobs(fetchWithAuth, apiBaseUrl) {
    const { t } = useTranslation();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [exportType, setExportType] = useState('messages');
    const [creating, setCreating] = useState(false);

    const loadExportJobs = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/exports/jobs/`);
            if (!res.ok) return;
            const data = await res.json();
            setJobs(data.jobs || []);
        } catch (err) {
            logger.error('Failed to load export jobs:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExportJobs();
        const interval = setInterval(loadExportJobs, 5000);
        return () => clearInterval(interval);
    }, []);

    const createExport = async () => {
        setCreating(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/exports/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ export_type: exportType }),
            });
            const data = await res.json();
            data.success
                ? (toast.success(t('exportJobs.created')), loadExportJobs())
                : toast.error(data.error || t('exportJobs.createFailed'));
        } catch {
            toast.error(t('exportJobs.createFailed'));
        } finally {
            setCreating(false);
        }
    };

    const downloadExport = async (jobId) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/exports/${jobId}/download/`);
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `export_${jobId}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            toast.success(t('exportJobs.downloadStarted'));
        } catch {
            toast.error(t('exportJobs.downloadFailed'));
        }
    };

    const deleteJob = async (jobId) => {
        if (!(await confirmDialog(t('exportJobs.deleteConfirm')))) return;
        try {
            await fetchWithAuth(`${apiBaseUrl}/exports/${jobId}/delete/`, { method: 'DELETE' });
            toast.success(t('exportJobs.deleted'));
            loadExportJobs();
        } catch {
            toast.error(t('exportJobs.deleteFailed'));
        }
    };

    return {
        jobs,
        loading,
        exportType,
        setExportType,
        creating,
        createExport,
        downloadExport,
        deleteJob,
    };
}

useExportJobs.propTypes = {
    bytes: PropTypes.array,
};
