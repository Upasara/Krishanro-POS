import type { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { LoginSchema } from './schemas';
import { getUserByEmail } from './data/user';
import bcrypt from 'bcryptjs';

//the reason why we check login schema check because some users can by pass this login action
export default {
	providers: [
		credentials({
			async authorize(credentials) {
				const validatedFields = LoginSchema.safeParse(credentials);

				if (validatedFields.success) {
					const { email, password } = validatedFields.data;

					//to check matching emails in db even tho pass the credential
					const user = await getUserByEmail(email);

					//when user login via gmail then come around user the credential provider
					//we need to block the user
					// just like trying to login with google's id but that no passwords since registered
					//google services provider
					if (!user || !user.password) return null;

					const passwordMatch = await bcrypt.compare(password, user.password);

					if (passwordMatch) return user;
				}

				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
