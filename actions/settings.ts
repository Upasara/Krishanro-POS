'use server';
import * as z from 'zod';
import { SettingsSchema } from '@/schemas';
import { currentUser } from '@/lib/auth';
import { getUserById } from '@/data/user';
import { db } from '@/lib/db';

type SettingsSchemaFields = z.infer<typeof SettingsSchema>;

export const settings = async (values: SettingsSchemaFields) => {
	const user = await currentUser();

	//if there is no user in db
	if (!user) {
		return { error: 'Unauthorized user' };
	}

	//check left over session in db
	const dbUser = await getUserById(user.id as string);

	if (!dbUser) {
		return { error: 'Unauthorized user' };
	}

	// to change the name of user
	await db.user.update({
		where: { id: dbUser.id },
		data: {
			...values,
		},
	});

	return { success: 'Settings Updated' };
};
