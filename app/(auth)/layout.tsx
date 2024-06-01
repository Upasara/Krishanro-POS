import Image from 'next/image';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='h-screen w-full flex justify-center items-center text-[#fff] bg-zinc-900/90'>
			<div>
				<Image
					src='/img/hero/cover01.jpg'
					alt='hero_dp'
					fill={true}
					className='absolute w-full h-screen object-cover overflow-hidden mix-blend-overlay'
				/>
			</div>
			<div className='absolute'>{children}</div>
		</div>
	);
};

export default AuthLayout;
