import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

interface CardWrapperProps {
	children: React.ReactNode;
	headerLabel: string;
	backButtonLabel: string;
	backButtonHref: string;
	showSocial?: boolean;
}

const CardWrapper = ({
	children,
	headerLabel,
	backButtonHref,
	backButtonLabel,
	showSocial,
}: CardWrapperProps) => {
	return <Card className='w-[400px] shadow-md'>{children}</Card>;
};

export default CardWrapper;
