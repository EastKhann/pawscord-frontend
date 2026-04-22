/* eslint-disable jsx-a11y/no-static-element-interactions */
// frontend/src/components/ImageLightbox.js
// 🖼️ FEATURE 2: Enhanced Image Lightbox
// Zoom, download, rotate, prev/next navigation

import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ReactDOM from 'react-dom';
import {
    FaTimes,
    FaDownload,
    FaSearchPlus,
    FaSearchMinus,
    FaUndo,
    FaChevronLeft,
    FaChevronRight,
    FaExpand,
} from 'react-icons/fa';

const ImageLightbox = ({ imageUrl, images = [], startIndex = 0, onClose }) => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(startIndex);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef({ startX: 0, startY: 0, startPosX: 0, startPosY: 0 });

    // If single image mode (backward compat)
    const imageList = images.length > 0 ? images : imageUrl ? [imageUrl] : [];
    const currentImage = imageList[currentIndex] || imageUrl;
    const hasMultiple = imageList.length > 1;

    const goNext = useCallback(() => {
        if (hasMultiple) {
            setCurrentIndex((i) => (i + 1) % imageList.length);
            setZoom(1);
            setRotation(0);
            setPosition({ x: 0, y: 0 });
        }
    }, [hasMultiple, imageList.length]);

    const goPrev = useCallback(() => {
        if (hasMultiple) {
            setCurrentIndex((i) => (i - 1 + imageList.length) % imageList.length);
            setZoom(1);
            setRotation(0);
            setPosition({ x: 0, y: 0 });
        }
    }, [hasMultiple, imageList.length]);

    const handleZoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.5, 5)), []);
    const handleZoomOut = useCallback(() => {
        setZoom((z) => {
            const nz = Math.max(z - 0.5, 0.5);
            if (nz <= 1) setPosition({ x: 0, y: 0 });
            return nz;
        });
    }, []);
    const handleRotate = useCallback(() => setRotation((r) => (r + 90) % 360), []);
    const handleReset = useCallback(() => {
        setZoom(1);
        setRotation(0);
        setPosition({ x: 0, y: 0 });
    }, []);

    const handleDownload = useCallback(() => {
        const a = document.createElement('a');
        a.href = currentImage;
        a.download = currentImage.split('/').pop() || 'image';
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }, [currentImage]);

    // Keyboard shortcuts
    useEffect(() => {
        const handler = (e) => {
            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowRight':
                    goNext();
                    break;
                case 'ArrowLeft':
                    goPrev();
                    break;
                case '+':
                case '=':
                    handleZoomIn();
                    break;
                case '-':
                    handleZoomOut();
                    break;
                case 'r':
                    handleRotate();
                    break;
                case '0':
                    handleReset();
                    break;
                default:
                    break;
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose, goNext, goPrev, handleZoomIn, handleZoomOut, handleRotate, handleReset]);

    // Mouse wheel zoom
    const handleWheel = useCallback((e) => {
        e.preventDefault();
        if (e.deltaY < 0) setZoom((z) => Math.min(z + 0.2, 5));
        else setZoom((z) => Math.max(z - 0.2, 0.5));
    }, []);

    // Drag to pan when zoomed
    const handleMouseDown = useCallback(
        (e) => {
            if (zoom <= 1) return;
            e.preventDefault();
            setIsDragging(true);
            dragRef.current = {
                startX: e.clientX,
                startY: e.clientY,
                startPosX: position.x,
                startPosY: position.y,
            };
        },
        [zoom, position]
    );

    const handleMouseMove = useCallback(
        (e) => {
            if (!isDragging) return;
            const dx = e.clientX - dragRef.current.startX;
            const dy = e.clientY - dragRef.current.startY;
            setPosition({ x: dragRef.current.startPosX + dx, y: dragRef.current.startPosY + dy });
        },
        [isDragging]
    );

    const handleMouseUp = useCallback(() => setIsDragging(false), []);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const content = (
        <div
            style={S.overlay}
            role="button"
            tabIndex={0}
            onClick={(e) => e.target === e.currentTarget && onClose()}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            {/* Top toolbar */}
            <div style={S.toolbar}>
                <div style={S.toolbarLeft}>
                    {hasMultiple && (
                        <span style={S.counter}>
                            {currentIndex + 1} / {imageList.length}
                        </span>
                    )}
                    <span style={S.zoomLabel}>{Math.round(zoom * 100)}%</span>
                </div>
                <div style={S.toolbarActions}>
                    <button
                        style={S.toolBtn}
                        onClick={handleZoomOut}
                        title={t('ui.uzaklastir')}
                        aria-label={t('lightbox.zoomOut', 'Zoom out')}
                    >
                        <FaSearchMinus />
                    </button>
                    <button
                        style={S.toolBtn}
                        onClick={handleZoomIn}
                        title={t('ui.yakinlastir')}
                        aria-label={t('lightbox.zoomIn', 'Zoom in')}
                    >
                        <FaSearchPlus />
                    </button>
                    <button
                        style={S.toolBtn}
                        onClick={handleRotate}
                        title={t('ui.dondur_r')}
                        aria-label={t('lightbox.rotate', 'Rotate image')}
                    >
                        <FaUndo />
                    </button>
                    <button
                        style={S.toolBtn}
                        onClick={handleReset}
                        title={t('ui.sifirla_0')}
                        aria-label={t('lightbox.reset', 'Reset view')}
                    >
                        <FaExpand />
                    </button>
                    <div style={S.toolDivider} />
                    <button
                        style={S.toolBtn}
                        onClick={handleDownload}
                        title={t('common.download', 'Download')}
                        aria-label={t('common.download', 'Download')}
                    >
                        <FaDownload />
                    </button>
                    <button
                        style={S.el}
                        onClick={onClose}
                        title="Close (Esc)"
                        aria-label={t('common.close', 'Close')}
                    >
                        <FaTimes />
                    </button>
                </div>
            </div>

            {/* Navigation arrows */}
            {hasMultiple && (
                <>
                    <button aria-label={t('lightbox.prevImage', 'Previous image')} style={S.left2} onClick={goPrev}>
                        <FaChevronLeft />
                    </button>
                    <button aria-label={t('lightbox.nextImage', 'Next image')} style={S.right2} onClick={goNext}>
                        <FaChevronRight />
                    </button>
                </>
            )}

            {/* Image */}
            {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div style={S.imageContainer} onWheel={handleWheel} onMouseDown={handleMouseDown}>
                <img
                    src={currentImage}
                    alt={t('alt.preview', 'Preview')}
                    draggable={false}
                    style={{
                        ...S.image,
                        transform: `translate(${position.x}>px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                        cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                        transition: isDragging ? 'none' : 'transform 0.2s ease',
                    }}
                />
            </div>

            {/* Thumbnail strip */}
            {hasMultiple && (
                <div style={S.thumbStrip}>
                    {imageList.map((img, i) => (
                        <div
                            key={`item-${i}`}
                            role="button"
                            tabIndex={0}
                            onClick={() => {
                                setCurrentIndex(i);
                                setZoom(1);
                                setRotation(0);
                                setPosition({ x: 0, y: 0 });
                            }}
                            style={{
                                ...S.thumb,
                                borderColor: i === currentIndex ? '#5865f2' : 'transparent',
                                opacity: i === currentIndex ? 1 : 0.5,
                            }}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                            }
                        >
                            <img src={img} alt="" style={S.thumbImg} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return ReactDOM.createPortal(content, document.body);
};

const S = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.92)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
    },
    toolbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)',
        zIndex: 10,
    },
    toolbarLeft: { display: 'flex', alignItems: 'center', gap: 12 },
    toolbarActions: { display: 'flex', alignItems: 'center', gap: 4 },
    counter: { color: '#fff', fontSize: 14, fontWeight: 600 },
    zoomLabel: { color: '#949ba4', fontSize: 12 },
    toolBtn: {
        background: 'rgba(255,255,255,0.1)',
        border: 'none',
        color: '#fff',
        width: 36,
        height: 36,
        borderRadius: 8,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        transition: 'background 0.15s',
    },
    closeBtn: { background: 'rgba(218,55,60,0.3)' },
    toolDivider: {
        width: 1,
        height: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        margin: '0 4px',
    },
    navBtn: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'rgba(0,0,0,0.6)',
        border: 'none',
        color: '#fff',
        width: 48,
        height: 48,
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        zIndex: 10,
        transition: 'background 0.15s',
    },
    imageContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%',
    },
    image: {
        maxWidth: '90vw',
        maxHeight: '80vh',
        objectFit: 'contain',
        userSelect: 'none',
        pointerEvents: 'none',
    },
    thumbStrip: {
        position: 'absolute',
        bottom: 16,
        display: 'flex',
        gap: 8,
        padding: '8px 12px',
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 12,
        maxWidth: '80vw',
        overflowX: 'auto',
    },
    thumb: {
        width: 48,
        height: 48,
        borderRadius: 6,
        border: '2px solid transparent',
        cursor: 'pointer',
        overflow: 'hidden',
        flexShrink: 0,
        transition: 'all 0.15s',
    },
    thumbImg: { width: '100%', height: '100%', objectFit: 'cover' },
};
S.right2 = { ...S.navBtn, right: 16 };
S.left2 = { ...S.navBtn, left: 16 };
S.el = { ...S.toolBtn, ...S.closeBtn };

// Inject hover styles
if (typeof document !== 'undefined') {
    const id = 'lightbox-styles';
    if (!document.getElementById(id)) {
        const s = document.createElement('style');
        s.id = id;
        s.textContent = `
            [data-lb-tool]:hover { background: rgba(255,255,255,0.2) !important; }
            [data-lb-nav]:hover { background: rgba(0,0,0,0.8) !important; }
        `;
        document.head.appendChild(s);
    }
}

ImageLightbox.propTypes = {
    imageUrl: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    startIndex: PropTypes.number,
    onClose: PropTypes.func.isRequired,
};
export default React.memo(ImageLightbox);
