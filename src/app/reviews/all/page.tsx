import Container from '@/components/common/Container';
import ReviewList from '@/components/reviews/ReviewList';
import prisma from '@/prisma/client';

const AllReviewsPage = async () => {
  const approvedReviews = await prisma.review.findMany({
    where: { status: 'APPROVED' },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <Container className='max-w-lg pb-16 pt-8'>
      <ReviewList reviews={approvedReviews} />
    </Container>
  );
};

export default AllReviewsPage;
