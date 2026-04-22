import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../utils/logger', () => ({
    default: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

import VoiceControlBar from '../../RoomList/VoiceControlBar';

describe('VoiceControlBar', () => {
    const defaultProps = {
        isInVoice: true,
        isConnecting: false,
        isMuted: false,
        isDeafened: false,
        isVideoEnabled: false,
        isScreenSharing: false,
        toggleMute: vi.fn(),
        toggleDeafened: vi.fn(),
        toggleVideo: vi.fn(),
        toggleScreenShare: vi.fn(),
        leaveVoiceChat: vi.fn(),
        voiceRoomDisplayName: 'General',
        getAvatarUrl: vi.fn(() => '/avatar.png'),
        currentUserProfile: { avatar: '/avatar.png' },
        currentUsername: 'TestUser',
        getDeterministicAvatar: vi.fn(() => '/fallback.png'),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('returns null when not in voice and not connecting', () => {
        const { container } = render(
            <VoiceControlBar {...defaultProps} isInVoice={false} isConnecting={false} />
        );
        expect(container.innerHTML).toBe('');
    });

    it('renders voice bar when isInVoice is true', () => {
        render(<VoiceControlBar {...defaultProps} />);
        expect(screen.getByText('General')).toBeInTheDocument();
    });

    it('shows connecting state', () => {
        render(<VoiceControlBar {...defaultProps} isInVoice={false} isConnecting={true} />);
        expect(screen.getByText(/connecting/i)).toBeInTheDocument();
    });

    it('calls toggleMute when mute button is clicked', () => {
        render(<VoiceControlBar {...defaultProps} />);
        const buttons = screen.getAllByRole('button');
        // Mute is the 3rd button (after Video, Screen Share)
        const muteBtn = buttons[2];
        fireEvent.click(muteBtn);
        expect(defaultProps.toggleMute).toHaveBeenCalledTimes(1);
    });

    it('calls leaveVoiceChat when disconnect button is clicked', () => {
        render(<VoiceControlBar {...defaultProps} />);
        const buttons = screen.getAllByRole('button');
        // Disconnect is the last button
        const disconnectBtn = buttons[buttons.length - 1];
        fireEvent.click(disconnectBtn);
        expect(defaultProps.leaveVoiceChat).toHaveBeenCalledTimes(1);
    });

    it('renders 6 control buttons', () => {
        render(<VoiceControlBar {...defaultProps} />);
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBe(6);
    });

    it('displays username', () => {
        render(<VoiceControlBar {...defaultProps} />);
        expect(screen.getByAltText('TestUser')).toBeInTheDocument();
    });
});
