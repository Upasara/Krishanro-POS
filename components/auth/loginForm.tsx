import React from 'react';
import CardWrapper from './cardWrapper';

const LoginForm = () => {
	return (
		<div>
			<CardWrapper
				headerLabel='Krishanro Dough & Co Login Page'
				backButtonLabel="I don't have an account"
				backButtonHref='/auth/registration'>
				From content
			</CardWrapper>
		</div>
	);
};

export default LoginForm;
