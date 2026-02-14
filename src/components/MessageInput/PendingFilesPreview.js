// frontend/src/components/MessageInput/PendingFilesPreview.js
import React from 'react';
import { FaFileAlt, FaTimes } from 'react-icons/fa';
import styles from './styles';

const PendingFilesPreview = ({ pendingFiles, setPendingFiles, removePendingFile }) => {
    if (pendingFiles.length === 0) return null;

    return (
        <div style={styles.pendingFilesContainer}>
            <div style={styles.pendingFilesHeader}>
                <span>📎 {pendingFiles.length} dosya bekliyor</span>
                <button
                    onClick={() => setPendingFiles([])}
                    style={styles.clearAllButton}
                    title="Tümünü temizle"
                >
                    Tümünü Kaldır
                </button>
            </div>
            <div style={styles.pendingFilesList}>
                {pendingFiles.map((file) => (
                    <div key={file.id} style={styles.pendingFileItem}>
                        {file.previewUrl && file.type.startsWith('image/') ? (
                            <img src={file.previewUrl} alt={file.name} style={styles.filePreviewImage} />
                        ) : file.previewUrl && file.type.startsWith('video/') ? (
                            <video src={file.previewUrl} style={styles.filePreviewVideo} muted />
                        ) : (
                            <div style={styles.filePreviewIcon}>
                                <FaFileAlt size={24} />
                            </div>
                        )}
                        <div style={styles.fileInfo}>
                            <span style={styles.fileName}>
                                {file.name.length > 20 ? file.name.substring(0, 17) + '...' : file.name}
                            </span>
                            <span style={styles.fileSize}>{(file.size / 1024).toFixed(1)} KB</span>
                        </div>
                        <button
                            onClick={() => removePendingFile(file.id)}
                            style={styles.removeFileButton}
                            title="Dosyayı kaldır"
                        >
                            <FaTimes />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(PendingFilesPreview);
