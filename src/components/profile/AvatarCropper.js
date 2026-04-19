/**
 * 📸 AVATAR CROPPER COMPONENT
 * Profil fotoğrafı yüklerken tam kare kırpma
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import logger from '../../utils/logger';
import 'react-image-crop/dist/ReactCrop.css';
import './AvatarCropper.css';

const S = {
    border: {
        width: 180,
        height: 180,
        borderRadius: '50%',
        objectFit: 'cover',
    },
    size: {
        maxWidth: '100%',
        maxHeight: '55vh',
        display: 'block',
        objectFit: 'contain',
    },
    txt2: { color: '#f23f42', marginTop: '8px' },
    mar: { fontSize: '48px', marginBottom: '16px' },
    txt: { padding: '40px', textAlign: 'center', color: '#dbdee1' },
};

const AvatarCropper = ({ onCropComplete, onCancel, imageFile }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState({
        unit: '%',
        width: 50,
        aspect: 1, // Tam kare (1:1)
    });
    const [completedCrop, setCompletedCrop] = useState(null);
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);

    // 🔥 File prop olarak gelirse otomatik upload
    useEffect(() => {
        if (imageFile) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setSrc(reader.result);
            });
            reader.readAsDataURL(imageFile);
        }
    }, [imageFile]);

    // Image yüklendiğinde
    const onImageLoad = useCallback((img) => {
        imgRef.current = img;

        // Auto merkezi kare crop
        const width = img.width;
        const height = img.height;
        const size = Math.min(width, height);

        const x = (width - size) / 2;
        const y = (height - size) / 2;

        const crop = {
            unit: 'px',
            width: size,
            height: size,
            x: x,
            y: y,
            aspect: 1,
        };

        setCrop(crop);
        setCompletedCrop(crop);
    }, []);

    // Previewme canvas'ını daycelle
    useEffect(() => {
        if (!completedCrop || !imgRef.current || !previewCanvasRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');

        const pixelRatio = window.devicePixelRatio || 1;
        const targetSize = 180; // 180px önizleme

        canvas.width = targetSize * pixelRatio;
        canvas.height = targetSize * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            targetSize,
            targetSize
        );
    }, [completedCrop]);

    // Crop oklandığında
    const handleCropComplete = useCallback(async () => {
        if (!completedCrop || !imgRef.current || !previewCanvasRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');

        // Canvas boyutunu ayarla (512x512 - Discord/Pawscord standard)
        const pixelRatio = window.devicePixelRatio;
        const targetSize = 512;

        canvas.width = targetSize * pixelRatio;
        canvas.height = targetSize * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        // Kırpılmış resmi çiz
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            targetSize,
            targetSize
        );

        // Canvas'ı blob'a çevir
        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        logger.error('Canvas is empty');
                        return;
                    }

                    blob.name = 'avatar.png';
                    onCropComplete(blob);
                    resolve();
                },
                'image/png',
                1
            );
        });
    }, [completedCrop, onCropComplete]);

    return (
        <div
            className="avatar-cropper-modal"
            role="button"
            tabIndex={0}
            onClick={onCancel}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="avatar-cropper-content"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="avatar-cropper-header">
                    <h2>📸 Profil Fotoğrafını Düzenle</h2>
                    <button aria-label="Close" className="close-btn" onClick={onCancel}>
                        ×
                    </button>
                </div>

                <div className="avatar-cropper-body">
                    {!src && (
                        <div style={S.txt}>
                            <div style={S.mar}>⏳</div>
                            <p>Fotoğraf yükleniyor...</p>
                            {!imageFile && <p style={S.txt2}>⚠️ Dosya bulunamadı!</p>}
                        </div>
                    )}

                    {src && (
                        <>
                            <div className="crop-container">
                                <ReactCrop
                                    crop={crop}
                                    onChange={(c) => setCrop(c)}
                                    onComplete={(c) => setCompletedCrop(c)}
                                    aspect={1}
                                    circularCrop={false}
                                    keepSelection={true}
                                    minWidth={100}
                                    minHeight={100}
                                >
                                    <img
                                        ref={imgRef}
                                        src={src}
                                        alt="Crop"
                                        onLoad={(e) => onImageLoad(e.currentTarget)}
                                        style={S.size}
                                    />
                                </ReactCrop>
                            </div>

                            <div className="preview-section">
                                <h3>Previewme:</h3>
                                <div className="preview-container">
                                    <canvas ref={previewCanvasRef} style={S.border} />
                                </div>
                                <p className="preview-note">ℹ️ Tam kare (1:1)</p>
                            </div>
                        </>
                    )}
                </div>

                {src && (
                    <div className="avatar-cropper-footer">
                        <button aria-label="on Cancel" className="btn-secondary" onClick={onCancel}>
                            Cancel
                        </button>
                        <button
                            aria-label="handle Crop Complete"
                            className="btn-primary"
                            onClick={handleCropComplete}
                        >
                            ✓ Save
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

AvatarCropper.propTypes = {
    onCropComplete: PropTypes.func,
    onCancel: PropTypes.func,
    imageFile: PropTypes.string,
};
export default AvatarCropper;
