import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const verificationEmail = async (email: String, token: String) => {
	const confirmLink = `http://localhost:3000/newVerification?token=${token}`;

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: `${email}`,
		subject: 'Email verification from Krishanro Dough & Co ',
		html: `<p>Welcome to Krishanro Dough & Co and Click <a href='${confirmLink}'>here</a> to confirm your email.</p>`,
	});
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
	const restLink = `http://localhost:3000/newPassword?token=${token}`;

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: `${email}`,
		subject: 'Reset your password from  Krishanro Dough & Co',
		html: `<p>Click <a href='${restLink}'>here</a> to reset your password.</p>`,
	});
};

export const passwordResetUpdatedEmail = async (email: string) => {
	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: `${email}`,
		subject: 'Password updated alert from Krishanro Dough & Co',
		html: `<p>Please noted that your password has been changed.</p>`,
	});
};
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: `${email}`,
		subject: 'One-Time code from Krishanro Dough & Co',
		html: `<p>You one-time code: ${token}</p>`,
	});
};
