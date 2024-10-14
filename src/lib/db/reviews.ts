import prisma from '@/prisma/client';

export async function getApprovedReviews() {
  const approvedReviews = await prisma.review.findMany({
    where: { status: 'APPROVED' },
    orderBy: { createdAt: 'desc' },
  });

  return approvedReviews;
}

export async function getPendingReviews() {
  const pendingReviews = await prisma.review.findMany({
    where: { status: 'PENDING' },
  });

  return pendingReviews;
}
