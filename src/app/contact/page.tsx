import Container from '@/components/common/Container';
import Hero from '@/components/common/Hero';
import Spacer from '@/components/common/Spacer';
import ContactForm from '@/components/contact/ContactForm';
import ContactHeader from '@/components/contact/ContactHeader';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import heroImg from '../../../public/images/lashes-bg.jpg';

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
    </Container>
  );
};

export default ContactPage;
