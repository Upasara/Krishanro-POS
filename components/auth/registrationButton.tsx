'use client';
import { routes } from '@/lib/assets/route_links';
import { useRouter } from 'next/navigation';

interface RemigrationButtonProps {
	children: React.ReactNode;
}

export const RegistrationButton = ({ children }: RemigrationButtonProps) => {
	const navDirect = useRouter();
	const handleClick = (e: any) => {
		navDirect.push(routes.registration);
	};
	return (
		<span onClick={handleClick} className='cursor-pointer'>
			{children}
		</span>
	);
};
