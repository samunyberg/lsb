import { useRouter, useSearchParams } from 'next/navigation';

const AppointmentDateFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className='h-8 rounded-md bg-bgSoft px-3 py-1 shadow'>
      <input
        type='date'
        defaultValue={searchParams.get('date') || undefined}
        onChange={(event) => {
          const params = new URLSearchParams(searchParams.toString());
          const date = event.target.value;
          if (date) params.set('date', date);

          const query = params.size ? '?' + params.toString() : '';
          router.push('/admin/appointments/list' + query);
        }}
        className='h-full w-full cursor-text bg-transparent text-sm outline-none'
      />
    </div>
  );
};

export default AppointmentDateFilter;
