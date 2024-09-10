'use client';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useSession } from 'next-auth/react';

const SettingsPage = () => {
	//custom hook to get user
	const user = useCurrentUser();
	return (
		<div>
			{/* {JSON.stringify(user)} */}
			{user?.name}
		</div>
	);
};

export default SettingsPage;
