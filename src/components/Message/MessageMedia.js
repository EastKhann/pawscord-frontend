// frontend/src/components/Message/MessageMedia.js
// 🎬 MESSAGE MEDIA - Images, Videos, Files, Voice messages

import { memo, lazy, Suspense, useState, useEffect, useRef } from 'react';
import { FaDownload } from 'react-icons/fa';

// Lazy load heavy components
const VoiceMessagePlayer = lazy(() => import('../VoiceMessagePlayer'));

// Lazy Video Component
export const LazyVideo = memo(({ src, style }) => {
    const videoRef = useRef(null);
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setShouldLoad(true);
                observer.disconnect();
            }
        }, { threshold: 0.2 });

        if (videoRef.current) observer.observe(videoRef.current);
        return () => { if (videoRef.current) observer.unobserve(videoRef.current); };
    }, []);

    return (
        <div ref={videoRef} style={{
            minHeight: '200px',
            ...style,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000'
        }}>
            {shouldLoad ? (
                <video controls preload="metadata" src={src} style={style}>
                    Tarayıcınız video oynatmayı desteklemiyor.
                    <a href={src} download>İndir</a>
                </video>
            ) : (
                <span style={{ color: '#aaa' }}>Video Yükleniyor...</span>
            )}
        </div>
    );
});

// Lazy Mount Wrapper
export const LazyMount = memo(({ children, minHeight = 60 }) => {
    const ref = useRef(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setShow(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} style={{ minHeight }}>
            {show ? children : null}
        </div>
    );
});

// File Attachment Component
export const FileAttachment = memo(({
    fileUrl,
    fileName,
    fileSize
}) => {
    const ext = (fileName || '').split('.').pop().toLowerCase();
    const fileExt = ext.toUpperCase();
    const fileSizeText = fileSize ? `(${(fileSize / 1024 / 1024).toFixed(2)} MB)` : '';

    const getFileIcon = () => {
        if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return '📦';
        if (['pdf'].includes(ext)) return '📄';
        if (['doc', 'docx'].includes(ext)) return '📝';
        if (['xls', 'xlsx'].includes(ext)) return '📊';
        if (['ppt', 'pptx'].includes(ext)) return '📽️';
        if (['txt'].includes(ext)) return '📃';
        return '📎';
    };

    return (
        <div style={styles.fileAttachment} className="file-attachment-hover">
            <div style={styles.fileIcon}>{getFileIcon()}</div>
            <div style={styles.fileInfo}>
                <div style={styles.fileName}>{fileName || 'Dosya'}</div>
                <div style={styles.fileDetails}>{fileExt} {fileSizeText}</div>
            </div>
            <a
                href={fileUrl}
                download={fileName}
                style={styles.downloadButton}
                className="download-button-hover"
                onClick={(e) => e.stopPropagation()}
            >
                <FaDownload size={18} />
                <span style={{ marginLeft: '6px' }}>İndir</span>
            </a>
        </div>
    );
});

// Voice Message Component
export const VoiceMessage = memo(({
    fileUrl,
    fileName,
    duration,
    transcription,
    isTranscribing,
    onTranscribe
}) => {
    return (
        <Suspense fallback={<div style={styles.loadingMedia}>🎵 Ses yükleniyor...</div>}>
            <div>
                <VoiceMessagePlayer
                    audioUrl={fileUrl}
                    duration={duration || 0}
                    onDownload={() => {
                        const a = document.createElement('a');
                        a.href = fileUrl;
                        a.download = fileName || `voice-${Date.now()}.webm`;
                        a.click();
                    }}
                />

                {/* Transcription Section */}
                {transcription && (
                    <div style={styles.voiceTranscription}>
                        <div style={styles.transcriptionIcon}>💬</div>
                        <div style={styles.transcriptionText}>{transcription}</div>
                    </div>
                )}

                {!transcription && !isTranscribing && (
                    <button onClick={onTranscribe} style={styles.transcribeButton}>
                        📝 Metne Çevir
                    </button>
                )}

                {isTranscribing && (
                    <div style={styles.transcribingLoader}>⏳ Çevriliyor...</div>
                )}
            </div>
        </Suspense>
    );
});

