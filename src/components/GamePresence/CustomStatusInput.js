/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { getToken } from '../../utils/tokenStorage';
import { FaEdit } from 'react-icons/fa';
import { API_BASE_URL } from '../../utils/constants';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const DURATION_OPTIONS = [
  { value: '', label: "Don't clear" },
  { value: '1800', label: '30 minutes' },
  { value: '3600', label: '1 hour' },
  { value: '14400', label: '4 hours' },
  { value: '86400', label: 'Today' },
  { value: '604800', label: 'This week' },
];

const EMOJI_SUGGESTIONS = ['😀', '😎', '🎮', '💻', '📚', '🎵', '☕', '🌙', '❤️', '🔥'];

export const CustomStatusInput = ({ onSave, currentStatus }) => {
  const { t } = useTranslation();

  const [emoji, setEmoji] = useState(currentStatus?.emoji || '');
  const [text, setText] = useState(currentStatus?.text || '');
  const [expiresIn, setExpiresIn] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!text.trim() && !emoji) return;
    setIsSaving(true);
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/presence/custom-status/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ emoji, text, expires_in: expiresIn ? parseInt(expiresIn) : null }),
      });
      if (response.ok) onSave?.();
    } catch (error) {
      logger.error('Custom status save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="custom-status-input">
      <div className="csi-header"><FaEdit /><span>{t('set_a_custom_status')}</span></div>
      <div className="csi-content">
        <div className="csi-emoji-row">
          <input type="text" value={emoji} onChange={e => setEmoji(e.target.value)} placeholder="😀" className="csi-emoji-input" maxLength={2} />
          <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder={t('what_s_on_your_mind')} className="csi-text-input" maxLength={128} />
        </div>
        <div className="csi-emoji-suggestions">
          {EMOJI_SUGGESTIONS.map(e => <button key={e} onClick={() => setEmoji(e)}>{e}</button>)}
        </div>
        <div className="csi-expires">
          <label>{t('clear_after')}</label>
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


CustomStatusInput.propTypes = {
  onSave: PropTypes.func,
  currentStatus: PropTypes.array,
};
