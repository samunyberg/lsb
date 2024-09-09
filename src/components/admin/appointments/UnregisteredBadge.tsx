import Label from '@/components/common/Label';

const UnregisteredBadge = () => {
  return (
    <div className='text-sm'>
      (<Label labelId='client.unregistered' />)
    </div>
  );
};

export default UnregisteredBadge;
