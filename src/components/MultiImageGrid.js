// frontend/src/components/MultiImageGrid.js
// 🔥 FEATURE 21: Multi-image grid layout for messages
// Shows 2-4+ images in a grid, with lightbox on click

import React, { useState, memo } from 'react';

const MultiImageGrid = ({ images = [], onImageClick }) => {
    const [loadErrors, setLoadErrors] = useState({});
    const count = images.length;
    if (count === 0) return null;

    const handleError = (i) => setLoadErrors(prev => ({ ...prev, [i]: true }));
    const handleClick = (img, i) => onImageClick?.(img, i, images);

    if (count === 1) {
        return (
            <div style={S.single}>
                <img
                    src={images[0].url || images[0]}
                    alt=""
                    style={S.singleImg}
                    onClick={() => handleClick(images[0], 0)}
                    onError={() => handleError(0)}
                />
            </div>
        );
    }

    if (count === 2) {
        return (
            <div style={S.grid2}>
                {images.map((img, i) => (
                    <img
                        key={i}
                        src={img.url || img}
                        alt=""
                        style={S.grid2Img}
                        onClick={() => handleClick(img, i)}
                        onError={() => handleError(i)}
                    />
                ))}
            </div>
        );
    }

    if (count === 3) {
        return (
            <div style={S.grid3}>
                <img
                    src={images[0].url || images[0]}
                    alt=""
                    style={S.grid3Left}
                    onClick={() => handleClick(images[0], 0)}
                    onError={() => handleError(0)}
                />
                <div style={S.grid3Right}>
                    {images.slice(1).map((img, i) => (
                        <img
                            key={i + 1}
                            src={img.url || img}
                            alt=""
                            style={S.grid3RightImg}
                            onClick={() => handleClick(img, i + 1)}
                            onError={() => handleError(i + 1)}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // 4+ images: 2x2 grid with overflow indicator
    const visibleImages = images.slice(0, 4);
    const remaining = count - 4;

    return (
        <div style={S.grid4}>
            {visibleImages.map((img, i) => (
                <div key={i} style={S.grid4Cell}>
                    <img
                        src={img.url || img}
                        alt=""
                        style={S.grid4Img}
                        onClick={() => handleClick(img, i)}
                        onError={() => handleError(i)}
                    />
                    {i === 3 && remaining > 0 && (
                        <div
                            style={S.overflow}
                            onClick={() => handleClick(img, i)}
                        >
                            +{remaining}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

const S = {
    single: { maxWidth: 400, borderRadius: 8, overflow: 'hidden' },
    singleImg: { width: '100%', maxHeight: 350, objectFit: 'cover', borderRadius: 8, cursor: 'pointer', display: 'block' },
    grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, maxWidth: 400, borderRadius: 8, overflow: 'hidden' },
    grid2Img: { width: '100%', height: 200, objectFit: 'cover', cursor: 'pointer', display: 'block' },
    grid3: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 4, maxWidth: 400, borderRadius: 8, overflow: 'hidden' },
    grid3Left: { width: '100%', height: '100%', minHeight: 250, objectFit: 'cover', cursor: 'pointer', display: 'block' },
    grid3Right: { display: 'flex', flexDirection: 'column', gap: 4 },
    grid3RightImg: { width: '100%', flex: 1, objectFit: 'cover', cursor: 'pointer', display: 'block' },
    grid4: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, maxWidth: 400, borderRadius: 8, overflow: 'hidden' },
    grid4Cell: { position: 'relative' },
    grid4Img: { width: '100%', height: 160, objectFit: 'cover', cursor: 'pointer', display: 'block' },
    overflow: {
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff',
        fontSize: 28, fontWeight: 700, cursor: 'pointer',
    },
};

export default memo(MultiImageGrid);
