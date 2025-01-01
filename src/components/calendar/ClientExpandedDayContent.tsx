import { Appointment } from '@prisma/client';
import Label from '../common/Label';
import AppointmentTimePicker from './AppointmentTimePicker';
import NoAppointmentsBadge from './NoAppointmentsBadge';

interface Props {
  selectedDate: Date;
  appointments: Appointment[];
  onShowExpandedDay: () => void;
  onAppointmentSelect: (app: Appointment) => void;
  selectedAppointment?: Appointment | null;
}

const ClientExpandedDayContent = ({
  selectedDate,
  onShowExpandedDay,
  appointments,
  onAppointmentSelect,
  selectedAppointment,
}: Props) => {
  const appointmentsByDate = appointments?.filter(
    (app) =>
      new Date(app.dateTime).toDateString() === selectedDate.toDateString()
  );

  return (
    <div>
      {appointmentsByDate?.length > 0 ? (
        <div>
          <p className='mb-8 '>
            <Label labelId='calendar.expanded_day.content' />
          </p>
          <AppointmentTimePicker
            appointments={appointmentsByDate}
            onAppointmentSelect={onAppointmentSelect}
            onShowExpandedDay={onShowExpandedDay}
            selectedAppointment={selectedAppointment}
          />
        </div>
      ) : (
        <NoAppointmentsBadge />
      )}
    </div>
  );
};

export default ClientExpandedDayContent;
