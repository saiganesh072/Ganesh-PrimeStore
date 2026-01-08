import { analytics } from './analytics.js';
import { CONFIG } from './config.js';

export class Router {
    constructor(routes) {
        this.routes = routes;
        // Use the centralized config for base path
        this.basePath = CONFIG.getBasePath();
        this.root = document.getElementById('app');

        // Handle navigation events
        window.addEventListener('popstate', () => this.loadRoute(location.pathname));

        // Intercept clicks on links
        document.body.addEventListener('click', e => {
            const link = e.target.matches('[data-link]') ? e.target : e.target.closest('a[data-link]');

            if (link) {
                e.preventDefault();
                this.navigateTo(link.getAttribute('href')); // Use getAttribute to get raw value
            }
        });

        // Handle initial load
        this.loadRoute(location.pathname);
    }

    navigateTo(url) {
        // Construct full URL including base path for pushState
        let fullPath = url;

        // Check if the URL already includes the base path
        if (this.basePath && url.startsWith(this.basePath)) {
            // URL already has base path, use as-is
            fullPath = url;
        } else if (url.startsWith('/')) {
            // URL is absolute but without base path, add it
            fullPath = this.basePath + url;
        }
        // For relative URLs or if basePath is empty, use as-is

        history.pushState(null, null, fullPath);
        this.loadRoute(fullPath);
    }


    async loadRoute(pathname) {
        // Normalize path by removing base path for matching
        let path = pathname;

        // Safety check for base path presence
        if (this.basePath && path.startsWith(this.basePath)) {
            path = path.substring(this.basePath.length);
        }

        // Handle empty path or just slash
        if (path === '' || path === '/') {
            path = '/index.html';
            // Prefer explicit root route from config if exists
            if (this.routes.find(r => r.path === '/')) path = '/';
        }

        let match = null;
        let routeParams = {};

        for (const route of this.routes) {
            let regexPath = route.path;

            // Regex for dynamic routes
            // :slug -> ([^/]+)
            // p-:id -> p-([^/]+)
            if (route.path.includes(':slug') && route.path.includes(':id')) {
                // Specific complex route handler
                regexPath = route.path
                    .replace(':slug', '([^/]+)')
                    .replace('p-:id', 'p-([^/]+)');
            } else {
                // Generic handler
                regexPath = route.path.replace(/:\w+/g, '([^/]+)');
            }

            regexPath = regexPath.replace(/\//g, '\\/'); // Escape slashes
            const regex = new RegExp(`^${regexPath}$`);
            const potentialMatch = path.match(regex);

            if (potentialMatch) {
                match = route;
                const values = potentialMatch.slice(1);

                if (route.path.includes(':slug') && route.path.includes(':id')) {
                    routeParams['slug'] = values[0];
                    routeParams['id'] = values[1];
                } else {
                    const keys = (route.path.match(/:\w+/g) || []).map(k => k.slice(1));
                    keys.forEach((key, i) => {
                        routeParams[key] = values[i];
                    });
                }
                break;
            }
        }

        if (!match) {
            if (this.routes.find(r => r.path === '/404')) {
                match = this.routes.find(r => r.path === '/404');
            } else {
                console.warn("No route found for", pathname);
                match = this.routes.find(r => r.path === '/') || this.routes[0];
            }
        }

        if (match && match.view) {
            this.root.innerHTML = await match.view(routeParams);

            if (match.onMounted) {
                match.onMounted(routeParams);
            }

            // Scroll to top
            window.scrollTo(0, 0);

            // Analytics
            analytics.trackPageView(match.name || 'unknown', {
                path: pathname,
                params: routeParams
            });
        }
    }
}
