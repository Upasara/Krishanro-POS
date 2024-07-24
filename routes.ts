/**
 * An array of routes that are accessible to the public
 * There routes don't require authentication
 * @type{string[]}
 */
export const publicRoutes = ['/'];

/**
 * An array of routes that are used for authentication
 * There routes will redirect logged in users to settings
 * @type {string[]}
 */
export const authRoutes = ['/login', '/registration', '/error'];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth/';

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DefaultRedirect = '/settings';
