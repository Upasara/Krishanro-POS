'use client';
import React, { useCallback, useEffect, useState } from 'react';
import CardWrapper from './cardWrapper';
import { InfinitySpin } from 'react-loader-spinner';
import { useSearchParams } from 'next/navigation';
import { newVerificationAction } from '@/actions/newVerificationAction';
import { FormError } from '../formError';
import { FormSuccess } from '../formSuccess';

export const NewVerificationForm = () => {
	//useState hooks for error messages
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const searchParams = useSearchParams();

	//this token value is store in query
	const token = searchParams.get('token');
	//get the token from url

	const onSubmit = useCallback(() => {
		//to break the function if you have a success or error message
		if (success || error) return;
		//there is no token in url
		if (!token) {
			setError('Missing Token!');
			return;
		}

		//to get the success and error messages from token server action
		newVerificationAction(token)
			.then((data) => {
				setSuccess(data.success);
				setError(data.error);
			})
			.catch(() => {
				setError(`Something went wrong!`);
			});
	}, [token, success, error]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit]);

	// there are two useEffects because in developer mode react create two useEffects

	return (
		<CardWrapper
			headerCap='User Verification'
			headerLabel='Confirm your email verification.'
			backButtonLabel='Back to login?'
			backButtonHref='/login'>
			<div className='flex justify-center items-center w-full inset-10'>
				{!success && !error && <InfinitySpin color='#000' />}
				<FormSuccess message={success} />
				{!screen && <FormError message={error} />}
			</div>
		</CardWrapper>
	);
};
