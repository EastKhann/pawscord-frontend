import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaDownload, FaFile, FaSpinner } from 'react-icons/fa';
import useExportJobs, {
    EXPORT_TYPES,
    formatFileSize,
    getStatusIcon,
    getStatusColor,
} from '../ExportJobsPanel/useExportJobs';
import { styles } from '../ExportJobsPanel/exportJobsStyles';

import { useTranslation } from 'react-i18next';

// -- dynamic style helpers (pass 2) --

const ExportJobsPanel = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
    const { t } = useTranslation();
    const [error, setError] = useState(null);
    const e = useExportJobs(fetchWithAuth, apiBaseUrl);
    const h2Style = { margin: 0, fontSize: '20px' };

    return (
        <div
            style={styles.overlay}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                style={styles.modal}
                role="button"
                tabIndex={0}
                onClick={(ev) => ev.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaDownload className="icon-primary-24" />
                        <h2 style={h2Style}>{t('exportJobs.title')}</h2>
                    </div>
                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeBtn}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    <div style={styles.createSection}>
                        <h3 style={styles.sectionTitle}>{t('exportJobs.createNew')}</h3>
                        <div style={styles.exportTypeSelector}>
                            <select
                                value={e.exportType}
                                onChange={(ev) => e.setExportType(ev.target.value)}
                                style={styles.select}
                            >
                                {EXPORT_TYPES.map((et) => (
                                    <option key={et.id} value={et.id}>
                                        {t(et.nameKey)} - {t(et.descKey)}
                                    </option>
                                ))}
                            </select>
                            <button
                                aria-label={t('exportJobs.createExport')}
                                onClick={e.createExport}
                                disabled={e.creating}
                                style={styles.createBtn}
                            >
                                {e.creating ? (
                                    <>
                                        <FaSpinner className="fa-spin" /> {t('exportJobs.creating')}
                                    </>
                                ) : (
                                    <>
                                        <FaDownload /> {t('exportJobs.createExport')}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div style={styles.jobsSection}>
                        <h3 style={styles.sectionTitle}>{t('exportJobs.yourJobs')}</h3>
                        {e.loading ? (
                            <div style={styles.loading}>{t('exportJobs.loading')}</div>
                        ) : e.jobs.length === 0 ? (
                            <div style={styles.empty}>
                                <FaFile className="icon-48-949-mb16" />
                                <p>{t('exportJobs.noJobs')}</p>
                                <p className="text-949-14">{t('exportJobs.getStarted')}</p>
                            </div>
                        ) : (
                            <div style={styles.jobsList}>
                                {e.jobs.map((job) => (
                                    <div key={job.id} style={styles.jobCard}>
                                        <div style={styles.jobIcon}>
                                            {getStatusIcon(job.status)}
                                        </div>
                                        <div style={styles.jobDetails}>
                                            <div style={styles.jobTitle}>
                                                {t(
                                                    EXPORT_TYPES.find((et) => et.id === job.type)
                                                        ?.nameKey || job.type
                                                )}
                                            </div>
                                            <div style={styles.jobMeta}>
                                                <span>
                                                    Created:{' '}
                                                    {new Date(job.created_at).toLocaleString()}
                                                </span>
                                                {job.completed_at && (
                                                    <>
                                                        <span className="m-0-8">�</span>
                                                        <span>
                                                            Completed:{' '}
                                                            {new Date(
                                                                job.completed_at
                                                            ).toLocaleString()}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            {job.status === 'processing' && job.progress && (
                                                <div style={styles.progressBar}>
                                                    <div
                                                        style={{
                                                            ...styles.progressFill,
                                                            width: `${job.progress}%`,
                                                        }}
                                                    />
                                                    <span style={styles.progressText}>
                                                        {job.progress}%
                                                    </span>
                                                </div>
                                            )}
                                            {job.file_size && (
                                                <div style={styles.fileSize}>
                                                    Size: {formatFileSize(job.file_size)}
                                                </div>
                                            )}
                                        </div>
                                        <div style={styles.jobActions}>
                                            <span>{job.status}</span>
                                            {job.status === 'completed' && (
                                                <button
                                                    aria-label={t('exportJobs.download', 'Download export')}
                                                    onClick={() => e.downloadExport(job.id)}
                                                    style={styles.downloadBtn}
                                                    title="Indir"
                                                >
                                                    <FaDownload />
                                                </button>
                                            )}
                                            <button
                                                aria-label={t('common.delete')}
                                                onClick={() => e.deleteJob(job.id)}
                                                style={styles.deleteBtn}
                                                title={t('common.delete')}
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div style={styles.info}>
                        <p style={styles.infoText}>
                            ?? Disa aktarmalar arka planda islenir ve birka� dakika s�rebilir
                        </p>
                        <p style={styles.infoText}>
                            ?? Completed exports are available for 7 days before auto-deletion
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

ExportJobsPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
};
export default ExportJobsPanel;
