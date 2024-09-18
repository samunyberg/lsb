import { AppointmentWithData } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Label from '../../common/Label';
import DashboardHeader from '../dashboard/DashboardHeader';
import RecentlyBookedItem from './RecentlyBookedItem';

interface Props {
  initialData: AppointmentWithData[];
}

const RecentlyBooked = ({ initialData }: Props) => {
  const { data: appointments = initialData, error } = useQuery<
    AppointmentWithData[],
    Error
  >({
    queryKey: ['recently-booked'],
    queryFn: () =>
      axios
        .get<AppointmentWithData[]>('/api/admin/appointments/recent')
        .then((res) => res.data),
    refetchInterval: 5 * 60 * 1000,
    initialData: initialData,
  });

  if (error) return <div>Error fetching the data</div>;

  return (
    <div className='flex h-full flex-col'>
      <DashboardHeader>
        <Label labelId='admin.dashboard.recently_booked.title' />
      </DashboardHeader>
      {appointments.length === 0 ? (
        <div className=''>
          <Label labelId='admin.dashboard.recently_booked.no_new_bookings' />
        </div>
      ) : (
        <div className='flex h-full flex-col gap-6 lg:overflow-y-auto lg:scroll-smooth'>
          {appointments?.map((app) => (
            <RecentlyBookedItem key={app.id} appointment={app} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyBooked;
