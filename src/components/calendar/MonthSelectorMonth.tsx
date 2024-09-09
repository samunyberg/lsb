import { cn } from 'clsx-tailwind-merge';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  monthName: string;
  currentMonth: number;
  selectedMonth: number;
  onSelect: Dispatch<SetStateAction<number>>;
}

const MonthSelectorMonth = ({
  monthName: month,
  currentMonth,
  selectedMonth,
  onSelect,
}: Props) => {
  const isSelected = currentMonth === selectedMonth;

  return (
    <span
      className={cn('mx-2 h-full cursor-pointer text-sm  transition-all', {
        'font-bold': isSelected,
      })}
      onClick={() => onSelect(currentMonth)}
    >
      {month}
    </span>
  );
};

export default MonthSelectorMonth;
