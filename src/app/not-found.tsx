import Label from '@/components/common/Label';

const NotFoundPage = () => {
  return (
    <div className='flex h-[calc(100vh-55px)] items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='border-b border-primary text-2xl font-bold'>
          <Label labelId='not_found.title' />
        </h1>
        <p className=''>
          <Label labelId='not_found.content' />
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
