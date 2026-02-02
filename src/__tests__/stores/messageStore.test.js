// frontend/src/__tests__/stores/messageStore.test.js
// 🧪 Message Store Unit Tests

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock message data
const mockMessages = [
    {
        id: 1,
        content: 'Hello World!',
        author: { id: 1, username: 'user1', avatar: 'avatar1.png' },
        channel_id: 1,
        created_at: '2024-01-15T10:00:00Z',
        reactions: [],
        attachments: [],
        edited: false
    },
    {
        id: 2,
        content: 'Test message with emoji 😊',
        author: { id: 2, username: 'user2', avatar: 'avatar2.png' },
        channel_id: 1,
        created_at: '2024-01-15T10:05:00Z',
        reactions: [{ emoji: '👍', count: 3, users: [1, 2, 3] }],
        attachments: [],
        edited: false
    },
    {
        id: 3,
        content: 'Message with attachment',
        author: { id: 1, username: 'user1', avatar: 'avatar1.png' },
        channel_id: 1,
        created_at: '2024-01-15T10:10:00Z',
        reactions: [],
        attachments: [{ id: 1, filename: 'image.png', url: 'http://cdn.example.com/image.png' }],
        edited: true,
        edited_at: '2024-01-15T10:12:00Z'
    }
];

const mockMessageStore = {
    messages: {},
    isLoading: false,
    hasMore: true,
    error: null,
    typingUsers: {},

    fetchMessages: vi.fn(),
    sendMessage: vi.fn(),
    editMessage: vi.fn(),
    deleteMessage: vi.fn(),
    addReaction: vi.fn(),
    removeReaction: vi.fn(),
    addMessage: vi.fn(),
    setTyping: vi.fn(),
    clearMessages: vi.fn(),
    pinMessage: vi.fn(),
    unpinMessage: vi.fn(),
    searchMessages: vi.fn()
};

vi.mock('../../stores/messageStore', () => ({
    default: () => mockMessageStore,
    useMessageStore: () => mockMessageStore
}));

