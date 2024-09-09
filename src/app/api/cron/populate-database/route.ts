// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client');
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

process.env.TZ = 'Europe/Helsinki';

const fixedTimes = ['09:30', '13:00', '16:30'];

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const populateAppointments = async () => {
    const today = new Date();
    const targetDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // Three months from the current date

    // Skip weekends (Saturday and Sunday)
    if (targetDate.getDay() === 0 || targetDate.getDay() === 6) {
      console.log('No appointments created on weekends');
      await prisma.$disconnect();
      return;
    }

    for (const time of fixedTimes) {
      const utcDateTime = createUTCTime(targetDate, time);

      await prisma.appointment.create({
        data: {
          dateTime: utcDateTime,
          status: 'AVAILABLE',
        },
      });
    }
  };

  try {
    await populateAppointments();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error populating appointments:', error);
    return NextResponse.json(
      { error: 'Failed to populate appointments' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

const createUTCTime = (date: Date, time: string) => {
  const [hours, minutes] = time.split(':');
  const dateTime = new Date(date);
  dateTime.setHours(Number(hours), Number(minutes), 0, 0);

  return dateTime.toISOString();
};

export const dynamic = 'force-dynamic';
