'use client';
import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { logOutAction } from '@/actions/logOutAction';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@/components/auth/userButton';

export const Navbar = () => {
	const pathName = usePathname();
	const logout = () => {
		logOutAction();
	};
	return (
		<div className='flex justify-center items-center p-5'>
			<div className='w-[5000px] bg-gray-300 p-2 flex justify-between rounded-sm'>
				<div className='flex gap-x-2'>
					<Button
						asChild={true}
						variant={pathName === '/settings' ? 'default' : 'outline'}
						className={`${pathName === '/settings' ? 'text-[#fff]' : 'text-[#000]'}`}>
						<Link href='/settings'>Setting</Link>
					</Button>
					<Button
						asChild={true}
						variant={pathName === '/server' ? 'default' : 'outline'}
						className={`${pathName === '/server' ? 'text-[#fff]' : 'text-[#000]'}`}>
						<Link href='/server'>Server</Link>
					</Button>
					<Button
						asChild={true}
						variant={pathName === '/client' ? 'default' : 'outline'}
						className={`${pathName === '/client' ? 'text-[#fff]' : 'text-[#000]'}`}>
						<Link href='/client'>Client</Link>
					</Button>
					<Button
						asChild={true}
						variant={pathName === '/admin' ? 'default' : 'outline'}
						className={`${pathName === '/admin' ? 'text-[#fff]' : 'text-[#000]'}`}>
						<Link href='/admin'>Admin</Link>
					</Button>
				</div>
				{/* dropdown menu */}
				<UserButton />
			</div>
		</div>
	);
};
