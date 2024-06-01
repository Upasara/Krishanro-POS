import LoginButton from '@/components/auth/button';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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
					<h1 className='text-[#fff] text-6xl'>Welcome to Krishanro Dough & Co - POS</h1>
					<div className='flex justify-center items-center space-x-7 '>
						<LoginButton>
							<Button className='bg-[#fff]' variant='secondary' size='lg'>
								Login
							</Button>
						</LoginButton>
						<Button className='bg-[#fff]' variant='secondary' size='lg'>
							Register
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
}
