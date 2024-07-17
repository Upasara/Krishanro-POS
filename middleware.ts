import authConfig from './auth.config';
import NextAuth from 'next-auth';

import { DefaultRedirect, apiAuthPrefix, authRoutes, publicRoutes } from './routes';

//since we are using prisma we have to destructure
//auth from authConfig.ts file
const { auth } = NextAuth(authConfig);

export default auth((req) => {
	// req.auth
	const { nextUrl } = req;
	//to check whether log in
	const isLoggedIn = !!req.auth;

	//we always allow this route, next auth need this to work properly
	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	//public routes
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	//privet routes
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

	//always allow this route
	if (isApiAuthRoute) {
		return undefined;
	}

	// Always Allow API Auth Route: If the requested route is an API
	// auth route,
	//  the function returns undefined,
	//  allowing the request to proceed.

	//auth required paths
	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DefaultRedirect, nextUrl));
		}
		return undefined;
	}

	//If the requested route requires authentication (isAuthRoute),
	//it checks if the user is logged in:
	//If logged in, it redirects the user to DefaultRedirect.
	//If not logged in, it allows the request to proceed,
	//possibly leading to a login prompt.

	if (!isLoggedIn && !isPublicRoute) {
		return Response.redirect(new URL('/login', nextUrl));
	}

	return undefined;
});

// Optionally, don't invoke Middleware on some paths
//this is just a matcher for invoke middleware.
export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
