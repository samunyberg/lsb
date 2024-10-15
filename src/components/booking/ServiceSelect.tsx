import useClickOutside from '@/hooks/useClickOutside';
import useLanguage from '@/hooks/useLanguage';
import { StyleWithServices } from '@/lib/types';
import type { Service, Style } from '@prisma/client';
import { cn } from 'clsx-tailwind-merge';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';

interface Props {
  style: StyleWithServices;
  selectedStyle: Style | null;
  onStyleSelect: (style: Style) => void;
  selectedService: Service | null;
  onServiceSelect: (service: Service | null) => void;
}

const ServiceSelect = ({
  style,
  selectedStyle,
  onStyleSelect,
  selectedService,
  onServiceSelect,
}: Props) => {
  const { currentLanguage } = useLanguage();
  const [showServices, setShowServices] = useState(false);
  const [isAbove, setIsAbove] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setShowServices(false));

  useEffect(() => {
    if (showServices) {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        const spaceBelow = window.innerHeight - rect.bottom;
        const dropdownHeight = style.services.length * 50 + 50;
        setIsAbove(spaceBelow < dropdownHeight);
      }
    }
  }, [showServices, style.services.length]);

  const handleStyleSelect = () => {
    setShowServices(!showServices);
    if (style.id !== selectedStyle?.id) onServiceSelect(null);
    onStyleSelect(style);
  };

  const handleServiceSelect = (
    event:
      | React.MouseEvent<HTMLSpanElement>
      | React.KeyboardEvent<HTMLSpanElement>,
    service: Service
  ) => {
    event.stopPropagation();

    onServiceSelect(service);
    setTimeout(() => setShowServices(false), 650);
  };

  const service = (service: Service) => (
    <span
      key={service.id}
      tabIndex={0}
      className='cursor-pointer rounded-sm border-b border-black/10 px-6 py-2 transition-all last:border-none'
      onClick={(event) => handleServiceSelect(event, service)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') handleServiceSelect(event, service);
      }}
    >
      <div className='flex items-center justify-between'>
        <p className='text-[15px] uppercase tracking-wide'>
          {currentLanguage === 'en' ? service.name_en : service.name_fi}
        </p>
        {selectedService?.id === service.id && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 15,
            }}
            className='pr-5'
          >
            <FaCheck size={16} />
          </motion.span>
        )}
      </div>
    </span>
  );

  return (
    <div
      role='combobox'
      tabIndex={0}
      aria-controls='options'
      aria-expanded={showServices}
      aria-haspopup='listbox'
      className={cn(
        'relative cursor-pointer rounded-sm border-2 border-transparent bg-bgSofter px-4 py-3 shadow transition-all duration-300',
        {
          'border-accent bg-bgSoft':
            selectedStyle?.id === style.id && selectedService,
        }
      )}
      onClick={handleStyleSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter') handleStyleSelect();
      }}
    >
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-1'>
          <p className=' uppercase tracking-wide'>{style.name}</p>
          {selectedStyle?.id === style.id && selectedService && (
            <span className='flex items-center gap-2'>
              <FaCheck size={13} />
              <span className='text-sm '>
                {currentLanguage === 'en'
                  ? selectedService.name_en
                  : selectedService.name_fi}
              </span>
            </span>
          )}
        </div>
        <span
          className={cn('transition-transform', {
            'rotate-180': showServices,
          })}
        >
          <FaChevronDown size={12} />
        </span>
      </div>
      {showServices && (
        <motion.div
          id='options'
          ref={ref}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 22,
          }}
          className={cn(
            'absolute inset-x-6 z-40 flex flex-col gap-3 rounded-lg bg-bgSoft py-2 shadow-xl backdrop-blur-lg',
            {
              '-top-8': !isAbove,
              '-bottom-8': isAbove,
            }
          )}
        >
          <MdClose
            size={20}
            className='absolute right-2 top-2 float-right'
            onClick={() => setShowServices(false)}
          />
          {style.services.length === 0 && (
            <div className='flex h-20 items-center justify-center px-2'>
              <p className=''>
                This service does not have any service options.
              </p>
            </div>
          )}
          {style.services.map((s) => service(s))}
        </motion.div>
      )}
    </div>
  );
};

export default ServiceSelect;
