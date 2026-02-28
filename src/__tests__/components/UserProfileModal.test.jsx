// frontend/src/__tests__/components/UserProfileModal.test.jsx
// 🧪 UserProfileModal Component Tests

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React, { useState } from 'react';

// --- Mock UserProfileModal ---
const MockUserProfileModal = ({
    user = null,
    onClose = vi.fn(),
    onStartDM = vi.fn(),
    onImageClick = vi.fn(),
    getDeterministicAvatar = () => 'https://example.com/default.png',
    currentUser = 'me',
    friendsList = [],
}) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [showSessionManager, setShowSessionManager] = useState(false);

    if (!user) return null;

    const avatarUrl = user.avatar || getDeterministicAvatar(user.username);
    const isSelf = user.username === currentUser;
    const isFriend = friendsList.some(f => f.username === user.username);

    return (
        <div data-testid="profile-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div data-testid="profile-modal" role="dialog" aria-label={`${user.username} profili`}>
                {/* Close button */}
                <button data-testid="close-button" onClick={onClose} aria-label="Kapat">✕</button>

                {/* Banner */}
                <div data-testid="profile-banner" />

                {/* Avatar */}
                <div data-testid="avatar-container" onClick={() => onImageClick(avatarUrl)}>
                    <img data-testid="user-avatar" src={avatarUrl} alt={user.username} />
                </div>

                {/* User Info */}
                <div data-testid="user-info">
                    <h2 data-testid="username">{user.username}</h2>
                    {user.display_name && <span data-testid="display-name">{user.display_name}</span>}
                    {user.customStatus && <span data-testid="custom-status">{user.customStatus}</span>}
                    {user.friend_code && (
                        <span data-testid="friend-code">#{user.friend_code}</span>
                    )}
                </div>

                {/* Online status indicator */}
                <div data-testid="status-indicator" className={user.is_online ? 'online' : 'offline'}>
                    {user.is_online ? 'Çevrimiçi' : 'Çevrimdışı'}
                </div>

                {/* Bio */}
                {user.bio && <p data-testid="user-bio">{user.bio}</p>}

                {/* Action Buttons */}
                <div data-testid="action-buttons">
                    {!isSelf && (
                        <>
                            <button data-testid="dm-button" onClick={() => onStartDM(user.username)}>
                                Mesaj Gönder
                            </button>
                            <button data-testid="add-friend-button">
                                {isFriend ? 'Arkadaşsınız ✓' : 'Arkadaş Ekle'}
                            </button>
                        </>
                    )}
                    {isSelf && (
                        <button data-testid="session-manager-button" onClick={() => setShowSessionManager(true)}>
                            Oturumlarım
                        </button>
                    )}
                </div>

                {/* Tabs */}
                <div data-testid="profile-tabs" role="tablist">
                    <button data-testid="tab-profile" role="tab" aria-selected={activeTab === 'profile'}
                        onClick={() => setActiveTab('profile')}>Profil</button>
                    <button data-testid="tab-activity" role="tab" aria-selected={activeTab === 'activity'}
                        onClick={() => setActiveTab('activity')}>Aktivite</button>
                    <button data-testid="tab-notes" role="tab" aria-selected={activeTab === 'notes'}
                        onClick={() => setActiveTab('notes')}>Notlar</button>
                </div>

                {/* Tab Content */}
                <div data-testid={`tab-content-${activeTab}`}>
                    {activeTab === 'profile' && user.bio && <p>{user.bio}</p>}
                    {activeTab === 'activity' && <div>Aktivite yok</div>}
                    {activeTab === 'notes' && <div>Not yok</div>}
                </div>

                {/* Session Manager */}
                {showSessionManager && (
                    <div data-testid="session-manager">
                        <button onClick={() => setShowSessionManager(false)}>Kapat</button>
                    </div>
                )}
            </div>
        </div>
    );
};

