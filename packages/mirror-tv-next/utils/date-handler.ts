import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

function formateDateAtTaipei(
  date: Date,
  formateString: string,
  suffixStr?: string
): string {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.tz.setDefault('Asia/Taipei')
  const taipeiTime = dayjs(date).tz('Asia/Taipei').format(formateString)
  return `${taipeiTime} ${suffixStr}`
}

function getMidnightExpiration(): Date {
  const now: Date = new Date()
  const timezoneOffset: number = 480
  const localOffset: number = now.getTimezoneOffset()
  const taiwanNow: Date = new Date(
    now.getTime() + (timezoneOffset + localOffset) * 60 * 1000
  )

  const midnight: Date = new Date(taiwanNow)
  midnight.setHours(24, 0, 0, 0) // 設置為台灣時間的午夜 00:00

  const timeUntilMidnight: number = midnight.getTime() - taiwanNow.getTime()

  return new Date(Date.now() + timeUntilMidnight)
}

export { formateDateAtTaipei, getMidnightExpiration }
