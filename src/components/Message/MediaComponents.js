import { memo, lazy, Suspense, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaDownload } from 'react-icons/fa';
import styles from './messageMediaStyles';

import PropTypes from 'prop-types';

const S = {
    mar: { marginLeft: '6px' },
    txt: { color: '#aaa' },
};

const flexStyle = (style) => ({
    minHeight: '200px',
    ...style,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
});
const sizeStyle = (minHeight) => ({ minHeight });

const VoiceMessagePlayer = lazy(() => import('../chat/VoiceMessagePlayer'));

export const LazyVideo = memo(({ src, style }) => {
    const { t } = useTranslation();
    const videoRef = useRef(null);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (videoRef.current) observer.observe(videoRef.current);
        return () => {
            if (videoRef.current) observer.unobserve(videoRef.current);
        };
    }, []);

    return (
        <div ref={videoRef} style={flexStyle(style)}>
            {shouldLoad ? (
                <video controls preload="metadata" src={src} style={style}>
                    <track kind="captions" />
                    Your browser does not support video playback.
                    <a href={src} download>
                        {t('download')}
                    </a>
                </video>
            ) : (
                <span style={S.txt}>{t('loading_video')}</span>
            )}
        </div>
    );
});
LazyVideo.displayName = 'LazyVideo';

export const LazyMount = memo(({ children, minHeight = 60 }) => {
    const ref = useRef(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShow(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} style={sizeStyle(minHeight)}>
            {show ? children : null}
        </div>
    );
});
LazyMount.displayName = 'LazyMount';

export const FileAttachment = memo(({ fileUrl, fileName, fileSize }) => {
    const { t } = useTranslation();
    const ext = (fileName || '').split('.').pop().toLowerCase();
    const fileExt = ext.toUpperCase();
    const fileSizeText = fileSize ? `(${(fileSize / 1024 / 1024).toFixed(2)} MB)` : '';

    const getFileIcon = () => {
        if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return '📦';
        if (ext === 'pdf') return '📄';
        if (['doc', 'docx'].includes(ext)) return '📝';
        if (['xls', 'xlsx'].includes(ext)) return '📊';
        if (['ppt', 'pptx'].includes(ext)) return '💽️';
        if (ext === 'txt') return '📃';
        return '📎';
    };

    return (
        <div style={styles.fileAttachment} className="file-attachment-hover">
            <div style={styles.fileIcon}>{getFileIcon()}</div>
            <div style={styles.fileInfo}>
                <div style={styles.fileName}>{fileName || 'File'}</div>
                <div style={styles.fileDetails}>
                    {fileExt} {fileSizeText}
                </div>
            </div>
            <a
                href={fileUrl}
                download={fileName}
                style={styles.downloadButton}
                className="download-button-hover"
                onClick={(e) => e.stopPropagation()}
            >
                <FaDownload size={18} />
                <span style={S.mar}>{t('download')}</span>
            </a>
        </div>
    );
});
FileAttachment.displayName = 'FileAttachment';

export const VoiceMessage = memo(
    ({ fileUrl, fileName, duration, transcription, isTranscribing, onTranscribe }) => (
        <Suspense fallback={<div style={styles.loadingMedia}>🎵 Loading audio...</div>}>
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
                {transcription && (
                    <div style={styles.voiceTranscription}>
                        <div style={styles.transcriptionIcon}>💬</div>
                        <div style={styles.transcriptionText}>{transcription}</div>
                    </div>
                )}
                {!transcription && !isTranscribing && (
                    <button
                        aria-label="on Transcribe"
                        onClick={onTranscribe}
                        style={styles.transcribeButton}
                    >
                        📝 Convert to text
                    </button>
                )}
                {isTranscribing && <div style={styles.transcribingLoader}>⏳ Converting...</div>}
            </div>
        </Suspense>
    )
);
VoiceMessage.displayName = 'VoiceMessage';

VoiceMessagePlayer.propTypes = {};
