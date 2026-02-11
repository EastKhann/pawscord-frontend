// frontend/src/context/AppContext.js
// 🌍 GLOBAL APPLICATION CONTEXT
// Centralized state management with performance optimizations

import { createContext, useContext, useReducer, useCallback, useMemo, useEffect } from 'react';
import { api } from '../services/ApiService';
import { wsService } from '../services/WebSocketService';

// Initial state
const initialState = {
    // User
    user: null,
    isAuthenticated: false,
    userSettings: {},

    // Servers
    servers: [],
    currentServer: null,
    serverMembers: {},

    // Rooms/Channels
    rooms: {},
    currentRoom: null,

    // Messages
    messages: {},
    typingUsers: {},

    // UI State
    sidebarOpen: true,
    memberListOpen: true,
    activePanel: null,
    modals: {},

    // Notifications
    notifications: [],
    unreadCounts: {},

    // Online/Presence
    onlineUsers: {},

    // App State
    isLoading: false,
    error: null,
    connectionStatus: 'disconnected',

    // Theme
    theme: 'dark'
};

// Action types
export const ActionTypes = {
    // Auth
    SET_USER: 'SET_USER',
    LOGOUT: 'LOGOUT',
    UPDATE_USER_SETTINGS: 'UPDATE_USER_SETTINGS',

    // Servers
    SET_SERVERS: 'SET_SERVERS',
    ADD_SERVER: 'ADD_SERVER',
    UPDATE_SERVER: 'UPDATE_SERVER',
    REMOVE_SERVER: 'REMOVE_SERVER',
    SET_CURRENT_SERVER: 'SET_CURRENT_SERVER',
    SET_SERVER_MEMBERS: 'SET_SERVER_MEMBERS',

    // Rooms
    SET_ROOMS: 'SET_ROOMS',
    ADD_ROOM: 'ADD_ROOM',
    UPDATE_ROOM: 'UPDATE_ROOM',
    REMOVE_ROOM: 'REMOVE_ROOM',
    SET_CURRENT_ROOM: 'SET_CURRENT_ROOM',

    // Messages
    SET_MESSAGES: 'SET_MESSAGES',
    ADD_MESSAGE: 'ADD_MESSAGE',
    UPDATE_MESSAGE: 'UPDATE_MESSAGE',
    REMOVE_MESSAGE: 'REMOVE_MESSAGE',
    SET_TYPING: 'SET_TYPING',

    // UI
    TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
    TOGGLE_MEMBER_LIST: 'TOGGLE_MEMBER_LIST',
    SET_ACTIVE_PANEL: 'SET_ACTIVE_PANEL',
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',

    // Notifications
    ADD_NOTIFICATION: 'ADD_NOTIFICATION',
    REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
    CLEAR_NOTIFICATIONS: 'CLEAR_NOTIFICATIONS',
    SET_UNREAD_COUNT: 'SET_UNREAD_COUNT',

    // Presence
    SET_ONLINE_USERS: 'SET_ONLINE_USERS',
    UPDATE_USER_STATUS: 'UPDATE_USER_STATUS',

    // App State
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_CONNECTION_STATUS: 'SET_CONNECTION_STATUS',
    SET_THEME: 'SET_THEME',

    // Bulk
    RESET_STATE: 'RESET_STATE'
};

