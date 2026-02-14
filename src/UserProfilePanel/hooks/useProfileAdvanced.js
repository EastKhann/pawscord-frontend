import { useState } from 'react';
import toast from '../../utils/toast';
import { authGet, authPost } from './profileApiUtils';

const useProfileAdvanced = ({ user }) => {
    const [richPresence, setRichPresence] = useState(null);
    const [endorsements, setEndorsements] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [equippedItems, setEquippedItems] = useState([]);
    const [nicknameHistory, setNicknameHistory] = useState([]);
    const [serverOrder, setServerOrder] = useState([]);
    const [oauthApps, setOauthApps] = useState([]);
    const [webhooks, setWebhooks] = useState([]);
    const [botAccounts, setBotAccounts] = useState([]);

    const fetchRichPresence = async () => {
        try {
            const response = await authGet(`/api/users/rich_presence/${user.username}/`);
            setRichPresence(response.data);
        } catch (err) { /* Silent fail */ }
    };

    const fetchEndorsements = async () => {
        try {
            const response = await authGet(`/api/users/${user.username}/endorsements/`);
            const data = response.data?.endorsements || response.data || [];
            setEndorsements(Array.isArray(data) ? data : []);
        } catch (err) { console.error('Endorsements fetch failed:', err); setEndorsements([]); }
    };

    const fetchInventory = async () => {
        try {
            const response = await authGet('/api/store/inventory/');
            setInventory(response.data || []);
            setEquippedItems(response.data?.filter(item => item.is_equipped) || []);
        } catch (err) { setInventory([]); setEquippedItems([]); }
    };

    const equipItem = async (inventoryId) => {
        try {
            await authPost(`/api/store/equip/${inventoryId}/`);
            toast.success('\u2705 Item equipped!');
            fetchInventory();
        } catch (err) { toast.error('\u274C Failed to equip item'); }
    };

    const unequipItem = async (inventoryId) => {
        try {
            await authPost(`/api/store/unequip/${inventoryId}/`);
            toast.success('\u2705 Item unequipped!');
            fetchInventory();
        } catch (err) { toast.error('\u274C Failed to unequip item'); }
    };

    const fetchNicknameHistory = async () => {
        try {
            const response = await authGet(`/api/users/${user.username}/nicknames/history/`);
            setNicknameHistory(Array.isArray(response.data) ? response.data : []);
        } catch (err) { console.error('Nickname history fetch failed:', err); setNicknameHistory([]); }
    };

    const fetchServerOrder = async () => {
        try {
            const response = await authGet('/api/user/server-order/');
            setServerOrder(response.data || []);
        } catch (err) { /* Silent fail */ }
    };

    const fetchOAuthApps = async () => {
        try {
            const response = await authGet('/oauth/apps/list/');
            setOauthApps(Array.isArray(response.data) ? response.data : []);
        } catch (err) { console.error('OAuth apps fetch failed:', err); setOauthApps([]); }
    };

    const fetchWebhooks = async () => {
        try {
            const response = await authGet('/webhooks/list/');
            setWebhooks(Array.isArray(response.data) ? response.data : []);
        } catch (err) { setWebhooks([]); }
    };

    const fetchBotAccounts = async () => {
        try {
            const response = await authGet('/bots/list/');
            setBotAccounts(Array.isArray(response.data) ? response.data : []);
        } catch (err) { setBotAccounts([]); }
    };

    return {
        richPresence, endorsements, inventory, equippedItems,
        nicknameHistory, serverOrder, oauthApps, webhooks, botAccounts,
        fetchRichPresence, fetchEndorsements, fetchInventory, equipItem,
        unequipItem, fetchNicknameHistory, fetchServerOrder,
        fetchOAuthApps, fetchWebhooks, fetchBotAccounts,
    };
};

export default useProfileAdvanced;
