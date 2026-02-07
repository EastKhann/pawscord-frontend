// frontend/src/utils/notificationSounds.js
// 🔔 FEATURE 1: Notification Sound Manager
// Farklı event'ler için farklı sesler çalar

const SOUND_URLS = {
    message: 'https://cdn.pawscord.com/sounds/message.mp3',
    mention: 'https://cdn.pawscord.com/sounds/mention.mp3',
    dm: 'https://cdn.pawscord.com/sounds/dm.mp3',
    join: 'https://cdn.pawscord.com/sounds/join.mp3',
    leave: 'https://cdn.pawscord.com/sounds/leave.mp3',
    call: 'https://cdn.pawscord.com/sounds/call.mp3',
    deafen: 'https://cdn.pawscord.com/sounds/deafen.mp3',
    mute: 'https://cdn.pawscord.com/sounds/mute.mp3',
};

// Web Audio API based oscillator fallbacks (no external files needed)
const FALLBACK_TONES = {
    message: { freq: 880, duration: 0.08, type: 'sine', volume: 0.15 },
    mention: { freq: 1200, duration: 0.12, type: 'sine', volume: 0.25, repeat: 2 },
    dm: { freq: 660, duration: 0.1, type: 'triangle', volume: 0.2, repeat: 2 },
    join: { freq: 520, duration: 0.15, type: 'sine', volume: 0.12, ramp: 'up' },
    leave: { freq: 420, duration: 0.15, type: 'sine', volume: 0.12, ramp: 'down' },
    call: { freq: 440, duration: 0.3, type: 'sine', volume: 0.3, repeat: 3 },
    deafen: { freq: 300, duration: 0.1, type: 'square', volume: 0.1 },
    mute: { freq: 350, duration: 0.08, type: 'square', volume: 0.1 },
};

class NotificationSoundManager {
    constructor() {
        this.audioCache = {};
        this.audioContext = null;
        this.enabled = true;
        this.volume = 0.5;
        this.quietHours = null; // { start: '23:00', end: '08:00' }
        this._cooldowns = {};
        this._loadSettings();
    }

    _loadSettings() {
        try {
            const saved = localStorage.getItem('pawscord_sound_settings');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.enabled = parsed.enabled !== false;
                this.volume = parsed.volume ?? 0.5;
                this.quietHours = parsed.quietHours || null;
                this.perEvent = parsed.perEvent || {};
            }
        } catch (e) { /* ignore */ }
    }

    saveSettings() {
        try {
            localStorage.setItem('pawscord_sound_settings', JSON.stringify({
                enabled: this.enabled,
                volume: this.volume,
                quietHours: this.quietHours,
                perEvent: this.perEvent || {},
            }));
        } catch (e) { /* ignore */ }
    }

    setEnabled(val) { this.enabled = val; this.saveSettings(); }
    setVolume(val) { this.volume = Math.max(0, Math.min(1, val)); this.saveSettings(); }
    setQuietHours(start, end) {
        this.quietHours = start && end ? { start, end } : null;
        this.saveSettings();
    }
    setEventEnabled(event, val) {
        if (!this.perEvent) this.perEvent = {};
        this.perEvent[event] = val;
        this.saveSettings();
    }

    isInQuietHours() {
        if (!this.quietHours) return false;
        const now = new Date();
        const h = now.getHours();
        const m = now.getMinutes();
        const current = h * 60 + m;
        const [sh, sm] = this.quietHours.start.split(':').map(Number);
        const [eh, em] = this.quietHours.end.split(':').map(Number);
        const start = sh * 60 + sm;
        const end = eh * 60 + em;
        if (start <= end) return current >= start && current < end;
        return current >= start || current < end; // overnight
    }

    _getAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return this.audioContext;
    }

    _playTone(config) {
        try {
            const ctx = this._getAudioContext();
            const play = (delay = 0) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = config.type || 'sine';
                osc.frequency.value = config.freq;
                gain.gain.value = (config.volume || 0.15) * this.volume;

                if (config.ramp === 'up') {
                    osc.frequency.setValueAtTime(config.freq * 0.7, ctx.currentTime + delay);
                    osc.frequency.linearRampToValueAtTime(config.freq, ctx.currentTime + delay + config.duration);
                } else if (config.ramp === 'down') {
                    osc.frequency.setValueAtTime(config.freq, ctx.currentTime + delay);
                    osc.frequency.linearRampToValueAtTime(config.freq * 0.7, ctx.currentTime + delay + config.duration);
                }

                gain.gain.setValueAtTime((config.volume || 0.15) * this.volume, ctx.currentTime + delay);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + config.duration);

                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(ctx.currentTime + delay);
                osc.stop(ctx.currentTime + delay + config.duration + 0.05);
            };

            const repeats = config.repeat || 1;
            for (let i = 0; i < repeats; i++) {
                play(i * (config.duration + 0.06));
            }
        } catch (e) {
            console.warn('Sound playback failed:', e);
        }
    }

    async play(eventType) {
        if (!this.enabled) return;
        if (this.isInQuietHours()) return;
        if (this.perEvent && this.perEvent[eventType] === false) return;

        // Cooldown: don't play same sound within 150ms
        const now = Date.now();
        if (this._cooldowns[eventType] && now - this._cooldowns[eventType] < 150) return;
        this._cooldowns[eventType] = now;

        // Try mp3 first, fallback to Web Audio tone
        const url = SOUND_URLS[eventType];
        if (url) {
            try {
                if (!this.audioCache[eventType]) {
                    this.audioCache[eventType] = new Audio(url);
                }
                const audio = this.audioCache[eventType].cloneNode();
                audio.volume = this.volume;
                await audio.play();
                return;
            } catch (e) { /* fallback to tone */ }
        }

        const tone = FALLBACK_TONES[eventType];
        if (tone) this._playTone(tone);
    }

    // Resume audio context (must be called after user gesture)
    resume() {
        if (this.audioContext?.state === 'suspended') {
            this.audioContext.resume();
        }
    }
}

export const soundManager = new NotificationSoundManager();
export default soundManager;
