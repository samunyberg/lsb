import { cn } from 'clsx-tailwind-merge';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface FAQItem {
  heading: string;
  content: string;
}

interface Props {
  item: FAQItem;
}

const FAQItem = ({ item }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className='rounded-md border border-black/10 bg-white'>
      <div
        className={cn(
          'flex cursor-pointer items-center justify-between gap-2 p-3',
          {
            'font-semibold': isExpanded,
          }
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>{item.heading}</span>
        <FaChevronDown
          size={15}
          className={cn('transition-all duration-300', {
            'rotate-180': isExpanded,
          })}
        />
      </div>
      <div
        className={cn('max-h-0 overflow-hidden transition-all duration-300', {
          'max-h-[500px]': isExpanded,
        })}
      >
        <p className='p-3'>{item.content}</p>
      </div>
    </div>
  );
};

export default FAQItem;
