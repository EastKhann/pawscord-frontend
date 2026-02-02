import React, { useState, useRef, useEffect } from 'react';
import './ScreenRecordingPanel.css';

/**
 * ScreenRecordingPanel Component
 * Premium feature for screen recording with download capability
 * @component
 */
const ScreenRecordingPanel = ({ onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordings, setRecordings] = useState([]);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchRecordings();
    return () => {
      stopRecording();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, isPaused]);

  /**
   * Fetch existing recordings from server
   */
  const fetchRecordings = async () => {
    try {
      const response = await fetch('/api/adv/screen-recording/', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setRecordings(data.recordings || []);
      }
    } catch (err) {
      console.error('Failed to fetch recordings:', err);
    }
  };

  /**
   * Start screen recording
   */
  const startRecording = async () => {
    try {
      setError(null);
      
      // Request screen capture
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: 'always',
          displaySurface: 'monitor'
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true
        }
      });

      streamRef.current = stream;
      chunksRef.current = [];

      // Create MediaRecorder
      const options = { mimeType: 'video/webm;codecs=vp9' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options.mimeType = 'video/webm';
      }

      mediaRecorderRef.current = new MediaRecorder(stream, options);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = handleRecordingStop;

      mediaRecorderRef.current.start(1000); // Collect data every second
      setIsRecording(true);
      setRecordingTime(0);

      // Handle user stopping share
      stream.getVideoTracks()[0].addEventListener('ended', () => {
        stopRecording();
      });

      showToast('Screen recording started', 'success');
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Failed to start recording. Please grant screen sharing permission.');
      showToast('Failed to start recording', 'error');
    }
  };

  /**
   * Stop screen recording
   */
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  /**
   * Pause/Resume recording
   */
  const togglePause = () => {
    if (mediaRecorderRef.current) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  /**
   * Handle recording stop and upload
   */
  const handleRecordingStop = async () => {
    setIsProcessing(true);
    
    const blob = new Blob(chunksRef.current, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);

    // Upload to server
    const formData = new FormData();
    formData.append('recording', blob, `recording_${Date.now()}.webm`);
    formData.append('duration', recordingTime);

    try {
      const response = await fetch('/api/adv/screen-recording/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        showToast('Recording saved successfully', 'success');
        fetchRecordings();
      } else {
        throw new Error('Upload failed');
      }
    } catch (err) {
      console.error('Error uploading recording:', err);
      showToast('Failed to save recording', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Download recording
   */
  const downloadRecording = (recording) => {
    const a = document.createElement('a');
    a.href = recording.url;
    a.download = recording.filename || 'recording.webm';
    a.click();
  };

  /**
   * Delete recording
   */
  const deleteRecording = async (recordingId) => {
    if (!window.confirm('Delete this recording?')) return;

    try {
      const response = await fetch(`/api/adv/screen-recording/${recordingId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        showToast('Recording deleted', 'success');
        fetchRecordings();
      }
    } catch (err) {
      console.error('Error deleting recording:', err);
      showToast('Failed to delete recording', 'error');
    }
  };

  /**
   * Format time to MM:SS
   */
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  /**
   * Show toast notification
   */
  const showToast = (message, type) => {
    // Implement toast notification
    console.log(`[${type}] ${message}`);
  };

  return (
    <div className="screen-recording-panel">
      <div className="panel-header">
        <h2>
          <i className="fas fa-desktop"></i>
          Screen Recording
          <span className="premium-badge">PREMIUM</span>
        </h2>
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="panel-content">
        {/* Recording Controls */}
        <div className="recording-controls">
          {!isRecording ? (
            <button 
              className="btn-start-recording"
              onClick={startRecording}
              disabled={isProcessing}
            >
              <i className="fas fa-circle"></i>
              Start Recording
            </button>
          ) : (
            <div className="active-recording">
              <div className="recording-indicator">
                <span className="red-dot"></span>
                <span className="time">{formatTime(recordingTime)}</span>
              </div>
              
              <div className="control-buttons">
                <button 
                  className="btn-pause"
                  onClick={togglePause}
                >
                  <i className={`fas fa-${isPaused ? 'play' : 'pause'}`}></i>
                  {isPaused ? 'Resume' : 'Pause'}
                </button>
                
                <button 
                  className="btn-stop"
                  onClick={stopRecording}
                >
                  <i className="fas fa-stop"></i>
                  Stop Recording
                </button>
              </div>
            </div>
          )}

          {isProcessing && (
            <div className="processing-indicator">
              <i className="fas fa-spinner fa-spin"></i>
              Processing recording...
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-triangle"></i>
            {error}
          </div>
        )}

        {/* Preview */}
        {previewUrl && (
          <div className="preview-section">
            <h3>Preview</h3>
            <video 
              src={previewUrl} 
              controls 
              className="preview-video"
            />
          </div>
        )}

        {/* Recordings List */}
        <div className="recordings-list">
          <h3>
            <i className="fas fa-folder"></i>
            My Recordings ({recordings.length})
          </h3>
          
          {recordings.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-video"></i>
              <p>No recordings yet</p>
              <p className="hint">Start your first screen recording above</p>
            </div>
          ) : (
            <div className="recordings-grid">
              {recordings.map((recording) => (
                <div key={recording.id} className="recording-card">
                  <div className="recording-thumbnail">
                    <i className="fas fa-film"></i>
                  </div>
                  
                  <div className="recording-info">
                    <div className="recording-name">
                      {recording.filename || 'Recording'}
                    </div>
                    <div className="recording-meta">
                      <span className="duration">
                        <i className="fas fa-clock"></i>
                        {formatTime(recording.duration || 0)}
                      </span>
                      <span className="date">
                        {new Date(recording.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="recording-actions">
                    <button 
                      className="btn-download"
                      onClick={() => downloadRecording(recording)}
                      title="Download"
                    >
                      <i className="fas fa-download"></i>
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => deleteRecording(recording.id)}
                      title="Delete"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="info-section">
          <div className="info-card">
            <i className="fas fa-info-circle"></i>
            <div>
              <strong>Tips:</strong>
              <ul>
                <li>Select the window or screen you want to record</li>
                <li>Enable audio to record system sound</li>
                <li>Recordings are saved automatically</li>
                <li>Maximum recording time: 60 minutes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenRecordingPanel;
