'use client';

import { Language } from '@/providers/language/LanguageProvider';
import { useState } from 'react';

interface Props {
  onChange: (language: Language) => void;
}

const LanguageSelector = ({ onChange }: Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('fi');

  const handleChange = (language: Language) => {
    setSelectedLanguage(language === 'en' ? 'en' : 'fi');
    onChange(language);
  };

  return (
    <div className='relative flex w-full rounded-md border border-black/10 bg-bgSoft py-1 text-sm'>
      <div
        className={`absolute inset-y-0 w-1/2 rounded-md bg-accent transition-transform duration-300 ease-in-out ${
          selectedLanguage === 'fi'
            ? 'translate-x-0 transform'
            : 'translate-x-full transform'
        }`}
      ></div>
      <div
        className={`z-10 flex-1 cursor-pointer text-center ${
          selectedLanguage === 'fi' ? 'text-white' : 'text-primary'
        }`}
        onClick={() => handleChange('fi')}
      >
        Finnish
      </div>
      <div
        className={`z-10 flex-1 cursor-pointer text-center ${
          selectedLanguage !== 'fi' ? 'text-white' : 'primary'
        }`}
        onClick={() => handleChange('en')}
      >
        English
      </div>
    </div>
  );
};

export default LanguageSelector;
