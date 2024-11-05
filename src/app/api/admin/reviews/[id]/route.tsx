import { authOptions } from '@/lib/auth';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: { id: string };
}

export async function PATCH(req: NextRequest, { params: { id } }: Props) {
  const reviewId = parseInt(id);

  const review = await prisma.review.findFirst({ where: { id: reviewId } });

  if (!review)
    return NextResponse.json(
      { error: 'Review does not exist' },
      { status: 404 }
    );

  try {
    await prisma.review.update({
      where: { id: reviewId },
      data: { status: 'APPROVED' },
    });

    return NextResponse.json(
      { message: 'Review has been approved' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!session.user.isAdmin)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const reviewId = parseInt(id);

  const review = await prisma.review.findFirst({ where: { id: reviewId } });

  if (!review)
    return NextResponse.json(
      { error: 'Review does not exist' },
      { status: 404 }
    );

  try {
    await prisma.review.delete({
      where: { id: reviewId },
    });

    return NextResponse.json(
      { message: 'Review has been deleted' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
