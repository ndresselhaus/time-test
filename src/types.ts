export type CalendarDay = string;

export type DayOrDate = Date | CalendarDay;

export interface DateTimeLib {
  toCalendarDay(date: Date, timezone: string): CalendarDay;

  toTime(day: DayOrDate, time: string, timezone: string): Date;

  startOfDay(day: DayOrDate, timezone: string): Date;

  endOfDay(day: DayOrDate, timezone: string): Date;

  addDays(date: Date, days: number): Date;

  /*
  You can assume that both params are either Dates or Days
  Implementations should round partial days down
   */
  daysBetween(firstDay: DayOrDate, secondDay: DayOrDate): number;
}
