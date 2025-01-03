'use client';

import SectionList from '@/components/common/SectionList';
import { StyleWithServices } from '@/lib/types';
import EditStyleSection from './EditStyleSection';
import ServicesSection from './ServicesSection';
import StyleActionSection from './StyleActionSection';

interface Props {
  style: StyleWithServices;
}

const StyleOverview = ({ style }: Props) => {
  return (
    <SectionList>
      <EditStyleSection style={style} />
      <ServicesSection style={style} />
      <StyleActionSection styleId={style.id} />
    </SectionList>
  );
};

export default StyleOverview;
