import { authOptions } from '@/lib/auth';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: { id: string };
}

export async function PATCH(req: NextRequest, { params: { id } }: Props) {
  const body = await req.json();

  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!session.user.isAdmin)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const client = await prisma.user.findFirst({ where: { id } });
  if (!client)
    return NextResponse.json({ error: 'Invalid client.' }, { status: 404 });

  const updatedClient = await prisma.user.update({
    where: { id },
    data: { adminNote: body.note },
  });

  return NextResponse.json(updatedClient, { status: 200 });
}

export async function DELETE(req: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!session.user.isAdmin)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const client = await prisma.user.findFirst({ where: { id } });
  if (!client)
    return NextResponse.json({ error: 'Invalid client.' }, { status: 404 });
  if (client.isAdmin)
    return NextResponse.json(
      { error: 'Admin user cannot be deleted.' },
      { status: 400 }
    );

  const deletedClient = await prisma.user.delete({ where: { id } });

  return NextResponse.json({ id: deletedClient.id }, { status: 200 });
}
