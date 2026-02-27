// frontend/src/components/MessageSkeleton.js
// Faz 2.4: Skeleton loading placeholders for chat messages (Discord-style)
import React from 'react';

const LINE_WIDTHS = ['72%', '55%', '80%', '48%', '65%', '40%', '70%'];

const skeletonStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 16,
    padding: '6px 16px 6px 72px',
    position: 'relative',
    opacity: 0.9,
};

const avatarStyle = {
    position: 'absolute',
    left: 16,
    top: 8,
    width: 40,
    height: 40,
    borderRadius: '50%',
};

const contentStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    paddingTop: 2,
};

const nameStyle = {
    width: 90,
    height: 14,
    borderRadius: 4,
    marginBottom: 2,
};

const lineStyle = (width) => ({
    width,
    height: 14,
    borderRadius: 4,
});

/**
 * Single skeleton message row.
 * Uses .skeleton-shimmer CSS class from index.css (Faz 4.4 shimmer keyframe).
 */
const SkeletonRow = ({ lineCount = 2, lineWidthIndex = 0 }) => (
    <div style={skeletonStyle}>
        {/* Avatar circle */}
        <div className="skeleton-shimmer" style={avatarStyle} />
        <div style={contentStyle}>
            {/* Username + timestamp row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className="skeleton-shimmer" style={nameStyle} />
                <div className="skeleton-shimmer" style={{ width: 50, height: 10, borderRadius: 4, opacity: 0.5 }} />
            </div>
            {/* Message lines */}
            {Array.from({ length: lineCount }, (_, i) => (
                <div
                    key={i}
                    className="skeleton-shimmer"
                    style={lineStyle(LINE_WIDTHS[(lineWidthIndex + i) % LINE_WIDTHS.length])}
                />
            ))}
        </div>
    </div>
);

/**
 * MessageSkeleton — renders N skeleton message rows while messages are loading.
 * @param {number} count - Number of skeleton rows to render (default: 5)
 */
const MessageSkeleton = ({ count = 5 }) => (
    <div style={{ paddingTop: 16 }} aria-label="Mesajlar yükleniyor..." aria-busy="true">
        {Array.from({ length: count }, (_, i) => (
            <SkeletonRow
                key={i}
                lineCount={i % 3 === 0 ? 3 : i % 3 === 1 ? 1 : 2}
                lineWidthIndex={i * 2}
            />
        ))}
    </div>
);

export default React.memo(MessageSkeleton);
