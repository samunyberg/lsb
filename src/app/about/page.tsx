import Container from '@/components/common/Container';
import Hero from '@/components/common/Hero';
import Label from '@/components/common/Label';
import Spacer from '@/components/common/Spacer';
import heroImg from '../../../public/images/lashes-bg.jpg';

const AboutPage = async () => {
  const subtitle = (labelId: string) => (
    <h3 className='mb-5 text-lg font-semibold uppercase tracking-wide'>
      <Label labelId={labelId} />
    </h3>
  );

  const location = (
    <div>
      {subtitle('about.location.title')}
      <div className='flex flex-col gap-6 lg:flex-row lg:gap-8'>
        <ul className='flex flex-col gap-3 lg:mt-8'>
          <li>
            <Label labelId='about.location.address_line_1' />
          </li>
          <li>
            <Label labelId='about.location.address_line_2' />
          </li>
          <li>
            <Label labelId='about.location.address_line_3' />
          </li>
        </ul>
      </div>
    </div>
  );

  const terms = (
    <div>
      {subtitle('terms_of_service.title')}
      <p className=''>
        <Label labelId='terms_of_service.content' />
      </p>
    </div>
  );

  const legal = (
    <div>
      {subtitle('about.legal_information.title')}
      <ul className=''>
        <li className='mb-2'>
          <Label labelId='about.legal.registered_name' />
          {': '}Lashes Studio by Boochita
        </li>
        <li className='mb-6'>
          <Label labelId='about.legal.business_id' />
          {': '}
          3331536-7
        </li>
      </ul>
      <h4 className='mb-3 mt-5 text-[18px] font-semibold'>
        <Label labelId='about.privacy_policy.title' />
      </h4>
      <div>
        <p>
          <Label labelId='about.privacy_policy.section_1' />
        </p>
        <ul className='my-3 list-disc px-8'>
          <li>
            <Label labelId='about.privacy_policy.list_name' />
          </li>
          <li>
            <Label labelId='about.privacy_policy.list_phone' />
          </li>
          <li>
            <Label labelId='about.privacy_policy.list_email' />
          </li>
          <li>
            <Label labelId='about.privacy_policy.list_password' />
          </li>
        </ul>
        <p>
          <Label labelId='about.privacy_policy.section_2' />
        </p>
      </div>
      <p className='mt-8'>© Lashes Studio by Boochita</p>
    </div>
  );

  return (
    <Container className='max-w-4xl'>
      <Hero title='about.title' imgData={heroImg} imgAlt='lashes image' />
      <div className='py-10'>
        {location}
        <Spacer className='my-8' />
        {terms}
        <Spacer className='my-8' />
        {legal}
      </div>
    </Container>
  );
};

export default AboutPage;
