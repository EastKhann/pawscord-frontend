// components/CommandPalette.js
// 🎨 Command Palette - All shortcuts and commands in one place

import React, { useState } from 'react';
import { FaTimes, FaKeyboard } from 'react-icons/fa';
import { SHORTCUTS, getShortcutKey } from '../hooks/useKeyboardShortcuts';
import './CommandPalette.css';

const CommandPalette = ({ onClose }) => {
  const [filter, setFilter] = useState('all'); // all, keyboard, actions
  const cmdKey = getShortcutKey();

  const commands = [
    {
      category: 'Navigation',
      items: [
        { name: 'Quick Switcher', shortcut: `${cmdKey}+K`, description: 'Kanal veya kullanıcı ara' },
        { name: 'Previous Channel', shortcut: 'Alt+↑', description: 'Önceki kanala git' },
        { name: 'Next Channel', shortcut: 'Alt+↓', description: 'Sonraki kanala git' },
      ]
    },
    {
      category: 'Search',
      items: [
        { name: 'Advanced Search', shortcut: `${cmdKey}+F`, description: 'Mesajlarda gelişmiş arama' },
      ]
    },
    {
      category: 'Messaging',
      items: [
        { name: 'Send Message', shortcut: `${cmdKey}+Enter`, description: 'Mesajı gönder' },
        { name: 'Edit Last Message', shortcut: '↑', description: 'Son mesajını düzenle' },
        { name: 'Toggle Emoji Picker', shortcut: `${cmdKey}+E`, description: 'Emoji seçici aç/kapa' },
      ]
    },
    {
      category: 'Voice',
      items: [
        { name: 'Mute/Unmute', shortcut: `${cmdKey}+Shift+M`, description: 'Mikrofonu aç/kapa' },
        { name: 'Deafen/Undeafen', shortcut: `${cmdKey}+Shift+D`, description: 'Kulaklığı kapat/aç' },
      ]
    },
    {
      category: 'Interface',
      items: [
        { name: 'Toggle Sidebar', shortcut: `${cmdKey}+B`, description: 'Kenar çubuğunu aç/kapa' },
        { name: 'Toggle User Info', shortcut: `${cmdKey}+I`, description: 'Kullanıcı bilgisi aç/kapa' },
        { name: 'Toggle Theme', shortcut: `${cmdKey}+Shift+T`, description: 'Karanlık/Aydınlık mod' },
        { name: 'Command List', shortcut: `${cmdKey}+/`, description: 'Bu listeyi aç' },
        { name: 'Close/Cancel', shortcut: 'Esc', description: 'Modal veya işlemi kapat' },
      ]
    }
  ];

  return (
    <div className="command-palette-overlay" onClick={onClose}>
      <div className="command-palette" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="palette-header">
          <div className="palette-title">
            <FaKeyboard /> Klavye Kısayolları
          </div>
          <button className="palette-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="palette-filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Tümü
          </button>
          <button
            className={filter === 'keyboard' ? 'active' : ''}
            onClick={() => setFilter('keyboard')}
          >
            Klavye
          </button>
          <button
            className={filter === 'actions' ? 'active' : ''}
            onClick={() => setFilter('actions')}
          >
            Aksiyonlar
          </button>
        </div>

        {/* Commands List */}
        <div className="commands-list">
          {commands.map((category, idx) => (
            <div key={idx} className="command-category">
              <h3>{category.category}</h3>
              <div className="command-items">
                {category.items.map((cmd, cmdIdx) => (
                  <div key={cmdIdx} className="command-item">
                    <div className="command-info">
                      <div className="command-name">{cmd.name}</div>
                      <div className="command-description">{cmd.description}</div>
                    </div>
                    <div className="command-shortcut">
                      {cmd.shortcut.split('+').map((key, i) => (
                        <React.Fragment key={i}>
                          {i > 0 && <span className="plus">+</span>}
                          <kbd>{key}</kbd>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="palette-footer">
          <div className="footer-hint">
            <kbd>{cmdKey}</kbd> + <kbd>/</kbd> ile her zaman açabilirsiniz
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;



