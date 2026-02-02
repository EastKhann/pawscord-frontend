// frontend/src/components/MessageFormattingToolbar.js - FEATURE #15
import React from 'react';
import { FaBold, FaItalic, FaStrikethrough, FaCode, FaLink, FaQuoteRight } from 'react-icons/fa';

const MessageFormattingToolbar = ({ onFormat }) => {
    const tools = [
        { id: 'bold', icon: FaBold, format: '**', title: 'Kalın (Ctrl+B)' },
        { id: 'italic', icon: FaItalic, format: '*', title: 'İtalik (Ctrl+I)' },
        { id: 'strikethrough', icon: FaStrikethrough, format: '~~', title: 'Üstü Çizili' },
        { id: 'code', icon: FaCode, format: '`', title: 'Kod' },
        { id: 'quote', icon: FaQuoteRight, format: '> ', title: 'Alıntı' },
        { id: 'link', icon: FaLink, format: '[]()', title: 'Link' }
    ];

    return (
        <div style={styles.toolbar}>
            {tools.map(tool => {
                const Icon = tool.icon;
                return (
                    <button
                        key={tool.id}
                        onClick={() => onFormat(tool.format)}
                        title={tool.title}
                        style={styles.button}
                    >
                        <Icon />
                    </button>
                );
            })}
        </div>
    );
};

const styles = {
    toolbar: {
        display: 'flex',
        gap: '4px',
        padding: '8px',
        backgroundColor: '#2b2d31',
        borderRadius: '6px',
        borderBottom: '1px solid #1e1f22'
    },
    button: {
        padding: '6px 10px',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        borderRadius: '4px',
        fontSize: '14px',
        transition: 'background-color 0.15s'
    }
};

export default MessageFormattingToolbar;



