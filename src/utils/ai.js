// frontend/src/utils/ai.js
/**
 * 🤖 AI CHATBOT UTILITIES
 * OpenAI ChatGPT-4 Integration
 */

/**
 * Ask AI a question (/ask command)
 */
export async function askAI(question, apiBaseUrl, fetchWithAuth) {
    try {

        const response = await fetchWithAuth(`${apiBaseUrl}/ai/ask/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 429) {
                throw new Error(data.message || 'Daily limit reached. Upgrade to Premium for unlimited access.');
            }
            throw new Error(data.error || 'AI request failed');
        }

        return data;

    } catch (error) {
        console.error('❌ [AI] Error:', error);
        throw error;
    }
}

/**
 * Summarize channel messages (/summarize command)
 */
export async function summarizeChannel(roomId, count, apiBaseUrl, fetchWithAuth) {
    try {

        const response = await fetchWithAuth(`${apiBaseUrl}/ai/summarize/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                room_id: roomId,
                count: count || 50
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Summarize request failed');
        }

        return data;

    } catch (error) {
        console.error('❌ [AI] Summarize error:', error);
        throw error;
    }
}

/**
 * Get smart reply suggestions (Gmail-style)
 */
export async function getSmartReplies(lastMessage, context, apiBaseUrl, fetchWithAuth) {
    try {
        const response = await fetchWithAuth(`${apiBaseUrl}/ai/smart-reply/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: lastMessage,
                context: context || []
            })
        });

        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        return data.suggestions || [];

    } catch (error) {
        console.error('❌ [AI] Smart reply error:', error);
        return [];
    }
}

/**
 * Explain something (/explain command)
 */
export async function explainConcept(text, apiBaseUrl, fetchWithAuth) {
    try {
        const response = await fetchWithAuth(`${apiBaseUrl}/ai/explain/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Explain request failed');
        }

        return data;

    } catch (error) {
        console.error('❌ [AI] Explain error:', error);
        throw error;
    }
}

/**
 * Generate code (/code command)
 */
export async function generateCode(description, language, apiBaseUrl, fetchWithAuth) {
    try {
        const response = await fetchWithAuth(`${apiBaseUrl}/ai/code/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description,
                language: language || 'python'
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Code generation failed');
        }

        return data;

    } catch (error) {
        console.error('❌ [AI] Code generation error:', error);
        throw error;
    }
}

/**
 * Get remaining AI quota
 */
export async function getAIQuota(apiBaseUrl, fetchWithAuth) {
    try {
        const response = await fetchWithAuth(`${apiBaseUrl}/ai/quota/`);

        if (!response.ok) {
            return { remaining: 0, used_today: 0, unlimited: false };
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('❌ [AI] Quota error:', error);
        return { remaining: 0, used_today: 0, unlimited: false };
    }
}

/**
 * Parse slash command
 * Returns: { command, args } or null
 */
export function parseSlashCommand(text) {
    if (!text || !text.startsWith('/')) return null;

    const trimmed = text.trim();
    const spaceIndex = trimmed.indexOf(' ');

    if (spaceIndex === -1) {
        // No arguments
        return {
            command: trimmed.substring(1).toLowerCase(),
            args: ''
        };
    }

    const command = trimmed.substring(1, spaceIndex).toLowerCase();
    const args = trimmed.substring(spaceIndex + 1).trim();

    return { command, args };
}

/**
 * Check if text is a slash command
 */
export function isSlashCommand(text) {
    return text && text.trim().startsWith('/');
}

/**
 * Get available AI commands
 */
export function getAICommands() {
    return [
        {
            command: '/ask',
            description: 'Ask ChatGPT anything',
            example: '/ask What is the meaning of life?',
            icon: '🤖'
        },
        {
            command: '/summarize',
            description: 'Summarize channel messages',
            example: '/summarize',
            icon: '📝'
        },
        {
            command: '/explain',
            description: 'Explain a concept',
            example: '/explain quantum computing',
            icon: '💡'
        },
        {
            command: '/code',
            description: 'Generate code',
            example: '/code fibonacci function in python',
            icon: '💻'
        }
    ];
}




