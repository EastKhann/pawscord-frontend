import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  FaPlay, FaPause, FaDownload, FaTrash,
  FaClock, FaUser, FaFileAudio, FaMicrophoneSlash,
  FaCloud, FaCheck
} from 'react-icons/fa';

const RecordingsView = ({ recordings, playingId, setPlayingId, onDownload, onDelete, formatDuration }) => {
  const { t } = useTranslation();

  const audioRef = useRef(null);

  const handlePlay = (recording) => {
    if (playingId === recording.id) {
      setPlayingId(null);
      if (audioRef.current) audioRef.current.pause();
    } else {
      setPlayingId(recording.id);
    }
  };

  if (recordings.length === 0) {
    return (
      <div aria-label={t('voiceRecording.recordingsView', 'Recordings')} className="empty-state">
        <FaMicrophoneSlash />
        <p>{t('not_yet_kayıt_yok')}</p>
      </div>
    );
  }

  return (
    <div className="recordings-view">
      <div className="recordings-list">
        {recordings.map(recording => (
          <div key={recording.id} className="recording-item">
            <div className="recording-icon"><FaFileAudio /></div>
            <div className="recording-info">
              <h4>{recording.name}</h4>
              <div className="recording-meta">
                <span><FaClock /> {formatDuration(recording.duration)}</span>
                <span><FaCloud /> {recording.size}</span>
                <span><FaUser /> {recording.creator}</span>
              </div>
              <span className="recording-date">
                {new Date(recording.created_at).toLocaleDateString('tr-TR')}
              </span>
            </div>
            {recording.has_transcript && (
              <span className="transcript-badge" title={t('transkript_mevcut')}>
                <FaCheck /> Transkript
              </span>
            )}
            <div className="recording-actions">
              <button onClick={() => handlePlay(recording)} title={t('oynat')}>
                {playingId === recording.id ? <FaPause /> : <FaPlay />}
              </button>
              <button onClick={() => onDownload(recording)} title={t('download')}><FaDownload /></button>
              <button onClick={() => onDelete(recording.id)} className="delete" title={t('delete')}><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </div >
  );
};

RecordingsView.propTypes = {
  recordings: PropTypes.bool,
  playingId: PropTypes.bool,
  setPlayingId: PropTypes.func,
  onDownload: PropTypes.func,
  onDelete: PropTypes.func,
  formatDuration: PropTypes.string,
};
export default RecordingsView;