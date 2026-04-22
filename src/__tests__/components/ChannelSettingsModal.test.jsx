// frontend/src/__tests__/components/ChannelSettingsModal.test.jsx
// Tests for ChannelSettingsModal sub-components (GeneralTab, PermissionsTab)

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

// ── Mock react-icons ──
vi.mock('react-icons/fa', () => ({
    FaLock: () => <span data-testid="icon-lock">🔒</span>,
    FaGlobe: () => <span data-testid="icon-globe">🌍</span>,
    FaExclamationTriangle: () => <span data-testid="icon-warn">⚠</span>,
    FaUserFriends: () => <span data-testid="icon-users">👥</span>,
    FaBroadcastTower: () => <span data-testid="icon-broadcast">📢</span>,
    FaClock: () => <span data-testid="icon-clock">🕐</span>,
    FaTrash: () => <span data-testid="icon-trash">🗑</span>,
    FaSave: () => <span data-testid="icon-save">💾</span>,
    FaUserShield: () => <span data-testid="icon-shield">🛡</span>,
    FaPlus: () => <span data-testid="icon-plus">➕</span>,
}));

// Mock styles
vi.mock('../../components/ChannelSettingsModal/styles', () => ({
    default: new Proxy({}, { get: () => ({}) }),
}));

import GeneralTab from '../../components/ChannelSettingsModal/GeneralTab';
import PermissionsTab from '../../components/ChannelSettingsModal/PermissionsTab';

// Translation map for keys used in these components
const TR = {
    save: 'Kaydet',
    delete_channel: 'Kanalı Sil',
    'ui.ozel_channel_izinli_roller': 'Özel Kanal',
    '🔒_channel_kilitli': 'Kanal Kilitli',
    '📢_duyuru_channelı_sadece_admin_yazar': 'Announcement Channel',
    remove: 'Kaldır',
    'permTab.addPerm': 'İzin Ekle',
    add_permission: 'İzin Ekle',
    no_custom_permissions_defined_yet: 'Not yet özel izin tanımlanmamış',
    you_can_define_custom_permissions_for_specific_roles_or_user: '',
};

// Mock react-i18next with a targeted translation map
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key, fallback) => TR[key] || (typeof fallback === 'string' ? fallback : key),
        i18n: { language: 'tr', changeLanguage: vi.fn() },
    }),
    Trans: ({ children }) => children,
    I18nextProvider: ({ children }) => children,
    withTranslation: () => (Component) => Component,
    initReactI18next: { type: '3rdParty', init: vi.fn() },
}));

// ══════════════════════════════════════════════════════
// GeneralTab
// ══════════════════════════════════════════════════════
describe('GeneralTab', () => {
    const defaultProps = {
        name: 'general',
        setName: vi.fn(),
        isPrivate: false,
        handlePrivateChange: vi.fn(),
        isNsfw: false,
        handleNsfwChange: vi.fn(),
        isLocked: false,
        handleLockedChange: vi.fn(),
        isReadOnly: false,
        handleReadOnlyChange: vi.fn(),
        isVoiceChannel: false,
        userLimit: 0,
        handleUserLimitChange: vi.fn(),
        bitrate: 64,
        setBitrate: vi.fn(),
        selectedRoles: [],
        toggleRole: vi.fn(),
        serverRoles: [{ id: 1, name: 'Admin', color: '#ff0000' }],
        handleDelete: vi.fn(),
        handleSave: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders channel name input', () => {
        render(<GeneralTab {...defaultProps} />);
        const input = screen.getByDisplayValue('general');
        expect(input).toBeDefined();
    });

    it('calls setName when input changes', () => {
        render(<GeneralTab {...defaultProps} />);
        const input = screen.getByDisplayValue('general');
        fireEvent.change(input, { target: { value: 'renamed' } });
        expect(defaultProps.setName).toHaveBeenCalled();
    });

    it('renders private toggle', () => {
        render(<GeneralTab {...defaultProps} />);
        expect(screen.getByText(/Public/i)).toBeDefined();
    });

    it('shows private label when isPrivate is true', () => {
        render(<GeneralTab {...defaultProps} isPrivate={true} />);
        expect(screen.getByText(/Özel Kanal/i)).toBeDefined();
    });

    it('shows role list when channel is private', () => {
        render(<GeneralTab {...defaultProps} isPrivate={true} />);
        expect(screen.getByText('Admin')).toBeDefined();
    });

    it('calls toggleRolee when role clicked', () => {
        render(<GeneralTab {...defaultProps} isPrivate={true} />);
        fireEvent.click(screen.getByText('Admin'));
        expect(defaultProps.toggleRole).toHaveBeenCalledWith(1);
    });

    it('renders NSFW toggle', () => {
        render(<GeneralTab {...defaultProps} />);
        expect(screen.getByText(/NSFW/i)).toBeDefined();
    });

    it('renders locked toggle', () => {
        render(<GeneralTab {...defaultProps} />);
        expect(screen.getByText(/Kanal Kilitli/i)).toBeDefined();
    });

    it('renders read-only toggle', () => {
        render(<GeneralTab {...defaultProps} />);
        expect(screen.getByText(/Announcement Channel/i)).toBeDefined();
    });

    it('does NOT render voice settings when not voice channel', () => {
        render(<GeneralTab {...defaultProps} isVoiceChannel={false} />);
        expect(screen.queryByText(/User Limiti/i)).toBeNull();
    });

    it('renders voice settings when isVoiceChannel', () => {
        render(<GeneralTab {...defaultProps} isVoiceChannel={true} />);
        expect(screen.getByText(/User Limiti/i)).toBeDefined();
        expect(screen.getByText(/Ses Kalitesi/i)).toBeDefined();
    });

    it('calls handleSave on save button click', () => {
        render(<GeneralTab {...defaultProps} />);
        const saveBtn = screen.getByText(/Kaydet/i);
        fireEvent.click(saveBtn);
        expect(defaultProps.handleSave).toHaveBeenCalled();
    });

    it('calls handleDelete on delete button click', () => {
        render(<GeneralTab {...defaultProps} />);
        const deleteBtn = screen.getByText(/Kanalı Sil/i);
        fireEvent.click(deleteBtn);
        expect(defaultProps.handleDelete).toHaveBeenCalled();
    });
});

