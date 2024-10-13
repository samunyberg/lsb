import useLanguage from '@/hooks/useLanguage';
import { StyleWithServices } from '@/lib/types';
import { Service } from '@prisma/client';
import { cn } from 'clsx-tailwind-merge';
import { CldImage } from 'next-cloudinary';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Table, { Config } from '../admin/Table';
import Label from '../common/Label';

interface Props {
  style: StyleWithServices;
}

const StyleDisplayItem = ({ style }: Props) => {
  const { getLabel, currentLanguage } = useLanguage();
  const [showPrices, setShowPrices] = useState(false);

  const config: Config<Service> = {
    columns: [
      {
        label: getLabel('appointment.service'),
        render: (service) =>
          currentLanguage === 'en' ? service.name_en : service.name_fi,
      },
      {
        label: getLabel('appointment.price'),
        render: (service) =>
          new Intl.NumberFormat('fi-FI', {
            style: 'currency',
            currency: 'EUR',
          }).format(service.price),
      },
    ],
  };

  const keyFn = (service: Service) => service.id;

  return (
    <>
      <div key={style.id}>
        <h2 className='mb-2 text-[18px] uppercase tracking-wide lg:text-[20px]'>
          {style.name}
        </h2>
        <div className='relative mx-auto mb-5 h-[200px] rounded-sm border-2 border-transparent shadow-2xl md:w-[80%]'>
          <CldImage
            src={style.imageUrl || 'fallback-image_mllokb'}
            alt='style image'
            fill
            priority
            className='object-cover'
          />
        </div>
        <div
          className='flex w-fit cursor-pointer items-center justify-center gap-2 rounded-sm border border-primary p-2 text-[16px] tracking-wide'
          onClick={() => setShowPrices(!showPrices)}
        >
          {showPrices ? (
            <Label labelId='styles.hide_pricing' />
          ) : (
            <Label labelId='styles.show_pricing' />
          )}
          {showPrices ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
      <div
        className={cn(
          'mt-3 max-h-0 w-full overflow-hidden rounded-sm bg-white/60 opacity-0 shadow-lg transition-all duration-500',
          {
            'max-h-[500px] opacity-100': showPrices,
          }
        )}
      >
        <Table data={style.services} config={config} keyFn={keyFn} />
      </div>
    </>
  );
};

export default StyleDisplayItem;
