'use client';

import useLanguage from '@/hooks/useLanguage';
import Section from '../common/Section';
import FAQItem from './FAQItem';

const FAQ = () => {
  const { getLabel } = useLanguage();

  const items = [
    {
      heading: getLabel('FAQ.q1'),
      content: getLabel('FAQ.a1'),
    },
    {
      heading: getLabel('FAQ.q2'),
      content: getLabel('FAQ.a2'),
    },
    {
      heading: getLabel('FAQ.q3'),
      content: getLabel('FAQ.a3'),
    },
  ];

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
