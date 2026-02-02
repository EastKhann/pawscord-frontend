// frontend/src/components/ChannelClonePanel.js - Channel Clone/Template System
import React, { useState, useEffect } from 'react';
import {
    FaCopy, FaTimes, FaHashtag, FaVolumeUp, FaFolder,
    FaCog, FaPlus, FaCheck, FaExclamationTriangle, FaSearch,
    FaLock, FaUserShield, FaArchive, FaStream
} from 'react-icons/fa';
import toast from '../utils/toast';
import './ChannelClonePanel.css';

const ChannelClonePanel = ({ apiBaseUrl, serverId, onClose }) => {
    const [channels, setChannels] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cloning, setCloning] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [cloneOptions, setCloneOptions] = useState({
        name: '',
        copyPermissions: true,
        copySettings: true,
        copyPins: false,
        targetCategory: '',
        position: 'after' // 'after', 'beginning', 'end'
    });

    useEffect(() => {
        fetchChannels();
    }, []);

    const fetchChannels = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                const allChannels = data.channels || data || [];
                setChannels(allChannels.filter(c => c.type !== 'category'));
                setCategories(allChannels.filter(c => c.type === 'category'));
            }
        } catch (error) {
            console.error('Fetch channels error:', error);
        } finally {
            setLoading(false);
        }
    };

    const selectChannel = (channel) => {
        setSelectedChannel(channel);
        setCloneOptions(prev => ({
            ...prev,
            name: `${channel.name}-kopya`,
            targetCategory: channel.category_id || ''
        }));
    };

    const cloneChannel = async () => {
        if (!selectedChannel) {
            toast.error('Lütfen klonlanacak kanalı seçin');
            return;
        }

        if (!cloneOptions.name.trim()) {
            toast.error('Kanal adı gerekli');
            return;
        }

        setCloning(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/channels/${selectedChannel.id}/clone/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: cloneOptions.name,
                    copy_permissions: cloneOptions.copyPermissions,
                    copy_settings: cloneOptions.copySettings,
                    copy_pins: cloneOptions.copyPins,
                    target_category_id: cloneOptions.targetCategory || null,
                    position: cloneOptions.position
                })
            });

            if (response.ok) {
                const newChannel = await response.json();
                toast.success(`📋 "${cloneOptions.name}" kanalı oluşturuldu!`);
                fetchChannels();
                setSelectedChannel(null);
                setCloneOptions({
                    name: '',
                    copyPermissions: true,
                    copySettings: true,
                    copyPins: false,
                    targetCategory: '',
                    position: 'after'
                });
            } else {
                const error = await response.json();
                toast.error(error.message || 'Klonlama başarısız');
            }
        } catch (error) {
            console.error('Clone error:', error);
            toast.error('Klonlama hatası');
        } finally {
            setCloning(false);
        }
    };

    const getChannelIcon = (type) => {
        switch (type) {
            case 'voice': return <FaVolumeUp />;
            case 'category': return <FaFolder />;
            case 'stage': return <FaStream />;
            default: return <FaHashtag />;
        }
    };

    const filteredChannels = channels.filter(c =>
        c.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group channels by category
    const groupedChannels = filteredChannels.reduce((acc, channel) => {
        const categoryId = channel.category_id || 'uncategorized';
        if (!acc[categoryId]) acc[categoryId] = [];
        acc[categoryId].push(channel);
        return acc;
    }, {});

    return (
        <div className="channel-clone-overlay" onClick={onClose}>
            <div className="channel-clone-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2><FaCopy /> Kanal Klonlama</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="panel-layout">
                    <div className="channels-section">
                        <div className="section-header">
                            <h3>Kaynak Kanal Seçin</h3>
                            <div className="search-box">
                                <FaSearch />
                                <input
                                    type="text"
                                    placeholder="Kanal ara..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="channels-list">
                            {loading ? (
                                <div className="loading">Yükleniyor...</div>
                            ) : (
                                <>
                                    {Object.entries(groupedChannels).map(([categoryId, categoryChannels]) => {
                                        const category = categories.find(c => c.id === categoryId);
                                        return (
                                            <div key={categoryId} className="channel-group">
                                                <div className="category-header">
                                                    <FaFolder />
                                                    <span>{category?.name || 'Kategorisiz'}</span>
                                                </div>
                                                {categoryChannels.map(channel => (
                                                    <div
                                                        key={channel.id}
                                                        className={`channel-item ${selectedChannel?.id === channel.id ? 'selected' : ''}`}
                                                        onClick={() => selectChannel(channel)}
                                                    >
                                                        <span className="channel-icon">
                                                            {getChannelIcon(channel.type)}
                                                        </span>
                                                        <span className="channel-name">{channel.name}</span>
                                                        {channel.is_private && <FaLock className="private-icon" />}
                                                        {selectedChannel?.id === channel.id && (
                                                            <FaCheck className="selected-icon" />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    </div>

                    <div className="options-section">
                        {selectedChannel ? (
                            <>
                                <div className="selected-channel-info">
                                    <h3>Seçili Kanal</h3>
                                    <div className="info-card">
                                        <span className="channel-icon large">
                                            {getChannelIcon(selectedChannel.type)}
                                        </span>
                                        <div className="channel-details">
                                            <span className="name">{selectedChannel.name}</span>
                                            <span className="type">
                                                {selectedChannel.type === 'voice' ? 'Ses Kanalı' :
                                                    selectedChannel.type === 'stage' ? 'Sahne Kanalı' : 'Metin Kanalı'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="clone-options">
                                    <h3>Klonlama Seçenekleri</h3>

                                    <div className="form-group">
                                        <label>Yeni Kanal Adı *</label>
                                        <input
                                            type="text"
                                            value={cloneOptions.name}
                                            onChange={(e) => setCloneOptions(prev => ({ ...prev, name: e.target.value }))}
                                            placeholder="Kanal adı..."
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Hedef Kategori</label>
                                        <select
                                            value={cloneOptions.targetCategory}
                                            onChange={(e) => setCloneOptions(prev => ({ ...prev, targetCategory: e.target.value }))}
                                        >
                                            <option value="">Kategorisiz</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Konum</label>
                                        <select
                                            value={cloneOptions.position}
                                            onChange={(e) => setCloneOptions(prev => ({ ...prev, position: e.target.value }))}
                                        >
                                            <option value="after">Orijinal Kanalın Altına</option>
                                            <option value="beginning">Kategorinin Başına</option>
                                            <option value="end">Kategorinin Sonuna</option>
                                        </select>
                                    </div>

                                    <div className="checkbox-options">
                                        <label className="checkbox-item">
                                            <input
                                                type="checkbox"
                                                checked={cloneOptions.copyPermissions}
                                                onChange={(e) => setCloneOptions(prev => ({ ...prev, copyPermissions: e.target.checked }))}
                                            />
                                            <FaUserShield />
                                            <span>İzinleri Kopyala</span>
                                        </label>

                                        <label className="checkbox-item">
                                            <input
                                                type="checkbox"
                                                checked={cloneOptions.copySettings}
                                                onChange={(e) => setCloneOptions(prev => ({ ...prev, copySettings: e.target.checked }))}
                                            />
                                            <FaCog />
                                            <span>Ayarları Kopyala</span>
                                        </label>

                                        <label className="checkbox-item">
                                            <input
                                                type="checkbox"
                                                checked={cloneOptions.copyPins}
                                                onChange={(e) => setCloneOptions(prev => ({ ...prev, copyPins: e.target.checked }))}
                                            />
                                            <FaArchive />
                                            <span>Sabitlenmiş Mesajları Kopyala</span>
                                        </label>
                                    </div>

                                    <div className="warning-note">
                                        <FaExclamationTriangle />
                                        <span>Mesajlar klonlanmaz, sadece kanal yapısı kopyalanır.</span>
                                    </div>
                                </div>

                                <button
                                    className="clone-btn"
                                    onClick={cloneChannel}
                                    disabled={cloning || !cloneOptions.name.trim()}
                                >
                                    {cloning ? (
                                        <>Klonlanıyor...</>
                                    ) : (
                                        <><FaCopy /> Kanalı Klonla</>
                                    )}
                                </button>
                            </>
                        ) : (
                            <div className="no-selection">
                                <FaCopy className="big-icon" />
                                <p>Klonlamak istediğiniz kanalı soldan seçin</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChannelClonePanel;
