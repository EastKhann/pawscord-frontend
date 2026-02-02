// frontend/src/utils/routerManager.js

/**
 * 🗺️ Router Manager
 * Advanced routing with code splitting, prefetching, and transitions
 */

class RouterManager {
    constructor(options = {}) {
        this.routes = new Map();
        this.currentRoute = null;
        this.history = [];
        this.maxHistory = options.maxHistory || 50;
        this.scrollBehavior = options.scrollBehavior || 'smooth';
        this.transitionDuration = options.transitionDuration || 300;

        this.listeners = new Map();
        this.prefetchedRoutes = new Set();
        this.moduleCache = new Map();

        this.init();
    }

    /**
     * Initialize
     */
    init() {
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            const path = window.location.pathname;
            this.navigate(path, { pushState: false, state: e.state });
        });

        // Intercept link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-route]');

            if (link && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                this.navigate(link.getAttribute('href') || link.dataset.route);
            }
        });

        if (import.meta.env.MODE === 'development') {
            console.log('🗺️ [Router] Initialized');
        }
    }

    /**
     * Register route
     */
    register(path, component, options = {}) {
        this.routes.set(path, {
            component,
            lazy: options.lazy || false,
            prefetch: options.prefetch !== false,
            transition: options.transition || 'fade',
            ...options
        });

        if (import.meta.env.MODE === 'development') {
            console.log(`✅ [Router] Registered: ${path}`);
        }
    }

    /**
     * Register multiple routes
     */
    registerRoutes(routes) {
        Object.keys(routes).forEach(path => {
            this.register(path, routes[path].component, routes[path]);
        });
    }

    /**
     * Navigate to route
     */
    async navigate(path, options = {}) {
        const {
            pushState = true,
            replace = false,
            state = {},
            scroll = true
        } = options;

        const route = this.matchRoute(path);

        if (!route) {
            console.warn(`Route not found: ${path}`);
            this.emit('notFound', { path });
            return;
        }

        // Emit beforeNavigate
        const shouldNavigate = await this.emit('beforeNavigate', {
            from: this.currentRoute,
            to: path,
            route
        });

        if (shouldNavigate === false) {
            return;
        }

        // Update browser history
        if (pushState) {
            if (replace) {
                window.history.replaceState(state, '', path);
            } else {
                window.history.pushState(state, '', path);
            }
        }

        // Update history
        this.addToHistory(path);

        // Load component if lazy
        let component = route.component;
        if (route.lazy && typeof route.component === 'function') {
            component = await this.loadLazyComponent(path, route);
        }

        // Transition
        await this.performTransition(component, route.transition);

        // Update current route
        const previousRoute = this.currentRoute;
        this.currentRoute = {
            path,
            component,
            route,
            params: this.extractParams(path, route.path)
        };

        // Scroll behavior
        if (scroll) {
            this.handleScroll(options.scrollPosition);
        }

        // Emit afterNavigate
        this.emit('afterNavigate', {
            from: previousRoute,
            to: this.currentRoute
        });

        if (import.meta.env.MODE === 'development') {
            console.log(`🗺️ [Router] Navigated to: ${path}`);
        }
    }

    /**
     * Match route
     */
    matchRoute(path) {
        // Exact match
        if (this.routes.has(path)) {
            return { path, ...this.routes.get(path) };
        }

        // Pattern match
        for (const [routePath, routeConfig] of this.routes) {
            const pattern = this.pathToRegex(routePath);
            if (pattern.test(path)) {
                return { path: routePath, ...routeConfig };
            }
        }

        return null;
    }

    /**
     * Path to regex
     */
    pathToRegex(path) {
        const pattern = path
            .replace(/\/:(\w+)/g, '/([^/]+)') // :id -> ([^/]+)
            .replace(/\*/g, '.*');            // * -> .*

        return new RegExp(`^${pattern}$`);
    }

    /**
     * Extract params from path
     */
    extractParams(path, pattern) {
        const params = {};
        const pathParts = path.split('/');
        const patternParts = pattern.split('/');

        patternParts.forEach((part, i) => {
            if (part.startsWith(':')) {
                const paramName = part.slice(1);
                params[paramName] = pathParts[i];
            }
        });

        return params;
    }

    /**
     * Load lazy component
     */
    async loadLazyComponent(path, route) {
        // Check cache
        if (this.moduleCache.has(path)) {
            return this.moduleCache.get(path);
        }

        try {
            const module = await route.component();
            const component = module.default || module;

            this.moduleCache.set(path, component);
            return component;
        } catch (error) {
            console.error(`Failed to load component for ${path}:`, error);
            this.emit('loadError', { path, error });
            throw error;
        }
    }

    /**
     * Prefetch route
     */
    async prefetch(path) {
        if (this.prefetchedRoutes.has(path)) {
            return;
        }

        const route = this.matchRoute(path);
        if (!route || !route.lazy) {
            return;
        }

        try {
            await this.loadLazyComponent(path, route);
            this.prefetchedRoutes.add(path);

            if (import.meta.env.MODE === 'development') {
                console.log(`🔮 [Router] Prefetched: ${path}`);
            }
        } catch (error) {
            console.error(`Failed to prefetch ${path}:`, error);
        }
    }

    /**
     * Prefetch visible links
     */
    prefetchVisibleLinks() {
        const links = document.querySelectorAll('a[data-route][data-prefetch]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const path = entry.target.getAttribute('href') || entry.target.dataset.route;
                    this.prefetch(path);
                    observer.unobserve(entry.target);
                }
            });
        });

        links.forEach(link => observer.observe(link));
    }

    /**
     * Perform transition
     */
    async performTransition(component, transitionType) {
        const container = document.querySelector('[data-router-view]');
        if (!container) return;

        const transitions = {
            fade: async () => {
                container.style.opacity = '0';
                await new Promise(r => setTimeout(r, this.transitionDuration));
                container.innerHTML = '';
                // Render component
                container.style.opacity = '1';
            },
            slide: async () => {
                container.style.transform = 'translateX(100%)';
                await new Promise(r => setTimeout(r, this.transitionDuration));
                container.innerHTML = '';
                container.style.transform = 'translateX(0)';
            },
            none: () => {
                container.innerHTML = '';
            }
        };

        const transition = transitions[transitionType] || transitions.fade;
        await transition();
    }

    /**
     * Handle scroll
     */
    handleScroll(position) {
        if (position) {
            window.scrollTo({
                top: position.top || 0,
                left: position.left || 0,
                behavior: this.scrollBehavior
            });
        } else {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: this.scrollBehavior
            });
        }
    }

    /**
     * Add to history
     */
    addToHistory(path) {
        this.history.push({
            path,
            timestamp: Date.now()
        });

        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }
    }

    /**
     * Go back
     */
    back() {
        window.history.back();
    }

    /**
     * Go forward
     */
    forward() {
        window.history.forward();
    }

    /**
     * Event emitter
     */
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    off(event, callback) {
        if (!this.listeners.has(event)) return;

        const callbacks = this.listeners.get(event);
        const index = callbacks.indexOf(callback);

        if (index > -1) {
            callbacks.splice(index, 1);
        }
    }

    async emit(event, data) {
        if (!this.listeners.has(event)) return true;

        const results = [];
        for (const callback of this.listeners.get(event)) {
            const result = await callback(data);
            results.push(result);
        }

        return !results.includes(false);
    }

    /**
     * Get current route
     */
    getCurrentRoute() {
        return this.currentRoute;
    }

    /**
     * Get history
     */
    getHistory() {
        return this.history;
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.moduleCache.clear();
        this.prefetchedRoutes.clear();
    }
}

