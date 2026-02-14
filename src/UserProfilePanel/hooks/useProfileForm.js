import { useState, useRef } from 'react';
import axios from 'axios';
import toast from '../../utils/toast';
import { API_URL, authGet, authPost, authHeaders } from './profileApiUtils';

// Global cache for default avatars (survives component remounts)
const avatarCache = {
    data: null, timestamp: 0, maxAge: 60 * 60 * 1000,
    isValid() { return this.data && (Date.now() - this.timestamp < this.maxAge); }
};

const useProfileForm = ({ user, onUpdate }) => {
    const [loading, setLoading] = useState({});
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        status_message: user?.status_message || '',
        avatar_url: user?.avatar_url || user?.avatar || '',
        steam_id: user?.steam_id || '',
        spotify_username: user?.spotify_username || '',
        instagram_username: user?.instagram_username || '',
        x_username: user?.x_username || '',
        xbox_gamertag: user?.xbox_gamertag || '',
    });
    const [defaultAvatars, setDefaultAvatars] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState(user?.phone_number || '');
    const [showCropper, setShowCropper] = useState(false);
    const [tempImageFile, setTempImageFile] = useState(null);
    const fileInputRef = useRef(null);

    const resetFormData = (u) => setFormData({
        username: u?.username || '', email: u?.email || '',
        status_message: u?.status_message || '',
        avatar_url: u?.avatar_url || u?.avatar || '',
        steam_id: u?.steam_id || '', spotify_username: u?.spotify_username || '',
        instagram_username: u?.instagram_username || '',
        x_username: u?.x_username || '', xbox_gamertag: u?.xbox_gamertag || '',
    });

    const fetchDefaultAvatars = async () => {
        try {
            if (avatarCache.isValid()) { setDefaultAvatars(avatarCache.data); return; }
            const response = await authGet('/api/users/default_avatars/');
            const BASE = API_URL.replace('/api', '');
            const avatars = Array.isArray(response.data) ? response.data.map(item => {
                if (typeof item === 'string') {
                    const filename = item.split('/').pop();
                    const name = filename.split('.')[0].replace('_100x100', '');
                    const fullUrl = item.startsWith('/api/') ? `${BASE}${item}` : item;
                    return { url: fullUrl, thumbnailUrl: fullUrl, name, filename };
                } else {
                    const buildUrl = (path) => path ? (path.startsWith('/api/') ? `${BASE}${path}` : path) : null;
                    return {
                        url: buildUrl(item.original),
                        thumbnailUrl: buildUrl(item.thumbnail) || buildUrl(item.original),
                        name: item.name,
                        filename: item.original ? item.original.split('/').pop() : 'avatar.webp'
                    };
                }
            }).filter(a => a.url) : [];
            avatarCache.data = avatars;
            avatarCache.timestamp = Date.now();
            setDefaultAvatars(avatars);
        } catch (err) { console.error('Default avatars fetch failed:', err); setDefaultAvatars([]); }
    };

    const selectDefaultAvatar = async (avatar) => {
        try {
            setLoading(l => ({ ...l, avatar: true }));
            const response = await authPost('/api/users/update_profile/', { avatar_url: avatar.url });
            setFormData(f => ({ ...f, avatar_url: avatar.url }));
            toast.success(`✅ Avatar değiştirildi: ${avatar.name}`);
            if (onUpdate) onUpdate(response.data);
        } catch (err) {
            toast.error('❌ Avatar değiştirilemedi.');
        } finally { setLoading(l => ({ ...l, avatar: false })); }
    };

    const handlePhoneUpdate = async () => {
        try {
            setLoading(l => ({ ...l, phoneUpdate: true }));
            await authPost('/api/users/update_phone/', { phone_number: phoneNumber });
            toast.success('✅ Telefon numarası güncellendi!');
        } catch (err) {
            toast.error('Telefon numarası güncellenemedi.');
        } finally { setLoading(l => ({ ...l, phoneUpdate: false })); }
    };

    const handleInputChange = (e) => {
        setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) { toast.error('Avatar 5MB\'dan küçük olmalıdır!'); return; }
        if (!file.type.startsWith('image/')) { toast.error('Lütfen bir resim dosyası seçin!'); return; }
        setTempImageFile(file);
        setShowCropper(true);
    };

    const handleCropComplete = async (croppedFile) => {
        try {
            const fd = new FormData();
            fd.append('avatar', croppedFile);
            setLoading(l => ({ ...l, avatar: true }));
            const response = await axios.post(`${API_URL}/api/users/update_profile/`, fd, {
                headers: { ...authHeaders(), 'Content-Type': 'multipart/form-data' },
            });
            const avatarUrl = response.data.avatar || response.data.avatar_url;
            setFormData(f => ({ ...f, avatar_url: avatarUrl }));
            setShowCropper(false);
            setTempImageFile(null);
            toast.success('✅ Avatar güncellendi!');
            if (onUpdate) onUpdate({ ...response.data, avatar_url: avatarUrl });
        } catch (err) {
            toast.error('Avatar yüklenemedi: ' + (err.response?.data?.error || 'Bilinmeyen hata'));
        } finally { setLoading(l => ({ ...l, avatar: false })); }
    };

    const handleSaveProfile = async () => {
        try {
            setLoading(l => ({ ...l, saveProfile: true }));
            const response = await authPost('/api/users/update_profile/', formData);
            toast.success('✅ Profil kaydedildi!');
            if (onUpdate) onUpdate(response.data);
        } catch (err) {
            toast.error('Profil kaydedilemedi: ' + (err.response?.data?.error || 'Bilinmeyen hata'));
        } finally { setLoading(l => ({ ...l, saveProfile: false })); }
    };

    return {
        loading, formData, defaultAvatars, phoneNumber, showCropper,
        tempImageFile, fileInputRef,
        setPhoneNumber, setShowCropper, setTempImageFile, resetFormData,
        fetchDefaultAvatars, selectDefaultAvatar, handlePhoneUpdate,
        handleInputChange, handleAvatarUpload, handleCropComplete, handleSaveProfile,
    };
};

export default useProfileForm;
