import { useRef } from 'react';
import {
  FaPlay, FaPause, FaDownload, FaTrash,
  FaClock, FaUser, FaFileAudio, FaMicrophoneSlash,
  FaCloud, FaCheck
} from 'react-icons/fa';

const RecordingsView = ({ recordings, playingId, setPlayingId, onDownload, onDelete, formatDuration }) => {
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
      <div className="empty-state">
        <FaMicrophoneSlash />
        <p>Hen\u00fcz kay\u0131t yok</p>
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
              <span className="transcript-badge" title="Transkript mevcut">
                <FaCheck /> Transkript
              </span>
            )}
            <div className="recording-actions">
              <button onClick={() => handlePlay(recording)} title="Oynat">
                {playingId === recording.id ? <FaPause /> : <FaPlay />}
              </button>
              <button onClick={() => onDownload(recording)} title="\u0130ndir"><FaDownload /></button>
              <button onClick={() => onDelete(recording.id)} className="delete" title="Sil"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordingsView;
