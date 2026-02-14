var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
async function generateIdentityKeyPair() {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "ECDH",
      namedCurve: "P-256"
    },
    true,
    // extractable
    ["deriveKey", "deriveBits"]
  );
  return {
    publicKey: await exportPublicKey(keyPair.publicKey),
    privateKey: await exportPrivateKey(keyPair.privateKey)
  };
}
__name(generateIdentityKeyPair, "generateIdentityKeyPair");
async function generateSignedPreKeyPair(keyId, identityPrivateKey) {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "ECDH",
      namedCurve: "P-256"
    },
    true,
    ["deriveKey", "deriveBits"]
  );
  const publicKeyBytes = await exportPublicKeyBytes(keyPair.publicKey);
  const signature = await signData(publicKeyBytes);
  return {
    keyId,
    publicKey: await exportPublicKey(keyPair.publicKey),
    privateKey: await exportPrivateKey(keyPair.privateKey),
    signature: arrayBufferToBase64(signature)
  };
}
__name(generateSignedPreKeyPair, "generateSignedPreKeyPair");
async function generateOneTimePreKeys(count = 100) {
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
__name(generateOneTimePreKeys, "generateOneTimePreKeys");
async function exportPublicKey(publicKey) {
  const exported = await crypto.subtle.exportKey("jwk", publicKey);
  return JSON.stringify(exported);
}
__name(exportPublicKey, "exportPublicKey");
async function exportPrivateKey(privateKey) {
  const exported = await crypto.subtle.exportKey("jwk", privateKey);
  return JSON.stringify(exported);
}
__name(exportPrivateKey, "exportPrivateKey");
async function exportPublicKeyBytes(publicKey) {
  const exported = await crypto.subtle.exportKey("raw", publicKey);
  return exported;
}
__name(exportPublicKeyBytes, "exportPublicKeyBytes");
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
__name(importPublicKey, "importPublicKey");
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
__name(importPrivateKey, "importPrivateKey");
async function signData(data, privateKeyJWK) {
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
__name(signData, "signData");
async function encryptMessage(plaintext, sharedSecret) {
  const encryptionKey = await deriveEncryptionKey(sharedSecret);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv
    },
    encryptionKey,
    stringToArrayBuffer(plaintext)
  );
  return {
    ciphertext: arrayBufferToBase64(ciphertext),
    iv: arrayBufferToBase64(iv)
  };
}
__name(encryptMessage, "encryptMessage");
async function decryptMessage(ciphertext, iv, sharedSecret) {
  const encryptionKey = await deriveEncryptionKey(sharedSecret);
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
__name(decryptMessage, "decryptMessage");
async function deriveSharedSecret(myPrivateKey, theirPublicKey) {
  const myPrivateKeyCrypto = await importPrivateKey(myPrivateKey);
  const theirPublicKeyCrypto = await importPublicKey(theirPublicKey);
  const sharedSecret = await crypto.subtle.deriveBits(
    {
      name: "ECDH",
      public: theirPublicKeyCrypto
    },
    myPrivateKeyCrypto,
    256
    // 256 bits
  );
  return arrayBufferToBase64(sharedSecret);
}
__name(deriveSharedSecret, "deriveSharedSecret");
async function deriveEncryptionKey(sharedSecret) {
  const sharedSecretBuffer = base64ToArrayBuffer(sharedSecret);
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    sharedSecretBuffer,
    "HKDF",
    false,
    ["deriveKey"]
  );
  const encryptionKey = await crypto.subtle.deriveKey(
    {
      name: "HKDF",
      hash: "SHA-256",
      salt: new Uint8Array([]),
      // No salt for simplicity
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
__name(deriveEncryptionKey, "deriveEncryptionKey");
function initializeRatchet(myPrivateKey, theirPublicKey, sharedSecret) {
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
__name(initializeRatchet, "initializeRatchet");
async function ratchetForward(ratchetState, direction) {
  if (direction === "send") {
    ratchetState.sendCounter++;
    const newChainKey = await hashData(ratchetState.sendingChainKey || ratchetState.rootKey);
    ratchetState.sendingChainKey = newChainKey;
  } else {
    ratchetState.receiveCounter++;
    const newChainKey = await hashData(ratchetState.receivingChainKey || ratchetState.rootKey);
    ratchetState.receivingChainKey = newChainKey;
  }
  return ratchetState;
}
__name(ratchetForward, "ratchetForward");
async function generateSafetyNumber(myIdentityKey, theirIdentityKey) {
  const combined = myIdentityKey + theirIdentityKey;
  const hash = await hashData(combined);
  const hex = arrayBufferToHex(hash);
  const digits = hex.split("").map((c) => parseInt(c, 16).toString()).join("").substring(0, 60);
  return digits.match(/.{1,5}/g).join(" ");
}
__name(generateSafetyNumber, "generateSafetyNumber");
async function encryptFile(file) {
  const fileKey = await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256
    },
    true,
    ["encrypt", "decrypt"]
  );
  const fileBuffer = await file.arrayBuffer();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv
    },
    fileKey,
    fileBuffer
  );
  const exportedKey = await crypto.subtle.exportKey("jwk", fileKey);
  return {
    encryptedFile: new Blob([encryptedBuffer], { type: "application/octet-stream" }),
    fileKey: JSON.stringify(exportedKey),
    iv: arrayBufferToBase64(iv),
    originalFilename: file.name,
    originalMimeType: file.type
  };
}
__name(encryptFile, "encryptFile");
async function decryptFile(encryptedBlob, fileKeyJWK, iv, filename, mimeType) {
  const jwk = JSON.parse(fileKeyJWK);
  const fileKey = await crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
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
__name(decryptFile, "decryptFile");
function stringToArrayBuffer(str) {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}
__name(stringToArrayBuffer, "stringToArrayBuffer");
function arrayBufferToString(buffer) {
  const decoder = new TextDecoder();
  return decoder.decode(buffer);
}
__name(arrayBufferToString, "arrayBufferToString");
function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
__name(arrayBufferToBase64, "arrayBufferToBase64");
function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
__name(base64ToArrayBuffer, "base64ToArrayBuffer");
function arrayBufferToHex(buffer) {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(arrayBufferToHex, "arrayBufferToHex");
async function hashData(data) {
  const encoder = new TextEncoder();
  const dataBuffer = typeof data === "string" ? encoder.encode(data) : data;
  return await crypto.subtle.digest("SHA-256", dataBuffer);
}
__name(hashData, "hashData");
async function storePrivateKeys(username, identityPrivateKey, signedPreKeyPrivateKey) {
  try {
    localStorage.setItem(`e2ee_identity_private_${username}`, identityPrivateKey);
    localStorage.setItem(`e2ee_signed_pre_key_private_${username}`, signedPreKeyPrivateKey);
    localStorage.setItem(`e2ee_keys_timestamp_${username}`, Date.now().toString());
    return true;
  } catch (err) {
    console.error("❌ Failed to store private keys:", err);
    throw err;
  }
}
__name(storePrivateKeys, "storePrivateKeys");
async function getPrivateKeys(username) {
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
    console.error("❌ Failed to retrieve private keys:", err);
    return null;
  }
}
__name(getPrivateKeys, "getPrivateKeys");
async function fetchUserPublicKeys(apiBaseUrl, targetUser, fetchWithAuth) {
  try {
    const response = await fetchWithAuth(
      `${apiBaseUrl}/e2ee/pre-key-bundle/${targetUser}/`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch public keys: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("❌ Failed to fetch user public keys:", err);
    throw err;
  }
}
__name(fetchUserPublicKeys, "fetchUserPublicKeys");
export {
  decryptFile,
  decryptMessage,
  deriveSharedSecret,
  encryptFile,
  encryptMessage,
  fetchUserPublicKeys,
  generateIdentityKeyPair,
  generateOneTimePreKeys,
  generateSafetyNumber,
  generateSignedPreKeyPair,
  getPrivateKeys,
  initializeRatchet,
  ratchetForward,
  storePrivateKeys
};
