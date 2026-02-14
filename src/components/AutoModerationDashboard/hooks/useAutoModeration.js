import { useState } from 'react';
import confirmDialog from '../../../utils/confirmDialog';

export const useAutoModeration = ({ serverId, fetchWithAuth, apiBaseUrl }) => {
    const [rules, setRules] = useState([]);
    const [logs, setLogs] = useState([]);
    const [stats, setStats] = useState({
        total_violations: 0,
        auto_deleted: 0,
        warnings_issued: 0,
        users_banned: 0
    });
    const [showCreateRule, setShowCreateRule] = useState(false);
    const [newRule, setNewRule] = useState({
        rule_type: 'toxic',
        action: 'warn',
        threshold: 0.8,
        keywords: []
    });
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        try {
            const rulesRes = await fetchWithAuth(`${apiBaseUrl}/moderation/rules/${serverId}/`);
            if (rulesRes.ok) {
                const data = await rulesRes.json();
                setRules(data.rules || []);
            }

            const logsRes = await fetchWithAuth(`${apiBaseUrl}/moderation/logs/${serverId}/`);
            if (logsRes.ok) {
                const data = await logsRes.json();
                const logsData = data.logs || data;
                setLogs(logsData);

                if (logsData.length > 0) {
                    setStats({
                        total_violations: logsData.length,
                        auto_deleted: logsData.filter(l => l.action === 'delete').length,
                        warnings_issued: logsData.filter(l => l.action === 'warn').length,
                        users_banned: logsData.filter(l => l.action === 'ban').length
                    });
                }
            }
        } catch (error) {
            console.error('Failed to load moderation data:', error);
        }
        setLoading(false);
    };

    const createRule = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/rules/${serverId}/create/`, {
                method: 'POST',
                body: JSON.stringify(newRule)
            });

            if (res.ok) {
                const data = await res.json();
                setRules([...rules, data]);
                setShowCreateRule(false);
                setNewRule({ rule_type: 'toxic', action: 'warn', threshold: 0.8, keywords: [] });
            }
        } catch (error) {
            console.error('Failed to create rule:', error);
        }
    };

    const toggleRule = async (ruleId) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/moderation/rules/${ruleId}/toggle/`, {
                method: 'POST'
            });
            setRules(rules.map(r => r.id === ruleId ? { ...r, is_enabled: !r.is_enabled } : r));
        } catch (error) {
            console.error('Failed to toggle rule:', error);
        }
    };

    const deleteRule = async (ruleId) => {
        if (!await confirmDialog('Bu kural\u0131 silmek istedi\u011Fine emin misin?')) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/moderation/rules/${ruleId}/`, {
                method: 'DELETE'
            });
            setRules(rules.filter(r => r.id !== ruleId));
        } catch (error) {
            console.error('Failed to delete rule:', error);
        }
    };

    return {
        rules, logs, stats, loading,
        showCreateRule, setShowCreateRule,
        newRule, setNewRule,
        loadData, createRule, toggleRule, deleteRule
    };
};
