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

type LoginSchemaFields = z.infer<typeof LoginSchema>;

const LoginForm = () => {
	const form = useForm<LoginSchemaFields>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (values: LoginSchemaFields) => {
		console.log(values);
	};
	return (
		<div>
			<CardWrapper
				headerLabel='Krishanro Dough & Co'
				backButtonLabel="I don't have an account ?"
				backButtonHref='/auth/registration'
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
						<FormError message='' />
						<FormSuccess message='' />
						<Button typeof='submit' className='w-full'>
							Login
						</Button>
					</form>
				</Form>
			</CardWrapper>
		</div>
	);
};

export default LoginForm;
