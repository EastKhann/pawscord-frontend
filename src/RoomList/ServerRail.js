// frontend/src/RoomList/ServerRail.js
import React from 'react';
import { FaCompass, FaPlus } from '../utils/iconOptimization';
import LazyImage from '../components/LazyImage';
import { styles } from '../SidebarStyles';

const ServerRail = ({
    servers, selectedServerId, hoveredServerId, setHoveredServerId,
    safeUnreadCounts, draggedServerId, dropTargetIndex, dropPosition,
    onHomeClick, handleServerClick, handleServerContextMenu,
    handleServerDragStartWrapper, handleServerDragOverWrapper,
    handleServerDragEndWrapper, handleServerDropWrapper,
    onOpenStore, onDiscoverClick, onAddClick
}) => {
    return (
        <div style={styles.serverRail}>
            {/* 🏠 Home Icon */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center', marginBottom: '8px' }}>
                <div style={{
                    position: 'absolute', left: 0, width: '4px',
                    height: selectedServerId === 'home' ? '40px' : (hoveredServerId === 'home' ? '20px' : '0px'),
                    backgroundColor: '#fff', borderRadius: '0 4px 4px 0',
                    transition: 'height 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }} />
                <div
                    style={{
                        ...styles.serverIcon,
                        backgroundColor: selectedServerId === 'home' ? '#5865f2' : '#313338',
                        borderRadius: selectedServerId === 'home' || hoveredServerId === 'home' ? '16px' : '50%',
                        width: '48px', height: '48px', marginBottom: 0,
                        transition: 'border-radius 0.3s ease, background-color 0.3s ease'
                    }}
                    onClick={onHomeClick}
                    onMouseEnter={() => setHoveredServerId('home')}
                    onMouseLeave={() => setHoveredServerId(null)}
                    title="Ana Sayfa"
                >
                    <img src="https://media.pawscord.com/assets/logo.png" alt="Pawscord"
                        style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                        onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
            </div>
            <div style={styles.separator} />

            {/* Server Icons */}
            {servers && servers.map((server, index) => {
                const initials = server.name.substring(0, 2).toUpperCase();
                const isActive = selectedServerId === server.id;
                const isDragging = draggedServerId === server.id;
                const isDropTarget = dropTargetIndex === index && !isDragging;

                const serverUnread = Object.keys(safeUnreadCounts)
                    .filter(k => k.startsWith('room-') && server.categories?.some(cat => cat.rooms?.some(r => `room-${r.slug}` === k)))
                    .reduce((sum, k) => sum + (safeUnreadCounts[k] || 0), 0);

                return (
                    <div key={server.id} style={{
                        position: 'relative', marginBottom: '8px', display: 'flex',
                        alignItems: 'center', width: '100%', justifyContent: 'center'
                    }}>
                        {/* Active Pill */}
                        <div style={{
                            position: 'absolute', left: 0, width: '4px',
                            height: isActive ? '40px' : (hoveredServerId === server.id ? '20px' : (serverUnread > 0 ? '8px' : '0px')),
                            backgroundColor: '#fff', borderRadius: '0 4px 4px 0',
                            transition: 'height 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }} />

                        {/* Drop indicator (before) */}
                        {isDropTarget && dropPosition === 'before' && (
                            <div style={{
                                position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)',
                                width: '40px', height: '3px', backgroundColor: '#43b581',
                                borderRadius: '2px', zIndex: 1000, boxShadow: '0 0 8px rgba(67, 181, 129, 0.6)'
                            }} />
                        )}

                        <div
                            draggable={true}
                            onDragStart={(e) => handleServerDragStartWrapper(e, server.id, index)}
                            onDragOver={(e) => handleServerDragOverWrapper(e, index)}
                            onDragEnd={handleServerDragEndWrapper}
                            onDrop={(e) => handleServerDropWrapper(e, index)}
                            style={{
                                ...styles.serverIcon,
                                backgroundColor: isActive ? '#5865f2' : (hoveredServerId === server.id ? '#5865f2' : '#313338'),
                                borderRadius: isActive || hoveredServerId === server.id ? '16px' : '50%',
                                cursor: isDragging ? 'grabbing' : 'grab',
                                position: 'relative',
                                transition: 'border-radius 0.3s ease, background-color 0.3s ease, opacity 0.2s ease, transform 0.1s ease',
                                opacity: isDragging ? 0.4 : 1, marginBottom: 0
                            }}
                            onClick={() => handleServerClick(server)}
                            onContextMenu={(e) => handleServerContextMenu(e, server)}
                            onMouseEnter={() => setHoveredServerId(server.id)}
                            onMouseLeave={() => setHoveredServerId(null)}
                            onMouseDown={(e) => { e.currentTarget.style.cursor = 'grabbing'; e.currentTarget.style.transform = 'scale(0.95)'; }}
                            onMouseUp={(e) => { e.currentTarget.style.cursor = 'grab'; e.currentTarget.style.transform = 'scale(1)'; }}
                            title={server.name}
                        >
                            {server.icon ? (
                                <LazyImage src={server.icon} alt={server.name} style={{ width: '100%', height: '100%', borderRadius: 'inherit', objectFit: 'cover' }} />
                            ) : (
                                <span style={{ fontWeight: 'bold', fontSize: '14px', color: 'white' }}>{initials}</span>
                            )}
                            {serverUnread > 0 && (
                                <div style={styles.serverBadge}>{serverUnread > 99 ? '99+' : serverUnread}</div>
                            )}
                        </div>

                        {/* Drop indicator (after) */}
                        {isDropTarget && dropPosition === 'after' && (
                            <div style={{
                                position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)',
                                width: '40px', height: '3px', backgroundColor: '#43b581',
                                borderRadius: '2px', zIndex: 1000, boxShadow: '0 0 8px rgba(67, 181, 129, 0.6)'
                            }} />
                        )}
                    </div>
                );
            })}

            {/* Discover */}
            <div
                style={{
                    ...styles.serverIcon,
                    backgroundColor: hoveredServerId === 'discover' ? '#23a559' : '#313338',
                    color: hoveredServerId === 'discover' ? 'white' : '#23a559',
                    marginTop: '10px',
                    borderRadius: hoveredServerId === 'discover' ? '16px' : '50%',
                    transition: 'border-radius 0.3s ease, background-color 0.3s ease, color 0.3s ease'
                }}
                onClick={onDiscoverClick}
                onMouseEnter={() => setHoveredServerId('discover')}
                onMouseLeave={() => setHoveredServerId(null)}
                title="Sunucu Keşfet"
            >
                <FaCompass size={24} />
            </div>

            {/* Store */}
            <div
                style={{
                    ...styles.serverIcon,
                    background: hoveredServerId === 'store' ? 'linear-gradient(135deg, #F1C40F 0%, #F39C12 100%)' : '#313338',
                    color: hoveredServerId === 'store' ? '#000' : '#F1C40F',
                    fontWeight: 'bold', cursor: 'pointer',
                    borderRadius: hoveredServerId === 'store' ? '16px' : '50%',
                    transition: 'border-radius 0.3s ease, background 0.3s ease, color 0.3s ease'
                }}
                onClick={onOpenStore}
                onMouseEnter={() => setHoveredServerId('store')}
                onMouseLeave={() => setHoveredServerId(null)}
                title="Premium Mağaza"
            >
                🛒
            </div>

            {/* Add */}
            <div
                style={{
                    ...styles.serverIcon,
                    backgroundColor: hoveredServerId === 'add' ? '#23a559' : '#313338',
                    color: hoveredServerId === 'add' ? 'white' : '#23a559',
                    borderRadius: hoveredServerId === 'add' ? '16px' : '50%',
                    transition: 'border-radius 0.3s ease, background-color 0.3s ease, color 0.3s ease'
                }}
                onClick={onAddClick}
                onMouseEnter={() => setHoveredServerId('add')}
                onMouseLeave={() => setHoveredServerId(null)}
                title="Ekle"
            >
                <FaPlus size={20} />
            </div>
        </div>
    );
};

export default React.memo(ServerRail);
