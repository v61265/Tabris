type WeekDate = {
  date: string
  dayOfWeek: string
  year: number
}

type WeekDatesPickerProps = {
  weekDates: WeekDate[]
  selectedDate: string
  // eslint-disable-next-line no-unused-vars
  onDateChange: (date: string) => void
}

export default function CustomDropDown({
  weekDates,
  selectedDate,
  onDateChange,
}: WeekDatesPickerProps): JSX.Element {
  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Log the selected value for debugging
    console.log('Selected Value:', e.target.value)

    // Call the provided onDateChange function to update the state
    onDateChange(e.target.value)
  }

  return (
    <select value={selectedDate} onChange={handleDateChange}>
      {weekDates.map((date) => (
        <option key={date.date} value={date.date}>
          {date.date} ({date.dayOfWeek})
        </option>
      ))}
    </select>
  )
}
