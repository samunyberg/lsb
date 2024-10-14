'use client';

import { Review } from '@prisma/client';
import { useState } from 'react';
import Button from '../common/Button';
import Label from '../common/Label';
import Panel from '../common/Panel';
import AverageRating from './AverageRating';
import ReviewListItem from './ReviewListItem';

interface Props {
  reviews: Review[];
}

const ReviewList = ({ reviews }: Props) => {
  const [page, setPage] = useState(0);

  const visibleItems = 5;
  const totalPages = Math.ceil(reviews.length / visibleItems);
  const startIndex = page * visibleItems;
  const endIndex = startIndex + visibleItems;

  const paginatedReviews = reviews.slice(startIndex, endIndex);

  return (
    <div>
      <AverageRating reviews={reviews} />
      {reviews.length === 0 ? (
        <Panel className='p-5'>
          <Label labelId='reviews.reviewList.no_reviews' />
        </Panel>
      ) : (
        <div className='my-6 flex flex-col gap-5'>
          {paginatedReviews.map((review) => (
            <ReviewListItem key={review.id} review={review} />
          ))}
        </div>
      )}
      {reviews.length > visibleItems && (
        <Button
          variant='primary'
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages - 1}
        >
          <Label labelId='reviews.reviewList.show_older_button' />
        </Button>
      )}
    </div>
  );
};

export default ReviewList;
