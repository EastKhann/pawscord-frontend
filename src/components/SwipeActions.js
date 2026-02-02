import React, { useEffect } from 'react';
import './SwipeActions.css';

/**
 * Swipeable list item with actions (like iOS)
 */
const SwipeActions = ({
    children,
    leftActions = [],
    rightActions = [],
    onActionClick
}) => {
    const [swipeX, setSwipeX] = React.useState(0);
    const [isDragging, setIsDragging] = React.useState(false);
    const startX = React.useRef(0);
    const currentX = React.useRef(0);

    const handleTouchStart = (e) => {
        startX.current = e.touches[0].clientX;
        setIsDragging(true);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;

        currentX.current = e.touches[0].clientX;
        const diff = currentX.current - startX.current;

        // Limit swipe distance
        const maxSwipe = 100;
        const limitedDiff = Math.max(-maxSwipe, Math.min(maxSwipe, diff));

        setSwipeX(limitedDiff);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);

        // Snap to action or reset
        if (Math.abs(swipeX) > 60) {
            // Trigger action
            if (swipeX > 0 && leftActions.length > 0) {
                onActionClick?.(leftActions[0].id);
            } else if (swipeX < 0 && rightActions.length > 0) {
                onActionClick?.(rightActions[0].id);
            }
        }

        // Reset position
        setSwipeX(0);
    };

    return (
        <div className="swipe-container">
            {/* Left actions */}
            {leftActions.length > 0 && (
                <div className="swipe-actions left">
                    {leftActions.map(action => (
                        <button
                            key={action.id}
                            className={`swipe-action ${action.color || 'primary'}`}
                            onClick={() => {
                                onActionClick?.(action.id);
                                setSwipeX(0);
                            }}
                        >
                            <span className="action-icon">{action.icon}</span>
                            <span className="action-label">{action.label}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Main content */}
            <div
                className="swipe-content"
                style={{
                    transform: `translateX(${swipeX}px)`,
                    transition: isDragging ? 'none' : 'transform 0.3s ease'
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {children}
            </div>

            {/* Right actions */}
            {rightActions.length > 0 && (
                <div className="swipe-actions right">
                    {rightActions.map(action => (
                        <button
                            key={action.id}
                            className={`swipe-action ${action.color || 'primary'}`}
                            onClick={() => {
                                onActionClick?.(action.id);
                                setSwipeX(0);
                            }}
                        >
                            <span className="action-icon">{action.icon}</span>
                            <span className="action-label">{action.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SwipeActions;


