import useLocale from '@/hooks/useLocale';
import { formatDate } from '@/lib/utils/dateAndTimeUtils';
import { ReactNode } from 'react';
import { FaRegCalendarCheck } from 'react-icons/fa';
import Modal from '../common/Modal';

interface Props {
  selectedDate: Date;
  showExpandedDay: boolean;
  onShowExpandedDay: () => void;
  children: ReactNode;
}

const ExpandedDay = ({
  selectedDate,
  showExpandedDay,
  onShowExpandedDay,
  children,
}: Props) => {
  const locale = useLocale();

  const header = (
    <span className='flex items-center gap-2 text-lg '>
      <FaRegCalendarCheck className='size-5' />
      {formatDate(selectedDate, locale, {
        weekday: 'long',
        month: 'numeric',
        day: '2-digit',
      })}
    </span>
  );

  return (
    <Modal
      isVisible={showExpandedDay}
      onClose={onShowExpandedDay}
      header={header}
      content={children}
    />
  );
};

export default ExpandedDay;
