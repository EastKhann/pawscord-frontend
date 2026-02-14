import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { API_BASE_URL } from '../../utils/constants';

const DURATION_OPTIONS = [
  { value: '', label: "Don't clear" },
  { value: '1800', label: '30 minutes' },
  { value: '3600', label: '1 hour' },
  { value: '14400', label: '4 hours' },
  { value: '86400', label: 'Today' },
  { value: '604800', label: 'This week' },
];

const EMOJI_SUGGESTIONS = ['\uD83D\uDE00', '\uD83D\uDE0E', '\uD83C\uDFAE', '\uD83D\uDCBB', '\uD83D\uDCDA', '\uD83C\uDFB5', '\u2615', '\uD83C\uDF19', '\u2764\uFE0F', '\uD83D\uDD25'];

export const CustomStatusInput = ({ onSave, currentStatus }) => {
  const [emoji, setEmoji] = useState(currentStatus?.emoji || '');
  const [text, setText] = useState(currentStatus?.text || '');
  const [expiresIn, setExpiresIn] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!text.trim() && !emoji) return;
    setIsSaving(true);
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/presence/custom-status/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ emoji, text, expires_in: expiresIn ? parseInt(expiresIn) : null }),
      });
      if (response.ok) onSave?.();
    } catch (error) {
      console.error('Custom status save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="custom-status-input">
      <div className="csi-header"><FaEdit /><span>Set a custom status</span></div>
      <div className="csi-content">
        <div className="csi-emoji-row">
          <input type="text" value={emoji} onChange={e => setEmoji(e.target.value)} placeholder={'\uD83D\uDE00'} className="csi-emoji-input" maxLength={2} />
          <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="What's on your mind?" className="csi-text-input" maxLength={128} />
        </div>
        <div className="csi-emoji-suggestions">
          {EMOJI_SUGGESTIONS.map(e => <button key={e} onClick={() => setEmoji(e)}>{e}</button>)}
        </div>
        <div className="csi-expires">
          <label>Clear after:</label>
          <select value={expiresIn} onChange={e => setExpiresIn(e.target.value)}>
            {DURATION_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      </div>
      <div className="csi-actions">
        <button className="csi-save-btn" onClick={handleSave} disabled={isSaving || (!text.trim() && !emoji)}>
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};
