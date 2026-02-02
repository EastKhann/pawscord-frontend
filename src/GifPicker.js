// frontend/src/GifPicker.js (Mutlak URL ile çalışan kesin çözüm)

import React, { useState, useEffect, useRef } from 'react';
// <<< DÜZELTME: absoluteHostUrl prop'u eklendi >>>
const GifPicker = ({ onSelect, onClose, localGifListUrl, absoluteHostUrl, fetchWithAuth }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [allGifs, setAllGifs] = useState([]);
    const [filteredGifs, setFilteredGifs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const pickerRef = useRef(null);

    // Dışarı tıklamayı kapatma mantığı
    useEffect(() => {
        function handleClickOutside(event) {
            if (pickerRef.current && !pickerRef.current.contains(event.target) && event.target.textContent !== 'GIF') {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    // 1. Yerel GIF'leri API'den çek
    useEffect(() => {
        const fetchLocalGifs = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetchWithAuth(localGifListUrl);
                if (!response.ok) {
                    throw new Error(`Yerel API Hatası: ${response.status}`);
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
                console.error("Yerel GIF yükleme hatası:", err);
                setError("GIF koleksiyonu yüklenemedi. Django sunucusunu ve 'gifs' klasörünü kontrol edin.");
            } finally {
                setIsLoading(false);
            }
        };

        if (localGifListUrl) {
            fetchLocalGifs();
        }
    }, [localGifListUrl, fetchWithAuth]);

    // 2. Arama terimi değiştiğinde GIF'leri filtrele
    useEffect(() => {
        if (!allGifs.length) return;

        if (!searchTerm) {
            setFilteredGifs(allGifs);
            return;
        }

        const lowerCaseSearch = searchTerm.toLowerCase();

        const results = allGifs.filter(url => {
            const filenameWithExtension = url.substring(url.lastIndexOf('/') + 1);
            const filename = filenameWithExtension.substring(0, filenameWithExtension.lastIndexOf('.'));

            return filename.toLowerCase().includes(lowerCaseSearch);
        });

        setFilteredGifs(results);
    }, [searchTerm, allGifs]);


    const handleGifClick = (gifUrl) => {
        onSelect(gifUrl);
    };

    // Mutlak URL oluşturma fonksiyonu
    const getAbsoluteGifUrl = (relativeUrl) => {
        // Eğer URL zaten http ile başlıyorsa dokunma, aksi takdirde absoluteHostUrl'i ekle
        return relativeUrl.startsWith('http') ? relativeUrl : `${absoluteHostUrl}${relativeUrl}`;
    };

    return (
        <div style={styles.pickerOverlay}>
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
                                onClick={() => handleGifClick(url)}
                                title={url.substring(url.lastIndexOf('/') + 1)}
                            >
                                <img
                                    // KRİTİK DÜZELTME: Mutlak URL kullanarak resmi çek
                                    src={getAbsoluteGifUrl(url)}
                                    alt={url.substring(url.lastIndexOf('/') + 1)}
                                    style={styles.gifImage}
                                    onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.style.backgroundColor = '#444'; }}
                                />
                            </div>
                        ))
                    ) : (
                        !error && <p style={styles.noResultsText}>'{searchTerm}' için sonuç bulunamadı.</p>
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
        backgroundColor: '#2f3136',
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
        color: '#b9bbbe',
        gridColumn: '1 / -1',
        textAlign: 'center',
        marginTop: '50px',
    },
    errorText: {
        color: '#f04747',
        gridColumn: '1 / -1',
        textAlign: 'center',
        marginTop: '50px',
        fontWeight: 'bold',
    },
    noResultsText: {
        color: '#b9bbbe',
        gridColumn: '1 / -1',
        textAlign: 'center',
        marginTop: '50px',
    }
};

export default React.memo(GifPicker);

