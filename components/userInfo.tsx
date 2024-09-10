import { ExtendedUser } from '@/types';
import { Card, CardContent, CardHeader } from './ui/card';

interface UserInfoProps {
	user?: ExtendedUser;
	label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
	return (
		<Card className='w-[600px] shadow-md bg-gray-300'>
			<CardHeader>
				<p className='text-2xl font-semibold text-center'>{label}</p>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='flex flex-row item-center justify-between rounded-lg border p-3 shadow-sm'>
					<p className='text-sm font-medium flex items-center'>ID</p>
					<p className='truncate text-xm max-w-[180px] font-mono p-1 rounded-md bg-slate-100'>
						{user?.id}
					</p>
				</div>
				<div className='flex flex-row item-center justify-between rounded-lg border p-3 shadow-sm'>
					<p className='text-sm font-medium flex items-center'>Name</p>
					<p className='truncate text-xm max-w-[180px] font-mono p-1 rounded-md bg-slate-100'>
						{user?.name}
					</p>
				</div>
				<div className='flex flex-row item-center justify-between rounded-lg border p-3 shadow-sm'>
					<p className='text-sm font-medium flex items-center'>Email</p>
					<p className='truncate text-xm max-w-[180px] font-mono p-1 rounded-md bg-slate-100'>
						{user?.email}
					</p>
				</div>
				<div className='flex flex-row item-center justify-between rounded-lg border p-3 shadow-sm'>
					<p className='text-sm font-medium flex items-center'>Role</p>
					<p className='truncate text-xm max-w-[180px] font-mono p-1 rounded-md bg-slate-100'>
						{user?.role}
					</p>
				</div>
			</CardContent>
		</Card>
	);
};
