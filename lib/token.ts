//to generate tokens then id there is a exiting token then it removes

import { getVerificationTokenByEmail } from '@/data/verificationToken';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import { getPasswordResetTokenByEmail } from '@/data/passwordResetToken';

// to generate 2fa number

import crypto from 'crypto';
import { twoFactorTokenByEmail } from '@/data/twoFactorToken';

export const generateVerificationToken = async (email: string) => {
	//generate a token id
	const token = uuidv4();
	//formula to expire the toke in 1h
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await getVerificationTokenByEmail(email);

	//to delete the existing token from db to generate new one
	if (existingToken) {
		await db.verificationToken.delete({
			where: {
				id: existingToken.id,
			},
		});
	}

	//to create a new token
	const verificationToken = await db.verificationToken.create({
		data: {
			email,
			token,
			expires,
		},
	});

	return verificationToken;
};

//to generate password reset token
export const generatePasswordResetToken = async (email: string) => {
	const token = uuidv4();
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await getPasswordResetTokenByEmail(email);

	//delete the existing toke from db
	if (existingToken) {
		await db.passwordResetToken.delete({
			where: { id: existingToken.id },
		});
	}

	//create a password resetting token
	const passwordRestToke = await db.passwordResetToken.create({
		data: {
			email,
			token,
			expires,
		},
	});

	return passwordRestToke;
};

//to generate 2fa toke
export const generateTwoFactorToken = async (email: string) => {
	//beginning of the range, end of the range
	const token = crypto.randomInt(100_000, 1_000_000).toString();
	//to expires this in hours
	//TODO : to changed this to 5mins for security purpose
	const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

	//get the existing token
	const existingToken = await twoFactorTokenByEmail(email);

	if (existingToken) {
		await db.twoFactorToken.delete({
			where: { id: existingToken.id },
		});
	}

	//create a new 2fa token
	const twoFactorToken = await db.twoFactorToken.create({
		data: {
			email,
			token,
			expires,
		},
	});

	return twoFactorToken;
};
