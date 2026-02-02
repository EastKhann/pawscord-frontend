// frontend/src/components/MessageTranslationButton.js
import React, { useState } from 'react';
import { FaLanguage, FaSpinner } from 'react-icons/fa';
import toast from '../utils/toast';

/**
 * 🌍 Message Translation Button
 * Mesaj çeviri butonu
 * 
 * Features:
 * - Otomatik dil tespiti
 * - Çoklu dil desteği
 * - İnline çeviri gösterimi
 */

const MessageTranslationButton = ({ message, fetchWithAuth, apiBaseUrl }) => {
    const [isTranslating, setIsTranslating] = useState(false);
    const [translation, setTranslation] = useState(null);
    const [showTranslation, setShowTranslation] = useState(false);

    const translateMessage = async (targetLang = 'tr') => {
        if (translation) {
            setShowTranslation(!showTranslation);
            return;
        }

        try {
            setIsTranslating(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/api/messages/${message.id}/translations/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ target_language: targetLang })
            });

            if (response.ok) {
                const data = await response.json();
                setTranslation(data);
                setShowTranslation(true);
            } else {
                toast.error('Çeviri yapılamadı');
            }
        } catch (error) {
            console.error('Çeviri hatası:', error);
            toast.error('Bir hata oluştu');
        } finally {
            setIsTranslating(false);
        }
    };

    return (
        <div style={{ marginTop: '5px' }}>
            <button
                onClick={() => translateMessage()}
                style={styles.translateBtn}
                disabled={isTranslating}
                title="Çevir"
            >
                {isTranslating ? <FaSpinner className="fa-spin" /> : <FaLanguage />}
                <span>{translation ? (showTranslation ? 'Orijinali Göster' : 'Çeviriyi Göster') : 'Çevir'}</span>
            </button>

            {showTranslation && translation && (
                <div style={styles.translationBox}>
                    <div style={styles.translationHeader}>
                        <FaLanguage style={{ color: '#5865f2' }} />
                        <span>Çeviri ({translation.target_language})</span>
                    </div>
                    <div style={styles.translationText}>
                        {translation.translated_content}
                    </div>
                    <div style={styles.translationFooter}>
                        Kaynak: {translation.source_language || 'Otomatik'}
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    translateBtn: {
        backgroundColor: 'transparent',
        border: '1px solid #5865f2',
        color: '#5865f2',
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.2s'
    },
    translationBox: {
        backgroundColor: '#2c2f33',
        borderLeft: '3px solid #5865f2',
        borderRadius: '4px',
        padding: '12px',
        marginTop: '10px'
    },
    translationHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '12px',
        fontWeight: '600',
        marginBottom: '8px',
        color: '#5865f2'
    },
    translationText: {
        color: '#dcddde',
        lineHeight: '1.5',
        marginBottom: '8px'
    },
    translationFooter: {
        fontSize: '11px',
        color: '#888',
        borderTop: '1px solid #40444b',
        paddingTop: '6px'
    }
};

export default MessageTranslationButton;
