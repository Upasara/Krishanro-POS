'use server';
import { getUserByEmail } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verificationToken';
import { db } from '@/lib/db';
import { error } from 'console';
import React from 'react';

export const newVerificationAction = async (token: string) => {
	const existingToken = await getVerificationTokenByToken(token);

	if (!existingToken) {
		return { error: 'Token does not exist!' };
	}

	// expired date is smaller than date as of now
	const hasExpired = new Date(existingToken.expires) < new Date();

	hasExpired ? { error: 'Token has expired!' } : null;

	//user supposed to valid
	const existingUser = await getUserByEmail(existingToken.email);

	//if there is no existing who connected to that email that's mean user change their email

	existingUser ? { error: 'Email does not exist!' } : null;

	await db.user.update({
		// find user by their uid
		where: { id: existingUser?.id },
		data: {
			emailVerified: new Date(),
			// when user add new email from settings page then user need to update the new email
			//we are going to send an verification token in email with updated email to confirm from the user
			email: existingToken.email,
		},
	});

	// to remove the verification token
	await db.verificationToken.delete({
		where: { id: existingToken.id },
	});

	return { success: 'Email verified!' };
};
