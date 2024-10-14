'use client';

import Label from '@/components/common/Label';
import { Review } from '@prisma/client';
import ManagementPage from '../ManagementPage';
import PendingReviewListItem from './PendingReviewListItem';
import Panel from '@/components/common/Panel';

interface Props {
  reviews: Review[];
}

const PendingReviewList = ({ reviews }: Props) => {
  if (reviews.length === 0)
    return (
      <Panel className='p-5'>
        <Label labelId='admin.pending_reviews.no_reviews' />
      </Panel>
    );

  return (
    <ManagementPage title='Pending Reviews' className='pb-12'>
      <div className='flex flex-col gap-8 lg:mx-auto lg:max-w-[500px]'>
        {reviews.map((review) => (
          <PendingReviewListItem key={review.id} review={review} />
        ))}
      </div>
    </ManagementPage>
  );
};

export default PendingReviewList;
