import AppointmentFilters from '@/components/admin/appointments/AppointmentFilters';
import AppointmentTable from '@/components/admin/appointments/AppointmentTable';
import Pagination from '@/components/Pagination';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';

interface Props {
  searchParams: {
    date: string;
    status: Status;
    client: string;
    page: string;
  };
}

const AdminAppointmentListPage = async ({ searchParams }: Props) => {
  const date = searchParams.date ? new Date(searchParams.date) : undefined;
  const clientName = searchParams.client || undefined;

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 12;

  const where = {
    dateTime: date
      ? {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lt: new Date(date.setHours(24, 0, 0, 0)),
        }
      : undefined,
    status,
    clientName: { contains: clientName },
  };

  const appointments = await prisma.appointment.findMany({
    where,
    include: { client: true, service: true, style: true },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const count = await prisma.appointment.count({
    where,
  });

  return (
    <div className='flex flex-col gap-5 pb-10'>
      <AppointmentFilters />
      <AppointmentTable appointments={appointments} />
      <Pagination currentPage={page} pageSize={pageSize} itemCount={count} />
    </div>
  );
};

export default AdminAppointmentListPage;
