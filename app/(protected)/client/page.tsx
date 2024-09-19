'use client';
import { UserInfo } from '@/components/userInfo';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import React from 'react';

const ClientPage = () => {
	const user = useCurrentUser();
	return (
		<div className='w-full h-screen flex justify-center items-center'>
			<UserInfo user={user} label='Client Component from Client Hook' />
		</div>
	);
};

export default ClientPage;
