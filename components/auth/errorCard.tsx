import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Header } from './header';
import { Social } from './social';
import { BackButton } from './backButton';
import CardWrapper from './cardWrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export const ErrorCard = () => {
	return (
		<CardWrapper
			headerCap='Something went wrong!'
			headerLabel='Authentication denial'
			backButtonHref='/login'
			backButtonLabel='Back to Login? Click here'>
			<div className='flex justify-center items-center'>
				<ExclamationTriangleIcon className='text-destructive h-14 w-14' />
			</div>
		</CardWrapper>
	);
};

// <Card className='w-[400px] md:w-[500px] shadow-xl'>
// 	<CardHeader>
// 		<Header headerCap='Something went wrong!' label='Authorization denial.' />
// 	</CardHeader>
// 	<CardFooter>
// 		<BackButton label='Back to Login? Click here.' href='/login' />
// 	</CardFooter>
// </Card>
