type WeekDate = {
  date: string
  dayOfWeek: string
  year: number
}

type WeekDatesPickerProps = {
  weekDates: WeekDate[]
  selectedDate: string
  // eslint-disable-next-line no-unused-vars
  onButtonClick: (item: WeekDate) => void
}

export default function WeekDatesPicker({
  weekDates,
  selectedDate,
  onButtonClick,
}: WeekDatesPickerProps): JSX.Element {
  return (
    <div>
      {weekDates.map((item) => (
        <button
          key={item.date}
          onClick={() => onButtonClick(item)}
          style={{ fontWeight: item.date === selectedDate ? 'bold' : 'normal' }}
        >
          {item.date}
        </button>
      ))}
    </div>
  )
}
