interface Props {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const AppointmentDatePicker = ({ selectedDate, onSelectDate }: Props) => {
  return (
    <div className='h-full rounded-md bg-bgSoft px-3 py-1 shadow'>
      <input
        type='date'
        value={selectedDate}
        defaultValue={selectedDate}
        onChange={(event) => onSelectDate(event.target.value)}
        className='h-full w-full cursor-text bg-transparent text-sm outline-none'
      />
    </div>
  );
};

export default AppointmentDatePicker;
