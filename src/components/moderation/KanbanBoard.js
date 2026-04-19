/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-autofocus */
// frontend/src/components/KanbanBoard.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FaPlus, FaTrash, FaEllipsisH, FaPencilAlt } from 'react-icons/fa';
import KanbanCardModal from './KanbanCardModal';
import confirmDialog from '../../utils/confirmDialog';

import { useTranslation } from 'react-i18next';

const S = {
    flex7: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#ffffff10',
        color: '#f2f3f5',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    size: { minWidth: '280px' },
    bg4: { background: 'transparent', color: '#bbb', border: 'none', cursor: 'pointer' },
    bg3: {
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '3px',
        cursor: 'pointer',
    },
    bg2: {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#0d0e10',
        color: 'white',
        resize: 'none',
        boxSizing: 'border-box',
    },
    flex6: { display: 'flex', gap: '10px', marginTop: '8px', fontSize: '0.8em', color: '#949ba4' },
    bg: { background: 'transparent', border: 'none', color: '#b5bac1', cursor: 'pointer' },
    txt2: { color: '#949ba4', fontSize: '0.8em' },
    txt: { margin: 0, color: '#f2f3f5', fontSize: '1em', fontWeight: 'bold', cursor: 'text' },
    flex5: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
        padding: '0 5px',
        cursor: 'grab',
    },
    flex4: {
        backgroundColor: '#111214',
        padding: '10px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '80vh',
    },
    flex3: { display: 'flex', flexDirection: 'column', minWidth: '280px', maxWidth: '280px' },
    flex2: { display: 'flex', gap: '15px' },
    flex: {
        display: 'flex',
        height: '100%',
        overflowX: 'auto',
        padding: '20px',
        gap: '15px',
        backgroundColor: '#17191c',
    },
};

