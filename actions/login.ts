'use server';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { auth, signIn } from '@/auth';
import { DefaultRedirect } from '@/routes';
import { AuthError } from 'next-auth';
import { error } from 'console';

type LoginSchemaFields = z.infer<typeof LoginSchema>;

export const login = async (values: LoginSchemaFields) => {
	//check server side validations to check email and password
	const validatedField = LoginSchema.safeParse(values);

	//safeParse is from zod lib
	if (!validatedField.success) {
		return { error: 'Invalid fields' };
	}
	const { email, password } = validatedField.data;

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DefaultRedirect,
		});
	} catch (e) {
		if (e instanceof AuthError) {
			switch (e.type) {
				case 'CredentialsSignin':
					return { error: 'Invalid Credentials!' };
				default: {
					return { error: 'Something went wrong!' };
				}
			}
		}
		throw e;
	}
};

//This ensures that only errors specifically related to authentication
//(defined by AuthError class or type) are handled in this section.
