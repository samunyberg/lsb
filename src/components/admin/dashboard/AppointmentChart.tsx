import Label from '@/components/common/Label';
import Section from '@/components/common/Section';
import useLocale from '@/hooks/useLocale';
import { formatDate } from '@/lib/utils/dateAndTimeUtils';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface Props {
  data: { month: string; count: number }[];
}

const AppointmentChart = ({ data }: Props) => {
  const locale = useLocale();

  return (
    <Section
      title={
        <>
          <Label labelId='admin.dashboard.chart.title' />{' '}
          {formatDate(new Date(), locale, { year: 'numeric' })}
        </>
      }
    >
      <div className='h-[250px] w-full overflow-hidden'>
        <ResponsiveContainer width='100%' height={250}>
          <LineChart
            data={data}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='rgba(0, 0, 0, 0.2)' />
            <XAxis dataKey='month' stroke='#524237' />
            <YAxis stroke='#524237' />
            <Tooltip />
            <Line
              strokeWidth={2}
              type='monotone'
              dataKey='count'
              stroke='#c9a489'
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Section>
  );
};

export default AppointmentChart;
