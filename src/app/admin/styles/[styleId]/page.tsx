import StyleOverview from '@/components/admin/styles/StyleOverview';
import { StyleWithServices } from '@/lib/types';
import prisma from '@/prisma/client';

interface Props {
  params: { styleId: string };
}

const AdminStylePage = async ({ params: { styleId } }: Props) => {
  const style = await prisma.style.findFirst({
    where: { id: parseInt(styleId) },
    include: { services: true },
  });

  return <StyleOverview style={style as StyleWithServices} />;
};

export default AdminStylePage;
