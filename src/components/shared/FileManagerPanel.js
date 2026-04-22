// frontend/src/components/FileManagerPanel.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    FaFolder,
    FaFile,
    FaImage,
    FaVideo,
    FaFileArchive,
    FaDownload,
    FaSearch,
} from 'react-icons/fa';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const FileManagerPanel = ({ serverId, apiBaseUrl, fetchWithAuth }) => {
    const { t } = useTranslation();
    const [files, setFiles] = useState([]);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const categories = [
        { id: 'all', label: 'All', icon: FaFolder },
        { id: 'images', label: 'Imageler', icon: FaImage },
        { id: 'videos', label: 'Videolar', icon: FaVideo },
        { id: 'documents', label: 'Belgeler', icon: FaFile },
        { id: 'archives', label: t('ui.arsivler'), icon: FaFileArchive },
    ];

    useEffect(() => {
        loadFiles();
    }, [serverId]);

    const loadFiles = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/files/?server=${serverId}`);
            if (response.ok) {
                const data = await response.json();
                setFiles(data);
            }
        } catch (error) {
            logger.error('Failed to load files:', error);
        } finally {
            setLoading(false);
        }
    };

    const getFileType = (filename) => {
        const ext = filename.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'images';
        if (['mp4', 'avi', 'mov', 'webm'].includes(ext)) return 'videos';
        if (['pdf', 'doc', 'docx', 'txt', 'xlsx'].includes(ext)) return 'documents';
        if (['zip', 'rar', '7z', 'tar'].includes(ext)) return 'archives';
        return 'other';
    };

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB';
        return (bytes / 1024 / 1024 / 1024).toFixed(1) + ' GB';
    };

    const filteredFiles = files.filter((file) => {
        const matchesFilter = filter === 'all' || getFileType(file.filename) === filter;
        const matchesSearch = file.filename.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const totalSize = filteredFiles.reduce((sum, file) => sum + (file.size || 0), 0);

    return (
        <div style={styles.container}>
            <style>{`@keyframes fmpFadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }`}</style>
            <div style={styles.header}>
                <h2 style={styles.title}>
                    <FaFolder /> File Administratorsi
                </h2>
                <div style={styles.stats}>
                    {filteredFiles.length} file · {formatSize(totalSize)}
                </div>
            </div>

            <div style={styles.search}>
                <FaSearch style={styles.searchIcon} />
                <input
                    type="text"
                    placeholder={t('fileManager.searchPlaceholder', 'Search files...')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={styles.searchInput}
                    aria-label={t('common.search', 'Search')}
                />
            </div>

            <div style={styles.categories}>
                {categories.map((cat) => {
                    const Icon = cat.icon;
                    const count = files.filter(
                        (f) => cat.id === 'all' || getFileType(f.filename) === cat.id
                    ).length;

                    return (
                        <button
                            aria-label={t('fileManager.filterBy', 'Filter by {{cat}}', { cat: cat.label })}
                        >
                            <Icon style={styles.categoryIcon} />
                            <span>{cat.label}</span>
                            <span style={styles.categoryCount}>{count}</span>
                        </button>
                    );
                })}
            </div>

            <div style={styles.fileList}>
                {loading ? (
                    <div style={styles.loading}>{t('common.loading')}</div>
                ) : filteredFiles.length === 0 ? (
                    <div style={styles.empty}>
                        <FaFolder style={styles.emptyIcon} />
                        <p>{t('fileManager.notFound', 'File not found')}</p>
                    </div>
                ) : (
                    filteredFiles.map((file) => (
                        <FileCard key={file.id} file={file} formatSize={formatSize} />
                    ))
                )}
            </div>
        </div>
    );
};

const FileCard = ({ file, formatSize }) => {
    const getFileIcon = (filename) => {
        const ext = filename.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return '🖼️';
        if (['mp4', 'avi', 'mov'].includes(ext)) return '🎥';
        if (['pdf'].includes(ext)) return '📕';
        if (['doc', 'docx'].includes(ext)) return '📘';
        if (['zip', 'rar'].includes(ext)) return '📦';
        return '📄';
    };

    return (
        <div style={styles.fileCard}>
            <div style={styles.fileIcon}>{getFileIcon(file.filename)}</div>
            <div style={styles.fileInfo}>
                <div style={styles.fileName}>{file.filename}</div>
                <div style={styles.fileMeta}>
                    {formatSize(file.size || 0)} · {file.uploaded_by} ·{' '}
                    {new Date(file.created_at).toLocaleDateString('tr-TR')}
                </div>
            </div>
            <a href={file.url} download style={styles.downloadButton}>
                <FaDownload />
            </a>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#111214',
        borderRadius: '8px',
        animation: 'fmpFadeIn 0.22s ease-out',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '15px',
        borderBottom: '1px solid #0b0e1b',
    },
    title: {
        color: '#fff',
        fontSize: '20px',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    stats: {
        color: '#949ba4',
        fontSize: '13px',
    },
    search: {
        position: 'relative',
        marginBottom: '16px',
    },
    searchIcon: {
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#949ba4',
        fontSize: '14px',
    },
    searchInput: {
        width: '100%',
        padding: '10px 10px 10px 36px',
        backgroundColor: '#0d0e10',
        border: '1px solid #4e5058',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '14px',
    },
    categories: {
        display: 'flex',
        gap: '8px',
        marginBottom: '20px',
        overflowX: 'auto',
    },
    categoryButton: {
        padding: '8px 16px',
        backgroundColor: '#0d0e10',
        border: '1px solid #4e5058',
        borderRadius: '6px',
        color: '#b5bac1',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        whiteSpace: 'nowrap',
        transition: 'all 0.2s',
    },
    categoryButtonActive: {
        backgroundColor: '#5865f2',
        borderColor: '#5865f2',
        color: '#fff',
    },
    categoryIcon: {
        fontSize: '16px',
    },
    categoryCount: {
        fontSize: '12px',
        opacity: 0.7,
    },
    fileList: {
        display: 'grid',
        gap: '8px',
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#b5bac1',
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#b5bac1',
    },
    emptyIcon: {
        fontSize: '64px',
        opacity: 0.3,
        marginBottom: '20px',
    },
    fileCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        backgroundColor: '#0d0e10',
        borderRadius: '6px',
        border: '1px solid transparent',
        transition: 'border-color 0.2s',
    },
    fileIcon: {
        fontSize: '32px',
    },
    fileInfo: {
        flex: 1,
        minWidth: 0,
    },
    fileName: {
        color: '#fff',
        fontSize: '14px',
        fontWeight: '500',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    fileMeta: {
        color: '#949ba4',
        fontSize: '12px',
        marginTop: '4px',
    },
    downloadButton: {
        padding: '8px 12px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '14px',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
    },
};

FileManagerPanel.propTypes = {
    serverId: PropTypes.string,
    apiBaseUrl: PropTypes.string,
    fetchWithAuth: PropTypes.func,
};

FileCard.propTypes = {
    file: PropTypes.object,
    formatSize: PropTypes.string,
};

export default React.memo(FileManagerPanel);
