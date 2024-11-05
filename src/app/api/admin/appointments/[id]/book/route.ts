import { sendBookingConfirmationEmail } from '@/emails/bookingConfirmationEmail/sendBookingConfirmationEmail';
import { authOptions } from '@/lib/auth';
import prisma from '@/prisma/client';
import { Language } from '@/providers/language/LanguageProvider';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  clientId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  note?: string;
  styleId: number;
  serviceId: number;
  clientLanguage: Language;
}

interface Props {
  params: {
    id: string;
  };
}

const getClientData = async (clientId?: string) => {
  if (!clientId) return null;

  const client = await prisma.user.findUnique({
    where: { id: clientId },
  });
  if (!client) throw new Error('Invalid client');

  return client;
};

const getStyleDetails = async (styleId: number, serviceId: number) => {
  const style = await prisma.style.findUnique({
    where: { id: styleId },
  });
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!style) throw new Error('Invalid style');
  if (!service) throw new Error('Invalid service');

  return { style, service };
};

export async function PATCH(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!session.user.isAdmin)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body: RequestBody = await request.json();
  const currentTime = new Date();
  const appointmentId = parseInt(params.id);

  try {
    const client = await getClientData(body.clientId);
    const isRegisteredClient = !!client;

    const { style, service } = await getStyleDetails(
      body.styleId,
      body.serviceId
    );

    const bookedAppointment = await prisma.$transaction(
      async (prisma) => {
        const appointment = await prisma.appointment.findUnique({
          where: { id: appointmentId },
        });

        if (!appointment) throw new Error('Invalid appointment');

        if (appointment.status === 'BOOKED')
          throw new Error('This appointment is already booked');

        return await prisma.appointment.update({
          where: { id: appointmentId },
          data: {
            status: 'BOOKED',
            bookedAt: currentTime,
            clientId: isRegisteredClient ? client.id : null,
            isRegisteredClient,
            clientName: isRegisteredClient
              ? `${client.firstName} ${client.lastName}`
              : `${body.firstName} ${body.lastName}`,
            clientEmail: isRegisteredClient ? client.email : body.email,
            clientPhone: isRegisteredClient ? client.phone : body.phone,
            styleId: body.styleId,
            styleName: style.name,
            serviceId: body.serviceId,
            serviceNameEn: service.name_en,
            serviceNameFi: service.name_fi,
            servicePrice: service.price,
            adminNote: body.note,
          },
        });
      },
      { isolationLevel: 'Serializable' }
    );

    await sendBookingConfirmationEmail({
      language: body.clientLanguage,
      to: isRegisteredClient ? client.email : body.email!,
      dateTime: bookedAppointment.dateTime,
      style: bookedAppointment.styleName!,
      service:
        body.clientLanguage === 'en'
          ? bookedAppointment.serviceNameEn!
          : bookedAppointment.serviceNameFi!,
    });

    return NextResponse.json({ id: bookedAppointment.id }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = error.message;

      const statusMap: Record<string, number> = {
        'Invalid client': 400,
        'Invalid appointment': 400,
        'Invalid service': 400,
        'Invalid service option': 400,
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
