import styles from '~/styles/components/schedule/week-dates-picker.module.scss'

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
    <div className={styles.datesPickerWrapper}>
      {weekDates.map((item) => (
        <button
          key={item.date}
          onClick={() => onButtonClick(item)}
          style={{ outline: 'none' }}
          className={`${styles.weekDayButton} ${
            item.date === selectedDate ? styles.active : ''
          }`}
        >
          <span className={styles.daysOfWeek}>{item.dayOfWeek}</span>
          <span className={styles.date}>{item.date}</span>
        </button>
      ))}
    </div>
  )
}
