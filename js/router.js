import { analytics } from './analytics.js';

export class Router {
    constructor(routes, basePath = '') {
        this.routes = routes;
        this.basePath = basePath;
        this.root = document.getElementById('app');

        // Handle navigation events
        window.addEventListener('popstate', () => this.loadRoute(location.pathname));

        // Intercept clicks on links
        document.body.addEventListener('click', e => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigateTo(e.target.href);
            } else if (e.target.closest('a')) {
                const link = e.target.closest('a');
                // Check if it's an internal link
                if (link.matches('[data-link]') || (link.hostname === window.location.hostname && !link.hash)) {
                    e.preventDefault();
                    this.navigateTo(link.href);
                }
            }
        });

        // Handle initial load
        this.loadRoute(location.pathname);
    }

    navigateTo(url) {
        // If url is full URL, extract path
        // If url is relative path, append to base?
        // Actually usually we pass full path e.g. /shop

        // If we click <a href="/shop">, url is https://domain/shop.
        // We need https://domain/Repo/shop if base is Repo.
        // My click listener passes `e.target.href` which is FULL URL.
        // So `navigateTo` receives full URL.
        // history.pushState expects relative or full path.

        // If I pass full URL to pushState, it works.
        // loadRoute takes pathname. 
        // Window.location.pathname will include /Repo/shop.
        // My loadRoute logic strips base path. So routing logic is safe.
        // The ISSUE is the <a href> in the HTML.
        // If I write <a href="/shop">, browser resolves to domain.com/shop.
        // I need <a href="/Repo/shop">.

        // So I MUST update all Views to prefix links with the Repo path.
        // Since I cannot easily inject `basePath` into every view function without refactoring all of them to accept props...
        // I will use a clever trick: I will define a global `APP_BASE` constant or helper class that views use.
        // OR better: Update `index.html` to include `<base href="/Ganesh-PrimeStore/">`?
        // No, `<base>` messes up anchor links (#).

        // I will do a bulk replace in all View files to use a placeholder or relative paths?
        // Relative paths `href="shop"` from `index.html` (at /Repo/) goes to `/Repo/shop`.
        // From `/Repo/shop` (which is virtual), `href="shop"` goes to `/Repo/shop/shop`. BAD.

        // Correct approach: Use absolute paths with Repo prefix.
        // I will update the Views to use a variable.
        const basePath = window.location.pathname.includes('/Ganesh-PrimeStore') ? '/Ganesh-PrimeStore' : '';
        return `... <a href="${basePath}/shop"> ...`;
    }

    async loadRoute(pathname) {
        // Normalize path by removing base path
        let path = pathname;
        if (this.basePath && path.startsWith(this.basePath)) {
            path = path.substring(this.basePath.length);
        }
        if (path === '' || path === '/') {
            path = '/index.html'; // Default mapping, but let's stick to '/' being home if configured
            if (this.routes.find(r => r.path === '/')) path = '/';
        }

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
            const potentialMatch = path.match(regex);

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
