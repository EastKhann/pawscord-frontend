import { useState, useEffect } from 'react';
import { toast } from '../../utils/toast';
import { CATEGORY_KEY_MAP } from './avatarStudioStyles';

const DEFAULT_AVATAR = {
    face_shape: 'round', skin_tone: 'medium', eyes: 'normal', eye_color: 'brown',
    hairstyle: 'short', hair_color: 'black', mouth: 'smile', accessory: 'none',
    background: 'solid_gray', expression: 'default'
};

const useAvatarStudio = (fetchWithAuth, apiBaseUrl) => {
    const [parts, setParts] = useState({});
    const [avatar, setAvatar] = useState({});
    const [ownedItems, setOwnedItems] = useState([]);
    const [userCoins, setUserCoins] = useState(0);
    const [presets, setPresets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState('face_shapes');
    const [view, setView] = useState('customize');

    useEffect(() => { fetchParts(); fetchMyAvatar(); fetchPresets(); }, []);

    const fetchParts = async () => {
        try {
            const r = await fetchWithAuth(`${apiBaseUrl}/avatar-studio/parts/`);
            const d = await r.json();
            setParts(d.parts || {}); setUserCoins(d.user_coins || 0);
        } catch (e) { console.error('Failed to fetch parts:', e); }
    };

    const fetchMyAvatar = async () => {
        try {
            const r = await fetchWithAuth(`${apiBaseUrl}/avatar-studio/my-avatar/`);
            const d = await r.json();
            setAvatar(d.avatar || DEFAULT_AVATAR); setOwnedItems(d.owned_items || []);
        } catch (e) { console.error('Failed to fetch avatar:', e); }
    };

    const fetchPresets = async () => {
        try {
            const r = await fetchWithAuth(`${apiBaseUrl}/avatar-studio/presets/`);
            const d = await r.json();
            setPresets(d.presets || []);
        } catch (e) { console.error('Failed to fetch presets:', e); }
    };

    const selectPart = (category, itemId) => {
        const key = CATEGORY_KEY_MAP[category] || category;
        setAvatar(prev => ({ ...prev, [key]: itemId }));
    };

    const purchaseItem = async (category, itemId) => {
        setLoading(true);
        try {
            const r = await fetchWithAuth(`${apiBaseUrl}/avatar-studio/purchase/`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category, item_id: itemId })
            });
            const d = await r.json();
            if (d.message) { toast.success(d.message); setUserCoins(d.new_balance); setOwnedItems(d.owned_items); }
            else toast.error(d.error || 'Purchase failed');
        } catch (e) { toast.error('Purchase failed'); }
        finally { setLoading(false); }
    };

    const saveAvatar = async () => {
        setLoading(true);
        try {
            const r = await fetchWithAuth(`${apiBaseUrl}/avatar-studio/save/`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ config: avatar })
            });
            const d = await r.json();
            if (d.message) toast.success('Avatar saved!'); else toast.error(d.error || 'Save failed');
        } catch (e) { toast.error('Save failed'); }
        finally { setLoading(false); }
    };

    const randomizeAvatar = async () => {
        try {
            const r = await fetchWithAuth(`${apiBaseUrl}/avatar-studio/randomize/`, { method: 'POST' });
            const d = await r.json();
            if (d.avatar) { setAvatar(d.avatar); toast.success('Randomized!'); }
        } catch (e) { toast.error('Failed to randomize'); }
    };

    const savePreset = async () => {
        const name = prompt('Enter preset name:');
        if (!name) return;
        try {
            const r = await fetchWithAuth(`${apiBaseUrl}/avatar-studio/presets/save/`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, config: avatar })
            });
            const d = await r.json();
            if (d.preset_id) { toast.success('Preset saved!'); fetchPresets(); }
        } catch (e) { toast.error('Failed to save preset'); }
    };

    const loadPreset = (preset) => { setAvatar(preset.config); setView('customize'); };

    return {
        parts, avatar, ownedItems, userCoins, presets, loading, activeCategory, setActiveCategory,
        view, setView, selectPart, purchaseItem, saveAvatar, randomizeAvatar, savePreset, loadPreset
    };
};

export default useAvatarStudio;
