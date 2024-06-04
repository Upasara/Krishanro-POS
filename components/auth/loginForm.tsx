'use client';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import CardWrapper from './cardWrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { resolve } from 'path';

type LoginSchemaFields = z.infer<typeof LoginSchema>;

const LoginForm = () => {
	const form = useForm<LoginSchemaFields>({
		resolver: zodResolver(LoginSchema),
	});
	return (
		<div>
			<CardWrapper
				headerLabel='Krishanro Dough & Co'
				backButtonLabel="I don't have an account ?"
				backButtonHref='/auth/registration'
				showSocial>
				From content
			</CardWrapper>
		</div>
	);
};

export default LoginForm;
