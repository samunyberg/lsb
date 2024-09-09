import { PaginationData } from '@/components/Pagination';
import { StyleWithServices } from '../types';
import prisma from '@/prisma/client';

export async function getStyles(): Promise<StyleWithServices[]> {
  const styles = await prisma.style.findMany({
    include: { services: true },
  });

  return styles as StyleWithServices[];
}

export async function getPaginatedStyles({
  pageNumber,
  pageSize,
}: PaginationData): Promise<{
  styles: StyleWithServices[];
  count: number;
}> {
  const [styles, count] = await Promise.all([
    prisma.style.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      include: { services: true },
    }),
    prisma.style.count(),
  ]);

  return { styles, count };
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
