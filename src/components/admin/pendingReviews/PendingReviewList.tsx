'use client';

import Label from '@/components/common/Label';
import Panel from '@/components/common/Panel';
import Section from '@/components/common/Section';
import { Review } from '@prisma/client';
import PendingReviewListItem from './PendingReviewListItem';

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
    <Section title='Pending Reviews'>
      <div className='flex flex-col gap-8 lg:mx-auto lg:max-w-[500px]'>
        {reviews.map((review) => (
          <PendingReviewListItem key={review.id} review={review} />
        ))}
      </div>
    </Section>
  );
};

export default PendingReviewList;
