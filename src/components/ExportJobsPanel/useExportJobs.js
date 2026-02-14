import { useState, useEffect } from 'react';
import { FaClock, FaCheckCircle, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';

export const EXPORT_TYPES = [
    { id: 'messages', name: 'Messages', description: 'Export all your messages' },
    { id: 'server', name: 'Server Data', description: 'Export server content' },
    { id: 'dm', name: 'Direct Messages', description: 'Export DM history' },
    { id: 'media', name: 'Media Files', description: 'Export uploaded media' },
    { id: 'profile', name: 'Profile Data', description: 'Export your profile info' },
    { id: 'analytics', name: 'Analytics', description: 'Export analytics data' }
];

export const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

const STATUS_ICONS = {
    completed: <FaCheckCircle style={{ color: '#43b581' }} />,
    processing: <FaSpinner style={{ color: '#faa61a' }} className="fa-spin" />,
    failed: <FaExclamationCircle style={{ color: '#f04747' }} />
};
const STATUS_COLORS = { completed: '#43b581', processing: '#faa61a', failed: '#f04747' };

export const getStatusIcon = (status) => STATUS_ICONS[status] || <FaClock style={{ color: '#99aab5' }} />;
export const getStatusColor = (status) => STATUS_COLORS[status] || '#99aab5';

export default function useExportJobs(fetchWithAuth, apiBaseUrl) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [exportType, setExportType] = useState('messages');
    const [creating, setCreating] = useState(false);

    const loadExportJobs = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/exports/jobs/`);
            const data = await res.json();
            setJobs(data.jobs || []);
        } catch (err) { console.error('Failed to load export jobs:', err); }
        finally { setLoading(false); }
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
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ export_type: exportType })
            });
            const data = await res.json();
            data.success ? (toast.success('Export job created! Processing...'), loadExportJobs()) : toast.error(data.error || 'Failed to create export');
        } catch { toast.error('Failed to create export'); }
        finally { setCreating(false); }
    };

    const downloadExport = async (jobId) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/exports/${jobId}/download/`);
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = `export_${jobId}.zip`;
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            toast.success('Download started!');
        } catch { toast.error('Download failed'); }
    };

    const deleteJob = async (jobId) => {
        if (!await confirmDialog('Delete this export job?')) return;
        try {
            await fetchWithAuth(`${apiBaseUrl}/exports/${jobId}/delete/`, { method: 'DELETE' });
            toast.success('Export job deleted'); loadExportJobs();
        } catch { toast.error('Failed to delete job'); }
    };

    return { jobs, loading, exportType, setExportType, creating, createExport, downloadExport, deleteJob };
}
