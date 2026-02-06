import React, { useState, useEffect } from 'react';
import './PinHistoryPanel.css';
import { FaThumbtack, FaHistory, FaBell, FaClock, FaUser } from 'react-icons/fa';

function PinHistoryPanel({ apiBaseUrl, fetchWithAuth, messageId }) {
  const [pinHistory, setPinHistory] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [reminderDate, setReminderDate] = useState('');
  const [reminderNote, setReminderNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (messageId) {
      loadPinHistory();
    }
    loadReminders();
  }, [messageId]);

  const loadPinHistory = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/messages/${messageId}/pin_history/`);
      if (response.ok) {
        const data = await response.json();
        setPinHistory(data.history || []);
      }
    } catch (err) {
      console.error('Error loading pin history:', err);
    }
  };

  const loadReminders = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/pins/reminder/list/`);
      if (response.ok) {
        const data = await response.json();
        setReminders(data.reminders || []);
      }
    } catch (err) {
      console.error('Error loading reminders:', err);
    }
  };

  const createReminder = async () => {
    if (!messageId) {
      setMessage('❌ No message selected');
      return;
    }

    if (!reminderDate) {
      setMessage('❌ Please select a date');
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/pins/reminder/create/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message_id: messageId,
          remind_at: reminderDate,
          note: reminderNote || null
        })
      });

      if (response.ok) {
        setMessage('✅ Reminder created!');
        setReminderDate('');
        setReminderNote('');
        loadReminders();
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Failed to create reminder'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pin-history-panel">
      <div className="pin-header">
        <h3><FaThumbtack /> Pin History & Reminders</h3>
      </div>

      {message && <div className="pin-message">{message}</div>}

      {messageId && (
        <div className="history-section">
          <h4><FaHistory /> Pin History</h4>
          {pinHistory.length === 0 ? (
            <div className="empty-history">No pin history for this message</div>
          ) : (
            <div className="history-list">
              {pinHistory.map((item, idx) => (
                <div key={idx} className="history-item">
                  <FaUser className="history-icon" />
                  <div className="history-content">
                    <div className="history-action">
                      {item.action === 'pinned' ? 'Pinned' : 'Unpinned'} by {item.user}
                    </div>
                    <div className="history-date">
                      {new Date(item.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="reminder-section">
        <h4><FaBell /> Create Reminder</h4>
        <div className="reminder-form">
          <div className="form-group">
            <label>Remind me at:</label>
            <input
              type="datetime-local"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Note (optional):</label>
            <input
              type="text"
              placeholder="Reminder note..."
              value={reminderNote}
              onChange={(e) => setReminderNote(e.target.value)}
              className="form-input"
            />
          </div>
          <button
            className="create-reminder-btn"
            onClick={createReminder}
            disabled={loading || !messageId}
          >
            <FaBell /> Set Reminder
          </button>
        </div>
      </div>

      <div className="reminders-list">
        <h4><FaClock /> Active Reminders ({reminders.length})</h4>
        {reminders.length === 0 ? (
          <div className="empty-reminders">No active reminders</div>
        ) : (
          <div className="reminder-items">
            {reminders.map((reminder, idx) => (
              <div key={idx} className="reminder-item">
                <FaBell className="reminder-icon" />
                <div className="reminder-content">
                  <div className="reminder-time">
                    {new Date(reminder.remind_at).toLocaleString()}
                  </div>
                  {reminder.note && <div className="reminder-note">{reminder.note}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PinHistoryPanel;
