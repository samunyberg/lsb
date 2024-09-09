import useLanguage from './useLanguage';

const useLocale = () => {
  const { currentLanguage } = useLanguage();

  return `${currentLanguage}-FI`;
};

export default useLocale;
