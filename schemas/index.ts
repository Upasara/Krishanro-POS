import * as z from 'zod';

export const LoginSchema = z.object({
	email: z.string().email({
		message: 'Email is required',
	}),
	password: z.string().min(1, {
		message: 'Password is required',
	}),
});

export const RegistrationSchema = z.object({
	firstName: z.string().min(1, {
		message: 'First Name is required',
	}),
	lastName: z.string().min(1, {
		message: 'Last Name is required',
	}),
	email: z.string().email({
		message: 'Email is required',
	}),
	password: z.string().min(6, {
		message:
			'Minimum six characters, at least one uppercase letter, one lowercase letter and one number are required',
	}),
});
