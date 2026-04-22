/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SlashCommandsPanel.css';
import { FaTerminal, FaCode, FaPlay, FaHistory } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

function SlashCommandsPanel({ apiBaseUrl, fetchWithAuth }) {
    const { t } = useTranslation();
    const [commands, setCommands] = useState([]);
    const [commandInput, setCommandInput] = useState('');
    const [commandArgs, setCommandArgs] = useState({});
    const [selectedCommand, setSelectedCommand] = useState(null);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCommands();
        loadHistory();
    }, []);

    const loadCommands = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/commands/list/`);
            if (response.ok) {
                const data = await response.json();
                setCommands(data.commands || []);
            }
        } catch (err) {
            logger.error('Error loading commands:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadHistory = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/commands/history/`);
            if (response.ok) {
                const data = await response.json();
                setHistory(data.history || []);
            }
        } catch (err) {
            logger.error('Error loading history:', err);
        }
    };

    const executeCommand = async (command) => {
        setLoading(true);
        setResult(null);
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/commands/${command.name}/execute/`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ args: commandArgs }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                setResult({
                    success: true,
                    output: data.output || t('slashCommands.executeSuccess'),
                });
                loadHistory();
            } else {
                const data = await response.json();
                setResult({
                    success: false,
                    output: data.error || t('slashCommands.executeFailed'),
                });
            }
        } catch (err) {
            setResult({ success: false, output: 'Network error: ' + err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleCommandSelect = (command) => {
        setSelectedCommand(command);
        setCommandInput(`/${command.name}`);
        setCommandArgs({});
        setResult(null);
    };

    const getCategoryColor = (category) => {
        const colors = {
            utility: '#5865f2',
            moderation: '#f23f42',
            fun: '#23a559',
            info: '#f0b232',
            admin: '#5865f2',
        };
        return colors[category] || '#949ba4';
    };

    return (
        <div className="slash-commands-panel">
            <div className="commands-header">
                <h2>
                    <FaTerminal /> {t('slashCommands.title')}
                </h2>
            </div>

            <div className="command-executor">
                <div className="executor-input">
                    <FaTerminal className="terminal-icon" />
                    <input
                        type="text"
                        placeholder={t('slashCommands.inputPlaceholder')}
                        value={commandInput}
                        onChange={(e) => setCommandInput(e.target.value)}
                        className="command-input"
                    />
                    {selectedCommand && (
                        <button
                            aria-label={t('slashCommands.execute', 'Execute command')}
                            className="execute-btn"
                            onClick={() => executeCommand(selectedCommand)}
                            disabled={loading}
                        >
                            <FaPlay /> {t('slashCommands.execute')}
                        </button>
                    )}
                </div>

                {result && (
                    <div className={`command-result ${result.success ? 'success' : 'error'}`}>
                        <div className="result-header">
                            {result.success
                                ? `✅ ${t('slashCommands.success')}`
                                : `❌ ${t('slashCommands.error')}`}
                        </div>
                        <div className="result-output">{result.output}</div>
                    </div>
                )}
            </div>

            {selectedCommand && selectedCommand.parameters && (
                <div className="command-params">
                    <h3>{t('slashCommands.parameters')}:</h3>
                    {selectedCommand.parameters.map((param, idx) => (
                        <div key={`item-${idx}`} className="param-input">
                            <label>
                                {param.name} {param.required && <span className="required">*</span>}
                            </label>
                            <input
                                type={param.type === 'number' ? 'number' : 'text'}
                                placeholder={param.description}
                                value={commandArgs[param.name] || ''}
                                onChange={(e) =>
                                    setCommandArgs({ ...commandArgs, [param.name]: e.target.value })
                                }
                                className="param-field"
                            />
                        </div>
                    ))}
                </div>
            )}

            <div className="commands-list">
                <h3>
                    <FaCode /> {t('slashCommands.available')} ({commands.length})
                </h3>
                {loading && commands.length === 0 ? (
                    <div className="loading">{t('common.loading')}</div>
                ) : (
                    <div className="commands-grid">
                        {commands.map((command, idx) => (
                            <div
                                key={`item-${idx}`}
                                className={`command-card ${selectedCommand?.name === command.name ? 'selected' : ''}`}
                                role="button"
                                tabIndex={0}
                                onClick={() => handleCommandSelect(command)}
                                style={{ borderLeftColor: getCategoryColor(command.category) }}
                                onKeyDown={(e) =>
                                    (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                                }
                            >
                                <div className="command-header">
                                    <div className="command-name">/{command.name}</div>
                                    <div
                                        className="command-category"
                                        style={{ background: getCategoryColor(command.category) }}
                                    >
                                        {command.category}
                                    </div>
                                </div>
                                <div className="command-description">{command.description}</div>
                                {command.usage && (
                                    <div className="command-usage">
                                        <code>{command.usage}</code>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="command-history">
                <h3>
                    <FaHistory /> {t('slashCommands.history')}
                </h3>
                {history.length === 0 ? (
                    <div className="empty-history">
                        <FaTerminal className="empty-icon" />
                        <p>{t('slashCommands.noHistory')}</p>
                    </div>
                ) : (
                    <div className="history-list">
                        {history.slice(0, 10).map((item, idx) => (
                            <div
                                key={`item-${idx}`}
                                className={`history-item ${item.success ? 'success' : 'error'}`}
                            >
                                <div className="history-command">
                                    <FaTerminal /> /{item.command}
                                </div>
                                <div className="history-time">
                                    {new Date(item.executed_at).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

SlashCommandsPanel.propTypes = {
    apiBaseUrl: PropTypes.string,
    fetchWithAuth: PropTypes.func,
};
export default SlashCommandsPanel;
