'use client';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import CardWrapper from './cardWrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { resolve } from 'path';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../formError';
import { FormSuccess } from '../formSuccess';
import { login } from '@/actions/login';
import { useState, useTransition } from 'react';
import { IoLogIn } from 'react-icons/io5';

type LoginSchemaFields = z.infer<typeof LoginSchema>;

const LoginForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const form = useForm<LoginSchemaFields>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	//submit function in login page

	const onSubmit = (values: LoginSchemaFields) => {
		setError('');
		setSuccess('');

		startTransition(() => {
			login(values).then((data) => {
				setError(data.error);
				setSuccess(data.success);
			});
		});
	};
	return (
		<div>
			<CardWrapper
				headerCap='Login'
				headerLabel='Krishanro Dough & Co'
				backButtonLabel="If you don't have an account? Sign up here."
				backButtonHref='/registration'
				showSocial>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
						<div className='space-y-4'>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder='Email'
												disabled={isPending}
												{...field}
												type='email'
												className='bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder='Password'
												disabled={isPending}
												{...field}
												type='password'
												className='bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormError message={error} />
						<FormSuccess message={success} />
						<Button disabled={isPending} typeof='submit' className='w-full'>
							<IoLogIn className='mr-2 h-5 w-5' />
							Login
						</Button>
					</form>
				</Form>
			</CardWrapper>
		</div>
	);
};

export default LoginForm;
