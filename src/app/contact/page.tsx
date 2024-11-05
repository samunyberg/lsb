import Container from '@/components/common/Container';
import Hero from '@/components/common/Hero';
import ContactForm from '@/components/contact/ContactForm';
import ContactHeader from '@/components/contact/ContactHeader';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import heroImg from '../../../public/images/lashes-bg.jpg';
import FAQ from '@/components/FAQ';
import Spacer from '@/components/common/Spacer';

const ContactPage = async () => {
  const session = await getServerSession(authOptions);

  const name = session?.user
    ? `${session?.user.firstName} ${session?.user.lastName}`
    : '';
  const email = session?.user ? session?.user.email : '';

  return (
    <Container className='max-w-4xl pb-14'>
      <Hero title='contact.title' imgData={heroImg} imgAlt='lashes image' />
      <ContactHeader />
      <ContactForm name={name} email={email} />
      <Spacer className='!my-10' />
      <h2 className='mb-6 text-lg uppercase tracking-wide'>
        Frequently asked questions
      </h2>
      <FAQ />
    </Container>
  );
};

export default ContactPage;

