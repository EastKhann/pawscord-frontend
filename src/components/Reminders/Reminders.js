import React, { useState, useEffect, useCallback } from 'react';
import './Reminders.css';
import toast from '../../utils/toast';

// Parse time string like "30m", "2h", "1d", "15:30"
const parseTimeString = (timeStr) => {
    // Check for relative time: 30m, 2h, 1d
    const relativeMatch = timeStr.match(/^(\d+)(m|h|d|w)$/i);
    if (relativeMatch) {
        const value = parseInt(relativeMatch[1]);
        const unit = relativeMatch[2].toLowerCase();
        const multipliers = { m: 60000, h: 3600000, d: 86400000, w: 604800000 };
        return Date.now() + (value * multipliers[unit]);
    }

    // Check for absolute time: 15:30, 9:00
    const timeMatch = timeStr.match(/^(\d{1,2}):(\d{2})$/);
    if (timeMatch) {
        const hours = parseInt(timeMatch[1]);
        const minutes = parseInt(timeMatch[2]);
        const now = new Date();
        const target = new Date(now);
        target.setHours(hours, minutes, 0, 0);

        // If time is past, set for next day
        if (target <= now) {
            target.setDate(target.getDate() + 1);
        }
        return target.getTime();
    }

    // Check for date time: 2026-01-20 15:30
    const dateTimeMatch = timeStr.match(/^(\d{4}-\d{2}-\d{2})\s+(\d{1,2}):(\d{2})$/);
    if (dateTimeMatch) {
        const date = new Date(`${dateTimeMatch[1]}T${dateTimeMatch[2].padStart(2, '0')}:${dateTimeMatch[3]}:00`);
        return date.getTime();
    }

    return null;
};

