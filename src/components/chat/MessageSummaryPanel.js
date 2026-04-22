/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    FaRobot,
    FaTimes,
    FaCompressArrowsAlt,
    FaExpand,
    FaCopy,
    FaDownload,
    FaSearch,
    FaCalendar,
    FaHashtag,
    FaSync,
    FaSpinner,
    FaClock,
    FaFileAlt,
    FaCheckCircle,
    FaChartBar,
} from 'react-icons/fa';
import DOMPurify from 'dompurify';
import './MessageSummaryPanel.css';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const MessageSummaryPanel = ({ channelId, onClose, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [summaries, setSummaries] = useState([]);
    const [currentSummary, setCurrentSummary] = useState(null);
    const [generating, setGenerating] = useState(false);
    const [timeRange, setTimeRange] = useState('24h');
    const [messageCount, setMessageCount] = useState(100);
    const [selectedChannel, setSelectedChannel] = useState(channelId);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        loadData();
    }, [channelId]);

    const loadData = async () => {
        setLoading(true);
        try {
            // Fetch channels from API
            const channelsRes = await fetchWithAuth(`${apiBaseUrl}/rooms/list/`);
            if (channelsRes.ok) {
                const channelsData = await channelsRes.json();
                setChannels(channelsData.rooms || channelsData || []);
            }

            // Fetch existing summaries
            const summariesRes = await fetchWithAuth(`${apiBaseUrl}/messages/summaries/`);
            if (summariesRes.ok) {
                const summariesData = await summariesRes.json();
                setSummaries(summariesData.summaries || summariesData || []);
            }
        } catch (error) {
            logger.error('Error loading data:', error);
            // Set empty state on error
            setChannels([]);
            setSummaries([]);
        }
        setLoading(false);
    };

    const generateSummary = async () => {
        setGenerating(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/messages/summarize/`, {
                method: 'POST',
                body: JSON.stringify({
                    channel_id: selectedChannel,
                    time_range: timeRange,
                    message_count: messageCount,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const newSummary = {
                    id: data.id || Date.now(),
                    channel: channels.find((c) => c.id === selectedChannel)?.name || 'general',
                    created_at: new Date().toISOString(),
                    time_range: timeRange,
                    message_count: data.message_count || messageCount,
                    summary: data.summary || t('ui.ozet_olusturulamadi'),
                    keywords: data.keywords || [],
                    participants: data.participants || 0,
                };

                setCurrentSummary(newSummary);
                setSummaries([newSummary, ...summaries]);
            } else {
                logger.error('Summary generation failed');
            }
        } catch (error) {
            logger.error('Error generating summary:', error);
        }
        setGenerating(false);
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const exportSummary = (summary) => {
        const content = `# Message Summary - ${summary.channel}\n\nGenerated: ${formatDate(summary.created_at)}\nMessages Analyzed: ${summary.message_count}\nTime Range: ${summary.time_range}\n\n${summary.summary}`;
    };

    if (loading) {
        return (
            <div
                className="summary-overlay"
                role="button"
                tabIndex={0}
                onClick={onClose}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div
                    className="summary-panel"
                    role="button"
                    tabIndex={0}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <div className="loading">{t('summary.loading', 'Loading message summary...')}</div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="summary-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="summary-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="panel-header">
                    <div className="header-info">
                        <h2>
                            <FaRobot />
                            {t('summary.title', 'AI Message Summary')}
                        </h2>
                        <span className="subtitle">{t('summary.subtitle', 'Summarize channel conversations with AI')}</span>
                    </div>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="summary-content">
                    {/* Generator Panel */}
                    <div className="generator-section">
                        <h3>
                            <FaCompressArrowsAlt /> {t('summary.generate', 'Generate Summary')}
                        </h3>
                        <div className="generator-controls">
                            <div className="control-group">
                                <label>
                                    <FaHashtag /> Channel
                                </label>
                                <select
                                    value={selectedChannel}
                                    onChange={(e) => setSelectedChannel(Number(e.target.value))}
                                >
                                    {channels.map((channel) => (
                                        <option key={channel.id} value={channel.id}>
                                            #{channel.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="control-group">
                                <label>
                                    <FaClock /> {t('summary.timeRange', 'Time Range')}
                                </label>
                                <select
                                    value={timeRange}
                                    onChange={(e) => setTimeRange(e.target.value)}
                                >
                                    <option value="1h">Son 1 Saat</option>
                                    <option value="6h">Son 6 Saat</option>
                                    <option value="24h">Son 24 Saat</option>
                                    <option value="7d">{t('common.last7days', 'Last 7 Days')}</option>
                                    <option value="30d">{t('common.last30days', 'Last 30 Days')}</option>
                                </select>
                            </div>
                            <div className="control-group">
                                <label>
                                    <FaFileAlt /> {t('summary.maxMessages', 'Max Messages')}
                                </label>
                                <select
                                    value={messageCount}
                                    onChange={(e) => setMessageCount(Number(e.target.value))}
                                >
                                    <option value={50}>50 mesaj</option>
                                    <option value={100}>100 mesaj</option>
                                    <option value={250}>250 mesaj</option>
                                    <option value={500}>500 mesaj</option>
                                </select>
                            </div>
                            <button
                                aria-label={t('msgSummary.generateBtn', 'Generate summary')}
                                className="generate-btn"
                                onClick={generateSummary}
                                disabled={generating}
                            >
                                {generating ? (
                                    <>
                                        <FaSpinner className="spinning" />
                                        {t('summary.generating', 'Generating...')}
                                    </>
                                ) : (
                                    <>
                                        <FaRobot />
                                        {t('summary.generate', 'Generate Summary')}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Current/Latest Summary */}
                    {(currentSummary || summaries.length > 0) && (
                        <div className="summary-display">
                            <div className="summary-header">
                                <h3>
                                    <FaFileAlt />
                                    {currentSummary ? t('summary.currentSummary', 'Generated Summary') : t('summary.lastSummary', 'Last Summary')}
                                </h3>
                                <div className="summary-actions">
                                    <button
                                        aria-label={t('msgSummary.copySummary', 'Copy summary')}
                                        className="action-btn"
                                        onClick={() =>
                                            copyToClipboard(
                                                (currentSummary || summaries[0]).summary
                                            )
                                        }
                                    >
                                        <FaCopy /> Kopyala
                                    </button>
                                    <button
                                        aria-label={t('msgSummary.exportSummary', 'Export summary')}
                                        className="action-btn"
                                        onClick={() =>
                                            exportSummary(currentSummary || summaries[0])
                                        }
                                    >
                                        <FaDownload /> Aktar
                                    </button>
                                </div>
                            </div>

                            <div className="summary-meta">
                                <span className="meta-item">
                                    <FaHashtag /> #{(currentSummary || summaries[0]).channel}
                                </span>
                                <span className="meta-item">
                                    <FaClock /> {(currentSummary || summaries[0]).time_range}
                                </span>
                                <span className="meta-item">
                                    <FaFileAlt /> {(currentSummary || summaries[0]).message_count}{' '}
                                    messages
                                </span>
                                <span className="meta-item">
                                    <FaCalendar />{' '}
                                    {formatDate((currentSummary || summaries[0]).created_at)}
                                </span>
                            </div>

                            <div className="summary-body">
                                <div
                                    className="summary-text"
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                            (currentSummary || summaries[0]).summary
                                                .replace(/## /g, '<h4>')
                                                .replace(/\n\n/g, '</h4>\n')
                                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                .replace(/- /g, '• ')
                                                .replace(/\n/g, '<br/>')
                                        ),
                                    }}
                                />
                            </div>

                            <div className="summary-keywords">
                                <span className="keywords-label">Anahtar Kelimeler:</span>
                                {(currentSummary || summaries[0]).keywords.map((keyword, i) => (
                                    <span key={`item-${i}`} className="keyword-chip">
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* History Section */}
                    <div className="history-section">
                        <h3>
                            <FaChartBar /> {t('summary.history', 'Summary History')}
                        </h3>
                        <div className="history-list">
                            {summaries.map((summary) => (
                                <div
                                    key={summary.id}
                                    className={`history-item ${currentSummary?.id === summary.id ? 'active' : ''}`}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setCurrentSummary(summary)}
                                    onKeyDown={(e) =>
                                        (e.key === 'Enter' || e.key === ' ') &&
                                        e.currentTarget.click()
                                    }
                                >
                                    <div className="history-icon">
                                        <FaFileAlt />
                                    </div>
                                    <div className="history-info">
                                        <span className="history-channel">{summary.channel}</span>
                                        <span className="history-meta">
                                            {summary.message_count} messages • {summary.time_range}
                                        </span>
                                    </div>
                                    <div className="history-date">
                                        {formatDate(summary.created_at)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

MessageSummaryPanel.propTypes = {
    channelId: PropTypes.string,
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default MessageSummaryPanel;
