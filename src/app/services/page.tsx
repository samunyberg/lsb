import Container from '@/components/common/Container';
import Hero from '@/components/common/Hero';
import StyleDisplay from '@/components/styles/StyleDisplay';
import { getStyles } from '@/lib/db/styles';
import heroImg from '../../../public/images/lashes-bg.jpg';

const StylesPage = async () => {
  const styles = await getStyles();

  return (
    <Container>
      <Hero title='styles.title' imgData={heroImg} imgAlt='lashes image' />
      <StyleDisplay styles={styles} />
    </Container>
  );
};

export default StylesPage;
