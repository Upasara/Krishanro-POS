'use server';
import * as z from 'zod';
import { RegistrationSchema } from '@/schemas';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

type RegistrationSchemaFields = z.infer<typeof RegistrationSchema>;

export const register = async (values: RegistrationSchemaFields) => {
	//check server side validations to check email and password
	const validatedField = RegistrationSchema.safeParse(values);

	//safeParse is from zod lib
	if (!validatedField.success) {
		return { error: 'Invalid fields' };
	}

	//destructure field values from reg form

	const { firstName, lastName, email, confirmPassword } = validatedField.data;

	//to encrypt passwords
	//10 is the salt to encrypt this passwords
	const hashedPassword = await bcrypt.hash(confirmPassword, 10);

	//db query to get the email from user table via export function
	const existingUser = await getUserByEmail(email);

	//check the email from existing user

	if (existingUser) {
		return {
			error: 'Email already in use!',
		};
	}

	//to create user

	await db.user.create({
		data: {
			name: `${firstName} ${lastName}`,
			email,
			password: hashedPassword,
		},
	});

	//send verification email

	return { success: 'Email verification sent and user created.' };
};
