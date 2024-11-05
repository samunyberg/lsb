import { authOptions } from '@/lib/auth';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: { id: string };
}

export async function DELETE(req: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!session.user.isAdmin)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const client = await prisma.user.findFirst({ where: { id } });

  if (!client)
    return NextResponse.json({ error: 'Invalid client.' }, { status: 400 });

  if (client.isAdmin)
    return NextResponse.json(
      { error: 'Admin user cannot be deleted.' },
      { status: 400 }
    );

  try {
    const deletedClient = await prisma.user.delete({ where: { id } });
    return NextResponse.json({ id: deletedClient.id }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'An unexpected error occured.' },
      { status: 500 }
    );
  }
}
