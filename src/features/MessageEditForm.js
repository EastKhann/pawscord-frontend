// frontend/src/MessageEditForm.js (ENTER TUŞU FİXLENDİ)

import React, { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import { FaSave, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const MessageEditForm = ({ message, onSave, onCancel }) => {
    const { t } = useTranslation();
    const [content, setContent] = useState(message?.content || '');

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();

            // mleci metnin sonuna koy

            inputRef.current.selectionStart = inputRef.current.value.length;
        }

        // ESC tuşu with cancel etmek for global dinleyici

        const handleGlobalKeyDown = (e) => {
            if (e.key === 'Escape') {
                onCancel();
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);

        return () => {
            window.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, [onCancel]);

    if (!message) return null;

    const handleSave = (e) => {
        if (e) e.preventDefault(); // Sayfa yenilenmesini önle

        if (content.trim() && content.trim() !== message.content) {
            onSave(message.id, content.trim());
        } else {
            onCancel();
        }
    };

    // Input fordeyken tuşlsearch basıldığında çalışır

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave(e);
        }
    };

    return (
        <div aria-label={t('aria.messageEditForm', 'Edit Message')} style={styles.formContainer}>
            <div style={styles.inputContainer}>
                <input
                    ref={inputRef}
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleInputKeyDown} // ✨ KRİTİK EKLEME: Enter'ı burada yakalıyoruz
                    style={styles.input}
                    aria-label={t('message.editContent', 'Content')}
                />

                <div style={styles.buttonGroup}>
                    <button
                        type="button"
                        onClick={onCancel}
                        style={styles.cancelBtn}
                        title={t('common.cancelEsc', 'Cancel (ESC)')}
                    >
                        <FaTimes />
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        style={styles.saveBtn}
                        title="Kaydet (Enter)"
                    >
                        <FaSave />
                    </button>
                </div>
            </div>

            <div style={styles.footer}>
                {t('msgEdit.hint', 'cancel with')} <strong>ESC</strong> • {t('msgEdit.saveHint', 'save with')} <strong>ENTER</strong>
            </div>
        </div>
    );
};

const styles = {
    formContainer: {
        width: '100%',

        padding: '5px 0',
    },

    inputContainer: {
        display: 'flex',

        alignItems: 'center',

        gap: '5px',

        width: '100%',
    },

    input: {
        flex: 1,

        padding: '10px',

        backgroundColor: '#1e2024',

        border: '1px solid #5865f2',

        borderRadius: '4px',

        color: 'white',

        boxSizing: 'border-box',

        outline: 'none',

        fontSize: '0.95em',

        minWidth: 0, // Flexbox forde taşmayı önler
    },

    buttonGroup: {
        display: 'flex',

        gap: '5px',

        flexShrink: 0, // Butonların sıkışmasını önler
    },

    saveBtn: {
        backgroundColor: '#23a559',

        color: 'white',

        border: 'none',

        borderRadius: '4px',

        width: '36px',

        height: '36px',

        display: 'flex',

        alignItems: 'center',

        justifyContent: 'center',

        cursor: 'pointer',

        fontSize: '1em',
    },

    cancelBtn: {
        backgroundColor: '#da373c',

        color: 'white',

        border: 'none',

        borderRadius: '4px',

        width: '36px',

        height: '36px',

        display: 'flex',

        alignItems: 'center',

        justifyContent: 'center',

        cursor: 'pointer',

        fontSize: '1em',
    },

    footer: {
        fontSize: '0.7em',

        color: '#b5bac1',

        marginTop: '5px',

        marginLeft: '2px',
    },
};

// CSS Media Query with footer mobilde gizlenebilir (İsteğe bağlı)

const styleSheet = document.createElement('style');

styleSheet.innerText = `





  @media (max-width: 768px) {





    .edit-footer { display: none !important; }





  }





`;

document.head.appendChild(styleSheet);

MessageEditForm.propTypes = {
    message: PropTypes.string,

    onSave: PropTypes.func,

    onCancel: PropTypes.func,
};

export default React.memo(MessageEditForm);
