// frontend/src/utils/messageSearch.js

/**
 * 🔍 Message Search Utility
 * Mesaj arama ve filtreleme fonksiyonları
 */

/**
 * Mesajlarda arama yap (fuzzy search)
 */
export const searchMessages = (messages, query, options = {}) => {
    const {
        caseSensitive = false,
        searchInFiles = true,
        searchInUsernames = true,
        maxResults = 50
    } = options;

    if (!query || query.trim().length === 0) {
        return messages;
    }

    const searchQuery = caseSensitive ? query : query.toLowerCase();
    const results = [];

    for (const msg of messages) {
        let score = 0;
        let matchedText = '';

        // 📝 Mesaj içeriğinde ara
        const content = caseSensitive ?
            (msg.content || msg.message || '') :
            (msg.content || msg.message || '').toLowerCase();

        if (content.includes(searchQuery)) {
            score += 10;
            matchedText = content;
        }

        // 👤 Kullanıcı adında ara
        if (searchInUsernames && msg.sender) {
            const username = caseSensitive ?
                (msg.sender.username || msg.sender.display_name || '') :
                (msg.sender.username || msg.sender.display_name || '').toLowerCase();

            if (username.includes(searchQuery)) {
                score += 5;
            }
        }

        // 📎 Dosya adında ara
        if (searchInFiles && msg.file_name) {
            const fileName = caseSensitive ? msg.file_name : msg.file_name.toLowerCase();
            if (fileName.includes(searchQuery)) {
                score += 3;
            }
        }

        // ⭐ Eşleşme varsa sonuçlara ekle
        if (score > 0) {
            results.push({
                ...msg,
                _searchScore: score,
                _matchedText: matchedText
            });

            if (results.length >= maxResults) break;
        }
    }

    // Skorlara göre sırala (en yüksek önce)
    return results.sort((a, b) => b._searchScore - a._searchScore);
};

/**
 * Mesajları filtrele
 */
export const filterMessages = (messages, filters) => {
    const {
        fromUser,
        hasFiles,
        hasImages,
        hasLinks,
        isPinned,
        hasReactions,
        dateRange,
        messageType
    } = filters;

    return messages.filter(msg => {
        // 👤 Kullanıcıya göre filtrele
        if (fromUser && msg.sender?.id !== fromUser) {
            return false;
        }

        // 📎 Dosya içeren mesajlar
        if (hasFiles && !msg.file_name) {
            return false;
        }

        // 🖼️ Resim içeren mesajlar
        if (hasImages && !msg.image) {
            return false;
        }

        // 🔗 Link içeren mesajlar
        if (hasLinks) {
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            const content = msg.content || msg.message || '';
            if (!urlRegex.test(content)) {
                return false;
            }
        }

        // 📌 Sabitlenmiş mesajlar
        if (isPinned && !msg.is_pinned) {
            return false;
        }

        // 😊 Reaction içeren mesajlar
        if (hasReactions && (!msg.reactions || msg.reactions.length === 0)) {
            return false;
        }

        // 📅 Tarih aralığı
        if (dateRange) {
            const msgDate = new Date(msg.created_at);
            if (dateRange.start && msgDate < new Date(dateRange.start)) {
                return false;
            }
            if (dateRange.end && msgDate > new Date(dateRange.end)) {
                return false;
            }
        }

        // 🎮 Mesaj tipi (voice, game, normal)
        if (messageType) {
            if (messageType === 'voice' && !msg.is_voice_message) {
                return false;
            }
            if (messageType === 'game' && !msg.game_result) {
                return false;
            }
            if (messageType === 'normal' && (msg.is_voice_message || msg.game_result)) {
                return false;
            }
        }

        return true;
    });
};

/**
 * Mesaj içinde highlight yap
 */
export const highlightText = (text, query, caseSensitive = false) => {
    if (!query || !text) return text;

    const searchText = caseSensitive ? text : text.toLowerCase();
    const searchQuery = caseSensitive ? query : query.toLowerCase();

    const index = searchText.indexOf(searchQuery);
    if (index === -1) return text;

    const before = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const after = text.substring(index + query.length);

    return {
        before,
        match,
        after,
        hasMatch: true
    };
};

/**
 * Mesaj içinde kaç kere geçtiğini say
 */
export const countOccurrences = (messages, query, caseSensitive = false) => {
    let count = 0;

    for (const msg of messages) {
        const content = caseSensitive ?
            (msg.content || msg.message || '') :
            (msg.content || msg.message || '').toLowerCase();

        const searchQuery = caseSensitive ? query : query.toLowerCase();

        const matches = content.split(searchQuery).length - 1;
        count += matches;
    }

    return count;
};

/**
 * İlk/son eşleşen mesajı bul
 */
export const findFirstMatch = (messages, query, caseSensitive = false) => {
    const results = searchMessages(messages, query, { caseSensitive, maxResults: 1 });
    return results[0] || null;
};

export const findLastMatch = (messages, query, caseSensitive = false) => {
    const results = searchMessages([...messages].reverse(), query, { caseSensitive, maxResults: 1 });
    return results[0] || null;
};

/**
 * Gelişmiş arama (regex destekli)
 */
export const advancedSearch = (messages, pattern, options = {}) => {
    const {
        isRegex = false,
        maxResults = 50
    } = options;

    if (!pattern) return messages;

    const results = [];
    let regex;

    try {
        regex = isRegex ? new RegExp(pattern, 'gi') : null;
    } catch (e) {
        console.error('Invalid regex pattern:', e);
        return [];
    }

    for (const msg of messages) {
        const content = msg.content || msg.message || '';

        if (isRegex) {
            if (regex.test(content)) {
                results.push(msg);
                if (results.length >= maxResults) break;
            }
        }
    }

    return results;
};

/**
 * Arama history'si yönet
 */
export class SearchHistory {
    constructor(maxSize = 20) {
        this.maxSize = maxSize;
        this.history = this.load();
    }

    add(query) {
        if (!query || query.trim().length === 0) return;

        // Aynı query varsa kaldır
        this.history = this.history.filter(q => q !== query);

        // Başa ekle
        this.history.unshift(query);

        // Max boyutu aş varsa kırp
        if (this.history.length > this.maxSize) {
            this.history = this.history.slice(0, this.maxSize);
        }

        this.save();
    }

    getAll() {
        return this.history;
    }

    clear() {
        this.history = [];
        this.save();
    }

    save() {
        try {
            localStorage.setItem('message_search_history', JSON.stringify(this.history));
        } catch (e) {
            console.error('Failed to save search history:', e);
        }
    }

    load() {
        try {
            const stored = localStorage.getItem('message_search_history');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Failed to load search history:', e);
            return [];
        }
    }
}

export default {
    searchMessages,
    filterMessages,
    highlightText,
    countOccurrences,
    findFirstMatch,
    findLastMatch,
    advancedSearch,
    SearchHistory
};


