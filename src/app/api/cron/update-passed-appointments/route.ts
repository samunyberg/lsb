// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client');
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

process.env.TZ = 'Europe/Helsinki';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const updatePassedAppointments = async () => {
    try {
      const now = new Date();

      await prisma.appointment.updateMany({
        where: {
          dateTime: {
            lt: now,
          },
          status: {
            not: 'PASSED',
          },
        },
        data: {
          status: 'PASSED',
        },
      });

      console.log('Updated passed appointments successfully');
    } catch (error) {
      console.error('Failed to update passed appointments:', error);
    } finally {
      await prisma.$disconnect();
    }
  };

  try {
    await updatePassedAppointments();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error updating appointments:', error);
    return NextResponse.json(
      { error: 'Failed to update appointments' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
