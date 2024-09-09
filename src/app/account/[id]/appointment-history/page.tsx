import AppointmentHistory from '@/components/account/AppointmentHistory';
import Container from '@/components/common/Container';
import Label from '@/components/common/Label';
import StrikeThroughText from '@/components/common/StrikeThroughText';
import { getPassedAppointmentsByClientId } from '@/lib/db/appointments';

interface Props {
  params: { id: string };
}

const AppointmentHistoryPage = async ({ params: { id } }: Props) => {
  const passedAppointments = await getPassedAppointmentsByClientId(id);

  return (
    <Container className='max-w-xl'>
      <StrikeThroughText className='my-6 w-full md:my-12'>
        <Label labelId='account.appointment_history.title' />
      </StrikeThroughText>
      <AppointmentHistory appointments={passedAppointments} />
    </Container>
  );
};

export default AppointmentHistoryPage;