// Reducer
function appReducer(state, action) {
    switch (action.type) {
        // Auth
        case ActionTypes.SET_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !!action.payload
            };

        case ActionTypes.LOGOUT:
            return {
                ...initialState,
                theme: state.theme
            };

        case ActionTypes.UPDATE_USER_SETTINGS:
            return {
                ...state,
                userSettings: { ...state.userSettings, ...action.payload }
            };

        // Servers
        case ActionTypes.SET_SERVERS:
            return { ...state, servers: action.payload };

        case ActionTypes.ADD_SERVER:
            return { ...state, servers: [...state.servers, action.payload] };

        case ActionTypes.UPDATE_SERVER:
            return {
                ...state,
                servers: state.servers.map(s =>
                    s.id === action.payload.id ? { ...s, ...action.payload } : s
                ),
                currentServer: state.currentServer?.id === action.payload.id
                    ? { ...state.currentServer, ...action.payload }
                    : state.currentServer
            };

        case ActionTypes.REMOVE_SERVER:
            return {
                ...state,
                servers: state.servers.filter(s => s.id !== action.payload),
                currentServer: state.currentServer?.id === action.payload ? null : state.currentServer
            };

        case ActionTypes.SET_CURRENT_SERVER:
            return { ...state, currentServer: action.payload };

        case ActionTypes.SET_SERVER_MEMBERS:
            return {
                ...state,
                serverMembers: {
                    ...state.serverMembers,
                    [action.payload.serverId]: action.payload.members
                }
            };

        // Rooms
        case ActionTypes.SET_ROOMS:
            return {
                ...state,
                rooms: {
                    ...state.rooms,
                    [action.payload.serverId]: action.payload.rooms
                }
            };

        case ActionTypes.ADD_ROOM:
            const serverRooms = state.rooms[action.payload.serverId] || [];
            return {
                ...state,
                rooms: {
                    ...state.rooms,
                    [action.payload.serverId]: [...serverRooms, action.payload.room]
                }
            };

        case ActionTypes.SET_CURRENT_ROOM:
            return { ...state, currentRoom: action.payload };

        // Messages
        case ActionTypes.SET_MESSAGES:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.roomId]: action.payload.messages
                }
            };

        case ActionTypes.ADD_MESSAGE:
            const roomMessages = state.messages[action.payload.roomId] || [];
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.roomId]: [...roomMessages, action.payload.message]
                }
            };

        case ActionTypes.UPDATE_MESSAGE:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.roomId]: state.messages[action.payload.roomId]?.map(m =>
                        m.id === action.payload.message.id
                            ? { ...m, ...action.payload.message }
                            : m
                    ) || []
                }
            };

        case ActionTypes.REMOVE_MESSAGE:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.roomId]: state.messages[action.payload.roomId]?.filter(
                        m => m.id !== action.payload.messageId
                    ) || []
                }
            };

        case ActionTypes.SET_TYPING:
            return {
                ...state,
                typingUsers: {
                    ...state.typingUsers,
                    [action.payload.roomId]: action.payload.users
                }
            };

        // UI
        case ActionTypes.TOGGLE_SIDEBAR:
            return { ...state, sidebarOpen: !state.sidebarOpen };

        case ActionTypes.TOGGLE_MEMBER_LIST:
            return { ...state, memberListOpen: !state.memberListOpen };

        case ActionTypes.SET_ACTIVE_PANEL:
            return { ...state, activePanel: action.payload };

        case ActionTypes.OPEN_MODAL:
            return {
                ...state,
                modals: {
                    ...state.modals,
                    [action.payload.modalId]: { open: true, data: action.payload.data }
                }
            };

        case ActionTypes.CLOSE_MODAL:
            return {
                ...state,
                modals: {
                    ...state.modals,
                    [action.payload]: { open: false, data: null }
                }
            };

        // Notifications
        case ActionTypes.ADD_NOTIFICATION:
            return {
                ...state,
                notifications: [action.payload, ...state.notifications].slice(0, 100)
            };

        case ActionTypes.SET_UNREAD_COUNT:
            return {
                ...state,
                unreadCounts: {
                    ...state.unreadCounts,
                    [action.payload.key]: action.payload.count
                }
            };

        // Presence
        case ActionTypes.SET_ONLINE_USERS:
            return { ...state, onlineUsers: action.payload };

        case ActionTypes.UPDATE_USER_STATUS:
            return {
                ...state,
                onlineUsers: {
                    ...state.onlineUsers,
                    [action.payload.userId]: action.payload.status
                }
            };

        // App State
        case ActionTypes.SET_LOADING:
            return { ...state, isLoading: action.payload };

        case ActionTypes.SET_ERROR:
            return { ...state, error: action.payload };

        case ActionTypes.SET_CONNECTION_STATUS:
            return { ...state, connectionStatus: action.payload };

        case ActionTypes.SET_THEME:
            return { ...state, theme: action.payload };

        case ActionTypes.RESET_STATE:
            return { ...initialState };

        default:
            return state;
    }
}

// Create context
const AppContext = createContext(null);
const AppDispatchContext = createContext(null);

/**
 * App Provider Component
 */
export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Persist theme preference
    useEffect(() => {
        localStorage.setItem('theme', state.theme);
        document.documentElement.setAttribute('data-theme', state.theme);
    }, [state.theme]);

    // Load persisted state on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            dispatch({ type: ActionTypes.SET_THEME, payload: savedTheme });
        }
    }, []);

    return (
        <AppContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppContext.Provider>
    );
}

/**
 * Use App State Hook
 */
export function useAppState() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppState must be used within AppProvider');
    }
    return context;
}

/**
 * Use App Dispatch Hook
 */
export function useAppDispatch() {
    const context = useContext(AppDispatchContext);
    if (!context) {
        throw new Error('useAppDispatch must be used within AppProvider');
    }
    return context;
}

/**
 * Selector Hooks for Performance
 */
export function useUser() {
    const { user, isAuthenticated } = useAppState();
    return useMemo(() => ({ user, isAuthenticated }), [user, isAuthenticated]);
}

export function useServers() {
    const { servers, currentServer } = useAppState();
    return useMemo(() => ({ servers, currentServer }), [servers, currentServer]);
}

export function useCurrentRoom() {
    const { currentRoom, currentServer } = useAppState();
    return useMemo(() => ({ currentRoom, currentServer }), [currentRoom, currentServer]);
}