// Main MessageMedia Component
export const MessageMedia = memo(({
    msg,
    finalImageUrl,
    finalFileUrl,
    onImageClick,
    onContentLoad,
    transcription,
    isTranscribing,
    onTranscribe,
    galleryGroup,
    absoluteHostUrl
}) => {
    const ext = (msg.file_name || '').split('.').pop().toLowerCase();
    const fileName = (msg.file_name || '').toLowerCase();

    // 🖼️ GALLERY GROUP: Birden fazla medya mesajını grid halinde göster
    if (galleryGroup && galleryGroup.length > 1) {
        const getMediaUrl = (m) => {
            const url = m.image_url || m.image || m.file_url || m.file;
            if (!url) return null;
            if (url.startsWith('http') || url.startsWith('blob:')) return url;
            return `${(absoluteHostUrl || '').replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
        };

        const isImageItem = (m) => {
            const url = m.image_url || m.image;
            if (url) return true;
            const fn = (m.file_name || '').toLowerCase();
            const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'ico'];
            return imageExts.some(e => fn.endsWith(`.${e}`));
        };

        const isVideoItem = (m) => {
            const fn = (m.file_name || '').toLowerCase();
            const videoExts = ['mp4', 'mov', 'mkv', 'webm'];
            const isVoice = fn.startsWith('voice_') || fn.startsWith('voice-');
            return !isVoice && videoExts.some(e => fn.endsWith(`.${e}`));
        };

        const imageItems = galleryGroup.filter(m => isImageItem(m) || isVideoItem(m));
        const fileItems = galleryGroup.filter(m => !isImageItem(m) && !isVideoItem(m));
        const count = imageItems.length;

        // Galeri grid boyutlandırma
        const getGridStyle = () => {
            if (count === 1) return { gridTemplateColumns: '1fr', maxWidth: '450px' };
            if (count === 2) return { gridTemplateColumns: '1fr 1fr', maxWidth: '500px' };
            if (count === 3) return { gridTemplateColumns: '1fr 1fr 1fr', maxWidth: '550px' };
            if (count === 4) return { gridTemplateColumns: '1fr 1fr', maxWidth: '500px' };
            return { gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: '600px' };
        };

        return (
            <div>
                {imageItems.length > 0 && (
                    <div style={{
                        display: 'grid',
                        gap: '4px',
                        marginTop: '8px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        ...getGridStyle()
                    }}>
                        {imageItems.map((item, idx) => {
                            const url = getMediaUrl(item);
                            if (!url) return null;
                            if (isVideoItem(item)) {
                                return (
                                    <div key={item.id || idx} style={{ position: 'relative', backgroundColor: '#000', minHeight: count > 4 ? '120px' : '180px' }}>
                                        <LazyVideo src={url} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0 }} />
                                    </div>
                                );
                            }
                            return (
                                <img
                                    key={item.id || idx}
                                    src={url}
                                    alt="gallery"
                                    style={{
                                        width: '100%',
                                        height: count > 4 ? '120px' : (count > 2 ? '160px' : '200px'),
                                        objectFit: 'cover',
                                        cursor: 'pointer',
                                        display: 'block'
                                    }}
                                    onClick={() => onImageClick(url)}
                                    loading="lazy"
                                    onLoad={idx === 0 ? onContentLoad : undefined}
                                />
                            );
                        })}
                    </div>
                )}
                {imageItems.length > 0 && (
                    <div style={{ color: '#b9bbbe', fontSize: '12px', marginTop: '4px', opacity: 0.7 }}>
                        📎 {count} medya
                    </div>
                )}
                {fileItems.map((item, idx) => (
                    <FileAttachment
                        key={item.id || idx}
                        fileUrl={getMediaUrl(item)}
                        fileName={item.file_name}
                        fileSize={item.file_size}
                    />
                ))}
            </div>
        );
    }

    // Image
    if (finalImageUrl) {
        return (
            <img
                src={finalImageUrl}
                alt="attachment"
                style={styles.messageImage}
                onClick={() => onImageClick(finalImageUrl)}
                loading="lazy"
                onLoad={onContentLoad}
            />
        );
    }

    // Voice message
    if (msg.is_voice_message && finalFileUrl) {
        return (
            <VoiceMessage
                fileUrl={finalFileUrl}
                fileName={msg.file_name}
                duration={msg.voice_duration}
                transcription={transcription}
                isTranscribing={isTranscribing}
                onTranscribe={onTranscribe}
            />
        );
    }

    // File attachment
    if (finalFileUrl) {
        // Voice file check
        if ((fileName.startsWith('voice_') || fileName.startsWith('voice-')) && ext === 'webm') {
            return (
                <VoiceMessage
                    fileUrl={finalFileUrl}
                    fileName={msg.file_name}
                    duration={msg.voice_duration}
                    transcription={transcription}
                    isTranscribing={isTranscribing}
                    onTranscribe={onTranscribe}
                />
            );
        }

        // Video
        if (['mp4', 'mov', 'mkv'].includes(ext) ||
            (ext === 'webm' && !fileName.startsWith('voice_') && !fileName.startsWith('voice-'))) {
            return <LazyVideo src={finalFileUrl} style={styles.messageVideo} />;
        }

        // Audio
        if (['mp3', 'wav', 'ogg'].includes(ext)) {
            return (
                <VoiceMessage
                    fileUrl={finalFileUrl}
                    fileName={msg.file_name}
                    duration={0}
                    transcription={null}
                    isTranscribing={false}
                    onTranscribe={() => { }}
                />
            );
        }

        // Other files
        return (
            <FileAttachment
                fileUrl={finalFileUrl}
                fileName={msg.file_name}
                fileSize={msg.file_size}
            />
        );
    }

    return null;
});

const styles = {
    messageImage: {
        width: 'min(450px, 100%)',
        height: 'auto',
        display: 'block',
        objectFit: 'cover',
        borderRadius: '8px',
        marginTop: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
    },
    messageVideo: {
        width: 'min(720px, 100%)',
        height: 'auto',
        borderRadius: '8px',
        marginTop: '8px',
        backgroundColor: 'black'
    },
    fileAttachment: {
        display: 'flex',
        alignItems: 'center',
        padding: '14px 16px',
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        marginTop: '8px',
        border: '1px solid #3a3d44',
        maxWidth: '450px',
        transition: 'all 0.2s ease',
        cursor: 'default'
    },
    fileIcon: {
        fontSize: '32px',
        marginRight: '12px',
        flexShrink: 0
    },
    fileInfo: {
        flex: 1,
        minWidth: 0,
        marginRight: '12px'
    },
    fileName: {
        color: '#f2f3f5',
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '4px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    fileDetails: {
        color: '#b9bbbe',
        fontSize: '12px'
    },
    downloadButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 14px',
        backgroundColor: '#5865f2',
        color: 'white',
        borderRadius: '6px',
        textDecoration: 'none',
        fontSize: '13px',
        fontWeight: '600',
        transition: 'all 0.2s ease',
        border: 'none',
        cursor: 'pointer',
        flexShrink: 0
    },
    loadingMedia: {
        padding: '12px',
        color: '#72767d',
        fontSize: '13px'
    },
    voiceTranscription: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        marginTop: '8px',
        padding: '10px 12px',
        backgroundColor: 'rgba(114, 137, 218, 0.1)',
        border: '1px solid rgba(114, 137, 218, 0.3)',
        borderRadius: '8px',
        maxWidth: '400px'
    },
    transcriptionIcon: {
        fontSize: '16px',
        flexShrink: 0,
        marginTop: '2px'
    },
    transcriptionText: {
        flex: 1,
        fontSize: '13px',
        lineHeight: '1.5',
        color: '#dcddde',
        fontStyle: 'italic'
    },
    transcribeButton: {
        marginTop: '8px',
        padding: '6px 12px',
        backgroundColor: 'rgba(88, 101, 242, 0.15)',
        border: '1px solid rgba(88, 101, 242, 0.4)',
        borderRadius: '6px',
        color: '#7289da',
        fontSize: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px'
    },
    transcribingLoader: {
        marginTop: '8px',
        padding: '6px 12px',
        color: '#72767d',
        fontSize: '12px',
        fontStyle: 'italic'
    }
};

LazyVideo.displayName = 'LazyVideo';
LazyMount.displayName = 'LazyMount';
FileAttachment.displayName = 'FileAttachment';
VoiceMessage.displayName = 'VoiceMessage';
MessageMedia.displayName = 'MessageMedia';

export default MessageMedia;
