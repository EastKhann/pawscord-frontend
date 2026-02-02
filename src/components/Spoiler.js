// frontend/src/components/Spoiler.js
import React, { useState } from 'react';

const Spoiler = ({ children }) => {
    const [revealed, setRevealed] = useState(false);

    return (
        <span
            onClick={(e) => { e.stopPropagation(); setRevealed(true); }}
            style={{
                backgroundColor: revealed ? 'rgba(255,255,255,0.1)' : '#202225',
                color: revealed ? 'inherit' : 'transparent',
                borderRadius: '3px',
                padding: '0 2px',
                cursor: revealed ? 'default' : 'pointer',
                userSelect: revealed ? 'auto' : 'none',
                transition: 'all 0.2s',
                // Blurlu efekt veya siyah kutu
                filter: revealed ? 'none' : 'blur(4px)',
            }}
            title={revealed ? "" : "Görmek için tıkla"}
        >
            {children}
        </span>
    );
};

export default Spoiler;

