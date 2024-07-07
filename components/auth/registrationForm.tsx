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
import { useState, useTransition } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import { register } from '../../actions/register';
import { FormError } from '../formError';
import { FormSuccess } from '../formSuccess';

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

	//destructure form to get watch and formState
	const {
		watch,
		formState: { isDirty, isValid },
		reset,
	} = form;

	//to get the value of password's input field then visible the password type as a text to user

	const watchPassword = watch('password', 'confirmPassword');
	const watchPasswordConfirm = watch('confirmPassword');

	//submit the sign up form

	const onSubmit = (values: RegistrationSchemaFields) => {
		setError('');
		setSuccess('');

		startTransition(() => {
			register(values).then((data) => {
				setError(data.error);
				setSuccess(data.success);
			});
		});
		reset();
	};

	//to make the password field visible

	const [show, setShow] = useState<boolean>(false);
	const handleShow = () => {
		setShow(!show);
	};

	//error handle within the form

	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	return (
		<div>
			<RegCardWrapper
				headerCap='Sign Up'
				headerLabel='Create an account.'
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
												disabled={isPending}
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
												disabled={isPending}
												placeholder='Last Name'
												type='text'
												className='bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0'
											/>
										</FormControl>
										<FormMessage />
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
												disabled={isPending}
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
													disabled={isPending}
													placeholder='Password'
													type={show ? 'text' : 'password'}
													className=' border-0 bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0'
												/>
												<div
													onClick={handleShow}
													className='flex items-center justify-center p-3 text-sm'>
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
											<div className='flex border rounded-sm '>
												<Input
													{...field}
													disabled={isPending}
													placeholder='Re-Enter your password'
													type={show ? 'text' : 'password'}
													className='border-0 bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0'
												/>
												<div
													onClick={handleShow}
													className='flex items-center justify-center p-3 text-sm'>
													{show ? (
														<FaRegEyeSlash
															className={`${
																!watchPasswordConfirm
																	? 'hidden'
																	: 'w-4 h-4 cursor-pointer text-[#000]'
															}`}
														/>
													) : (
														<FaRegEye
															className={`${
																!watchPasswordConfirm
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
						</div>
						<FormError message={error} />
						<FormSuccess message={success} />
						<Button
							className='w-full'
							typeof='submit'
							disabled={(isPending && !isDirty) || !isValid}>
							<MdOutlineAppRegistration className='mr-2 h-5 w-5' />
							Sign up
						</Button>
					</form>
				</Form>
			</RegCardWrapper>
		</div>
	);
};
