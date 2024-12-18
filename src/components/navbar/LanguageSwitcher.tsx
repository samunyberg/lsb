import useLanguage from '@/hooks/useLanguage';
import { Language } from '@/providers/language/LanguageProvider';

const LanguageSwitcher = () => {
  const { changeLanguage, currentLanguage } = useLanguage();

  const handleChange = (language: Language) => {
    changeLanguage(language === 'en' ? 'en' : 'fi');
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    language: Language
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleChange(language);
    }
  };

  return (
    <div
      className='relative flex w-full rounded-sm border border-primary py-1 text-xs'
      role='group'
      aria-label='Language Switcher'
    >
      <div
        className={`absolute inset-y-0 w-1/2 rounded-sm bg-accent transition-transform duration-300 ease-in-out ${
          currentLanguage === 'fi'
            ? 'translate-x-0 transform'
            : 'translate-x-full transform'
        }`}
      ></div>
      <div
        className={`z-10 flex-1 cursor-pointer text-center ${
          currentLanguage === 'fi' ? 'text-white' : 'text-primary'
        }`}
        role='button'
        aria-pressed={currentLanguage === 'fi'}
        aria-label='Switch to Finnish'
        tabIndex={0}
        onClick={() => handleChange('fi')}
        onKeyDown={(event) => handleKeyDown(event, 'fi')}
      >
        Fi
      </div>
      <div
        className={`z-10 flex-1 cursor-pointer text-center ${
          currentLanguage !== 'fi' ? 'text-white' : 'text-primary'
        }`}
        role='button'
        aria-pressed={currentLanguage !== 'fi'}
        aria-label='Switch to English'
        tabIndex={0}
        onClick={() => handleChange('en')}
        onKeyDown={(event) => handleKeyDown(event, 'en')}
      >
        En
      </div>
    </div>
  );
};

export default LanguageSwitcher;
