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
  weekDates: WeekDate[]
}

type WeekDate = {
  date: string
  dayOfWeek: string
  year: number
}

export default function ScheduleTable({
  schedule,
  weekDates,
}: ScheduleProps): JSX.Element {
  const initialDay = weekDates[0]

  const [selectedDate, setSelectedDate] = useState<WeekDate>({
    date: initialDay.date,
    dayOfWeek: initialDay.dayOfWeek,
    year: initialDay.year,
  })

  const handleSelect = (selectedDate: WeekDate) => {
    setSelectedDate(selectedDate)
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
    const formattedSelectedDate = dayjs(selectedDate.date, 'M/D')
    const data = schedule?.filter((item) =>
      formattedSelectedDate.isSame(
        dayjs(`${item.Month}/${item.Day}`, 'M/D'),
        'day'
      )
    )
    return sortData(data)
  }

  const formatSchedules = getSchedule() ?? []
  const doesHaveSchedules = formatSchedules.length

  return (
    <div>
      <WeekDatesPicker
        weekDates={weekDates}
        selectedDate={selectedDate}
        onButtonClick={handleSelect}
      />
      <CustomDropDown
        weekDates={weekDates}
        selectedDate={selectedDate}
        onDateChange={handleSelect}
      />

      {/* Render schedule based on the selected date */}
      {doesHaveSchedules ? (
        <div>
          {formatSchedules.map((item, index) => (
            <div key={index}>
              <p> {item.Programme}</p>
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
