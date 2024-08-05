'use client';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import CardWrapper from './cardWrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../formError';
import { FormSuccess } from '../formSuccess';
import { login } from '@/actions/login';
import { useState, useTransition } from 'react';
import { IoLogIn } from 'react-icons/io5';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { link } from 'fs';

//2fa
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

type LoginSchemaFields = z.infer<typeof LoginSchema>;

const LoginForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	//2fa
	const [showTwoFactor, setShowTwoFactor] = useState(false);

	//search params
	const searchParams = useSearchParams();
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Email is already in use with different provider!'
			: '';

	const form = useForm<LoginSchemaFields>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
			code: '',
		},
	});

	//submit function in login page

	const onSubmit = (values: LoginSchemaFields) => {
		setError('');
		setSuccess('');

		startTransition(() => {
			login(values)
				.then((data) => {
					if (data?.error) {
						//to reset the form values
						form.reset();
						setError(data.error);
					}

					if (data?.success) {
						//to reset the form
						form.reset();
						setSuccess(data.success);
					}

					//2fa
					if (data?.twoFactor) {
						setShowTwoFactor(true);
					}
				})
				.catch(() => {
					setError('Something went wrong!');
				});
		});
	};

	// to make password field visible

	const [showPassword, setShowPassword] = useState(false);

	const handlePasswordShow = () => {
		setShowPassword(!showPassword);
	};

	//function to hide the password visibility

	const { watch } = form;

	const watchPassword = watch('password');

	return (
		<div>
			<CardWrapper
				headerCap='Login'
				headerLabel='Krishanro Dough & Co'
				backButtonLabel='New to Krishanro Dough & Co? Sign up for an account'
				backButtonHref='/registration'
				showSocial>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
						<div className='space-y-4'>
							{showTwoFactor && (
								<FormField
									control={form.control}
									name='code'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Enter your one-time code</FormLabel>
											<FormControl>
												<InputOTP maxLength={6} {...field} disabled={isPending}>
													<InputOTPGroup>
														<InputOTPSlot index={0} />
														<InputOTPSlot index={1} />
														<InputOTPSlot index={2} />
														<InputOTPSlot index={3} />
														<InputOTPSlot index={4} />
														<InputOTPSlot index={5} />
													</InputOTPGroup>
												</InputOTP>
											</FormControl>
											<FormDescription>
												Please enter the one-time code sent to your email.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
							{!showTwoFactor && (
								<>
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
													<div className='flex border rounded-sm'>
														<Input
															placeholder='Password'
															disabled={isPending}
															{...field}
															type={showPassword ? 'text' : 'password'}
															className='border-0 bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0'
														/>
														<div
															onClick={handlePasswordShow}
															className='flex justify-center items-center p-3 text-sm'>
															{showPassword ? (
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
												<div className='text-right'>
													<Button
														size='sm'
														asChild
														className='px-0 font-normal'
														variant='link'>
														<Link href='/reset'>Forgot Password ?</Link>
													</Button>
												</div>
											</FormItem>
										)}
									/>
								</>
							)}
						</div>
						<FormError message={error || urlError} />
						<FormSuccess message={success} />
						<Button disabled={isPending} typeof='submit' className='w-full'>
							<IoLogIn className='mr-2 h-5 w-5' />
							{showTwoFactor ? 'Submit' : 'Login'}
						</Button>
					</form>
				</Form>
			</CardWrapper>
		</div>
	);
};

export default LoginForm;
