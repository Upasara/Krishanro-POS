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
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { FaUser } from 'react-icons/fa';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import LogoutButton from './logoutButton';
import { ExitIcon } from '@radix-ui/react-icons';

export const UserButton = () => {
	const user = useCurrentUser();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar>
					<AvatarImage src={user?.image || ''} />
					<AvatarFallback className='bg-[#000]'>
						<FaUser />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-40 bg-gray-300 ' align='end'>
				<LogoutButton>
					<DropdownMenuItem>
						<ExitIcon className='h-4 w-4 mr-2' />
						Log out
					</DropdownMenuItem>
				</LogoutButton>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
