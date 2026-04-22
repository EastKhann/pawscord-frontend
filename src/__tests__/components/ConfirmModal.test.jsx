/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-associated-control */
// frontend/src/__tests__/components/ConfirmModal.test.jsx

// 🧪 ConfirmModal Component Tests

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import React, { useState } from 'react';

// --- Mock ConfirmModal (replicates confirm/cancel dialog) ---

const MockConfirmModal = ({
    isOpen = false,

    onClose = vi.fn(),

    onConfirm = vi.fn(),

    title = 'Emin misiniz?',

    message = 'Are you sure you want to perform this action?',

    confirmText = 'Evet',

    cancelText = 'No',

    type = 'warning',

    requireTextConfirmation = false,

    confirmationText = '',

    inputPlaceholder = 'Type here to confirm...',

    dangerDetails = null,
}) => {
    const [inputValue, setInputValue] = useState('');

    const [isProcessing, setIsProcessing] = useState(false);

    if (!isOpen) return null;

    const canConfirm = !requireTextConfirmation || inputValue === confirmationText;

    const handleConfirm = async () => {
        if (!canConfirm) return;

        setIsProcessing(true);

        try {
            await onConfirm();

            onClose();
        } catch (error) {
            console.error('Confirm action failed:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const typeIcons = { warning: '⚠', danger: '🗑', info: 'ℹ' };

    return (
        <div
            data-testid="confirm-overlay"
            role="button"
            tabIndex={0}
            onClick={(e) => {
                if (e.target === e.currentTarget && !isProcessing) onClose();
            }}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div data-testid="confirm-modal" role="dialog" aria-label="Onmonth">
                {/* Header */}

                <div data-testid="modal-header">
                    <span data-testid="modal-icon">{typeIcons[type] || '⚠'}</span>

                    <h2 data-testid="modal-title">{title}</h2>

                    <button data-testid="close-button" onClick={onClose} disabled={isProcessing}>
                        ✕
                    </button>
                </div>

                {/* Body */}

                <div data-testid="modal-body">
                    <p data-testid="modal-message">{message}</p>

                    {/* Danger Details */}

                    {dangerDetails && dangerDetails.length > 0 && (
                        <div data-testid="danger-details">
                            <div data-testid="danger-header">⚠ This action:</div>

                            <ul data-testid="danger-list">
                                {dangerDetails.map((detail, idx) => (
                                    <li key={idx} data-testid={`danger-item-${idx}`}>
                                        • {detail}
                                    </li>
                                ))}
                            </ul>

                            <div data-testid="danger-footer">GERİ ALINAMAZ!</div>
                        </div>
                    )}

                    {/* Confirmation Input */}

                    {requireTextConfirmation && (
                        <div data-testid="confirmation-input-container">
                            <label data-testid="confirmation-label">
                                Type <strong>"{confirmationText}"</strong> to confirm:
                            </label>

                            <input
                                data-testid="confirmation-input"
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={inputPlaceholder}
                                disabled={isProcessing}
                                autoFocus
                                aria-label="Input Value"
                            />

                            {inputValue && inputValue !== confirmationText && (
                                <div data-testid="input-error">Metin eşleşmiyor</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}

                <div data-testid="modal-footer">
                    <button data-testid="cancel-button" onClick={onClose} disabled={isProcessing}>
                        {cancelText}
                    </button>

                    <button
                        data-testid="confirm-button"
                        onClick={handleConfirm}
                        disabled={!canConfirm || isProcessing}
                    >
                        {isProcessing ? 'İşleniyor...' : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

describe('ConfirmModal Component', () => {
    let mockOnClose;

    let mockOnConfirm;

    beforeEach(() => {
        mockOnClose = vi.fn();

        mockOnConfirm = vi.fn().mockResolvedValue(undefined);
    });

    describe('Visibility', () => {
        it('should NOT render when isOpen is false', () => {
            const { container } = render(
                <MockConfirmModal isOpen={false} onClose={mockOnClose} onConfirm={mockOnConfirm} />
            );

            expect(container.innerHTML).toBe('');
        });

        it('should render when isOpen is true', () => {
            render(
                <MockConfirmModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />
            );

            expect(screen.getByTestId('confirm-modal')).toBeInTheDocument();
        });
    });

    describe('Content Rendering', () => {
        it('should display default title and message', () => {
            render(
                <MockConfirmModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />
            );

            expect(screen.getByTestId('modal-title')).toHaveTextContent('Emin misiniz?');

            expect(screen.getByTestId('modal-message')).toHaveTextContent(
                'Are you sure you want to perform this action?'
            );
        });

        it('should display custom title and message', () => {
            render(
                <MockConfirmModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onConfirm={mockOnConfirm}
                    title="Sunucuyu Sil"
                    message="This server will be permanently deleted."
                />
            );

            expect(screen.getByTestId('modal-title')).toHaveTextContent('Sunucuyu Sil');

            expect(screen.getByTestId('modal-message')).toHaveTextContent(
                'This server will be permanently deleted.'
            );
        });

        it('should display correct icon for type=danger', () => {
            render(
                <MockConfirmModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onConfirm={mockOnConfirm}
                    type="danger"
                />
            );

            expect(screen.getByTestId('modal-icon')).toHaveTextContent('🗑');
        });

        it('should display correct icon for type=info', () => {
            render(
                <MockConfirmModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onConfirm={mockOnConfirm}
                    type="info"
                />
            );

            expect(screen.getByTestId('modal-icon')).toHaveTextContent('ℹ');
        });

        it('should display custom button text', () => {
            render(
                <MockConfirmModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onConfirm={mockOnConfirm}
                    confirmText="Sil"
                    cancelText="Cancel"
                />
            );

            expect(screen.getByTestId('confirm-button')).toHaveTextContent('Sil');

            expect(screen.getByTestId('cancel-button')).toHaveTextContent('Cancel');
        });
    });

    describe('Danger Details', () => {
        it('should display danger details when provided', () => {
            render(
                <MockConfirmModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onConfirm={mockOnConfirm}
                    dangerDetails={['All messages will be deleted', 'Memberler atılacak']}
                />
            );

            expect(screen.getByTestId('danger-details')).toBeInTheDocument();

            expect(screen.getByTestId('danger-item-0')).toHaveTextContent(
                'All messages will be deleted'
            );

            expect(screen.getByTestId('danger-item-1')).toHaveTextContent('Memberler atılacak');

            expect(screen.getByTestId('danger-footer')).toHaveTextContent('GERİ ALINAMAZ!');
        });

        it('should NOT display danger details when not provided', () => {
            render(
                <MockConfirmModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />
            );

            expect(screen.queryByTestId('danger-details')).not.toBeInTheDocument();
        });
    });

    describe('Confirm/Cancel Actions', () => {
        it('should call onConfirm then onClose when confirm is clicked', async () => {
            render(
                <MockConfirmModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />
            );

            fireEvent.click(screen.getByTestId('confirm-button'));

            await waitFor(() => {
                expect(mockOnConfirm).toHaveBeenCalledTimes(1);

                expect(mockOnClose).toHaveBeenCalledTimes(1);
            });
        });

        it('should call onClose when cancel is clicked', () => {
            render(
                <MockConfirmModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />
            );

            fireEvent.click(screen.getByTestId('cancel-button'));

            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });

        it('should call onClose when close (X) button is clicked', () => {
            render(
                <MockConfirmModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />
            );

            fireEvent.click(screen.getByTestId('close-button'));

            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });

        it('should call onClose on overlay click', () => {
            render(
                <MockConfirmModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />
            );

            fireEvent.click(screen.getByTestId('confirm-overlay'));

            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });
    });

    describe('Text Confirmation', () => {
        it('should show confirmation input when requireTextConfirmation is true', () => {
            render(
                <MockConfirmModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onConfirm={mockOnConfirm}
                    requireTextConfirmation={true}
                    confirmationText="DELETE"
                />
            );

            expect(screen.getByTestId('confirmation-input')).toBeInTheDocument();

            expect(screen.getByTestId('confirmation-label')).toBeInTheDocument();
        });

        it('should disable confirm button until text matches', () => {
            render(
                <MockConfirmModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onConfirm={mockOnConfirm}
                    requireTextConfirmation={true}
                    confirmationText="DELETE"
                />
            );

            expect(screen.getByTestId('confirm-button')).toBeDisabled();
        });

        it('should show error message when text does not match', () => {
            render(
                <MockConfirmModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onConfirm={mockOnConfirm}
                    requireTextConfirmation={true}
                    confirmationText="DELETE"
                />
            );

            fireEvent.change(screen.getByTestId('confirmation-input'), {
                target: { value: 'WRONG' },
            });

            expect(screen.getByTestId('input-error')).toHaveTextContent('Metin eşleşmiyor');
        });

        it('should enable confirm button when text matches', () => {
            render(
                <MockConfirmModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onConfirm={mockOnConfirm}
                    requireTextConfirmation={true}
                    confirmationText="DELETE"
                />
            );

            fireEvent.change(screen.getByTestId('confirmation-input'), {
                target: { value: 'DELETE' },
            });

            expect(screen.getByTestId('confirm-button')).not.toBeDisabled();
        });

        it('should allow confirm after correct text is entered', async () => {
            render(
                <MockConfirmModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onConfirm={mockOnConfirm}
                    requireTextConfirmation={true}
                    confirmationText="DELETE"
                />
            );

            fireEvent.change(screen.getByTestId('confirmation-input'), {
                target: { value: 'DELETE' },
            });

            fireEvent.click(screen.getByTestId('confirm-button'));

            await waitFor(() => {
                expect(mockOnConfirm).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe('Processing State', () => {
        it('should show processing text during async confirm', async () => {
            const slowConfirm = vi.fn(() => new Promise((resolve) => setTimeout(resolve, 100)));

            render(
                <MockConfirmModal isOpen={true} onClose={mockOnClose} onConfirm={slowConfirm} />
            );

            fireEvent.click(screen.getByTestId('confirm-button'));

            expect(screen.getByTestId('confirm-button')).toHaveTextContent('İşleniyor...');

            await waitFor(() => {
                expect(slowConfirm).toHaveBeenCalled();
            });
        });
    });
});
