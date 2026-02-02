// frontend/src/utils/translation.js
/**
 * 🌐 LIVE TRANSLATION UTILITIES
 * Auto-translate messages in 100+ languages
 */

// In-memory cache for translations (to avoid duplicate API calls)
const translationCache = new Map();

/**
 * Translate single text
 */
export async function translateText(text, targetLang, apiBaseUrl, fetchWithAuth) {
    // Check cache first
    const cacheKey = `${text.substring(0, 100)}_${targetLang}`;  // First 100 chars for key

    if (translationCache.has(cacheKey)) {
        console.log('🎯 [Translation] Cache hit:', cacheKey);
        return translationCache.get(cacheKey);
    }

    try {
        console.log(`🌐 [Translation] Translating to ${targetLang}:`, text.substring(0, 50));

        const response = await fetchWithAuth(`${apiBaseUrl}/translation/translate/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: text,
                target_lang: targetLang,
                source_lang: 'auto'
            })
        });

        if (!response.ok) {
            throw new Error('Translation API error');
        }

        const data = await response.json();

        // Cache the result
        translationCache.set(cacheKey, data);

        console.log('✅ [Translation] Success:', data.translated.substring(0, 50));

        return data;

    } catch (error) {
        console.error('❌ [Translation] Error:', error);

        // Return original text on error
        return {
            translated: text,
            original: text,
            source_lang: 'unknown',
            target_lang: targetLang,
            error: true
        };
    }
}

/**
 * Translate batch of messages (faster than individual)
 */
export async function translateBatch(messages, targetLang, apiBaseUrl, fetchWithAuth) {
    if (!messages || messages.length === 0) {
        return [];
    }

    try {
        console.log(`🌐 [Translation] Batch translating ${messages.length} messages to ${targetLang}`);

        const response = await fetchWithAuth(`${apiBaseUrl}/translation/translate-batch/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: messages.map(msg => ({
                    id: msg.id,
                    text: msg.text || msg.content
                })),
                target_lang: targetLang
            })
        });

        if (!response.ok) {
            throw new Error('Batch translation API error');
        }

        const data = await response.json();

        // Cache all results
        data.results.forEach((result, index) => {
            const originalText = messages[index].text || messages[index].content;
            const cacheKey = `${originalText.substring(0, 100)}_${targetLang}`;
            translationCache.set(cacheKey, result);
        });

        console.log(`✅ [Translation] Batch complete: ${data.results.length} messages`);

        return data.results;

    } catch (error) {
        console.error('❌ [Translation] Batch error:', error);

        // Return original texts on error
        return messages.map(msg => ({
            id: msg.id,
            translated: msg.text || msg.content,
            original: msg.text || msg.content,
            error: true
        }));
    }
}

/**
 * Get list of supported languages
 */
export async function getSupportedLanguages(apiBaseUrl) {
    try {
        const response = await fetch(`${apiBaseUrl}/translation/languages/`);

        if (!response.ok) {
            throw new Error('Failed to fetch languages');
        }

        const data = await response.json();

        console.log(`✅ [Translation] Loaded ${data.count} languages`);

        return data.languages;

    } catch (error) {
        console.error('❌ [Translation] Failed to load languages:', error);

        // Return minimal fallback
        return {
            'en': 'English',
            'tr': 'Türkçe',
            'es': 'Español',
            'fr': 'Français',
            'de': 'Deutsch',
            'it': 'Italiano',
            'pt': 'Português',
            'ru': 'Русский',
            'zh-cn': '中文',
            'ja': '日本語',
            'ko': '한국어',
            'ar': 'العربية'
        };
    }
}

/**
 * Detect language of text (frontend heuristic)
 * For accurate detection, use backend API
 */
export function detectLanguageClient(text) {
    if (!text || text.length < 3) return 'en';

    // Turkish characters
    if (/[çğıöşü]/i.test(text)) return 'tr';

    // Russian/Cyrillic
    if (/[а-яА-ЯёЁ]/.test(text)) return 'ru';

    // Arabic
    if (/[\u0600-\u06FF]/.test(text)) return 'ar';

    // Hebrew
    if (/[\u0590-\u05FF]/.test(text)) return 'he';

    // Chinese
    if (/[\u4e00-\u9fa5]/.test(text)) return 'zh-cn';

    // Japanese (Hiragana/Katakana)
    if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) return 'ja';

    // Korean (Hangul)
    if (/[\uAC00-\uD7AF]/.test(text)) return 'ko';

    // Thai
    if (/[\u0E00-\u0E7F]/.test(text)) return 'th';

    // Greek
    if (/[\u0370-\u03FF]/.test(text)) return 'el';

    // Default to English
    return 'en';
}

/**
 * Clear translation cache (call when switching language)
 */
export function clearTranslationCache() {
    translationCache.clear();
    console.log('🗑️ [Translation] Cache cleared');
}

/**
 * Get cache size (for debugging)
 */
export function getCacheSize() {
    return translationCache.size;
}

console.log('✅ Translation utils loaded');



