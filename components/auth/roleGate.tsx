'use client';

import { useCurrentRole } from '@/hooks/useCurrentRole';
import { UserRole } from '@prisma/client';
import { FormError } from '../formError';

interface RoleGateProps {
	children: React.ReactNode;
	allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
	const role = useCurrentRole();
	//getting the current user by this hook

	//role is not allow to access as in UserRol.User from props above then it will block the contents

	if (role !== allowedRole) {
		return <FormError message='You do not have user privilege to access this page!' />;
	}

	return <>{children}</>;
};
