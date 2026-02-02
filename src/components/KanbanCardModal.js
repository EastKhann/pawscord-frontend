
import React, { useState, useEffect } from 'react';
import { FaTimes, FaCalendarAlt, FaTag, FaCheckSquare, FaUser, FaTrash, FaAlignLeft } from 'react-icons/fa';

const KanbanCardModal = ({ card, onClose, onSave, onDelete, columnTitle }) => {
    const [title, setTitle] = useState(card.content || '');
    const [description, setDescription] = useState(card.description || '');
    const [dueDate, setDueDate] = useState(card.due_date ? card.due_date.substring(0, 16) : ''); // datetime-local format
    const [labels, setLabels] = useState(card.labels || []);
    const [checklist, setChecklist] = useState(card.checklist || []);
    const [newCheckliItem, setNewCheckliItem] = useState('');

    // Label renkleri
    const LABEL_COLORS = [
        { color: '#ef5350', name: 'Red' },
        { color: '#ffa726', name: 'Orange' },
        { color: '#ffee58', name: 'Yellow' },
        { color: '#66bb6a', name: 'Green' },
        { color: '#42a5f5', name: 'Blue' },
        { color: '#ab47bc', name: 'Purple' },
    ];

    const handleSave = () => {
        onSave({
            ...card,
            content: title,
            description,
            due_date: dueDate || null,
            labels,
            checklist
        });
        onClose();
    };

    const addChecklistItem = () => {
        if (!newCheckliItem.trim()) return;
        setChecklist([...checklist, { text: newCheckliItem, done: false }]);
        setNewCheckliItem('');
    };

    const toggleChecklistItem = (index) => {
        const newChecklist = [...checklist];
        newChecklist[index].done = !newChecklist[index].done;
        setChecklist(newChecklist);
    };

    const removeChecklistItem = (index) => {
        const newChecklist = [...checklist];
        newChecklist.splice(index, 1);
        setChecklist(newChecklist);
    };

    const toggleLabel = (labelColor) => {
        const exists = labels.find(l => l.color === labelColor);
        if (exists) {
            setLabels(labels.filter(l => l.color !== labelColor));
        } else {
            setLabels([...labels, { color: labelColor, text: '' }]);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000,
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: '#313338', width: '600px', maxHeight: '90vh',
                borderRadius: '8px', overflowY: 'auto', padding: '20px',
                color: '#dbdee1', display: 'flex', flexDirection: 'column', gap: '20px',
                position: 'relative'
            }} onClick={e => e.stopPropagation()}>

                {/* HEAD */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            style={{
                                backgroundColor: 'transparent', border: 'none', color: 'white',
                                fontSize: '1.5em', fontWeight: 'bold', width: '100%', outline: 'none'
                            }}
                        />
                        <div style={{ fontSize: '0.9em', color: '#949ba4', marginTop: '5px' }}>
                            in list <span style={{ color: '#dbdee1', fontWeight: 'bold' }}>{columnTitle}</span>
                        </div>
                    </div>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#b5bac1', cursor: 'pointer', fontSize: '1.2em' }}>
                        <FaTimes />
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    {/* MAIN CONTENT */}
                    <div style={{ flex: 3, display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        {/* LABELS */}
                        {labels.length > 0 && (
                            <div>
                                <h4 style={{ fontSize: '0.8em', color: '#949ba4', marginBottom: '8px' }}>LABELS</h4>
                                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                                    {labels.map((l, i) => (
                                        <div key={i} style={{
                                            backgroundColor: l.color, width: '40px', height: '20px', borderRadius: '4px'
                                        }} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* DESCRIPTION */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                <FaAlignLeft /> <h3 style={{ margin: 0, fontSize: '1em' }}>Description</h3>
                            </div>
                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Add a more detailed description..."
                                style={{
                                    width: '100%', minHeight: '100px', backgroundColor: '#383a40', border: 'none',
                                    borderRadius: '4px', color: '#dbdee1', padding: '10px', resize: 'vertical'
                                }}
                            />
                        </div>

                        {/* CHECKLIST */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                <FaCheckSquare /> <h3 style={{ margin: 0, fontSize: '1em' }}>Checklist</h3>
                            </div>

                            {/* Progress Bar */}
                            {checklist.length > 0 && (
                                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '0.8em', color: '#949ba4' }}>
                                        {Math.round((checklist.filter(i => i.done).length / checklist.length) * 100)}%
                                    </span>
                                    <div style={{ flex: 1, height: '6px', backgroundColor: '#383a40', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{
                                            height: '100%', backgroundColor: '#5865f2',
                                            width: `${(checklist.filter(i => i.done).length / checklist.length) * 100}%`
                                        }} />
                                    </div>
                                </div>
                            )}

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                {checklist.map((item, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input
                                            type="checkbox"
                                            checked={item.done}
                                            onChange={() => toggleChecklistItem(index)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <span style={{
                                            flex: 1,
                                            textDecoration: item.done ? 'line-through' : 'none',
                                            color: item.done ? '#949ba4' : '#dbdee1'
                                        }}>{item.text}</span>
                                        <button onClick={() => removeChecklistItem(index)} style={{ background: 'transparent', border: 'none', color: '#fa777c', cursor: 'pointer' }}>
                                            <FaTimes />
                                        </button>
                                    </div>
                                ))}
                                <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                                    <input
                                        type="text"
                                        value={newCheckliItem}
                                        onChange={e => setNewCheckliItem(e.target.value)}
                                        placeholder="Add an item"
                                        onKeyDown={e => e.key === 'Enter' && addChecklistItem()}
                                        style={{
                                            backgroundColor: '#383a40', border: 'none', borderRadius: '4px',
                                            color: 'white', padding: '8px', flex: 1
                                        }}
                                    />
                                    <button onClick={addChecklistItem} style={{ backgroundColor: '#4752c4', color: 'white', border: 'none', borderRadius: '4px', padding: '0 15px', cursor: 'pointer' }}>Add</button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* SIDEBAR ACTIONS */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h4 style={{ fontSize: '0.8em', color: '#949ba4', margin: '0 0 5px 0' }}>ADD TO CARD</h4>

                        {/* Label Picker (Simplified) */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#dbdee1', padding: '5px', backgroundColor: '#383a40', borderRadius: '3px' }}>
                                <FaTag /> Labels
                            </div>
                            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', padding: '5px' }}>
                                {LABEL_COLORS.map(c => (
                                    <div
                                        key={c.color}
                                        onClick={() => toggleLabel(c.color)}
                                        style={{
                                            width: '30px', height: '20px', backgroundColor: c.color, borderRadius: '3px', cursor: 'pointer',
                                            border: labels.find(l => l.color === c.color) ? '2px solid white' : 'none'
                                        }}
                                        title={c.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Due Date */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#dbdee1', padding: '5px', backgroundColor: '#383a40', borderRadius: '3px' }}>
                                <FaCalendarAlt /> Due Date
                            </div>
                            <input
                                type="datetime-local"
                                value={dueDate}
                                onChange={e => setDueDate(e.target.value)}
                                style={{
                                    backgroundColor: '#383a40', border: 'none', borderRadius: '3px', color: 'white', padding: '5px', width: '100%'
                                }}
                            />
                        </div>

                        <div style={{ marginTop: 'auto' }}>
                            <h4 style={{ fontSize: '0.8em', color: '#949ba4', margin: '0 0 5px 0' }}>ACTIONS</h4>
                            <button
                                onClick={onDelete}
                                style={{
                                    width: '100%', padding: '8px', backgroundColor: '#da373c', color: 'white',
                                    border: 'none', borderRadius: '3px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px'
                                }}
                            >
                                <FaTrash /> Delete Card
                            </button>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button onClick={onSave} style={{
                        padding: '10px 20px', backgroundColor: '#23a559', color: 'white',
                        border: 'none', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold'
                    }}>
                        Save Changes
                    </button>
                </div>

            </div>
        </div>
    );
};

export default KanbanCardModal;


