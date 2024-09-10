import { logOutAction } from '@/actions/logOutAction';
import React from 'react';

interface LogoutButtonProps {
	children?: React.ReactNode;
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
	const onClick = () => {
		logOutAction();
	};
	return (
		<span onClick={onClick} className='cursor-pointer'>
			{children}
		</span>
	);
};

export default LogoutButton;
