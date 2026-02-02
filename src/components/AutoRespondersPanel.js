import React, { useState, useEffect } from 'react';
import { FaTimes, FaRobot, FaPlus, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { toast } from '../utils/toast';

const AutoRespondersPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
    const [responders, setResponders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [newResponder, setNewResponder] = useState({
        trigger: '',
        response: '',
        match_type: 'contains',
        case_sensitive: false,
        enabled: true
    });

    const matchTypes = [
        { value: 'exact', label: 'Exact Match' },
        { value: 'contains', label: 'Contains' },
        { value: 'starts_with', label: 'Starts With' },
        { value: 'ends_with', label: 'Ends With' },
        { value: 'regex', label: 'Regex' },
    ];

    useEffect(() => {
        fetchResponders();
    }, []);

    const fetchResponders = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/autoresponders/list/?server_id=${serverId}`);
            const data = await response.json();
            setResponders(data.responders || []);
        } catch (error) {
            toast.error('Failed to load auto-responders');
        } finally {
            setLoading(false);
        }
    };

    const createResponder = async () => {
        if (!newResponder.trigger.trim() || !newResponder.response.trim()) {
            toast.error('Please enter trigger and response');
            return;
        }

        try {
            await fetchWithAuth(`${apiBaseUrl}/api/autoresponders/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newResponder, server_id: serverId })
            });

            toast.success('Auto-responder created');
            setNewResponder({
                trigger: '',
                response: '',
                match_type: 'contains',
                case_sensitive: false,
                enabled: true
            });
            setShowCreate(false);
            fetchResponders();
        } catch (error) {
            toast.error('Failed to create auto-responder');
        }
    };

    const toggleResponder = async (id, enabled) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/api/autoresponders/${id}/toggle/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ enabled })
            });

            toast.success(enabled ? 'Enabled' : 'Disabled');
            fetchResponders();
        } catch (error) {
            toast.error('Failed to toggle');
        }
    };

    const deleteResponder = async (id) => {
        if (!confirm('Delete this auto-responder?')) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/api/autoresponders/${id}/delete/`, {
                method: 'DELETE'
            });

            toast.success('Auto-responder deleted');
            fetchResponders();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaRobot style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Auto-Responders</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.toolbar}>
                    <div style={styles.count}>{responders.length} auto-responders</div>
                    <button onClick={() => setShowCreate(!showCreate)} style={styles.createButton}>
                        <FaPlus style={{ marginRight: '6px' }} />
                        Create New
                    </button>
                </div>

                {showCreate && (
                    <div style={styles.createForm}>
                        <div style={styles.formRow}>
                            <label style={styles.label}>Trigger</label>
                            <input
                                type="text"
                                value={newResponder.trigger}
                                onChange={(e) => setNewResponder({ ...newResponder, trigger: e.target.value })}
                                placeholder="hello"
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formRow}>
                            <label style={styles.label}>Response</label>
                            <textarea
                                value={newResponder.response}
                                onChange={(e) => setNewResponder({ ...newResponder, response: e.target.value })}
                                placeholder="Hi there! How can I help you?"
                                style={styles.textarea}
                                rows={3}
                            />
                        </div>

                        <div style={styles.formRow}>
                            <label style={styles.label}>Match Type</label>
                            <select
                                value={newResponder.match_type}
                                onChange={(e) => setNewResponder({ ...newResponder, match_type: e.target.value })}
                                style={styles.select}
                            >
                                {matchTypes.map(type => (
                                    <option key={type.value} value={type.value}>{type.label}</option>
                                ))}
                            </select>
                        </div>

                        <label style={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={newResponder.case_sensitive}
                                onChange={(e) => setNewResponder({ ...newResponder, case_sensitive: e.target.checked })}
                            />
                            <span style={styles.checkboxLabel}>Case sensitive</span>
                        </label>

                        <button onClick={createResponder} style={styles.submitButton}>
                            Create Auto-Responder
                        </button>
                    </div>
                )}

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading...</div>
                    ) : responders.length === 0 ? (
                        <div style={styles.empty}>No auto-responders configured</div>
                    ) : (
                        <div style={styles.respondersList}>
                            {responders.map((resp, idx) => (
                                <div key={idx} style={styles.responderCard}>
                                    <div style={styles.responderInfo}>
                                        <div style={styles.trigger}>
                                            Trigger: <span style={styles.triggerValue}>{resp.trigger}</span>
                                        </div>
                                        <div style={styles.response}>{resp.response}</div>
                                        <div style={styles.meta}>
                                            {matchTypes.find(t => t.value === resp.match_type)?.label}
                                            {resp.case_sensitive && ' • Case Sensitive'}
                                            {' • Uses: ' + (resp.usage_count || 0)}
                                        </div>
                                    </div>
                                    <div style={styles.actions}>
                                        <button
                                            onClick={() => toggleResponder(resp.id, !resp.enabled)}
                                            style={styles.toggleButton}
                                            title={resp.enabled ? 'Disable' : 'Enable'}
                                        >
                                            {resp.enabled ? (
                                                <FaToggleOn style={{ color: '#43b581', fontSize: '24px' }} />
                                            ) : (
                                                <FaToggleOff style={{ color: '#99aab5', fontSize: '24px' }} />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => deleteResponder(resp.id)}
                                            style={styles.deleteButton}
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #2c2f33',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#ffffff',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#99aab5',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '5px',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        borderBottom: '1px solid #2c2f33',
    },
    count: {
        fontSize: '14px',
        color: '#dcddde',
    },
    createButton: {
        padding: '8px 16px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
    },
    createForm: {
        padding: '20px',
        backgroundColor: '#2c2f33',
        borderBottom: '1px solid #2c2f33',
    },
    formRow: {
        marginBottom: '16px',
    },
    label: {
        display: 'block',
        fontSize: '14px',
        fontWeight: '600',
        color: '#dcddde',
        marginBottom: '6px',
    },
    input: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#1e1e1e',
        border: '1px solid #2c2f33',
        borderRadius: '4px',
        color: '#ffffff',
        fontSize: '14px',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#1e1e1e',
        border: '1px solid #2c2f33',
        borderRadius: '4px',
        color: '#ffffff',
        fontSize: '14px',
        fontFamily: 'inherit',
        resize: 'vertical',
    },
    select: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#1e1e1e',
        border: '1px solid #2c2f33',
        borderRadius: '4px',
        color: '#ffffff',
        fontSize: '14px',
    },
    checkbox: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px',
        cursor: 'pointer',
    },
    checkboxLabel: {
        fontSize: '14px',
        color: '#dcddde',
    },
    submitButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#43b581',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1,
    },
    loading: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '40px',
    },
    respondersList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    responderCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    responderInfo: {
        flex: 1,
    },
    trigger: {
        fontSize: '14px',
        color: '#99aab5',
        marginBottom: '8px',
    },
    triggerValue: {
        color: '#5865f2',
        fontWeight: '600',
        fontFamily: 'monospace',
    },
    response: {
        fontSize: '14px',
        color: '#ffffff',
        marginBottom: '8px',
    },
    meta: {
        fontSize: '12px',
        color: '#99aab5',
    },
    actions: {
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
    },
    toggleButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '4px',
    },
    deleteButton: {
        background: 'none',
        border: 'none',
        color: '#f04747',
        cursor: 'pointer',
        fontSize: '16px',
        padding: '8px',
    },
};

export default AutoRespondersPanel;
