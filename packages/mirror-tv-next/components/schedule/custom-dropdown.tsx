'use client'
import { useState } from 'react'
import styles from '~/styles/components/schedule/custom-dropdown.module.scss'

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
  const [isOpen, setIsOpen] = useState(false)

  const handleDateChange = (date: string) => {
    setIsOpen(false) // Close the dropdown when a date is selected
    onDateChange(date)
  }

  console.log(selectedDate)

  return (
    <div className={styles.customDropdownContainer}>
      <div className={styles.dropdownButton} onClick={() => setIsOpen(!isOpen)}>
        {selectedDate}
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {weekDates.map((date) => (
            <div
              key={date.date}
              className={styles.option}
              onClick={() => handleDateChange(date.date)}
            >
              {date.year}/{date.date}&ensp; ({date.dayOfWeek.slice(2)})
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

{
  /* <CustomDropdownContainer ref={containerRef}>
<DropdownButton isOpen={isOpen} onClick={toggleDropdown}>
  {selectedOption ? selectedOption : '全部'}
</DropdownButton>
{isOpen && (
  <OptionsList>
    {authors.map((option, index) => (
      <Option key={index} onClick={() => selectOption(option)}>
        {option}
      </Option>
    ))}
  </OptionsList>
)}
</CustomDropdownContainer> */
}
