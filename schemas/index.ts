import { UserRole } from '@prisma/client';
import * as z from 'zod';

export const LoginSchema = z.object({
	email: z.string().min(1, 'Email is required').email({
		message: 'Invalid email',
	}),
	password: z.string().min(1, {
		message: 'Password is required',
	}),
	code: z.optional(z.string()),
});

export const RegistrationSchema = z
	.object({
		firstName: z
			.string()
			.min(1, {
				message: 'First name is required',
			})
			.max(30, 'First name must contain at most 30 character(s)'),
		lastName: z
			.string()
			.min(1, {
				message: 'Last name is required',
			})
			.max(30, 'Last name must contain at most 30 character(s)'),
		email: z.string().min(1, 'Email is required').email({
			message: 'Invalid Email',
		}),
		password: z
			.string()
			.min(1, 'Password is required')
			.min(8, {
				message:
					'Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number are required',
			})
			.regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
			.regex(new RegExp('.*[a-z].*'), 'One lowercase character')
			.regex(new RegExp('.*\\d.*'), 'One number')
			.regex(
				new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
				'One special character'
			),
		confirmPassword: z.string().min(1, 'Password confirmation is required'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Password do not match',
	});

export const ResetSchema = z.object({
	email: z.string().min(1, 'Email is required').email({
		message: 'Invalid email',
	}),
});

export const ResetPasswordSchema = z
	.object({
		newPassword: z
			.string()
			.min(1, 'Password is required')
			.min(8, {
				message:
					'Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number are required',
			})
			.regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
			.regex(new RegExp('.*[a-z].*'), 'One lowercase character')
			.regex(new RegExp('.*\\d.*'), 'One number')
			.regex(
				new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
				'One special character'
			),
		confirmNewPassword: z.string().min(1, 'Password confirmation is required'),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		path: ['confirmNewPassword'],
		message: 'Password do not match',
	});

export const SettingsSchema = z
	.object({
		name: z.optional(
			z
				.string()
				.min(1, 'Name is required to click save')
				.max(60, 'Name must contain at most 30 character(s)')
		),
		email: z.optional(
			z.string().min(1, 'Email is requried to change').email({ message: 'Invalid Email' })
		),
		isTwoFactorEnabled: z.optional(z.boolean()),
		role: z.enum([UserRole.ADMIN, UserRole.USER]),
		password: z.optional(z.string().min(1, 'Password confirmation is required')),
		newPassword: z.optional(
			z
				.string()
				.min(1, 'New password is required')
				.min(8, {
					message:
						'Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number are required',
				})
				.regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
				.regex(new RegExp('.*[a-z].*'), 'One lowercase character')
				.regex(new RegExp('.*\\d.*'), 'One number')
				.regex(
					new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
					'One special character'
				)
		),
		confirmNewPassword: z.string().min(1, 'Password confirmation is required'),
	})
	.refine(
		(data) => {
			if (data.password && !data.confirmNewPassword) {
				return false;
			}

			return true;
		},
		{
			message: 'New password is required',
			path: ['confirmNewPassword'],
		}
	)
	.refine(
		(data) => {
			if (data.confirmNewPassword && !data.password) {
				return false;
			}
			return true;
		},
		{
			message: 'Password is required',
			path: ['password'],
		}
	);
