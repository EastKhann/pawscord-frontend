import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock sub-components
vi.mock('../../components/PremiumStoreModal/PremiumTab', () => ({
    default: (props) => <div data-testid="premium-tab" data-has-styles={!!props.styles} data-has-purchase={!!props.handlePurchase} />
}));
vi.mock('../../components/PremiumStoreModal/StoreTab', () => ({
    default: (props) => <div data-testid="store-tab" data-has-items={!!props.storeItems} />
}));
vi.mock('../../components/PremiumStoreModal/BoostTab', () => ({
    default: (props) => <div data-testid="boost-tab" data-has-token={!!props.token} />
}));
vi.mock('../../components/CoinStoreModal', () => ({
    default: () => <div data-testid="coin-store-modal" />
}));
vi.mock('../../AuthContext', () => ({
    useAuth: () => ({ user: { id: 1, username: 'testuser' }, token: 'test-token' })
}));
vi.mock('../../utils/toast', () => ({ default: { success: vi.fn(), error: vi.fn() } }));
vi.mock('../../utils/apiEndpoints', () => ({ getApiBase: () => 'http://localhost' }));
vi.mock('../../utils/confirmDialog', () => ({ default: vi.fn() }));

// Mock fetch
global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve([]) }));

import PremiumStoreModal from '../../components/PremiumStoreModal';

describe('PremiumStoreModal Orchestrator', () => {
    const onClose = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch.mockImplementation(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
        );
    });

    it('should render premium tab by default', () => {
        render(<PremiumStoreModal onClose={onClose} />);
        expect(screen.getByTestId('premium-tab')).toBeInTheDocument();
        expect(screen.queryByTestId('store-tab')).not.toBeInTheDocument();
        expect(screen.queryByTestId('boost-tab')).not.toBeInTheDocument();
    });

    it('should switch to store tab on click', () => {
        render(<PremiumStoreModal onClose={onClose} />);
        // Find the tab button specifically (not the header title)
        const tabButtons = screen.getAllByRole('button');
        const storeTabBtn = tabButtons.find(b => b.textContent.trim() === 'Magaza');
        fireEvent.click(storeTabBtn);
        expect(screen.getByTestId('store-tab')).toBeInTheDocument();
        expect(screen.queryByTestId('premium-tab')).not.toBeInTheDocument();
    });

    it('should switch to boost tab on click', () => {
        render(<PremiumStoreModal onClose={onClose} />);
        fireEvent.click(screen.getByText(/Server Boost/));
        expect(screen.getByTestId('boost-tab')).toBeInTheDocument();
    });

    it('should pass styles and handlePurchase to PremiumTab', () => {
        render(<PremiumStoreModal onClose={onClose} />);
        const tab = screen.getByTestId('premium-tab');
        expect(tab.dataset.hasStyles).toBe('true');
        expect(tab.dataset.hasPurchase).toBe('true');
    });

    it('should call onClose when close button is clicked', () => {
        render(<PremiumStoreModal onClose={onClose} />);
        // Find the close button (FaTimes icon inside a button)
        const buttons = document.querySelectorAll('button');
        const closeBtn = Array.from(buttons).find(b => b.querySelector('svg'));
        if (closeBtn) {
            fireEvent.click(closeBtn);
            expect(onClose).toHaveBeenCalledTimes(1);
        }
    });

    it('should render header with Premium Magaza title', () => {
        render(<PremiumStoreModal onClose={onClose} />);
        expect(screen.getByText('Premium Magaza')).toBeInTheDocument();
    });

    it('should display coin balance from premiumStatus', () => {
        render(<PremiumStoreModal onClose={onClose} />);
        // Default is 0 coins
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should fetch data on mount', () => {
        render(<PremiumStoreModal onClose={onClose} />);
        // 3 API calls: premium/status, store/items, store/inventory
        expect(global.fetch).toHaveBeenCalledTimes(3);
    });
});
