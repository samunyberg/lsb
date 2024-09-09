import ServiceOverview from '@/components/admin/styles/ServiceOverview';
import { getServiceByStyleIdAndServiceId, getStyleById } from '@/lib/db/styles';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    styleId: string;
    serviceId: string;
  };
}

const AdminServicePage = async ({ params: { styleId, serviceId } }: Props) => {
  const service = await getServiceByStyleIdAndServiceId(
    parseInt(styleId),
    parseInt(serviceId)
  );

  const associatedStyle = await getStyleById(parseInt(styleId));

  if (!service) return notFound();

  return (
    <ServiceOverview
      service={service}
      associatedStyleName={associatedStyle.name}
    />
  );
};

export default AdminServicePage;
