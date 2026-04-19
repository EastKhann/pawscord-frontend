/* eslint-disable no-irregular-whitespace */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import {
    FaTimes,
    FaCalendarAlt,
    FaTag,
    FaCheckSquare,
    FaUser,
    FaTrash,
    FaAlignLeft,
} from 'react-icons/fa';

import useModalA11y from '../../hooks/useModalA11y';

const KanbanCardModal = ({ card, onClose, onSave, onDelete, columnTitle }) => {
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Kanban Kart' });

    const [title, setTitle] = useState(card.content || '');

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);

    const [description, setDescription] = useState(card.description || '');

    const [dueDate, setDueDate] = useState(card.due_date ? card.due_date.substring(0, 16) : ''); // datetime-local format

    const [labels, setLabels] = useState(card.labels || []);

    const [checklist, setChecklist] = useState(card.checklist || []);

    const [newCheckliItem, setNewCheckliItem] = useState('');

    // Label renkleri

    const LABEL_COLORS = [
        { color: '#ef5350', name: 'Kırmızı' },

        { color: '#ffa726', name: 'Turuncu' },

        { color: '#ffee58', name: 'Sarı' },

        { color: '#66bb6a', name: 'Yeşil' },

        { color: '#42a5f5', name: 'Mavi' },

        { color: '#ab47bc', name: 'Mor' },
    ];

    const handleSave = () => {
        onSave({
            ...card,

            content: title,

            description,

            due_date: dueDate || null,

            labels,

            checklist,
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
        const exists = labels.find((l) => l.color === labelColor);

        if (exists) {
            setLabels(labels.filter((l) => l.color !== labelColor));
        } else {
            setLabels([...labels, { color: labelColor, text: '' }]);
        }
    };

    const S = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },

        modal: {
            backgroundColor: '#17191c',
            width: '600px',
            maxHeight: '90vh',
            borderRadius: '8px',
            overflowY: 'auto',
            padding: '20px',
            color: '#dbdee1',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            position: 'relative',
        },

        titleInput: {
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '1.5em',
            fontWeight: 'bold',
            width: '100%',
            outline: 'none',
        },

        closeBtn: {
            background: 'transparent',
            border: 'none',
            color: '#b5bac1',
            cursor: 'pointer',
            fontSize: '1.2em',
        },

        mainCol: { flex: 3, display: 'flex', flexDirection: 'column', gap: '20px' },

        descArea: {
            width: '100%',
            minHeight: '100px',
            backgroundColor: '#1e2024',
            border: 'none',
            borderRadius: '4px',
            color: '#dbdee1',
            padding: '10px',
            resize: 'vertical',
        },

        checkRow: { marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' },

        progressTrack: {
            flex: 1,
            height: '6px',
            backgroundColor: '#1e2024',
            borderRadius: '3px',
            overflow: 'hidden',
        },

        removeBtn: {
            background: 'transparent',
            border: 'none',
            color: '#fa777c',
            cursor: 'pointer',
        },

        checkInput: {
            backgroundColor: '#1e2024',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            padding: '8px',
            flex: 1,
        },

        addBtn: {
            backgroundColor: '#4752c4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '0 15px',
            cursor: 'pointer',
        },

        sidebar: { flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' },

        sidebarRow: {
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            color: '#dbdee1',
            padding: '5px',
            backgroundColor: '#1e2024',
            borderRadius: '3px',
        },

        labelsPad: { display: 'flex', gap: '5px', flexWrap: 'wrap', padding: '5px' },

        dateInput: {
            backgroundColor: '#1e2024',
            border: 'none',
            borderRadius: '3px',
            color: 'white',
            padding: '5px',
            width: '100%',
        },

        deleteBtn: {
            width: '100%',
            padding: '8px',
            backgroundColor: '#da373c',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
        },

        footer: { marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' },

        saveBtn: {
            padding: '10px 20px',
            backgroundColor: '#23a559',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            fontWeight: 'bold',
        },
    };

    return (
        <div style={S.overlay} {...overlayProps}>
            <div style={S.modal} {...dialogProps}>
                {/* HEAD */}

                <div className="flex-between-start">
                    <div className="flex-1">
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={S.titleInput}
                        />

                        <div className="text-949-09em-mt5">
                            listede: <span className="text-dbd-bold">{columnTitle}</span>
                        </div>
                    </div>

                    <button aria-label="Close" onClick={onClose} style={S.closeBtn}>
                        <FaTimes />
                    </button>
                </div>

                <div className="flex-gap-20">
                    {/* MAIN CONTENT */}

                    <div style={S.mainCol}>
                        {/* LABELS */}

                        {labels.length > 0 && (
                            <div>
                                <h4 className="text-949-08em-mb8">ETİKETLER</h4>

                                <div className="flex-wrap-8">
                                    {labels.map((l, i) => (
                                        <div
                                            key={`item-${i}`}
                                            style={{
                                                backgroundColor: l.color,
                                                width: '40px',
                                                height: '20px',
                                                borderRadius: '4px',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* DESCRIPTION */}

                        <div>
                            <div className="flex-align-10-mb10">
                                <FaAlignLeft /> <h3 className="m0-fs1em">Açıklama</h3>
                            </div>

                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Daha detaylı bir açıklama ekleyin..."
                                style={S.descArea}
                            />
                        </div>

                        {/* CHECKLIST */}

                        <div>
                            <div className="flex-align-10-mb10">
                                <FaCheckSquare /> <h3 className="m0-fs1em">Kontrol Listesi</h3>
                            </div>

                            {/* Progress Bar */}

                            {checklist.length > 0 && (
                                <div style={S.checkRow}>
                                    <span className="text-949-08em">
                                        {Math.round(
                                            (checklist.filter((i) => i.done).length /
                                                checklist.length) *
                                                100
                                        )}
                                        %
                                    </span>

                                    <div style={S.progressTrack}>
                                        <div
                                            style={{
                                                height: '100%',
                                                backgroundColor: '#5865f2',

                                                width: `${(checklist.filter((i) => i.done).length / checklist.length) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex-col-gap5">
                                {checklist.map((item, index) => (
                                    <div key={`item-${index}`} className="flex-align-8">
                                        <input
                                            type="checkbox"
                                            checked={item.done}
                                            onChange={() => toggleChecklistItem(index)}
                                            className="cursor-pointer"
                                        />

                                        <span
                                            style={{
                                                flex: 1,

                                                textDecoration: item.done ? 'line-through' : 'none',

                                                color: item.done ? '#949ba4' : '#dbdee1',
                                            }}
                                        >
                                            {item.text}
                                        </span>

                                        <button
                                            aria-label="Action button"
                                            onClick={() => removeChecklistItem(index)}
                                            style={S.removeBtn}
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                ))}

                                <div className="flex-5-mt5">
                                    <input
                                        type="text"
                                        value={newCheckliItem}
                                        onChange={(e) => setNewCheckliItem(e.target.value)}
                                        placeholder="Öğe ekle"
                                        onKeyDown={(e) => e.key === 'Enter' && addChecklistItem()}
                                        style={S.checkInput}
                                        aria-label="New Checkli Item"
                                    />

                                    <button
                                        aria-label="Kontrol listesi öğesi ekle"
                                        onClick={addChecklistItem}
                                        style={S.addBtn}
                                    >
                                        Ekle
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SIDEBAR ACTIONS */}

                    <div style={S.sidebar}>
                        <h4 className="text-949-08em-mb5">KARTA EKLE</h4>

                        {/* Label Picker (Simplified) */}

                        <div className="flex-col-gap5">
                            <div style={S.sidebarRow}>
                                <FaTag /> Etiketler
                            </div>

                            <div style={S.labelsPad}>
                                {LABEL_COLORS.map((c) => (
                                    <div
                                        key={c.color}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => toggleLabel(c.color)}
                                        onKeyDown={(e) =>
                                            (e.key === 'Enter' || e.key === ' ') &&
                                            toggleLabel(c.color)
                                        }
                                        aria-label={`Toggle label ${c.color}`}
                                        style={{
                                            width: '30px',
                                            height: '20px',
                                            backgroundColor: c.color,
                                            borderRadius: '3px',
                                            cursor: 'pointer',

                                            border: labels.find((l) => l.color === c.color)
                                                ? '2px solid white'
                                                : 'none',
                                        }}
                                        title={c.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Due Date */}

                        <div className="flex-col-gap5">
                            <div style={S.sidebarRow}>
                                <FaCalendarAlt /> Bitiş Tarihi
                            </div>

                            <input
                                type="datetime-local"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                style={S.dateInput}
                            />
                        </div>

                        <div className="mt-auto">
                            <h4 className="text-949-08em-mb5">İŞLEMLER</h4>

                            <button aria-label="on Delete" onClick={onDelete} style={S.deleteBtn}>
                                <FaTrash /> Kartı Sil
                            </button>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}

                <div style={S.footer}>
                    <button aria-label="on Save" onClick={onSave} style={S.saveBtn}>
                        Değişiklikleri Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
};

KanbanCardModal.propTypes = {
    card: PropTypes.object,

    onClose: PropTypes.func,

    onSave: PropTypes.func,

    onDelete: PropTypes.func,

    columnTitle: PropTypes.string,
};

export default KanbanCardModal;
