import React, { useState, useEffect, useRef } from 'react';
import './WatchTogetherPanel.css';

/**
 * WatchTogetherPanel Component
 * Synchronized video watching with friends
 * @component
 */
const WatchTogetherPanel = ({ roomId, currentUser, onClose }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState('');

  const playerRef = useRef(null);
  const wsRef = useRef(null);
  const syncTimeoutRef = useRef(null);

  useEffect(() => {
    fetchWatchParty();
    setupWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, [roomId]);

  /**
   * Fetch current watch party status
   */
  const fetchWatchParty = async () => {
    try {
      const response = await fetch(`/api/adv/watch-together/${roomId}/`, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.active) {
          setIsActive(true);
          setCurrentVideo(data.video);
          setParticipants(data.participants || []);
          setIsHost(data.host_id === currentUser?.id);
          loadVideo(data.video.url);
        }
      }
    } catch (err) {
      console.error('Failed to fetch watch party:', err);
    }
  };

  /**
   * Setup WebSocket for real-time sync
   */
  const setupWebSocket = () => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/watch-together/${roomId}/`;

    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {
      console.log('Watch Together WebSocket connected');
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleWebSocketMessage(data);
    };

    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      showToast('Connection error', 'error');
    };

    wsRef.current.onclose = () => {
      console.log('Watch Together WebSocket disconnected');
    };
  };

  /**
   * Handle WebSocket messages
   */
  const handleWebSocketMessage = (data) => {
    switch (data.type) {
      case 'play':
        if (playerRef.current && !isHost) {
          playerRef.current.play();
        }
        break;

      case 'pause':
        if (playerRef.current && !isHost) {
          playerRef.current.pause();
        }
        break;

      case 'seek':
        if (playerRef.current && !isHost) {
          playerRef.current.currentTime = data.time;
        }
        break;

      case 'sync':
        if (playerRef.current && !isHost) {
          const drift = Math.abs(playerRef.current.currentTime - data.time);
          if (drift > 2) { // Sync if drift > 2 seconds
            playerRef.current.currentTime = data.time;
          }
        }
        break;

      case 'participant_joined':
        setParticipants(prev => [...prev, data.participant]);
        showToast(`${data.participant.username} joined`, 'info');
        break;

      case 'participant_left':
        setParticipants(prev => prev.filter(p => p.id !== data.participant_id));
        showToast(`${data.participant.username} left`, 'info');
        break;

      case 'chat':
        setMessages(prev => [...prev, data.message]);
        break;

      default:
        break;
    }
  };

  /**
   * Start watch party
   */
  const startWatchParty = async () => {
    if (!videoUrl.trim()) {
      setError('Please enter a video URL');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/adv/watch-together/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          room_id: roomId,
          video_url: videoUrl
        })
      });

      if (response.ok) {
        const data = await response.json();
        setIsActive(true);
        setCurrentVideo(data.video);
        setIsHost(true);
        loadVideo(data.video.url);
        showToast('Watch party started!', 'success');
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to start watch party');
      }
    } catch (err) {
      console.error('Error starting watch party:', err);
      setError(err.message);
      showToast(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Load video into player
   */
  const loadVideo = (url) => {
    if (isYouTubeUrl(url)) {
      loadYouTubeVideo(url);
    } else if (isTwitchUrl(url)) {
      loadTwitchVideo(url);
    } else {
      loadDirectVideo(url);
    }
  };

  /**
   * Check if URL is YouTube
   */
  const isYouTubeUrl = (url) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  /**
   * Check if URL is Twitch
   */
  const isTwitchUrl = (url) => {
    return url.includes('twitch.tv');
  };

  /**
   * Extract YouTube video ID
   */
  const getYouTubeVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
  };

  /**
   * Load YouTube video
   */
  const loadYouTubeVideo = (url) => {
    const videoId = getYouTubeVideoId(url);
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
      document.getElementById('video-container').innerHTML =
        `<iframe id="video-player" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
    }
  };

  /**
   * Load Twitch video
   */
  const loadTwitchVideo = (url) => {
    const channel = url.split('twitch.tv/')[1]?.split('/')[0];
    if (channel) {
      const embedUrl = `https://player.twitch.tv/?channel=${channel}&parent=${window.location.hostname}`;
      document.getElementById('video-container').innerHTML =
        `<iframe id="video-player" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
    }
  };

  /**
   * Load direct video URL
   */
  const loadDirectVideo = (url) => {
    // 🛡️ XSS Protection - Sanitize URL and only allow video extensions
    const allowedExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    const urlLower = url.toLowerCase();
    const isValidVideo = allowedExtensions.some(ext => urlLower.includes(ext));

    if (!isValidVideo) {
      console.warn('Invalid video URL blocked:', url);
      return;
    }

    // Sanitize URL - remove any potential script injection
    const sanitizedUrl = url.replace(/[<>"']/g, '');

    const container = document.getElementById('video-container');
    container.innerHTML = '';
    const video = document.createElement('video');
    video.id = 'video-player';
    video.src = sanitizedUrl;
    video.controls = true;
    container.appendChild(video);

    playerRef.current = document.getElementById('video-player');
    attachVideoEvents();
  };

  /**
   * Attach video player events
   */
  const attachVideoEvents = () => {
    if (!playerRef.current || !isHost) return;

    playerRef.current.addEventListener('play', () => {
      sendSync('play');
    });

    playerRef.current.addEventListener('pause', () => {
      sendSync('pause');
    });

    playerRef.current.addEventListener('seeked', () => {
      sendSync('seek', { time: playerRef.current.currentTime });
    });

    // Periodic sync
    setInterval(() => {
      if (isHost && playerRef.current) {
        sendSync('sync', { time: playerRef.current.currentTime });
      }
    }, 5000);
  };

  /**
   * Send sync command via WebSocket
   */
  const sendSync = (type, data = {}) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type,
        ...data
      }));
    }
  };

  /**
   * Stop watch party
   */
  const stopWatchParty = async () => {
    if (!window.confirm('Stop watch party for everyone?')) return;

    try {
      const response = await fetch(`/api/adv/watch-together/${roomId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setIsActive(false);
        setCurrentVideo(null);
        setVideoUrl('');
        showToast('Watch party stopped', 'success');
      }
    } catch (err) {
      console.error('Error stopping watch party:', err);
      showToast('Failed to stop watch party', 'error');
    }
  };

  /**
   * Send chat message
   */
  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;

    sendSync('chat', {
      message: {
        user: currentUser.username,
        text: chatMessage,
        timestamp: new Date().toISOString()
      }
    });

    setChatMessage('');
  };

  /**
   * Show toast notification
   */
  const showToast = (message, type) => {
    console.log(`[${type}] ${message}`);
  };

  return (
    <div className="watch-together-panel">
      <div className="panel-header">
        <h2>
          <i className="fas fa-tv"></i>
          Watch Together
        </h2>
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="panel-content">
        {!isActive ? (
          <div className="start-section">
            <div className="url-input-container">
              <input
                type="text"
                className="url-input"
                placeholder="Enter YouTube or Twitch URL..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && startWatchParty()}
              />
              <button
                className="btn-start"
                onClick={startWatchParty}
                disabled={isLoading}
              >
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-play"></i>
                )}
                Start Party
              </button>
            </div>

            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-triangle"></i>
                {error}
              </div>
            )}

            <div className="info-section">
              <h3>Supported Platforms</h3>
              <div className="platforms">
                <div className="platform">
                  <i className="fab fa-youtube"></i>
                  <span>YouTube</span>
                </div>
                <div className="platform">
                  <i className="fab fa-twitch"></i>
                  <span>Twitch</span>
                </div>
                <div className="platform">
                  <i className="fas fa-link"></i>
                  <span>Direct URLs</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="active-party">
            <div className="video-section">
              <div id="video-container" className="video-container">
                {/* Video player will be injected here */}
              </div>

              {isHost && (
                <button className="btn-stop-party" onClick={stopWatchParty}>
                  <i className="fas fa-stop"></i>
                  Stop Party
                </button>
              )}
            </div>

            <div className="sidebar">
              {/* Participants */}
              <div className="participants-section">
                <h3>
                  <i className="fas fa-users"></i>
                  Watching ({participants.length})
                </h3>
                <div className="participants-list">
                  {participants.map((participant) => (
                    <div key={participant.id} className="participant">
                      <div className="participant-avatar">
                        {participant.avatar ? (
                          <img src={participant.avatar} alt={participant.username} />
                        ) : (
                          <i className="fas fa-user"></i>
                        )}
                      </div>
                      <div className="participant-info">
                        <span className="participant-name">
                          {participant.username}
                          {participant.id === currentVideo?.host_id && (
                            <span className="host-badge">HOST</span>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat */}
              <div className="chat-section">
                <h3>
                  <i className="fas fa-comments"></i>
                  Chat
                </h3>
                <div className="chat-messages">
                  {messages.map((msg, index) => (
                    <div key={index} className="chat-message">
                      <span className="message-user">{msg.user}:</span>
                      <span className="message-text">{msg.text}</span>
                    </div>
                  ))}
                </div>
                <div className="chat-input-container">
                  <input
                    type="text"
                    className="chat-input"
                    placeholder="Type a message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  />
                  <button className="btn-send" onClick={sendChatMessage}>
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchTogetherPanel;
