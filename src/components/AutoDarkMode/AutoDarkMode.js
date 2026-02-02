import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import './AutoDarkMode.css';

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');
    const [autoMode, setAutoMode] = useState(false);
    const [schedule, setSchedule] = useState({
        darkStart: '20:00',
        darkEnd: '07:00'
    });
    const [useSystemTheme, setUseSystemTheme] = useState(false);

    // Load settings from localStorage
    useEffect(() => {
        const savedSettings = localStorage.getItem('themeSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            setTheme(settings.theme || 'dark');
            setAutoMode(settings.autoMode || false);
            setSchedule(settings.schedule || { darkStart: '20:00', darkEnd: '07:00' });
            setUseSystemTheme(settings.useSystemTheme || false);
        }
    }, []);

    // Save settings to localStorage
    useEffect(() => {
        localStorage.setItem('themeSettings', JSON.stringify({
            theme,
            autoMode,
            schedule,
            useSystemTheme
        }));
    }, [theme, autoMode, schedule, useSystemTheme]);

    // Apply theme to document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.className = `theme-${theme}`;
    }, [theme]);

    // Check system theme preference
    useEffect(() => {
        if (!useSystemTheme) return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            setTheme(e.matches ? 'dark' : 'light');
        };

        handleChange(mediaQuery);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [useSystemTheme]);

    // Auto mode scheduler
    useEffect(() => {
        if (!autoMode || useSystemTheme) return;

        const checkSchedule = () => {
            const now = new Date();
            const currentTime = now.getHours() * 60 + now.getMinutes();

            const [darkStartHour, darkStartMin] = schedule.darkStart.split(':').map(Number);
            const [darkEndHour, darkEndMin] = schedule.darkEnd.split(':').map(Number);

            const darkStartMins = darkStartHour * 60 + darkStartMin;
            const darkEndMins = darkEndHour * 60 + darkEndMin;

            let shouldBeDark;

            if (darkStartMins < darkEndMins) {
                // Same day: e.g., 08:00 - 20:00 light
                shouldBeDark = currentTime >= darkStartMins || currentTime < darkEndMins;
            } else {
                // Overnight: e.g., 20:00 - 07:00 dark
                shouldBeDark = currentTime >= darkStartMins || currentTime < darkEndMins;
            }

            setTheme(shouldBeDark ? 'dark' : 'light');
        };

        checkSchedule();
        const interval = setInterval(checkSchedule, 60000); // Check every minute
        return () => clearInterval(interval);
    }, [autoMode, schedule, useSystemTheme]);

    // Sunrise/Sunset based on location (simplified)
    const useSunriseSunset = useCallback(async () => {
        if (!navigator.geolocation) {
            alert('Konum servisi desteklenmiyor');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    // Using sunrise-sunset.org API
                    const response = await fetch(
                        `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`
                    );
                    const data = await response.json();

                    if (data.status === 'OK') {
                        const sunrise = new Date(data.results.sunrise);
                        const sunset = new Date(data.results.sunset);

                        setSchedule({
                            darkStart: `${sunset.getHours().toString().padStart(2, '0')}:${sunset.getMinutes().toString().padStart(2, '0')}`,
                            darkEnd: `${sunrise.getHours().toString().padStart(2, '0')}:${sunrise.getMinutes().toString().padStart(2, '0')}`
                        });
                        setAutoMode(true);
                        setUseSystemTheme(false);
                    }
                } catch (error) {
                    console.error('Sunrise/Sunset API error:', error);
                    alert('Gün doğumu/batımı bilgisi alınamadı');
                }
            },
            (error) => {
                alert('Konum alınamadı: ' + error.message);
            }
        );
    }, []);

    const value = {
        theme,
        setTheme,
        autoMode,
        setAutoMode,
        schedule,
        setSchedule,
        useSystemTheme,
        setUseSystemTheme,
        useSunriseSunset,
        toggleTheme: () => setTheme(t => t === 'dark' ? 'light' : 'dark')
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

// Theme Settings Panel
const AutoDarkMode = () => {
    const {
        theme,
        setTheme,
        autoMode,
        setAutoMode,
        schedule,
        setSchedule,
        useSystemTheme,
        setUseSystemTheme,
        useSunriseSunset
    } = useTheme();

    const handleScheduleChange = (key, value) => {
        setSchedule(prev => ({ ...prev, [key]: value }));
    };

    const presets = [
        { name: 'Gece Baykuşu', darkStart: '22:00', darkEnd: '10:00' },
        { name: 'Standart', darkStart: '20:00', darkEnd: '07:00' },
        { name: 'Erken Yatan', darkStart: '18:00', darkEnd: '06:00' }
    ];

    return (
        <div className="auto-dark-mode">
            <div className="section-header">
                <h3>🌓 Tema Ayarları</h3>
            </div>

            {/* Manual Theme Toggle */}
            <div className="setting-group">
                <label>Tema</label>
                <div className="theme-buttons">
                    <button
                        className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                        onClick={() => {
                            setTheme('dark');
                            setAutoMode(false);
                            setUseSystemTheme(false);
                        }}
                    >
                        🌙 Karanlık
                    </button>
                    <button
                        className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                        onClick={() => {
                            setTheme('light');
                            setAutoMode(false);
                            setUseSystemTheme(false);
                        }}
                    >
                        ☀️ Aydınlık
                    </button>
                </div>
            </div>

            {/* System Theme */}
            <div className="setting-group">
                <div className="setting-row">
                    <div className="setting-info">
                        <span className="setting-label">💻 Sistem Teması</span>
                        <span className="setting-desc">İşletim sistemi temasını takip et</span>
                    </div>
                    <label className="toggle">
                        <input
                            type="checkbox"
                            checked={useSystemTheme}
                            onChange={(e) => {
                                setUseSystemTheme(e.target.checked);
                                if (e.target.checked) setAutoMode(false);
                            }}
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
            </div>

            {/* Auto Mode */}
            <div className="setting-group">
                <div className="setting-row">
                    <div className="setting-info">
                        <span className="setting-label">⏰ Zamanlanmış Tema</span>
                        <span className="setting-desc">Belirlenen saatlerde otomatik değiştir</span>
                    </div>
                    <label className="toggle">
                        <input
                            type="checkbox"
                            checked={autoMode}
                            disabled={useSystemTheme}
                            onChange={(e) => setAutoMode(e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
            </div>

            {/* Schedule Settings */}
            {autoMode && !useSystemTheme && (
                <div className="schedule-settings">
                    <div className="schedule-row">
                        <div className="schedule-item">
                            <label>🌙 Karanlık Başlangıç</label>
                            <input
                                type="time"
                                value={schedule.darkStart}
                                onChange={(e) => handleScheduleChange('darkStart', e.target.value)}
                            />
                        </div>
                        <div className="schedule-item">
                            <label>☀️ Aydınlık Başlangıç</label>
                            <input
                                type="time"
                                value={schedule.darkEnd}
                                onChange={(e) => handleScheduleChange('darkEnd', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="presets">
                        <span className="preset-label">Hazır Ayarlar:</span>
                        <div className="preset-buttons">
                            {presets.map(preset => (
                                <button
                                    key={preset.name}
                                    className="preset-btn"
                                    onClick={() => setSchedule({
                                        darkStart: preset.darkStart,
                                        darkEnd: preset.darkEnd
                                    })}
                                >
                                    {preset.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className="sunrise-btn" onClick={useSunriseSunset}>
                        🌅 Gün Doğumu/Batımı Kullan
                    </button>
                </div>
            )}

            {/* Preview */}
            <div className="theme-preview">
                <div className={`preview-card ${theme}`}>
                    <div className="preview-header">
                        <span>Önizleme</span>
                    </div>
                    <div className="preview-content">
                        <div className="preview-sidebar"></div>
                        <div className="preview-main">
                            <div className="preview-message"></div>
                            <div className="preview-message short"></div>
                            <div className="preview-message"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Quick Theme Toggle Button
export const ThemeToggleButton = ({ size = 'medium' }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className={`theme-toggle-btn ${size}`}
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Aydınlık Tema' : 'Karanlık Tema'}
        >
            {theme === 'dark' ? '☀️' : '🌙'}
        </button>
    );
};

export default AutoDarkMode;
