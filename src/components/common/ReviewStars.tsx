import { FaRegStar, FaStar } from 'react-icons/fa';

interface Props {
  stars: number;
}

const ReviewStars = ({ stars }: Props) => {
  const totalStars = 5;

  return (
    <div className='flex gap-1 rounded-sm px-3 py-2 text-accent'>
      {Array.from({ length: totalStars }, (_, i) =>
        i < stars ? (
          <FaStar key={i} size={20} />
        ) : (
          <FaRegStar key={i} size={20} />
        )
      )}
    </div>
  );
};

export default ReviewStars;
