import Image from 'next/image';

export default function Home() {
	return (
		<main className='relative h-screen w-full'>
			<div>
				<Image src='/img/hero/cover01.jpg' alt='hero_bg' fill={true} />
			</div>
		</main>
	);
}
