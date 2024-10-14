import useLanguage from '@/hooks/useLanguage';
import { Review } from '@prisma/client';
import Label from '../common/Label';
import Panel from '../common/Panel';

interface Props {
  reviews: Review[];
}

const AverageRating = ({ reviews }: Props) => {
  const { getLabel } = useLanguage();

  const averageStars = () => {
    const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0);

    return (totalStars / reviews.length).toFixed(1);
  };

  const title =
    reviews.length === 1
      ? getLabel('reviews.reviewList.average_rating.header_singular')
      : getLabel('reviews.reviewList.average_rating.header_plural');

  if (reviews.length === 0) return null;

  return (
    <div className='flex items-center justify-between'>
      <h2 className='text-lg font-semibold uppercase'>{`${reviews.length} ${title}`}</h2>
      <div className='flex items-center gap-2'>
        <span className='text-sm'>
          <Label labelId='reviews.reviewList.average_rating.average_rating' />
        </span>
        <Panel className='px-2 py-1 font-semibold'>
          {`${averageStars()} / 5`}
        </Panel>
      </div>
    </div>
  );
};

export default AverageRating;
