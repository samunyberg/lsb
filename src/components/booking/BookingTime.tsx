import BookingContext from '@/contexts/BookingContext';
import useLocale from '@/hooks/useLocale';
import { formatDate, formatTime } from '@/lib/utils/dateAndTimeUtils';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';
import Panel from '../common/Panel';

const BookingTime = () => {
  const {
    bookingData: { appointment },
  } = useContext(BookingContext);
  const locale = useLocale();

  if (!appointment) return null;

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 22,
        }}
      >
        <Panel className='mb-3 flex items-center justify-between px-4 py-2'>
          <span className='flex items-center gap-2'>
            <FaRegCalendarCheck className='size-5' />
            {formatDate(new Date(appointment.dateTime), locale)}
          </span>
          <span className='flex items-center gap-2'>
            <FaRegClock className='size-5' />
            {formatTime(new Date(appointment.dateTime), locale)}
          </span>
        </Panel>
      </motion.div>
    </>
  );
};

export default BookingTime;
