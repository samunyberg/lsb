import StyleOverview from '@/components/admin/styles/StyleOverview';
import { getStyleById } from '@/lib/db/styles';

interface Props {
  params: { styleId: string };
}

const AdminStylePage = async ({ params: { styleId } }: Props) => {
  const style = await getStyleById(parseInt(styleId));

  return <StyleOverview style={style} />;
};

export default AdminStylePage;
