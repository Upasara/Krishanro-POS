'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { settings } from '@/actions/settings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useTransition, useState } from 'react';
import { SettingsSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { FormError } from '@/components/formError';
import { FormSuccess } from '@/components/formSuccess';
import {
	PersonIcon,
	EnvelopeOpenIcon,
	LockClosedIcon,
	EyeOpenIcon,
	EyeNoneIcon,
} from '@radix-ui/react-icons';

type SettingsPageSchemaFields = z.infer<typeof SettingsSchema>;

const SettingsPage = () => {
	//fetching user information
	const user = useCurrentUser();
	const { update } = useSession();
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const [show, setShow] = useState<boolean>(false);

	const handleShow = () => {
		setShow(!show);
	};

	const form = useForm<SettingsPageSchemaFields>({
		resolver: zodResolver(SettingsSchema),
		defaultValues: {
			name: user?.name || undefined,
			email: user?.email || undefined,
			password: '',
			newPassword: '',
			confirmNewPassword: '',
		},
	});

	const { watch } = form;

	const watchPassword = watch('password');
	const watchNewPassword = watch('newPassword');

	console.log(user);

	const [isPending, startTransition] = useTransition();

	const onSubmit = (value: SettingsPageSchemaFields) => {
		startTransition(() => {
			settings(value)
				.then((data) => {
					if (data.error) {
						setError(data.error);
					}

					if (data.success) {
						update();
						setSuccess(data.success);
					}
				})
				.catch(() => setError('Something went wrong'));
		});
	};

	return (
		<div className='w-full h-screen flex justify-center items-center'>
			<Card className='w-[600px]'>
				<CardHeader>
					<p className='text-2xl font-semibold text-center'>Settings</p>
					<h4 className='text-[1.1rem] font-semibold'>General Details</h4>
					<p className='text-muted-foreground text-sm'>
						Update your photos and personal details here.
					</p>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
							<div className='space-y-4'>
								{/* Name */}
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-[1rem] font-semibold'>Name</FormLabel>
											<FormControl>
												<div className='flex justify-center items-center px-2 border border-gray-300 rounded-md'>
													<PersonIcon className='h-4 w-4 text-gray-600' />
													<Input
														{...field}
														disabled={isPending}
														placeholder='First name'
														className='border-0 p-1 bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0'
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* Email */}
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-[1rem] font-semibold'>
												Contact Email
											</FormLabel>
											<p className='text-muted-foreground text-sm'>
												Manage your account email address for the login to POS system
											</p>
											<FormControl>
												<div className='flex justify-center items-center border px-2 border-gray-300 rounded-md '>
													<EnvelopeOpenIcon className='h-4 w-4 text-gray-600' />
													<Input
														{...field}
														disabled={isPending}
														placeholder='Email'
														className='border-0 w-full bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0'
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='border border-gray-100' />
							{/* Password */}
							<div className='space-y-4'>
								<div>
									<p className='text-[1rem] font-semibold'>Password</p>
									<p className='text-muted-foreground text-sm'>
										Modify your current password
									</p>
								</div>
								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Current Password</FormLabel>
											<FormControl>
												<div className='flex justify-center items-center px-2 border border-gray-300 rounded-md'>
													<LockClosedIcon className='h-4 w-4 text-gray-600' />
													<Input
														{...field}
														type={show ? 'text' : 'password'}
														disabled={isPending}
														placeholder='Current Password'
														className='w-full border-0 bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0'
													/>
													<div onClick={handleShow}>
														{!show ? (
															<EyeOpenIcon
																className={`${
																	!watchPassword
																		? 'hidden'
																		: 'h-4 w-4 text-gray-600'
																}`}
															/>
														) : (
															<EyeNoneIcon className='h-4 w-4 text-gray-600' />
														)}
													</div>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* New Password */}
								<div className='md:flex md:space-x-4 md:space-y-0 space-y-4'>
									<FormField
										control={form.control}
										name='newPassword'
										render={({ field }) => (
											<FormItem>
												<FormLabel className='font-semibold'>New Password</FormLabel>
												<FormControl>
													<div className='flex justify-center items-center border border-gray-300 rounded-md px-2 '>
														<LockClosedIcon className='h-4 w-4 text-gray-600' />
														<Input
															{...field}
															type={show ? 'text' : 'password'}
															disabled={isPending}
															placeholder='New Password'
															className='w-full md:w-[200px] border-0 bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0'
														/>
														<div onClick={handleShow}>
															{!show ? (
																<EyeOpenIcon
																	className={`${
																		!watchNewPassword
																			? 'hidden'
																			: 'h-4 w-4 text-gray-600'
																	}`}
																/>
															) : (
																<EyeNoneIcon
																	className={`${
																		!watchNewPassword
																			? 'hidden'
																			: 'h-4 w-4 text-gray-600'
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
												<FormLabel className='font-semibold'>
													Confirm Password
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														disabled={isPending}
														placeholder='Confirm Password'
														className='w-full md:w-[265px] bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0'
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<FormError message={error} />
							<FormSuccess message={success} />
							<Button type='submit' disabled={isPending} className='w-[100px]'>
								Save
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default SettingsPage;
