'use client';

import useLanguage from '@/hooks/useLanguage';

interface Props {
  labelId: string;
}

const Label = ({ labelId }: Props) => {
  const { getLabel } = useLanguage();

  return <span>{getLabel(labelId)}</span>;
};

export default Label;
