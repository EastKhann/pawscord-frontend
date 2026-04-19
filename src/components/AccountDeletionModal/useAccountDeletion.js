import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import toast from '../../utils/toast';
import logger from '../../utils/logger';

export default function useAccountDeletion({
    onClose,
    onConfirmDelete,
    username,
    fetchWithAuth,
    apiBaseUrl,
}) {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [password, setPassword] = useState('');
    const [confirmText, setConfirmText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState('');

    const CONFIRM_PHRASE = `DELETE ${username}`;

    const handleClose = useCallback(() => {
        setStep(1);
        setPassword('');
        setConfirmText('');
        setError('');
        setIsDeleting(false);
        onClose();
    }, [onClose]);

    const handleProceedToConfirm = () => {
        setStep(2);
        setError('');
    };

    const handleDelete = async () => {
        if (confirmText !== CONFIRM_PHRASE) {
            setError(t('accountDeletion.pleaseType', { phrase: CONFIRM_PHRASE }));
            return;
        }
        if (!password) {
            setError(t('accountDeletion.passwordPlaceholder'));
            return;
        }
        setIsDeleting(true);
        setError('');
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/user/delete-account/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, confirm_text: confirmText }),
            });
            if (response.ok) {
                toast.success(t('accountDeletion.successMessage'));
                if (onConfirmDelete) onConfirmDelete();
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = '/';
            } else {
                const data = await response.json();
                setError(data.error || t('common.error'));
            }
        } catch (err) {
            if (import.meta.env.DEV) logger.error('Account deletion error:', err);
            setError(t('common.error'));
        } finally {
            setIsDeleting(false);
        }
    };

    const isDeleteDisabled = confirmText !== CONFIRM_PHRASE || !password || isDeleting;

    return {
        step,
        setStep,
        password,
        setPassword,
        confirmText,
        setConfirmText,
        isDeleting,
        error,
        CONFIRM_PHRASE,
        handleClose,
        handleProceedToConfirm,
        handleDelete,
        isDeleteDisabled,
    };
}
