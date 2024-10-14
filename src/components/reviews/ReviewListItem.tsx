import useLocale from '@/hooks/useLocale';
import { formatDate } from '@/lib/utils/dateAndTimeUtils';
import { Review } from '@prisma/client';
import Panel from '../common/Panel';
import ReviewStars from '../common/ReviewStars';
import Spacer from '../common/Spacer';

interface Props {
  review: Review;
}

const ReviewListItem = ({ review }: Props) => {
  const locale = useLocale();

  return (
    <Panel
      key={review.id}
      className='relative flex flex-col gap-4 border-b border-black/20 px-5 pb-6 pt-12'
    >
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-1'>
          <span className='font-semibold'>{review.name}</span>
          <span className='text-sm italic'>
            {formatDate(review.createdAt, locale, {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
        <div className='absolute right-3 top-3'>
          <ReviewStars stars={review.stars} />
        </div>
      </div>
      <Spacer className='!my-1' />
      <p>{review.text}</p>
    </Panel>
  );
};

export default ReviewListItem;
