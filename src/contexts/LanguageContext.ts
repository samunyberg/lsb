import { Language } from '@/providers/language/LanguageProvider';
import { createContext } from 'react';

type LanguageContextType = {
  currentLanguage: Language;
  changeLanguage: (language: Language) => void;
  getLabel: (labelId: string) => string;
};

const LanguageContext = createContext<LanguageContextType>(
  {} as LanguageContextType
);

export default LanguageContext;
