import { FaBan, FaCheckCircle } from 'react-icons/fa';

interface Props {
  dayHasAvailableAppointments: boolean;
  isPassedDay: boolean;
}

const AvailabilityIndicator = ({
  dayHasAvailableAppointments,
  isPassedDay,
}: Props) => {
  return (
    <>
      {dayHasAvailableAppointments && !isPassedDay && (
        <FaCheckCircle className='text-accentGreen size-3' />
      )}

      {!dayHasAvailableAppointments && !isPassedDay && (
        <FaBan className='text-accentRed size-3' />
      )}
    </>
  );
};

export default AvailabilityIndicator;
