import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies before importing component
vi.mock('../../utils/logger', () => ({
    default: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));
vi.mock('../../utils/avatarUtils', () => ({
    getAvatarUrl: vi.fn((avatar, username) => avatar || `/avatars/${username}.png`),
    getDeterministicAvatar: vi.fn((username) => `/default/${username}.svg`),
}));
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key, fallback) => {
            const TR = { 'ui.updateAvailable': 'Update Available!' };
            return TR[key] || (typeof fallback === 'string' ? fallback : key);
        },
        i18n: { language: 'en', changeLanguage: vi.fn() },
    }),
    Trans: ({ children }) => children,
    I18nextProvider: ({ children }) => children,
    withTranslation: () => (Component) => Component,
    initReactI18next: { type: '3rdParty', init: vi.fn() },
}));

import UserFooter from '../../components/profile/UserFooter';

describe('UserFooter', () => {
    const defaultProps = {
        currentUsername: 'TestUser',
        currentStatus: 'online',
        avatarUrl: '/avatars/test.png',
        onProfileClick: vi.fn(),
        onSettingsClick: vi.fn(),
        onOpenSettings: vi.fn(),
        updateAvailable: false,
        onUpdateClick: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders username and avatar', () => {
        render(<UserFooter {...defaultProps} />);
        expect(screen.getByAltText('TestUser')).toBeInTheDocument();
    });

    it('calls onProfileClick when user panel is clicked', () => {
        render(<UserFooter {...defaultProps} />);
        const panel = screen.getByTestId('profile-panel-trigger');
        fireEvent.click(panel);
        expect(defaultProps.onProfileClick).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard navigation on user panel', () => {
        render(<UserFooter {...defaultProps} />);
        const buttons = screen.getAllByRole('button');
        const userPanel = buttons[0];
        fireEvent.keyDown(userPanel, { key: 'Enter' });
        expect(defaultProps.onProfileClick).toHaveBeenCalled();
    });

    it('shows update banner when updateAvailable is true', () => {
        render(<UserFooter {...defaultProps} updateAvailable={true} />);
        expect(screen.getByText('Update Available!')).toBeInTheDocument();
    });

    it('does not show update banner when updateAvailable is false', () => {
        render(<UserFooter {...defaultProps} updateAvailable={false} />);
        expect(screen.queryByText('Update Available!')).not.toBeInTheDocument();
    });

    it('calls onUpdateClick when update banner is clicked', () => {
        render(<UserFooter {...defaultProps} updateAvailable={true} />);
        fireEvent.click(screen.getByText('Update Available!'));
        expect(defaultProps.onUpdateClick).toHaveBeenCalledTimes(1);
    });

    it('uses fallback avatar on image error', () => {
        render(<UserFooter {...defaultProps} />);
        const img = screen.getByAltText('TestUser');
        fireEvent.error(img);
        expect(img.src).toContain('/default/');
    });
});
