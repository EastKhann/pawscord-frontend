import { useState, useCallback } from 'react';
import toast from '../../utils/toast';

export default function useAccountDeletion({ onClose, onConfirmDelete, username, fetchWithAuth, apiBaseUrl }) {
    const [step, setStep] = useState(1);
    const [password, setPassword] = useState('');
    const [confirmText, setConfirmText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState('');

    const CONFIRM_PHRASE = `DELETE ${username}`;

    const handleClose = useCallback(() => {
        setStep(1); setPassword(''); setConfirmText(''); setError(''); setIsDeleting(false); onClose();
    }, [onClose]);

    const handleProceedToConfirm = () => { setStep(2); setError(''); };

    const handleDelete = async () => {
        if (confirmText !== CONFIRM_PHRASE) { setError(`L\u00FCtfen tam olarak "${CONFIRM_PHRASE}" yaz\u0131n`); return; }
        if (!password) { setError('\u015Eifrenizi girmeniz gerekiyor'); return; }
        setIsDeleting(true); setError('');
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/user/delete-account/`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, confirm_text: confirmText })
            });
            if (response.ok) {
                toast.success('Hesab\u0131n\u0131z ba\u015Far\u0131yla silindi. Ho\u015F\u00E7a kal\u0131n! \uD83D\uDC4B');
                if (onConfirmDelete) onConfirmDelete();
                localStorage.clear(); sessionStorage.clear(); window.location.href = '/';
            } else {
                const data = await response.json();
                setError(data.error || 'Hesap silinemedi. \u015Eifrenizi kontrol edin.');
            }
        } catch (err) { console.error('Account deletion error:', err); setError('Bir hata olu\u015Ftu. L\u00FCtfen tekrar deneyin.'); }
        finally { setIsDeleting(false); }
    };

    const isDeleteDisabled = confirmText !== CONFIRM_PHRASE || !password || isDeleting;

    return { step, setStep, password, setPassword, confirmText, setConfirmText, isDeleting, error, CONFIRM_PHRASE, handleClose, handleProceedToConfirm, handleDelete, isDeleteDisabled };
}