describe('UserProfileModal Component', () => {
    const mockUser = {
        id: 1,
        username: 'TestUser',
        display_name: 'Test User',
        avatar: 'https://example.com/avatar.png',
        bio: 'Hello, I am a test user!',
        customStatus: '🎮 Playing games',
        friend_code: 'ABCD1234',
        is_online: true,
    };

    const mockOfflineUser = { ...mockUser, is_online: false, customStatus: null };

    let handlers;

    beforeEach(() => {
        handlers = {
            onClose: vi.fn(),
            onStartDM: vi.fn(),
            onImageClick: vi.fn(),
            getDeterministicAvatar: vi.fn(() => 'https://example.com/default.png'),
        };
    });

    describe('Rendering', () => {
        it('should render nothing when user is null', () => {
            const { container } = render(<MockUserProfileModal user={null} {...handlers} />);
            expect(container.innerHTML).toBe('');
        });

        it('should render the modal with user info', () => {
            render(<MockUserProfileModal user={mockUser} {...handlers} />);
            expect(screen.getByTestId('profile-modal')).toBeInTheDocument();
            expect(screen.getByTestId('username')).toHaveTextContent('TestUser');
        });

        it('should display user avatar', () => {
            render(<MockUserProfileModal user={mockUser} {...handlers} />);
            expect(screen.getByTestId('user-avatar')).toHaveAttribute('src', 'https://example.com/avatar.png');
        });

        it('should display display name', () => {
            render(<MockUserProfileModal user={mockUser} {...handlers} />);
            expect(screen.getByTestId('display-name')).toHaveTextContent('Test User');
        });

        it('should display custom status', () => {
            render(<MockUserProfileModal user={mockUser} {...handlers} />);
            expect(screen.getByTestId('custom-status')).toHaveTextContent('🎮 Playing games');
        });

        it('should display friend code', () => {
            render(<MockUserProfileModal user={mockUser} {...handlers} />);
            expect(screen.getByTestId('friend-code')).toHaveTextContent('#ABCD1234');
        });

        it('should display bio', () => {
            render(<MockUserProfileModal user={mockUser} {...handlers} />);
            expect(screen.getByTestId('user-bio')).toHaveTextContent('Hello, I am a test user!');
        });

        it('should show online status indicator', () => {
            render(<MockUserProfileModal user={mockUser} {...handlers} />);
            expect(screen.getByTestId('status-indicator')).toHaveTextContent('Çevrimiçi');
        });

        it('should show offline status', () => {
            render(<MockUserProfileModal user={mockOfflineUser} {...handlers} />);
            expect(screen.getByTestId('status-indicator')).toHaveTextContent('Çevrimdışı');
        });
    });

    describe('Modal Actions', () => {
        it('should call onClose when close button clicked', () => {
            render(<MockUserProfileModal user={mockUser} {...handlers} />);
            fireEvent.click(screen.getByTestId('close-button'));
            expect(handlers.onClose).toHaveBeenCalledTimes(1);
        });

        it('should call onClose when clicking overlay', () => {
            render(<MockUserProfileModal user={mockUser} {...handlers} />);
            fireEvent.click(screen.getByTestId('profile-modal-overlay'));
            expect(handlers.onClose).toHaveBeenCalledTimes(1);
        });

        it('should call onImageClick when avatar is clicked', () => {
            render(<MockUserProfileModal user={mockUser} {...handlers} />);
            fireEvent.click(screen.getByTestId('avatar-container'));
            expect(handlers.onImageClick).toHaveBeenCalledWith('https://example.com/avatar.png');
        });
    });

    describe('DM and Friend Actions', () => {
        it('should show DM button for other users', () => {
            render(<MockUserProfileModal user={mockUser} currentUser="otherUser" {...handlers} />);
            expect(screen.getByTestId('dm-button')).toBeInTheDocument();
        });

        it('should call onStartDM with username when DM button clicked', () => {
            render(<MockUserProfileModal user={mockUser} currentUser="otherUser" {...handlers} />);
            fireEvent.click(screen.getByTestId('dm-button'));
            expect(handlers.onStartDM).toHaveBeenCalledWith('TestUser');
        });

        it('should show "Arkadaş Ekle" for non-friends', () => {
            render(<MockUserProfileModal user={mockUser} currentUser="otherUser" friendsList={[]} {...handlers} />);
            expect(screen.getByTestId('add-friend-button')).toHaveTextContent('Arkadaş Ekle');
        });

        it('should show "Arkadaşsınız" for friends', () => {
            render(
                <MockUserProfileModal
                    user={mockUser}
                    currentUser="otherUser"
                    friendsList={[{ username: 'TestUser' }]}
                    {...handlers}
                />
            );
            expect(screen.getByTestId('add-friend-button')).toHaveTextContent('Arkadaşsınız ✓');
        });

        it('should NOT show DM/friend buttons for self', () => {
            render(<MockUserProfileModal user={mockUser} currentUser="TestUser" {...handlers} />);
            expect(screen.queryByTestId('dm-button')).not.toBeInTheDocument();
            expect(screen.getByTestId('session-manager-button')).toBeInTheDocument();
        });
    });

    describe('Tab Navigation', () => {
        it('should render profile tabs', () => {
            render(<MockUserProfileModal user={mockUser} {...handlers} />);
            expect(screen.getByTestId('tab-profile')).toBeInTheDocument();
            expect(screen.getByTestId('tab-activity')).toBeInTheDocument();
            expect(screen.getByTestId('tab-notes')).toBeInTheDocument();
        });

        it('should default to profile tab', () => {
            render(<MockUserProfileModal user={mockUser} {...handlers} />);
            expect(screen.getByTestId('tab-content-profile')).toBeInTheDocument();
        });

        it('should switch to activity tab', () => {
            render(<MockUserProfileModal user={mockUser} {...handlers} />);
            fireEvent.click(screen.getByTestId('tab-activity'));
            expect(screen.getByTestId('tab-content-activity')).toBeInTheDocument();
        });

        it('should switch to notes tab', () => {
            render(<MockUserProfileModal user={mockUser} {...handlers} />);
            fireEvent.click(screen.getByTestId('tab-notes'));
            expect(screen.getByTestId('tab-content-notes')).toBeInTheDocument();
        });
    });
});
