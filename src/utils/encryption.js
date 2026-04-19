// frontend/src/utils/encryption.js

import CryptoJS from 'crypto-js';
import logger from '../utils/logger';

const PREFIX = 'ENC::';

export const encryptMessage = (text, secretKey) => {
    if (!text || !secretKey) return text;
    try {
        const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
        return PREFIX + encrypted;
    } catch (e) {
        logger.error('Encryption error:', e);
        return text;
    }
};

export const decryptMessage = (cipherText, secretKey) => {
    if (!cipherText || !cipherText.startsWith(PREFIX) || !secretKey) return cipherText;
    try {
        const rawCipher = cipherText.replace(PREFIX, '');
        const bytes = CryptoJS.AES.decrypt(rawCipher, secretKey);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);

        // Password yanlışsa boş string döner, bu durumda orijinali gösterelim (or hata mesajı)
        if (!originalText) return '🔒 Encrypted Message (Wrong Key)';

        return originalText;
    } catch (e) {
        logger.error('Decryption error:', e);
        return '🔒 Could not decrypt';
    }
};

export const isEncrypted = (text) => {
    return text && typeof text === 'string' && text.startsWith(PREFIX);
};
