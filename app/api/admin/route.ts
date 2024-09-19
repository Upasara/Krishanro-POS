import { currentRole } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
	const role = await currentRole();

	//we need server side user role to equal it to current user from prisma then code new response
	if (role === UserRole.ADMIN) {
		return new NextResponse(null, { status: 200 });
	}

	return new NextResponse(null, { status: 403 });
}
