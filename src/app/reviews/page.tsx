import Container from '@/components/common/Container';
import Hero from '@/components/common/Hero';
import Spacer from '@/components/common/Spacer';
import ReviewForm from '@/components/reviews/ReviewForm';
import ReviewList from '@/components/reviews/ReviewList';
import { getApprovedReviews } from '@/lib/db/reviews';
import heroImg from '../../../public/images/lashes-bg.jpg';

const ReviewsPage = async () => {
  const reviews = await getApprovedReviews();

  return (
    <Container className='max-w-lg pb-16'>
      <Hero title='reviews.title' imgData={heroImg} imgAlt='lashes image' />
      <ReviewForm />
      <Spacer className='!my-10' />
      <ReviewList reviews={reviews} />
    </Container>
  );
};

export const dynamic = 'force-dynamic';

export default ReviewsPage;
