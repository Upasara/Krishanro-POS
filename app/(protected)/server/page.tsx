'use server';
import { UserInfo } from '@/components/userInfo';
import { currentUser } from '@/lib/auth';
import React from 'react';

const ServerPage = async () => {
	const user = await currentUser();
	return (
		<div className='h-screen w-full flex justify-center items-center'>
			<UserInfo user={user} label='Server Component from Server Hook' />
		</div>
	);
};

export default ServerPage;
