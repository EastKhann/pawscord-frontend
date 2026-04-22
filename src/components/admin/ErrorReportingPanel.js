/* eslint-disable jsx-a11y/label-has-associated-control */
import { getToken } from '../../utils/tokenStorage';
// frontend/src/components/ErrorReportingPanel.js
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import toast from '../../utils/toast';
import logger from '../../utils/logger';
import './ErrorReportingPanel.css';

const ErrorReportingPanel = ({ apiBaseUrl, onClose }) => {
    const { t } = useTranslation();
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
        console_errors: [],
    });
    const [submitting, setSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [attachments, setAttachments] = useState([]);

    const captureConsoleErrors = () => {
        // Capture last console errors from window if available
        const errors = window.consoleErrors || [];
        setErrorReport((prev) => ({ ...prev, console_errors: errors }));
        toast.info(t('errorReporting.captured'));
    };

    const submitErrorReport = async () => {
        if (!errorReport.title.trim()) {
            toast.error(t('admin.errorReport.titleRequired'));
            return;
        }

        if (!errorReport.description.trim()) {
            toast.error(t('admin.errorReport.descRequired'));
            return;
        }

        try {
            setSubmitting(true);
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/errors/report/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(errorReport),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(t('admin.errorReport.submitted'));
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
                    console_errors: [],
                });
                setTimeout(() => onClose(), 1500);
            } else {
                const error = await response.json();
                toast.error(error.error || t('admin.errorReport.submitFailed'));
            }
        } catch (error) {
            logger.error('Submit error report error:', error);
            toast.error(t('admin.errorReport.connectionError'));
        } finally {
            setSubmitting(false);
        }
    };

    const getSeverityColor = (severity) => {
        const colors = {
            low: '#3b82f6',
            medium: '#f0b232',
            high: '#ff6b61',
            critical: '#f23f42',
        };
        return colors[severity] || colors.medium;
    };

    const getCategoryIcon = (category) => {
        const icons = {
            bug: '🐛',
            feature: '✨',
            performance: '⚡',
            ui: '🎨',
            crash: '💥',
        };
        return icons[category] || '❓';
    };

    return (
        <div
            className="error-reporting-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="error-reporting-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="error-reporting-header">
                    <h2>🐛 Error Reportimi</h2>
                    <button aria-label={t('common.close')} className="close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="error-reporting-content">
                    <div className="info-banner">
                        <span className="info-icon">💡</span>
                        <p>{t('admin.reportHelp', 'Help us improve by reporting issues you encounter.')}</p>
                    </div>

                    <div className="form-section">
                        <div className="form-group">
                            <label>{t('admin.reportTitleLabel', 'Title *')}</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder={t('admin.reportTitle', 'Brief, descriptive title')}
                                value={errorReport.title}
                                onChange={(e) =>
                                    setErrorReport({ ...errorReport, title: e.target.value })
                                }
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Kategori</label>
                                <select
                                    className="form-select"
                                    value={errorReport.category}
                                    onChange={(e) =>
                                        setErrorReport({ ...errorReport, category: e.target.value })
                                    }
                                >
                                    <option value="bug">🐛 Hata (Bug)</option>
                                    <option value="feature">{t('admin.featureRequest', '✨ Feature Request')}</option>
                                    <option value="performance">⚡ Performans</option>
                                    <option value="ui">{t('admin.uiIssue', '🎨 UI/UX Issue')}</option>
                                    <option value="crash">{t('admin.crash', '💥 Crash')}</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>{t('admin.priority', 'Priority')}</label>
                                <select
                                    className="form-select"
                                    value={errorReport.severity}
                                    onChange={(e) =>
                                        setErrorReport({ ...errorReport, severity: e.target.value })
                                    }
                                >
                                    <option value="low">{t('admin.priorityLow', '🟢 Low')}</option>
                                    <option value="medium">🟡 Orta</option>
                                    <option value="high">{t('admin.priorityHigh', '🟠 High')}</option>
                                    <option value="critical">🔴 Kritik</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>{t('admin.descriptionLabel', 'Description *')}</label>
                            <textarea
                                className="form-textarea"
                                placeholder={t('admin.describeIssue', 'Describe the problem in detail...')}
                                value={errorReport.description}
                                onChange={(e) =>
                                    setErrorReport({ ...errorReport, description: e.target.value })
                                }
                                rows={5}
                            />
                        </div>

                        <div className="form-group">
                            <label>{t('admin.stepsLabel', 'Steps to Reproduce')}</label>
                            <textarea
                                className="form-textarea"
                                placeholder={t('admin.stepsToReproduce', '1. First step\n2. Second step\n3. Third step')}
                                value={errorReport.steps_to_reproduce}
                                onChange={(e) =>
                                    setErrorReport({
                                        ...errorReport,
                                        steps_to_reproduce: e.target.value,
                                    })
                                }
                                rows={4}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>{t('admin.expectedLabel', 'Expected Behavior')}</label>
                                <textarea
                                    className="form-textarea"
                                    placeholder={t('admin.expectedBehavior', 'What did you expect to happen?')}
                                    value={errorReport.expected_behavior}
                                    onChange={(e) =>
                                        setErrorReport({
                                            ...errorReport,
                                            expected_behavior: e.target.value,
                                        })
                                    }
                                    rows={3}
                                />
                            </div>

                            <div className="form-group">
                                <label>{t('admin.actualLabel', 'Actual Behavior')}</label>
                                <textarea
                                    className="form-textarea"
                                    placeholder={t('errorReport.whatHappened', 'What happened?')}
                                    value={errorReport.actual_behavior}
                                    onChange={(e) =>
                                        setErrorReport({
                                            ...errorReport,
                                            actual_behavior: e.target.value,
                                        })
                                    }
                                    rows={3}
                                />
                            </div>
                        </div>

                        <div className="system-info">
                            <h4>📊 Sistem Bilgileri</h4>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Browser:</span>
                                    <span className="info-value">
                                        {navigator.userAgent.split('(')[1]?.split(')')[0] ||
                                            'Unknown'}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Ekran:</span>
                                    <span className="info-value">
                                        {errorReport.screen_resolution}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">URL:</span>
                                    <span className="info-value truncate">{errorReport.url}</span>
                                </div>
                            </div>
                            <button
                                aria-label={t('admin.captureConsoleErrors', 'Capture Console Errors')}
                                className="capture-errors-btn"
                                onClick={captureConsoleErrors}
                            >
                                {t('errReport.captureConsole','📝 Capture Console Errors')}
                            </button>
                        </div>

                        <div className="preview-section">
                            <h4>{t('admin.preview', '👁️ Preview')}</h4>
                            <div className="error-preview">
                                <div className="preview-header">
                                    <span className="preview-icon">
                                        {getCategoryIcon(errorReport.category)}
                                    </span>
                                    <span className="preview-title">
                                        {errorReport.title || t('common.title','Title')}
                                    </span>
                                    <span
                                        className="preview-severity"
                                        style={{
                                            backgroundColor: getSeverityColor(errorReport.severity),
                                        }}
                                    >
                                        {errorReport.severity}
                                    </span>
                                </div>
                                <div className="preview-body">
                                    {errorReport.description ||
                                        t('errReport.descPreview','Description preview will appear here...')}
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button aria-label={t('common.close')} className="cancel-btn" onClick={onClose}>{t('common.cancel','Cancel')}</button>
                            <button
                                aria-label={t('admin.sendErrorReport', 'Send Error Report')}
                                className="submit-btn"
                                onClick={submitErrorReport}
                                disabled={submitting}
                            >
                                {submitting ? t('common.submitting','⏳ Submitting...') : t('errReport.sendReport','📨 Send Report')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ErrorReportingPanel.propTypes = {
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
};
export default ErrorReportingPanel;
