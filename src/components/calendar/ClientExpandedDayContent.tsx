import { Appointment } from '@prisma/client';
import Label from '../common/Label';
import AppointmentTimePicker from './AppointmentTimePicker';

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
        <div className='pr-4'>
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
        <div className='flex h-48 items-center justify-center '>
          <Label labelId='calendar.expanded_day.no_appointments' />
        </div>
      )}
    </div>
  );
};

export default ClientExpandedDayContent;
