'use client';

import Spacer from '@/components/common/Spacer';
import { AppointmentWithData } from '@/lib/types';
import { useRouter } from 'next/navigation';
import Calendar from '../../calendar/Calendar';
import RecentlyBooked from '../recentlyBooked/RecentlyBooked';
import AppointmentChart from './AppointmentChart';
import Today from './Today';

interface Props {
  upcomingAppointments: AppointmentWithData[];
  todaysAppointments: AppointmentWithData[];
  recentlyBooked: AppointmentWithData[];
  chartData: {
    month: string;
    count: number;
  }[];
}

const Dashboard = ({
  upcomingAppointments,
  todaysAppointments,
  recentlyBooked,
  chartData,
}: Props) => {
  const router = useRouter();

  return (
    <div className='flex flex-col pb-10 pt-5 lg:grid lg:h-[calc(100vh-135px)] lg:grid-cols-5 lg:grid-rows-8 lg:gap-6 lg:overflow-hidden lg:pb-0 lg:pt-0'>
      <div className='order-2 lg:col-span-3 lg:col-start-1 lg:row-span-5 lg:row-start-1'>
        <Calendar
          admin
          initialData={upcomingAppointments}
          onAppointmentSelect={(app) =>
            router.push(`/admin/appointments/${app.id}`)
          }
        />
        <Spacer className='my-8 lg:hidden' />
      </div>
      <div className='order-4 h-80 md:h-full lg:col-span-3 lg:col-start-1 lg:row-span-3 lg:row-start-6'>
        <AppointmentChart data={chartData} />
      </div>
      <div className='order-1 lg:col-span-2 lg:col-start-4 lg:row-span-5 lg:row-start-1'>
        <Today appointments={todaysAppointments} />
        <Spacer className='my-8 lg:hidden' />
      </div>
      <div className='order-3 lg:col-span-2 lg:col-start-4 lg:row-span-4 lg:row-start-5 lg:pl-3 lg:pt-5'>
        <RecentlyBooked initialData={recentlyBooked} />
        <Spacer className='my-8 lg:hidden' />
      </div>
    </div>
  );
};

export default Dashboard;