// ══════════════════════════════════════════════════════
// PermissionsTab
// ══════════════════════════════════════════════════════
describe('PermissionsTab', () => {
    const defaultPerms = {
        permissions: {
            role_permissions: [
                {
                    id: 1,
                    role_name: 'Moderator',
                    role_color: '#00ff00',
                    can_view: true,
                    can_send_messages: true,
                    can_connect: false,
                    can_speak: false,
                },
            ],
            user_permissions: [
                {
                    id: 2,
                    username: 'testUser',
                    avatar: null,
                    can_view: true,
                    can_send_messages: false,
                    can_connect: true,
                },
            ],
            available_roles: [{ id: 3, name: 'Member' }],
        },
        showAddPermission: false,
        setShowAddPermission: vi.fn(),
        permissionType: 'role',
        setPermissionType: vi.fn(),
        selectedRoleForPerm: null,
        setSelectedRoleForPerm: vi.fn(),
        selectedUserForPerm: null,
        setSelectedUserForPerm: vi.fn(),
        searchUser: '',
        setSearchUser: vi.fn(),
        searchResults: [],
        setSearchResults: vi.fn(),
        searchUsers: vi.fn(),
        removePermission: vi.fn(),
        addPermission: vi.fn(),
    };

    it('renders role permissions', () => {
        render(<PermissionsTab {...defaultPerms} />);
        expect(screen.getByText('Moderator')).toBeDefined();
    });

    it('renders user permissions', () => {
        render(<PermissionsTab {...defaultPerms} />);
        expect(screen.getByText('testUser')).toBeDefined();
    });

    it('calls removePermission when remove button clicked', () => {
        render(<PermissionsTab {...defaultPerms} />);
        const removeBtns = screen.getAllByText(/Kaldır/i);
        fireEvent.click(removeBtns[0]);
        expect(defaultPerms.removePermission).toHaveBeenCalledWith(1);
    });

    it('shows "add permission" button', () => {
        render(<PermissionsTab {...defaultPerms} />);
        expect(screen.getByText(/İzin Ekle/i)).toBeDefined();
    });

    it('calls setShowAddPermission on "add" click', () => {
        render(<PermissionsTab {...defaultPerms} />);
        fireEvent.click(screen.getByText(/İzin Ekle/i));
        expect(defaultPerms.setShowAddPermission).toHaveBeenCalledWith(true);
    });

    it('shows empty state when no permissions', () => {
        const emptyPerms = {
            ...defaultPerms,
            permissions: { role_permissions: [], user_permissions: [], available_roles: [] },
        };
        render(<PermissionsTab {...emptyPerms} />);
        expect(screen.getByText(/Not yet özel izin tanımlanmamış/i)).toBeDefined();
    });
});
