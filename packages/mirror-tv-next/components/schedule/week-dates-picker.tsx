type WeekDatesPickerProps = {
  weekDates: string[]
  selectedDate: string
  // eslint-disable-next-line no-unused-vars
  onButtonClick: (date: string) => void
}

export default function WeekDatesPicker({
  weekDates,
  selectedDate,
  onButtonClick,
}: WeekDatesPickerProps): JSX.Element {
  return (
    <div>
      {weekDates.map((date) => (
        <button
          key={date}
          onClick={() => onButtonClick(date)}
          style={{ fontWeight: date === selectedDate ? 'bold' : 'normal' }}
        >
          {date}
        </button>
      ))}
    </div>
  )
}
