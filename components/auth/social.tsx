'use client';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '../ui/button';

export const Social = () => {
	return (
		<div className='flex justify-center items-center w-full gap-x-2'>
			<Button variant='outline' size='lg' className='w-full gap-x-2'>
				<FcGoogle className='h-5 w-5' /> Sign up with Google
			</Button>
		</div>
	);
};
