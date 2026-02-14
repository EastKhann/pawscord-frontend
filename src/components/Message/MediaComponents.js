import { memo, lazy, Suspense, useState, useEffect, useRef } from 'react';
import { FaDownload } from 'react-icons/fa';
import styles from './messageMediaStyles';

const VoiceMessagePlayer = lazy(() => import('../VoiceMessagePlayer'));

export const LazyVideo = memo(({ src, style }) => {
    const videoRef = useRef(null);
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setShouldLoad(true); observer.disconnect(); }
        }, { threshold: 0.2 });
        if (videoRef.current) observer.observe(videoRef.current);
        return () => { if (videoRef.current) observer.unobserve(videoRef.current); };
    }, []);

    return (
        <div ref={videoRef} style={{ minHeight: '200px', ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
            {shouldLoad ? (
                <video controls preload="metadata" src={src} style={style}>
                    Taray{'\u0131'}c{'\u0131'}n{'\u0131'}z video oynatmay{'\u0131'} desteklemiyor.
                    <a href={src} download>{'\u0130'}ndir</a>
                </video>
            ) : (
                <span style={{ color: '#aaa' }}>Video Y{'\u00FC'}kleniyor...</span>
            )}
        </div>
    );
});
LazyVideo.displayName = 'LazyVideo';

export const LazyMount = memo(({ children, minHeight = 60 }) => {
    const ref = useRef(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setShow(true); observer.disconnect(); }
        }, { threshold: 0.1 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return <div ref={ref} style={{ minHeight }}>{show ? children : null}</div>;
});
LazyMount.displayName = 'LazyMount';

export const FileAttachment = memo(({ fileUrl, fileName, fileSize }) => {
    const ext = (fileName || '').split('.').pop().toLowerCase();
    const fileExt = ext.toUpperCase();
    const fileSizeText = fileSize ? `(${(fileSize / 1024 / 1024).toFixed(2)} MB)` : '';

    const getFileIcon = () => {
        if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return '\uD83D\uDCE6';
        if (ext === 'pdf') return '\uD83D\uDCC4';
        if (['doc', 'docx'].includes(ext)) return '\uD83D\uDCDD';
        if (['xls', 'xlsx'].includes(ext)) return '\uD83D\uDCCA';
        if (['ppt', 'pptx'].includes(ext)) return '\uD83D\uDCBD\uFE0F';
        if (ext === 'txt') return '\uD83D\uDCC3';
        return '\uD83D\uDCCE';
    };

    return (
        <div style={styles.fileAttachment} className="file-attachment-hover">
            <div style={styles.fileIcon}>{getFileIcon()}</div>
            <div style={styles.fileInfo}>
                <div style={styles.fileName}>{fileName || 'Dosya'}</div>
                <div style={styles.fileDetails}>{fileExt} {fileSizeText}</div>
            </div>
            <a href={fileUrl} download={fileName} style={styles.downloadButton} className="download-button-hover" onClick={e => e.stopPropagation()}>
                <FaDownload size={18} />
                <span style={{ marginLeft: '6px' }}>{'\u0130'}ndir</span>
            </a>
        </div>
    );
});
FileAttachment.displayName = 'FileAttachment';

export const VoiceMessage = memo(({ fileUrl, fileName, duration, transcription, isTranscribing, onTranscribe }) => (
    <Suspense fallback={<div style={styles.loadingMedia}>{'\uD83C\uDFB5'} Ses y{'\u00FC'}kleniyor...</div>}>
        <div>
            <VoiceMessagePlayer
                audioUrl={fileUrl}
                duration={duration || 0}
                onDownload={() => { const a = document.createElement('a'); a.href = fileUrl; a.download = fileName || `voice-${Date.now()}.webm`; a.click(); }}
            />
            {transcription && (
                <div style={styles.voiceTranscription}>
                    <div style={styles.transcriptionIcon}>{'\uD83D\uDCAC'}</div>
                    <div style={styles.transcriptionText}>{transcription}</div>
                </div>
            )}
            {!transcription && !isTranscribing && (
                <button onClick={onTranscribe} style={styles.transcribeButton}>{'\uD83D\uDCDD'} Metne {'\u00C7'}evir</button>
            )}
            {isTranscribing && <div style={styles.transcribingLoader}>{'\u23F3'} {'\u00C7'}evriliyor...</div>}
        </div>
    </Suspense>
));
VoiceMessage.displayName = 'VoiceMessage';
