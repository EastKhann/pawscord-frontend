// frontend/src/RoomList/ServerRail.js
import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { FaCompass, FaPlus } from '../utils/iconOptimization';
import LazyImage from '../components/shared/LazyImage';
import { styles } from '../styles/SidebarStyles';

// -- extracted inline style constants --

/**
 * @param {Object} props
 * @param {Array} props.servers - List of server objects to display
 * @param {string|number} props.selectedServerId - Currently selected server ID
 * @param {string|number|null} props.hoveredServerId - Currently hovered server ID
 * @param {Function} props.setHoveredServerId - Set hovered server ID
 * @param {Object} props.safeUnreadCounts - Unread counts per room key
 * @param {Function} props.onHomeClick - Handler for home button click
 * @param {Function} props.handleServerClick - Handler for server icon click
 * @param {Function} props.onDiscoverClick - Handler for discover button click
 * @param {Function} props.onAddClick - Handler for add server button click
 */
const ServerRail = ({
    servers,
    selectedServerId,
    hoveredServerId,
    setHoveredServerId,
    safeUnreadCounts,
    draggedServerId,
    dropTargetIndex,
    dropPosition,
    onHomeClick,
    handleServerClick,
    handleServerContextMenu,
    handleServerDragStartWrapper,
    handleServerDragOverWrapper,
    handleServerDragEndWrapper,
    handleServerDropWrapper,
    onOpenStore,
    onDiscoverClick,
    onAddClick,
}) => {
    const { t } = useTranslation();
    const handleHomeHover = useCallback(() => setHoveredServerId('home'), [setHoveredServerId]);
    const handleHomeLeave = useCallback(() => setHoveredServerId(null), [setHoveredServerId]);
    const handleDiscoverHover = useCallback(
        () => setHoveredServerId('discover'),
        [setHoveredServerId]
    );
    const handleDiscoverLeave = useCallback(() => setHoveredServerId(null), [setHoveredServerId]);
    const handleStoreHover = useCallback(() => setHoveredServerId('store'), [setHoveredServerId]);
    const handleStoreLeave = useCallback(() => setHoveredServerId(null), [setHoveredServerId]);
    const handleAddHover = useCallback(() => setHoveredServerId('add'), [setHoveredServerId]);
    const handleAddLeave = useCallback(() => setHoveredServerId(null), [setHoveredServerId]);
    const handleImgError = useCallback((e) => {
        e.target.style.display = 'none';
    }, []);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <div style={styles.serverRail} role="navigation" aria-label="Server listsi">
            {/* 🏠 Home Icon */}
            <div>
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        width: '4px',
                        height:
                            selectedServerId === 'home'
                                ? '40px'
                                : hoveredServerId === 'home'
                                  ? '20px'
                                  : '0px',
                        backgroundColor: '#fff',
                        borderRadius: '0 4px 4px 0',
                        transition: 'height 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    }}
                />
                <div
                    style={{
                        ...styles.serverIcon,
                        backgroundColor: selectedServerId === 'home' ? '#5865f2' : '#1a1c1f',
                        borderRadius:
                            selectedServerId === 'home' || hoveredServerId === 'home'
                                ? '16px'
                                : '50%',
                        width: '48px',
                        height: '48px',
                        marginBottom: 0,
                        transition: 'border-radius 0.3s ease, background-color 0.3s ease',
                    }}
                    onClick={onHomeClick}
                    onMouseEnter={handleHomeHover}
                    onMouseLeave={handleHomeLeave}
                    title={t('nav.home', 'Ana Sayfa')}
                    role="button"
                    tabIndex={0}
                    aria-label={t('nav.home', 'Ana Sayfa')}
                    aria-pressed={selectedServerId === 'home'}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onHomeClick()}
                >
                    <img
                        src="https://media.pawscord.com/assets/logo.png"
                        alt="Pawscord"
                        onError={handleImgError}
                    />
                </div>
            </div>
            <div style={styles.separator} />

            {/* Server Icons */}
            <div role="list" aria-label="Serverlar">
                {servers &&
                    servers.map((server, index) => {
                        const serverName = server.name || '';
                        const initials = (
                            serverName
                                .split(/\s+/)
                                .filter(Boolean)
                                .slice(0, 2)
                                .map((w) => w[0])
                                .join('') ||
                            serverName.substring(0, 2) ||
                            '??'
                        ).toUpperCase();
                        const _hash = serverName.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
                        const _GRAD = [
                            ['#5865f2', '#5865f2'],
                            ['#3ba55d', '#23a559'],
                            ['#f23f42', '#ff6b6b'],
                            ['#faa81a', '#ffca28'],
                            ['#9c59b6', '#c56bcf'],
                            ['#00b0f4', '#00d4ff'],
                        ];
                        const _g = _GRAD[_hash % _GRAD.length];
                        const isActive = selectedServerId === server.id;
                        const isDragging = draggedServerId === server.id;
                        const isDropTarget = dropTargetIndex === index && !isDragging;

                        const serverUnread = Object.keys(safeUnreadCounts)
                            .filter(
                                (k) =>
                                    k.startsWith('room-') &&
                                    server.categories?.some(
                                        (cat) =>
                                            cat &&
                                            cat.rooms?.some((r) => r && `room-${r.slug}` === k)
                                    )
                            )
                            .reduce((sum, k) => sum + (safeUnreadCounts[k] || 0), 0);

                        return (
                            <div key={server.id} role="listitem">
                                {/* Active Pill */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        width: '4px',
                                        height: isActive
                                            ? '40px'
                                            : hoveredServerId === server.id
                                              ? '20px'
                                              : serverUnread > 0
                                                ? '8px'
                                                : '0px',
                                        backgroundColor: '#fff',
                                        borderRadius: '0 4px 4px 0',
                                        transition:
                                            'height 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                    }}
                                />

                                {/* Drop indicator (before) */}
                                {isDropTarget && dropPosition === 'before' && <div />}

                                <div
                                    draggable={true}
                                    onDragStart={(e) =>
                                        handleServerDragStartWrapper(e, server.id, index)
                                    }
                                    onDragOver={(e) => handleServerDragOverWrapper(e, index)}
                                    onDragEnd={handleServerDragEndWrapper}
                                    onDrop={(e) => handleServerDropWrapper(e, index)}
                                    style={{
                                        ...styles.serverIcon,
                                        backgroundColor: isActive
                                            ? '#5865f2'
                                            : hoveredServerId === server.id
                                              ? '#5865f2'
                                              : '#1a1c1f',
                                        borderRadius:
                                            isActive || hoveredServerId === server.id
                                                ? '16px'
                                                : '50%',
                                        cursor: isDragging ? 'grabbing' : 'grab',
                                        position: 'relative',
                                        transition:
                                            'border-radius 0.3s ease, background-color 0.3s ease, opacity 0.2s ease, transform 0.1s ease',
                                        opacity: isDragging ? 0.4 : 1,
                                        marginBottom: 0,
                                    }}
                                    onClick={() => handleServerClick(server)}
                                    onContextMenu={(e) => handleServerContextMenu(e, server)}
                                    onMouseEnter={() => setHoveredServerId(server.id)}
                                    onMouseLeave={() => setHoveredServerId(null)}
                                    onMouseDown={(e) => {
                                        e.currentTarget.style.cursor = 'grabbing';
                                        e.currentTarget.style.transform = 'scale(0.95)';
                                    }}
                                    onMouseUp={(e) => {
                                        e.currentTarget.style.cursor = 'grab';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                    title={server.name}
                                    data-tooltip={server.name}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={server.name}
                                    aria-pressed={isActive}
                                    onKeyDown={(e) =>
                                        (e.key === 'Enter' || e.key === ' ') &&
                                        handleServerClick(server)
                                    }
                                >
                                    {server.icon ? (
                                        <LazyImage src={server.icon} alt={server.name} />
                                    ) : (
                                        <span
                                            className={`server-icon-initials${isActive ? ' active' : ''}`}
                                            style={{
                                                background: `linear-gradient(135deg, ${_g[0]} 0%, ${_g[1]} 100%)`,
                                                fontSize: initials.length > 1 ? '14px' : '18px',
                                            }}
                                            aria-hidden="true"
                                        >
                                            {initials}
                                        </span>
                                    )}
                                    {serverUnread > 0 && (
                                        <div style={styles.serverBadge}>
                                            {serverUnread > 99 ? '99+' : serverUnread}
                                        </div>
                                    )}
                                </div>

                                {/* Drop indicator (after) */}
                                {isDropTarget && dropPosition === 'after' && <div />}
                            </div>
                        );
                    })}
            </div>

            {/* Discover */}
            <div
                style={{
                    ...styles.serverIcon,
                    backgroundColor: hoveredServerId === 'discover' ? '#23a559' : '#1a1c1f',
                    color: hoveredServerId === 'discover' ? 'white' : '#23a559',
                    marginTop: '10px',
                    borderRadius: hoveredServerId === 'discover' ? '16px' : '50%',
                    transition:
                        'border-radius 0.3s ease, background-color 0.3s ease, color 0.3s ease',
                }}
                onClick={onDiscoverClick}
                onMouseEnter={handleDiscoverHover}
                onMouseLeave={handleDiscoverLeave}
                title="Sunucuları Keşfet"
                role="button"
                tabIndex={0}
                aria-label="Sunucuları Keşfet"
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onDiscoverClick()}
            >
                <FaCompass size={24} />
            </div>

            {/* Store */}
            <div
                style={{
                    ...styles.serverIcon,
                    background:
                        hoveredServerId === 'store'
                            ? 'linear-gradient(135deg, #F1C40F 0%, #F39C12 100%)'
                            : '#1a1c1f',
                    color: hoveredServerId === 'store' ? '#000' : '#F1C40F',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    borderRadius: hoveredServerId === 'store' ? '16px' : '50%',
                    transition: 'border-radius 0.3s ease, background 0.3s ease, color 0.3s ease',
                }}
                onClick={onOpenStore}
                onMouseEnter={handleStoreHover}
                onMouseLeave={handleStoreLeave}
                title="Premium Mağaza"
                role="button"
                tabIndex={0}
                aria-label="Premium Mağaza"
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenStore()}
            >
                🛒
            </div>

            {/* Add */}
            <div
                style={{
                    ...styles.serverIcon,
                    backgroundColor: hoveredServerId === 'add' ? '#23a559' : '#1a1c1f',
                    color: hoveredServerId === 'add' ? 'white' : '#23a559',
                    borderRadius: hoveredServerId === 'add' ? '16px' : '50%',
                    transition:
                        'border-radius 0.3s ease, background-color 0.3s ease, color 0.3s ease',
                }}
                onClick={onAddClick}
                onMouseEnter={handleAddHover}
                onMouseLeave={handleAddLeave}
                title="Ekle"
                role="button"
                tabIndex={0}
                aria-label="Server add"
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onAddClick()}
            >
                <FaPlus size={20} />
            </div>
        </div>
    );
};

const MemoizedServerRail = React.memo(ServerRail);

MemoizedServerRail.displayName = 'ServerRail';

MemoizedServerRail.propTypes = {
    servers: PropTypes.array,
    selectedServerId: PropTypes.bool,
    hoveredServerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setHoveredServerId: PropTypes.func,
    safeUnreadCounts: PropTypes.array,
    draggedServerId: PropTypes.func,
    dropTargetIndex: PropTypes.func,
    dropPosition: PropTypes.func,
    onHomeClick: PropTypes.func,
    handleServerClick: PropTypes.func,
    handleServerContextMenu: PropTypes.func,
    handleServerDragStartWrapper: PropTypes.func,
    handleServerDragOverWrapper: PropTypes.func,
    handleServerDragEndWrapper: PropTypes.func,
    handleServerDropWrapper: PropTypes.func,
    onOpenStore: PropTypes.func,
    onDiscoverClick: PropTypes.func,
    onAddClick: PropTypes.func,
};
export default MemoizedServerRail;
