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

  if (!appointment || appointment.status !== 'BOOKED')
    return NextResponse.json({ error: 'Invalid appointment' }, { status: 400 });

  try {
    const cancelledAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: 'AVAILABLE',
        bookedAt: null,
        rescheduledAt: null,
        clientId: null,
        isRegisteredClient: true,
        styleId: null,
        serviceId: null,
        clientName: null,
        clientEmail: null,
        clientPhone: null,
        styleName: null,
        serviceNameEn: null,
        serviceNameFi: null,
        servicePrice: null,
        adminNote: null,
      },
    });
    return NextResponse.json({ data: cancelledAppointment }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
