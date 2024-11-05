import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma/client';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!session.user.isAdmin)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();

  if (!body.name || !body.imageId) {
    return NextResponse.json(
      { error: 'Name and imageId are required' },
      { status: 400 }
    );
  }

  const existingStyle = await prisma.style.findFirst({
    where: { name: body.name },
  });

  if (existingStyle)
    return NextResponse.json(
      { error: 'This style already exists' },

      { status: 409 }
    );

  try {
    const style = await prisma.style.create({
      data: {
        name: body.name,
        imageUrl: body.imageId,
      },
    });
    return NextResponse.json({ id: style.id }, { status: 201 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'An unexpected error occured.' },
      { status: 500 }
    );
  }
}
