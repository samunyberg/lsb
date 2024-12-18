import StyleForm from '@/components/admin/styles/StyleForm';
import Label from '@/components/common/Label';
import Section from '@/components/common/Section';

const NewStylePage = () => {
  return (
    <Section title={<Label labelId='admin.styles.new_style.title' />}>
      <StyleForm />
    </Section>
  );
};

export default NewStylePage;
