import useLanguage from '@/hooks/useLanguage';
import { Service } from '@prisma/client';
import Link from 'next/link';
import Table, { Config } from '../Table';

interface Props {
  services: Service[];
}

const ServiceTable = ({ services }: Props) => {
  const { getLabel, currentLanguage } = useLanguage();

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

  return <Table data={services} config={config} keyFn={keyFn} />;
};

export default ServiceTable;
