// Message/components.js
// Sub-components and utilities extracted from Message.js

import React, { useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import logger from '../utils/logger';
const _s = (o) => o;

// -- extracted inline style constants --
const _st1 = { color: '#aaa' };
const _st2 = { position: 'relative', display: 'inline-block', marginLeft: '5px' };
const _st3 = {
    fontSize: '0.7em',
    color: '#949ba4',
    cursor: 'pointer',
    textDecoration: 'underline',
};
const _st4 = { maxHeight: '200px', overflowY: 'auto' };

// 1. Lazy Loading Video (Performance Optimized)
export const LazyVideo = memo(({ src, style }) => {
    const videoRef = useRef(null);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const containerStyle = {
        minHeight: '200px',
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (videoRef.current) observer.observe(videoRef.current);
        return () => {
            if (videoRef.current) observer.unobserve(videoRef.current);
        };
    }, []);

    return (
        <div aria-label="edit history" ref={videoRef} style={containerStyle}>
            {shouldLoad ? (
                <video controls preload="metadata" src={src} style={style}>
                    <track kind="captions" src="" default />
                    Your browser does not support video playback.
                    <a href={src} download>
                        İndir
                    </a>
                </video>
            ) : (
                <span style={_st1}>Video yükleniyor...</span>
            )}
        </div>
    );
});

// 1b. Lazy mount wrapper for heavy children
export const LazyMount = memo(({ children, minHeight = 60 }) => {
    const ref = useRef(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShow(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} style={_s({ minHeight })}>
            {show ? children : null}
        </div>
    );
});

// 2. Editme Geçmişi Göstergesi
export const EditHistory = ({ messageId, messageEditHistoryUrl, fetchWithAuth }) => {
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const historyRef = useRef(null);

    useEffect(() => {
        if (!showHistory) return;
        const fetchHistory = async () => {
            try {
                const response = await fetchWithAuth(
                    `${messageEditHistoryUrl}${messageId}/edit_history/`
                );
                if (response.ok) setHistory(await response.json());
            } catch (e) {
                logger.error(e);
            }
        };
        fetchHistory();
        const handleClickOutside = (e) => {
            if (historyRef.current && !historyRef.current.contains(e.target)) setShowHistory(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showHistory, messageId, messageEditHistoryUrl, fetchWithAuth]);

    return (
        <div style={_st2} ref={historyRef}>
            <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                    e.stopPropagation();
                    setShowHistory(!showHistory);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation();
                        setShowHistory(!showHistory);
                    }
                }}
                style={_st3}
            >
                (editndi)
            </span>
            {showHistory && (
                <div style={styles.historyDropdown}>
                    <h4 style={styles.historyHeader}>History ({history.length})</h4>
                    <div style={_st4}>
                        {history.map((h, i) => (
                            <div key={`item-${i}`} style={styles.historyItem}>
                                <small>{new Date(h.edited_at).toLocaleString()}</small>
                                <div>
                                    <del>{h.old_content}</del>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

LazyVideo.propTypes = {
    src: PropTypes.string,
    style: PropTypes.object,
};
LazyMount.propTypes = {
    children: PropTypes.node,
    minHeight: PropTypes.number,
};
EditHistory.propTypes = {
    messageId: PropTypes.string,
    messageEditHistoryUrl: PropTypes.string,
    fetchWithAuth: PropTypes.func,
};

// 3. Zaman Formatlayıcı (centralized)
export { formatTimestamp } from '../utils/dateFormatters';
