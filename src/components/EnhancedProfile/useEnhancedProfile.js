import { useState, useEffect } from 'react';
import {
    FaTwitter, FaGithub, FaInstagram, FaYoutube, FaTwitch, FaSpotify, FaSteam,
    FaGlobe, FaDiscord
} from 'react-icons/fa';
import { API_BASE_URL } from '../../utils/constants';
import toast from '../../utils/toast';

export const SOCIAL_ICONS = {
    twitter: { icon: FaTwitter, color: '#1DA1F2', label: 'Twitter' },
    github: { icon: FaGithub, color: '#333', label: 'GitHub' },
    instagram: { icon: FaInstagram, color: '#E4405F', label: 'Instagram' },
    youtube: { icon: FaYoutube, color: '#FF0000', label: 'YouTube' },
    twitch: { icon: FaTwitch, color: '#9146FF', label: 'Twitch' },
    spotify: { icon: FaSpotify, color: '#1DB954', label: 'Spotify' },
    steam: { icon: FaSteam, color: '#00adee', label: 'Steam' },
    website: { icon: FaGlobe, color: '#666', label: 'Website' },
    discord: { icon: FaDiscord, color: '#5865F2', label: 'Discord' },
};

const useEnhancedProfile = (userId, isOwn) => {
    const [profile, setProfile] = useState(null);
    const [extendedProfile, setExtendedProfile] = useState(null);
    const [showcases, setShowcases] = useState([]);
    const [mutualConnections, setMutualConnections] = useState(null);
    const [profileNote, setProfileNote] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [activeTab, setActiveTab] = useState('about');

    const token = localStorage.getItem('access_token');

    useEffect(() => {
        fetchProfileData();
    }, [userId]);

    const fetchProfileData = async () => {
        setIsLoading(true);
        try {
            const profileRes = await fetch(`${API_BASE_URL}/profile/${userId}/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (profileRes.ok) {
                const profileData = await profileRes.json();
                setProfile(profileData);
            }

            const extendedRes = await fetch(`${API_BASE_URL}/profile/extended/?user_id=${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (extendedRes.ok) {
                const extendedData = await extendedRes.json();
                setExtendedProfile(extendedData);
            }

            const showcaseRes = await fetch(`${API_BASE_URL}/profile/showcases/?user_id=${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (showcaseRes.ok) {
                const showcaseData = await showcaseRes.json();
                setShowcases(showcaseData);
            }

            if (!isOwn) {
                const mutualRes = await fetch(`${API_BASE_URL}/profile/mutual-connections/?target_user_id=${userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (mutualRes.ok) {
                    const mutualData = await mutualRes.json();
                    setMutualConnections(mutualData);
                }

                const noteRes = await fetch(`${API_BASE_URL}/profile/note/?target_user_id=${userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (noteRes.ok) {
                    const noteData = await noteRes.json();
                    setProfileNote(noteData.content || '');
                }

                fetch(`${API_BASE_URL}/profile/visit/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ profile_user_id: userId })
                });
            }
        } catch (error) {
            console.error('Profile fetch error:', error);
            toast.error('Profil yüklenemedi');
        } finally {
            setIsLoading(false);
        }
    };

    const saveExtendedProfile = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/profile/extended/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editData)
            });

            if (res.ok) {
                const data = await res.json();
                setExtendedProfile(data.profile);
                setIsEditing(false);
                toast.success('Profil güncellendi!');
            } else {
                toast.error('Profil güncellenemedi');
            }
        } catch (error) {
            console.error('Save error:', error);
            toast.error('Bir hata oluştu');
        }
    };

    const saveProfileNote = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/profile/note/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    target_user_id: userId,
                    content: profileNote
                })
            });

            if (res.ok) {
                toast.success('Not kaydedildi!');
            }
        } catch (error) {
            console.error('Note save error:', error);
        }
    };

    const getSocialLinks = () => {
        if (!extendedProfile) return [];

        const links = [];
        if (extendedProfile.website_url) links.push({ type: 'website', url: extendedProfile.website_url });
        if (extendedProfile.twitter_username) links.push({ type: 'twitter', url: `https://twitter.com/${extendedProfile.twitter_username}` });
        if (extendedProfile.github_username) links.push({ type: 'github', url: `https://github.com/${extendedProfile.github_username}` });
        if (extendedProfile.instagram_username) links.push({ type: 'instagram', url: `https://instagram.com/${extendedProfile.instagram_username}` });
        if (extendedProfile.youtube_channel) links.push({ type: 'youtube', url: extendedProfile.youtube_channel });
        if (extendedProfile.twitch_username) links.push({ type: 'twitch', url: `https://twitch.tv/${extendedProfile.twitch_username}` });
        if (extendedProfile.spotify_url) links.push({ type: 'spotify', url: extendedProfile.spotify_url });
        if (extendedProfile.steam_id) links.push({ type: 'steam', url: `https://steamcommunity.com/id/${extendedProfile.steam_id}` });
        return links;
    };

    return {
        profile,
        extendedProfile,
        showcases,
        mutualConnections,
        profileNote, setProfileNote,
        isLoading,
        isEditing, setIsEditing,
        editData, setEditData,
        activeTab, setActiveTab,
        saveExtendedProfile,
        saveProfileNote,
        getSocialLinks
    };
};

export default useEnhancedProfile;
