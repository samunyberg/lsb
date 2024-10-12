import ManagementPage from '@/components/admin/ManagementPage';
import PendingReviewList from '@/components/admin/pendingReviews/PendingReviewList';
import prisma from '@/prisma/client';

const AdminPendingReviewsPage = async () => {
  const reviews = await prisma.review.findMany({
    where: { status: 'PENDING' },
  });

  return (
    <ManagementPage title='Pending Reviews' className='pb-12'>
      <PendingReviewList reviews={reviews} />
    </ManagementPage>
  );
};

export default AdminPendingReviewsPage;
