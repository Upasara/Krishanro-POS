'use client';
import React from 'react';

interface LoginButtonProps {
	children: React.ReactNode;
	mode?: 'modal' | 'redirect';
	asChild?: boolean;
}

const LoginButton = ({ children, mode = 'redirect', asChild }: LoginButtonProps) => {
	const handleClick = (e: any) => {
		console.log('Login click');
	};
	return (
		<span onClick={handleClick} className='cursor-pointer'>
			{children}
		</span>
	);
};

export default LoginButton;
