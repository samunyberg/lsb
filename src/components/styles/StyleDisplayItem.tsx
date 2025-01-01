import useLanguage from '@/hooks/useLanguage';
import { StyleWithServices } from '@/lib/types';
import { Service } from '@prisma/client';
import { CldImage } from 'next-cloudinary';
import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import Table, { Config } from '../admin/Table';
import Label from '../common/Label';
import Modal from '../common/Modal';

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
      <div
        key={style.id}
        className='relative overflow-hidden rounded-md bg-bgSoft shadow'
      >
        <h2 className='overflow-hidden text-ellipsis whitespace-nowrap p-2 text-[16px] uppercase tracking-wide'>
          {style.name}
        </h2>
        <div className='relative h-40 w-full'>
          <CldImage
            src={style.imageUrl || 'fallback-image_mllokb'}
            alt='style image'
            fill
            priority
            className='object-cover'
          />
        </div>
        <div
          className='absolute inset-x-2 bottom-2 flex cursor-pointer items-center justify-center gap-1 rounded-full bg-bgSofter px-2 py-1 text-sm tracking-wide'
          onClick={() => setShowPrices(!showPrices)}
        >
          <Label labelId='styles.show_pricing' />
          <FaChevronRight size={10} />
        </div>
      </div>
      <Modal
        header={<div className='text-lg font-semibold'>{style.name}</div>}
        content={<Table data={style.services} config={config} keyFn={keyFn} />}
        isVisible={showPrices}
        onClose={() => setShowPrices(false)}
      ></Modal>
    </>
  );
};

export default StyleDisplayItem;
