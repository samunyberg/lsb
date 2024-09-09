'use client';

import AppointmentStatusBadge from '@/components/common/appointments/AppointmentStatusBadge';
import SearchDate from '@/components/common/forms/SearchDate';
import SearchInput from '@/components/common/forms/SearchInput';
import useLanguage from '@/hooks/useLanguage';
import { AppointmentWithData } from '@/lib/types';
import { formatDate, formatTime } from '@/lib/utils/dateAndTimeUtils';
import Link from 'next/link';
import ManagementPage from '../ManagementPage';
import PaginatedTable from '../PaginatedTable';
import { Config } from '../Table';

interface Props {
  appointments: AppointmentWithData[];
  itemsCount: number;
}

const AppointmentTable = ({ appointments, itemsCount }: Props) => {
  const { currentLanguage, getLabel } = useLanguage();

  const config: Config<AppointmentWithData> = {
    columns: [
      {
        label: getLabel('appointment.date'),
        render: (app) => formatDate(app.dateTime, 'en-FI'),
      },
      {
        label: getLabel('appointment.time'),
        render: (app) => (
          <Link
            href={`/admin/appointments/${app.id}`}
            className='underline transition-all active:text-accent lg:hover:text-accent'
          >
            {formatTime(app.dateTime, 'en-FI')}
          </Link>
        ),
      },
      {
        label: getLabel('appointment.status'),
        render: (app) => <AppointmentStatusBadge status={app.status} />,
      },
      {
        label: getLabel('appointment.client'),
        render: (app) =>
          app.isRegisteredClient ? (
            <Link
              href={`/admin/clients/${app.client?.id}`}
              className='underline transition-all active:text-accent lg:hover:text-accent'
            >
              {app.clientName}
            </Link>
          ) : (
            <span>{app.clientName}</span>
          ),
      },
      {
        label: getLabel('appointment.style'),
        render: (app) =>
          app.style ? (
            <Link
              href={`/admin/styles/${app.styleId}`}
              className='underline transition-all active:text-accent lg:hover:text-accent'
            >
              {`${app.style?.name} - ${currentLanguage === 'en' ? app.service?.name_en : app.service?.name_fi}`}
            </Link>
          ) : null,
      },
    ],
  };

  const keyFn = (app: AppointmentWithData) => app.id;

  return (
    <ManagementPage
      title={getLabel('admin.appointments.title')}
      className='pb-10'
    >
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-3 md:flex-row md:p-2 lg:w-[50%] lg:self-end'>
          <SearchDate id='date-input' type='date' />
          <SearchInput
            id='term'
            placeholder={getLabel('admin.appointments.search_placeholder')}
          />
        </div>
        <PaginatedTable
          data={appointments}
          itemsCount={itemsCount}
          config={config}
          keyFn={keyFn}
        />
      </div>
    </ManagementPage>
  );
};

export default AppointmentTable;
