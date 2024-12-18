import { cn } from 'clsx-tailwind-merge';
import { FaRegStar, FaStar } from 'react-icons/fa';
import Label from '../common/Label';

interface Props {
  selected: number;
  onSelect: (star: number) => void;
}

const StarsSelector = ({ selected, onSelect }: Props) => {
  const stars = [1, 2, 3, 4, 5];

  const handleSelect = (star: number) => {
    onSelect(star);
  };

  const renderStar = (star: number) =>
    star <= selected ? <FaStar size={25} /> : <FaRegStar size={25} />;

  return (
    <div className='flex items-center justify-between gap-2 rounded-md border border-black/20 bg-white px-3 py-4'>
      <p className='text-center text-lg uppercase'>
        <Label labelId='reviews.star_selector.rating' />
      </p>
      <div className='flex items-center gap-2'>
        {stars.map((star) => (
          <div
            key={star}
            className={cn('text-accent transition-all', {
              'scale-125': star === selected,
            })}
            onClick={() => handleSelect(star)}
          >
            {renderStar(star)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarsSelector;