describe('Message Store', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockMessageStore.messages = {};
        mockMessageStore.typingUsers = {};
        mockMessageStore.error = null;
        mockMessageStore.hasMore = true;
    });

    describe('Initial State', () => {
        it('should have empty messages object', () => {
            expect(mockMessageStore.messages).toEqual({});
        });

        it('should have empty typing users', () => {
            expect(mockMessageStore.typingUsers).toEqual({});
        });

        it('should have hasMore as true', () => {
            expect(mockMessageStore.hasMore).toBe(true);
        });
    });

    describe('Fetch Messages', () => {
        it('should fetch messages for a channel', async () => {
            mockMessageStore.fetchMessages.mockImplementationOnce((channelId) => {
                mockMessageStore.messages[channelId] = mockMessages;
            });

            await mockMessageStore.fetchMessages(1);

            expect(mockMessageStore.fetchMessages).toHaveBeenCalledWith(1);
            expect(mockMessageStore.messages[1]).toHaveLength(3);
        });

        it('should handle pagination', async () => {
            mockMessageStore.messages[1] = mockMessages;

            const olderMessages = [
                {
                    id: 0,
                    content: 'Older message',
                    created_at: '2024-01-15T09:00:00Z'
                }
            ];

            mockMessageStore.fetchMessages.mockImplementationOnce((channelId, before) => {
                mockMessageStore.messages[channelId] = [
                    ...olderMessages,
                    ...mockMessageStore.messages[channelId]
                ];
            });

            await mockMessageStore.fetchMessages(1, 1);

            expect(mockMessageStore.fetchMessages).toHaveBeenCalledWith(1, 1);
            expect(mockMessageStore.messages[1]).toHaveLength(4);
        });

        it('should set hasMore to false when no more messages', async () => {
            mockMessageStore.fetchMessages.mockImplementationOnce(() => {
                mockMessageStore.hasMore = false;
            });

            await mockMessageStore.fetchMessages(1, 0);

            expect(mockMessageStore.hasMore).toBe(false);
        });
    });

    describe('Send Message', () => {
        it('should send a text message', async () => {
            const newMessage = {
                content: 'New message',
                channel_id: 1
            };

            const sentMessage = {
                id: 4,
                ...newMessage,
                author: { id: 1, username: 'user1' },
                created_at: new Date().toISOString(),
                reactions: [],
                attachments: []
            };

            mockMessageStore.sendMessage.mockImplementationOnce((channelId, content) => {
                if (!mockMessageStore.messages[channelId]) {
                    mockMessageStore.messages[channelId] = [];
                }
                mockMessageStore.messages[channelId].push(sentMessage);
                return sentMessage;
            });

            await mockMessageStore.sendMessage(1, 'New message');

            expect(mockMessageStore.sendMessage).toHaveBeenCalledWith(1, 'New message');
        });

        it('should send message with attachments', async () => {
            const attachments = [
                { file: new File(['test'], 'test.txt'), name: 'test.txt' }
            ];

            mockMessageStore.sendMessage.mockImplementationOnce((channelId, content, files) => {
                return { id: 5, content, attachments: files };
            });

            await mockMessageStore.sendMessage(1, 'Message with file', attachments);

            expect(mockMessageStore.sendMessage).toHaveBeenCalledWith(1, 'Message with file', attachments);
        });
    });

    describe('Edit Message', () => {
        it('should edit an existing message', async () => {
            mockMessageStore.messages[1] = [...mockMessages];

            mockMessageStore.editMessage.mockImplementationOnce((messageId, newContent) => {
                const message = mockMessageStore.messages[1].find(m => m.id === messageId);
                if (message) {
                    message.content = newContent;
                    message.edited = true;
                    message.edited_at = new Date().toISOString();
                }
            });

            await mockMessageStore.editMessage(1, 'Updated content');

            expect(mockMessageStore.editMessage).toHaveBeenCalledWith(1, 'Updated content');
            expect(mockMessageStore.messages[1][0].content).toBe('Updated content');
            expect(mockMessageStore.messages[1][0].edited).toBe(true);
        });
    });

    describe('Delete Message', () => {
        it('should delete a message', async () => {
            mockMessageStore.messages[1] = [...mockMessages];

            mockMessageStore.deleteMessage.mockImplementationOnce((messageId) => {
                mockMessageStore.messages[1] = mockMessageStore.messages[1].filter(m => m.id !== messageId);
            });

            await mockMessageStore.deleteMessage(1);

            expect(mockMessageStore.deleteMessage).toHaveBeenCalledWith(1);
            expect(mockMessageStore.messages[1]).toHaveLength(2);
            expect(mockMessageStore.messages[1].find(m => m.id === 1)).toBeUndefined();
        });
    });

    describe('Reactions', () => {
        it('should add a reaction to message', async () => {
            mockMessageStore.messages[1] = [...mockMessages];

            mockMessageStore.addReaction.mockImplementationOnce((messageId, emoji) => {
                const message = mockMessageStore.messages[1].find(m => m.id === messageId);
                if (message) {
                    const existingReaction = message.reactions.find(r => r.emoji === emoji);
                    if (existingReaction) {
                        existingReaction.count++;
                    } else {
                        message.reactions.push({ emoji, count: 1, users: [1] });
                    }
                }
            });

            await mockMessageStore.addReaction(1, '🔥');

            expect(mockMessageStore.addReaction).toHaveBeenCalledWith(1, '🔥');
        });

        it('should remove a reaction from message', async () => {
            mockMessageStore.messages[1] = [...mockMessages];

            mockMessageStore.removeReaction.mockImplementationOnce((messageId, emoji) => {
                const message = mockMessageStore.messages[1].find(m => m.id === messageId);
                if (message) {
                    const reactionIndex = message.reactions.findIndex(r => r.emoji === emoji);
                    if (reactionIndex !== -1) {
                        if (message.reactions[reactionIndex].count > 1) {
                            message.reactions[reactionIndex].count--;
                        } else {
                            message.reactions.splice(reactionIndex, 1);
                        }
                    }
                }
            });

            await mockMessageStore.removeReaction(2, '👍');

            expect(mockMessageStore.removeReaction).toHaveBeenCalledWith(2, '👍');
        });
    });

    describe('Real-time Updates', () => {
        it('should add incoming message from WebSocket', () => {
            mockMessageStore.messages[1] = [...mockMessages];

            const incomingMessage = {
                id: 100,
                content: 'Real-time message',
                author: { id: 3, username: 'user3' },
                channel_id: 1,
                created_at: new Date().toISOString()
            };

            mockMessageStore.addMessage.mockImplementationOnce((channelId, message) => {
                mockMessageStore.messages[channelId].push(message);
            });

            mockMessageStore.addMessage(1, incomingMessage);

            expect(mockMessageStore.addMessage).toHaveBeenCalledWith(1, incomingMessage);
            expect(mockMessageStore.messages[1]).toHaveLength(4);
        });
    });

    describe('Typing Indicators', () => {
        it('should track typing users', () => {
            mockMessageStore.setTyping.mockImplementationOnce((channelId, userId, isTyping) => {
                if (!mockMessageStore.typingUsers[channelId]) {
                    mockMessageStore.typingUsers[channelId] = [];
                }
                if (isTyping) {
                    mockMessageStore.typingUsers[channelId].push(userId);
                } else {
                    mockMessageStore.typingUsers[channelId] =
                        mockMessageStore.typingUsers[channelId].filter(id => id !== userId);
                }
            });

            mockMessageStore.setTyping(1, 2, true);

            expect(mockMessageStore.setTyping).toHaveBeenCalledWith(1, 2, true);
            expect(mockMessageStore.typingUsers[1]).toContain(2);
        });
    });

    describe('Pin/Unpin Messages', () => {
        it('should pin a message', async () => {
            await mockMessageStore.pinMessage(1);
            expect(mockMessageStore.pinMessage).toHaveBeenCalledWith(1);
        });

        it('should unpin a message', async () => {
            await mockMessageStore.unpinMessage(1);
            expect(mockMessageStore.unpinMessage).toHaveBeenCalledWith(1);
        });
    });

    describe('Search Messages', () => {
        it('should search messages with query', async () => {
            const searchResults = [mockMessages[0]];

            mockMessageStore.searchMessages.mockResolvedValueOnce(searchResults);

            const results = await mockMessageStore.searchMessages('Hello');

            expect(mockMessageStore.searchMessages).toHaveBeenCalledWith('Hello');
            expect(results).toHaveLength(1);
        });
    });

    describe('Clear Messages', () => {
        it('should clear messages for a channel', () => {
            mockMessageStore.messages[1] = [...mockMessages];

            mockMessageStore.clearMessages.mockImplementationOnce((channelId) => {
                delete mockMessageStore.messages[channelId];
            });

            mockMessageStore.clearMessages(1);

            expect(mockMessageStore.clearMessages).toHaveBeenCalledWith(1);
            expect(mockMessageStore.messages[1]).toBeUndefined();
        });
    });
});
