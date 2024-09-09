import Label from '@/components/common/Label';
import useLanguage from '@/hooks/useLanguage';
import { Service } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';
import Table, { Config } from '../Table';

interface Props {
  styleId: number;
  services: Service[];
}

const ServiceTable = ({ styleId, services }: Props) => {
  const { getLabel, currentLanguage } = useLanguage();
  const router = useRouter();

  const config: Config<Service> = {
    columns: [
      {
        label: getLabel('service.name'),
        render: (service) => (
          <Link
            className='underline transition-all active:text-accent lg:hover:text-accent'
            href={`/admin/styles/${service.styleId}/services/${service.id}`}
          >
            {currentLanguage === 'en' ? service.name_en : service.name_fi}
          </Link>
        ),
      },
      {
        label: getLabel('service.price'),
        render: (service) => service.price + '€',
      },
    ],
  };

  const keyFn = (service: Service) => service.id;

  return (
    <div>
      <div className='mb-5 flex items-center justify-between px-2'>
        <h2 className='text-lg font-semibold'>
          <Label labelId='admin.services.title' />
        </h2>
        <FaPlus
          size={17}
          className='cursor-pointer'
          onClick={() => router.push(`/admin/styles/${styleId}/new-service`)}
        />
      </div>
      <Table data={services} config={config} keyFn={keyFn} />
    </div>
  );
};

export default ServiceTable;
