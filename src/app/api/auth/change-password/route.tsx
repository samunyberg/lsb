import { authOptions } from '@/lib/auth';
import prisma from '@/prisma/client';
import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();

  const id = session.user.id;
  const client = await prisma.user.findFirst({
    where: { id },
  });

  if (!client)
    return NextResponse.json(
      { error: 'Client does not exist.' },
      { status: 404 }
    );

  const isValidPassword = await bcrypt.compare(
    body.oldPassword,
    client.hashedPassword
  );

  if (!isValidPassword)
    return NextResponse.json({ error: 'Invalid password' }, { status: 400 });

  if (body.newPassword !== body.confirmNewPassword)
    return NextResponse.json(
      { error: 'Passwords no not match' },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(body.newPassword, 10);

  try {
    await prisma.user.update({
      where: { id },
      data: { hashedPassword },
    });
    return NextResponse.json(
      {
        message: 'Password changed successfully.',
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'An unexpected error occured.' },
      { status: 500 }
    );
  }
}
