import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Mock sub-components and hook
vi.mock('../../CryptoDashboard/hooks/useCryptoData', () => ({
    default: vi.fn()
}));
vi.mock('../../CryptoDashboard/TradeModal', () => ({
    default: ({ coin, onClose }) => <div data-testid="trade-modal">{coin}<button onClick={onClose}>close-trade</button></div>
}));
vi.mock('../../CryptoDashboard/PortfolioModal', () => ({
    default: ({ onClose }) => <div data-testid="portfolio-modal"><button onClick={onClose}>close-portfolio</button></div>
}));
vi.mock('../../CryptoDashboard/helpers', () => ({
    safeRender: (v) => v ?? '-',
    formatPrice: (p) => p || '0',
    pnlColor: () => '#23a559',
    TAB_CONFIG: {
        TUM_STRATEJILER: { icon: '📊', shortLabel: 'Tümü', color: '#5865f2' },
        ACIK_POZISYONLAR: { icon: '💼', shortLabel: 'Açık Poz.', color: '#f0b232' }
    },
    LivePrice: ({ price }) => <span data-testid="live-price">{price}</span>,
    SignalBadge: ({ signal }) => <span>{signal}</span>,
    StatusBadge: ({ status }) => <span>{status}</span>
}));
vi.mock('../../CryptoDashboard/styles', () => ({
    default: new Proxy({}, { get: () => ({}) })
}));

import CryptoDashboard from '../../CryptoDashboard';
import useCryptoData from '../../CryptoDashboard/hooks/useCryptoData';

const baseMock = {
    data: { meta: { version: '3.0', export_date: '2025-01-01' } },
    loading: false, errorMsg: null, debugInfo: '',
    activeMode: 'balance_mode', setActiveMode: vi.fn(),
    activeTab: 'TUM_STRATEJILER', setActiveTab: vi.fn(),
    searchQuery: '', setSearchQuery: vi.fn(),
    sortBy: 'rank', sortDir: 'asc', handleSort: vi.fn(),
    page: 1, setPage: vi.fn(),
    showPortfolio: false, setShowPortfolio: vi.fn(),
    tradeData: null, setTradeData: vi.fn(),
    portfolio: { balance: '1000' }, prices: {},
    fetchData: vi.fn(), handleTrade: vi.fn(),
    modeData: {
        tabs: {
            TUM_STRATEJILER: { title: 'Tüm Stratejiler', count: 5, data: [] },
            ACIK_POZISYONLAR: { title: 'Açık Pozisyonlar', count: 2, data: [] }
        }
    },
    tabInfo: { title: 'Tüm Stratejiler', count: 5 },
    processedData: [],
    pagedData: [
        { rank: 1, coin: 'BTCUSDT', timeframe: '4h', signal: 'LONG', entry_price: '60000', current_price: '65000', pnl_percent: '+8.33%', win_rate: '75%', trades: 10, x_kat: '2.5x', hedef_roe: '10%', status: 'active' }
    ],
    totalPages: 1, isPositionsTab: false,
    meta: { version: '3.0', export_date: '2025-01-01', balance_strategies: 50, winrate_strategies: 40, position_coins: [] },
    positionCoins: [], positionCoinStatus: {},
    extractCoinSymbol: (c) => c?.replace('USDT', ''),
    getLivePrice: () => '65000',
    isMobile: false,
};

const renderDashboard = (overrides = {}) => {
    useCryptoData.mockReturnValue({ ...baseMock, ...overrides });
    return render(
        <MemoryRouter>
            <CryptoDashboard />
        </MemoryRouter>
    );
};

describe('CryptoDashboard Orchestrator', () => {
    beforeEach(() => vi.clearAllMocks());

    it('should render dashboard header with title', () => {
        renderDashboard();
        expect(screen.getByText(/Crypto AI Dashboard/i)).toBeDefined();
    });

    it('should show version from meta', () => {
        renderDashboard();
        expect(screen.getByText('v3.0')).toBeDefined();
    });

    it('should show wallet balance', () => {
        renderDashboard();
        expect(screen.getByText(/1000/)).toBeDefined();
    });

    it('should render mode toggle buttons', () => {
        renderDashboard();
        const buttons = screen.getAllByRole('button');
        const balanceBtn = buttons.find(b => b.textContent.includes('Balance'));
        const winrateBtn = buttons.find(b => b.textContent.includes('Winrate'));
        expect(balanceBtn).toBeDefined();
        expect(winrateBtn).toBeDefined();
    });

    it('should switch mode on click', () => {
        const setActiveMode = vi.fn();
        renderDashboard({ setActiveMode });
        const buttons = screen.getAllByRole('button');
        const winrateBtn = buttons.find(b => b.textContent.includes('Winrate'));
        fireEvent.click(winrateBtn);
        expect(setActiveMode).toHaveBeenCalledWith('winrate_mode');
    });

    it('should render tab buttons', () => {
        renderDashboard();
        const buttons = screen.getAllByRole('button');
        const tabBtn = buttons.find(b => b.textContent.includes('Tüm Stratejiler'));
        expect(tabBtn).toBeDefined();
    });

    it('should render data table with coin row', () => {
        renderDashboard();
        expect(screen.getByText('BTC')).toBeDefined();
        expect(screen.getByText('4h')).toBeDefined();
        expect(screen.getByText('LONG')).toBeDefined();
    });

    it('should show loading state', () => {
        renderDashboard({ loading: true, data: null });
        expect(screen.getByText(/Kripto Verileri/)).toBeDefined();
    });

    it('should show error state', () => {
        renderDashboard({ errorMsg: 'Connection failed', data: {} });
        expect(screen.getByText(/Connection failed/)).toBeDefined();
    });

    it('should render portfolio modal when showPortfolio is true', () => {
        renderDashboard({ showPortfolio: true });
        expect(screen.getByTestId('portfolio-modal')).toBeDefined();
    });

    it('should render trade modal when tradeData is set', () => {
        renderDashboard({ tradeData: { coin: 'BTC', price: '65000' } });
        expect(screen.getByTestId('trade-modal')).toBeDefined();
    });
});
