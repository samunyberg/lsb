import BookingContext from '@/contexts/BookingContext';
import useLanguage from '@/hooks/useLanguage';
import useLocale from '@/hooks/useLocale';
import { formatDate, formatTime } from '@/lib/utils/dateAndTimeUtils';
import { useSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import Button from '../common/Button';
import CheckBox from '../common/CheckBox';
import FormError from '../common/forms/FormError';
import Label from '../common/Label';
import Modal from '../common/Modal';
import Panel from '../common/Panel';
import Spacer from '../common/Spacer';

const Step3 = () => {
  const { data: session } = useSession();
  const { currentLanguage, getLabel } = useLanguage();
  const { bookingData, bookingError, termsAccepted, setTermsAccepted } =
    useContext(BookingContext);
  const locale = useLocale();
  const [showTerms, setShowTerms] = useState(false);

  const handleTermsLinkClick = (event: React.MouseEvent<HTMLSpanElement>) => {
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
          <Button variant='accent' onClick={handleTermsModalOKClick}>
            OK
          </Button>
        </div>
      }
      onClose={() => setShowTerms(false)}
    />
  );

  const items = [
    {
      label: getLabel('appointment.date'),
      content: formatDate(new Date(bookingData.appointment!.dateTime), locale, {
        weekday: 'long',
        month: 'long',
        day: '2-digit',
      }),
    },
    {
      label: getLabel('appointment.time'),
      content: formatTime(new Date(bookingData.appointment!.dateTime), locale),
    },
    {
      label: getLabel('appointment.style'),
      content: bookingData.style?.name,
    },
    {
      label: getLabel('appointment.service'),
      content:
        currentLanguage === 'en'
          ? bookingData.service!.name_en
          : bookingData.service!.name_fi,
    },
  ];

  return (
    <div className='flex flex-col gap-4'>
      <Panel className='px-4 py-6'>
        <Label labelId='book.step3.check_information' />
        <span className='font-semibold'> {session?.user.email}.</span>
        <table className='mt-6 w-full border-collapse rounded-sm border border-black/20 shadow'>
          <tbody>
            {items.map((item) => (
              <tr key={item.label} className='border-b border-black/20'>
                <td className='border-r border-black/20 p-2 text-sm font-semibold'>
                  {item.label}
                </td>
                <td className='p-2'>{item.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
      <Panel
        className='flex cursor-pointer items-center gap-2 p-4'
        onClick={() => setTermsAccepted(!termsAccepted)}
      >
        <CheckBox isChecked={termsAccepted} />
        <p>
          <Label labelId='book.step3.i_accept' />{' '}
          <span
            className='cursor-pointer underline'
            onClick={handleTermsLinkClick}
          >
            <Label labelId='terms_of_service.title' />
          </span>
        </p>
      </Panel>
      <FormError className='text-left'>{bookingError}</FormError>
      {termsModal}
    </div>
  );
};

export default Step3;
