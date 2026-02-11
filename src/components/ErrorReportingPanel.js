// frontend/src/components/ErrorReportingPanel.js
import { useState } from 'react';
import toast from '../utils/toast';
import './ErrorReportingPanel.css';

const ErrorReportingPanel = ({ apiBaseUrl, onClose }) => {
    const [errorReport, setErrorReport] = useState({
        title: '',
        description: '',
        severity: 'medium', // 'low', 'medium', 'high', 'critical'
        category: 'bug', // 'bug', 'feature', 'performance', 'ui', 'crash'
        steps_to_reproduce: '',
        expected_behavior: '',
        actual_behavior: '',
        browser: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        url: window.location.href,
        console_errors: []
    });
    const [submitting, setSubmitting] = useState(false);
    const [attachments, setAttachments] = useState([]);

    const captureConsoleErrors = () => {
        // Capture last console errors from window if available
        const errors = window.consoleErrors || [];
        setErrorReport(prev => ({ ...prev, console_errors: errors }));
        toast.info('ℹ️ Konsol hataları yakalandı');
    };

    const submitErrorReport = async () => {
        if (!errorReport.title.trim()) {
            toast.error('❌ Başlık gerekli');
            return;
        }

        if (!errorReport.description.trim()) {
            toast.error('❌ Açıklama gerekli');
            return;
        }

        try {
            setSubmitting(true);
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/errors/report/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(errorReport)
            });

            if (response.ok) {
                const data = await response.json();
                toast.success('✅ Hata raporu gönderildi');
                setErrorReport({
                    title: '',
                    description: '',
                    severity: 'medium',
                    category: 'bug',
                    steps_to_reproduce: '',
                    expected_behavior: '',
                    actual_behavior: '',
                    browser: navigator.userAgent,
                    screen_resolution: `${window.screen.width}x${window.screen.height}`,
                    url: window.location.href,
                    console_errors: []
                });
                setTimeout(() => onClose(), 1500);
            } else {
                const error = await response.json();
                toast.error(`❌ ${error.error || 'Gönderim başarısız'}`);
            }
        } catch (error) {
            console.error('Submit error report error:', error);
            toast.error('❌ Bağlantı hatası');
        } finally {
            setSubmitting(false);
        }
    };

    const getSeverityColor = (severity) => {
        const colors = {
            'low': '#3b82f6',
            'medium': '#faa61a',
            'high': '#ff6b61',
            'critical': '#ff3b30'
        };
        return colors[severity] || colors.medium;
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'bug': '🐛',
            'feature': '✨',
            'performance': '⚡',
            'ui': '🎨',
            'crash': '💥'
        };
        return icons[category] || '❓';
    };

    return (
        <div className="error-reporting-overlay" onClick={onClose}>
            <div className="error-reporting-panel" onClick={e => e.stopPropagation()}>
                <div className="error-reporting-header">
                    <h2>🐛 Hata Bildirimi</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="error-reporting-content">
                    <div className="info-banner">
                        <span className="info-icon">💡</span>
                        <p>Karşılaştığınız hataları detaylı bir şekilde bildirerek uygulamayı geliştirmemize yardımcı olabilirsiniz.</p>
                    </div>

                    <div className="form-section">
                        <div className="form-group">
                            <label>Başlık *</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Kısa ve açıklayıcı bir başlık"
                                value={errorReport.title}
                                onChange={(e) => setErrorReport({ ...errorReport, title: e.target.value })}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Kategori</label>
                                <select
                                    className="form-select"
                                    value={errorReport.category}
                                    onChange={(e) => setErrorReport({ ...errorReport, category: e.target.value })}
                                >
                                    <option value="bug">🐛 Bug (Hata)</option>
                                    <option value="feature">✨ Feature Request (Özellik İsteği)</option>
                                    <option value="performance">⚡ Performance (Performans)</option>
                                    <option value="ui">🎨 UI/UX (Arayüz)</option>
                                    <option value="crash">💥 Crash (Çökme)</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Önem Derecesi</label>
                                <select
                                    className="form-select"
                                    value={errorReport.severity}
                                    onChange={(e) => setErrorReport({ ...errorReport, severity: e.target.value })}
                                >
                                    <option value="low">🟢 Düşük</option>
                                    <option value="medium">🟡 Orta</option>
                                    <option value="high">🟠 Yüksek</option>
                                    <option value="critical">🔴 Kritik</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Açıklama *</label>
                            <textarea
                                className="form-textarea"
                                placeholder="Hatayı detaylı bir şekilde açıklayın..."
                                value={errorReport.description}
                                onChange={(e) => setErrorReport({ ...errorReport, description: e.target.value })}
                                rows={5}
                            />
                        </div>

                        <div className="form-group">
                            <label>Hatayı Yeniden Oluşturma Adımları</label>
                            <textarea
                                className="form-textarea"
                                placeholder="1. İlk adım&#10;2. İkinci adım&#10;3. Üçüncü adım"
                                value={errorReport.steps_to_reproduce}
                                onChange={(e) => setErrorReport({ ...errorReport, steps_to_reproduce: e.target.value })}
                                rows={4}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Beklenen Davranış</label>
                                <textarea
                                    className="form-textarea"
                                    placeholder="Ne olmasını bekliyordunuz?"
                                    value={errorReport.expected_behavior}
                                    onChange={(e) => setErrorReport({ ...errorReport, expected_behavior: e.target.value })}
                                    rows={3}
                                />
                            </div>

                            <div className="form-group">
                                <label>Gerçekleşen Davranış</label>
                                <textarea
                                    className="form-textarea"
                                    placeholder="Ne oldu?"
                                    value={errorReport.actual_behavior}
                                    onChange={(e) => setErrorReport({ ...errorReport, actual_behavior: e.target.value })}
                                    rows={3}
                                />
                            </div>
                        </div>

                        <div className="system-info">
                            <h4>📊 Sistem Bilgileri</h4>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Tarayıcı:</span>
                                    <span className="info-value">{navigator.userAgent.split('(')[1]?.split(')')[0] || 'Unknown'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Ekran:</span>
                                    <span className="info-value">{errorReport.screen_resolution}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">URL:</span>
                                    <span className="info-value truncate">{errorReport.url}</span>
                                </div>
                            </div>
                            <button 
                                className="capture-errors-btn"
                                onClick={captureConsoleErrors}
                            >
                                📝 Konsol Hatalarını Yakala
                            </button>
                        </div>

                        <div className="preview-section">
                            <h4>👁️ Önizleme</h4>
                            <div className="error-preview">
                                <div className="preview-header">
                                    <span className="preview-icon">{getCategoryIcon(errorReport.category)}</span>
                                    <span className="preview-title">{errorReport.title || 'Başlık'}</span>
                                    <span 
                                        className="preview-severity"
                                        style={{ backgroundColor: getSeverityColor(errorReport.severity) }}
                                    >
                                        {errorReport.severity}
                                    </span>
                                </div>
                                <div className="preview-body">
                                    {errorReport.description || 'Açıklama burada görünecek...'}
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button 
                                className="cancel-btn"
                                onClick={onClose}
                            >
                                İptal
                            </button>
                            <button 
                                className="submit-btn"
                                onClick={submitErrorReport}
                                disabled={submitting}
                            >
                                {submitting ? '⏳ Gönderiliyor...' : '📨 Raporu Gönder'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorReportingPanel;
