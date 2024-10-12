import Container from '@/components/common/Container';
import Hero from '@/components/common/Hero';
import Spacer from '@/components/common/Spacer';
import ReviewForm from '@/components/reviews/ReviewForm';
import ReviewList from '@/components/reviews/ReviewList';
import prisma from '@/prisma/client';
import heroImg from '../../../public/images/lashes-bg.jpg';

const ReviewsPage = async () => {
  const reviews = await prisma.review.findMany({
    where: { status: 'APPROVED' },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <Container className='max-w-lg pb-12'>
      <Hero title='reviews.title' imgData={heroImg} imgAlt='lashes image' />
      <h2 className='mt-8'>
        How was your experience with me? I would appreciate if you could write a
        review to...
      </h2>
      <ul className='mt-6 flex list-disc flex-col gap-2 px-8'>
        <li>Let other people know your thoughts</li>
        <li>Help me to improve my service</li>
      </ul>
      <Spacer className='!my-8' />
      <ReviewForm />
      <Spacer className='!my-10' />
      <ReviewList reviews={reviews} />
    </Container>
  );
};

export const dynamic = 'force-dynamic';

export default ReviewsPage;
