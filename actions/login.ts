'use server';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { error } from 'console';

type LoginSchemaFields = z.infer<typeof LoginSchema>;

export const login = async (values: LoginSchemaFields) => {
	//check server side validations to check email and password
	const validatedField = LoginSchema.safeParse(values);

	//safeParse is from zod lib
	if (!validatedField.success) {
		return { error: 'Invalid fields' };
	}

	return { success: 'Email sent' };
};
