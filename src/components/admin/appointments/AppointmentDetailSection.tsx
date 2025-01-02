import AppointmentStatusBadge from '@/components/common/appointments/AppointmentStatusBadge';
import Section from '@/components/common/Section';
import useLocale from '@/hooks/useLocale';
import { AppointmentWithData } from '@/lib/types';
import { formatDate, formatTime } from '@/lib/utils/dateAndTimeUtils';
import Link from 'next/link';
import UnregisteredBadge from './UnregisteredBadge';

interface Props {
  appointment: AppointmentWithData;
}

const AppointmentDetailSection = ({ appointment }: Props) => {
  const locale = useLocale();

  const renderBookedAt = () => {
    if (appointment.status !== 'BOOKED') return null;

    return appointment.rescheduledAt
      ? new Date(appointment.rescheduledAt).toLocaleString(locale, {
          dateStyle: 'short',
          timeStyle: 'short',
        })
      : new Date(appointment.bookedAt!).toLocaleString(locale, {
          dateStyle: 'short',
          timeStyle: 'short',
        });
  };

  const getClientName = () => {
    if (appointment.status !== 'BOOKED') return null;

    return appointment.isRegisteredClient ? (
      <Link
        href={`/admin/clients/${appointment.clientId}`}
        className='underline'
      >
        {appointment.clientName}
      </Link>
    ) : (
      <div className='flex items-center gap-1'>
        <span>{appointment.clientName}</span>
        <UnregisteredBadge />
      </div>
    );
  };

  const rows = [
    {
      label: 'Status',
      content: <AppointmentStatusBadge status={appointment.status} />,
    },
    {
      label: 'Booked at',
      content: renderBookedAt(),
    },
    {
      label: 'ID',
      content: appointment.status === 'BOOKED' && appointment.id,
    },
    {
      label: 'Client',
      content: getClientName(),
    },
    {
      label: 'Style',
      content: (
        <Link
          href={`/admin/styles/${appointment.service?.id}`}
          className='underline'
        >
          {appointment.styleName}
        </Link>
      ),
    },
    {
      label: 'Service',
      content: (
        <Link
          href={`/admin/styles/${appointment.serviceId}/services/${appointment.serviceId}`}
          className='underline'
        >
          {appointment.serviceNameEn}
        </Link>
      ),
    },
  ];

  return (
    <Section
      title={`${formatDate(appointment.dateTime, locale, { dateStyle: 'short' })} • ${formatTime(appointment.dateTime, locale)}`}
    >
      <table className='w-full'>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className=''>
              <td className='p-2 text-sm font-semibold uppercase'>
                {row.label}
              </td>
              <td className='p-2'>{row.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
};

export default AppointmentDetailSection;
