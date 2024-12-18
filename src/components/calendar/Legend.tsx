import Label from '../common/Label';

const Legend = () => {
  return (
    <div className='mt-3 p-4 text-sm'>
      <div className='mb-3'>
        <Label labelId='calendar.legend.times' />
      </div>
      <div className='ml-2 flex items-center gap-2'>
        <div className='size-3 rounded-full border border-black/10 bg-green-200' />
        <Label labelId='calendar.legend.available' />
      </div>
      <div className='ml-2 flex items-center gap-2'>
        <div className='size-3 rounded-full border border-black/10 bg-red-100' />
        <Label labelId='calendar.legend.not_available' />
      </div>
    </div>
  );
};

export default Legend;
