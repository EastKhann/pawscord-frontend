import React, { useState, useEffect } from 'react';
import { FaTimes, FaUser, FaPalette, FaEye, FaSave, FaRandom, FaShoppingCart, FaCoins, FaBookmark } from 'react-icons/fa';
import { toast } from '../utils/toast';

const AvatarStudioPanel = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
    const [parts, setParts] = useState({});
    const [avatar, setAvatar] = useState({});
    const [ownedItems, setOwnedItems] = useState([]);
    const [userCoins, setUserCoins] = useState(0);
    const [presets, setPresets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState('face_shapes');
    const [view, setView] = useState('customize'); // customize, presets

    const categories = [
        { id: 'face_shapes', name: 'Face', icon: '👤' },
        { id: 'skin_tones', name: 'Skin', icon: '🎨' },
        { id: 'eyes', name: 'Eyes', icon: '👁️' },
        { id: 'eye_colors', name: 'Eye Color', icon: '🔵' },
        { id: 'hairstyles', name: 'Hair', icon: '💇' },
        { id: 'hair_colors', name: 'Hair Color', icon: '🌈' },
        { id: 'mouths', name: 'Mouth', icon: '👄' },
        { id: 'accessories', name: 'Accessories', icon: '👓' },
        { id: 'backgrounds', name: 'Background', icon: '🖼️' },
        { id: 'expressions', name: 'Expression', icon: '😊' }
    ];

    useEffect(() => {
        fetchParts();
        fetchMyAvatar();
        fetchPresets();
    }, []);

    const fetchParts = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/avatar-studio/parts/`);
            const data = await res.json();
            setParts(data.parts || {});
            setUserCoins(data.user_coins || 0);
        } catch (error) {
            console.error('Failed to fetch parts:', error);
        }
    };

    const fetchMyAvatar = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/avatar-studio/my-avatar/`);
            const data = await res.json();
            setAvatar(data.avatar || getDefaultAvatar());
            setOwnedItems(data.owned_items || []);
        } catch (error) {
            console.error('Failed to fetch avatar:', error);
        }
    };

    const fetchPresets = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/avatar-studio/presets/`);
            const data = await res.json();
            setPresets(data.presets || []);
        } catch (error) {
            console.error('Failed to fetch presets:', error);
        }
    };

    const getDefaultAvatar = () => ({
        face_shape: 'round',
        skin_tone: 'medium',
        eyes: 'normal',
        eye_color: 'brown',
        hairstyle: 'short',
        hair_color: 'black',
        mouth: 'smile',
        accessory: 'none',
        background: 'solid_gray',
        expression: 'default'
    });

    const selectPart = (category, itemId) => {
        const categoryKey = category.replace('s', '').replace('_color', '_color').replace('_tone', '_tone');
        // Convert plural to singular for avatar config
        let key = category;
        if (category === 'face_shapes') key = 'face_shape';
        else if (category === 'skin_tones') key = 'skin_tone';
        else if (category === 'hairstyles') key = 'hairstyle';
        else if (category === 'mouths') key = 'mouth';
        else if (category === 'accessories') key = 'accessory';
        else if (category === 'backgrounds') key = 'background';
        else if (category === 'expressions') key = 'expression';
        else if (category === 'eyes') key = 'eyes';
        else if (category === 'eye_colors') key = 'eye_color';
        else if (category === 'hair_colors') key = 'hair_color';

        setAvatar({ ...avatar, [key]: itemId });
    };

    const purchaseItem = async (category, itemId) => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/avatar-studio/purchase/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category, item_id: itemId })
            });
            const data = await res.json();
            if (data.message) {
                toast.success(data.message);
                setUserCoins(data.new_balance);
                setOwnedItems(data.owned_items);
            } else {
                toast.error(data.error || 'Purchase failed');
            }
        } catch (error) {
            toast.error('Purchase failed');
        } finally {
            setLoading(false);
        }
    };

    const saveAvatar = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/avatar-studio/save/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ config: avatar })
            });
            const data = await res.json();
            if (data.message) {
                toast.success('Avatar saved!');
            } else {
                toast.error(data.error || 'Save failed');
            }
        } catch (error) {
            toast.error('Save failed');
        } finally {
            setLoading(false);
        }
    };

    const randomizeAvatar = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/avatar-studio/randomize/`, {
                method: 'POST'
            });
            const data = await res.json();
            if (data.avatar) {
                setAvatar(data.avatar);
                toast.success('Randomized!');
            }
        } catch (error) {
            toast.error('Failed to randomize');
        }
    };

    const savePreset = async () => {
        const name = prompt('Enter preset name:');
        if (!name) return;

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/avatar-studio/presets/save/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, config: avatar })
            });
            const data = await res.json();
            if (data.preset_id) {
                toast.success('Preset saved!');
                fetchPresets();
            }
        } catch (error) {
            toast.error('Failed to save preset');
        }
    };

    const loadPreset = (preset) => {
        setAvatar(preset.config);
        setView('customize');
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaUser style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Avatar Studio</h2>
                    </div>
                    <div style={styles.coinsDisplay}>
                        <FaCoins style={{ color: '#faa61a' }} />
                        <span>{userCoins}</span>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}><FaTimes /></button>
                </div>

                <div style={styles.tabs}>
                    <button
                        onClick={() => setView('customize')}
                        style={view === 'customize' ? styles.activeTab : styles.tab}
                    >
                        <FaPalette /> Customize
                    </button>
                    <button
                        onClick={() => setView('presets')}
                        style={view === 'presets' ? styles.activeTab : styles.tab}
                    >
                        <FaBookmark /> Presets
                    </button>
                </div>

                <div style={styles.mainContent}>
                    {view === 'customize' && (
                        <>
                            {/* Preview */}
                            <div style={styles.previewSection}>
                                <AvatarPreview avatar={avatar} parts={parts} />
                                <div style={styles.previewActions}>
                                    <button onClick={randomizeAvatar} style={styles.actionBtn}>
                                        <FaRandom /> Random
                                    </button>
                                    <button onClick={savePreset} style={styles.actionBtn}>
                                        <FaBookmark /> Save Preset
                                    </button>
                                    <button onClick={saveAvatar} style={styles.saveBtn} disabled={loading}>
                                        <FaSave /> {loading ? 'Saving...' : 'Save Avatar'}
                                    </button>
                                </div>
                            </div>

                            {/* Categories */}
                            <div style={styles.customizeSection}>
                                <div style={styles.categoryTabs}>
                                    {categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveCategory(cat.id)}
                                            style={activeCategory === cat.id ? styles.catActive : styles.catBtn}
                                        >
                                            <span>{cat.icon}</span>
                                            <span style={styles.catName}>{cat.name}</span>
                                        </button>
                                    ))}
                                </div>

                                <div style={styles.itemsGrid}>
                                    {(parts[activeCategory] || []).map(item => {
                                        const isOwned = item.free || ownedItems.includes(item.id);
                                        const isSelected = Object.values(avatar).includes(item.id);

                                        return (
                                            <div
                                                key={item.id}
                                                style={{
                                                    ...styles.itemCard,
                                                    ...(isSelected ? styles.itemSelected : {}),
                                                    ...(!isOwned ? styles.itemLocked : {})
                                                }}
                                                onClick={() => isOwned && selectPart(activeCategory, item.id)}
                                            >
                                                {item.color && item.color !== 'gradient' && item.color !== 'galaxy' && item.color !== 'rainbow' ? (
                                                    <div style={{ ...styles.colorSwatch, background: item.color }} />
                                                ) : (
                                                    <span style={styles.itemPreview}>
                                                        {item.name?.charAt(0) || item.id.charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                                <span style={styles.itemName}>{item.name || item.id}</span>

                                                {!isOwned && (
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); purchaseItem(activeCategory, item.id); }}
                                                        style={styles.buyBtn}
                                                        disabled={loading || userCoins < (item.coins || 0)}
                                                    >
                                                        <FaCoins /> {item.coins}
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}

                    {view === 'presets' && (
                        <div style={styles.presetsGrid}>
                            {presets.map(preset => (
                                <div key={preset.id} style={styles.presetCard}>
                                    <AvatarPreview avatar={preset.config} parts={parts} mini />
                                    <span style={styles.presetName}>{preset.name}</span>
                                    <button
                                        onClick={() => loadPreset(preset)}
                                        style={styles.loadBtn}
                                    >
                                        Load
                                    </button>
                                </div>
                            ))}
                            {presets.length === 0 && (
                                <p style={styles.emptyText}>No presets saved yet</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Avatar Preview Component
const AvatarPreview = ({ avatar, parts, mini = false }) => {
    const size = mini ? 80 : 200;

    // Get background color
    const bgItem = parts.backgrounds?.find(b => b.id === avatar.background);
    const bgColor = bgItem?.color || '#36393f';

    // Get skin color
    const skinItem = parts.skin_tones?.find(s => s.id === avatar.skin_tone);
    const skinColor = skinItem?.color || '#D2B48C';

    // Get hair color
    const hairItem = parts.hair_colors?.find(h => h.id === avatar.hair_color);
    const hairColor = hairItem?.color || '#1C1C1C';

    // Get eye color
    const eyeItem = parts.eye_colors?.find(e => e.id === avatar.eye_color);
    const eyeColor = eyeItem?.color || '#8B4513';

    return (
        <div style={{
            width: size,
            height: size,
            borderRadius: '50%',
            background: bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            border: '4px solid #40444b'
        }}>
            {/* Face */}
            <div style={{
                width: size * 0.7,
                height: size * 0.8,
                borderRadius: avatar.face_shape === 'round' ? '50%' :
                    avatar.face_shape === 'oval' ? '50% 50% 45% 45%' :
                        avatar.face_shape === 'square' ? '10%' : '50%',
                background: skinColor,
                position: 'relative'
            }}>
                {/* Hair */}
                <div style={{
                    position: 'absolute',
                    top: -size * 0.1,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: size * 0.7,
                    height: size * 0.3,
                    background: hairColor,
                    borderRadius: '50% 50% 0 0'
                }} />

                {/* Eyes */}
                <div style={{
                    position: 'absolute',
                    top: '35%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: size * 0.15
                }}>
                    <div style={{
                        width: size * 0.1,
                        height: size * 0.1,
                        borderRadius: '50%',
                        background: eyeColor
                    }} />
                    <div style={{
                        width: size * 0.1,
                        height: size * 0.1,
                        borderRadius: '50%',
                        background: eyeColor
                    }} />
                </div>

                {/* Mouth */}
                <div style={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: size * 0.2,
                    height: size * 0.05,
                    background: avatar.mouth === 'smile' ? '#e8a0a0' : '#d4a0a0',
                    borderRadius: avatar.mouth === 'smile' ? '0 0 50% 50%' : '4px'
                }} />
            </div>

            {/* Accessories */}
            {avatar.accessory === 'glasses' && (
                <div style={{
                    position: 'absolute',
                    top: '32%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: size * 0.5,
                    height: size * 0.12,
                    border: '2px solid #333',
                    borderRadius: '4px',
                    background: 'transparent'
                }} />
            )}
            {avatar.accessory === 'crown' && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: size * 0.2
                }}>👑</div>
            )}
            {avatar.accessory === 'cat_ears' && (
                <div style={{
                    position: 'absolute',
                    top: size * 0.05,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: size * 0.15
                }}>🐱</div>
            )}
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex',
        justifyContent: 'center', alignItems: 'center', zIndex: 10000
    },
    modal: {
        backgroundColor: '#2f3136', borderRadius: '12px', width: '900px',
        maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column'
    },
    header: {
        display: 'flex', alignItems: 'center', padding: '20px', borderBottom: '1px solid #40444b'
    },
    headerLeft: { display: 'flex', alignItems: 'center', flex: 1 },
    title: { margin: 0, color: '#fff', fontSize: '20px' },
    coinsDisplay: { display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', marginRight: '20px', background: '#40444b', padding: '6px 12px', borderRadius: '20px' },
    closeButton: { background: 'none', border: 'none', color: '#b9bbbe', cursor: 'pointer', fontSize: '20px' },
    tabs: { display: 'flex', padding: '10px 20px', gap: '10px', borderBottom: '1px solid #40444b' },
    tab: { background: '#40444b', border: 'none', color: '#b9bbbe', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' },
    activeTab: { background: '#5865f2', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' },
    mainContent: { display: 'flex', padding: '20px', gap: '20px', overflowY: 'auto', flex: 1 },
    previewSection: { width: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' },
    previewActions: { display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' },
    actionBtn: { background: '#40444b', border: 'none', color: '#fff', padding: '10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' },
    saveBtn: { background: '#57f287', border: 'none', color: '#000', padding: '12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 'bold' },
    customizeSection: { flex: 1 },
    categoryTabs: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' },
    catBtn: { background: '#40444b', border: 'none', color: '#b9bbbe', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' },
    catActive: { background: '#5865f2', border: 'none', color: '#fff', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' },
    catName: { display: 'none' },
    itemsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' },
    itemCard: { background: '#40444b', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', position: 'relative' },
    itemSelected: { border: '2px solid #5865f2', background: '#36393f' },
    itemLocked: { opacity: 0.7, cursor: 'default' },
    colorSwatch: { width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #fff' },
    itemPreview: { width: '40px', height: '40px', borderRadius: '50%', background: '#5865f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' },
    itemName: { color: '#dcddde', fontSize: '11px', textAlign: 'center' },
    buyBtn: { position: 'absolute', bottom: '8px', right: '8px', background: '#faa61a', border: 'none', color: '#000', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' },
    presetsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', width: '100%' },
    presetCard: { background: '#40444b', borderRadius: '10px', padding: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' },
    presetName: { color: '#fff', fontSize: '14px' },
    loadBtn: { background: '#5865f2', border: 'none', color: '#fff', padding: '6px 16px', borderRadius: '4px', cursor: 'pointer' },
    emptyText: { color: '#72767d', textAlign: 'center', gridColumn: '1 / -1', padding: '40px' }
};

export default AvatarStudioPanel;
