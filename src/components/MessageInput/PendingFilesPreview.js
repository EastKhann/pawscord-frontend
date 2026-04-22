// frontend/src/components/MessageInput/PendingFilesPreview.js
import React from 'react';
import PropTypes from 'prop-types';
import { FaFileAlt, FaTimes } from 'react-icons/fa';
import styles from './styles';
import { useTranslation } from 'react-i18next';

const PendingFilesPreview = ({ pendingFiles, setPendingFiles, removePendingFile }) => {
    const { t } = useTranslation();

    if (pendingFiles.length === 0) return null;

    return (
        <div aria-label={t('messageInput.pendingFiles', 'Pending files')} style={styles.pendingFilesContainer}>
            <div style={styles.pendingFilesHeader}>
                <span>📎 {pendingFiles.length} dosya bekliyor</span>
                <button
                    onClick={() => setPendingFiles([])}
                    style={styles.clearAllButton}
                    title={t('allnü_temizle')}
                >
                    {t('pendingFiles.removeAll', 'Remove All')}
                </button>
            </div>
            <div style={styles.pendingFilesList}>
                {pendingFiles.map((file) => (
                    <div key={file.id} style={styles.pendingFileItem}>
                        {file.previewUrl && file.type.startsWith('image/') ? (
                            <img
                                src={file.previewUrl}
                                alt={file.name}
                                style={styles.filePreviewImage}
                            />
                        ) : file.previewUrl && file.type.startsWith('video/') ? (
                            <video src={file.previewUrl} style={styles.filePreviewVideo} muted>
                                <track kind="captions" />
                            </video>
                        ) : (
                            <div style={styles.filePreviewIcon}>
                                <FaFileAlt size={24} />
                            </div>
                        )}
                        <div style={styles.fileInfo}>
                            <span style={styles.fileName}>
                                {file.name.length > 20
                                    ? file.name.substring(0, 17) + '...'
                                    : file.name}
                            </span>
                            <span style={styles.fileSize}>{(file.size / 1024).toFixed(1)} KB</span>
                        </div>
                        <button
                            onClick={() => removePendingFile(file.id)}
                            style={styles.removeFileButton}
                            title={t('remove_file')}
                        >
                            <FaTimes />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

PendingFilesPreview.propTypes = {
    pendingFiles: PropTypes.array,
    setPendingFiles: PropTypes.func,
    removePendingFile: PropTypes.func,
};
export default React.memo(PendingFilesPreview);
