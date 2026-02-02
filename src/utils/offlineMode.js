// frontend/src/utils/offlineMode.js

/**
 * 📵 Offline Mode Manager
 * İnternet bağlantısı kesildiğinde uygulamanın çalışmaya devam etmesini sağlar
 * IndexedDB ile mesajları cache'ler, bağlantı gelince senkronize eder
 */

class OfflineModeManager {
    constructor() {
        this.isOnline = navigator.onLine;
        this.listeners = new Set();
        this.pendingActions = []; // Offline iken yapılan işlemler
        this.db = null;

        this.init();
    }

    /**
     * Offline mode'u başlat
     */
    async init() {
        // Online/offline event listener'ları
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());

        // IndexedDB'yi başlat
        await this.initDatabase();

        console.log(`📡 [OfflineMode] Başlatıldı (${this.isOnline ? 'Online' : 'Offline'})`);
    }

    /**
     * IndexedDB veritabanını başlat
     */
    async initDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('PawscordOfflineDB', 1);

            request.onerror = () => {
                console.error('❌ [OfflineMode] IndexedDB açılamadı');
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                console.log('✅ [OfflineMode] IndexedDB hazır');
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Mesajlar tablosu
                if (!db.objectStoreNames.contains('messages')) {
                    const messageStore = db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
                    messageStore.createIndex('timestamp', 'timestamp', { unique: false });
                    messageStore.createIndex('room', 'room', { unique: false });
                    messageStore.createIndex('synced', 'synced', { unique: false });
                }

                // Pending actions tablosu
                if (!db.objectStoreNames.contains('pendingActions')) {
                    const actionStore = db.createObjectStore('pendingActions', { keyPath: 'id', autoIncrement: true });
                    actionStore.createIndex('timestamp', 'timestamp', { unique: false });
                }

                console.log('📊 [OfflineMode] IndexedDB tabloları oluşturuldu');
            };
        });
    }

    /**
     * Online olduğunda tetiklenir
     */
    handleOnline() {
        console.log('🟢 [OfflineMode] İnternet bağlantısı geri geldi');
        this.isOnline = true;
        this.notify('online');

        // Bekleyen işlemleri senkronize et
        this.syncPendingActions();
    }

    /**
     * Offline olduğunda tetiklenir
     */
    handleOffline() {
        console.warn('🔴 [OfflineMode] İnternet bağlantısı kesildi');
        this.isOnline = false;
        this.notify('offline');
    }

    /**
     * Listener ekle
     * @param {Function} callback - Callback fonksiyonu
     */
    onStatusChange(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    /**
     * Listener'ları bilgilendir
     */
    notify(status) {
        this.listeners.forEach(callback => {
            try {
                callback({ status, isOnline: this.isOnline });
            } catch (error) {
                console.error('❌ [OfflineMode] Listener hatası:', error);
            }
        });
    }

    /**
     * Mesajı cache'e kaydet (offline iken)
     * @param {Object} message - Mesaj objesi
     */
    async cacheMessage(message) {
        if (!this.db) return;

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['messages'], 'readwrite');
            const store = transaction.objectStore('messages');

            const messageData = {
                ...message,
                timestamp: Date.now(),
                synced: false
            };

            const request = store.add(messageData);

            request.onsuccess = () => {
                console.log('💾 [OfflineMode] Mesaj cache\'e kaydedildi:', message);
                resolve(request.result);
            };

            request.onerror = () => {
                console.error('❌ [OfflineMode] Mesaj kaydetme hatası:', request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Cache'den mesajları oku
     * @param {string} room - Oda ID
     * @returns {Promise<Array>} Mesajlar
     */
    async getCachedMessages(room) {
        if (!this.db) return [];

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['messages'], 'readonly');
            const store = transaction.objectStore('messages');
            const index = store.index('room');
            const request = index.getAll(room);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                console.error('❌ [OfflineMode] Mesaj okuma hatası:', request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Pending action ekle (offline iken yapılan işlem)
     * @param {Object} action - İşlem objesi
     */
    async addPendingAction(action) {
        if (!this.db) return;

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['pendingActions'], 'readwrite');
            const store = transaction.objectStore('pendingActions');

            const actionData = {
                ...action,
                timestamp: Date.now()
            };

            const request = store.add(actionData);

            request.onsuccess = () => {
                console.log('📝 [OfflineMode] Pending action eklendi:', action);
                this.pendingActions.push(action);
                resolve(request.result);
            };

            request.onerror = () => {
                console.error('❌ [OfflineMode] Action ekleme hatası:', request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Bekleyen işlemleri senkronize et
     */
    async syncPendingActions() {
        if (!this.db || this.pendingActions.length === 0) return;

        console.log(`🔄 [OfflineMode] ${this.pendingActions.length} bekleyen işlem senkronize ediliyor...`);

        const transaction = this.db.transaction(['pendingActions'], 'readwrite');
        const store = transaction.objectStore('pendingActions');

        // Tüm pending action'ları al
        const request = store.getAll();

        request.onsuccess = async () => {
            const actions = request.result;

            for (const action of actions) {
                try {
                    // Action'ı çalıştır
                    if (action.type === 'sendMessage') {
                        await this.executeSendMessage(action.data);
                    } else if (action.type === 'uploadFile') {
                        await this.executeUploadFile(action.data);
                    }
                    // Diğer action tipleri...

                    // Başarılı olduysa sil
                    store.delete(action.id);
                    console.log('✅ [OfflineMode] Action senkronize edildi:', action);

                } catch (error) {
                    console.error('❌ [OfflineMode] Senkronizasyon hatası:', error);
                    // Hata durumunda action'ı koru, sonra tekrar dene
                }
            }

            this.pendingActions = [];
            console.log('🎉 [OfflineMode] Tüm pending action\'lar senkronize edildi');
        };
    }

    /**
     * Mesaj gönderme işlemini çalıştır
     */
    async executeSendMessage(data) {
        console.log('📤 [OfflineMode] Mesaj gönderiliyor:', data);

        const token = localStorage.getItem('access_token');
        if (!token) {
            throw new Error('No auth token available');
        }

        const apiUrl = this.getApiUrl();
        const endpoint = data.type === 'dm'
            ? `${apiUrl}/messages/dm/send/`
            : `${apiUrl}/messages/room/send/`;

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                content: data.content,
                ...(data.type === 'dm' ? { conversation_id: data.conversationId } : { room_slug: data.roomSlug }),
                temp_id: data.tempId
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        return await response.json();
    }

    /**
     * Dosya yükleme işlemini çalıştır
     */
    async executeUploadFile(data) {
        console.log('📤 [OfflineMode] Dosya yükleniyor:', data);

        const token = localStorage.getItem('access_token');
        if (!token) {
            throw new Error('No auth token available');
        }

        const apiUrl = this.getApiUrl();
        const formData = new FormData();

        // Blob'dan File oluştur
        const file = new File([data.fileBlob], data.fileName, { type: data.fileType });
        formData.append('file', file);

        if (data.roomSlug) {
            formData.append('room', data.roomSlug);
        } else if (data.conversationId) {
            formData.append('conversation', data.conversationId);
        }

        const response = await fetch(`${apiUrl}/messages/upload_file/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        return await response.json();
    }

    /**
     * API URL'ini al
     */
    getApiUrl() {
        const isElectron = window.navigator?.userAgent?.toLowerCase().includes('electron');
        const isPawscordDomain = window.location.hostname.includes('pawscord.com');
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

        // Use environment variable if available, fallback to auto-detection
        const envApiUrl = import.meta.env.VITE_API_BASE_URL;
        if (envApiUrl) return envApiUrl;

        if (isElectron || isPawscordDomain) {
            return 'https://api.pawscord.com';
        }
        if (isLocalhost) {
            return 'http://localhost:8888/api';
        }
        return 'https://api.pawscord.com';
    }

    /**
     * Cache'i temizle
     */
    async clearCache() {
        if (!this.db) return;

        const transaction = this.db.transaction(['messages', 'pendingActions'], 'readwrite');
        transaction.objectStore('messages').clear();
        transaction.objectStore('pendingActions').clear();

        console.log('🗑️ [OfflineMode] Cache temizlendi');
    }

    /**
     * Durum bilgisi
     */
    getStatus() {
        return {
            isOnline: this.isOnline,
            pendingActionsCount: this.pendingActions.length,
            hasDatabase: !!this.db
        };
    }
}

// Global instance
export const offlineManager = new OfflineModeManager();

// React hook
export const useOfflineMode = () => {
    const [status, setStatus] = React.useState({
        isOnline: offlineManager.isOnline,
        pendingActionsCount: offlineManager.pendingActions.length
    });

    React.useEffect(() => {
        const unsubscribe = offlineManager.onStatusChange((newStatus) => {
            setStatus({
                isOnline: newStatus.isOnline,
                pendingActionsCount: offlineManager.pendingActions.length
            });
        });

        return unsubscribe;
    }, []);

    return status;
};

export default OfflineModeManager;


