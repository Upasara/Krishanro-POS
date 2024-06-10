import * as z from 'zod';

export const LoginSchema = z.object({
	email: z.string().min(1, 'Email is required').email({
		message: 'Invalid email',
	}),
	password: z.string().min(1, {
		message: 'Password is required',
	}),
});

export const RegistrationSchema = z
	.object({
		firstName: z
			.string()
			.min(1, {
				message: 'First Name is required',
			})
			.max(100),
		lastName: z
			.string()
			.min(1, {
				message: 'Last Name is required',
			})
			.max(100),
		email: z.string().min(1, 'Email is required').email({
			message: 'Invalid Email',
		}),
		password: z.string().min(1, 'Password is required').min(6, {
			message:
				'Minimum six characters, at least one uppercase letter, one lowercase letter and one number are required',
		}),
		confirmPassword: z.string().min(1, 'Password confirmation is required'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Password do not match',
	});
