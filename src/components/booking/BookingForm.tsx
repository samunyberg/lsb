'use client';

import BookingContext from '@/contexts/BookingContext';
import useLanguage from '@/hooks/useLanguage';
import { BookingData, StyleWithServices } from '@/lib/types';
import { Appointment } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Calendar from '../calendar/Calendar';
import Container from '../common/Container';
import Label from '../common/Label';
import Section from '../common/Section';
import BookingButtons from './BookingButtons';
import BookingHeader from './BookingHeader';
import Step2 from './Step2';
import Step3 from './Step3';
const steps = [
  {
    stepNumber: 1,
    label: 'book.steps.1',
  },
  {
    stepNumber: 2,
    label: 'book.steps.2',
  },
  {
    stepNumber: 3,
    label: 'book.steps.3',
  },
];

interface Props {
  styles: StyleWithServices[];
  appointments: Appointment[];
}

const BookingForm = ({ styles, appointments }: Props) => {
  const { data: session } = useSession();
  const { currentLanguage } = useLanguage();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({} as BookingData);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    scrollToTop();
  }, []);

  const handleBooking = async () => {
    try {
      setIsSubmitting(true);
      await axios.patch(
        `api/appointments/${bookingData.appointment!.id}/book`,
        {
          clientId: session?.user.id,
          styleId: bookingData.style!.id,
          serviceId: bookingData.service!.id,
          clientLanguage: currentLanguage,
        }
      );
      router.push('/book/thank-you');
    } catch (error) {
      let errorMessage = '';
      const err = error as AxiosError;
      if (err.response?.status === 409)
        errorMessage =
          'Oh no! Looks like this appointment was booked just a moment ago. Please choose a different time.';
      else if (err.response?.status === 403)
        errorMessage =
          'Appointment must be booked at least one hour before start time. Please choose a different appointment time.';
      else errorMessage = 'Whoops! Something went wrong. Please try again.';
      setBookingError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) return;

    setCurrentStep(currentStep - 1);
    scrollToTop();
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      scrollToTop();
    }
    if (currentStep === steps.length) handleBooking();
  };

  const isStepComplete = () => {
    if (currentStep === 1) return !!bookingData.appointment;
    if (currentStep === 2) return !!bookingData.style && !!bookingData.service;
    if (currentStep === steps.length) return termsAccepted;
  };

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        setBookingData,
        bookingError,
        termsAccepted,
        setTermsAccepted,
      }}
    >
      <Container className='max-w-[600px] pb-10'>
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 22,
          }}
          className='mb-5 pt-6 text-center text-[22px] font-semibold uppercase tracking-wide'
        >
          <Label labelId='book.title' />
        </motion.h1>
        <BookingHeader steps={steps} currentStep={currentStep} />
        <>
          <div className='my-8'>
            {currentStep === 1 && (
              <Section>
                <Calendar
                  initialData={appointments}
                  onAppointmentSelect={(app: Appointment) =>
                    setBookingData({ ...bookingData, appointment: app })
                  }
                  selectedAppointment={bookingData.appointment}
                />
              </Section>
            )}
            {currentStep === 2 && <Step2 styles={styles} />}
            {currentStep === 3 && <Step3 />}
          </div>
          <BookingButtons
            steps={steps}
            currentStep={currentStep}
            onBackClick={handleBack}
            onNextClick={handleNext}
            isNextDisabled={!isStepComplete()}
            isSubmitting={isSubmitting}
          />
        </>
      </Container>
    </BookingContext.Provider>
  );
};

export default BookingForm;
