import { FaPlay, FaPause, FaExpand, FaCompress, FaUsers, FaPlus, FaTimes, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import useWatchParty, { REACTION_EMOJIS, extractYouTubeId } from './useWatchParty';
import './WatchTogether.css';

const WatchTogether = ({ roomId, onClose }) => {
  const w = useWatchParty(roomId, onClose);

  if (!w.party) {
    return (
      <div className="watch-together-container">
        <div className="watch-together-empty">
          <h2>{'\uD83D\uDCFA'} Watch Together</h2>
          <p>Arkada\u015flar\u0131nla birlikte video izle!</p>
          <button className="create-party-btn" onClick={() => w.setShowCreateModal(true)}>
            <FaPlus /> Yeni Watch Party Olu\u015ftur
          </button>
          <div className="supported-platforms">
            <span>Desteklenen platformlar:</span>
            <div className="platforms"><span>YouTube</span><span>Twitch</span><span>Vimeo</span><span>Dailymotion</span></div>
          </div>
        </div>
        {w.showCreateModal && (
          <div className="watch-modal-overlay" onClick={() => w.setShowCreateModal(false)}>
            <div className="watch-modal" onClick={e => e.stopPropagation()}>
              <h3>{'\uD83C\uDFAC'} Watch Party Olu\u015ftur</h3>
              <input type="url" placeholder="Video URL'sini yap\u0131\u015ft\u0131r..." value={w.videoUrl} onChange={e => w.setVideoUrl(e.target.value)} autoFocus />
              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => w.setShowCreateModal(false)}>\u0130ptal</button>
                <button className="create-btn" onClick={w.createWatchParty} disabled={w.isLoading}>{w.isLoading ? 'Olu\u015fturuluyor...' : 'Olu\u015ftur'}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="watch-together-container" ref={w.containerRef}>
      {/* Header */}
      <div className="watch-header">
        <div className="watch-title">
          <span className="live-badge">CANLI</span>
          <h3>{w.party.video_title || 'Watch Party'}</h3>
        </div>
        <div className="watch-viewers"><FaUsers /><span>{w.viewers.length} izleyici</span></div>
        <button className="close-btn" onClick={onClose}><FaTimes /></button>
      </div>

      {/* Video Player */}
      <div className="watch-player">
        {w.party.video_source === 'youtube' && (
          <iframe ref={w.playerRef} src={`https://www.youtube.com/embed/${extractYouTubeId(w.party.video_url)}?autoplay=${w.isPlaying ? 1 : 0}&start=${Math.floor(w.currentTime)}&enablejsapi=1`} title="Watch Party" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        )}
        {w.party.video_source === 'direct' && (
          <video ref={w.playerRef} src={w.party.video_url} autoPlay={w.isPlaying} muted={w.isMuted} />
        )}
        <div className="reaction-overlay">
          {w.reactions.map(r => <div key={r.id} className="floating-reaction" style={{ left: `${Math.random() * 80 + 10}%` }}>{r.emoji}</div>)}
        </div>
      </div>

      {/* Controls */}
      <div className="watch-controls">
        <div className="control-left">
          {w.isHost && <button onClick={w.togglePlay}>{w.isPlaying ? <FaPause /> : <FaPlay />}</button>}
          <button onClick={() => w.setIsMuted(!w.isMuted)}>{w.isMuted ? <FaVolumeMute /> : <FaVolumeUp />}</button>
        </div>
        <div className="reactions-bar">
          {REACTION_EMOJIS.map(emoji => <button key={emoji} className="reaction-btn" onClick={() => w.sendReaction(emoji)}>{emoji}</button>)}
        </div>
        <div className="control-right">
          <button onClick={() => w.setShowChat(!w.showChat)}>{'\uD83D\uDCAC'}</button>
          <button onClick={w.toggleFullscreen}>{w.isFullscreen ? <FaCompress /> : <FaExpand />}</button>
          {w.isHost && <button className="end-btn" onClick={w.endParty}>Bitir</button>}
        </div>
      </div>

      {/* Chat Sidebar */}
      {w.showChat && (
        <div className="watch-chat">
          <div className="chat-messages">
            {w.messages.map((msg, idx) => (
              <div key={idx} className="chat-message">
                <img src={msg.avatar || '/default-avatar.png'} alt={msg.user} className="chat-avatar" />
                <div className="chat-content"><span className="chat-user">{msg.user}</span><span className="chat-text">{msg.content}</span></div>
              </div>
            ))}
            <div ref={w.chatEndRef} />
          </div>
          <div className="chat-input">
            <input type="text" placeholder="Mesaj yaz..." value={w.newMessage} onChange={e => w.setNewMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && w.sendMessage()} />
            <button onClick={w.sendMessage}>G\u00f6nder</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchTogether;
