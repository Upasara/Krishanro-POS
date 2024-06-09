import React from 'react';
import CardWrapper from './cardWrapper';

export const RegistrationForm = () => {
	return (
		<div>
			<CardWrapper
				headerCap='Sign Up'
				headerLabel='Welcome to user registration.'
				backButtonLabel='I already have an account? Login here.'
				backButtonHref='/login'
				showSocial>
				Hello
			</CardWrapper>
		</div>
	);
};
