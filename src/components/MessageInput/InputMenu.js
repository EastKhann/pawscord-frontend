// frontend/src/components/MessageInput/InputMenu.js
import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaPaperclip, FaSmile, FaImage, FaPlus, FaFileAlt, FaClock, FaCode } from 'react-icons/fa';
import styles from './styles';
import { useTranslation } from 'react-i18next';

const InputMenu = ({
    showMobileeMenu,
    setShowMobileeMenu,
    setShowEmojiPicker,
    setShowGifPicker,
    setShowTemplates,
    setShowScheduled,
    onShowCodeSnippet,
    disabled,
    message,
    setPendingFiles,
    showEmojiPicker,
    showGifPicker,
}) => {
    const { t } = useTranslation();

    const fileInputRef = useRef(null);

    const handleFileChange = useCallback(
        (e) => {
            const files = Array.from(e.target.files || []);
            if (files.length === 0) return;

            const processedFiles = files.map((file) => ({
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                file,
                name: file.name,
                size: file.size,
                type: file.type,
                previewUrl:
                    file.type.startsWith('image/') || file.type.startsWith('video/')
                        ? URL.createObjectURL(file)
                        : null,
            }));

            setPendingFiles((prev) => [...prev, ...processedFiles]);
            e.target.value = '';
        },
        [setPendingFiles]
    );

    const menuAction = (action) => {
        action();
        setShowMobileeMenu(false);
    };
    const menuToggleBtnStyle = {
        ...styles.actionButton,
        backgroundColor: showMobileeMenu ? 'rgba(88, 101, 242, 0.2)' : 'transparent',
        color: showMobileeMenu ? '#5865f2' : '#b5bac1',
    };

    return (
        <div style={styles.leftActions}>
            <div className="pos-relative">
                <button
                    onClick={() => setShowMobileeMenu(!showMobileeMenu)}
                    style={menuToggleBtnStyle}
                    title={t('ui.mesaj_secenaddri')}
                    aria-label={t('ui.mesaj_secenaddri_menusu')}
                    aria-expanded={showMobileeMenu}
                    aria-haspopup="menu"
                    disabled={disabled}
                >
                    <FaPlus aria-hidden="true" />
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="display-none"
                    onChange={handleFileChange}
                    accept="image/*,video/*,audio/*,.pdf,.txt,.doc,.docx"
                    aria-label={t('ui.file_sec')}
                />

                {showMobileeMenu && (
                    <div
                        style={styles.mobileMenu}
                        className="mobile-menu-container"
                        role="menu"
                        aria-label={t('ui.mesaj_secenaddri')}
                    >
                        <button
                            onClick={() => menuAction(() => fileInputRef.current?.click())}
                            style={styles.mobileMenuItem}
                            className="mobile-menu-item"
                            disabled={disabled}
                            role="menuitem"
                        >
                            <FaPaperclip aria-hidden="true" />
                            <span>{t('file_add')}</span>
                        </button>
                        <button
                            onClick={() =>
                                menuAction(() => {
                                    setShowEmojiPicker(!showEmojiPicker);
                                    setShowGifPicker(false);
                                })
                            }
                            style={styles.mobileMenuItem}
                            className="mobile-menu-item"
                            disabled={disabled}
                            role="menuitem"
                        >
                            <FaSmile aria-hidden="true" />
                            <span>{t('emoji_add')}</span>
                        </button>
                        <button
                            onClick={() =>
                                menuAction(() => {
                                    setShowGifPicker(!showGifPicker);
                                    setShowEmojiPicker(false);
                                })
                            }
                            style={styles.mobileMenuItem}
                            className="mobile-menu-item"
                            disabled={disabled}
                            role="menuitem"
                        >
                            <FaImage aria-hidden="true" />
                            <span>{t('gif_add')}</span>
                        </button>
                        {onShowCodeSnippet && (
                            <button
                                onClick={() => menuAction(onShowCodeSnippet)}
                                style={styles.mobileMenuItem}
                                className="mobile-menu-item"
                                disabled={disabled}
                            >
                                <FaCode />
                                <span>{t('kod_snippet')}</span>
                            </button>
                        )}
                        <button
                            onClick={() => menuAction(() => setShowTemplates(true))}
                            style={styles.mobileMenuItem}
                            className="mobile-menu-item"
                            disabled={disabled}
                        >
                            <FaFileAlt />
                            <span>{t('inputMenu.template','Template (Ctrl+T)')}</span>
                        </button>
                        <button
                            onClick={() => menuAction(() => setShowScheduled(true))}
                            style={styles.mobileMenuItem}
                            className="mobile-menu-item"
                            disabled={disabled || !message.trim()}
                        >
                            <FaClock />
                            <span>{t('zamanla')}</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

InputMenu.propTypes = {
    showMobileeMenu: PropTypes.bool,
    setShowMobileeMenu: PropTypes.func,
    setShowEmojiPicker: PropTypes.func,
    setShowGifPicker: PropTypes.func,
    setShowTemplates: PropTypes.func,
    setShowScheduled: PropTypes.func,
    onShowCodeSnippet: PropTypes.func,
    disabled: PropTypes.bool,
    message: PropTypes.string,
    setPendingFiles: PropTypes.func,
    showEmojiPicker: PropTypes.bool,
    showGifPicker: PropTypes.bool,
};
export default React.memo(InputMenu);