export function useMessages(roomId) {
    const { messages, typingUsers } = useAppState();
    return useMemo(() => ({
        messages: messages[roomId] || [],
        typing: typingUsers[roomId] || []
    }), [messages, typingUsers, roomId]);
}

export function useOnlineStatus(userId) {
    const { onlineUsers } = useAppState();
    return useMemo(() => onlineUsers[userId] || 'offline', [onlineUsers, userId]);
}

export function useUIState() {
    const { sidebarOpen, memberListOpen, activePanel, modals } = useAppState();
    return useMemo(() => ({
        sidebarOpen,
        memberListOpen,
        activePanel,
        modals
    }), [sidebarOpen, memberListOpen, activePanel, modals]);
}

export function useUnreadCount(key) {
    const { unreadCounts } = useAppState();
    return useMemo(() => unreadCounts[key] || 0, [unreadCounts, key]);
}

/**
 * Action Creator Hooks
 */
export function useAppActions() {
    const dispatch = useAppDispatch();

    return useMemo(() => ({
        // Auth
        setUser: (user) => dispatch({ type: ActionTypes.SET_USER, payload: user }),
        logout: () => dispatch({ type: ActionTypes.LOGOUT }),
        updateSettings: (settings) => dispatch({ type: ActionTypes.UPDATE_USER_SETTINGS, payload: settings }),

        // Servers
        setServers: (servers) => dispatch({ type: ActionTypes.SET_SERVERS, payload: servers }),
        addServer: (server) => dispatch({ type: ActionTypes.ADD_SERVER, payload: server }),
        updateServer: (server) => dispatch({ type: ActionTypes.UPDATE_SERVER, payload: server }),
        removeServer: (serverId) => dispatch({ type: ActionTypes.REMOVE_SERVER, payload: serverId }),
        setCurrentServer: (server) => dispatch({ type: ActionTypes.SET_CURRENT_SERVER, payload: server }),

        // Rooms
        setRooms: (serverId, rooms) => dispatch({ type: ActionTypes.SET_ROOMS, payload: { serverId, rooms } }),
        addRoom: (serverId, room) => dispatch({ type: ActionTypes.ADD_ROOM, payload: { serverId, room } }),
        setCurrentRoom: (room) => dispatch({ type: ActionTypes.SET_CURRENT_ROOM, payload: room }),

        // Messages
        setMessages: (roomId, messages) => dispatch({ type: ActionTypes.SET_MESSAGES, payload: { roomId, messages } }),
        addMessage: (roomId, message) => dispatch({ type: ActionTypes.ADD_MESSAGE, payload: { roomId, message } }),
        updateMessage: (roomId, message) => dispatch({ type: ActionTypes.UPDATE_MESSAGE, payload: { roomId, message } }),
        removeMessage: (roomId, messageId) => dispatch({ type: ActionTypes.REMOVE_MESSAGE, payload: { roomId, messageId } }),
        setTyping: (roomId, users) => dispatch({ type: ActionTypes.SET_TYPING, payload: { roomId, users } }),

        // UI
        toggleSidebar: () => dispatch({ type: ActionTypes.TOGGLE_SIDEBAR }),
        toggleMemberList: () => dispatch({ type: ActionTypes.TOGGLE_MEMBER_LIST }),
        setActivePanel: (panel) => dispatch({ type: ActionTypes.SET_ACTIVE_PANEL, payload: panel }),
        openModal: (modalId, data) => dispatch({ type: ActionTypes.OPEN_MODAL, payload: { modalId, data } }),
        closeModal: (modalId) => dispatch({ type: ActionTypes.CLOSE_MODAL, payload: modalId }),

        // Notifications
        addNotification: (notification) => dispatch({ type: ActionTypes.ADD_NOTIFICATION, payload: notification }),
        setUnreadCount: (key, count) => dispatch({ type: ActionTypes.SET_UNREAD_COUNT, payload: { key, count } }),

        // Presence
        setOnlineUsers: (users) => dispatch({ type: ActionTypes.SET_ONLINE_USERS, payload: users }),
        updateUserStatus: (userId, status) => dispatch({ type: ActionTypes.UPDATE_USER_STATUS, payload: { userId, status } }),

        // App State
        setLoading: (loading) => dispatch({ type: ActionTypes.SET_LOADING, payload: loading }),
        setError: (error) => dispatch({ type: ActionTypes.SET_ERROR, payload: error }),
        setConnectionStatus: (status) => dispatch({ type: ActionTypes.SET_CONNECTION_STATUS, payload: status }),
        setTheme: (theme) => dispatch({ type: ActionTypes.SET_THEME, payload: theme }),

        // Bulk
        reset: () => dispatch({ type: ActionTypes.RESET_STATE })
    }), [dispatch]);
}

export default AppContext;
