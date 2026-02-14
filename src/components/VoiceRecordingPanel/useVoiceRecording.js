import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';

export const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatDuration = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hrs > 0) return `${hrs}sa ${mins}dk`;
  return `${mins}dk`;
};

const useVoiceRecording = (serverId, channelId) => {
  const [activeTab, setActiveTab] = useState('record');
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordings, setRecordings] = useState([]);
  const [currentRecording, setCurrentRecording] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const [settings, setSettings] = useState({
    quality: 'high', format: 'mp3', auto_transcribe: true,
    save_to_cloud: true, noise_suppression: true
  });
  const [audioLevel, setAudioLevel] = useState(0);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    fetchRecordings();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [serverId, channelId]);

  const fetchRecordings = async () => {
    try {
      const response = await fetch(`${getApiBase()}/api/channels/${channelId}/recordings/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setRecordings(data.recordings || []);
      } else {
        setRecordings([]);
      }
    } catch (error) {
      console.error('Error fetching recordings:', error);
      setRecordings([]);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: settings.noise_suppression, autoGainControl: true }
      });

      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      const checkLevel = () => {
        if (isRecording) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setAudioLevel(average);
          requestAnimationFrame(checkLevel);
        }
      };

      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setCurrentRecording({ blob: audioBlob, url: audioUrl, duration: recordingTime });
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start(1000);
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => setRecordingTime(prev => prev + 1), 1000);
      checkLevel();
      toast.success('Kay\u0131t ba\u015flad\u0131');
    } catch (error) {
      console.error('Recording error:', error);
      toast.error('Mikrofon eri\u015fimi reddedildi');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
      setAudioLevel(0);
      toast.info('Kay\u0131t durduruldu');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        timerRef.current = setInterval(() => setRecordingTime(prev => prev + 1), 1000);
      } else {
        mediaRecorderRef.current.pause();
        clearInterval(timerRef.current);
      }
      setIsPaused(!isPaused);
    }
  };

  const saveRecording = async (name) => {
    if (!currentRecording) return;
    const formData = new FormData();
    formData.append('audio', currentRecording.blob, 'recording.webm');
    formData.append('name', name);
    formData.append('duration', currentRecording.duration);
    formData.append('auto_transcribe', settings.auto_transcribe);
    try {
      const response = await fetch(`${getApiBase()}/api/channels/${channelId}/recordings/`, {
        method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: formData
      });
      if (response.ok) { toast.success('Kay\u0131t kaydedildi'); fetchRecordings(); }
      else { toast.error('Kay\u0131t kaydedilemedi'); }
    } catch (error) { console.error('Error saving recording:', error); toast.error('Kay\u0131t kaydedilemedi'); }
    setCurrentRecording(null);
  };

  const deleteRecording = async (recordingId) => {
    if (!await confirmDialog('Bu kayd\u0131 silmek istedi\u011finizden emin misiniz?')) return;
    try {
      const response = await fetch(`${getApiBase()}/api/channels/${channelId}/recordings/${recordingId}/`, {
        method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) { setRecordings(recordings.filter(r => r.id !== recordingId)); toast.success('Kay\u0131t silindi'); }
      else { toast.error('Kay\u0131t silinemedi'); }
    } catch (error) { console.error('Error deleting recording:', error); toast.error('Kay\u0131t silinemedi'); }
  };

  const downloadRecording = async (recording) => {
    try {
      const response = await fetch(`${getApiBase()}/api/channels/${channelId}/recordings/${recording.id}/download/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${recording.name}.${settings.format}`;
        a.click();
      } else { toast.error('\u0130ndirme ba\u015far\u0131s\u0131z'); }
    } catch (error) { console.error('Error downloading recording:', error); toast.error('\u0130ndirme ba\u015far\u0131s\u0131z'); }
  };

  return {
    activeTab, setActiveTab,
    isRecording, isPaused, recordingTime, audioLevel,
    recordings, currentRecording, setCurrentRecording,
    playingId, setPlayingId,
    settings, setSettings,
    startRecording, stopRecording, pauseRecording,
    saveRecording, deleteRecording, downloadRecording
  };
};

export default useVoiceRecording;
