import useLanguage from '@/hooks/useLanguage';
import { Service } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
        render: (service) =>
          new Intl.NumberFormat('fi-FI', {
            style: 'currency',
            currency: 'EUR',
          }).format(service.price),
      },
    ],
  };

  const keyFn = (service: Service) => service.id;

  return (
    <div>
      <Table data={services} config={config} keyFn={keyFn} />
    </div>
  );
};

export default ServiceTable;
