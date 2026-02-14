// AppModals Orchestrator Tests — Verifies decomposition into 5 sub-components
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

// Mock all 5 sub-components
vi.mock('../../components/AppModals/AppModalsCore', () => ({
    default: (props) => <div data-testid="app-modals-core" data-props={JSON.stringify(Object.keys(props))} />
}));
vi.mock('../../components/AppModals/AppModalsBatch1to8', () => ({
    default: (props) => <div data-testid="app-modals-batch1to8" data-props={JSON.stringify(Object.keys(props))} />
}));
vi.mock('../../components/AppModals/AppModalsBatch10', () => ({
    default: (props) => <div data-testid="app-modals-batch10" data-props={JSON.stringify(Object.keys(props))} />
}));
vi.mock('../../components/AppModals/AppModalsBatch11', () => ({
    default: (props) => <div data-testid="app-modals-batch11" data-props={JSON.stringify(Object.keys(props))} />
}));
vi.mock('../../components/AppModals/AppModalsStandard', () => ({
    default: (props) => <div data-testid="app-modals-standard" data-props={JSON.stringify(Object.keys(props))} />
}));

// Mock useUIStore
const mockModals = {};
const mockOpenModal = vi.fn();
const mockCloseModal = vi.fn();
const mockToggleModal = vi.fn();
vi.mock('../../stores/useUIStore', () => ({
    useUIStore: () => ({
        modals: mockModals,
        openModal: mockOpenModal,
        closeModal: mockCloseModal,
        toggleModal: mockToggleModal,
    }),
}));

import AppModals from '../../components/AppModals';

describe('AppModals Orchestrator', () => {
    const baseProps = {
        fetchWithAuth: vi.fn(),
        activeChat: { type: 'room', id: 'test-room', slug: 'test-room', server_id: 1 },
        username: 'testuser',
        sendMessage: vi.fn(),
        sendSignal: vi.fn(),
        ws: {},
        currentUserProfile: { username: 'testuser' },
        setCurrentUserProfile: vi.fn(),
        currentTheme: 'dark',
        setCurrentTheme: vi.fn(),
        soundSettings: {},
        setSoundSettings: vi.fn(),
        encryptionKeys: {},
        currentKeyId: null,
        setEncryptionKey: vi.fn(),
        chartSymbol: null,
        setChartSymbol: vi.fn(),
        serverToEdit: null,
        setServerToEdit: vi.fn(),
        serverMembers: [],
        friendsList: [],
        conversations: [],
        categories: [],
        allUsers: [],
        pinnedMessages: [],
        isSummaryLoading: false,
        summaryResult: null,
        zoomedImage: null,
        setZoomedImage: vi.fn(),
        galleryData: null,
        setGalleryData: vi.fn(),
        viewingProfile: null,
        setViewingProfile: vi.fn(),
        isAdmin: false,
        richTextRef: { current: null },
        logout: vi.fn(),
        getDeterministicAvatar: vi.fn(),
        handleSendSnippet: vi.fn(),
        handleDMClick: vi.fn(),
        setActiveChat: vi.fn(),
        setConversations: vi.fn(),
        isMuted: false,
        isDeafened: false,
        toggleMute: vi.fn(),
        toggleDeafened: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render all 5 sub-components', () => {
        const { getByTestId } = render(<AppModals {...baseProps} />);
        
        expect(getByTestId('app-modals-core')).toBeTruthy();
        expect(getByTestId('app-modals-batch1to8')).toBeTruthy();
        expect(getByTestId('app-modals-batch10')).toBeTruthy();
        expect(getByTestId('app-modals-batch11')).toBeTruthy();
        expect(getByTestId('app-modals-standard')).toBeTruthy();
    });

    it('should pass all props plus store values to each sub-component', () => {
        const { getByTestId } = render(<AppModals {...baseProps} />);
        
        const coreProps = JSON.parse(getByTestId('app-modals-core').getAttribute('data-props'));
        
        // Should include original props
        expect(coreProps).toContain('fetchWithAuth');
        expect(coreProps).toContain('username');
        expect(coreProps).toContain('activeChat');
        
        // Should include store values
        expect(coreProps).toContain('modals');
        expect(coreProps).toContain('openModal');
        expect(coreProps).toContain('closeModal');
        expect(coreProps).toContain('toggleModal');
    });

    it('should pass identical props to all sub-components', () => {
        const { getByTestId } = render(<AppModals {...baseProps} />);
        
        const coreProps = JSON.parse(getByTestId('app-modals-core').getAttribute('data-props'));
        const batch1Props = JSON.parse(getByTestId('app-modals-batch1to8').getAttribute('data-props'));
        const batch10Props = JSON.parse(getByTestId('app-modals-batch10').getAttribute('data-props'));
        const batch11Props = JSON.parse(getByTestId('app-modals-batch11').getAttribute('data-props'));
        const standardProps = JSON.parse(getByTestId('app-modals-standard').getAttribute('data-props'));
        
        // All should have the same set of prop keys
        expect(coreProps).toEqual(batch1Props);
        expect(batch1Props).toEqual(batch10Props);
        expect(batch10Props).toEqual(batch11Props);
        expect(batch11Props).toEqual(standardProps);
    });

    it('should not contain any direct modal rendering', () => {
        const { container } = render(<AppModals {...baseProps} />);
        
        // The orchestrator should only render the 5 sub-components (fragments render children directly)
        const divs = container.querySelectorAll('[data-testid]');
        expect(divs.length).toBe(5);
    });

    it('should pass voice state props', () => {
        const { getByTestId } = render(<AppModals {...baseProps} />);
        
        const coreProps = JSON.parse(getByTestId('app-modals-core').getAttribute('data-props'));
        expect(coreProps).toContain('isMuted');
        expect(coreProps).toContain('isDeafened');
        expect(coreProps).toContain('toggleMute');
        expect(coreProps).toContain('toggleDeafened');
    });
});
