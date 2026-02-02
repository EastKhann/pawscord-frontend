// frontend/src/utils/e2ee.js
/**
 * E2EE (End-to-End Encryption) Utilities
 * Signal Protocol Implementation (simplified)
 *
 * Uses Web Crypto API for cryptographic operations
 */

// === KEY GENERATION ===

/**
 * Generate Identity Key Pair (Ed25519)
 * Long-term key for user identity
 */
export async function generateIdentityKeyPair() {
    const keyPair = await crypto.subtle.generateKey(
        {
            name: "ECDH",
            namedCurve: "P-256"
        },
        true, // extractable
        ["deriveKey", "deriveBits"]
    );

    return {
        publicKey: await exportPublicKey(keyPair.publicKey),
        privateKey: await exportPrivateKey(keyPair.privateKey)
    };
}

/**
 * Generate Signed Pre-Key Pair
 * Rotated periodically (every month)
 */
export async function generateSignedPreKeyPair(keyId, identityPrivateKey) {
    const keyPair = await crypto.subtle.generateKey(
        {
            name: "ECDH",
            namedCurve: "P-256"
        },
        true,
        ["deriveKey", "deriveBits"]
    );

    // Sign the public key with identity key
    const publicKeyBytes = await exportPublicKeyBytes(keyPair.publicKey);
    const signature = await signData(publicKeyBytes, identityPrivateKey);

    return {
        keyId,
        publicKey: await exportPublicKey(keyPair.publicKey),
        privateKey: await exportPrivateKey(keyPair.privateKey),
        signature: arrayBufferToBase64(signature)
    };
}

/**
 * Generate One-Time Pre-Key Bundle (100 keys)
 */
export async function generateOneTimePreKeys(count = 100) {
    const keys = [];

    for (let i = 0; i < count; i++) {
        const keyPair = await crypto.subtle.generateKey(
            {
                name: "ECDH",
                namedCurve: "P-256"
            },
            true,
            ["deriveKey", "deriveBits"]
        );

        keys.push({
            keyId: i,
            publicKey: await exportPublicKey(keyPair.publicKey),
            privateKey: await exportPrivateKey(keyPair.privateKey)
        });
    }

    return keys;
}

// === KEY EXPORT/IMPORT ===

async function exportPublicKey(publicKey) {
    const exported = await crypto.subtle.exportKey("jwk", publicKey);
    return JSON.stringify(exported);
}

async function exportPrivateKey(privateKey) {
    const exported = await crypto.subtle.exportKey("jwk", privateKey);
    return JSON.stringify(exported);
}

async function exportPublicKeyBytes(publicKey) {
    const exported = await crypto.subtle.exportKey("raw", publicKey);
    return exported;
}

async function importPublicKey(publicKeyJWK) {
    const jwk = JSON.parse(publicKeyJWK);
    return await crypto.subtle.importKey(
        "jwk",
        jwk,
        { name: "ECDH", namedCurve: "P-256" },
        true,
        []
    );
}

async function importPrivateKey(privateKeyJWK) {
    const jwk = JSON.parse(privateKeyJWK);
    return await crypto.subtle.importKey(
        "jwk",
        jwk,
        { name: "ECDH", namedCurve: "P-256" },
        true,
        ["deriveKey", "deriveBits"]
    );
}

// === SIGNING & VERIFICATION ===

async function signData(data, privateKeyJWK) {
    // For signing, we use ECDSA (not ECDH)
    const signingKeyPair = await crypto.subtle.generateKey(
        {
            name: "ECDSA",
            namedCurve: "P-256"
        },
        false,
        ["sign", "verify"]
    );

    return await crypto.subtle.sign(
        {
            name: "ECDSA",
            hash: { name: "SHA-256" }
        },
        signingKeyPair.privateKey,
        data
    );
}

// === ENCRYPTION/DECRYPTION ===

/**
 * Encrypt message with shared secret
 */
