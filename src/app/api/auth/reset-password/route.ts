import prisma from '@/prisma/client';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.password !== body.confirmPassword)
    return NextResponse.json(
      { error: 'Passwords do not match.' },
      { status: 400 }
    );

  const token = await prisma.verificationToken.findUnique({
    where: { token: body.token },
  });

  if (!token || token.expires < new Date())
    return NextResponse.json(
      { error: 'Invalid or expired token.' },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(body.password, 10);

  await prisma.user.update({
    where: { email: token.identifier },
    data: { hashedPassword },
  });

  return NextResponse.json(
    { message: 'Password changed successfully.' },
    { status: 200 }
  );
}
