import BookingForm from '@/components/booking/BookingForm';
import { getUpcomingAppointments } from '@/lib/db/appointments';
import prisma from '@/prisma/client';

const BookingPage = async () => {
  const styles = await prisma.style.findMany({
    include: { services: true },
  });

  const appointments = await getUpcomingAppointments();

  return <BookingForm styles={styles} appointments={appointments} />;
};

export const dynamic = 'force-dynamic';

export default BookingPage;