const KanbanBoard = ({ roomSlug, apiBaseUrl, fetchWithAuth }) => {
    const { t } = useTranslation();
    const [columns, setColumns] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newCardContent, setNewCardContent] = useState('');
    const [addingToCol, setAddingToCol] = useState(null); // Hangi kolona addniyor?

    // Modal State
    const [selectedCard, setSelectedCard] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedColumnTitle, setSelectedColumnTitle] = useState('');

    useEffect(() => {
        fetchBoard();
    }, [roomSlug]);

    const fetchBoard = async () => {
        const res = await fetchWithAuth(`${apiBaseUrl}/kanban/${roomSlug}/`);
        if (res.ok) {
            const data = await res.json();
            // Backend'den { board_id, title, columns } gelir
            setColumns(data.columns || []);
        }
    };

    const handleAddCard = async (colId) => {
        if (!newCardContent.trim()) {
            setAddingToCol(null);
            return;
        }

        // Backend'e gönder
        const res = await fetchWithAuth(`${apiBaseUrl}/kanban/cards/create/`, {
            method: 'POST',
            body: JSON.stringify({
                column_id: colId,
                content: newCardContent,
            }),
        });

        if (res.ok) {
            await fetchBoard();
        }

        setNewCardContent('');
        setAddingToCol(null);
    };

    const onDragEnd = async (result) => {
        if (!result.destination) return;
        const { source, destination, draggableId, type } = result;

        if (type === 'COLUMN') {
            // Kolon sort
            const newCols = Array.from(columns);
            const [moved] = newCols.splice(source.index, 1);
            newCols.splice(destination.index, 0, moved);
            setColumns(newCols);

            await fetchWithAuth(`${apiBaseUrl}/kanban/columns/move/`, {
                method: 'POST',
                body: JSON.stringify({
                    column_id: draggableId,
                    new_index: destination.index,
                }),
            });
            return;
        }

        // Kart sort
        const sourceColIndex = columns.findIndex((c) => c.id.toString() === source.droppableId);
        const destColIndex = columns.findIndex((c) => c.id.toString() === destination.droppableId);

        const sourceCol = columns[sourceColIndex];
        const destCol = columns[destColIndex];

        const sourceCards = Array.from(sourceCol.cards || []);
        const destCards = Array.from(destCol.cards || []);

        if (source.droppableId === destination.droppableId) {
            // Aynı kolon içi kart hareketi (Backend şu an desteklemiyor ama UI daycel kalsın)
            // Kart içi sort backendde henüz yok, o yüzden state update yapıp bırakıyoruz
            const [moved] = sourceCards.splice(source.index, 1);
            sourceCards.splice(destination.index, 0, moved);
            const newCols = [...columns];
            newCols[sourceColIndex] = { ...sourceCol, cards: sourceCards };
            setColumns(newCols);
        } else {
            // Farklı kolon
            const [moved] = sourceCards.splice(source.index, 1);
            destCards.splice(destination.index, 0, moved);

            const newCols = [...columns];
            newCols[sourceColIndex] = { ...sourceCol, cards: sourceCards };
            newCols[destColIndex] = { ...destCol, cards: destCards };
            setColumns(newCols);

            // Backend'e gönder (Kartı update et ve yeni kolonunu set et)
            await fetchWithAuth(`${apiBaseUrl}/kanban/cards/update/`, {
                method: 'POST',
                body: JSON.stringify({
                    card_id: draggableId,
                    column_id: destCol.id,
                }),
            });
        }
    };

    // --- Modal Actions ---
    const openCardModal = (card, columnTitle) => {
        setSelectedCard(card);
        setSelectedColumnTitle(columnTitle);
        setIsModalOpen(true);
    };

    const handleSaveCard = async (updatedCard) => {
        // Optimistic update
        const newCols = columns.map((col) => ({
            ...col,
            cards: col.cards.map((c) => (c.id === updatedCard.id ? updatedCard : c)),
        }));
        setColumns(newCols);

        await fetchWithAuth(`${apiBaseUrl}/kanban/cards/update/`, {
            method: 'POST',
            body: JSON.stringify({
                card_id: updatedCard.id,
                content: updatedCard.content,
                description: updatedCard.description,
                due_date: updatedCard.due_date,
                labels: updatedCard.labels,
                checklist: updatedCard.checklist,
                // assigned_usernames logic addnebilir
            }),
        });
        fetchBoard(); // Refresh to be safe
    };

    const handleDeleteCard = async () => {
        if (!selectedCard) return;
        if (!(await confirmDialog(t('kanban.confirmDeleteCard')))) return;

        await fetchWithAuth(`${apiBaseUrl}/kanban/cards/${selectedCard.id}/delete/`, {
            method: 'DELETE',
        });
        setIsModalOpen(false);
        fetchBoard();
    };

    // --- Column Actions ---
    const handleCreateColumn = async () => {
        const title = prompt(t('kanban.newColumnTitle'));
        if (!title) return;

        await fetchWithAuth(`${apiBaseUrl}/kanban/columns/create/`, {
            method: 'POST',
            body: JSON.stringify({ room_slug: roomSlug, title }),
        });
        fetchBoard();
    };

    const handleDeleteColumn = async (colId) => {
        if (!(await confirmDialog(t('kanban.confirmDeleteColumn')))) return;
        await fetchWithAuth(`${apiBaseUrl}/kanban/columns/${colId}/delete/`, { method: 'DELETE' });
        fetchBoard();
    };

    const handleRenameColumn = async (col) => {
        const newTitle = prompt(t('kanban.renameColumn'), col.title);
        if (newTitle && newTitle !== col.title) {
            await fetchWithAuth(`${apiBaseUrl}/kanban/columns/update/`, {
                method: 'POST',
                body: JSON.stringify({ column_id: col.id, title: newTitle }),
            });
            fetchBoard();
        }
    };

    return (
        <div style={S.flex}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="board" type="COLUMN" direction="horizontal">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} style={S.flex2}>
                            {columns.map((col, index) => (
                                <Draggable
                                    key={col.id}
                                    draggableId={col.id.toString()}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            style={{ ...S.flex3, ...provided.draggableProps.style }}
                                        >
                                            <div style={S.flex4}>
                                                {/* Column Header */}
                                                <div {...provided.dragHandleProps} style={S.flex5}>
                                                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                                                    <h3
                                                        onClick={() => handleRenameColumn(col)}
                                                        style={S.txt}
                                                        title="Yeniden adlandırmak için tıkla"
                                                    >
                                                        {col.title}{' '}
                                                        <span style={S.txt2}>
                                                            ({(col.cards || []).length})
                                                        </span>
                                                    </h3>
                                                    <button
                                                        aria-label="Delete"
                                                        onClick={() => handleDeleteColumn(col.id)}
                                                        style={S.bg}
                                                    >
                                                        <FaTrash size={12} />
                                                    </button>
                                                </div>

                                                {/* Cards Droppable */}
                                                <Droppable
                                                    droppableId={col.id.toString()}
                                                    type="CARD"
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.droppableProps}
                                                            style={{
                                                                flexGrow: 1,
                                                                minHeight: '50px',
                                                                overflowY: 'auto',
                                                                backgroundColor:
                                                                    snapshot.isDraggingOver
                                                                        ? 'rgba(255,255,255,0.05)'
                                                                        : 'transparent',
                                                                transition: 'background-color 0.2s',
                                                                padding: '2px',
                                                            }}
                                                        >
                                                            {(col.cards || []).map(
                                                                (card, cardIndex) => (
                                                                    <Draggable
                                                                        key={card.id}
                                                                        draggableId={card.id.toString()}
                                                                        index={cardIndex}
                                                                    >
                                                                        {(provided, snapshot) => (
                                                                            <div
                                                                                ref={
                                                                                    provided.innerRef
                                                                                }
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                role="button"
                                                                                tabIndex={0}
                                                                                onClick={() =>
                                                                                    openCardModal(
                                                                                        card,
                                                                                        col.title
                                                                                    )
                                                                                }
                                                                                style={{
                                                                                    userSelect:
                                                                                        'none',
                                                                                    padding: '10px',
                                                                                    marginBottom:
                                                                                        '8px',
                                                                                    backgroundColor:
                                                                                        snapshot.isDragging
                                                                                            ? '#1e2024'
                                                                                            : '#111214',
                                                                                    borderRadius:
                                                                                        '4px',
                                                                                    color: '#dbdee1',
                                                                                    boxShadow:
                                                                                        '0 1px 0 rgba(0,0,0,0.25)',
                                                                                    border: '1px solid #0b0e1b',
                                                                                    cursor: 'pointer',
                                                                                    ...provided
                                                                                        .draggableProps
                                                                                        .style,
                                                                                }}
                                                                                onKeyDown={(e) =>
                                                                                    (e.key ===
                                                                                        'Enter' ||
                                                                                        e.key ===
                                                                                            ' ') &&
                                                                                    e.currentTarget.click()
                                                                                }
                                                                            >
                                                                                {/* Labels */}
                                                                                {card.labels &&
                                                                                    card.labels
                                                                                        .length >
                                                                                        0 && (
                                                                                        <div className="flex-wrap-5-mb5">
                                                                                            {card.labels.map(
                                                                                                (
                                                                                                    l,
                                                                                                    i
                                                                                                ) => (
                                                                                                    <div
                                                                                                        key={`item-${i}`}
                                                                                                        style={{
                                                                                                            backgroundColor:
                                                                                                                l.color,
                                                                                                            width: '30px',
                                                                                                            height: '6px',
                                                                                                            borderRadius:
                                                                                                                '3px',
                                                                                                        }}
                                                                                                    />
                                                                                                )
                                                                                            )}
                                                                                        </div>
                                                                                    )}
                                                                                <div className="word-break-all">
                                                                                    {card.content}
                                                                                </div>

                                                                                {/* Badges footer */}
                                                                                {(card.description ||
                                                                                    (card.checklist &&
                                                                                        card
                                                                                            .checklist
                                                                                            .length >
                                                                                            0) ||
                                                                                    card.due_date) && (
                                                                                    <div
                                                                                        style={
                                                                                            S.flex6
                                                                                        }
                                                                                    >
                                                                                        {card.description && (
                                                                                            <span>
                                                                                                📝
                                                                                            </span>
                                                                                        )}
                                                                                        {card.checklist &&
                                                                                            card
                                                                                                .checklist
                                                                                                .length >
                                                                                                0 && (
                                                                                                <span>
                                                                                                    ☑️{' '}
                                                                                                    {
                                                                                                        card.checklist.filter(
                                                                                                            (
                                                                                                                i
                                                                                                            ) =>
                                                                                                                i.done
                                                                                                        )
                                                                                                            .length
                                                                                                    }
                                                                                                    /
                                                                                                    {
                                                                                                        card
                                                                                                            .checklist
                                                                                                            .length
                                                                                                    }
                                                                                                </span>
                                                                                            )}
                                                                                        {card.due_date && (
                                                                                            <span>
                                                                                                📅
                                                                                            </span>
                                                                                        )}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </Draggable>
                                                                )
                                                            )}
                                                            {provided.placeholder}
                                                        </div>
                                                    )}
                                                </Droppable>

                                                {/* Add Card */}
                                                {addingToCol === col.id ? (
                                                    <div className="mt-10">
                                                        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                                                        <textarea
                                                            autoFocus
                                                            placeholder="Bir başlık girin..."
                                                            value={newCardContent}
                                                            onChange={(e) =>
                                                                setNewCardContent(e.target.value)
                                                            }
                                                            onKeyDown={(e) => {
                                                                if (
                                                                    e.key === 'Enter' &&
                                                                    !e.shiftKey
                                                                ) {
                                                                    e.preventDefault();
                                                                    handleAddCard(col.id);
                                                                }
                                                            }}
                                                            style={S.bg2}
                                                        />
                                                        <div className="flex-5-mt5">
                                                            <button
                                                                aria-label="Ekle"
                                                                onClick={() =>
                                                                    handleAddCard(col.id)
                                                                }
                                                                style={S.bg3}
                                                            >
                                                                Ekle
                                                            </button>
                                                            <button
                                                                aria-label="Action button"
                                                                onClick={() => setAddingToCol(null)}
                                                                style={S.bg4}
                                                            >
                                                                {t('common.cancel')}
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <button
                                                        aria-label="Action button"
                                                        onClick={() => {
                                                            setAddingToCol(col.id);
                                                            setNewCardContent('');
                                                        }}
                                                        style={{
                                                            width: '100%',
                                                            padding: '8px',
                                                            background: 'transparent',
                                                            border: 'none',
                                                            color: '#949ba4',
                                                            cursor: 'pointer',
                                                            textAlign: 'left',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '5px',
                                                            marginTop: '5px',
                                                            borderRadius: '4px',
                                                            ':hover': {
                                                                backgroundColor: '#35373c',
                                                            },
                                                        }}
                                                    >
                                                        <FaPlus /> Kart Ekle
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}

                            {/* New Column Button */}
                            <div style={S.size}>
                                <button
                                    aria-label="handle Create Column"
                                    onClick={handleCreateColumn}
                                    style={S.flex7}
                                >
                                    <FaPlus /> Başka bir liste ekle
                                </button>
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {isModalOpen && selectedCard && (
                <KanbanCardModal
                    card={selectedCard}
                    columnTitle={selectedColumnTitle}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveCard}
                    onDelete={handleDeleteCard}
                />
            )}
        </div>
    );
};

KanbanBoard.propTypes = {
    roomSlug: PropTypes.string,
    apiBaseUrl: PropTypes.string,
    fetchWithAuth: PropTypes.func,
};
export default React.memo(KanbanBoard);
