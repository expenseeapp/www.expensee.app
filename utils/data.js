import { format } from './date'

export const toCalendarData = (list = []) => {
  const dateCounts = {}
  list.forEach((c) => {
    const d = format(new Date(c.updated_at), 'YYYY-MM-DD')
    if (!dateCounts[d]) {
      dateCounts[d] = 0
    }
    dateCounts[d] += 1
  })
  return Object.keys(dateCounts).map((d) => d && { date: new Date(d), count: dateCounts[d] })
}
