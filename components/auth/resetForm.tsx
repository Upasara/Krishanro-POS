'use client';
import * as z from 'zod';
import { ResetSchema } from '@/schemas';
import CardWrapper from './cardWrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../formError';
import { FormSuccess } from '../formSuccess';
import { useState, useTransition } from 'react';
import { MdOutlineLockReset } from 'react-icons/md';
import { resetAction } from '@/actions/resetAction';

type ResetSchemaFields = z.infer<typeof ResetSchema>;

const ResetForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const form = useForm<ResetSchemaFields>({
		resolver: zodResolver(ResetSchema),
		defaultValues: {
			email: '',
		},
	});

	//submit function in login page

	const onSubmit = (values: ResetSchemaFields) => {
		setError('');
		setSuccess('');

		startTransition(() => {
			resetAction(values).then((data) => {
				setError(data?.error);
				//TODO:add when we add 2fa
				setSuccess(data?.success);
			});
		});
	};

	//destructure form to get the formState
	const {
		formState: { isDirty, isValid },
	} = form;

	return (
		<div>
			<CardWrapper
				headerCap='Reset your password'
				headerLabel='Enter your email address and we will send you a password reset link.'
				backButtonLabel='Back to login?'
				backButtonHref='/login'>
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
						</div>
						<FormError message={error} />
						<FormSuccess message={success} />
						<Button
							disabled={(isPending && !isDirty) || !isValid}
							typeof='submit'
							className='w-full'>
							<MdOutlineLockReset className='mr-2 h-5 w-5' />
							Send Password Reset Email
						</Button>
					</form>
				</Form>
			</CardWrapper>
		</div>
	);
};

export default ResetForm;
