import useLocale from '@/hooks/useLocale';
import { AppointmentWithData } from '@/lib/types';
import { formatDate } from '@/lib/utils/dateAndTimeUtils';
import Label from '../../common/Label';
import DashboardHeader from './DashboardHeader';
import DaySchedule from './DaySchedule';

interface Props {
  appointments: AppointmentWithData[];
}

const Today = ({ appointments }: Props) => {
  const locale = useLocale();

  return (
    <div>
      <DashboardHeader>
        <Label labelId='admin.dashboard.today.title' />,{' '}
        {formatDate(new Date(), locale, {
          day: '2-digit',
          month: 'long',
        })}
      </DashboardHeader>
      <DaySchedule appointments={appointments} />
    </div>
  );
};

export default Today;
