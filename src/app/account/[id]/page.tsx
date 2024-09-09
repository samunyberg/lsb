import ClientAppointments from '@/components/account/ClientAppointments';
import EditPersonalInformation from '@/components/account/EditPersonalInformation';
import AppointmentHistoryLink from '@/components/common/AppointmentHistoryLink';
import Container from '@/components/common/Container';
import Label from '@/components/common/Label';
import Spacer from '@/components/common/Spacer';
import StrikeThroughText from '@/components/common/StrikeThroughText';
import { getClientWithUpcomingAppointments } from '@/lib/db/clients';
import { AppointmentWithData } from '@/lib/types';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

const AccountPage = async ({ params: { id } }: Props) => {
  const client = await getClientWithUpcomingAppointments(id);

  if (!client) notFound();

  return (
    <Container className='max-w-4xl pb-10'>
      <StrikeThroughText className='my-6 w-full md:my-12'>
        <Label labelId='account.title' />
      </StrikeThroughText>
      <div className='lg:gap-18 flex flex-col gap-3 md:flex-row-reverse md:gap-12'>
        <div className='flex-1'>
          <ClientAppointments
            appointments={client.appointments as AppointmentWithData[]}
          />
          <div className='mt-8'>
            <AppointmentHistoryLink clientId={id} />
          </div>
          <Spacer className='md:hidden' />
        </div>
        <div className='md:flex-1'>
          <EditPersonalInformation user={client} />
        </div>
      </div>
    </Container>
  );
};

export default AccountPage;
