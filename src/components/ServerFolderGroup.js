// frontend/src/components/ServerFolderGroup.js
// 🔥 FEATURE 12: Server folder grouping
// Drag servers into folders — collapsible folder icons in server sidebar

import React, { useState, memo, useCallback } from 'react';
import { FaFolder, FaFolderOpen, FaChevronDown, FaChevronRight, FaTimes, FaEdit, FaPalette } from 'react-icons/fa';

const FOLDER_COLORS = ['#5865f2', '#3ba55c', '#faa61a', '#ed4245', '#e91e63', '#9b59b6', '#1abc9c', '#e67e22'];

const ServerFolderGroup = ({ folder, servers = [], onServerClick, onRemoveFromFolder, onRenameFolder, onDeleteFolder, onColorChange }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(folder.name || 'Klasör');
    const [showColors, setShowColors] = useState(false);

    const color = folder.color || '#5865f2';
    const folderServers = servers.filter(s => folder.serverIds?.includes(s.id));
    const previewIcons = folderServers.slice(0, 4);

    const handleRename = useCallback(() => {
        setIsEditing(false);
        if (name.trim()) onRenameFolder?.(folder.id, name.trim());
    }, [folder.id, name, onRenameFolder]);

    return (
        <div style={S.container}>
            {/* Folder Header */}
            <div
                style={{ ...S.header, borderLeft: `3px solid ${color}` }}
                onClick={() => setIsOpen(!isOpen)}
                onContextMenu={(e) => { e.preventDefault(); setShowColors(!showColors); }}
            >
                <div style={S.folderIcon}>
                    {isOpen ? (
                        <FaFolderOpen style={{ color, fontSize: 18 }} />
                    ) : (
                        <div style={S.miniGrid}>
                            {previewIcons.map((s, i) => (
                                <img
                                    key={s.id}
                                    src={s.icon || `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=5865f2&color=fff&size=16`}
                                    alt=""
                                    style={S.miniIcon}
                                />
                            ))}
                            {previewIcons.length === 0 && <FaFolder style={{ color, fontSize: 14 }} />}
                        </div>
                    )}
                </div>
                <div style={S.headerInfo}>
                    {isEditing ? (
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            onBlur={handleRename}
                            onKeyDown={e => { if (e.key === 'Enter') handleRename(); }}
                            style={S.nameInput}
                            autoFocus
                            onClick={e => e.stopPropagation()}
                        />
                    ) : (
                        <span style={S.folderName}>{folder.name}</span>
                    )}
                    <span style={S.count}>{folderServers.length} sunucu</span>
                </div>
                <div style={S.actions}>
                    <button type="button" style={S.actionBtn} onClick={(e) => { e.stopPropagation(); setIsEditing(true); }} title="Yeniden adlandır">
                        <FaEdit />
                    </button>
                    <button type="button" style={S.actionBtn} onClick={(e) => { e.stopPropagation(); onDeleteFolder?.(folder.id); }} title="Klasörü sil">
                        <FaTimes />
                    </button>
                    {isOpen ? <FaChevronDown style={S.chevron} /> : <FaChevronRight style={S.chevron} />}
                </div>
            </div>

            {/* Color Picker */}
            {showColors && (
                <div style={S.colorPicker}>
                    {FOLDER_COLORS.map(c => (
                        <button
                            key={c}
                            type="button"
                            style={{ ...S.colorDot, backgroundColor: c, border: c === color ? '2px solid #fff' : '2px solid transparent' }}
                            onClick={() => { onColorChange?.(folder.id, c); setShowColors(false); }}
                        />
                    ))}
                </div>
            )}

            {/* Server List */}
            {isOpen && (
                <div style={S.serverList}>
                    {folderServers.map(server => (
                        <div key={server.id} style={S.serverItem} onClick={() => onServerClick?.(server)}>
                            <img
                                src={server.icon || `https://ui-avatars.com/api/?name=${encodeURIComponent(server.name)}&background=5865f2&color=fff&size=32`}
                                alt=""
                                style={S.serverIcon}
                            />
                            <span style={S.serverName}>{server.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const S = {
    container: { marginBottom: 4 },
    header: {
        display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px',
        cursor: 'pointer', borderRadius: 4, transition: 'background 0.1s',
        backgroundColor: 'rgba(255,255,255,0.02)',
    },
    folderIcon: { width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
    miniGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, width: 28, height: 28 },
    miniIcon: { width: 13, height: 13, borderRadius: 3, objectFit: 'cover' },
    headerInfo: { flex: 1, minWidth: 0 },
    folderName: { color: '#dcddde', fontSize: 13, fontWeight: 600, display: 'block' },
    count: { color: '#72767d', fontSize: 11 },
    nameInput: { background: '#1e1f22', border: '1px solid #5865f2', borderRadius: 3, color: '#fff', fontSize: 13, padding: '2px 6px', width: '100%', outline: 'none' },
    actions: { display: 'flex', alignItems: 'center', gap: 4 },
    actionBtn: { background: 'none', border: 'none', color: '#949ba4', cursor: 'pointer', padding: 3, borderRadius: 3, fontSize: 11 },
    chevron: { color: '#949ba4', fontSize: 10, flexShrink: 0 },
    colorPicker: { display: 'flex', gap: 6, padding: '6px 12px', backgroundColor: '#1e1f22', borderRadius: 4, margin: '4px 0' },
    colorDot: { width: 20, height: 20, borderRadius: '50%', cursor: 'pointer' },
    serverList: { paddingLeft: 12, marginTop: 2 },
    serverItem: { display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px', borderRadius: 4, cursor: 'pointer', transition: 'background 0.1s' },
    serverIcon: { width: 28, height: 28, borderRadius: 8, objectFit: 'cover' },
    serverName: { color: '#dcddde', fontSize: 13, fontWeight: 500 },
};

export default memo(ServerFolderGroup);
