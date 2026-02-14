import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../../utils/apiEndpoints';

export default function useProfileCardEditor(onClose, onSave) {
    const [profile, setProfile] = useState(null);
    const [themes, setThemes] = useState([]);
    const [badges, setBadges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('appearance');
    const [formData, setFormData] = useState({ banner: '', banner_color: '#5865F2', theme: 'default', bio: '', links: [] });
    const [selectedBadges, setSelectedBadges] = useState([]);
    const [newLink, setNewLink] = useState({ name: '', url: '' });

    const API_URL = API_BASE_URL;

    const loadData = useCallback(async () => {
        try {
            const token = localStorage.getItem('access_token');
            const [profileRes, themesRes, badgesRes] = await Promise.all([
                fetch(`${API_URL}/profile/card/`, { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch(`${API_URL}/profile/themes/`, { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch(`${API_URL}/profile/badges/`, { headers: { 'Authorization': `Bearer ${token}` } })
            ]);
            if (profileRes.ok) {
                const data = await profileRes.json();
                setProfile(data);
                setFormData({ banner: data.banner || '', banner_color: data.banner_color || '#5865F2', theme: data.theme || 'default', bio: data.bio || '', links: data.links || [] });
                setSelectedBadges(data.badges || []);
            }
            if (themesRes.ok) { const d = await themesRes.json(); setThemes(d.themes || []); }
            if (badgesRes.ok) { const d = await badgesRes.json(); setBadges(d.badges || []); }
        } catch (e) { console.error('Failed to load data:', e); }
        setLoading(false);
    }, [API_URL]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('access_token');
            const profileRes = await fetch(`${API_URL}/profile/card/update/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            await fetch(`${API_URL}/profile/badges/set/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ badges: selectedBadges })
            });
            if (profileRes.ok) { onSave?.(); onClose(); }
        } catch (e) { console.error('Save failed:', e); }
        setSaving(false);
    };

    const handleAddLink = async () => {
        if (!newLink.url) return;
        try {
            const token = localStorage.getItem('access_token');
            const res = await fetch(`${API_URL}/profile/links/add/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(newLink)
            });
            if (res.ok) { const d = await res.json(); setFormData(prev => ({ ...prev, links: d.links })); setNewLink({ name: '', url: '' }); }
        } catch (e) { console.error('Add link failed:', e); }
    };

    const handleRemoveLink = async (index) => {
        try {
            const token = localStorage.getItem('access_token');
            const res = await fetch(`${API_URL}/profile/links/${index}/remove/`, {
                method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) { const d = await res.json(); setFormData(prev => ({ ...prev, links: d.links })); }
        } catch (e) { console.error('Remove link failed:', e); }
    };

    const toggleBadge = (badgeId) => {
        setSelectedBadges(prev => {
            if (prev.includes(badgeId)) return prev.filter(id => id !== badgeId);
            if (prev.length >= 3) return prev;
            return [...prev, badgeId];
        });
    };

    useEffect(() => { loadData(); }, [loadData]);

    return {
        profile, themes, badges, loading, saving, activeTab, setActiveTab,
        formData, setFormData, selectedBadges, newLink, setNewLink,
        handleSave, handleAddLink, handleRemoveLink, toggleBadge
    };
}
