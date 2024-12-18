'use client';

import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { MdAddPhotoAlternate } from 'react-icons/md';

interface CloudinaryResult {
  public_id: string;
}

interface Props {
  imageId?: string;
  onImageSelect: (imageId: string) => void;
}

const UploadImage = ({ imageId, onImageSelect }: Props) => {
  const uploadImage = (result: CloudinaryUploadWidgetResults) => {
    if (result.event !== 'success') return;

    const info = result.info as CloudinaryResult;
    onImageSelect(info.public_id);
  };

  return (
    <CldUploadWidget
      uploadPreset='mvvia4vl'
      options={{
        sources: ['local'],
        multiple: false,
        showAdvancedOptions: false,
      }}
      onSuccess={(result) => uploadImage(result)}
    >
      {({ open }) => (
        <div
          className='relative flex size-28 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-black/10 bg-white'
          onClick={() => open()}
        >
          {imageId ? (
            <CldImage
              src={imageId}
              alt='Style image'
              className='object-cover'
              fill
            />
          ) : (
            <MdAddPhotoAlternate size={40} />
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default UploadImage;
