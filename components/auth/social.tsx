'use client';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '../ui/button';

import { signIn } from 'next-auth/react';
import { DefaultRedirect } from '@/routes';
import google from 'next-auth/providers/google';

export const Social = () => {
	const onClick = (provider: 'google') => {
		signIn(provider, {
			callbackUrl: DefaultRedirect,
		});
	};
	return (
		<div className='flex justify-center items-center w-full gap-x-2'>
			<Button
				variant='outline'
				size='lg'
				className='w-full gap-x-2'
				onClick={() => onClick('google')}>
				<FcGoogle className='h-5 w-5' /> Sign in with Google
			</Button>
		</div>
	);
};