// Global instance
export const router = new RouterManager();

/**
 * React Hook - Router
 */
export const useRouter = () => {
    const [currentRoute, setCurrentRoute] = React.useState(router.getCurrentRoute());

    React.useEffect(() => {
        const handleNavigate = (data) => {
            setCurrentRoute(data.to);
        };

        router.on('afterNavigate', handleNavigate);

        return () => {
            router.off('afterNavigate', handleNavigate);
        };
    }, []);

    const navigate = React.useCallback((path, options) => {
        return router.navigate(path, options);
    }, []);

    const back = React.useCallback(() => {
        router.back();
    }, []);

    const forward = React.useCallback(() => {
        router.forward();
    }, []);

    return {
        currentRoute,
        navigate,
        back,
        forward,
        router
    };
};

/**
 * React Hook - Route Params
 */
export const useParams = () => {
    const { currentRoute } = useRouter();
    return currentRoute?.params || {};
};

/**
 * React Component - Link
 */
export const Link = ({ to, prefetch = true, children, className, ...props }) => {
    const handleMouseEnter = () => {
        if (prefetch) {
            router.prefetch(to);
        }
    };

    return (
        <a
            href={to}
            data-route={to}
            data-prefetch={prefetch}
            className={className}
            onMouseEnter={handleMouseEnter}
            {...props}
        >
            {children}
        </a>
    );
};

export default RouterManager;


