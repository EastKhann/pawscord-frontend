// components/ModalWrapper.js
// 🎨 Universal Modal Wrapper with mobile support and memory leak prevention

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const ModalWrapper = ({
  children,
  onClose,
  size = 'md', // sm, md, lg, xl, full
  showBackdrop = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className = ''
}) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Keyboard listener
    const handleEscape = (e) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEscape);

    // Cleanup
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose, closeOnEscape]);

  const sizeClasses = {
    sm: 'modal-sm',
    md: 'modal-md',
    lg: 'modal-lg',
    xl: 'modal-xl',
    full: 'modal-full'
  };

  const handleBackdropClick = (e) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  const modalContent = (
    <div style={styles.overlay} onClick={handleBackdropClick}>
      {showBackdrop && <div style={styles.backdrop} />}
      <div
        className={`modal-content ${sizeClasses[size]} ${className}`}
        style={styles.content}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  // Use portal to render at document body level
  return createPortal(modalContent, document.body);
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    // Safe area support for mobile
    paddingTop: 'max(20px, env(safe-area-inset-top))',
    paddingRight: 'max(20px, env(safe-area-inset-right))',
    paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
    paddingLeft: 'max(20px, env(safe-area-inset-left))',
    overflow: 'auto'
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(4px)',
    animation: 'fadeIn 0.2s ease-out'
  },
  content: {
    position: 'relative',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
    animation: 'modalSlideIn 0.3s ease-out'
  }
};

// Inject animations if not already present
if (typeof window !== 'undefined' && !document.getElementById('modal-animations')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'modal-animations';
  styleSheet.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes modalSlideIn {
      from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    /* Size classes */
    .modal-sm { max-width: 400px; }
    .modal-md { max-width: 600px; }
    .modal-lg { max-width: 800px; }
    .modal-xl { max-width: 1000px; }
    .modal-full { max-width: 95vw; max-height: 95vh; }
    
    /* Mobile responsive */
    @media (max-width: 768px) {
      .modal-content {
        max-width: 95vw !important;
        max-height: 85vh !important;
      }
    }
    
    /* Scrollbar styling for modal content */
    .modal-content::-webkit-scrollbar {
      width: 8px;
    }
    
    .modal-content::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 4px;
    }
    
    .modal-content::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
    }
    
    .modal-content::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  `;
  document.head.appendChild(styleSheet);
}

export default ModalWrapper;


