'use client';
import { useRouter } from 'next/navigation';
import { routes } from '../../lib/assets/route_links';

interface LoginButtonProps {
	children: React.ReactNode;
	mode?: 'modal' | 'redirect';
	asChild?: boolean;
}

const LoginButton = ({ children, mode = 'redirect', asChild }: LoginButtonProps) => {
	const navDirect = useRouter();
	const handleClick = (e: any) => {
		navDirect.push(routes.login);
	};

	if (mode === 'modal') {
		return <span>Todo:Implement Modal</span>;
	}

	return (
		<span onClick={handleClick} className='cursor-pointer'>
			{children}
		</span>
	);
};

export default LoginButton;
