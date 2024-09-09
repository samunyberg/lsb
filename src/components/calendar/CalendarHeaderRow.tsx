import Label from '../common/Label';

const CalendarHeaderRow = () => {
  const dayNames = [
    'calendar.header_row.mo',
    'calendar.header_row.tu',
    'calendar.header_row.we',
    'calendar.header_row.th',
    'calendar.header_row.fr',
    'calendar.header_row.sa',
    'calendar.header_row.su',
  ];

  const renderedDays = dayNames.map((dayName) => (
    <div key={dayName} className='h-full px-2 text-xs  tracking-wide'>
      <Label labelId={dayName} />
    </div>
  ));

  return <div className='grid grid-cols-7'>{renderedDays}</div>;
};

export default CalendarHeaderRow;
