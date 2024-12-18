'use client';

import { AppointmentWithData } from '@/lib/types';
import RecentlyBooked from '../recentlyBooked/RecentlyBooked';
import AdminCalendar from './AdminCalendar';
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
  return (
    <div className='flex flex-col gap-5 pb-10 lg:grid lg:grid-cols-5 lg:grid-rows-10 lg:gap-3 lg:pb-10'>
      <div className='order-2 lg:col-span-3 lg:col-start-1 lg:row-span-4 lg:row-start-1'>
        <AdminCalendar initialData={upcomingAppointments} />
      </div>
      <div className='order-4 md:h-full lg:col-span-3 lg:col-start-1 lg:row-span-4 lg:row-start-5'>
        <AppointmentChart data={chartData} />
      </div>
      <div className='order-1 lg:col-span-2 lg:col-start-4 lg:row-span-4 lg:row-start-1'>
        <Today appointments={todaysAppointments} />
      </div>
      <div className='order-3 lg:col-span-2 lg:col-start-4 lg:row-span-full lg:row-start-5'>
        <RecentlyBooked initialData={recentlyBooked} />
      </div>
    </div>
  );
};

export default Dashboard;
