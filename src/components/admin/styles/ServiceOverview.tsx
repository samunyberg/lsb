'use client';

import { Service } from '@prisma/client';
import EditServiceSection from './EditServiceSection';
import ServiceActionSection from './ServiceActionSection';

interface Props {
  service: Service;
  associatedStyleName: string;
}

const ServiceOverview = ({ service, associatedStyleName }: Props) => {
  return (
    <div className='flex flex-col gap-5 pb-14'>
      <EditServiceSection
        service={service}
        associatedStyleName={associatedStyleName}
      />
      <ServiceActionSection service={service} />
    </div>
  );
};

export default ServiceOverview;
