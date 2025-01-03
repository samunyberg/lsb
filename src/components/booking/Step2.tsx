import BookingContext from '@/contexts/BookingContext';
import { BookingData, StyleWithServices } from '@/lib/types';
import type { Service, Style } from '@prisma/client';
import { useContext, useState } from 'react';
import Section from '../common/Section';
import ServiceSelect from './ServiceSelect';

interface Props {
  styles: StyleWithServices[];
}

const Step2 = ({ styles }: Props) => {
  const { bookingData, setBookingData } = useContext(BookingContext);
  const [expandedStyle, setExpandedStyle] = useState<Style | null>(
    bookingData.style || null
  );
  const [selectedService, setSelectedService] = useState<Service | null>(
    bookingData.service || null
  );

  const handleStyleSelect = (style: Style) => {
    if (style.id === expandedStyle?.id) return;

    setBookingData((currentData: BookingData) => {
      return { ...currentData, service: null };
    });
    setSelectedService(null);

    setBookingData((currentData: BookingData) => {
      return { ...currentData, style };
    });
    setExpandedStyle(style);
  };

  const handleServiceSelect = (service: Service | null) => {
    setBookingData({ ...bookingData, service });
    setSelectedService(service);
  };

  return (
    <Section>
      <div className='flex flex-col gap-2'>
        {styles.map((style) => (
          <ServiceSelect
            key={style.id}
            style={style}
            selectedStyle={bookingData.style}
            selectedService={selectedService}
            onStyleSelect={handleStyleSelect}
            onServiceSelect={handleServiceSelect}
          />
        ))}
      </div>
    </Section>
  );
};

export default Step2;
