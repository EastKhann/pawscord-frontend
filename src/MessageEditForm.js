// frontend/src/MessageEditForm.js

import React, { useState, useEffect, useRef } from 'react';

const MessageEditForm = ({ message, onSave, onCancel }) => {
    const [content, setContent] = useState(message.content);
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.selectionStart = inputRef.current.value.length;
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onCancel();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onCancel]);

    const handleSave = (e) => {
        e.preventDefault();
        if (content.trim() && content.trim() !== message.content) {
            onSave(message.id, content.trim());
        } else {
            onCancel();
        }
    };

    return (
        <form onSubmit={handleSave} style={styles.form}>
            <input
                ref={inputRef}
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={styles.input}
            />
            <div style={styles.footer}>
                çıkmak için <strong style={styles.key}>ESC</strong> • kaydetmek için <strong style={styles.key}>ENTER</strong>
            </div>
        </form>
    );
};

const styles = {
    form: {
        width: '100%',
        padding: '8px'
    },
    input: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#484c52',
        border: '1px solid #5865f2',
        borderRadius: '4px',
        color: 'white',
        boxSizing: 'border-box',
    },
    footer: {
        fontSize: '0.75em',
        color: '#b9bbbe',
        marginTop: '5px',
    },
    key: {
        padding: '1px 4px',
        backgroundColor: '#2f3136',
        borderRadius: '3px',
    }
};

export default MessageEditForm;