import { db } from '@/lib/db';

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
	try {
		const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
			where: { userId },
		});
		return twoFactorConfirmation;
	} catch {
		return null;
	}
};

// since we have relation with user We don't to get user's email or token
