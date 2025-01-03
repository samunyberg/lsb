import Label from '@/components/common/Label';
import Section from '@/components/common/Section';
import { StyleWithServices } from '@/lib/types';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import ServiceTable from './ServiceTable';

interface Props {
  style: StyleWithServices;
}

const ServicesSection = ({ style }: Props) => {
  return (
    <Section
      title={
        <div className='flex items-center justify-between'>
          <Label labelId='admin.services.title' />
          <Link href={`/admin/styles/${style.id}/new-service`}>
            <FaPlus size={17} />
          </Link>
        </div>
      }
    >
      <ServiceTable services={style.services} />
    </Section>
  );
};

export default ServicesSection;
