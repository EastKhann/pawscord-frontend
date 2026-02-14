import { useState, useEffect } from 'react';
import { toast } from '../../utils/toast';

export const MATCH_TYPES = [
    { value: 'exact', label: 'Exact Match' },
    { value: 'contains', label: 'Contains' },
    { value: 'starts_with', label: 'Starts With' },
    { value: 'ends_with', label: 'Ends With' },
    { value: 'regex', label: 'Regex' },
];

const DEFAULT_RESPONDER = { trigger: '', response: '', match_type: 'contains', case_sensitive: false, enabled: true };

const useAutoResponders = ({ fetchWithAuth, apiBaseUrl, serverId }) => {
    const [responders, setResponders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [newResponder, setNewResponder] = useState(DEFAULT_RESPONDER);

    const fetchResponders = async () => {
        setLoading(true);
        try { const res = await fetchWithAuth(`${apiBaseUrl}/autoresponders/list/?server_id=${serverId}`); const d = await res.json(); setResponders(d.responders || []); }
        catch (e) { toast.error('Failed to load auto-responders'); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchResponders(); }, []);

    const createResponder = async () => {
        if (!newResponder.trigger.trim() || !newResponder.response.trim()) { toast.error('Please enter trigger and response'); return; }
        try {
            await fetchWithAuth(`${apiBaseUrl}/autoresponders/create/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...newResponder, server_id: serverId }) });
            toast.success('Auto-responder created'); setNewResponder(DEFAULT_RESPONDER); setShowCreate(false); fetchResponders();
        } catch (e) { toast.error('Failed to create auto-responder'); }
    };

    const toggleResponder = async (id, enabled) => {
        try { await fetchWithAuth(`${apiBaseUrl}/autoresponders/${id}/toggle/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ enabled }) }); toast.success(enabled ? 'Enabled' : 'Disabled'); fetchResponders(); }
        catch (e) { toast.error('Failed to toggle'); }
    };

    const deleteResponder = async (id) => {
        if (!confirm('Delete this auto-responder?')) return;
        try { await fetchWithAuth(`${apiBaseUrl}/autoresponders/${id}/delete/`, { method: 'DELETE' }); toast.success('Auto-responder deleted'); fetchResponders(); }
        catch (e) { toast.error('Failed to delete'); }
    };

    return { responders, loading, showCreate, setShowCreate, newResponder, setNewResponder, createResponder, toggleResponder, deleteResponder };
};

export default useAutoResponders;
