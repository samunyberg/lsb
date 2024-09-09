import BookingContext from '@/contexts/BookingContext';
import useLocale from '@/hooks/useLocale';
import { formatDate, formatTime } from '@/lib/utils/dateAndTimeUtils';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';
import Spacer from '../common/Spacer';

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
        className='mt-5 flex items-center justify-between rounded-sm bg-bgSoft px-6 py-3 shadow-md'
      >
        <span className='flex items-center gap-2'>
          <FaRegCalendarCheck className='size-5' />
          {formatDate(new Date(appointment.dateTime), locale)}
        </span>
        <span className='flex items-center gap-2'>
          <FaRegClock className='size-5' />
          {formatTime(new Date(appointment.dateTime), locale)}
        </span>
      </motion.div>
      <Spacer />
    </>
  );
};

export default BookingTime;
