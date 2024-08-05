'use server';

import * as z from 'zod';
import { ResetPasswordSchema } from '@/schemas';
import { getPasswordResetTokenByToken } from '@/data/passwordResetToken';
import { getUserByEmail } from '@/data/user';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { passwordResetUpdatedEmail } from '@/lib/mail';

type NewPasswordSchemaField = z.infer<typeof ResetPasswordSchema>;

export const newPasswordAction = async (values: NewPasswordSchemaField, token: string | null) => {
	//no token
	if (!token) {
		return { error: 'Missing Token! ' };
	}

	//getting data from input fields
	const validationFields = ResetPasswordSchema.safeParse(values);

	//valid filed not success
	if (!validationFields.success) {
		return { error: 'Invalid fields!' };
	}

	//extract password from fields
	const { confirmNewPassword } = validationFields.data;

	//getting existing token from db
	const existingToken = await getPasswordResetTokenByToken(token);

	if (!existingToken) {
		return { error: 'Invalid Token!' };
	}

	//check whether token is expired or not
	const hasExpired = new Date(existingToken.expires) < new Date();

	if (hasExpired) {
		return { error: 'Token has expired!' };
	}

	//getting the existing user for match the passwords
	//we get the user by existing token's email
	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingUser) {
		return { error: 'Email does not exist!' };
	}

	//crypt the new password
	const hashedPassword = await bcrypt.hash(confirmNewPassword, 10);

	//update the db with new password
	await db.user.update({
		where: { id: existingUser.id },
		data: { password: hashedPassword },
	});

	//delete the reset token from db
	await db.passwordResetToken.delete({
		where: { id: existingToken.id },
	});

	//Todo:try to find out a way to get the user's name then sent it by props to generate the email
	await passwordResetUpdatedEmail(existingToken?.email);

	return { success: 'Password has been reset!' };
};
