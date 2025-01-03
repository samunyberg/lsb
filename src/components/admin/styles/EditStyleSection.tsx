import Section from '@/components/common/Section';
import { Style } from '@prisma/client';
import StyleForm from './StyleForm';

interface Props {
  style: Style;
}

const EditStyleSection = ({ style }: Props) => {
  return (
    <Section title={style.name}>
      <StyleForm style={style} />
    </Section>
  );
};

export default EditStyleSection;
