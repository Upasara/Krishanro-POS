'use client';
import { FaGoogle } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa';
import { Button } from '../ui/button';

export const Social = () => {
	return (
		<div className='flex justify-center items-center w-full gap-x-2'>
			<Button variant='outline' size='lg' className='w-full'>
				<FaGoogle className='h-5 w-5' />
			</Button>
			<Button variant='outline' size='lg' className='w-full'>
				<FaFacebookF className='h-5 w-5' />
			</Button>
		</div>
	);
};
