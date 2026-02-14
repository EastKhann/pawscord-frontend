import { useState } from 'react';
import {
  FaMicrophone, FaPlay, FaPause, FaStop,
  FaTrash, FaFileAudio, FaCircle, FaSave
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const RecordView = ({
  isRecording, isPaused, recordingTime, audioLevel, currentRecording,
  onStart, onStop, onPause, onSave, onDiscard, formatTime
}) => {
  const [saveName, setSaveName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);

  const handleSave = () => {
    if (!saveName.trim()) { toast.error('Kayıt adı gerekli'); return; }
    onSave(saveName);
    setShowSaveModal(false);
    setSaveName('');
  };

  return (
    <div className="record-view">
      {!currentRecording ? (
        <>
          <div className="recording-visualizer">
            <div className="waveform">
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`bar ${isRecording ? 'active' : ''}`}
                  style={{ height: isRecording ? `${Math.random() * audioLevel + 10}%` : '10%', animationDelay: `${i * 0.05}s` }} />
              ))}
            </div>
          </div>

          <div className="recording-timer">
            <FaCircle className={`recording-indicator ${isRecording && !isPaused ? 'active' : ''}`} />
            <span className="time">{formatTime(recordingTime)}</span>
          </div>

          <div className="recording-controls">
            {!isRecording ? (
              <button className="record-btn" onClick={onStart}>
                <FaMicrophone /><span>Kayda Başla</span>
              </button>
            ) : (
              <>
                <button className="control-btn pause" onClick={onPause}>
                  {isPaused ? <FaPlay /> : <FaPause />}
                </button>
                <button className="control-btn stop" onClick={onStop}><FaStop /></button>
              </>
            )}
          </div>

          {isRecording && (
            <div className="recording-tips">
              <p>🎤 Kayıt devam ediyor...</p>
              <p>Durdurmak için STOP butonuna basın</p>
            </div>
          )}
        </>
      ) : (
        <div className="recording-preview">
          <div className="preview-icon"><FaFileAudio /></div>
          <h3>Kayıt Tamamlandı</h3>
          <p>Süre: {formatTime(currentRecording.duration)}</p>
          <audio src={currentRecording.url} controls className="audio-preview" />
          <div className="preview-actions">
            <button className="discard-btn" onClick={onDiscard}><FaTrash /> İptal</button>
            <button className="save-btn" onClick={() => setShowSaveModal(true)}><FaSave /> Kaydet</button>
          </div>
        </div>
      )}

      {showSaveModal && (
        <div className="save-modal-overlay" onClick={(e) => e.target.className === 'save-modal-overlay' && setShowSaveModal(false)}>
          <div className="save-modal">
            <h3>Kaydı Kaydet</h3>
            <input type="text" placeholder="Kayıt adı..." value={saveName}
              onChange={(e) => setSaveName(e.target.value)} autoFocus />
            <div className="modal-actions">
              <button onClick={() => setShowSaveModal(false)}>İptal</button>
              <button className="primary" onClick={handleSave}>Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordView;
