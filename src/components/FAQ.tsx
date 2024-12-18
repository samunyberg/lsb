'use client';

import Section from './common/Section';
import FAQItem from './FAQItem';

const items = [
  {
    heading: 'How do I prepare for an appointment?',
    content:
      'Avoid drinking coffee or other caffeine-containing beverages before your appointment.',
  },
  {
    heading: 'How do I cancel or change my appointment?',
    content:
      'You can cancel your appointment by sending me an email or contacting me in Messenger.',
  },
  {
    heading: 'What are my payment options?',
    content: 'I accept card payments, Apple Pay, Google Pay, and cash.',
  },
];

const FAQ = () => {
  return (
    <Section title='Frequently asked questions'>
      <div className='flex flex-col gap-2'>
        {items.map((item, index) => (
          <FAQItem key={index} item={item} />
        ))}
      </div>
    </Section>
  );
};

export default FAQ;
