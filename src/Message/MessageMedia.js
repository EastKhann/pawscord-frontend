import React, { Suspense, lazy, useMemo } from 'react';
import { FaDownload, FaChartLine } from 'react-icons/fa';
import styles from './styles';
import { LazyVideo, LazyMount } from './components';
import { isCodeFile } from '../components/FileCodePreview';

const LinkPreview = lazy(() => import('../LinkPreview'));
const VoiceMessagePlayer = lazy(() => import('../components/VoiceMessagePlayer'));
const FileCodePreview = lazy(() => import('../components/FileCodePreview'));

const MessageMedia = ({
    msg, displayContent, signalCoin, onShowChart,
    finalImageUrl, finalFileUrl, fullFileUrl,
    onImageClick, onContentLoad,
    localTranscription, localIsTranscribing, handleTranscribe,
    handleVote, fetchWithAuth, absoluteHostUrl
}) => {
    return (
        <>
            {/* Signal Button */}
            {signalCoin && (
                <button onClick={() => onShowChart(signalCoin)} style={styles.chartBtn}>
                    <FaChartLine /> {signalCoin} Grafiği
                </button>
            )}

            {/* Link Preview */}
            {msg.link_preview_data && (
                <LazyMount minHeight={80}>
                    <Suspense fallback={null}><LinkPreview data={msg.link_preview_data} /></Suspense>
                </LazyMount>
            )}

            {/* Poll */}
            {msg.poll && (
                <div style={styles.pollContainer}>
                    <h4 style={{ marginTop: 0, marginBottom: 10 }}>{msg.poll.question}</h4>
                    <div style={{ fontSize: '0.8em', color: '#b9bbbe', marginBottom: 8 }}>
                        {msg.poll.allow_multiple_votes ? 'Çoklu Seçim' : 'Tek Seçim'} • {msg.poll.total_votes || 0} Oy
                    </div>
                    {msg.poll.options.map(opt => {
                        const voted = opt.is_voted;
                        const total = msg.poll.total_votes || 0;
                        const percent = total > 0 ? Math.round((opt.vote_count / total) * 100) : 0;
                        return (
                            <div key={opt.id} style={{ position: 'relative', marginBottom: 6 }}>
                                <button onClick={() => handleVote(opt.id)} style={{
                                    ...styles.pollOption,
                                    backgroundColor: voted ? '#4752c4' : 'rgba(255,255,255,0.05)',
                                    border: voted ? '1px solid #5865f2' : '1px solid transparent',
                                    justifyContent: 'space-between', display: 'flex', alignItems: 'center',
                                    position: 'relative', zIndex: 2, width: '100%', overflow: 'hidden', padding: '10px 12px'
                                }}>
                                    <span style={{ zIndex: 3, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{opt.text}</span>
                                    <span style={{ zIndex: 3, fontWeight: 'bold' }}>{opt.vote_count} ({percent}%)</span>
                                    <div style={{
                                        position: 'absolute', top: 0, left: 0, bottom: 0, width: `${percent}%`,
                                        backgroundColor: voted ? 'rgba(255,255,255,0.2)' : 'rgba(88, 101, 242, 0.3)',
                                        zIndex: 1, transition: 'width 0.3s ease'
                                    }} />
                                </button>
                            </div>
                        );
                    })}
                    {msg.poll.expires_at && <div style={{ fontSize: '0.75em', color: '#72767d', marginTop: 5 }}>Bitiş: {new Date(msg.poll.expires_at).toLocaleString()}</div>}
                </div>
            )}

            {/* Image */}
            {finalImageUrl && (
                <img src={finalImageUrl} alt="attachment" style={styles.messageImage}
                    onClick={() => onImageClick(finalImageUrl)} loading="lazy" onLoad={onContentLoad} />
            )}

            {/* Voice Message */}
            {msg.is_voice_message && fullFileUrl && (
                <Suspense fallback={<div style={{ padding: '12px', color: '#72767d', fontSize: '13px' }}>🎵 Ses yükleniyor...</div>}>
                    <div>
                        <VoiceMessagePlayer
                            audioUrl={fullFileUrl}
                            duration={msg.voice_duration || 0}
                            onDownload={() => { const a = document.createElement('a'); a.href = fullFileUrl; a.download = msg.file_name || `voice-${Date.now()}.webm`; a.click(); }}
                        />
                        {localTranscription && (
                            <div style={styles.voiceTranscription}>
                                <div style={styles.transcriptionIcon}>💬</div>
                                <div style={styles.transcriptionText}>{localTranscription}</div>
                            </div>
                        )}
                        {!localTranscription && !localIsTranscribing && (
                            <button onClick={handleTranscribe} style={styles.transcribeButton}>📝 Metne Çevir</button>
                        )}
                        {localIsTranscribing && <div style={styles.transcribingLoader}>⏳ Çevriliyor...</div>}
                    </div>
                </Suspense>
            )}

            {/* Video / General File */}
            {finalFileUrl && !msg.is_voice_message && (() => {
                const ext = (msg.file_name || '').split('.').pop().toLowerCase();
                const fileName = (msg.file_name || '').toLowerCase();

                if ((fileName.startsWith('voice_') || fileName.startsWith('voice-')) && ext === 'webm') {
                    return (
                        <Suspense fallback={null}>
                            <VoiceMessagePlayer audioUrl={finalFileUrl} duration={msg.voice_duration || 0}
                                onDownload={() => { const a = document.createElement('a'); a.href = finalFileUrl; a.download = msg.file_name || `voice-${Date.now()}.webm`; a.click(); }} />
                        </Suspense>
                    );
                }
                if (['mp4', 'mov', 'mkv'].includes(ext) || (ext === 'webm' && !fileName.startsWith('voice_') && !fileName.startsWith('voice-'))) {
                    return <LazyVideo src={finalFileUrl} style={styles.messageVideo} />;
                }
                if (['mp3', 'wav', 'ogg'].includes(ext)) {
                    return (
                        <Suspense fallback={null}>
                            <VoiceMessagePlayer audioUrl={finalFileUrl} duration={0}
                                onDownload={() => { const a = document.createElement('a'); a.href = finalFileUrl; a.download = msg.file_name || `audio-${Date.now()}.${ext}`; a.click(); }} />
                        </Suspense>
                    );
                }
                if (isCodeFile(msg.file_name)) {
                    return (
                        <Suspense fallback={
                            <div style={styles.fileAttachment} className="file-attachment-hover">
                                <div style={styles.fileIcon}>📄</div>
                                <div style={styles.fileInfo}><div style={styles.fileName}>{msg.file_name}</div><div style={styles.fileDetails}>Yükleniyor...</div></div>
                            </div>
                        }>
                            <FileCodePreview fileUrl={finalFileUrl} fileName={msg.file_name} fileSize={msg.file_size} />
                        </Suspense>
                    );
                }

                const fileExt = ext.toUpperCase();
                const fileSize = msg.file_size ? `(${(msg.file_size / 1024 / 1024).toFixed(2)} MB)` : '';
                return (
                    <div style={styles.fileAttachment} className="file-attachment-hover">
                        <div style={styles.fileIcon}>
                            {['zip', 'rar', '7z', 'tar', 'gz'].includes(ext) ? '📦' :
                                ['pdf'].includes(ext) ? '📄' : ['doc', 'docx'].includes(ext) ? '📝' :
                                ['xls', 'xlsx'].includes(ext) ? '📊' : ['ppt', 'pptx'].includes(ext) ? '📽️' :
                                ['txt'].includes(ext) ? '📃' : '📎'}
                        </div>
                        <div style={styles.fileInfo}>
                            <div style={styles.fileName}>{msg.file_name || 'Dosya'}</div>
                            <div style={styles.fileDetails}>{fileExt} {fileSize}</div>
                        </div>
                        <a href={finalFileUrl} download={msg.file_name} style={styles.downloadButton}
                            className="download-button-hover" onClick={(e) => e.stopPropagation()}>
                            <FaDownload size={18} /><span style={{ marginLeft: '6px' }}>İndir</span>
                        </a>
                    </div>
                );
            })()}
        </>
    );
};

export default MessageMedia;
