import Container from '@/components/common/Container';
import ReviewList from '@/components/reviews/ReviewList';
import { getApprovedReviews } from '@/lib/db/reviews';

const AllReviewsPage = async () => {
  const reviews = await getApprovedReviews();

  return (
    <Container className='max-w-lg pb-16 pt-8'>
      <ReviewList reviews={reviews} />
    </Container>
  );
};

export default AllReviewsPage;
