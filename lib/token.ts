//to generate tokens then id there is a exiting token then it removes

import { getVerificationTokenByEmail } from '@/data/verificationToken';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';

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
