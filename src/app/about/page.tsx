import Container from '@/components/common/Container';
import Hero from '@/components/common/Hero';
import Label from '@/components/common/Label';
import Section from '@/components/common/Section';
import heroImg from '../../../public/images/lashes-bg.jpg';

const AboutPage = async () => {
  const location = (
    <Section title={<Label labelId='about.location.title' />}>
      <ul className='flex flex-col gap-2'>
        <li>
          <Label labelId='about.location.address_line_1' />
        </li>
      </ul>
    </Section>
  );

  const terms = (
    <Section title={<Label labelId='terms_of_service.title' />}>
      <p className=''>
        <Label labelId='terms_of_service.content' />
      </p>
    </Section>
  );

  const legal = (
    <Section title={<Label labelId='about.legal_information.title' />}>
      <ul>
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
    </Section>
  );

  return (
    <Container className='max-w-4xl'>
      <Hero title='about.title' imgData={heroImg} imgAlt='lashes image' />
      <div className='flex flex-col gap-5 py-10'>
        {location}
        {terms}
        {legal}
      </div>
    </Container>
  );
};

export default AboutPage;
