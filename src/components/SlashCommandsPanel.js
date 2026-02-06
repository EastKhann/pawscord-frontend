import React, { useState, useEffect } from 'react';
import './SlashCommandsPanel.css';
import { FaTerminal, FaCode, FaPlay, FaHistory } from 'react-icons/fa';

function SlashCommandsPanel({ apiBaseUrl, fetchWithAuth }) {
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
      console.error('Error loading commands:', err);
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
      console.error('Error loading history:', err);
    }
  };

  const executeCommand = async (command) => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/commands/${command.name}/execute/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ args: commandArgs })
      });

      if (response.ok) {
        const data = await response.json();
        setResult({ success: true, output: data.output || 'Command executed successfully!' });
        loadHistory();
      } else {
        const data = await response.json();
        setResult({ success: false, output: data.error || 'Command failed' });
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
      moderation: '#f04747',
      fun: '#43b581',
      info: '#faa61a',
      admin: '#7289da'
    };
    return colors[category] || '#72767d';
  };

  return (
    <div className="slash-commands-panel">
      <div className="commands-header">
        <h2><FaTerminal /> Slash Commands</h2>
      </div>

      <div className="command-executor">
        <div className="executor-input">
          <FaTerminal className="terminal-icon" />
          <input
            type="text"
            placeholder="Type / to see available commands..."
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            className="command-input"
          />
          {selectedCommand && (
            <button
              className="execute-btn"
              onClick={() => executeCommand(selectedCommand)}
              disabled={loading}
            >
              <FaPlay /> Execute
            </button>
          )}
        </div>

        {result && (
          <div className={`command-result ${result.success ? 'success' : 'error'}`}>
            <div className="result-header">
              {result.success ? '✅ Success' : '❌ Error'}
            </div>
            <div className="result-output">{result.output}</div>
          </div>
        )}
      </div>

      {selectedCommand && selectedCommand.parameters && (
        <div className="command-params">
          <h3>Parameters:</h3>
          {selectedCommand.parameters.map((param, idx) => (
            <div key={idx} className="param-input">
              <label>
                {param.name} {param.required && <span className="required">*</span>}
              </label>
              <input
                type={param.type === 'number' ? 'number' : 'text'}
                placeholder={param.description}
                value={commandArgs[param.name] || ''}
                onChange={(e) => setCommandArgs({...commandArgs, [param.name]: e.target.value})}
                className="param-field"
              />
            </div>
          ))}
        </div>
      )}

      <div className="commands-list">
        <h3><FaCode /> Available Commands ({commands.length})</h3>
        {loading && commands.length === 0 ? (
          <div className="loading">Loading commands...</div>
        ) : (
          <div className="commands-grid">
            {commands.map((command, idx) => (
              <div
                key={idx}
                className={`command-card ${selectedCommand?.name === command.name ? 'selected' : ''}`}
                onClick={() => handleCommandSelect(command)}
                style={{ borderLeftColor: getCategoryColor(command.category) }}
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
        <h3><FaHistory /> Command History</h3>
        {history.length === 0 ? (
          <div className="empty-history">
            <FaTerminal className="empty-icon" />
            <p>No commands executed yet</p>
          </div>
        ) : (
          <div className="history-list">
            {history.slice(0, 10).map((item, idx) => (
              <div key={idx} className={`history-item ${item.success ? 'success' : 'error'}`}>
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

export default SlashCommandsPanel;
