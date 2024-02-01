import errors from '@twreporter/errors'
import ScheduleTable from '~/components/schedule/schedule-table'
import {
  GLOBAL_CACHE_SETTING,
  SCHEDULE_JSON_URL,
} from '~/constants/environment-variables'
import styles from '~/styles/pages/schedule-page.module.scss'
import type { Schedule } from '~/types/common'

export const revalidate = GLOBAL_CACHE_SETTING

async function getData() {
  try {
    const res = await fetch(SCHEDULE_JSON_URL, {
      next: { revalidate: GLOBAL_CACHE_SETTING },
    })

    if (!res.ok) {
      console.error('Failed to fetch schedule data')
      return []
    }

    return res.json()
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while fetching schedule'
    )

    console.error(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(annotatingError, {
          withStack: false,
          withPayload: true,
        }),
      })
    )
    throw new Error('Error occurs while fetching schedule.')
  }
}

export default async function SchedulePage() {
  let schedule: Schedule[] = []

  schedule = await getData()

  return (
    <main className={styles.main}>
      <ScheduleTable schedule={schedule} />
    </main>
  )
}