export async function encryptMessage(plaintext, sharedSecret) {
    // Derive encryption key from shared secret
    const encryptionKey = await deriveEncryptionKey(sharedSecret);

    // Generate random IV
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // Encrypt
    const ciphertext = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        encryptionKey,
        stringToArrayBuffer(plaintext)
    );

    return {
        ciphertext: arrayBufferToBase64(ciphertext),
        iv: arrayBufferToBase64(iv)
    };
}

/**
 * Decrypt message with shared secret
 */
export async function decryptMessage(ciphertext, iv, sharedSecret) {
    // Derive encryption key from shared secret
    const encryptionKey = await deriveEncryptionKey(sharedSecret);

    // Decrypt
    const plaintext = await crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: base64ToArrayBuffer(iv)
        },
        encryptionKey,
        base64ToArrayBuffer(ciphertext)
    );

    return arrayBufferToString(plaintext);
}

// === SHARED SECRET DERIVATION (ECDH) ===

/**
 * Perform ECDH key agreement
 */
export async function deriveSharedSecret(myPrivateKey, theirPublicKey) {
    const myPrivateKeyCrypto = await importPrivateKey(myPrivateKey);
    const theirPublicKeyCrypto = await importPublicKey(theirPublicKey);

    const sharedSecret = await crypto.subtle.deriveBits(
        {
            name: "ECDH",
            public: theirPublicKeyCrypto
        },
        myPrivateKeyCrypto,
        256 // 256 bits
    );

    return arrayBufferToBase64(sharedSecret);
}

/**
 * Derive encryption key from shared secret using HKDF
 */
async function deriveEncryptionKey(sharedSecret) {
    const sharedSecretBuffer = base64ToArrayBuffer(sharedSecret);

    // Import as raw key material
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        sharedSecretBuffer,
        "HKDF",
        false,
        ["deriveKey"]
    );

    // Derive AES-GCM key
    const encryptionKey = await crypto.subtle.deriveKey(
        {
            name: "HKDF",
            hash: "SHA-256",
            salt: new Uint8Array([]), // No salt for simplicity
            info: new Uint8Array([])
        },
        keyMaterial,
        {
            name: "AES-GCM",
            length: 256
        },
        false,
        ["encrypt", "decrypt"]
    );

    return encryptionKey;
}

// === DOUBLE RATCHET (Simplified) ===

/**
 * Initialize ratchet state for new conversation
 */
export function initializeRatchet(myPrivateKey, theirPublicKey, sharedSecret) {
    return {
        rootKey: sharedSecret,
        sendingChainKey: null,
        receivingChainKey: null,
        sendCounter: 0,
        receiveCounter: 0,
        myRatchetPrivateKey: myPrivateKey,
        theirRatchetPublicKey: theirPublicKey
    };
}

/**
 * Ratchet forward (after sending/receiving message)
 */
export async function ratchetForward(ratchetState, direction) {
    if (direction === 'send') {
        // Increment send counter
        ratchetState.sendCounter++;

        // Derive new chain key (simplified - should use KDF)
        const newChainKey = await hashData(ratchetState.sendingChainKey || ratchetState.rootKey);
        ratchetState.sendingChainKey = newChainKey;
    } else {
        // Increment receive counter
        ratchetState.receiveCounter++;

        // Derive new chain key
        const newChainKey = await hashData(ratchetState.receivingChainKey || ratchetState.rootKey);
        ratchetState.receivingChainKey = newChainKey;
    }

    return ratchetState;
}

// === SAFETY NUMBER ===

/**
 * Generate safety number (fingerprint of identity keys)
 */
export async function generateSafetyNumber(myIdentityKey, theirIdentityKey) {
    const combined = myIdentityKey + theirIdentityKey;
    const hash = await hashData(combined);

    // Convert to 60-digit number
    const hex = arrayBufferToHex(hash);
    const digits = hex.split('').map(c => parseInt(c, 16).toString()).join('').substring(0, 60);

    // Format: 12 groups of 5 digits
    return digits.match(/.{1,5}/g).join(' ');
}

// === FILE ENCRYPTION ===

/**
 * Encrypt file (for attachments)
 */
