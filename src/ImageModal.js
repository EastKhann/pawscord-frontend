// frontend/src/ImageModal.js

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const ImageModal = ({ imageUrl, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const modalContent = (
        <div style={styles.overlay} onClick={onClose}>
            <img src={imageUrl} style={styles.image} alt="Büyütülmüş Resim" />
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        cursor: 'pointer',
    },
    image: {
        maxWidth: '90vw',
        maxHeight: '90vh',
        objectFit: 'contain',
        boxShadow: '0 0 30px rgba(0,0,0,0.5)',
    },
};

export default React.memo(ImageModal);

