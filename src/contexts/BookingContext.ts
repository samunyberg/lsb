import { BookingData } from '@/lib/types';
import React, { Dispatch, SetStateAction } from 'react';

interface BookingContextType {
  bookingData: BookingData;
  setBookingData: Dispatch<SetStateAction<BookingData>>;
  bookingError: string;
  termsAccepted: boolean;
  setTermsAccepted: Dispatch<SetStateAction<boolean>>;
}

const BookingContext = React.createContext<BookingContextType>(
  {} as BookingContextType
);

export default BookingContext;
