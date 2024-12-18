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
        <div className='flex h-64 items-center justify-center '>
          <div className='rounded-md bg-red-100 px-4 py-2 text-red-800'>
            <Label labelId='calendar.expanded_day.no_appointments' />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientExpandedDayContent;
