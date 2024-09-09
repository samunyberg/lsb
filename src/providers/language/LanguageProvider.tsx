import { ReactNode, useEffect, useState } from 'react';

import LanguageContext from '@/contexts/LanguageContext';
import { useSession } from 'next-auth/react';
import en from './data/en.json';
import fi from './data/fi.json';

export type Language = 'en' | 'fi';

interface Props {
  children: ReactNode;
}

const LanguageProvider = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const [currentLanguage, setCurrentLanguage] = useState<Language>('fi');

  useEffect(() => {
    if (session)
      if (status === 'authenticated' && session.user.isAdmin) {
        setCurrentLanguage('en');
      }
  }, [status, session]);

  const changeLanguage = (language: Language) => setCurrentLanguage(language);

  const labelsDictionary: { [key: string]: { [key: string]: string } } = {
    en,
    fi,
  };

  const getLabel = (labelId: string) => {
    const label = labelsDictionary[currentLanguage][labelId];
    if (!label)
      throw new Error(
        `LabelID ${labelId} not found in ${currentLanguage}.json`
      );
    return label;
  };

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, changeLanguage, getLabel }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
