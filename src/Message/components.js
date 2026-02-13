// Message/components.js
// Sub-components and utilities extracted from Message.js

import React, { useState, useEffect, useRef, memo } from 'react';
import styles from './styles';

// 1. Tembel Yüklenen Video (Performans İçin) - ⚡ OPTIMIZED: React.memo ile memoize edildi
export const LazyVideo = memo(({ src, style }) => {
    const videoRef = useRef(null);
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setShouldLoad(true); observer.disconnect(); }
        }, { threshold: 0.2 });
        if (videoRef.current) observer.observe(videoRef.current);
        return () => { if (videoRef.current) observer.unobserve(videoRef.current); };
    }, []);

    return (
        <div ref={videoRef} style={{ minHeight: '200px', ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
            {shouldLoad ? (
                <video controls preload="metadata" src={src} style={style}>
                    Tarayıcınız video oynatmayı desteklemiyor.
                    <a href={src} download>İndir</a>
                </video>
            ) : (
                <span style={{ color: '#aaa' }}>Video Yükleniyor...</span>
            )}
        </div>
    );
});

// 1b. Lazy mount wrapper for heavy children - ⚡ OPTIMIZED: React.memo ile memoize edildi
export const LazyMount = memo(({ children, minHeight = 60 }) => {
    const ref = useRef(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setShow(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} style={{ minHeight }}>
            {show ? children : null}
        </div>
    );
});

// 2. Düzenleme Geçmişi Göstergesi
export const EditHistory = ({ messageId, messageEditHistoryUrl, fetchWithAuth }) => {
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const historyRef = useRef(null);

    useEffect(() => {
        if (!showHistory) return;
        const fetchHistory = async () => {
            try {
                const response = await fetchWithAuth(`${messageEditHistoryUrl}${messageId}/edit_history/`);
                if (response.ok) setHistory(await response.json());
            } catch (e) { console.error(e); }
        };
        fetchHistory();
        const handleClickOutside = (e) => {
            if (historyRef.current && !historyRef.current.contains(e.target)) setShowHistory(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showHistory, messageId, messageEditHistoryUrl, fetchWithAuth]);

    return (
        <div style={{ position: 'relative', display: 'inline-block', marginLeft: '5px' }} ref={historyRef}>
            <span
                onClick={(e) => { e.stopPropagation(); setShowHistory(!showHistory); }}
                style={{ fontSize: '0.7em', color: '#72767d', cursor: 'pointer', textDecoration: 'underline' }}
            >
                (düzenlendi)
            </span>
            {showHistory && (
                <div style={styles.historyDropdown}>
                    <h4 style={styles.historyHeader}>Geçmiş ({history.length})</h4>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {history.map((h, i) => (
                            <div key={i} style={styles.historyItem}>
                                <small>{new Date(h.edited_at).toLocaleString()}</small>
                                <div><del>{h.old_content}</del></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// 3. Zaman Formatlayıcı
export const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const messageDate = new Date(timestamp);
    const now = new Date();
    return messageDate.toDateString() === now.toDateString()
        ? messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : messageDate.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
};
