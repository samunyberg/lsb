import Button from '@/components/common/Button';
import Label from '@/components/common/Label';
import ReviewListItem from '@/components/reviews/ReviewListItem';
import { Review } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  review: Review;
}

const PendingReviewListItem = ({ review }: Props) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const handleApprove = async () => {
    setIsApproving(true);

    try {
      await axios.patch(`/api/admin/reviews/${review.id}`);
      toast.success('Review Approved');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsApproving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await axios.delete(`/api/admin/reviews/${review.id}`);
      toast.success('Review Deleted');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='border-b border-black/20 pb-6 last:border-none'>
      <ReviewListItem review={review} />
      <div className='mt-4 flex gap-4'>
        <Button
          variant='primary'
          className='border-accentRed py-1 text-sm font-semibold'
          onClick={handleDelete}
          isLoading={isDeleting}
          disabled={isDeleting || isApproving}
        >
          <Label labelId='admin.pending_reviews.delete_button' />
        </Button>
        <Button
          variant='primary'
          className='border-accentGreen py-1 text-sm font-semibold'
          onClick={handleApprove}
          isLoading={isApproving}
          disabled={isDeleting || isApproving}
        >
          <Label labelId='admin.pending_reviews.approve_button' />
        </Button>
      </div>
    </div>
  );
};

export default PendingReviewListItem;
