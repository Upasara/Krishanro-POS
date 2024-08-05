'use client';
import { logOutAction } from '@/actions/logOutAction';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useSession } from 'next-auth/react';

const SettingsPage = () => {
	//custom hook to get user
	const user = useCurrentUser();
	return <div>{/* {JSON.stringify(user)} */}</div>;
};

export default SettingsPage;
