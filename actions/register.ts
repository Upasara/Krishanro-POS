'use server';
import * as z from 'zod';
import { RegistrationSchema } from '@/schemas';
import { error } from 'console';

type RegistrationSchemaFields = z.infer<typeof RegistrationSchema>;

export const register = async (values: RegistrationSchemaFields) => {
	console.log(values);
	//check server side validations to check email and password
	const validatedField = RegistrationSchema.safeParse(values);

	//safeParse is from zod lib
	if (!validatedField.success) {
		return { error: 'Invalid fields' };
	}

	return { success: 'Email sent' };
};
