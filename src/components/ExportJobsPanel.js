import { FaTimes, FaDownload, FaFile, FaSpinner } from 'react-icons/fa';
import useExportJobs, { EXPORT_TYPES, formatFileSize, getStatusIcon, getStatusColor } from './ExportJobsPanel/useExportJobs';
import { styles } from './ExportJobsPanel/exportJobsStyles';

const ExportJobsPanel = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
  const e = useExportJobs(fetchWithAuth, apiBaseUrl);

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(ev) => ev.stopPropagation()}>
        <div style={styles.header}>
          <div style={styles.headerLeft}><FaDownload style={{ fontSize: '24px', color: '#5865f2' }} /><h2 style={{ margin: 0, fontSize: '20px' }}>Export Jobs</h2></div>
          <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
        </div>

        <div style={styles.content}>
          <div style={styles.createSection}>
            <h3 style={styles.sectionTitle}>Create New Export</h3>
            <div style={styles.exportTypeSelector}>
              <select value={e.exportType} onChange={(ev) => e.setExportType(ev.target.value)} style={styles.select}>
                {EXPORT_TYPES.map(t => <option key={t.id} value={t.id}>{t.name} - {t.description}</option>)}
              </select>
              <button onClick={e.createExport} disabled={e.creating} style={styles.createBtn}>
                {e.creating ? <><FaSpinner className="fa-spin" /> Creating...</> : <><FaDownload /> Create Export</>}
              </button>
            </div>
          </div>

          <div style={styles.jobsSection}>
            <h3 style={styles.sectionTitle}>Your Export Jobs</h3>
            {e.loading ? <div style={styles.loading}>Loading jobs...</div> : e.jobs.length === 0 ? (
              <div style={styles.empty}><FaFile style={{ fontSize: '48px', color: '#99aab5', marginBottom: '16px' }} /><p>No export jobs yet</p><p style={{ fontSize: '14px', color: '#99aab5' }}>Create your first export to get started</p></div>
            ) : (
              <div style={styles.jobsList}>
                {e.jobs.map(job => (
                  <div key={job.id} style={styles.jobCard}>
                    <div style={styles.jobIcon}>{getStatusIcon(job.status)}</div>
                    <div style={styles.jobDetails}>
                      <div style={styles.jobTitle}>{EXPORT_TYPES.find(t => t.id === job.type)?.name || job.type}</div>
                      <div style={styles.jobMeta}>
                        <span>Created: {new Date(job.created_at).toLocaleString()}</span>
                        {job.completed_at && <><span style={{ margin: '0 8px' }}>{'\u2022'}</span><span>Completed: {new Date(job.completed_at).toLocaleString()}</span></>}
                      </div>
                      {job.status === 'processing' && job.progress && (
                        <div style={styles.progressBar}><div style={{ ...styles.progressFill, width: `${job.progress}%` }} /><span style={styles.progressText}>{job.progress}%</span></div>
                      )}
                      {job.file_size && <div style={styles.fileSize}>Size: {formatFileSize(job.file_size)}</div>}
                    </div>
                    <div style={styles.jobActions}>
                      <span style={{ ...styles.statusBadge, backgroundColor: getStatusColor(job.status) }}>{job.status}</span>
                      {job.status === 'completed' && <button onClick={() => e.downloadExport(job.id)} style={styles.downloadBtn} title="Download"><FaDownload /></button>}
                      <button onClick={() => e.deleteJob(job.id)} style={styles.deleteBtn} title="Delete"><FaTimes /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={styles.info}>
            <p style={styles.infoText}>{'\uD83D\uDCE6'} Exports are processed in the background and may take a few minutes</p>
            <p style={styles.infoText}>{'\uD83D\uDCBE'} Completed exports are available for 7 days before auto-deletion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportJobsPanel;
