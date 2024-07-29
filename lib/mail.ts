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
