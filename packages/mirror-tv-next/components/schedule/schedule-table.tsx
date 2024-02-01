'use client'

import dayjs from 'dayjs'
import Image from 'next/image'
import { useState } from 'react'
import CustomDropDown from '~/components/schedule/custom-dropdown'
import WeekDatesPicker from '~/components/schedule/week-dates-picker'
import styles from '~/styles/components/schedule/schedule-table.module.scss'
import type { Schedule } from '~/types/common'

type ScheduleProps = {
  schedule: Schedule[]
}

type WeekDate = {
  date: string
  dayOfWeek: string
  year: number
}

export default function ScheduleTable({
  schedule,
}: ScheduleProps): JSX.Element {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('D/M'))

  // Function to handle button click and update the selected date
  const handleButtonClick = (selectedDateObj: {
    date: string
    dayOfWeek: string
    year: number
  }) => {
    setSelectedDate(selectedDateObj.date)
  }

  const handleDropDownSelect = (date: string) => {
    setSelectedDate(date)
  }

  //get week days
  const weekDates: WeekDate[] = []
  for (let i = 0; i < 7; i++) {
    const date = dayjs().add(i, 'day')
    const item: WeekDate = {
      date: date.format('D/M'),
      dayOfWeek: date.format('dddd'),
      year: date.year(),
    }
    weekDates.push(item)
  }

  const sortData = (data: Schedule[]) => {
    return data.sort((a, b) => {
      const startTimeA =
        parseInt(a['Start Time(hh)']) * 60 + parseInt(a['Start Time(mm)'])
      const startTimeB =
        parseInt(b['Start Time(hh)']) * 60 + parseInt(b['Start Time(mm)'])

      return startTimeA - startTimeB
    })
  }

  const getSchedule = () => {
    const formattedSelectedDate = dayjs(selectedDate, 'D/M')
    const data = schedule?.filter((item) =>
      formattedSelectedDate.isSame(
        dayjs(`${item.Day}/${item.Month}`, 'D/M'),
        'day'
      )
    )
    return sortData(data)
  }

  const formatSchedules = getSchedule() ?? []
  const doesHaveSchedules = formatSchedules.length

  console.log(formatSchedules, doesHaveSchedules)

  return (
    <div>
      <WeekDatesPicker
        weekDates={weekDates}
        selectedDate={selectedDate}
        onButtonClick={handleButtonClick}
      />
      <CustomDropDown
        weekDates={weekDates}
        selectedDate={selectedDate}
        onDateChange={handleDropDownSelect}
      />

      {/* Render schedule based on the selected date */}
      {doesHaveSchedules ? (
        <div>
          {formatSchedules.map((item, index) => (
            <div key={index}>
              <p>Programme: {item.Programme}</p>
              <p>
                Start Time: {item['Start Time(hh)']}:{item['Start Time(mm)']}
              </p>
              <p>Duration: {item.Duration}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noSchedule}>
          <Image
            src="/images/magnifier-with-question-mark.png"
            alt="找不到當日節目表"
            width={128}
            height={128}
          />
          <span>找不到當日節目表</span>
          <span>請選擇其他日查看</span>
        </div>
      )}
    </div>
  )
}
