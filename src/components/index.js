// frontend/src/components/index.js
// Barrel exports for shared/reusable components.
// Usage: import { ErrorBoundary, LoadingSpinner, ConfirmModal } from '@/components';
//
// NOTE: Only the most commonly shared components are exported here.
// Feature-specific components (e.g. AdminPanelModal, CryptoStoreModal) should be
// imported directly from their own directory for better code-splitting.

// ─── Error Boundaries ───
export { default as ErrorBoundary, EnhancedErrorBoundary, useError, withErrorBoundary } from './ErrorBoundary';
export { default as FeatureErrorBoundary } from './FeatureErrorBoundary';
export { default as RouteErrorBoundary } from './RouteErrorBoundary';
export { default as SuspenseWithBoundary, SectionErrorBoundary } from './SuspenseWithBoundary';

// ─── Loading & Feedback ───
export { default as LoadingSpinner } from './LoadingSpinner';
export { default as LoadingSkeleton } from './LoadingSkeleton';
export { default as ConnectionStatusBar } from './ConnectionStatusBar';
export { default as MaintenanceBanner } from './MaintenanceBanner';

// ─── Modals & Dialogs ───
export { default as ConfirmModal } from './ConfirmModal';
export { default as AppModals } from './AppModals';
export { default as PremiumModal } from './PremiumModal';
export { default as DownloadModal } from './DownloadModal';
export { default as KeyboardShortcutsModal } from './KeyboardShortcutsModal';

// ─── Chat UI ───
export { default as MessageDateDivider } from './MessageDateDivider';
export { default as NewMessagesDivider } from './NewMessagesDivider';
export { default as ScrollToBottomButton } from './ScrollToBottomButton';
export { default as MessageSkeleton } from './MessageSkeleton';
export { default as MessageReactions } from './MessageReactions';
export { default as MessageContextMenu } from './MessageContextMenu';
export { BookmarkButton, StarButton, ReadLaterButton } from './BookmarkButton';

// ─── User UI ───
export { default as UserFooter } from './UserFooter';
export { default as UserContextMenu } from './UserContextMenu';
export { default as StatusPicker } from './StatusPicker';
export { default as NotificationDropdown } from './NotificationDropdown';

// ─── Media ───
export { default as LazyImage } from './LazyImage';
export { default as CodeBlock } from './CodeBlock';
export { default as ImageLightbox } from './ImageLightbox';
export { default as VoiceMessage } from './VoiceMessage';

// ─── Navigation ───
export { default as MobileNav } from './MobileNav';
export { default as ProtectedRoute } from './ProtectedRoute';
export { default as PageWrapper } from './PageWrapper';

// ─── Layout Helpers ───
export { default as Spoiler } from './Spoiler';
export { default as ReadReceipt } from './ReadReceipt';
export { default as StickyMessageBanner } from './StickyMessageBanner';
