import prisma from '@/prisma/client';
import { AppointmentWithData } from '../types';
import {
  formatDate,
  getFirstAndLastDateOfMonth,
} from '../utils/dateAndTimeUtils';

const clientSelectClause = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  adminNote: true,
};

const appointmentIncludeOptions = {
  style: true,
  service: true,
  client: { select: clientSelectClause },
};

const todayStart = new Date();
todayStart.setHours(0, 0, 0, 0);

const todayEnd = new Date();
todayEnd.setHours(23, 59, 59, 999);

export async function getUpcomingAppointments(): Promise<
  AppointmentWithData[]
> {
  return await prisma.appointment.findMany({
    where: {
      dateTime: {
        gte: todayStart,
      },
    },
    include: appointmentIncludeOptions,
  });
}

export async function getRecentlyBookedAppointments(): Promise<
  AppointmentWithData[]
> {
  const threeDaysAgoStart = new Date(
    todayStart.getTime() - 3 * 24 * 60 * 60 * 1000
  );

  return await prisma.appointment.findMany({
    where: {
      bookedAt: {
        gte: threeDaysAgoStart,
      },
      status: 'BOOKED',
    },
    include: appointmentIncludeOptions,
    orderBy: { bookedAt: 'desc' },
  });
}

export async function getTodaysAppointments(): Promise<AppointmentWithData[]> {
  return await prisma.appointment.findMany({
    where: {
      dateTime: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
    include: appointmentIncludeOptions,
  });
}

export async function getMonthlyAppointmentsCount() {
  const now = new Date();
  const year = now.getFullYear();
  const monthlyCounts = [];

  for (let month = 0; month <= now.getMonth(); month++) {
    const { firstDate, lastDate } = getFirstAndLastDateOfMonth(year, month);
    const count = await prisma.appointment.count({
      where: {
        dateTime: {
          gte: firstDate,
          lte: lastDate,
        },
        status: 'BOOKED',
      },
    });

    monthlyCounts.push({
      month: formatDate(firstDate, 'en-FI', { month: 'long' }),
      count,
    });
  }

  return monthlyCounts;
}

export async function getAppointmentById(
  id: number
): Promise<AppointmentWithData | null> {
  return await prisma.appointment.findFirst({
    where: { id },
    include: appointmentIncludeOptions,
  });
}

export async function getPassedAppointmentsByClientId(id: string) {
  return (await prisma.appointment.findMany({
    where: {
      clientId: id,
      dateTime: { lt: new Date() },
    },
    include: { style: true, service: true },
    orderBy: { dateTime: 'desc' },
  })) as AppointmentWithData[];
}
