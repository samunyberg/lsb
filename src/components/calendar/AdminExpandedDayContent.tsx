import { Appointment } from '@prisma/client';
import DaySchedule from '../admin/dashboard/DaySchedule';

interface Props {
  selectedDate: Date;
  appointments: Appointment[];
}

const AdminExpandedDayContent = ({ selectedDate, appointments }: Props) => {
  const appointmentsByDate = appointments?.filter(
    (app) =>
      new Date(app.dateTime).toDateString() === selectedDate.toDateString()
  );

  return <DaySchedule appointments={appointmentsByDate} />;
};

export default AdminExpandedDayContent;
