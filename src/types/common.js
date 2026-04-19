// frontend/src/types/common.js
// Shared JSDoc type definitions for JavaScript files.
// Import with: /** @typedef {import('@/types/common').User} User */

/**
 * @typedef {Object} User
 * @property {number|string} id - Unique user identifier
 * @property {string} username - Display username
 * @property {string|null} avatar - Avatar URL or null
 * @property {'online'|'idle'|'dnd'|'offline'} status - Online status
 * @property {string} [statusMessage] - Custom status message
 * @property {string} [friendCode] - Friend invite code
 * @property {boolean} [is_premium] - Whether user has premium
 */

/**
 * @typedef {Object} Message
 * @property {number|string} id - Unique message identifier
 * @property {string} content - Message text content
 * @property {string} username - Author's username
 * @property {string|null} avatar - Author's avatar URL
 * @property {string} timestamp - ISO timestamp of creation
 * @property {boolean} edited - Whether message was edited
 * @property {string|null} [image_url] - Attached image URL
 * @property {string|null} [file_url] - Attached file URL
 * @property {string|null} [file_name] - Attached file name
 * @property {boolean} [is_voice_message] - Whether this is a voice message
 * @property {Object|null} [reply_to] - Parent message if this is a reply
 * @property {Object|null} [poll] - Poll data if this is a poll message
 * @property {Array<Object>} [reactions] - Reaction objects
 * @property {string|null} [temp_id] - Temporary ID for optimistic updates
 */

/**
 * @typedef {Object} Server
 * @property {number|string} id - Unique server identifier
 * @property {string} name - Server display name
 * @property {string|null} icon - Server icon URL
 * @property {string} slug - URL-safe server slug
 * @property {string} ownerId - Owner's user ID
 * @property {string} [owner_username] - Owner's username
 * @property {Array<Category>} [categories] - Server categories with rooms
 * @property {Object} [my_permissions] - Current user's permissions in this server
 */

/**
 * @typedef {Object} Category
 * @property {number|string} id - Category identifier
 * @property {string} name - Category name
 * @property {number} position - Sort position
 * @property {Array<Room>} rooms - Rooms within this category
 */

/**
 * @typedef {Object} Room
 * @property {number|string} id - Room identifier
 * @property {string} name - Room display name
 * @property {string} slug - URL-safe room slug
 * @property {'text'|'voice'|'category'} type - Room type
 * @property {string} [topic] - Room topic description
 * @property {boolean} [is_private] - Whether room is private
 */

/**
 * @typedef {Object} ActiveChat
 * @property {'room'|'dm'|'welcome'|'voice'} type - Chat type
 * @property {string|number} id - Chat identifier (room slug or DM user ID)
 * @property {string|null} targetUser - Target username for DMs
 */

/**
 * @typedef {Object} InviteCode
 * @property {string} code - The invite code string
 * @property {number} uses - Number of times the invite has been used
 * @property {number} max_uses - Maximum uses (0 = unlimited)
 * @property {string|null} expires_at - Expiry ISO timestamp or null
 * @property {string} created_by - Username of creator
 */

/**
 * @typedef {Object} Notification
 * @property {number} id - Notification identifier
 * @property {string} type - Notification type (mention, reply, friend_request, etc.)
 * @property {string} message - Notification text
 * @property {boolean} is_read - Whether notification has been read
 * @property {string} created_at - ISO timestamp
 * @property {Object} [data] - Additional notification-specific data
 */

/**
 * @typedef {Object} VoiceUser
 * @property {number|string} userId - User ID
 * @property {string} username - Username
 * @property {boolean} isMuted - Whether user is muted
 * @property {boolean} isDeafened - Whether user is deafened
 * @property {boolean} isSpeaking - Whether user is currently speaking
 * @property {boolean} [isCameraOn] - Camera status
 * @property {boolean} [isScreenSharing] - Screen sharing status
 */

// Export empty object to make this a module
export {};
