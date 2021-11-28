import { CalendarDay, DateTimeLib, DayOrDate } from '../types';
import { DateTime, Interval } from 'luxon';

export class LuxonLib implements DateTimeLib {
  toCalendarDay(date: Date, timezone: string): CalendarDay {
    return toDateTime(date, timezone).toISODate();
  }

  toTime(day: DayOrDate, time: string, timezone: string): Date {
    const timeParts = DateTime.fromISO(time);

    return toDateTime(day, timezone)
      .set({
        hour: timeParts.hour,
        minute: timeParts.minute,
        second: timeParts.second,
        millisecond: 0,
      })
      .toJSDate();
  }

  startOfDay(day: DayOrDate, timezone: string): Date {
    return toDateTime(day, timezone)
      .startOf('day')
      .set({ millisecond: 0 })
      .toJSDate();
  }

  endOfDay(day: DayOrDate, timezone: string): Date {
    return toDateTime(day, timezone)
      .endOf('day')
      .set({ millisecond: 0 })
      .toJSDate();
  }

  addDays(date: Date, days: number): Date {
    return DateTime.fromJSDate(date).plus({ days }).toJSDate();
  }

  daysBetween(firstDay: DayOrDate, secondDay: DayOrDate): number {
    const days = Interval
      .fromDateTimes(toDateTime(firstDay, 'UTC'), toDateTime(secondDay, 'UTC'))
      .length('days');

    return Math.floor(days);
  }
}

function toDateTime(day: DayOrDate, zone: string) {
  if (typeof day === 'string') {
    return DateTime.fromFormat(day, 'yyyy-MM-dd', { zone });
  }

  return DateTime.fromJSDate(day, { zone });
}
