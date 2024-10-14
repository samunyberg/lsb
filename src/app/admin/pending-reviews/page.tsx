import PendingReviewList from '@/components/admin/pendingReviews/PendingReviewList';
import { getPendingReviews } from '@/lib/db/reviews';

const AdminPendingReviewsPage = async () => {
  const reviews = await getPendingReviews();

  return <PendingReviewList reviews={reviews} />;
};

export default AdminPendingReviewsPage;