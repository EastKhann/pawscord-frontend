import React, { useState, useEffect } from 'react';
import './KanbanBoardPanel.css';
import { FaTrello, FaPlus, FaTrash, FaEdit, FaArrowRight, FaPaperclip, FaComment, FaUser } from 'react-icons/fa';

function KanbanBoardPanel({ apiBaseUrl, fetchWithAuth, currentRoomSlug }) {
  const [board, setBoard] = useState(null);
  const [columns, setColumns] = useState([]);
  const [newColumnName, setNewColumnName] = useState('');
  const [newCardTitle, setNewCardTitle] = useState('');
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (currentRoomSlug) {
      loadBoard();
    }
  }, [currentRoomSlug]);

  const loadBoard = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/kanban/${currentRoomSlug}/`);
      if (response.ok) {
        const data = await response.json();
        setBoard(data);
        setColumns(data.columns || []);
      }
    } catch (err) {
      console.error('Error loading board:', err);
    } finally {
      setLoading(false);
    }
  };

  const createColumn = async () => {
    if (!newColumnName.trim()) {
      setMessage('❌ Please enter column name');
      return;
    }

    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/kanban/columns/create/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_slug: currentRoomSlug,
          name: newColumnName,
          position: columns.length
        })
      });

      if (response.ok) {
        setMessage('✅ Column created!');
        setNewColumnName('');
        loadBoard();
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Failed to create column'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    }
  };

  const updateColumn = async (columnId, updates) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/kanban/columns/${columnId}/update/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        setMessage('✅ Column updated!');
        loadBoard();
      }
    } catch (err) {
      setMessage('❌ Failed to update column');
    }
  };

  const deleteColumn = async (columnId) => {
    if (!window.confirm('Delete this column and all its cards?')) return;

    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/kanban/columns/${columnId}/delete/`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setMessage('✅ Column deleted!');
        loadBoard();
      }
    } catch (err) {
      setMessage('❌ Failed to delete column');
    }
  };

  const createCard = async (columnId) => {
    if (!newCardTitle.trim()) {
      setMessage('❌ Please enter card title');
      return;
    }

    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/kanban/cards/create/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          column_id: columnId,
          title: newCardTitle,
          position: 0
        })
      });

      if (response.ok) {
        setMessage('✅ Card created!');
        setNewCardTitle('');
        setSelectedColumn(null);
        loadBoard();
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Failed to create card'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    }
  };

  const updateCard = async (cardId, updates) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/kanban/cards/${cardId}/update/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        setMessage('✅ Card updated!');
        loadBoard();
      }
    } catch (err) {
      setMessage('❌ Failed to update card');
    }
  };

  const deleteCard = async (cardId) => {
    if (!window.confirm('Delete this card?')) return;

    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/kanban/cards/${cardId}/delete/`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setMessage('✅ Card deleted!');
        loadBoard();
      }
    } catch (err) {
      setMessage('❌ Failed to delete card');
    }
  };

  const moveCard = async (cardId, targetColumnId, targetPosition) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/kanban/cards/move/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          card_id: cardId,
          target_column_id: targetColumnId,
          target_position: targetPosition
        })
      });

      if (response.ok) {
        loadBoard();
      }
    } catch (err) {
      setMessage('❌ Failed to move card');
    }
  };

  const assignUser = async (cardId, username) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/kanban/cards/${cardId}/assign/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });

      if (response.ok) {
        setMessage('✅ User assigned!');
        loadBoard();
      }
    } catch (err) {
      setMessage('❌ Failed to assign user');
    }
  };

  return (
    <div className="kanban-board-panel">
      <div className="kanban-header">
        <h2><FaTrello /> Kanban Board</h2>
        <div className="header-actions">
          <input
            type="text"
            placeholder="New column name..."
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
            className="column-input"
          />
          <button className="add-column-btn" onClick={createColumn}>
            <FaPlus /> Add Column
          </button>
        </div>
      </div>

      {message && <div className="kanban-message">{message}</div>}

      {loading && !board ? (
        <div className="loading">Loading board...</div>
      ) : (
        <div className="kanban-columns">
          {columns.map(column => (
            <div key={column.id} className="kanban-column">
              <div className="column-header">
                <h3>{column.name}</h3>
                <div className="column-actions">
                  <button
                    className="icon-btn"
                    onClick={() => setSelectedColumn(column.id)}
                    title="Add card"
                  >
                    <FaPlus />
                  </button>
                  <button
                    className="icon-btn danger"
                    onClick={() => deleteColumn(column.id)}
                    title="Delete column"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {selectedColumn === column.id && (
                <div className="add-card-form">
                  <input
                    type="text"
                    placeholder="Card title..."
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                    className="card-input"
                    onKeyPress={(e) => e.key === 'Enter' && createCard(column.id)}
                  />
                  <div className="form-actions">
                    <button className="create-btn" onClick={() => createCard(column.id)}>
                      Create
                    </button>
                    <button className="cancel-btn" onClick={() => setSelectedColumn(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="cards-list">
                {column.cards && column.cards.map(card => (
                  <div
                    key={card.id}
                    className="kanban-card"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('cardId', card.id)}
                  >
                    <div className="card-title">{card.title}</div>
                    {card.description && (
                      <div className="card-description">{card.description}</div>
                    )}
                    <div className="card-meta">
                      {card.assignees && card.assignees.length > 0 && (
                        <div className="card-assignees">
                          <FaUser />
                          <span>{card.assignees.length}</span>
                        </div>
                      )}
                      {card.comments_count > 0 && (
                        <div className="card-comments">
                          <FaComment />
                          <span>{card.comments_count}</span>
                        </div>
                      )}
                      {card.attachments_count > 0 && (
                        <div className="card-attachments">
                          <FaPaperclip />
                          <span>{card.attachments_count}</span>
                        </div>
                      )}
                    </div>
                    <div className="card-actions">
                      <button
                        className="edit-card-btn"
                        onClick={() => setSelectedCard(card)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="delete-card-btn"
                        onClick={() => deleteCard(card.id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {columns.length === 0 && (
            <div className="empty-board">
              <FaTrello className="empty-icon" />
              <h3>No Columns Yet</h3>
              <p>Create your first column to get started!</p>
            </div>
          )}
        </div>
      )}

      <div className="kanban-info">
        <h4>🎯 Kanban Board Features</h4>
        <ul>
          <li>Drag and drop cards between columns</li>
          <li>Assign team members to cards</li>
          <li>Add comments and attachments</li>
          <li>Track progress with visual workflows</li>
          <li>Perfect for agile project management</li>
        </ul>
      </div>
    </div>
  );
}

export default KanbanBoardPanel;
