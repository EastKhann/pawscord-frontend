// frontend/src/utils/dragDropManager.js

/**
 * 📎 Drag & Drop File Manager
 * Advanced file upload with drag & drop
 */

class DragDropManager {
    constructor(options = {}) {
        this.maxFileSize = options.maxFileSize || Infinity; // ♾️ Sınırsız - Backend üyeliğe göre kontrol eder
        this.maxFiles = options.maxFiles || 10;
        this.acceptedTypes = options.acceptedTypes || [];
        this.onFilesAdded = options.onFilesAdded || (() => { });
        this.onError = options.onError || console.error;
        this.uploadEndpoint = options.uploadEndpoint || '/api/upload';

        this.uploads = new Map();
        this.uploadId = 0;
    }

    /**
     * Initialize drag & drop on element
     */
    init(element, options = {}) {
        if (!element) return;

        const {
            onDragEnter,
            onDragLeave,
            onDrop,
            multiple = true
        } = options;

        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            element.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        // Highlight drop zone
        ['dragenter', 'dragover'].forEach(eventName => {
            element.addEventListener(eventName, () => {
                element.classList.add('drag-over');
                if (onDragEnter) onDragEnter();
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            element.addEventListener(eventName, () => {
                element.classList.remove('drag-over');
                if (onDragLeave) onDragLeave();
            }, false);
        });

        // Handle drop
        element.addEventListener('drop', (e) => {
            const files = Array.from(e.dataTransfer.files);
            this.handleFiles(files, multiple);
            if (onDrop) onDrop(files);
        }, false);

        // Click to upload
        element.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = multiple;
            if (this.acceptedTypes.length > 0) {
                input.accept = this.acceptedTypes.join(',');
            }

            input.onchange = (e) => {
                const files = Array.from(e.target.files);
                this.handleFiles(files, multiple);
            };

            input.click();
        });

        return () => {
            // Cleanup
            element.removeEventListener('drop', preventDefaults);
        };
    }

    /**
     * Handle files
     */
    handleFiles(files, multiple = true) {
        // Limit number of files
        const filesToProcess = multiple ? files.slice(0, this.maxFiles) : files.slice(0, 1);

        // Validate and process
        const validFiles = [];
        const errors = [];

        filesToProcess.forEach(file => {
            const validation = this.validateFile(file);

            if (validation.valid) {
                validFiles.push(file);
            } else {
                errors.push({ file: file.name, error: validation.error });
            }
        });

        if (errors.length > 0) {
            errors.forEach(({ file, error }) => {
                this.onError(new Error(`${file}: ${error}`));
            });
        }

        if (validFiles.length > 0) {
            this.onFilesAdded(validFiles);
        }

        return validFiles;
    }

    /**
     * Validate file
     */
    validateFile(file) {
        // Check file size
        if (file.size > this.maxFileSize) {
            return {
                valid: false,
                error: `File size exceeds ${this.formatBytes(this.maxFileSize)}`
            };
        }

        // Check file type
        if (this.acceptedTypes.length > 0) {
            const fileType = file.type;
            const fileName = file.name.toLowerCase();

            const isAccepted = this.acceptedTypes.some(type => {
                if (type.startsWith('.')) {
                    return fileName.endsWith(type);
                }
                if (type.endsWith('/*')) {
                    return fileType.startsWith(type.replace('/*', ''));
                }
                return fileType === type;
            });

            if (!isAccepted) {
                return {
                    valid: false,
                    error: `File type not accepted. Allowed: ${this.acceptedTypes.join(', ')}`
                };
            }
        }

        return { valid: true };
    }

