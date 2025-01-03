import Label from '@/components/common/Label';
import Section from '@/components/common/Section';
import { Service } from '@prisma/client';
import ServiceForm from './ServiceForm';

interface Props {
  service: Service;
  associatedStyleName: string;
}

const EditServiceSection = ({ service, associatedStyleName }: Props) => {
  return (
    <Section title={<Label labelId='admin.services.manage.title' />}>
      <div className='mb-6 px-2'>
        <Label labelId='admin.services.service_overview.for' />{' '}
        <span className='font-semibold'>{associatedStyleName}</span>
      </div>
      <ServiceForm service={service} />
    </Section>
  );
};

export default EditServiceSection;
