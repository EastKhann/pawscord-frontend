// components/APIKeysPanel.js
// 🔑 API Keys Management Panel

import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { FaKey, FaTrash, FaCopy, FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa';

const APIKeysPanel = ({ fetchWithAuth, apiBaseUrl }) => {
    const [keys, setKeys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showKey, setShowKey] = useState({});

    useEffect(() => {
        loadKeys();
    }, []);

    const loadKeys = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/apikeys/list/`);
            if (res.ok) {
                const data = await res.json();
                setKeys(data);
            }
        } catch (e) {
            console.error('API keys load error:', e);
        } finally {
            setLoading(false);
        }
    };

    const createKey = async () => {
        const name = prompt('API Key name:');
        if (!name) return;

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/apikeys/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });

            if (res.ok) {
                const newKey = await res.json();
                toast.success(`✅ Key created!\n\nKey: ${newKey.key}\n\n⚠️ Save this! It won't be shown again.`);
                loadKeys();
            }
        } catch (e) {
            toast.error('❌ Failed to create key');
        }
    };

    const deleteKey = async (keyId) => {
        if (!confirm('Delete this API key?')) return;

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/apikeys/${keyId}/delete/`, {
                method: 'DELETE'
            });
            if (res.ok) {
                loadKeys();
            }
        } catch (e) {
            toast.error('❌ Failed to delete key');
        }
    };

    const copyKey = (key) => {
        navigator.clipboard.writeText(key);
        toast.success('✅ Copied to clipboard!');
    };

    const maskKey = (key) => {
        if (!key) return '';
        return key.substring(0, 8) + '•'.repeat(24);
    };

    if (loading) return <div style={{ padding: '20px', color: '#b9bbbe' }}>Loading...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h4 style={{ margin: 0, color: '#dcddde' }}>API Keys</h4>
                    <p style={{ margin: '5px 0 0 0', color: '#72767d', fontSize: '13px' }}>
                        Create and manage API keys for external integrations
                    </p>
                </div>
                <button
                    onClick={createKey}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#5865f2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: 'bold'
                    }}
                >
                    <FaPlus /> New Key
                </button>
            </div>

            {keys.length === 0 ? (
                <div style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: '#72767d',
                    backgroundColor: '#2f3136',
                    borderRadius: '8px'
                }}>
                    <FaKey style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }} />
                    <p>No API keys yet</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {keys.map(key => (
                        <div
                            key={key.id}
                            style={{
                                padding: '16px',
                                backgroundColor: '#2f3136',
                                borderRadius: '8px',
                                border: '1px solid #40444b'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                        <FaKey style={{ color: '#5865f2' }} />
                                        <span style={{ color: '#dcddde', fontWeight: 'bold' }}>
                                            {key.name}
                                        </span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '8px',
                                        backgroundColor: '#1e1f22',
                                        borderRadius: '4px',
                                        fontFamily: 'monospace',
                                        fontSize: '13px',
                                        color: '#b9bbbe'
                                    }}>
                                        <span>
                                            {showKey[key.id] ? key.key : maskKey(key.key)}
                                        </span>
                                        <button
                                            onClick={() => setShowKey(prev => ({ ...prev, [key.id]: !prev[key.id] }))}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#b9bbbe',
                                                cursor: 'pointer',
                                                padding: '4px'
                                            }}
                                        >
                                            {showKey[key.id] ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                        <button
                                            onClick={() => copyKey(key.key)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#b9bbbe',
                                                cursor: 'pointer',
                                                padding: '4px'
                                            }}
                                        >
                                            <FaCopy />
                                        </button>
                                    </div>
                                    <div style={{ marginTop: '8px', fontSize: '12px', color: '#72767d' }}>
                                        Created: {new Date(key.created_at).toLocaleDateString()}
                                        {key.last_used && (
                                            <> • Last used: {new Date(key.last_used).toLocaleDateString()}</>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteKey(key.id)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#f04747',
                                        cursor: 'pointer',
                                        padding: '8px',
                                        borderRadius: '4px'
                                    }}
                                    title="Delete key"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div style={{
                padding: '12px',
                backgroundColor: 'rgba(250, 166, 26, 0.1)',
                borderLeft: '3px solid #faa61a',
                borderRadius: '4px',
                fontSize: '13px',
                color: '#dcddde'
            }}>
                ⚠️ <strong>Security:</strong> Keep your API keys secret! Anyone with your key can access your account.
            </div>
        </div>
    );
};

export default APIKeysPanel;



