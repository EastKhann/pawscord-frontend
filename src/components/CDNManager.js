import React, { useState } from 'react';
import './CDNManager.css';
import { FaCloud, FaTimes, FaUpload, FaTrash, FaLink, FaCopy, FaImage, FaVideo, FaFileAudio, FaFile } from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';

const CDNManager = ({ serverId, onClose }) => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const fetchWithAuth = async (url, options = {}) => {
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            ...options,
            headers: {
                'Authorization': `Bearer ${token}`,
                ...options.headers
            }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    };

    const uploadFile = async (file) => {
        setUploading(true);
        setUploadProgress(0);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('server_id', serverId);

            const token = localStorage.getItem('access_token');
            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const progress = (e.loaded / e.total) * 100;
                    setUploadProgress(Math.round(progress));
                }
            });

            const uploadPromise = new Promise((resolve, reject) => {
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(new Error(`Upload failed: ${xhr.status}`));
                    }
                };
                xhr.onerror = () => reject(new Error('Upload failed'));
            });

            xhr.open('POST', `${getApiBase()}/cdn/upload/`);
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            xhr.send(formData);

            const result = await uploadPromise;
            showToast('File uploaded successfully!');
            setFiles([...files, result.file]);
        } catch (error) {
            console.error('Upload error:', error);
            showToast('Failed to upload file', 'error');
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const deleteFile = async (fileId, fileUrl) => {
        if (!window.confirm('Are you sure you want to delete this file?')) return;

        try {
            await fetchWithAuth(`${getApiBase()}/cdn/delete/`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ file_url: fileUrl })
            });
            showToast('File deleted!');
            setFiles(files.filter(f => f.id !== fileId));
        } catch (error) {
            console.error('Delete error:', error);
            showToast('Failed to delete file', 'error');
        }
    };

    const copyFileUrl = async (url) => {
        try {
            await navigator.clipboard.writeText(url);
            showToast('URL copied to clipboard!');
        } catch (error) {
            console.error('Copy error:', error);
            showToast('Failed to copy URL', 'error');
        }
    };

    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);
        selectedFiles.forEach(file => uploadFile(file));
    };

    const getFileIcon = (fileType) => {
        if (fileType.startsWith('image/')) return <FaImage />;
        if (fileType.startsWith('video/')) return <FaVideo />;
        if (fileType.startsWith('audio/')) return <FaFileAudio />;
        return <FaFile />;
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const showToast = (message, type = 'success') => {
        console.log(`[${type}] ${message}`);
    };

    return (
        <div className="cdn-overlay">
            <div className="cdn-panel">
                <div className="panel-header">
                    <div>
                        <h2><FaCloud /> CDN Manager</h2>
                        <p className="files-count">{files.length} file{files.length !== 1 ? 's' : ''}</p>
                    </div>
                    <button onClick={onClose} className="btn-close">
                        <FaTimes />
                    </button>
                </div>

                <div className="upload-area">
                    <input
                        type="file"
                        id="file-upload"
                        multiple
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="file-upload" className="upload-box">
                        <FaUpload size={48} />
                        <h3>Upload Files</h3>
                        <p>Click to browse or drag and drop files here</p>
                        <span className="supported-formats">Supports: Images, Videos, Audio, Documents</span>
                    </label>

                    {uploading && (
                        <div className="upload-progress">
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${uploadProgress}%` }} />
                            </div>
                            <span className="progress-text">{uploadProgress}%</span>
                        </div>
                    )}
                </div>

                <div className="cdn-content">
                    {files.length === 0 ? (
                        <div className="empty-state">
                            <FaCloud size={64} />
                            <h3>No Files Yet</h3>
                            <p>Upload your first file to get started</p>
                        </div>
                    ) : (
                        <div className="files-grid">
                            {files.map(file => (
                                <div key={file.id} className="file-card">
                                    <div className="file-preview">
                                        {file.type.startsWith('image/') ? (
                                            <img src={file.url} alt={file.name} />
                                        ) : (
                                            <div className="file-icon">
                                                {getFileIcon(file.type)}
                                            </div>
                                        )}
                                    </div>

                                    <div className="file-info">
                                        <h4>{file.name}</h4>
                                        <p className="file-size">{formatFileSize(file.size)}</p>
                                        <div className="file-url">
                                            <code>{file.url}</code>
                                            <button onClick={() => copyFileUrl(file.url)} className="btn-copy-url">
                                                <FaCopy />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="file-actions">
                                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="btn-view">
                                            <FaLink /> View
                                        </a>
                                        <button onClick={() => deleteFile(file.id, file.url)} className="btn-delete-file">
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CDNManager;
