'use server';

import { signOut } from '@/auth';

export const logOutAction = async () => {
	await signOut();
};
