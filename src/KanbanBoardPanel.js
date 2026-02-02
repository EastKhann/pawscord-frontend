import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './KanbanBoardPanel.css';

/**
 * KanbanBoardPanel Component
 * Trello-like kanban board with drag-and-drop functionality
 * @component
 */
const KanbanBoardPanel = ({ serverId, onClose }) => {
  const [board, setBoard] = useState(null);
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showColumnForm, setShowColumnForm] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [cardComments, setCardComments] = useState([]);
  const [cardAttachments, setCardAttachments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchBoard();
  }, [serverId]);

  /**
   * Fetch kanban board data
   */
  const fetchBoard = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/kanban/board/${serverId}/`, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBoard(data);
        setColumns(data.columns || []);
      } else {
        // Create new board if doesn't exist
        await createBoard();
      }
    } catch (err) {
      console.error('Failed to fetch board:', err);
      showToast('Failed to load board', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Create new board
   */
  const createBoard = async () => {
    try {
      const response = await fetch('/api/kanban/board/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          server_id: serverId,
          name: 'Project Board'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setBoard(data);
        setColumns([]);
      }
    } catch (err) {
      console.error('Failed to create board:', err);
    }
  };

  /**
   * Add new column
   */
  const addColumn = async () => {
    if (!newColumnTitle.trim()) return;

    try {
      const response = await fetch('/api/kanban/column/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          board_id: board.id,
          title: newColumnTitle,
          position: columns.length
        })
      });

      if (response.ok) {
        const newColumn = await response.json();
        setColumns([...columns, { ...newColumn, cards: [] }]);
        setNewColumnTitle('');
        setShowColumnForm(false);
        showToast('Column added', 'success');
      }
    } catch (err) {
      console.error('Failed to add column:', err);
      showToast('Failed to add column', 'error');
    }
  };

  /**
   * Update column title
   */
  const updateColumnTitle = async (columnId, newTitle) => {
    try {
      const response = await fetch(`/api/kanban/column/${columnId}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTitle })
      });

      if (response.ok) {
        setColumns(columns.map(col => 
          col.id === columnId ? { ...col, title: newTitle } : col
        ));
        showToast('Column updated', 'success');
      }
    } catch (err) {
      console.error('Failed to update column:', err);
      showToast('Failed to update column', 'error');
    }
  };

  /**
   * Delete column
   */
  const deleteColumn = async (columnId) => {
    if (!window.confirm('Delete this column and all its cards?')) return;

    try {
      const response = await fetch(`/api/kanban/column/${columnId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setColumns(columns.filter(col => col.id !== columnId));
        showToast('Column deleted', 'success');
      }
    } catch (err) {
      console.error('Failed to delete column:', err);
      showToast('Failed to delete column', 'error');
    }
  };

  /**
   * Add new card
   */
  const addCard = async (columnId, title) => {
    if (!title.trim()) return;

    try {
      const response = await fetch('/api/kanban/card/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          column_id: columnId,
          title: title,
          position: columns.find(col => col.id === columnId)?.cards?.length || 0
        })
      });

      if (response.ok) {
        const newCard = await response.json();
        setColumns(columns.map(col => 
          col.id === columnId 
            ? { ...col, cards: [...(col.cards || []), newCard] }
            : col
        ));
        showToast('Card added', 'success');
      }
    } catch (err) {
      console.error('Failed to add card:', err);
      showToast('Failed to add card', 'error');
    }
  };

  /**
   * Update card
   */
  const updateCard = async (cardId, updates) => {
    try {
      const response = await fetch(`/api/kanban/card/${cardId}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        const updatedCard = await response.json();
        setColumns(columns.map(col => ({
          ...col,
          cards: col.cards?.map(card => 
            card.id === cardId ? updatedCard : card
          )
        })));
        if (selectedCard?.id === cardId) {
          setSelectedCard(updatedCard);
        }
        showToast('Card updated', 'success');
      }
    } catch (err) {
      console.error('Failed to update card:', err);
      showToast('Failed to update card', 'error');
    }
  };

  /**
   * Delete card
   */
  const deleteCard = async (cardId) => {
    if (!window.confirm('Delete this card?')) return;

    try {
      const response = await fetch(`/api/kanban/card/${cardId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setColumns(columns.map(col => ({
          ...col,
          cards: col.cards?.filter(card => card.id !== cardId)
        })));
        setShowCardModal(false);
        showToast('Card deleted', 'success');
      }
    } catch (err) {
      console.error('Failed to delete card:', err);
      showToast('Failed to delete card', 'error');
    }
  };

  /**
   * Handle drag end
   */
  const onDragEnd = async (result) => {
    const { source, destination, type } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    if (type === 'column') {
      const newColumns = Array.from(columns);
      const [removed] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, removed);
      setColumns(newColumns);
      
      // Update positions on server
      await updateColumnPositions(newColumns);
    } else {
      const sourceColumn = columns.find(col => col.id.toString() === source.droppableId);
      const destColumn = columns.find(col => col.id.toString() === destination.droppableId);

      if (!sourceColumn || !destColumn) return;

      const sourceCards = Array.from(sourceColumn.cards || []);
      const destCards = sourceColumn === destColumn ? sourceCards : Array.from(destColumn.cards || []);

      const [movedCard] = sourceCards.splice(source.index, 1);

      if (sourceColumn === destColumn) {
        sourceCards.splice(destination.index, 0, movedCard);
        setColumns(columns.map(col => 
          col.id === sourceColumn.id ? { ...col, cards: sourceCards } : col
        ));
      } else {
        destCards.splice(destination.index, 0, movedCard);
        setColumns(columns.map(col => {
          if (col.id === sourceColumn.id) return { ...col, cards: sourceCards };
          if (col.id === destColumn.id) return { ...col, cards: destCards };
          return col;
        }));
      }

      // Update card position and column on server
      await updateCard(movedCard.id, {
        column_id: destColumn.id,
        position: destination.index
      });
    }
  };

  /**
   * Update column positions
   */
  const updateColumnPositions = async (newColumns) => {
    try {
      await Promise.all(newColumns.map((col, index) => 
        fetch(`/api/kanban/column/${col.id}/`, {
          method: 'PUT',
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ position: index })
        })
      ));
    } catch (err) {
      console.error('Failed to update positions:', err);
    }
  };

  /**
   * Open card details modal
   */
  const openCardModal = async (card) => {
    setSelectedCard(card);
    setShowCardModal(true);
    
    // Fetch comments and attachments
    await Promise.all([
      fetchCardComments(card.id),
      fetchCardAttachments(card.id)
    ]);
  };

  /**
   * Fetch card comments
   */
  const fetchCardComments = async (cardId) => {
    try {
      const response = await fetch(`/api/kanban/card/${cardId}/comments/`, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCardComments(data.comments || []);
      }
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    }
  };

  /**
   * Fetch card attachments
   */
  const fetchCardAttachments = async (cardId) => {
    try {
      const response = await fetch(`/api/kanban/card/${cardId}/attachments/`, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCardAttachments(data.attachments || []);
      }
    } catch (err) {
      console.error('Failed to fetch attachments:', err);
    }
  };

  /**
   * Add comment to card
   */
  const addComment = async () => {
    if (!newComment.trim() || !selectedCard) return;

    try {
      const response = await fetch(`/api/kanban/card/${selectedCard.id}/comment/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: newComment })
      });

      if (response.ok) {
        const comment = await response.json();
        setCardComments([...cardComments, comment]);
        setNewComment('');
        showToast('Comment added', 'success');
      }
    } catch (err) {
      console.error('Failed to add comment:', err);
      showToast('Failed to add comment', 'error');
    }
  };

  /**
   * Upload attachment
   */
  const uploadAttachment = async (file) => {
    if (!selectedCard) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('card_id', selectedCard.id);

    try {
      const response = await fetch('/api/kanban/attachment/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (response.ok) {
        const attachment = await response.json();
        setCardAttachments([...cardAttachments, attachment]);
        showToast('Attachment uploaded', 'success');
      }
    } catch (err) {
      console.error('Failed to upload attachment:', err);
      showToast('Failed to upload attachment', 'error');
    }
  };

  /**
   * Show toast notification
   */
  const showToast = (message, type) => {
    console.log(`[${type}] ${message}`);
  };

  if (isLoading) {
    return (
      <div className="kanban-board-panel loading">
        <i className="fas fa-spinner fa-spin"></i>
        <p>Loading board...</p>
      </div>
    );
  }

  return (
    <div className="kanban-board-panel">
      <div className="panel-header">
        <h2>
          <i className="fas fa-columns"></i>
          Kanban Board
        </h2>
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
            <div 
              className="board-columns"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columns.map((column, index) => (
                <Draggable 
                  key={column.id} 
                  draggableId={column.id.toString()} 
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="kanban-column"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div className="column-header" {...provided.dragHandleProps}>
                        <input
                          type="text"
                          className="column-title-input"
                          value={column.title}
                          onChange={(e) => {
                            const newTitle = e.target.value;
                            setColumns(columns.map(col => 
                              col.id === column.id ? { ...col, title: newTitle } : col
                            ));
                          }}
                          onBlur={(e) => updateColumnTitle(column.id, e.target.value)}
                        />
                        <span className="card-count">{column.cards?.length || 0}</span>
                        <button 
                          className="btn-delete-column"
                          onClick={() => deleteColumn(column.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>

                      <Droppable droppableId={column.id.toString()} type="card">
                        {(provided, snapshot) => (
                          <div
                            className={`cards-container ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {(column.cards || []).map((card, index) => (
                              <Draggable
                                key={card.id}
                                draggableId={card.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    className="kanban-card"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    onClick={() => openCardModal(card)}
                                  >
                                    <div className="card-title">{card.title}</div>
                                    {card.description && (
                                      <div className="card-description">{card.description}</div>
                                    )}
                                    <div className="card-footer">
                                      {card.assigned_users?.length > 0 && (
                                        <div className="card-assignees">
                                          {card.assigned_users.slice(0, 3).map(user => (
                                            <div key={user.id} className="assignee-avatar" title={user.username}>
                                              {user.avatar ? (
                                                <img src={user.avatar} alt={user.username} />
                                              ) : (
                                                <span>{user.username[0]}</span>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                      {card.due_date && (
                                        <div className="card-due-date">
                                          <i className="fas fa-clock"></i>
                                          {new Date(card.due_date).toLocaleDateString()}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>

                      <div className="add-card-container">
                        <input
                          type="text"
                          className="add-card-input"
                          placeholder="+ Add card"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addCard(column.id, e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}

              <div className="add-column-container">
                {showColumnForm ? (
                  <div className="column-form">
                    <input
                      type="text"
                      className="column-title-input"
                      placeholder="Column title..."
                      value={newColumnTitle}
                      onChange={(e) => setNewColumnTitle(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addColumn()}
                      autoFocus
                    />
                    <div className="form-buttons">
                      <button className="btn-add" onClick={addColumn}>
                        Add
                      </button>
                      <button 
                        className="btn-cancel"
                        onClick={() => {
                          setShowColumnForm(false);
                          setNewColumnTitle('');
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    className="btn-add-column"
                    onClick={() => setShowColumnForm(true)}
                  >
                    <i className="fas fa-plus"></i>
                    Add Column
                  </button>
                )}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Card Details Modal */}
      {showCardModal && selectedCard && (
        <div className="modal-overlay" onClick={() => setShowCardModal(false)}>
          <div className="card-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <input
                type="text"
                className="modal-title-input"
                value={selectedCard.title}
                onChange={(e) => setSelectedCard({ ...selectedCard, title: e.target.value })}
                onBlur={(e) => updateCard(selectedCard.id, { title: e.target.value })}
              />
              <button className="modal-close" onClick={() => setShowCardModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-content">
              <div className="modal-section">
                <h3><i className="fas fa-align-left"></i> Description</h3>
                <textarea
                  className="description-textarea"
                  placeholder="Add a description..."
                  value={selectedCard.description || ''}
                  onChange={(e) => setSelectedCard({ ...selectedCard, description: e.target.value })}
                  onBlur={(e) => updateCard(selectedCard.id, { description: e.target.value })}
                />
              </div>

              <div className="modal-section">
                <h3><i className="fas fa-paperclip"></i> Attachments ({cardAttachments.length})</h3>
                <div className="attachments-list">
                  {cardAttachments.map(att => (
                    <div key={att.id} className="attachment-item">
                      <i className="fas fa-file"></i>
                      <a href={att.url} target="_blank" rel="noopener noreferrer">
                        {att.filename}
                      </a>
                    </div>
                  ))}
                </div>
                <label className="btn-upload">
                  <i className="fas fa-upload"></i>
                  Upload
                  <input 
                    type="file"
                    onChange={(e) => e.target.files[0] && uploadAttachment(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              <div className="modal-section">
                <h3><i className="fas fa-comments"></i> Comments ({cardComments.length})</h3>
                <div className="comments-list">
                  {cardComments.map(comment => (
                    <div key={comment.id} className="comment-item">
                      <div className="comment-author">{comment.author?.username}</div>
                      <div className="comment-text">{comment.text}</div>
                      <div className="comment-time">
                        {new Date(comment.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="add-comment">
                  <textarea
                    className="comment-input"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button className="btn-comment" onClick={addComment}>
                    Post
                  </button>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn-delete-card" onClick={() => deleteCard(selectedCard.id)}>
                  <i className="fas fa-trash"></i>
                  Delete Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoardPanel;
