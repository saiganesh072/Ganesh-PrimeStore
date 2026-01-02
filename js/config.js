export const CONFIG = {
    // repository name for GitHub Pages (e.g. '/RepoName'). 
    // Set to '' for custom domains or localhost root.
    // We automatically detect if we are on GitHub Pages to set this, 
    // but ideally we hardcode it to ensure stability if the detection fails.
    REPO_NAME: '/Ganesh-PrimeStore',

    // Feature flags
    MOCK_AUTH: true,

    // Helper to get base path dynamically
    getBasePath: () => {
        return window.location.hostname.includes('github.io')
            ? '/Ganesh-PrimeStore'
            : '';
    }
};
