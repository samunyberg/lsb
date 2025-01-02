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

  const appointmentId = parseInt(id);

  const appointment = await prisma.appointment.findFirst({
    where: { id: appointmentId },
  });
  if (!appointment)
    return NextResponse.json({ error: 'Invalid appointment' }, { status: 404 });

  const updatedAppointment = await prisma.appointment.update({
    where: { id: appointmentId },
    data: {
      adminNote: body.note,
    },
  });

  return NextResponse.json({ data: updatedAppointment }, { status: 200 });
}
