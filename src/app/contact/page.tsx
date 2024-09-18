import Container from '@/components/common/Container';
import Hero from '@/components/common/Hero';
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
    <Container className='max-w-4xl'>
      <Hero title='contact.title' imgData={heroImg} imgAlt='lashes image' />
      <ContactHeader name={name} email={email} />
    </Container>
  );
};

export default ContactPage;
