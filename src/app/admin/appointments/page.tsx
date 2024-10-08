import AppointmentSearchBar from '@/components/admin/appointments/AppointmentSearchBar';
import ManagementPage from '@/components/admin/ManagementPage';
import Panel from '@/components/common/Panel';
import { FaSearch } from 'react-icons/fa';

const AdminAppointmentsPage = async () => {
  return (
    <ManagementPage title='Appointments'>
      <AppointmentSearchBar />
      <div className='flex w-full items-center justify-center pt-12'>
        <Panel className='flex flex-col items-center justify-center gap-5 p-5'>
          <FaSearch size={30} />
          <p>Search appointments by date range and/or client name.</p>
        </Panel>
      </div>
    </ManagementPage>
  );
};

export const dynamic = 'force-dynamic';

export default AdminAppointmentsPage;
