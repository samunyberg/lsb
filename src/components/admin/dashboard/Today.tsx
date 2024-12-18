import Section from '@/components/common/Section';
import useLocale from '@/hooks/useLocale';
import { AppointmentWithData } from '@/lib/types';
import { formatDate } from '@/lib/utils/dateAndTimeUtils';
import Label from '../../common/Label';
import DaySchedule from './DaySchedule';

interface Props {
  appointments: AppointmentWithData[];
}

const Today = ({ appointments }: Props) => {
  const locale = useLocale();

  return (
    <Section
      title={
        <>
          <Label labelId='admin.dashboard.today.title' />,{' '}
          {formatDate(new Date(), locale, {
            day: '2-digit',
            month: 'long',
          })}
        </>
      }
    >
      <DaySchedule appointments={appointments} />
    </Section>
  );
};

export default Today;
