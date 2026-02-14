import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock all tab components
vi.mock('../../UserProfilePanel/tabs/ProfileTab', () => ({ default: () => <div data-testid="profile-tab" /> }));
vi.mock('../../UserProfilePanel/tabs/SecurityTab', () => ({ default: () => <div data-testid="security-tab" /> }));
vi.mock('../../UserProfilePanel/tabs/BadgesTab', () => ({ default: () => <div data-testid="badges-tab" /> }));
vi.mock('../../UserProfilePanel/tabs/PrivacyTab', () => ({ default: () => <div data-testid="privacy-tab" /> }));
vi.mock('../../UserProfilePanel/tabs/FriendsTab', () => ({ default: () => <div data-testid="friends-tab" /> }));
vi.mock('../../UserProfilePanel/tabs/AppearanceTab', () => ({ default: () => <div data-testid="appearance-tab" /> }));
vi.mock('../../UserProfilePanel/tabs/NotificationsTab', () => ({ default: () => <div data-testid="notifications-tab" /> }));
vi.mock('../../UserProfilePanel/tabs/SoundSettingsTab', () => ({ default: () => <div data-testid="sounds-tab" /> }));
vi.mock('../../UserProfilePanel/tabs/PremiumTab', () => ({ default: () => <div data-testid="premium-tab" /> }));
vi.mock('../../UserProfilePanel/tabs/ActivityTab', () => ({ default: () => <div data-testid="activity-tab" /> }));
vi.mock('../../UserProfilePanel/tabs/DraftsTab', () => ({ default: () => <div data-testid="drafts-tab" /> }));
vi.mock('../../UserProfilePanel/tabs/BookmarksTab', () => ({ default: () => <div data-testid="bookmarks-tab" /> }));
vi.mock('../../UserProfilePanel/tabs/CustomStatusTab', () => ({ default: () => <div data-testid="status-tab" /> }));
vi.mock('../../UserProfilePanel/tabs/GDPRTab', () => ({ default: () => <div data-testid="gdpr-tab" /> }));
vi.mock('../../UserProfilePanel/tabs/DeveloperTab', () => ({ default: () => <div data-testid="developer-tab" /> }));
vi.mock('../../UserProfilePanel/tabs/InventoryTab', () => ({ default: () => <div data-testid="inventory-tab" /> }));
vi.mock('../../UserProfilePanel/tabs/EndorsementsTab', () => ({ default: () => <div data-testid="endorsements-tab" /> }));
vi.mock('../../UserProfilePanel/tabs/NicknameHistoryTab', () => ({ default: () => <div data-testid="history-tab" /> }));

// Mock sub-components
vi.mock('../../UserProfilePanel/ProfileHeader', () => ({
  default: (props) => <div data-testid="profile-header" data-username={props.formData?.username} />
}));
vi.mock('../../UserProfilePanel/ProfileSidebar', () => ({
  default: (props) => (
    <div data-testid="profile-sidebar">
      <button data-testid="tab-security" onClick={() => { props.setActiveTab('security'); props.setActiveCategory('security'); }}>Security</button>
      <button data-testid="tab-friends" onClick={() => { props.setActiveTab('friends'); props.setActiveCategory('social'); }}>Friends</button>
      <button data-testid="tab-badges" onClick={() => { props.setActiveTab('badges'); props.setActiveCategory('account'); }}>Badges</button>
    </div>
  )
}));
vi.mock('../../UserProfilePanel/ProfileTabContent', () => ({
  default: (props) => <div data-testid="tab-content" data-active-tab={props.activeTab} />
}));

// Mock dependencies
vi.mock('../../components/AvatarCropper', () => ({ default: () => <div data-testid="avatar-cropper" /> }));
vi.mock('../../components/LogoutModal', () => ({ default: ({ isOpen }) => isOpen ? <div data-testid="logout-modal" /> : null }));
vi.mock('../../UserProfilePanel/styles', () => ({
  default: {
    overlay: {},
    panel: {},
    body: {},
    sidebar: {},
    content: {},
    closeBtn: {},
    sidebarSection: {},
    sidebarHeader: {},
    sidebarBtn: () => ({}),
  }
}));

// Mock the hook
const mockFetchDataForCategory = vi.fn();
vi.mock('../../UserProfilePanel/hooks/useProfileAPI', () => ({
  default: () => ({
    formData: { username: 'testuser', avatar_url: '' },
    premiumStatus: null,
    badges: [],
    userStats: { level: 1, xp: 0 },
    customStatus: { status: 'online' },
    friends: [],
    showCropper: false,
    tempImageFile: null,
    loading: {},
    fetchDataForCategory: mockFetchDataForCategory,
    setShowCropper: vi.fn(),
    setTempImageFile: vi.fn(),
    handleCropComplete: vi.fn(),
  })
}));

vi.mock('../../UserProfilePanel.css', () => ({}));

import UserProfilePanel from '../../UserProfilePanel';

describe('UserProfilePanel Orchestrator', () => {
  const mockUser = { id: 1, username: 'testuser', email: 'test@test.com' };
  const defaultProps = {
    user: mockUser,
    onClose: vi.fn(),
    onUpdate: vi.fn(),
    onLogout: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem('chat_username', 'testuser');
    localStorage.setItem('user_id', '1');
  });

  it('should render all sub-components', () => {
    render(<UserProfilePanel {...defaultProps} />);
    expect(screen.getByTestId('profile-header')).toBeTruthy();
    expect(screen.getByTestId('profile-sidebar')).toBeTruthy();
    expect(screen.getByTestId('tab-content')).toBeTruthy();
  });

  it('should return null if user is null', () => {
    const { container } = render(<UserProfilePanel {...defaultProps} user={null} />);
    expect(container.innerHTML).toBe('');
  });

  it('should show profile tab by default', () => {
    render(<UserProfilePanel {...defaultProps} />);
    const tabContent = screen.getByTestId('tab-content');
    expect(tabContent.getAttribute('data-active-tab')).toBe('profile');
  });

  it('should switch tabs when sidebar button is clicked', () => {
    render(<UserProfilePanel {...defaultProps} />);
    fireEvent.click(screen.getByTestId('tab-security'));
    expect(screen.getByTestId('tab-content').getAttribute('data-active-tab')).toBe('security');
  });

  it('should pass username to ProfileHeader', () => {
    render(<UserProfilePanel {...defaultProps} />);
    expect(screen.getByTestId('profile-header').getAttribute('data-username')).toBe('testuser');
  });

  it('should call fetchDataForCategory on category change', () => {
    render(<UserProfilePanel {...defaultProps} />);
    // Initial render calls with 'account'
    expect(mockFetchDataForCategory).toHaveBeenCalledWith('account');
    // Click security tab
    fireEvent.click(screen.getByTestId('tab-security'));
    expect(mockFetchDataForCategory).toHaveBeenCalledWith('security');
  });
});
