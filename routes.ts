/**
 * An array of routes that are accessible to the public
 * There routes don't require authentication
 * @type{string[]}
 */
export const publicRoutes = ['/', '/newVerification'];

//when user need to change the email from settings page
//newVerification mail page should be in public route because logout users need to access this page.

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
