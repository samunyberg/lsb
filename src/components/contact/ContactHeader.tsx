'use client';

import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import Label from '../common/Label';
import Spacer from '../common/Spacer';
import ContactForm from './ContactForm';

interface Props {
  name?: string;
  email?: string;
}

const ContactHeader = ({ name, email }: Props) => {
  return (
    <div className='flex flex-col items-center gap-5 pb-10 pt-5'>
      <div className='pt-5'>
        <p className='text-center'>
          <Label labelId='contact.contact_header.text' />
        </p>
        <Spacer />
        <div className='flex items-center justify-center gap-5'>
          <Link
            href='https://www.instagram.com/lashesstudiobyboochita'
            aria-label='View Lashes Studio by Boochita Instagram page'
            target='_blank'
          >
            <FaInstagram size={40} />
          </Link>
        </div>
      </div>
      <ContactForm name={name} email={email} />
    </div>
  );
};

export default ContactHeader;
