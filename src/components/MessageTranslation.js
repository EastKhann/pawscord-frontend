import React, { useState } from 'react';
import toast from '../utils/toast';
import './MessageTranslation.css';

/**
 * Message Translation Component
 * Allows users to translate messages to their preferred language
 */
const MessageTranslation = ({ messageId, originalText, onTranslate }) => {
    const [isTranslating, setIsTranslating] = useState(false);
    const [translatedText, setTranslatedText] = useState('');
    const [targetLang, setTargetLang] = useState('en');
    const [showOriginal, setShowOriginal] = useState(false);

    const languages = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'ru', name: 'Русский', flag: '🇷🇺' },
        { code: 'ja', name: '日本語', flag: '🇯🇵' },
        { code: 'ko', name: '한국어', flag: '🇰🇷' },
        { code: 'zh', name: '中文', flag: '🇨🇳' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦' }
    ];

    const handleTranslate = async () => {
        setIsTranslating(true);

        try {
            const response = await fetch('/api/messages/translate/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message_id: messageId,
                    target_language: targetLang,
                    text: originalText
                })
            });

            const data = await response.json();

            if (data.success) {
                setTranslatedText(data.translated_text);
                onTranslate?.(data.translated_text, targetLang);
            } else {
                toast.error('❌ Çeviri başarısız: ' + (data.error || 'Bilinmeyen hata'));
            }
        } catch (err) {
            console.error('Translation error:', err);
            toast.error('❌ Çeviri başarısız. Lütfen tekrar deneyin.');
        } finally {
            setIsTranslating(false);
        }
    };

    return (
        <div className="message-translation">
            {!translatedText ? (
                <div className="translation-controls">
                    <select
                        value={targetLang}
                        onChange={(e) => setTargetLang(e.target.value)}
                        className="language-select"
                        disabled={isTranslating}
                    >
                        {languages.map(lang => (
                            <option key={lang.code} value={lang.code}>
                                {lang.flag} {lang.name}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={handleTranslate}
                        className="btn-translate"
                        disabled={isTranslating}
                    >
                        {isTranslating ? (
                            <>
                                <span className="spinner-small"></span>
                                Translating...
                            </>
                        ) : (
                            <>
                                🌐 Translate
                            </>
                        )}
                    </button>
                </div>
            ) : (
                <div className="translation-result">
                    <div className="translation-header">
                        <span className="translation-badge">
                            🌐 Translated to {languages.find(l => l.code === targetLang)?.name}
                        </span>
                        <button
                            onClick={() => setShowOriginal(!showOriginal)}
                            className="btn-toggle-original"
                        >
                            {showOriginal ? 'Hide Original' : 'Show Original'}
                        </button>
                    </div>

                    {showOriginal && (
                        <div className="original-text">
                            <strong>Original:</strong>
                            <p>{originalText}</p>
                        </div>
                    )}

                    <div className="translated-text">
                        <p>{translatedText}</p>
                    </div>

                    <button
                        onClick={() => {
                            setTranslatedText('');
                            setShowOriginal(false);
                        }}
                        className="btn-reset"
                    >
                        ↻ Translate Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default MessageTranslation;


