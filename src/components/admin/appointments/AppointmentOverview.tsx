'use client';

import AppointmentStatusBadge from '@/components/common/appointments/AppointmentStatusBadge';
import Label from '@/components/common/Label';
import Panel from '@/components/common/Panel';
import useLocale from '@/hooks/useLocale';
import { AppointmentWithData } from '@/lib/types';
import { formatDate, formatTime } from '@/lib/utils/dateAndTimeUtils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaCalendar, FaCalendarCheck, FaEdit } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';
import ManagementPage from '../ManagementPage';
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
            label: appointment.adminNote ? 'Edit note' : 'Add note',
            icon: <FaEdit />,
            onClick: () => setIsNoteFormVisible(true),
          },
          {
            label: 'Reschedule',
            icon: <FaCalendar />,
            onClick: () =>
              router.push(`/admin/appointments/${appointment.id}/reschedule`),
          },
          {
            label: 'Cancel',
            icon: <MdOutlineCancel size={20} />,
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
            icon: <FaCalendar />,
            onClick: () =>
              router.push(
                `/admin/appointments/${appointment.id}/book-for-client`
              ),
          },
          {
            label: 'Make unavailable',
            icon: <MdOutlineCancel size={20} />,
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
            icon: <FaCalendarCheck />,
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
    <>
      <ManagementPage
        title={`${formatDate(appointment.dateTime, locale, { dateStyle: 'short' })} | ${formatTime(appointment.dateTime, locale)}`}
        actions={getActions()}
      >
        <div>
          <Panel className='overflow-hidden'>
            <table className='w-full border-collapse'>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className='border border-black/20'>
                    <td className='border-r border-black/20 p-2 text-sm font-semibold'>
                      {row.label}
                    </td>
                    <td className='p-2'>{row.content}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
          {appointment.adminNote && (
            <Panel className='my-5 flex flex-col gap-1 p-4'>
              <span className='font-semibold'>
                <Label labelId='admin.appointments.note.title' />
                {':'}
              </span>
              <p>{appointment.adminNote}</p>
            </Panel>
          )}
        </div>
      </ManagementPage>
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
    </>
  );
};

export default AppointmentOverview;
