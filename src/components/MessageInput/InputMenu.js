// frontend/src/components/MessageInput/InputMenu.js
import React, { useRef, useCallback } from 'react';
import { FaPaperclip, FaSmile, FaImage, FaPlus, FaFileAlt, FaClock, FaCode } from 'react-icons/fa';
import styles from './styles';

const InputMenu = ({
    showMobileMenu, setShowMobileMenu,
    setShowEmojiPicker, setShowGifPicker,
    setShowTemplates, setShowScheduled,
    onShowCodeSnippet,
    disabled, message, setPendingFiles,
    showEmojiPicker, showGifPicker
}) => {
    const fileInputRef = useRef(null);

    const handleFileChange = useCallback((e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const processedFiles = files.map(file => ({
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            file,
            name: file.name,
            size: file.size,
            type: file.type,
            previewUrl: (file.type.startsWith('image/') || file.type.startsWith('video/'))
                ? URL.createObjectURL(file) : null,
        }));

        setPendingFiles(prev => [...prev, ...processedFiles]);
        e.target.value = '';
    }, [setPendingFiles]);

    const menuAction = (action) => {
        action();
        setShowMobileMenu(false);
    };

    return (
        <div style={styles.leftActions}>
            <div style={{ position: 'relative' }}>
                <button
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    style={{
                        ...styles.actionButton,
                        backgroundColor: showMobileMenu ? 'rgba(88, 101, 242, 0.2)' : 'transparent',
                        color: showMobileMenu ? '#5865f2' : '#b9bbbe'
                    }}
                    title="Seçenekler"
                    disabled={disabled}
                >
                    <FaPlus />
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    accept="image/*,video/*,audio/*,.pdf,.txt,.doc,.docx"
                />

                {showMobileMenu && (
                    <div style={styles.mobileMenu} className="mobile-menu-container">
                        <button onClick={() => menuAction(() => fileInputRef.current?.click())}
                            style={styles.mobileMenuItem} className="mobile-menu-item" disabled={disabled}>
                            <FaPaperclip /><span>Dosya Ekle</span>
                        </button>
                        <button onClick={() => menuAction(() => { setShowEmojiPicker(!showEmojiPicker); setShowGifPicker(false); })}
                            style={styles.mobileMenuItem} className="mobile-menu-item" disabled={disabled}>
                            <FaSmile /><span>Emoji Ekle</span>
                        </button>
                        <button onClick={() => menuAction(() => { setShowGifPicker(!showGifPicker); setShowEmojiPicker(false); })}
                            style={styles.mobileMenuItem} className="mobile-menu-item" disabled={disabled}>
                            <FaImage /><span>GIF Ekle</span>
                        </button>
                        {onShowCodeSnippet && (
                            <button onClick={() => menuAction(onShowCodeSnippet)}
                                style={styles.mobileMenuItem} className="mobile-menu-item" disabled={disabled}>
                                <FaCode /><span>Kod Snippet</span>
                            </button>
                        )}
                        <button onClick={() => menuAction(() => setShowTemplates(true))}
                            style={styles.mobileMenuItem} className="mobile-menu-item" disabled={disabled}>
                            <FaFileAlt /><span>{'\u015E'}ablon (Ctrl+T)</span>
                        </button>
                        <button onClick={() => menuAction(() => setShowScheduled(true))}
                            style={styles.mobileMenuItem} className="mobile-menu-item"
                            disabled={disabled || !message.trim()}>
                            <FaClock /><span>Zamanla</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(InputMenu);
