import { authOptions } from '@/lib/auth';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: {
    id: string;
  };
}

export async function PATCH(_request: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!session.user.isAdmin)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const appointmentId = parseInt(id);

  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
  });

  if (!appointment || appointment.status !== 'UNAVAILABLE')
    return NextResponse.json({ error: 'Invalid appointment' }, { status: 400 });

  try {
    const availableAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: 'AVAILABLE',
      },
    });
    return NextResponse.json({ id: availableAppointment.id }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
