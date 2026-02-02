import React, { useState, useEffect } from 'react';
import './ChangelogPanel.css';
import { FaNewspaper, FaFilter, FaBug, FaStar, FaWrench, FaCalendar } from 'react-icons/fa';

function ChangelogPanel({ apiBaseUrl, fetchWithAuth }) {
  const [changes, setChanges] = useState([]);
  const [selectedModel, setSelectedModel] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);

  const typeIcons = {
    new: <FaStar className="type-icon new" />,
    fix: <FaBug className="type-icon fix" />,
    improvement: <FaWrench className="type-icon improvement" />
  };

  useEffect(() => {
    loadChanges();
    loadModels();
  }, [selectedModel]);

  const loadChanges = async () => {
    setLoading(true);
    try {
      const url = selectedModel === 'all' 
        ? `${apiBaseUrl}/api/changelog/`
        : `${apiBaseUrl}/api/changelog/${selectedModel}/`;
      
      const response = await fetchWithAuth(url);
      if (response.ok) {
        const data = await response.json();
        setChanges(data.changes || []);
      }
    } catch (err) {
      console.error('Error loading changelog:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadModels = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/changelog/models/`);
      if (response.ok) {
        const data = await response.json();
        setModels(data.models || []);
      }
    } catch (err) {
      console.error('Error loading models:', err);
    }
  };

  const filteredChanges = selectedType === 'all' 
    ? changes 
    : changes.filter(c => c.change_type === selectedType);

  const groupedByDate = filteredChanges.reduce((groups, change) => {
    const date = new Date(change.created_at).toLocaleDateString();
    if (!groups[date]) groups[date] = [];
    groups[date].push(change);
    return groups;
  }, {});

  return (
    <div className="changelog-panel">
      <div className="changelog-header">
        <h2><FaNewspaper /> Changelog</h2>
      </div>

      <div className="changelog-filters">
        <div className="filter-group">
          <label>Model:</label>
          <select 
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Models</option>
            {models.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Type:</label>
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="new">New Features</option>
            <option value="fix">Bug Fixes</option>
            <option value="improvement">Improvements</option>
          </select>
        </div>
      </div>

      <div className="changelog-timeline">
        {loading ? (
          <div className="loading">Loading changelog...</div>
        ) : Object.keys(groupedByDate).length === 0 ? (
          <div className="empty-changelog">
            <FaNewspaper className="empty-icon" />
            <p>No changelog entries found</p>
          </div>
        ) : (
          Object.entries(groupedByDate).map(([date, dateChanges]) => (
            <div key={date} className="date-group">
              <div className="date-header">
                <FaCalendar />
                <h3>{date}</h3>
              </div>
              <div className="changes-list">
                {dateChanges.map((change, idx) => (
                  <div key={idx} className={`change-item ${change.change_type}`}>
                    <div className="change-icon">
                      {typeIcons[change.change_type]}
                    </div>
                    <div className="change-content">
                      <div className="change-header">
                        <span className={`change-badge ${change.change_type}`}>
                          {change.change_type.toUpperCase()}
                        </span>
                        {change.model_name && (
                          <span className="change-model">{change.model_name}</span>
                        )}
                        {change.version && (
                          <span className="change-version">v{change.version}</span>
                        )}
                      </div>
                      <div className="change-description">{change.description}</div>
                      {change.details && (
                        <div className="change-details">{change.details}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ChangelogPanel;
