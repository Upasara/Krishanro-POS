'use client';
import * as z from 'zod';
import { ResetPasswordSchema } from '@/schemas';
import CardWrapper from './cardWrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../formError';
import { FormSuccess } from '../formSuccess';
import { useState, useTransition } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useSearchParams } from 'next/navigation';
import { newPasswordAction } from '@/actions/newPasswordAction';

type ResetPasswordSchemaFields = z.infer<typeof ResetPasswordSchema>;

const NewPasswordForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	//to get the token from url

	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	const form = useForm<ResetPasswordSchemaFields>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			newPassword: '',
			confirmNewPassword: '',
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

	const watchPassword = watch('newPassword');
	const watchPasswordConfirm = watch('confirmNewPassword');

	//to make the password field visible

	const [show, setShow] = useState<boolean>(false);
	const handleShow = () => {
		setShow(!show);
	};

	//submit function in login page

	const onSubmit = (values: ResetPasswordSchemaFields) => {
		setError('');
		setSuccess('');

		startTransition(() => {
			newPasswordAction(values, token).then((data) => {
				setError(data?.error);
				//TODO:add when we add 2fa
				setSuccess(data?.success);
			});
		});
	};

	return (
		<div>
			<CardWrapper
				headerCap='Change your password'
				headerLabel='Enter your new password below to change your existing password.'
				backButtonLabel='Back to login?'
				backButtonHref='/login'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
						<div className='space-y-4'>
							<FormField
								control={form.control}
								name='newPassword'
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
								name='confirmNewPassword'
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
							disabled={(isPending && !isDirty) || !isValid}
							typeof='submit'
							className='w-full'>
							<RiLockPasswordLine className='mr-2 h-5 w-5' />
							Reset Password
						</Button>
					</form>
				</Form>
			</CardWrapper>
		</div>
	);
};

export default NewPasswordForm;
