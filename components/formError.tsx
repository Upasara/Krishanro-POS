import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface FormErrorProps {
	message?: string;
}
export const FormError = ({ message }: FormErrorProps) => {
	if (!message) return null;

	return (
		<div className='bg-destructive/15 p-2 rounded-sm flex items-center justify-center gap-x-2 text-sm text-destructive'>
			<ExclamationTriangleIcon className='h-5 w-5' />
			<p>{message}</p>
		</div>
	);
};
