// import NextAuth, { type DefaultSession } from 'next-auth';

// export type ExtendedUser = DefaultSession['user'] & {
// 	role: 'ADMIN' | 'USER';
// };

// declare module 'next-auth';
// {
// 	interface session {
// 		user: ExtendedUser;
// 	}
// }

// import { JWT } from 'next-auth/jwt';

// declare module 'next-auth/jwt' {
// 	interface JWT {
// 		role?: 'ADMIN' | 'USER';
// 	}
// }

import { UserRole } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';
import { DefaultUser } from 'next-auth/adapters';

export type ExtendedUser = DefaultSession['user'] & {
	// role: 'ADMIN' | 'USER';
	role: UserRole;
	isTwoFactorEnable: boolean;
	isOAuth: boolean;
};

declare module 'next-auth' {
	interface Session {
		user: ExtendedUser;
	}

	interface User extends DefaultUser {
		role?: 'ADMIN' | 'USER';
	}
}

import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
	interface JWT {
		role?: 'ADMIN' | 'USER';
	}
}
