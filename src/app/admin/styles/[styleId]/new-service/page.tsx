import ServiceForm from '@/components/admin/styles/ServiceForm';
import Label from '@/components/common/Label';
import Section from '@/components/common/Section';
import { getStyleById } from '@/lib/db/styles';

interface Props {
  params: { styleId: string };
}

const NewServicePage = async ({ params: { styleId } }: Props) => {
  const style = await getStyleById(parseInt(styleId));

  return (
    <Section
      title={
        <div>
          <Label labelId='admin.services.new_service.style' />{' '}
          <span className='whitespace-nowrap'>{style.name}</span>
        </div>
      }
    >
      <ServiceForm styleId={parseInt(styleId)} />
    </Section>
  );
};

export const dynamic = 'force-dynamic';

export default NewServicePage;
