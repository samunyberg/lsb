import useLocale from '@/hooks/useLocale';
import { formatDate } from '@/lib/utils/dateAndTimeUtils';
import { Review } from '@prisma/client';
import ReviewStars from '../common/ReviewStars';
import Spacer from '../common/Spacer';

interface Props {
  review: Review;
}

const ReviewListItem = ({ review }: Props) => {
  const locale = useLocale();

  return (
    <div
      key={review.id}
      className='relative flex h-full w-full flex-col gap-4 rounded-md border border-black/20 bg-white px-5 pb-6 pt-12'
    >
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-1'>
          <span className='line-clamp-1 font-semibold'>{review.name}</span>
          <span className='text-sm italic'>
            {formatDate(review.createdAt, locale)}
          </span>
        </div>
        <div className='absolute right-3 top-3'>
          <ReviewStars stars={review.stars} />
        </div>
      </div>
      <Spacer className='!my-1' />
      <p className='line-clamp-6 h-36'>{review.text}</p>
    </div>
  );
};

export default ReviewListItem;
