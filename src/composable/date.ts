import { EntityModelNewsfeedEventDto } from '@/openapi'

export function useDates() {
  function isYearAndMonthDate(date: string): boolean {
    return date.length == 7
  }

  function getMonthAndYear(date: Date): string {
    return (
      date.getFullYear().toString() +
      '.' +
      padTo2Digits(date.getMonth() + 1)
    )
  }
  function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0')
  }

  function formatDate(date: Date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate())
    ].join('.')
  }

  function getDate(
    event: EntityModelNewsfeedEventDto | undefined
  ) {
    if (event && event.time) {
      const date = new Date(event.time)
      return formatDate(date)
    }
    return 'null'
  }

  return {
    isYearAndMonthDate,
    getMonthAndYear,
    getDate,
    padTo2Digits
  }
}
