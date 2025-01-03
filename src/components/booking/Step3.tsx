import BookingContext from '@/contexts/BookingContext';
import useLanguage from '@/hooks/useLanguage';
import useLocale from '@/hooks/useLocale';
import { formatDate, formatTime } from '@/lib/utils/dateAndTimeUtils';
import { useSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import { FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';
import { FiTool } from 'react-icons/fi';
import { GiClawSlashes } from 'react-icons/gi';
import Button from '../common/Button';
import CheckBox from '../common/CheckBox';
import Label from '../common/Label';
import Modal from '../common/Modal';
import Panel from '../common/Panel';
import Spacer from '../common/Spacer';
import Warning from '../common/Warning';

const Step3 = () => {
  const { data: session } = useSession();
  const { currentLanguage, getLabel } = useLanguage();
  const { bookingData, bookingError, termsAccepted, setTermsAccepted } =
    useContext(BookingContext);
  const locale = useLocale();
  const [showTerms, setShowTerms] = useState(false);

  const handleTermsLinkClick = (
    event:
      | React.MouseEvent<HTMLSpanElement>
      | React.KeyboardEvent<HTMLSpanElement>
  ) => {
    event.stopPropagation();
    setShowTerms(true);
  };

  const handleTermsModalOKClick = () => {
    setTermsAccepted(true);
    setShowTerms(false);
  };

  const termsModal = (
    <Modal
      isVisible={showTerms}
      header={
        <h1 className='text-lg font-semibold'>
          <Label labelId='terms_of_service.title' />
        </h1>
      }
      content={
        <div className='flex flex-col px-2 '>
          <Label labelId='terms_of_service.content' />
          <Spacer className='my-8' />
          <Button
            variant='accent'
            onClick={handleTermsModalOKClick}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleTermsModalOKClick();
            }}
          >
            OK
          </Button>
        </div>
      }
      onClose={() => setShowTerms(false)}
    />
  );

  const items = [
    {
      label: (
        <div className='flex items-center gap-2'>
          <FaRegCalendarCheck size={15} />
          {getLabel('appointment.date')}
        </div>
      ),
      content: formatDate(new Date(bookingData.appointment!.dateTime), locale, {
        weekday: 'long',
        month: 'long',
        day: '2-digit',
      }),
    },
    {
      label: (
        <div className='flex items-center gap-2'>
          <FaRegClock size={15} />
          {getLabel('appointment.time')}
        </div>
      ),
      content: formatTime(new Date(bookingData.appointment!.dateTime), locale),
    },
    {
      label: (
        <div className='flex items-center gap-2'>
          <GiClawSlashes size={15} />
          {getLabel('appointment.style')}
        </div>
      ),
      content: bookingData.style?.name,
    },
    {
      label: (
        <div className='flex items-center gap-2'>
          <FiTool size={15} />
          {getLabel('appointment.service')}
        </div>
      ),
      content:
        currentLanguage === 'en'
          ? bookingData.service!.name_en
          : bookingData.service!.name_fi,
    },
  ];

  const acceptTerms = (
    <Panel
      tabIndex={0}
      className='flex cursor-pointer items-center gap-2 p-4'
      onClick={() => setTermsAccepted(!termsAccepted)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') setTermsAccepted(!termsAccepted);
      }}
    >
      <CheckBox isChecked={termsAccepted} />
      <p>
        <Label labelId='book.step3.i_accept' />{' '}
        <span
          tabIndex={0}
          className='cursor-pointer underline'
          onClick={handleTermsLinkClick}
          onKeyDown={(event) => {
            if (event.key === 'Enter') handleTermsLinkClick(event);
          }}
        >
          <Label labelId='terms_of_service.title' />
        </span>
      </p>
    </Panel>
  );

  return (
    <div className='flex flex-col gap-4'>
      <Panel className='px-4 py-6'>
        <p>
          <Label labelId='book.step3.check_information' />
          <span className='font-semibold'> {session?.user.email}.</span>
        </p>
        <Spacer />
        <table className='mt-6 w-full'>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                className='border-b border-black/10 last:border-none'
              >
                <td className='border-r border-black/10 p-2 text-sm font-semibold'>
                  {item.label}
                </td>
                <td className='p-2'>{item.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
      {acceptTerms}
      <Warning className='text-left'>{bookingError}</Warning>
      {termsModal}
    </div>
  );
};

export default Step3;
