/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// frontend/src/components/Message/MessageMedia.js
// Decomposed: MediaComponents + GalleryGrid + messageMediaStyles
import { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './messageMediaStyles';
import { LazyVideo, LazyMount, FileAttachment, VoiceMessage } from './MediaComponents';
import { GalleryGrid } from './GalleryGrid';

export { LazyVideo, LazyMount, FileAttachment, VoiceMessage };

export const MessageMedia = memo(
    ({
        msg,
        finalImageUrl,
        finalFileUrl,
        onImageClick,
        onContentLoad,
        transcription,
        isTranscribing,
        onTranscribe,
        galleryGroup,
        absoluteHostUrl,
    }) => {
        const ext = (msg.file_name || '').split('.').pop().toLowerCase();
        const fileName = (msg.file_name || '').toLowerCase();

        if (galleryGroup && galleryGroup.length > 1) {
            return (
                <GalleryGrid
                    galleryGroup={galleryGroup}
                    onImageClick={onImageClick}
                    onContentLoad={onContentLoad}
                    absoluteHostUrl={absoluteHostUrl}
                />
            );
        }

        if (finalImageUrl) {
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
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

        if (finalFileUrl) {
            if (
                (fileName.startsWith('voice_') || fileName.startsWith('voice-')) &&
                ext === 'webm'
            ) {
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
            if (
                ['mp4', 'mov', 'mkv'].includes(ext) ||
                (ext === 'webm' && !fileName.startsWith('voice_') && !fileName.startsWith('voice-'))
            ) {
                return <LazyVideo src={finalFileUrl} style={styles.messageVideo} />;
            }
            if (['mp3', 'wav', 'ogg'].includes(ext)) {
                return (
                    <VoiceMessage
                        fileUrl={finalFileUrl}
                        fileName={msg.file_name}
                        duration={0}
                        transcription={null}
                        isTranscribing={false}
                        onTranscribe={() => {}}
                    />
                );
            }
            return (
                <FileAttachment
                    fileUrl={finalFileUrl}
                    fileName={msg.file_name}
                    fileSize={msg.file_size}
                />
            );
        }

        return null;
    }
);

MessageMedia.displayName = 'MessageMedia';
MessageMedia.propTypes = {
    msg: PropTypes.object,
    finalImageUrl: PropTypes.string,
    finalFileUrl: PropTypes.string,
    onImageClick: PropTypes.func,
    onContentLoad: PropTypes.func,
    transcription: PropTypes.object,
    isTranscribing: PropTypes.bool,
    onTranscribe: PropTypes.func,
    galleryGroup: PropTypes.object,
    absoluteHostUrl: PropTypes.string,
};
export default MessageMedia;
