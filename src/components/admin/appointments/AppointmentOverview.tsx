'use client';

import AppointmentStatusBadge from '@/components/common/appointments/AppointmentStatusBadge';
import Button from '@/components/common/Button';
import Label from '@/components/common/Label';
import Section from '@/components/common/Section';
import SectionList from '@/components/common/SectionList';
import useLocale from '@/hooks/useLocale';
import { AppointmentWithData } from '@/lib/types';
import { formatDate, formatTime } from '@/lib/utils/dateAndTimeUtils';
import { cn } from 'clsx-tailwind-merge';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AdminNoteForm from './AdminNoteForm';
import AppointmentActionConfirmation, {
  AppointmentAction,
} from './AppointmentActionConfirmation';
import UnregisteredBadge from './UnregisteredBadge';

interface Props {
  appointment: AppointmentWithData;
}

const AppointmentOverview = ({ appointment }: Props) => {
  const router = useRouter();
  const locale = useLocale();
  const [isNoteFormVisible, setIsNoteFormVisible] = useState(false);
  const [action, setAction] = useState<AppointmentAction>(null);
  const [showActionConfirmation, setShowActionConfirmation] = useState(false);

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

  const getActions = () => {
    if (!isPassedAppointment) return null;

    switch (appointment.status) {
      case 'BOOKED':
        return [
          {
            label: 'Reschedule',
            onClick: () =>
              router.push(`/admin/appointments/${appointment.id}/reschedule`),
          },
          {
            label: 'Cancel',
            onClick: () => {
              setAction(() => 'cancel');
              setShowActionConfirmation(true);
            },
          },
        ];
      case 'AVAILABLE':
        return [
          {
            label: 'Book for client',
            onClick: () =>
              router.push(
                `/admin/appointments/${appointment.id}/book-for-client`
              ),
          },
          {
            label: 'Make unavailable',
            onClick: () => {
              setAction('make-unavailable');
              setShowActionConfirmation(true);
            },
          },
        ];
      case 'UNAVAILABLE':
        return [
          {
            label: 'Make available',
            onClick: () => {
              setAction('make-available');
              setShowActionConfirmation(true);
            },
          },
        ];
      default:
        return null;
    }
  };

  const isPassedAppointment = () => appointment.dateTime < new Date();

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
    <SectionList>
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
      <Section
        title={
          <div className='flex items-center justify-between'>
            <Label labelId='admin.appointments.note.title' />
            <span
              className='text-sm'
              onClick={() => setIsNoteFormVisible(true)}
            >
              {appointment.adminNote ? 'Edit' : 'Add'}
            </span>
          </div>
        }
      >
        <p className='text-sm'>
          {appointment.adminNote
            ? appointment.adminNote
            : 'Click Add to write a note for this appointment.'}
        </p>
      </Section>
      <Section title='Actions'>
        <div className='flex flex-col gap-4'>
          {getActions()?.map((action, index) => (
            <Button
              key={index}
              className={cn('border-accent', {
                'border-accentGreen': action.label === 'Make available',
                'border-accentOrange': action.label === 'Make unavailable',
                'border-accentRed': action.label === 'Cancel',
              })}
              onClick={() => action.onClick()}
            >
              <span>{action.label}</span>
            </Button>
          ))}
        </div>
      </Section>
      <AdminNoteForm
        isVisible={isNoteFormVisible}
        appointment={appointment}
        onClose={() => setIsNoteFormVisible(false)}
      />
      <AppointmentActionConfirmation
        isVisible={showActionConfirmation}
        appointmentId={appointment.id}
        action={action}
        onClose={() => setShowActionConfirmation(false)}
      />
    </SectionList>
  );
};

export default AppointmentOverview;
