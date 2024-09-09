import { PaginationData } from '@/components/Pagination';
import { Client, ClientWithAppointments } from '../types';
import prisma from '@/prisma/client';

export async function getClients(): Promise<Client[]> {
  return await prisma.user.findMany();
}

export async function getPaginatedClients({
  pageNumber,
  pageSize,
}: PaginationData): Promise<{ clients: Client[]; count: number }> {
  const [clients, count] = await Promise.all([
    prisma.user.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      orderBy: { lastName: 'asc' },
    }),
    prisma.user.count(),
  ]);

  return { clients, count };
}

export async function getClientsBySearchTerm(
  term: string,
  { pageNumber, pageSize }: PaginationData
): Promise<{ clients: Client[]; count: number }> {
  const whereClause = {
    OR: [
      { firstName: { contains: term } },
      { lastName: { contains: term } },
      { email: { contains: term } },
      { phone: { contains: term } },
    ],
  };

  const [clients, count] = await Promise.all([
    prisma.user.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where: whereClause,
    }),
    prisma.user.count({
      where: whereClause,
    }),
  ]);

  return { clients, count };
}

export async function getClientById(id: string) {
  const client = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      appointments: {
        include: { style: true, service: true },
      },
    },
  });

  return client as ClientWithAppointments;
}

export async function getClientWithUpcomingAppointments(id: string) {
  const client = await prisma.user.findFirst({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      appointments: {
        where: {
          dateTime: { gt: new Date() },
        },
        include: { style: true, service: true },
      },
    },
  });

  return client as ClientWithAppointments;
}
