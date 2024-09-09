import ManagementPage from '@/components/admin/ManagementPage';
import StyleForm from '@/components/admin/styles/StyleForm';
import Label from '@/components/common/Label';

const NewStylePage = () => {
  return (
    <ManagementPage
      title={<Label labelId='admin.styles.new_style.title' />}
      className='max-w-xl'
    >
      <StyleForm />
    </ManagementPage>
  );
};

export default NewStylePage;
