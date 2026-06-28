const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-')
  const monthName = MONTHS[Number(month) - 1] ?? ''
  return `${monthName} ${Number(day)}, ${year}`
}
