// frontend/src/workers/dataProcessor.worker.js

/**
 * 🔧 Web Worker - Heavy Data Processing
 * CPU-intensive işlemleri ana thread'den ayırır
 */

/* eslint-disable no-restricted-globals */

/**
 * Message processor
 */
self.addEventListener('message', (event) => {
    const { type, payload, id } = event.data;

    try {
        let result;

        switch (type) {
            case 'FILTER_MESSAGES':
                result = filterMessages(payload);
                break;

            case 'SORT_MESSAGES':
                result = sortMessages(payload);
                break;

            case 'SEARCH_MESSAGES':
                result = searchMessages(payload);
                break;

            case 'PROCESS_LARGE_DATA':
                result = processLargeData(payload);
                break;

            case 'COMPRESS_DATA':
                result = compressData(payload);
                break;

            case 'DECOMPRESS_DATA':
                result = decompressData(payload);
                break;

            case 'PARSE_MARKDOWN':
                result = parseMarkdown(payload);
                break;

            case 'GENERATE_THUMBNAILS':
                result = generateThumbnails(payload);
                break;

            case 'DIFF_ARRAYS':
                result = diffArrays(payload);
                break;

            default:
                throw new Error(`Unknown worker task: ${type}`);
        }

        self.postMessage({
            id,
            type: 'SUCCESS',
            result
        });

    } catch (error) {
        self.postMessage({
            id,
            type: 'ERROR',
            error: error.message
        });
    }
});

/**
 * Filter messages
 */
function filterMessages({ messages, filters }) {
    return messages.filter(msg => {
        if (filters.userId && msg.userId !== filters.userId) return false;
        if (filters.channelId && msg.channelId !== filters.channelId) return false;
        if (filters.startDate && new Date(msg.timestamp) < new Date(filters.startDate)) return false;
        if (filters.endDate && new Date(msg.timestamp) > new Date(filters.endDate)) return false;
        if (filters.hasAttachments && !msg.attachments?.length) return false;
        if (filters.query) {
            const query = filters.query.toLowerCase();
            return msg.content.toLowerCase().includes(query) ||
                msg.username?.toLowerCase().includes(query);
        }
        return true;
    });
}

/**
 * Sort messages
 */
function sortMessages({ messages, sortBy = 'timestamp', order = 'desc' }) {
    const sorted = [...messages].sort((a, b) => {
        let compareA = a[sortBy];
        let compareB = b[sortBy];

        if (sortBy === 'timestamp') {
            compareA = new Date(compareA).getTime();
            compareB = new Date(compareB).getTime();
        }

        if (typeof compareA === 'string') {
            compareA = compareA.toLowerCase();
            compareB = compareB.toLowerCase();
        }

        if (order === 'asc') {
            return compareA > compareB ? 1 : -1;
        } else {
            return compareA < compareB ? 1 : -1;
        }
    });

    return sorted;
}

/**
 * Search messages (fuzzy search)
 */
function searchMessages({ messages, query, limit = 50 }) {
    const lowerQuery = query.toLowerCase();
    const results = [];

    for (const msg of messages) {
        const score = calculateSearchScore(msg, lowerQuery);
        if (score > 0) {
            results.push({ ...msg, searchScore: score });
        }
    }

    // Sort by score
    results.sort((a, b) => b.searchScore - a.searchScore);

    return results.slice(0, limit);
}

/**
 * Calculate search score
 */
function calculateSearchScore(message, query) {
    let score = 0;
    const content = message.content.toLowerCase();
    const username = message.username?.toLowerCase() || '';

    // Exact match
    if (content === query) score += 100;
    if (username === query) score += 100;

    // Starts with
    if (content.startsWith(query)) score += 50;
    if (username.startsWith(query)) score += 50;

    // Contains
    if (content.includes(query)) score += 25;
    if (username.includes(query)) score += 25;

    // Word match
    const words = query.split(' ');
    words.forEach(word => {
        if (content.includes(word)) score += 10;
        if (username.includes(word)) score += 10;
    });

    return score;
}

/**
 * Process large data
 */
function processLargeData({ data, operation }) {
    switch (operation) {
        case 'aggregate':
            return aggregateData(data);
        case 'groupBy':
            return groupByKey(data, data.key);
        case 'deduplicate':
            return deduplicateData(data);
        default:
            return data;
    }
}

/**
 * Aggregate data
 */
function aggregateData(items) {
    return items.reduce((acc, item) => {
        acc.count = (acc.count || 0) + 1;
        acc.total = (acc.total || 0) + (item.value || 0);
        return acc;
    }, {});
}

/**
 * Group by key
 */
function groupByKey(items, key) {
    return items.reduce((acc, item) => {
        const groupKey = item[key];
        if (!acc[groupKey]) acc[groupKey] = [];
        acc[groupKey].push(item);
        return acc;
    }, {});
}

/**
 * Deduplicate data
 */
function deduplicateData(items) {
    const seen = new Set();
    return items.filter(item => {
        const key = JSON.stringify(item);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

/**
 * Simple compression (run-length encoding)
 */
function compressData({ data }) {
    const str = JSON.stringify(data);
    let compressed = '';
    let count = 1;

    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1]) {
            count++;
        } else {
            compressed += (count > 1 ? count : '') + str[i];
            count = 1;
        }
    }

    return compressed;
}

/**
 * Decompress data
 */
function decompressData({ data }) {
    let decompressed = '';
    let i = 0;

    while (i < data.length) {
        let count = '';
        while (!isNaN(data[i]) && data[i] !== ' ') {
            count += data[i];
            i++;
        }

        const char = data[i];
        const repeat = count ? parseInt(count) : 1;
        decompressed += char.repeat(repeat);
        i++;
    }

    return JSON.parse(decompressed);
}

/**
 * Parse markdown (simple)
 */
function parseMarkdown({ text }) {
    let html = text;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

    // Code
    html = html.replace(/`(.*?)`/gim, '<code>$1</code>');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');

    // Line breaks
    html = html.replace(/\n/gim, '<br>');

    return html;
}

/**
 * Generate thumbnails metadata
 */
function generateThumbnails({ images, maxWidth = 200, maxHeight = 200 }) {
    return images.map(img => ({
        ...img,
        thumbnailWidth: Math.min(img.width, maxWidth),
        thumbnailHeight: Math.min(img.height, maxHeight),
        aspectRatio: img.width / img.height
    }));
}

/**
 * Array diff
 */
function diffArrays({ oldArray, newArray }) {
    const added = newArray.filter(item => !oldArray.includes(item));
    const removed = oldArray.filter(item => !newArray.includes(item));
    const unchanged = oldArray.filter(item => newArray.includes(item));

    return { added, removed, unchanged };
}

console.log('✅ [Worker] Data processor worker initialized');


