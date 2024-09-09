import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: {
    id: string;
  };
}

export async function PATCH(_request: NextRequest, { params: { id } }: Props) {
  const appointmentId = parseInt(id);

  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
  });

  if (!appointment || appointment.status !== 'AVAILABLE')
    return NextResponse.json({ error: 'Invalid appointment' }, { status: 400 });

  try {
    const unavailableAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: 'UNAVAILABLE',
      },
    });
    return NextResponse.json({ data: unavailableAppointment }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