// Format remaining time
const formatTimeRemaining = (ms) => {
    if (ms < 0) return 'Geçti';

    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}g ${hours % 24}s`;
    if (hours > 0) return `${hours}s ${minutes % 60}dk`;
    if (minutes > 0) return `${minutes}dk ${seconds % 60}sn`;
    return `${seconds}sn`;
};

// Reminder Manager Hook
export const useReminders = (userId) => {
    const [reminders, setReminders] = useState([]);

    // Load reminders from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(`reminders_${userId}`);
        if (saved) {
            const parsed = JSON.parse(saved);
            // Filter out expired reminders that were already notified
            const valid = parsed.filter(r => !r.notified || r.time > Date.now());
            setReminders(valid);
        }
    }, [userId]);

    // Save reminders to localStorage
    useEffect(() => {
        localStorage.setItem(`reminders_${userId}`, JSON.stringify(reminders));
    }, [reminders, userId]);

    // Check for due reminders
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            setReminders(prev => {
                let updated = false;
                const newReminders = prev.map(r => {
                    if (!r.notified && r.time <= now) {
                        updated = true;
                        // Trigger notification
                        if ('Notification' in window && Notification.permission === 'granted') {
                            new Notification('⏰ Hatırlatma', {
                                body: r.message,
                                icon: '/favicon.ico'
                            });
                        }
                        return { ...r, notified: true };
                    }
                    return r;
                });
                return updated ? newReminders : prev;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const addReminder = useCallback((message, time) => {
        const reminder = {
            id: Date.now().toString(),
            message,
            time,
            createdAt: Date.now(),
            notified: false
        };
        setReminders(prev => [...prev, reminder]);
        return reminder;
    }, []);

    const removeReminder = useCallback((id) => {
        setReminders(prev => prev.filter(r => r.id !== id));
    }, []);

    const clearAll = useCallback(() => {
        setReminders([]);
    }, []);

    return {
        reminders,
        addReminder,
        removeReminder,
        clearAll
    };
};

// Main Reminders Component
const Reminders = ({ userId, onReminderDue }) => {
    const { reminders, addReminder, removeReminder, clearAll } = useReminders(userId);
    const [timeInput, setTimeInput] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const [now, setNow] = useState(Date.now());

    // Update time display
    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval);
    }, []);

    // Request notification permission
    useEffect(() => {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, []);

    const handleAddReminder = () => {
        if (!timeInput || !messageInput.trim()) {
            toast.info('Zaman ve mesaj girin!');
            return;
        }

        const time = parseTimeString(timeInput);
        if (!time) {
            toast.error('Geçersiz zaman formatı! Örnek: 30m, 2h, 15:30');
            return;
        }

        if (time <= Date.now()) {
            toast.info('Geçmiş bir zaman seçemezsiniz!');
            return;
        }

        addReminder(messageInput.trim(), time);
        setTimeInput('');
        setMessageInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAddReminder();
        }
    };

    const quickTimes = [
        { label: '5dk', value: '5m' },
        { label: '15dk', value: '15m' },
        { label: '30dk', value: '30m' },
        { label: '1 saat', value: '1h' },
        { label: '2 saat', value: '2h' },
        { label: 'Yarın', value: '1d' }
    ];

    const activeReminders = reminders.filter(r => !r.notified);
    const pastReminders = reminders.filter(r => r.notified);

    return (
        <div className="reminders-container">
            <div className="reminders-header">
                <h3>⏰ Hatırlatmalar</h3>
                <span className="reminder-count">{activeReminders.length} aktif</span>
            </div>

            <div className="add-reminder-form">
                <div className="form-row">
                    <input
                        type="text"
                        className="time-input"
                        placeholder="30m, 2h, 15:30..."
                        value={timeInput}
                        onChange={(e) => setTimeInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <input
                        type="text"
                        className="message-input"
                        placeholder="Ne hatırlatılsın?"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="add-btn" onClick={handleAddReminder}>
                        ➕
                    </button>
                </div>

                <div className="quick-times">
                    {quickTimes.map(qt => (
                        <button
                            key={qt.value}
                            className="quick-time-btn"
                            onClick={() => setTimeInput(qt.value)}
                        >
                            {qt.label}
                        </button>
                    ))}
                </div>
            </div>

            {activeReminders.length > 0 && (
                <div className="reminders-list">
                    <div className="list-header">
                        <span>Aktif Hatırlatmalar</span>
                        {activeReminders.length > 1 && (
                            <button className="clear-all-btn" onClick={clearAll}>
                                Hepsini Sil
                            </button>
                        )}
                    </div>
                    {activeReminders
                        .sort((a, b) => a.time - b.time)
                        .map(reminder => (
                            <ReminderItem
                                key={reminder.id}
                                reminder={reminder}
                                now={now}
                                onRemove={removeReminder}
                            />
                        ))
                    }
                </div>
            )}

            {pastReminders.length > 0 && (
                <div className="reminders-list past">
                    <div className="list-header">
                        <span>Geçmiş</span>
                    </div>
                    {pastReminders.slice(0, 5).map(reminder => (
                        <ReminderItem
                            key={reminder.id}
                            reminder={reminder}
                            now={now}
                            onRemove={removeReminder}
                            isPast
                        />
                    ))}
                </div>
            )}

            {reminders.length === 0 && (
                <div className="no-reminders">
                    <span className="empty-icon">⏰</span>
                    <p>Henüz hatırlatma yok</p>
                    <span className="help-text">
                        /remind 30m toplantı veya yukarıdan ekle
                    </span>
                </div>
            )}
        </div>
    );
};

// Individual Reminder Item
const ReminderItem = ({ reminder, now, onRemove, isPast = false }) => {
    const remaining = reminder.time - now;
    const isUrgent = remaining > 0 && remaining < 300000; // < 5 min

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleString('tr-TR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className={`reminder-item ${isPast ? 'past' : ''} ${isUrgent ? 'urgent' : ''}`}>
            <div className="reminder-content">
                <span className="reminder-message">{reminder.message}</span>
                <span className="reminder-time">
                    {isPast ? (
                        <>✓ {formatTime(reminder.time)}</>
                    ) : (
                        <>⏱️ {formatTimeRemaining(remaining)}</>
                    )}
                </span>
            </div>
            <button
                className="remove-btn"
                onClick={() => onRemove(reminder.id)}
                title="Sil"
            >
                ✕
            </button>
        </div>
    );
};

// Reminder Toast for notifications in-app
export const ReminderToast = ({ reminder, onDismiss }) => {
    if (!reminder) return null;

    return (
        <div className="reminder-toast">
            <div className="toast-icon">⏰</div>
            <div className="toast-content">
                <span className="toast-title">Hatırlatma!</span>
                <span className="toast-message">{reminder.message}</span>
            </div>
            <button className="toast-dismiss" onClick={onDismiss}>
                ✕
            </button>
        </div>
    );
};

// Slash command parser for /remind
export const parseRemindCommand = (command) => {
    // /remind 30m toplantı
    // /remind 15:30 yemek ye
    const match = command.match(/^\/remind\s+(\S+)\s+(.+)$/i);
    if (!match) return null;

    const timeStr = match[1];
    const message = match[2];
    const time = parseTimeString(timeStr);

    if (!time) return null;

    return { time, message };
};

export default Reminders;
