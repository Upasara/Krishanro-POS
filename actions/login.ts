'use server';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { auth, signIn } from '@/auth';
import { DefaultRedirect } from '@/routes';
import { AuthError } from 'next-auth';
import { error } from 'console';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/token';
import { verificationEmail } from '@/lib/mail';

type LoginSchemaFields = z.infer<typeof LoginSchema>;

export const login = async (values: LoginSchemaFields) => {
	//check server side validations to check email and password
	const validatedField = LoginSchema.safeParse(values);

	//safeParse is from zod lib
	if (!validatedField.success) {
		return { error: 'Invalid fields' };
	}
	const { email, password } = validatedField.data;

	//to block the user to sign in without confirm their email

	const existingUser = await getUserByEmail(email);

	if (!existingUser || !existingUser.email || !existingUser.password) {
		//user shouldn't login with credential, if that user has OAuth
		return { error: 'Email does not exist' };
	}

	//User exists but if that user does not verify the token by email
	//just block the user from login function
	//even without this code we have block the user from auth.ts callback
	//you always have to match the logic with auth
	if (!existingUser.emailVerified) {
		// generate a new verification token
		const verificationToken = await generateVerificationToken(existingUser.email);

		//sending the mail again with newly generated token
		await verificationEmail(verificationToken?.email, verificationToken?.token);

		return { success: 'Email verification has been sent again!' };
	}

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DefaultRedirect,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Invalid Credentials!' };
				case 'CallbackRouteError':
					return { error: 'Route Error: Invalid Credentials!' };
				default: {
					return { error: 'Something went wrong!' };
				}
			}
		}
		throw error;
	}
};

//This ensures that only errors specifically related to authentication
//(defined by AuthError class or type) are handled in this section.
