// frontend/src/components/BatchOperationsPanel.js
import React, { useState } from 'react';
import toast from '../utils/toast';
import './BatchOperationsPanel.css';

const BatchOperationsPanel = ({ apiBaseUrl, onClose }) => {
    const [operation, setOperation] = useState('users'); // 'users', 'servers', 'messages'
    const [action, setAction] = useState('get'); // 'get', 'create', 'update', 'delete'
    const [ids, setIds] = useState('');
    const [data, setData] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const executeBatchOperation = async () => {
        if (action === 'get' && !ids.trim()) {
            toast.error('❌ ID listesi boş olamaz');
            return;
        }

        if ((action === 'create' || action === 'update') && !data.trim()) {
            toast.error('❌ Veri boş olamaz');
            return;
        }

        try {
            setLoading(true);
            setResult(null);

            const token = localStorage.getItem('token');
            let endpoint = '';
            let method = 'POST';
            let body = {};

            // Determine endpoint
            if (action === 'get') {
                endpoint = `${apiBaseUrl}/${operation}/batch/`;
                body = { ids: ids.split(',').map(id => id.trim()).filter(id => id) };
            } else if (action === 'create') {
                endpoint = `${apiBaseUrl}/batch/create/`;
                body = {
                    model: operation === 'users' ? 'user' : operation === 'servers' ? 'server' : 'message',
                    data: JSON.parse(data)
                };
            } else if (action === 'update') {
                endpoint = `${apiBaseUrl}/batch/update/`;
                body = {
                    model: operation === 'users' ? 'user' : operation === 'servers' ? 'server' : 'message',
                    updates: JSON.parse(data)
                };
            } else if (action === 'delete') {
                endpoint = `${apiBaseUrl}/batch/delete/`;
                body = {
                    model: operation === 'users' ? 'user' : operation === 'servers' ? 'server' : 'message',
                    ids: ids.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
                };
            }

            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                const responseData = await response.json();
                setResult({
                    success: true,
                    data: responseData,
                    count: Array.isArray(responseData) ? responseData.length : 
                           responseData.created?.length || responseData.updated?.length || 
                           responseData.deleted || 0
                });
                toast.success(`✅ İşlem başarılı: ${result?.count || 0} kayıt`);
            } else {
                const error = await response.json();
                setResult({
                    success: false,
                    error: error.error || 'İşlem başarısız'
                });
                toast.error(`❌ ${error.error || 'İşlem başarısız'}`);
            }
        } catch (error) {
            console.error('Batch operation error:', error);
            setResult({
                success: false,
                error: error.message || 'Bağlantı hatası'
            });
            toast.error('❌ İşlem hatası');
        } finally {
            setLoading(false);
        }
    };

    const getPlaceholder = () => {
        if (action === 'get' || action === 'delete') {
            return 'ID listesi (virgülle ayırın): 1, 2, 3, 4';
        } else if (action === 'create') {
            if (operation === 'users') {
                return '[\n  {\n    "username": "user1",\n    "email": "user1@example.com",\n    "password": "pass123"\n  },\n  {\n    "username": "user2",\n    "email": "user2@example.com",\n    "password": "pass456"\n  }\n]';
            } else if (operation === 'servers') {
                return '[\n  {\n    "name": "Server 1",\n    "description": "Description 1"\n  },\n  {\n    "name": "Server 2",\n    "description": "Description 2"\n  }\n]';
            } else {
                return '[\n  {\n    "content": "Message 1",\n    "room_slug": "general"\n  },\n  {\n    "content": "Message 2",\n    "room_slug": "random"\n  }\n]';
            }
        } else if (action === 'update') {
            return '[\n  {\n    "id": 1,\n    "field": "value"\n  },\n  {\n    "id": 2,\n    "field": "value"\n  }\n]';
        }
        return '';
    };

    const exampleTemplates = {
        users_create: [
            { username: 'testuser1', email: 'test1@example.com', password: 'pass123' },
            { username: 'testuser2', email: 'test2@example.com', password: 'pass456' }
        ],
        users_update: [
            { id: 1, bio: 'Updated bio', custom_status: 'New status' },
            { id: 2, bio: 'Another bio', custom_status: 'Another status' }
        ],
        servers_create: [
            { name: 'Gaming Server', description: 'For gamers', is_public: true },
            { name: 'Study Server', description: 'For students', is_public: false }
        ],
        messages_create: [
            { content: 'Batch message 1', room_slug: 'general' },
            { content: 'Batch message 2', room_slug: 'random' }
        ]
    };

    const loadTemplate = () => {
        const key = `${operation}_${action}`;
        const template = exampleTemplates[key];
        if (template) {
            setData(JSON.stringify(template, null, 2));
        } else {
            toast.info('ℹ️ Bu işlem için örnek şablon yok');
        }
    };

    return (
        <div className="batch-ops-overlay" onClick={onClose}>
            <div className="batch-ops-panel" onClick={e => e.stopPropagation()}>
                <div className="batch-ops-header">
                    <h2>⚡ Batch Operations</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="batch-ops-controls">
                    <div className="control-group">
                        <label>Kaynak Tipi</label>
                        <div className="button-group">
                            <button 
                                className={operation === 'users' ? 'active' : ''}
                                onClick={() => setOperation('users')}
                            >
                                👥 Users
                            </button>
                            <button 
                                className={operation === 'servers' ? 'active' : ''}
                                onClick={() => setOperation('servers')}
                            >
                                🏰 Servers
                            </button>
                            <button 
                                className={operation === 'messages' ? 'active' : ''}
                                onClick={() => setOperation('messages')}
                            >
                                💬 Messages
                            </button>
                        </div>
                    </div>

                    <div className="control-group">
                        <label>İşlem Tipi</label>
                        <div className="button-group">
                            <button 
                                className={action === 'get' ? 'active' : ''}
                                onClick={() => setAction('get')}
                            >
                                📥 Get
                            </button>
                            <button 
                                className={action === 'create' ? 'active' : ''}
                                onClick={() => setAction('create')}
                            >
                                ➕ Create
                            </button>
                            <button 
                                className={action === 'update' ? 'active' : ''}
                                onClick={() => setAction('update')}
                            >
                                ✏️ Update
                            </button>
                            <button 
                                className={action === 'delete' ? 'active' : ''}
                                onClick={() => setAction('delete')}
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div className="batch-ops-content">
                    {(action === 'get' || action === 'delete') && (
                        <div className="input-section">
                            <div className="section-header">
                                <label>ID Listesi</label>
                                <span className="section-hint">Virgülle ayırarak girin</span>
                            </div>
                            <input
                                type="text"
                                className="ids-input"
                                placeholder={getPlaceholder()}
                                value={ids}
                                onChange={(e) => setIds(e.target.value)}
                            />
                        </div>
                    )}

                    {(action === 'create' || action === 'update') && (
                        <div className="input-section">
                            <div className="section-header">
                                <label>JSON Verisi</label>
                                <button className="load-template-btn" onClick={loadTemplate}>
                                    📄 Örnek Yükle
                                </button>
                            </div>
                            <textarea
                                className="data-textarea"
                                placeholder={getPlaceholder()}
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                rows={12}
                            />
                        </div>
                    )}

                    <button 
                        className="execute-btn"
                        onClick={executeBatchOperation}
                        disabled={loading}
                    >
                        {loading ? '⏳ İşleniyor...' : '▶️ İşlemi Çalıştır'}
                    </button>

                    {result && (
                        <div className={`result-section ${result.success ? 'success' : 'error'}`}>
                            <div className="result-header">
                                <span>{result.success ? '✅ Başarılı' : '❌ Hata'}</span>
                                {result.count > 0 && (
                                    <span className="result-count">{result.count} kayıt</span>
                                )}
                            </div>
                            <pre className="result-data">
                                {JSON.stringify(result.data || result.error, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BatchOperationsPanel;
