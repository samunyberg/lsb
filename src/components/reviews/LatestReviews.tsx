'use client';

import { Review } from '@prisma/client';
import Link from 'next/link';
import Button from '../common/Button';
import Label from '../common/Label';
import ScrollContainer from '../common/ScrollContainer';
import Section from '../common/Section';
import ReviewListItem from './ReviewListItem';

interface Props {
  reviews: Review[];
}

const LatestReviews = ({ reviews }: Props) => {
  if (reviews.length === 0) return null;

  return (
    <Section
      title={
        <div className='ic flex justify-between'>
          <Label labelId='reviews.latest.heading' />
          {'< >'}
        </div>
      }
    >
      <ScrollContainer
        data={reviews}
        renderItem={(review) => <ReviewListItem review={review} />}
      />
      <Link href={'/reviews/all'}>
        <Button>
          <Label labelId='reviews.latest.button' />
        </Button>
      </Link>
    </Section>
  );
};

export default LatestReviews;
