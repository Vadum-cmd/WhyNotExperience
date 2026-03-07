/**
 * Date helpers that use the current date so the UI always shows relative dates.
 */

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatWeekday(date: Date): string {
  return date.toLocaleDateString(undefined, { weekday: 'long' });
}

export function toISO(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Next N days for date pickers. Start from tomorrow (offset 1) to avoid "date in the past" on the server. */
export function getNextDays(
  count: number,
  startOffsetDays: number = 1
): { label: string; date: string; value: string }[] {
  const result: { label: string; date: string; value: string }[] = [];
  for (let i = 0; i < count; i++) {
    const d = addDays(new Date(), startOffsetDays + i);
    result.push({
      label: formatWeekday(d),
      date: formatDisplayDate(d),
      value: toISO(d),
    });
  }
  return result;
}

/** Upcoming availability entries (date + times) for the next N days */
export function getUpcomingAvailability(
  dayCount: number,
  timesPerDay: string[][] = [['10:00 AM', '2:00 PM', '6:00 PM'], ['9:00 AM', '1:00 PM', '5:00 PM']]
): { date: string; times: string[] }[] {
  const result: { date: string; times: string[] }[] = [];
  for (let i = 0; i < dayCount; i++) {
    const d = addDays(new Date(), i);
    result.push({
      date: formatDisplayDate(d),
      times: timesPerDay[i % timesPerDay.length] ?? timesPerDay[0],
    });
  }
  return result;
}
