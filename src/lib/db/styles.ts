import prisma from '@/prisma/client';
import { StyleWithServices } from '../types';

export async function getStyles(): Promise<StyleWithServices[]> {
  const styles = await prisma.style.findMany({
    include: { services: true },
  });

  return styles as StyleWithServices[];
}

export async function getStyleById(id: number) {
  const style = await prisma.style.findFirst({
    where: { id },
    include: { services: true },
  });

  return style as StyleWithServices;
}

export async function getServiceByStyleIdAndServiceId(
  styleId: number,
  serviceId: number
) {
  const service = await prisma.service.findFirst({
    where: { styleId, id: serviceId },
  });

  return service;
}
