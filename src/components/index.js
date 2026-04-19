// frontend/src/components/index.js
// Barrel exports for shared/reusable components.
// Usage: import { ErrorBoundary, LoadingSpinner, ConfirmModal } from '@/components';
//
// NOTE: Only the most commonly shared components are exported here.
// Feature-specific components (e.g. AdminPanelModal, CryptoStoreModal) should be
// imported directly from their own directory for better code-splitting.

// ─── Error Boundaries ───
export { default as ErrorBoundary } from './shared/ErrorBoundary';
export {
    default as EnhancedErrorBoundary,
    useError,
    withErrorBoundary,
} from './ErrorBoundary/EnhancedErrorBoundary';
export { default as FeatureErrorBoundary } from './shared/FeatureErrorBoundary';
export { default as RouteErrorBoundary } from './shared/RouteErrorBoundary';
export {
    default as SuspenseWithBoundary,
    SectionErrorBoundary,
} from './shared/SuspenseWithBoundary';

// ─── Loading & Feedback ───
export { default as LoadingSpinner } from './shared/LoadingSpinner';
export { default as LoadingSkeleton } from './shared/LoadingSkeleton';
export { default as ConnectionStatusBar } from './profile/ConnectionStatusBar';
export { default as MaintenanceBanner } from './shared/MaintenanceBanner';

// ─── Modals & Dialogs ───
export { default as ConfirmModal } from './shared/ConfirmModal';
export { default as AppModals } from './shared/AppModals';
export { default as PremiumModal } from './premium/PremiumModal';
export { default as DownloadModal } from './shared/DownloadModal';
export { default as KeyboardShortcutsModal } from './shared/KeyboardShortcutsModal';

// ─── Chat UI ───
export { default as MessageDateDivider } from './chat/MessageDateDivider';
export { default as NewMessagesDivider } from './chat/NewMessagesDivider';
export { default as ScrollToBottomButton } from './chat/ScrollToBottomButton';
export { default as MessageSkeleton } from './chat/MessageSkeleton';
export { default as MessageReactions } from './chat/MessageReactions';
export { default as MessageContextMenu } from './chat/MessageContextMenu';
export { BookmarkButton, StarButton, ReadLaterButton } from './chat/BookmarkButton';

// ─── User UI ───
export { default as UserFooter } from './profile/UserFooter';
export { default as UserContextMenu } from './profile/UserContextMenu';
export { default as StatusPicker } from './profile/StatusPicker';
export { default as NotificationDropdown } from './notifications/NotificationDropdown';

// ─── Media ───
export { default as LazyImage } from './shared/LazyImage';
export { default as CodeBlock } from './chat/CodeBlock';
export { default as ImageLightbox } from './shared/ImageLightbox';
export { default as VoiceMessage } from './chat/VoiceMessage';

// ─── Navigation ───
export { default as MobileNav } from './shared/MobileNav';
export { default as ProtectedRoute } from './shared/ProtectedRoute';
export { default as PageWrapper } from './shared/PageWrapper';

// ─── Layout Helpers ───
export { default as Spoiler } from './chat/Spoiler';
export { default as ReadReceipt } from './chat/ReadReceipt';
export { default as StickyMessageBanner } from './shared/StickyMessageBanner';
