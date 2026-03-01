// frontend/src/constants/index.js
// Consolidated application constants — eliminates magic numbers across the codebase.

// ─── Message Limits ───
/** Maximum character length for a single message. */
export const MAX_MESSAGE_LENGTH = 8000;
/** Maximum number of messages loaded in a single batch. */
export const MESSAGE_BATCH_SIZE = 50;
/** Maximum number of pinned messages per channel. */
export const MAX_PINNED_MESSAGES = 50;
/** Maximum number of reactions per message. */
export const MAX_REACTIONS_PER_MESSAGE = 20;

// ─── File Upload Limits ───
/** Maximum file size for uploads (25MB). */
export const MAX_FILE_SIZE = 25 * 1024 * 1024;
/** Maximum file size for premium users (100MB). */
export const MAX_FILE_SIZE_PREMIUM = 100 * 1024 * 1024;
/** Maximum number of files per message. */
export const MAX_FILES_PER_MESSAGE = 10;
/** Allowed image MIME types. */
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

// ─── Server Limits ───
/** Maximum number of servers a user can join. */
export const MAX_SERVERS = 100;
/** Maximum number of channels per server. */
export const MAX_CHANNELS_PER_SERVER = 500;
/** Maximum number of roles per server. */
export const MAX_ROLES_PER_SERVER = 250;
/** Maximum server name length. */
export const MAX_SERVER_NAME_LENGTH = 100;
/** Maximum channel name length. */
export const MAX_CHANNEL_NAME_LENGTH = 100;

// ─── Timing Constants ───
/** Typing indicator timeout in ms. */
export const TYPING_TIMEOUT = 3000;
/** WebSocket reconnect interval in ms. */
export const RECONNECT_INTERVAL = 5000;
/** Maximum WebSocket reconnect delay in ms (with backoff). */
export const MAX_RECONNECT_DELAY = 30000;
/** Debounce delay for search input in ms. */
export const SEARCH_DEBOUNCE_MS = 300;
/** Auto-save draft interval in ms. */
export const DRAFT_AUTOSAVE_MS = 2000;
/** Toast notification auto-dismiss duration in ms. */
export const TOAST_DURATION = 5000;

// ─── UI Constants ───
/** Number of messages to virtualize before enabling virtual scrolling. */
export const VIRTUAL_SCROLL_THRESHOLD = 100;
/** Sidebar width in pixels. */
export const SIDEBAR_WIDTH = 240;
/** Server rail width in pixels. */
export const SERVER_RAIL_WIDTH = 72;
/** Mobile breakpoint in pixels. */
export const MOBILE_BREAKPOINT = 768;
/** Tablet breakpoint in pixels. */
export const TABLET_BREAKPOINT = 1024;

// ─── Voice Chat ───
/** Maximum voice channel participants. */
export const MAX_VOICE_PARTICIPANTS = 25;
/** Voice auto-disconnect timeout after idle in ms (30 min). */
export const VOICE_IDLE_TIMEOUT = 30 * 60 * 1000;
/** Audio sample rate. */
export const AUDIO_SAMPLE_RATE = 48000;

// ─── Pagination ───
/** Default page size for API list endpoints. */
export const DEFAULT_PAGE_SIZE = 20;
/** Maximum page size allowed. */
export const MAX_PAGE_SIZE = 100;

// ─── Invite Codes ───
/** Default invite expiry in seconds (7 days). */
export const DEFAULT_INVITE_EXPIRY = 7 * 24 * 60 * 60;
/** Maximum uses for an invite code (0 = unlimited). */
export const DEFAULT_INVITE_MAX_USES = 0;
