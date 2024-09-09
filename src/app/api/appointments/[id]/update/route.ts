import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: { id: string };
}

export async function PATCH(req: NextRequest, { params: { id } }: Props) {
  const body = await req.json();

  const appointmentId = parseInt(id);

  const appointment = await prisma.appointment.findFirst({
    where: { id: appointmentId },
  });

  if (!appointment)
    return NextResponse.json({ error: 'Invalid appointment' }, { status: 404 });

  try {
    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        adminNote: body.adminNote,
      },
    });
    return NextResponse.json({ data: updatedAppointment }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'An unexpected error occured.' },
      { status: 500 }
    );
  }
}
