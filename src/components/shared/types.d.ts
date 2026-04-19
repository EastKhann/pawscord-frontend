import { ComponentType, ReactNode, ErrorInfo } from 'react';

// ==========================================
// Shared Component Type Definitions
// ==========================================

// LoadingSpinner
export interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    text?: string;
    fullscreen?: boolean;
}
export declare const LoadingSpinner: React.FC<LoadingSpinnerProps>;

// ErrorBoundary
export interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode | ((error: Error, resetError: () => void) => ReactNode);
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}
export interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}
export declare class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {}

// ConfirmModal
export interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void | Promise<void>;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info' | 'success';
    loading?: boolean;
}
export declare const ConfirmModal: React.FC<ConfirmModalProps>;

// LazyImage
export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    fallbackSrc?: string;
    placeholder?: ReactNode;
    onLoadComplete?: () => void;
    threshold?: number;
    className?: string;
}
export declare const LazyImage: React.FC<LazyImageProps>;

// SuspenseWithBoundary
export interface SuspenseWithBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    errorFallback?: ReactNode;
}
export declare const SuspenseWithBoundary: React.FC<SuspenseWithBoundaryProps>;

// ConnectionStatusBanner
export interface ConnectionStatusBannerProps {
    status?: 'connected' | 'connecting' | 'disconnected' | 'error';
    message?: string;
    onRetry?: () => void;
    className?: string;
}
export declare const ConnectionStatusBanner: React.FC<ConnectionStatusBannerProps>;

// Toast / ToastContainer
export type ToastType = 'success' | 'error' | 'warning' | 'info';
export interface ToastOptions {
    type?: ToastType;
    duration?: number;
    position?:
        | 'top-right'
        | 'top-left'
        | 'bottom-right'
        | 'bottom-left'
        | 'top-center'
        | 'bottom-center';
    dismissible?: boolean;
}
export interface Toast {
    id: string;
    message: string;
    type: ToastType;
    duration: number;
}
export declare const ToastContainer: React.FC;

// Tooltip
export interface TooltipProps {
    children: ReactNode;
    content: ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    className?: string;
}
export declare const Tooltip: React.FC<TooltipProps>;

// SearchBar
export interface SearchBarProps {
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    debounceMs?: number;
    onSearch?: (query: string) => void;
    className?: string;
}
export declare const SearchBar: React.FC<SearchBarProps>;

// Pagination
export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblingCount?: number;
    className?: string;
}
export declare const Pagination: React.FC<PaginationProps>;

// UserAvatar
export interface UserAvatarProps {
    user: {
        id: string | number;
        username?: string;
        avatar_url?: string;
        avatar_frame?: string;
        is_online?: boolean;
    };
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    showStatus?: boolean;
    showFrame?: boolean;
    onClick?: () => void;
    className?: string;
}
export declare const UserAvatar: React.FC<UserAvatarProps>;

// Modal
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    showCloseButton?: boolean;
    className?: string;
}
export declare const Modal: React.FC<ModalProps>;

// Badge
export interface BadgeProps {
    count?: number;
    max?: number;
    showZero?: boolean;
    variant?: 'primary' | 'danger' | 'success' | 'warning';
    children?: ReactNode;
    className?: string;
}
export declare const Badge: React.FC<BadgeProps>;

// Dropdown
export interface DropdownOption {
    label: string;
    value: string | number;
    icon?: ReactNode;
    disabled?: boolean;
    danger?: boolean;
}
export interface DropdownProps {
    options: DropdownOption[];
    onSelect: (option: DropdownOption) => void;
    trigger: ReactNode;
    position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    className?: string;
}
export declare const Dropdown: React.FC<DropdownProps>;
