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

export { formateDateAtTaipei }
