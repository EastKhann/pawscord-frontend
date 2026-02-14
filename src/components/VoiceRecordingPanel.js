import { FaMicrophone, FaTimes, FaHashtag, FaCog, FaHistory } from 'react-icons/fa';
import './VoiceRecordingPanel.css';
import useVoiceRecording, { formatTime, formatDuration } from './VoiceRecordingPanel/useVoiceRecording';
import RecordView from './VoiceRecordingPanel/RecordView';
import RecordingsView from './VoiceRecordingPanel/RecordingsView';
import SettingsView from './VoiceRecordingPanel/SettingsView';

const VoiceRecordingPanel = ({ serverId, channelId, channelName, onClose }) => {
  const {
    activeTab, setActiveTab,
    isRecording, isPaused, recordingTime, audioLevel,
    recordings, currentRecording, setCurrentRecording,
    playingId, setPlayingId,
    settings, setSettings,
    startRecording, stopRecording, pauseRecording,
    saveRecording, deleteRecording, downloadRecording
  } = useVoiceRecording(serverId, channelId);

  return (
    <div className="voice-recording-overlay" onClick={(e) => e.target.className === 'voice-recording-overlay' && onClose()}>
      <div className="voice-recording-panel">
        <div className="panel-header">
          <h2><FaMicrophone /> Ses Kaydı</h2>
          <div className="channel-info"><FaHashtag /> {channelName || 'Sesli Kanal'}</div>
          <button className="close-btn" onClick={onClose}><FaTimes /></button>
        </div>

        <div className="tabs">
          <button className={`tab ${activeTab === 'record' ? 'active' : ''}`} onClick={() => setActiveTab('record')}>
            <FaMicrophone /> Kayıt
          </button>
          <button className={`tab ${activeTab === 'recordings' ? 'active' : ''}`} onClick={() => setActiveTab('recordings')}>
            <FaHistory /> Kayıtlar ({recordings.length})
          </button>
          <button className={`tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <FaCog /> Ayarlar
          </button>
        </div>

        <div className="panel-content">
          {activeTab === 'record' && (
            <RecordView
              isRecording={isRecording} isPaused={isPaused}
              recordingTime={recordingTime} audioLevel={audioLevel}
              currentRecording={currentRecording}
              onStart={startRecording} onStop={stopRecording} onPause={pauseRecording}
              onSave={saveRecording} onDiscard={() => setCurrentRecording(null)}
              formatTime={formatTime}
            />
          )}
          {activeTab === 'recordings' && (
            <RecordingsView
              recordings={recordings} playingId={playingId} setPlayingId={setPlayingId}
              onDownload={downloadRecording} onDelete={deleteRecording} formatDuration={formatDuration}
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

export default VoiceRecordingPanel;
