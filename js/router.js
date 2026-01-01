import { analytics } from './analytics.js';

export class Router {
    constructor(routes) {
        this.routes = routes;
        this.root = document.getElementById('app');

        // Handle navigation events
        window.addEventListener('popstate', () => this.loadRoute(location.pathname));

        // Intercept clicks on links
        document.body.addEventListener('click', e => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigateTo(e.target.href);
            } else if (e.target.closest('a')) {
                // Also handle standard <a> tags if they are internal links
                const link = e.target.closest('a');
                // Check if it's an internal link
                if (link.hostname === window.location.hostname && !link.hash) {
                    // Simple check, can be made more robust
                    e.preventDefault();
                    this.navigateTo(link.href);
                }
            }
        });

        // Handle initial load
        this.loadRoute(location.pathname);
    }

    navigateTo(url) {
        history.pushState(null, null, url);
        this.loadRoute(location.pathname);
    }

    async loadRoute(pathname) {
        // Adjust for GitHub Pages base path if needed
        // For now, assuming root or handling via <base> tag logic if complex

        const path = pathname === '/' ? '/index.html' : pathname; // Normalizing root
        let match = null;
        let routeParams = {};

        for (const route of this.routes) {
            let regexPath = route.path;

            // Special handling for requested complex route: /:slug/p-:id
            // We'll replace :slug with [^/]+ and :id with [^/]+
            if (route.path.includes(':slug') && route.path.includes(':id')) {
                regexPath = route.path
                    .replace(':slug', '([^/]+)')
                    .replace('p-:id', 'p-([^/]+)'); // Ensure p- prefix is handled
            } else {
                regexPath = route.path.replace(/:\w+/g, '([^/]+)');
            }

            regexPath = regexPath.replace(/\//g, '\\/'); // Escape slashes
            const regex = new RegExp(`^${regexPath}$`);
            const potentialMatch = pathname.match(regex);

            if (potentialMatch) {
                match = route;
                const values = potentialMatch.slice(1);

                // Map values to keys
                // For /:slug/p-:id, keys are ['slug', 'id']
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
            // Fallback to home or 404
            if (this.routes.find(r => r.path === '/404')) {
                match = this.routes.find(r => r.path === '/404');
            } else {
                console.log("No route found for", pathname);
                match = this.routes[0]; // Default to home for now
            }
        }

        if (match && match.view) {
            this.root.innerHTML = await match.view(routeParams);

            // Post-render lifecycle (e.g., re-bind listeners)
            if (match.onMounted) {
                match.onMounted(routeParams);
            }

            // Analytics
            analytics.trackPageView(match.name || 'unknown', {
                path: pathname,
                params: routeParams
            });
        }
    }
}
