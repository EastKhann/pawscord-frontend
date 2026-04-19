/* eslint-disable react/no-unescaped-entities */
// frontend/src/GifPicker.js (Mutlak URL with �alisan cutin ��z�m)

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import logger from '../utils/logger';
// <<< D�ZELTME: absoluteHostUrl prop'u added >>>
const GifPicker = ({ onSelect, onClose, localGifListUrl, absoluteHostUrl, fetchWithAuth }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [allGifs, setAllGifs] = useState([]);
    const [filteredGifs, setFilteredGifs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const pickerRef = useRef(null);

    // Disari tiklamayi closema mantigi
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(event.target) &&
                event.target.textContent !== 'GIF'
            ) {
                onClose();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    // 1. Yerel GIF'leri API'den �ek
    useEffect(() => {
        const fetchLocalGifs = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetchWithAuth(localGifListUrl);
                if (!response.ok) {
                    throw new Error(`Yerel API Errorsi: ${response.status}`);
                }
                const data = await response.json();

                if (Array.isArray(data)) {
                    setAllGifs(data);
                    setFilteredGifs(data);
                } else {
                    setAllGifs([]);
                    setFilteredGifs([]);
                }
            } catch (err) {
                logger.error('Local GIF load error:', err);
                setError(
                    "GIF koleksiyonu yüklenemedi. Django sunucusunu ve 'gifs' klasörünü kontrol edin."
                );
            } finally {
                setIsLoading(false);
            }
        };

        if (localGifListUrl) {
            fetchLocalGifs();
        }
    }, [localGifListUrl, fetchWithAuth]);

    // 2. Search terimi degistiginde GIF'leri filterle
    useEffect(() => {
        if (!allGifs.length) return;

        if (!searchTerm) {
            setFilteredGifs(allGifs);
            return;
        }

        const lowerCaseSearch = searchTerm.toLowerCase();

        const results = allGifs.filter((url) => {
            const filenameWithExtension = url.substring(url.lastIndexOf('/') + 1);
            const filename = filenameWithExtension.substring(
                0,
                filenameWithExtension.lastIndexOf('.')
            );

            return filename.toLowerCase().includes(lowerCaseSearch);
        });

        setFilteredGifs(results);
    }, [searchTerm, allGifs]);

    const handleGifClick = (gifUrl) => {
        onSelect(gifUrl);
    };

    // Mutlak URL olusturma fonksiyonu
    const getAbsoluteGifUrl = (relativeUrl) => {
        // Eger URL zaten http with basliyorsa dokunma, aksi takdirde absoluteHostUrl'i add
        return relativeUrl.startsWith('http') ? relativeUrl : `${absoluteHostUrl}${relativeUrl}`;
    };

    return (
        <div aria-label="gif picker" style={styles.pickerOverlay}>
            <div style={styles.pickerContainer} ref={pickerRef}>
                <input
                    type="text"
                    placeholder="Koleksiyonda ara (dosya adına göre)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.searchInput}
                    disabled={isLoading || error}
                />
                <div style={styles.gifGrid}>
                    {error && <p style={styles.errorText}>{error}</p>}
                    {isLoading ? (
                        <p style={styles.loadingText}>Yerel koleksiyon yükleniyor...</p>
                    ) : filteredGifs.length > 0 ? (
                        filteredGifs.map((url) => (
                            <div
                                key={url}
                                style={styles.gifWrapper}
                                role="button"
                                tabIndex={0}
                                onClick={() => handleGifClick(url)}
                                title={url.substring(url.lastIndexOf('/') + 1)}
                                onKeyDown={(e) =>
                                    (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                                }
                            >
                                <img
                                    // KRITIK D�ZELTME: Mutlak URL kullanarak resmi �ek
                                    src={getAbsoluteGifUrl(url)}
                                    alt={url.substring(url.lastIndexOf('/') + 1)}
                                    style={styles.gifImage}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentNode.style.backgroundColor = '#444';
                                    }}
                                />
                            </div>
                        ))
                    ) : (
                        !error && (
                            <p style={styles.noResultsText}>'{searchTerm}' for result not found.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    pickerOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1500,
        pointerEvents: 'none',
    },
    pickerContainer: {
        position: 'absolute',
        bottom: '100px',
        width: '400px',
        height: '350px',
        backgroundColor: '#111214',
        borderRadius: '8px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        pointerEvents: 'auto',
    },
    searchInput: {
        width: 'calc(100% - 20px)',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #5865f2',
        backgroundColor: '#444',
        color: 'white',
        outline: 'none',
        fontSize: '1em',
    },
    gifGrid: {
        flexGrow: 1,
        overflowY: 'auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
        paddingRight: '5px',
    },
    gifWrapper: {
        width: '100%',
        paddingTop: '75%',
        position: 'relative',
        borderRadius: '4px',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: '#3a3d43',
        transition: 'transform 0.1s',
    },
    gifImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    loadingText: {
        color: '#b5bac1',
        gridColumn: '1 / -1',
        textAlign: 'center',
        marginTop: '50px',
    },
    errorText: {
        color: '#f23f42',
        gridColumn: '1 / -1',
        textAlign: 'center',
        marginTop: '50px',
        fontWeight: 'bold',
    },
    noResultsText: {
        color: '#b5bac1',
        gridColumn: '1 / -1',
        textAlign: 'center',
        marginTop: '50px',
    },
};

GifPicker.propTypes = {
    onSelect: PropTypes.func,
    onClose: PropTypes.func,
    localGifListUrl: PropTypes.string,
    absoluteHostUrl: PropTypes.string,
    fetchWithAuth: PropTypes.func,
};
export default React.memo(GifPicker);
