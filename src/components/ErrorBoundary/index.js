// frontend/src/components/ErrorBoundary/index.js
// 🛡️ Error Boundary Module Exports

// Legacy ErrorBoundary (class component)
export { default as ErrorBoundary } from './ErrorBoundary.jsx';

// Enhanced ErrorBoundary with auto-recovery & reporting
export {
    default as EnhancedErrorBoundary,
    useError,
    withErrorBoundary
} from './EnhancedErrorBoundary.js';

// Default export - Enhanced version
export { default } from './EnhancedErrorBoundary.js';
