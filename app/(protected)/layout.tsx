import React from 'react';
import { Navbar } from './_components/navbar';

interface ProtectedLayoutProps {
	children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
	return (
		<div className='w-full h-screen text-[#fff] bg-black'>
			<Navbar />
			{children}
		</div>
	);
};

export default ProtectedLayout;
