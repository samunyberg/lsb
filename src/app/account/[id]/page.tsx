import ClientAppointments from '@/components/account/ClientAppointments';
import EditPersonalInformation from '@/components/account/EditPersonalInformation';
import AppointmentHistoryLink from '@/components/common/AppointmentHistoryLink';
import Container from '@/components/common/Container';
import Label from '@/components/common/Label';
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
    <Container className='max-w-4xl pb-14'>
      <StrikeThroughText className='my-6 w-full md:my-12'>
        <Label labelId='account.title' />
      </StrikeThroughText>
      <div className='flex flex-col gap-5 lg:grid lg:grid-cols-4 lg:grid-rows-4 lg:gap-3'>
        <div className='lg:col-span-2 lg:col-start-3 lg:row-span-2 lg:row-start-1'>
          <ClientAppointments
            appointments={client.appointments as AppointmentWithData[]}
          />
        </div>
        <div className='lg:col-span-2 lg:col-start-3 lg:row-span-1 lg:row-start-3'>
          <AppointmentHistoryLink
            href={`/account/${client.id}/appointment-history`}
          />
        </div>
        <div className='lg:col-span-2 lg:col-start-1 lg:row-span-full lg:row-start-1'>
          <EditPersonalInformation user={client} />
        </div>
      </div>
    </Container>
  );
};

export const dynamic = 'force-dynamic';

export default AccountPage;
