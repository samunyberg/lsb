import prisma from '@/prisma/client';
import { Client, ClientWithAppointments } from '../types';

export async function getClients(): Promise<Client[]> {
  return await prisma.user.findMany();
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
      adminNote: true,
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
      adminNote: true,
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
