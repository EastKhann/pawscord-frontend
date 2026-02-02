// New Features Index - Export all new components
// Created: 2026-01-20

// Global Search
export { default as GlobalSearch } from './GlobalSearch/GlobalSearch';

// Pinned Messages
export { default as PinnedMessages, PinnedMessageBadge } from './PinnedMessages/PinnedMessages';

// Mention Highlight
export { default as MentionHighlight, MentionBadge, SelfMentionAlert } from './MentionHighlight/MentionHighlight';

// User Activity Graph
export { default as UserActivityGraph, MiniActivityBar, ActivityStreak } from './UserActivityGraph/UserActivityGraph';

// Custom Status
export { default as CustomStatus, StatusBadge, StatusIndicator, useCustomStatus } from './CustomStatus/CustomStatus';

// Mini Games
export { default as MiniGames, TicTacToe, Hangman, Trivia } from './MiniGames/MiniGames';

// Dice Roller / Random Commands
export { default as DiceRoller, RandomPicker, CoinFlip, RandomNumber, randomUtils } from './DiceRoller/DiceRoller';

// Reminders
export { default as Reminders, useReminders, ReminderToast, parseRemindCommand } from './Reminders/Reminders';

// Auto Dark Mode / Theme
export { default as AutoDarkMode, ThemeProvider, useTheme, ThemeToggleButton } from './AutoDarkMode/AutoDarkMode';

// Poll Analytics
export { default as PollAnalytics, PollResultsSummary, exportPollResults } from './PollAnalytics/PollAnalytics';

// Previously created components
export { default as QuickActions } from './QuickActions/QuickActions';
export { default as TypingIndicator, ReadReceipts, useTypingIndicator, useReadReceipts } from './TypingIndicator/TypingIndicator';
