import Label from './Label';

interface Props {
  title: string;
}

const HeroHeading = ({ title }: Props) => {
  return (
    <h1 className='z-20 pl-24 pt-12 text-4xl uppercase tracking-wide text-white/90 lg:pl-0 lg:pt-0'>
      <Label labelId={title} />
    </h1>
  );
};

export default HeroHeading;
