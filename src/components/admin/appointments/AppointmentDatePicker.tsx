interface Props {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const AppointmentDatePicker = ({ selectedDate, onSelectDate }: Props) => {
  return (
    <div className='h-full w-full'>
      <input
        type='date'
        value={selectedDate}
        onChange={(event) => onSelectDate(event.target.value)}
        className='h-full w-full cursor-text rounded-sm bg-white/80 p-2 text-sm text-primary shadow focus:outline-accent'
      />
    </div>
  );
};

export default AppointmentDatePicker;
