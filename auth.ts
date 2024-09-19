import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './lib/db';
import { getUserByEmail, getUserById } from './data/user';
import { UserRole } from '@prisma/client';
import { getTwoFactorConfirmationByUserId } from './data/twoFactorConfirmation';
import { getAccountByUserId } from './data/account';

export const { auth, handlers, signIn, signOut } = NextAuth({
	pages: {
		signIn: '/login',
		//next specify the route we need to redirect when something goes wrong
		error: '/error',
	},
	events: {
		async linkAccount({ user }) {
			await db.user.update({ where: { id: user.id }, data: { emailVerified: new Date() } });
		},

		// user from OAuth where to match the user id then update the email verification with the date that user had been created
	},
	callbacks: {
		//total security
		async signIn({ user, account }: any) {
			//Allow OAuth without email verification
			if (account?.provider !== 'credentials') return true;

			//if the provider is : google !== credential:email // password

			//clg => provider: 'credentials'

			const existingUser = await getUserById(user.id);

			//Prevent signIn without email verification
			if (!existingUser?.emailVerified) return false;

			//to check 2fa
			if (existingUser.isTwoFactorEnable) {
				const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

				if (!twoFactorConfirmation) return false;

				//if that user has 2fa confirmation then delete 2fa for next signIn
				await db.twoFactorConfirmation.delete({
					where: { id: twoFactorConfirmation.id },
				});
			}

			return true;
		},
		async jwt({ token }) {
			//written this custom field in jwt then you will get this in session token
			//token.customField = 'test';

			//token.sub is not there That's means I am log out
			if (!token.sub) return token;

			//uid in db === token.sub || getting the user id from db
			const existingUser = await getUserById(token.sub);

			// there is no existing user then return the token again
			if (!existingUser) return token;

			//to update update user details from the settings then you need to sign it to token manually

			//getting existing Oauth acc
			const existingAccount = getAccountByUserId(existingUser.id);

			//Assign an OAuth account to token then turn it to boolean value
			token.isOAuth = !!existingAccount;

			//Assign a name ad email to token
			token.name = existingUser.name;
			token.email = existingUser.email;

			//Assign a role to token
			token.role = existingUser.role;

			//Assign a two factor enable to token
			token.isTwoFactorEnable = existingUser.isTwoFactorEnable;

			return token;
			//token is pass to session callback to get the sub as user ID
		},
		async session({ token, session }) {
			//session is what we getting from 'const session= await auth()' to extend this session we need to extend jwt
			//jwt what's return the token to extend jwt
			token.sub && session.user ? (session.user.id = token.sub) : null;

			if (token.role && session.user) {
				session.user.role = token.role as UserRole;
			}
			if (session.user) {
				session.user.isTwoFactorEnable = token.isTwoFactorEnable as boolean;
			}

			if (session.user) {
				session.user.name = token.name;
				session.user.email = token.email as string;
				session.user.isOAuth = token.isOAut as boolean;
			}

			return session;
		},
	},
	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
	...authConfig,
});

//to extend the session we need to extend jwt before
//that's why we use callback
//we need toke's sub : user id then pass back to session callback.
