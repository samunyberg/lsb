import ManagementPage from '@/components/admin/ManagementPage';
import ServiceForm from '@/components/admin/styles/ServiceForm';
import Label from '@/components/common/Label';
import Panel from '@/components/common/Panel';
import { getStyleById } from '@/lib/db/styles';

interface Props {
  params: { styleId: string };
}

const NewServicePage = async ({ params: { styleId } }: Props) => {
  const style = await getStyleById(parseInt(styleId));

  return (
    <ManagementPage
      title={<Label labelId='admin.services.new_service.title' />}
      className='max-w-xl pb-10'
    >
      <Panel className='mb-6 px-3 py-2'>
        <Label labelId='admin.services.new_service.style' />{' '}
        <span className='font-semibold'>{style.name}</span>
      </Panel>
      <ServiceForm styleId={parseInt(styleId)} />
    </ManagementPage>
  );
};

export const dynamic = 'force-dynamic';

export default NewServicePage;
