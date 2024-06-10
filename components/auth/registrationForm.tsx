'use client';
import CardWrapper from './cardWrapper';
import { useForm } from 'react-hook-form';
import { RegistrationSchema } from '@/schemas';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { MdOutlineAppRegistration } from 'react-icons/md';

type RegistrationSchemaFields = z.infer<typeof RegistrationSchema>;

export const RegistrationForm = () => {
	const form = useForm<RegistrationSchemaFields>({
		resolver: zodResolver(RegistrationSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		},
	});
	return (
		<div>
			<CardWrapper
				headerCap='Sign Up'
				headerLabel='Welcome to user registration.'
				backButtonLabel='I already have an account? Login here.'
				backButtonHref='/login'
				showSocial>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(() => {})} className='space-y-6'>
						<div className='space-y-4'>
							<FormField
								control={form.control}
								name='firstName'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												placeholder='First Name'
												type='text'
												className='bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0'
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='lastName'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												placeholder='Last Name'
												type='text'
												className='bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0'
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												placeholder='Email'
												type='email'
												className='bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0'
											/>
										</FormControl>
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
												{...field}
												placeholder='Password'
												type='password'
												className='bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0'
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='confirmPassword'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												placeholder='Re-Enter your password'
												type='password'
												className='bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0'
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<Button className='w-full' typeof='submit'>
							<MdOutlineAppRegistration className='mr-2 h-5 w-5' />
							Sign up
						</Button>
					</form>
				</Form>
			</CardWrapper>
		</div>
	);
};
