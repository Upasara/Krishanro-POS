'use client';
import { admin } from '@/actions/admin';
import { RoleGate } from '@/components/auth/roleGate';
import { FormSuccess } from '@/components/formSuccess';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCurrentRole } from '@/hooks/useCurrentRole';
import { UserRole } from '@prisma/client';
import React from 'react';
import { toast } from 'sonner';

const AdminPage = () => {
	const onApiRouteClick = () => {
		fetch('/api/admin').then((response) => {
			if (response.ok) {
				toast.success('Allowed API Route');
			} else {
				toast.error('Forbidden API Route');
			}
		});
	};

	const onServerActionClick = () => {
		admin().then((response) => {
			if (response.error) {
				toast.error(response.error);
			} else {
				toast.success(response.success);
			}
		});
	};
	return (
		<div className='h-screen flex justify-center items-center'>
			<Card className='w-[600px]'>
				<CardHeader>
					<p className='text-2xl font-semibold text-center '>Admin Panel</p>
				</CardHeader>
				<CardContent className='space-y-4'>
					<RoleGate allowedRole={UserRole.ADMIN}>
						{/* all the content is allow to access by admins */}
						<FormSuccess message='This can be only seen by Admins.' />
					</RoleGate>
					<div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
						<p className='text-sm  font-medium'>Admin only API routes</p>
						<Button onClick={onApiRouteClick}>Click to test</Button>
					</div>
					<div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
						<p className='text-sm  font-medium'>Admin only Server Action</p>
						<Button onClick={onServerActionClick}>Click to test</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default AdminPage;
