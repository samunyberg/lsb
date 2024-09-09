import Label from '../common/Label';
import Panel from '../common/Panel';
import AvailabilityIndicator from './AvailabilityIndicator';

const Legend = () => {
  return (
    <Panel className='mt-4 flex flex-col gap-2 px-4 py-2 text-sm'>
      <div>
        <div className='mb-3'>
          <Label labelId='calendar.legend.times' />
        </div>
        <div className='ml-4 flex items-center gap-2'>
          <AvailabilityIndicator
            dayHasAvailableAppointments={true}
            isPassedDay={false}
          />
          <Label labelId='calendar.legend.available' />
        </div>
        <div className='ml-4 flex items-center gap-2'>
          <AvailabilityIndicator
            dayHasAvailableAppointments={false}
            isPassedDay={false}
          />
          <Label labelId='calendar.legend.not_available' />
        </div>
      </div>
    </Panel>
  );
};

export default Legend;
