// frontend/src/utils/encryption.js

import CryptoJS from 'crypto-js';

const PREFIX = 'ENC::';

export const encryptMessage = (text, secretKey) => {
    if (!text || !secretKey) return text;
    try {
        const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
        return PREFIX + encrypted;
    } catch (e) {
        console.error("Şifreleme hatası:", e);
        return text;
    }
};

export const decryptMessage = (cipherText, secretKey) => {
    if (!cipherText || !cipherText.startsWith(PREFIX) || !secretKey) return cipherText;
    try {
        const rawCipher = cipherText.replace(PREFIX, '');
        const bytes = CryptoJS.AES.decrypt(rawCipher, secretKey);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);

        // Şifre yanlışsa boş string döner, bu durumda orijinali gösterelim (veya hata mesajı)
        if (!originalText) return "🔒 Şifreli Mesaj (Anahtar Yanlış)";

        return originalText;
    } catch (e) {
        console.error("Şifre çözme hatası:", e);
        return "🔒 Çözülemedi";
    }
};

export const isEncrypted = (text) => {
    return text && typeof text === 'string' && text.startsWith(PREFIX);
};

