import { sendRescheduleNotificationEmail } from '@/emails/rescheduleConfirmationEmail/sendRescheduleConfirmationEmail';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  newId: number;
  clientId: string | null;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  styleId: number;
  styleName: string;
  serviceId: number;
  serviceNameEn: string;
  serviceNameFi: string;
  servicePrice: number;
  adminNote: string | null;
  sendNotification: boolean;
}

interface Props {
  params: {
    id: string;
  };
}

const getClientData = async (clientId?: string | null) => {
  if (!clientId) return null;

  return prisma.user.findUnique({
    where: { id: clientId },
  });
};

export async function PATCH(req: NextRequest, { params: { id } }: Props) {
  const body: RequestBody = await req.json();
  const currentTime = new Date();
  const oldAppointmentId = parseInt(id);

  try {
    const newAppointment = await prisma.appointment.findUnique({
      where: { id: body.newId },
    });

    if (!newAppointment || newAppointment.status === 'BOOKED') {
      throw new Error(
        newAppointment
          ? 'This appointment is already booked.'
          : 'Invalid appointment.'
      );
    }

    const client = await getClientData(body.clientId);
    const isRegisteredClient = !!client;

    const rescheduledAppointment = await prisma.$transaction(
      async (prisma) => {
        const oldAppointment = await prisma.appointment.findUnique({
          where: { id: oldAppointmentId },
        });

        if (!oldAppointment || oldAppointment.status !== 'BOOKED') {
          throw new Error('Invalid appointment');
        }

        await prisma.appointment.update({
          where: { id: oldAppointmentId },
          data: {
            status: 'AVAILABLE',
            bookedAt: null,
            rescheduledAt: null,
            isRegisteredClient: true,
            clientId: null,
            clientName: null,
            clientEmail: null,
            clientPhone: null,
            styleId: null,
            styleName: null,
            serviceId: null,
            serviceNameEn: null,
            serviceNameFi: null,
            servicePrice: null,
            adminNote: null,
          },
        });

        const newAppointment = await prisma.appointment.findUnique({
          where: { id: body.newId },
        });

        if (!newAppointment) {
          throw new Error('Invalid appointment.');
        }

        if (newAppointment.status === 'BOOKED') {
          throw new Error('This appointment is already booked.');
        }

        const rescheduledAppointment = await prisma.appointment.update({
          where: { id: body.newId },
          data: {
            status: 'BOOKED',
            bookedAt: currentTime,
            rescheduledAt: currentTime,
            isRegisteredClient,
            clientId: body.clientId,
            clientName: body.clientName,
            clientEmail: body.clientEmail,
            clientPhone: body.clientPhone,
            styleId: body.styleId,
            styleName: body.styleName,
            serviceId: body.serviceId,
            serviceNameEn: body.serviceNameEn,
            serviceNameFi: body.serviceNameFi,
            servicePrice: body.servicePrice,
            adminNote: body.adminNote,
          },
        });

        return rescheduledAppointment;
      },
      { isolationLevel: 'Serializable' }
    );

    if (body.sendNotification) {
      await sendRescheduleNotificationEmail({
        to: client?.email || rescheduledAppointment.clientEmail!,
        dateTime: rescheduledAppointment.dateTime,
        style: rescheduledAppointment.styleName!,
        service: rescheduledAppointment.serviceNameEn!,
      });
    }

    return NextResponse.json(
      { id: rescheduledAppointment.id },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage = error.message;

      const statusMap: Record<string, number> = {
        'Invalid appointment': 400,
        'This appointment is already booked': 409,
      };

      const status = statusMap[errorMessage] || 500;
      return NextResponse.json({ error: errorMessage }, { status });
    }
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
