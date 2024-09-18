import { AppointmentSearchQuery } from '@/app/admin/appointments/search/page';
import { PaginationData } from '@/components/Pagination';
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

export async function getAdminInitialAppointments({
  pageNumber,
  pageSize,
}: PaginationData): Promise<{
  appointments: AppointmentWithData[];
  count: number;
}> {
  const [appointments, count] = await Promise.all([
    prisma.appointment.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      include: appointmentIncludeOptions,
      where: { dateTime: { gte: todayStart } },
    }),
    prisma.appointment.count(),
  ]);

  return { appointments, count };
}

export async function getPaginatedAppointmentsBySearchTerm(
  { term, date }: AppointmentSearchQuery,
  { pageNumber, pageSize }: PaginationData
): Promise<{ appointments: AppointmentWithData[]; count: number }> {
  const startOfDay = date ? new Date(date + 'T00:00:00Z') : undefined;
  const endOfDay = date ? new Date(date + 'T23:59:59Z') : undefined;

  const whereClause = {
    AND: [
      term
        ? {
            OR: [
              { client: { firstName: { contains: term } } },
              { client: { lastName: { contains: term } } },
              { client: { email: { contains: term } } },
              {
                AND:
                  term.split(' ').length > 1
                    ? [
                        {
                          client: {
                            firstName: { contains: term.split(' ')[0] },
                          },
                        },
                        {
                          client: {
                            lastName: { contains: term.split(' ')[1] },
                          },
                        },
                      ]
                    : {},
              },
            ],
          }
        : {},

      date ? { dateTime: { gte: startOfDay, lte: endOfDay } } : {},
    ],
  };

  const [appointments, count] = await Promise.all([
    prisma.appointment.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      include: appointmentIncludeOptions,
      where: whereClause,
    }),
    prisma.appointment.count({ where: whereClause }),
  ]);

  return { appointments, count };
}

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