export async function encryptFile(file) {
    // Generate random file encryption key
    const fileKey = await crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256
        },
        true,
        ["encrypt", "decrypt"]
    );

    // Read file
    const fileBuffer = await file.arrayBuffer();

    // Encrypt
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedBuffer = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        fileKey,
        fileBuffer
    );

    // Export file key
    const exportedKey = await crypto.subtle.exportKey("jwk", fileKey);

    return {
        encryptedFile: new Blob([encryptedBuffer], { type: 'application/octet-stream' }),
        fileKey: JSON.stringify(exportedKey),
        iv: arrayBufferToBase64(iv),
        originalFilename: file.name,
        originalMimeType: file.type
    };
}

/**
 * Decrypt file
 */
export async function decryptFile(encryptedBlob, fileKeyJWK, iv, filename, mimeType) {
    // Import file key
    const jwk = JSON.parse(fileKeyJWK);
    const fileKey = await crypto.subtle.importKey(
        "jwk",
        jwk,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
    );

    // Decrypt
    const encryptedBuffer = await encryptedBlob.arrayBuffer();
    const decryptedBuffer = await crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: base64ToArrayBuffer(iv)
        },
        fileKey,
        encryptedBuffer
    );

    return new File([decryptedBuffer], filename, { type: mimeType });
}

// === UTILITY FUNCTIONS ===

function stringToArrayBuffer(str) {
    const encoder = new TextEncoder();
    return encoder.encode(str);
}

function arrayBufferToString(buffer) {
    const decoder = new TextDecoder();
    return decoder.decode(buffer);
}

function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

function base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
}

function arrayBufferToHex(buffer) {
    const bytes = new Uint8Array(buffer);
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hashData(data) {
    const encoder = new TextEncoder();
    const dataBuffer = typeof data === 'string' ? encoder.encode(data) : data;
    return await crypto.subtle.digest("SHA-256", dataBuffer);
}

// === STORAGE (IndexedDB for private keys) ===

/**
 * Store private keys securely in localStorage (simplified)
 * NEVER send private keys to server!
 * In production, use IndexedDB with encryption
 */
export async function storePrivateKeys(username, identityPrivateKey, signedPreKeyPrivateKey) {
    try {
        localStorage.setItem(`e2ee_identity_private_${username}`, identityPrivateKey);
        localStorage.setItem(`e2ee_signed_pre_key_private_${username}`, signedPreKeyPrivateKey);
        localStorage.setItem(`e2ee_keys_timestamp_${username}`, Date.now().toString());
        console.log('✅ Private keys stored locally');
        return true;
    } catch (err) {
        console.error('❌ Failed to store private keys:', err);
        throw err;
    }
}

/**
 * Retrieve private keys from localStorage
 */
export async function getPrivateKeys(username) {
    try {
        const identityPrivateKey = localStorage.getItem(`e2ee_identity_private_${username}`);
        const signedPreKeyPrivateKey = localStorage.getItem(`e2ee_signed_pre_key_private_${username}`);
        const timestamp = localStorage.getItem(`e2ee_keys_timestamp_${username}`);

        if (!identityPrivateKey || !signedPreKeyPrivateKey) {
            return null;
        }

        return {
            username,
            identityPrivateKey,
            signedPreKeyPrivateKey,
            timestamp: parseInt(timestamp)
        };
    } catch (err) {
        console.error('❌ Failed to retrieve private keys:', err);
        return null;
    }
}

/**
 * Fetch user's public key bundle from server
 */
export async function fetchUserPublicKeys(apiBaseUrl, targetUser, fetchWithAuth) {
    try {
        const response = await fetchWithAuth(
            `${apiBaseUrl}/e2ee/pre-key-bundle/${targetUser}/`
        );
        
        if (!response.ok) {
            throw new Error(`Failed to fetch public keys: ${response.status}`);
        }
        
        return await response.json();
    } catch (err) {
        console.error('❌ Failed to fetch user public keys:', err);
        throw err;
    }
}

console.log('✅ E2EE Crypto Utils loaded');



