// frontend/src/hooks/useDragDrop.js
// Extracted from MessageInput.js — drag-and-drop state cluster
import { useState, useRef, useCallback } from 'react';

const useDragDrop = (onFilesDropped) => {
    const [isDragging, setIsDragging] = useState(false);
    const dragCounter = useRef(0);

    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current++;
        setIsDragging(true);
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current--;
        if (dragCounter.current === 0) {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current = 0;
        setIsDragging(false);

        const files = Array.from(e.dataTransfer?.files || []);
        if (files.length > 0 && onFilesDropped) {
            onFilesDropped(files);
        }
    }, [onFilesDropped]);

    const dragHandlers = {
        onDragEnter: handleDragEnter,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
    };

    return { isDragging, dragHandlers };
};

export default useDragDrop;
