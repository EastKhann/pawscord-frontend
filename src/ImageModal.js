// frontend/src/ImageModal.js

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import useModalA11y from './hooks/useModalA11y';

const ImageModal = ({ imageUrl, onClose }) => {
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Resim Önizleme' });

    const modalContent = (
        <div style={styles.overlay} {...overlayProps}>
            <div {...dialogProps} style={styles.dialog}>
                <button onClick={onClose} style={styles.closeBtn} aria-label="Kapat">✕</button>
                <img src={imageUrl} style={styles.image} alt="Büyütülmüş Resim" />
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        cursor: 'pointer',
        animation: 'imgModalFadeIn 0.2s ease',
    },
    dialog: {
        position: 'relative',
        outline: 'none',
        background: 'rgba(30,31,35,0.65)',
        borderRadius: '16px',
        padding: '8px',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(88,101,242,0.10)',
        animation: 'imgModalScaleIn 0.25s cubic-bezier(0.22,1,0.36,1)',
    },
    closeBtn: {
        position: 'absolute',
        top: '-12px',
        right: '-12px',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: 'rgba(30,31,35,0.9)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: '#b5bac1',
        fontSize: '16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        transition: 'all 0.2s',
        zIndex: 1,
    },
    image: {
        maxWidth: '88vw',
        maxHeight: '85vh',
        objectFit: 'contain',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        display: 'block',
    },
};

const imgModalSheet = document.createElement("style");
imgModalSheet.textContent = `
  @keyframes imgModalFadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes imgModalScaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
`;
document.head.appendChild(imgModalSheet);

export default React.memo(ImageModal);

