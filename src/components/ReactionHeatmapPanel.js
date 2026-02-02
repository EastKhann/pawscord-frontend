import React, { useState, useEffect } from 'react';
import './ReactionHeatmapPanel.css';
import { FaFire, FaChartBar, FaClock } from 'react-icons/fa';

function ReactionHeatmapPanel({ apiBaseUrl, fetchWithAuth, currentRoomId }) {
  const [heatmapData, setHeatmapData] = useState(null);
  const [selectedDay, setSelectedDay] = useState('');
  const [dayData, setDayData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentRoomId) {
      loadHeatmap();
    }
  }, [currentRoomId]);

  const loadHeatmap = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/rooms/${currentRoomId}/reaction_heatmap/`);
      if (response.ok) {
        const data = await response.json();
        setHeatmapData(data);
      }
    } catch (err) {
      console.error('Error loading heatmap:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadDayData = async (day) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/rooms/${currentRoomId}/reaction_heatmap/${day}/`);
      if (response.ok) {
        const data = await response.json();
        setDayData(data);
        setSelectedDay(day);
      }
    } catch (err) {
      console.error('Error loading day data:', err);
    }
  };

  const getHeatColor = (intensity) => {
    if (intensity >= 80) return '#f04747';
    if (intensity >= 60) return '#faa61a';
    if (intensity >= 40) return '#43b581';
    if (intensity >= 20) return '#5865f2';
    return '#40444b';
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  if (loading && !heatmapData) {
    return <div className="loading">Loading heatmap...</div>;
  }

  return (
    <div className="reaction-heatmap-panel">
      <div className="heatmap-header">
        <h2><FaFire /> Reaction Heatmap</h2>
      </div>

      {heatmapData && (
        <>
          <div className="heatmap-grid">
            <div className="grid-header">
              <div className="time-labels">
                {hours.map(hour => (
                  <div key={hour} className="time-label">
                    {hour.toString().padStart(2, '0')}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid-body">
              {days.map((day, dayIndex) => (
                <div key={day} className="grid-row">
                  <div className="day-label">{day}</div>
                  <div className="heat-cells">
                    {hours.map(hour => {
                      const cellData = heatmapData.data?.[dayIndex]?.[hour] || { intensity: 0, count: 0 };
                      return (
                        <div
                          key={hour}
                          className="heat-cell"
                          style={{ backgroundColor: getHeatColor(cellData.intensity) }}
                          onClick={() => loadDayData(day.toLowerCase())}
                          title={`${day} ${hour}:00 - ${cellData.count} reactions`}
                        >
                          {cellData.count > 0 && <span className="cell-count">{cellData.count}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="legend">
            <span className="legend-label">Less</span>
            <div className="legend-colors">
              <div className="legend-color" style={{ backgroundColor: '#40444b' }}></div>
              <div className="legend-color" style={{ backgroundColor: '#5865f2' }}></div>
              <div className="legend-color" style={{ backgroundColor: '#43b581' }}></div>
              <div className="legend-color" style={{ backgroundColor: '#faa61a' }}></div>
              <div className="legend-color" style={{ backgroundColor: '#f04747' }}></div>
            </div>
            <span className="legend-label">More</span>
          </div>
        </>
      )}

      {dayData && (
        <div className="day-details">
          <h3><FaClock /> {selectedDay.toUpperCase()} - Hourly Breakdown</h3>
          <div className="hourly-chart">
            {dayData.hours && dayData.hours.map((hourData, i) => (
              <div key={i} className="hour-bar">
                <div className="bar-fill" style={{ height: `${hourData.percentage}%` }}>
                  <span className="bar-value">{hourData.count}</span>
                </div>
                <div className="bar-label">{i}h</div>
              </div>
            ))}
          </div>
          {dayData.top_emojis && (
            <div className="top-emojis">
              <h4>🔥 Top Reactions</h4>
              <div className="emoji-list">
                {dayData.top_emojis.map((emoji, i) => (
                  <div key={i} className="emoji-item">
                    <span className="emoji">{emoji.emoji}</span>
                    <span className="emoji-count">{emoji.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ReactionHeatmapPanel;
