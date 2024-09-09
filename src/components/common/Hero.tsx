import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import HeroHeading from './HeroHeading';

interface Props {
  title: string;
  imgData: StaticImageData;
  imgAlt: string;
}

const Hero = ({ title, imgData, imgAlt }: Props) => {
  return (
    <div className='h-[210px]'>
      <div className='absolute inset-x-0 flex h-[210px] items-center justify-center'>
        <Image
          src={imgData}
          alt={imgAlt}
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 z-10 bg-gradient-to-r from-black/80' />
        <HeroHeading title={title} />
      </div>
    </div>
  );
};

export default Hero;