    /**
     * Upload file
     */
    async upload(file, options = {}) {
        const id = ++this.uploadId;
        const {
            onProgress,
            onComplete,
            onError,
            headers = {},
            field = 'file'
        } = options;

        const upload = {
            id,
            file,
            progress: 0,
            status: 'pending',
            startTime: Date.now(),
            xhr: new XMLHttpRequest()
        };

        this.uploads.set(id, upload);

        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append(field, file);

            // Add custom fields
            if (options.data) {
                Object.entries(options.data).forEach(([key, value]) => {
                    formData.append(key, value);
                });
            }

            // Upload progress
            upload.xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const progress = Math.round((e.loaded / e.total) * 100);
                    upload.progress = progress;

                    if (onProgress) {
                        onProgress(progress, e.loaded, e.total);
                    }
                }
            });

            // Upload complete
            upload.xhr.addEventListener('load', () => {
                if (upload.xhr.status >= 200 && upload.xhr.status < 300) {
                    upload.status = 'completed';

                    try {
                        const response = JSON.parse(upload.xhr.responseText);

                        if (onComplete) {
                            onComplete(response);
                        }

                        resolve(response);
                    } catch (error) {
                        upload.status = 'error';
                        reject(error);
                    }
                } else {
                    upload.status = 'error';
                    const error = new Error(`Upload failed with status ${upload.xhr.status}`);

                    if (onError) {
                        onError(error);
                    }

                    reject(error);
                }

                this.uploads.delete(id);
            });

            // Upload error
            upload.xhr.addEventListener('error', () => {
                upload.status = 'error';
                const error = new Error('Upload failed');

                if (onError) {
                    onError(error);
                }

                reject(error);
                this.uploads.delete(id);
            });

            // Upload abort
            upload.xhr.addEventListener('abort', () => {
                upload.status = 'cancelled';
                reject(new Error('Upload cancelled'));
                this.uploads.delete(id);
            });

            // Send request
            upload.xhr.open('POST', this.uploadEndpoint);

            // Set headers
            Object.entries(headers).forEach(([key, value]) => {
                upload.xhr.setRequestHeader(key, value);
            });

            upload.status = 'uploading';
            upload.xhr.send(formData);
        });
    }

    /**
     * Upload multiple files
     */
    async uploadMultiple(files, options = {}) {
        const results = [];
        const {
            parallel = 3,
            onFileComplete,
            onAllComplete
        } = options;

        // Upload in batches
        for (let i = 0; i < files.length; i += parallel) {
            const batch = files.slice(i, i + parallel);

            const batchResults = await Promise.allSettled(
                batch.map(file => this.upload(file, options))
            );

            batchResults.forEach((result, idx) => {
                const file = batch[idx];

                if (result.status === 'fulfilled') {
                    results.push({ file, success: true, data: result.value });
                    if (onFileComplete) {
                        onFileComplete(file, result.value);
                    }
                } else {
                    results.push({ file, success: false, error: result.reason });
                    if (onFileComplete) {
                        onFileComplete(file, null, result.reason);
                    }
                }
            });
        }

        if (onAllComplete) {
            onAllComplete(results);
        }

        return results;
    }

    /**
     * Cancel upload
     */
    cancel(id) {
        const upload = this.uploads.get(id);
        if (upload && upload.xhr) {
            upload.xhr.abort();
            this.uploads.delete(id);
        }
    }

    /**
     * Cancel all uploads
     */
    cancelAll() {
        this.uploads.forEach((upload, id) => {
            if (upload.xhr) {
                upload.xhr.abort();
            }
        });
        this.uploads.clear();
    }

    /**
     * Get upload progress
     */
    getProgress(id) {
        const upload = this.uploads.get(id);
        return upload ? upload.progress : 0;
    }

    /**
     * Read file as data URL
     */
    readAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    /**
     * Read file as text
     */
    readAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    /**
     * Read file as array buffer
     */
    readAsArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    /**
     * Generate thumbnail for image
     */
    async generateThumbnail(file, maxWidth = 200, maxHeight = 200) {
        if (!file.type.startsWith('image/')) {
            throw new Error('File is not an image');
        }

        const dataUrl = await this.readAsDataURL(file);

        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height = height * (maxWidth / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = width * (maxHeight / height);
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    resolve(blob);
                }, file.type, 0.8);
            };

            img.onerror = reject;
            img.src = dataUrl;
        });
    }

    /**
     * Format bytes
     */
    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    /**
     * Get file extension
     */
    getExtension(filename) {
        return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
    }

    /**
     * Get file icon
     */
    getFileIcon(file) {
        const extension = this.getExtension(file.name).toLowerCase();
        const type = file.type;

        if (type.startsWith('image/')) return '🖼️';
        if (type.startsWith('video/')) return '🎥';
        if (type.startsWith('audio/')) return '🎵';
        if (type.startsWith('application/pdf')) return '📄';
        if (type.startsWith('application/zip')) return '📦';
        if (type.startsWith('text/')) return '📝';

        const icons = {
            'doc': '📄', 'docx': '📄',
            'xls': '📊', 'xlsx': '📊',
            'ppt': '📽️', 'pptx': '📽️',
            'zip': '📦', 'rar': '📦', '7z': '📦',
            'js': '📜', 'jsx': '📜',
            'ts': '📜', 'tsx': '📜',
            'json': '📋',
            'md': '📝',
            'html': '🌐',
            'css': '🎨'
        };

        return icons[extension] || '📎';
    }
}

// Global instance
export const dragDropManager = new DragDropManager();

/**
 * React Hook
 */
export const useDragDrop = (options = {}) => {
    const [files, setFiles] = React.useState([]);
    const [uploading, setUploading] = React.useState(false);
    const [progress, setProgress] = React.useState({});
    const dropZoneRef = React.useRef(null);

    const manager = React.useMemo(() => new DragDropManager({
        ...options,
        onFilesAdded: (newFiles) => {
            setFiles(prev => [...prev, ...newFiles]);
            if (options.onFilesAdded) {
                options.onFilesAdded(newFiles);
            }
        }
    }), [options]);

    React.useEffect(() => {
        if (dropZoneRef.current) {
            return manager.init(dropZoneRef.current, options);
        }
    }, [manager, options]);

    const upload = React.useCallback(async (file) => {
        setUploading(true);

        try {
            const result = await manager.upload(file, {
                ...options,
                onProgress: (percent) => {
                    setProgress(prev => ({ ...prev, [file.name]: percent }));
                }
            });

            return result;
        } finally {
            setUploading(false);
        }
    }, [manager, options]);

    const uploadAll = React.useCallback(async () => {
        setUploading(true);

        try {
            const results = await manager.uploadMultiple(files, {
                ...options,
                onFileComplete: (file, data, error) => {
                    if (!error) {
                        setFiles(prev => prev.filter(f => f !== file));
                    }
                }
            });

            return results;
        } finally {
            setUploading(false);
        }
    }, [manager, files, options]);

    const removeFile = React.useCallback((file) => {
        setFiles(prev => prev.filter(f => f !== file));
    }, []);

    const clear = React.useCallback(() => {
        setFiles([]);
        setProgress({});
    }, []);

    return {
        dropZoneRef,
        files,
        uploading,
        progress,
        upload,
        uploadAll,
        removeFile,
        clear
    };
};

export default DragDropManager;


