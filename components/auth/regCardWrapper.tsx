import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Header } from './header';
import { Social } from './social';
import { BackButton } from './backButton';
import { MdHome } from 'react-icons/md';
import Link from 'next/link';

interface CardWrapperProps {
	children: React.ReactNode;
	headerCap: string;
	headerLabel: string;
	backButtonLabel: string;
	backButtonHref: string;
	showSocial?: boolean;
}

const RegCardWrapper = ({
	children,
	headerCap,
	headerLabel,
	backButtonHref,
	backButtonLabel,
	showSocial,
}: CardWrapperProps) => {
	return (
		<Card className='w-[400px] md:w-[500px] shadow-xl'>
			<CardHeader>
				<Header label={headerLabel} headerCap={headerCap} />
			</CardHeader>
			<CardContent>{children}</CardContent>
			{showSocial && (
				<CardFooter>
					<Social />
				</CardFooter>
			)}
			<CardFooter>
				<BackButton label={backButtonLabel} href={backButtonHref} />
			</CardFooter>
		</Card>
	);
};

export default RegCardWrapper;
