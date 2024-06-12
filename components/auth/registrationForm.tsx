'use client';
import RegCardWrapper from './regCardWrapper';
import { useForm } from 'react-hook-form';
import { RegistrationSchema } from '@/schemas';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { MdOutlineAppRegistration } from 'react-icons/md';
import { useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';

type RegistrationSchemaFields = z.infer<typeof RegistrationSchema>;

export const RegistrationForm = () => {
	const form = useForm<RegistrationSchemaFields>({
		resolver: zodResolver(RegistrationSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		mode: 'onChange',
	});

	const {
		watch,
		formState: { isDirty, isValid },
	} = form;

	const watchPassword = watch('password', 'confirmPassword');

	//submit the sign up form

	const onSubmit = (values: RegistrationSchemaFields) => {
		console.log(values);
	};

	const [show, setShow] = useState(false);
	const handleShow = () => {
		setShow(!show);
	};

	return (
		<div>
			<RegCardWrapper
				headerCap='Sign Up'
				headerLabel='Welcome to user registration.'
				backButtonLabel='I already have an account? Login here.'
				backButtonHref='/login'
				showSocial>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
												className='w-full bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0'
											/>
										</FormControl>
										<FormMessage />
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
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
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
										<div className='flex border rounded-sm '>
											<Input
												{...field}
												placeholder='Password'
												type={show ? 'text' : 'password'}
												className=' border-0 bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0'
											/>
											<div
												onClick={handleShow}
												className='flex items-center justify-center p-1 text-sm'>
												{show ? (
													<FaRegEyeSlash
														className={`${
															!watchPassword
																? 'hidden'
																: 'w-4 h-4 cursor-pointer text-[#000]'
														}`}
													/>
												) : (
													<FaRegEye
														className={`${
															!watchPassword
																? 'hidden'
																: 'w-4 h-4 cursor-pointer text-[#000]'
														}`}
													/>
												)}
											</div>
										</div>
									</FormControl>
									<FormMessage />
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
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className='w-full' typeof='submit' disabled={!isDirty || !isValid}>
							<MdOutlineAppRegistration className='mr-2 h-5 w-5' />
							Sign up
						</Button>
					</form>
				</Form>
			</RegCardWrapper>
		</div>
	);
};
