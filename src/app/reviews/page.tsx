import Container from '@/components/common/Container';
import Hero from '@/components/common/Hero';
import LatestReviews from '@/components/reviews/LatestReviews';
import ReviewForm from '@/components/reviews/ReviewForm';
import { getApprovedReviews } from '@/lib/db/reviews';
import heroImg from '../../../public/images/lashes-bg.jpg';

const ReviewsPage = async () => {
  const reviews = await getApprovedReviews();

  return (
    <Container className='flex max-w-lg flex-col gap-5 pb-14'>
      <Hero title='reviews.title' imgData={heroImg} imgAlt='lashes image' />
      <ReviewForm />
      <LatestReviews reviews={reviews.slice(0, 8)} />
    </Container>
  );
};

export const dynamic = 'force-dynamic';

export default ReviewsPage;
