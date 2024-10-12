'use client';

import { Review } from '@prisma/client';
import PendingReviewListItem from './PendingReviewListItem';

interface Props {
  reviews: Review[];
}

const PendingReviewList = ({ reviews }: Props) => {
  if (reviews.length === 0)
    return <div className='p-5'>No pending reviews.</div>;

  return (
    <div className='flex flex-col gap-8 lg:mx-auto lg:max-w-[500px]'>
      {reviews.map((review) => (
        <PendingReviewListItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default PendingReviewList;
