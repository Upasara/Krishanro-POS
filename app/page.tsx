import LoginButton from '@/components/auth/button';
import { RegistrationButton } from '@/components/auth/registrationButton';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

import { IoLogIn } from 'react-icons/io5';
import { MdOutlineAppRegistration } from 'react-icons/md';

export default function Home() {
	return (
		<main className='relative h-screen w-full bg-zinc-900/90'>
			<div>
				<Image
					src='/img/hero/cover01.jpg'
					alt='hero_bg'
					fill={true}
					className='absolute w-full h-screen object-cover overflow-hidden mix-blend-overlay'
				/>
			</div>
			<div className='absolute h-screen w-full flex justify-center items-center'>
				<div className='text-center space-y-10'>
					<h1 className='text-[#fff] text-4xl md:text-6xl font-semibold'>
						Welcome to Krishanro Dough & Co - POS
					</h1>
					<div className='flex justify-center items-center space-x-7 '>
						<LoginButton>
							<Button className='bg-[#fff]' variant='secondary' size='lg'>
								<IoLogIn className='mr-2 h-5 w-5' />
								Login
							</Button>
						</LoginButton>
						<RegistrationButton>
							<Button className='bg-[#fff]' variant='secondary' size='lg'>
								<MdOutlineAppRegistration className='mr-2 h-5 w-5' />
								Register
							</Button>
						</RegistrationButton>
					</div>
				</div>
			</div>
		</main>
	);
}
