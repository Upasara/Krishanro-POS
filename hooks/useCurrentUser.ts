import { useSession } from 'next-auth/react';

export const useCurrentUser = () => {
	//get session
	const session = useSession();

	return session.data?.user;
};

//this custom hook has been made to get the user info quickly
