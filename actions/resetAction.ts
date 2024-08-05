'use server';
import * as z from 'zod';
import { ResetSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { error } from 'console';
import { generatePasswordResetToken } from '@/lib/token';
import { sendPasswordResetEmail } from '@/lib/mail';

type ResetSchemaFields = z.infer<typeof ResetSchema>;

export const resetAction = async (values: ResetSchemaFields) => {
	const validatedFields = ResetSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid email!' };
	}

	//extract the email from validated fields

	const { email } = validatedFields.data;

	//get user from db
	const existingUser = await getUserByEmail(email);

	if (!existingUser) {
		return { error: 'Email not found!' };
	}

	//TODO : generate email then send
	const passwordResetToken = await generatePasswordResetToken(email);

	await sendPasswordResetEmail(passwordResetToken?.email, passwordResetToken?.token);

	return { success: 'Reset email sent!' };
};
