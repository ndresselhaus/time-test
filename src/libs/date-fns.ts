import { CalendarDay, DateTimeLib, DayOrDate } from '../types';
import { add, differenceInDays, format, parse } from 'date-fns';
import { toDate, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

export class DateFnsLib implements DateTimeLib {
  toCalendarDay(date: Date, timezone: string): CalendarDay {
    return format(utcToZonedTime(date, timezone), 'yyyy-MM-dd');
  }

  toTime(day: DayOrDate, time: string, timeZone: string): Date {
    if (typeof day === 'string') {
      return toDate(`${day} ${time}`, { timeZone });
    }

    const zonedTime = utcToZonedTime(day, timeZone);
    const parsedTime = parse(time, 'HH:mm:ss', zonedTime)
    return zonedTimeToUtc(parsedTime, timeZone);
  }

  startOfDay(day: DayOrDate, timeZone: string): Date {
    return this.toTime(day, '00:00:00', timeZone);
  }

  endOfDay(day: DayOrDate, timeZone: string): Date {
    return this.toTime(day, '23:59:59', timeZone);
  }

  addDays(date: Date, days: number): Date {
    return add(date, { days });
  }

  daysBetween(firstDay: DayOrDate, secondDay: DayOrDate): number {
    if (typeof firstDay === 'string') {
      firstDay = this.startOfDay(firstDay, 'UTC');
    }

    if (typeof secondDay === 'string') {
      secondDay = this.startOfDay(secondDay, 'UTC');
    }

    return Math.abs(differenceInDays(firstDay, secondDay));
  }
}

