import { CalendarDay, DateTimeLib, DayOrDate } from '../types';
import { Temporal, toTemporalInstant } from '@js-temporal/polyfill';

declare global {
  interface Date {
    toTemporalInstant(): Temporal.Instant;
  }
}

Date.prototype.toTemporalInstant = toTemporalInstant;

export class TemporalLib implements DateTimeLib {
  toCalendarDay(date: Date, timezone: string): CalendarDay {
    return toZoned(date, timezone).toPlainDate().toString();
  }

  toTime(day: DayOrDate, time: string, timezone: string): Date {
    const zoned = toZoned(day, timezone).withPlainTime(time);
    return new Date(zoned.epochMilliseconds);
  }

  startOfDay(day: DayOrDate, timezone: string): Date {
    return new Date(toZoned(day, timezone).startOfDay().epochMilliseconds);
  }

  endOfDay(day: DayOrDate, timezone: string): Date {
    const startOfDay = toZoned(day, timezone).startOfDay();
    const endOfDay = startOfDay
      .add({ days: 1 })
      .subtract({ seconds: 1 });

    return new Date(endOfDay.epochMilliseconds);
  }

  addDays(date: Date, days: number): Date {
    const instant = date.toTemporalInstant().toZonedDateTimeISO('UTC');
    return new Date(instant.add({ days }).epochMilliseconds);
  }

  daysBetween(firstDay: DayOrDate, secondDay: DayOrDate): number {
    // since we're comparing days only, we can use any old timezone
    const timezone = 'UTC';
    const duration = toZoned(firstDay, timezone).since(toZoned(secondDay, timezone), {
      smallestUnit: 'day',
      roundingMode: 'trunc',
    });

    return duration.abs().days;
  }
}

function toZoned(day: DayOrDate, timezone: string) {
  if (typeof day === 'string') {
    const plainDate = Temporal.PlainDateTime.from(day);

    return plainDate.toZonedDateTime(timezone);
  } else {
    return day.toTemporalInstant().toZonedDateTimeISO(timezone);
  }
}
