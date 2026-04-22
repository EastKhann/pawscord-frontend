import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaMicrophone, FaTimes, FaHashtag, FaCog, FaHistory } from 'react-icons/fa';
import './VoiceRecordingPanel.css';
import useVoiceRecording, {
    formatTime,
    formatDuration,
} from '../VoiceRecordingPanel/useVoiceRecording';
import RecordView from '../VoiceRecordingPanel/RecordView';
import RecordingsView from '../VoiceRecordingPanel/RecordingsView';
import SettingsView from '../VoiceRecordingPanel/SettingsView';
import { useTranslation } from 'react-i18next';

const VoiceRecordingPanel = ({ serverId, channelId, channelName, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const {
        activeTab,
        setActiveTab,
        isRecording,
        isPaused,
        recordingTime,
        audioLevel,
        recordings,
        currentRecording,
        setCurrentRecording,
        playingId,
        setPlayingId,
        settings,
        setSettings,
        startRecording,
        stopRecording,
        pauseRecording,
        saveRecording,
        deleteRecording,
        downloadRecording,
    } = useVoiceRecording(serverId, channelId);

    return (
        <div
            className="voice-recording-overlay"
            role="button"
            tabIndex={0}
            onClick={(e) => e.target.className === 'voice-recording-overlay' && onClose()}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div className="voice-recording-panel">
                <div className="panel-header">
                    <h2>
                        <FaMicrophone /> {t('features.voiceRecording')}
                    </h2>
                    <div className="channel-info">
                        <FaHashtag /> {channelName || t('server.voiceChannel')}
                    </div>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="tabs">
                    <button
                        aria-label={t('voiceRec.recordTab', 'Record')}
                        className={`tab ${activeTab === 'record' ? 'active' : ''}`}
                        onClick={() => setActiveTab('record')}
                    >
                        <FaMicrophone /> {t('ui.record_tab')}
                    </button>
                    <button
                        aria-label={t('voiceRec.recordingsTab', 'Recordings')}
                        className={`tab ${activeTab === 'recordings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('recordings')}
                    >
                        <FaHistory /> {t('ui.recordings_tab')} ({recordings.length})
                    </button>
                    <button
                        aria-label={t('voiceRec.settingsTab', 'Settings')}
                        className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        <FaCog /> {t('common.settings')}
                    </button>
                </div>

                <div className="panel-content">
                    {activeTab === 'record' && (
                        <RecordView
                            isRecording={isRecording}
                            isPaused={isPaused}
                            recordingTime={recordingTime}
                            audioLevel={audioLevel}
                            currentRecording={currentRecording}
                            onStart={startRecording}
                            onStop={stopRecording}
                            onPause={pauseRecording}
                            onSave={saveRecording}
                            onDiscard={() => setCurrentRecording(null)}
                            formatTime={formatTime}
                        />
                    )}
                    {activeTab === 'recordings' && (
                        <RecordingsView
                            recordings={recordings}
                            playingId={playingId}
                            setPlayingId={setPlayingId}
                            onDownload={downloadRecording}
                            onDelete={deleteRecording}
                            formatDuration={formatDuration}
                        />
                    )}
                    {activeTab === 'settings' && (
                        <SettingsView settings={settings} setSettings={setSettings} />
                    )}
                </div>
            </div>
        </div>
    );
};

VoiceRecordingPanel.propTypes = {
    serverId: PropTypes.string,
    channelId: PropTypes.string,
    channelName: PropTypes.string,
    onClose: PropTypes.func,
};
export default VoiceRecordingPanel;
