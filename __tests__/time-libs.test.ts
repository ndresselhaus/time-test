import { DateFnsLib } from '../src/libs/date-fns';
import { LuxonLib } from '../src/libs/luxon';
import { TemporalLib } from '../src/libs/temporal';
import { DateTimeLib } from '../src/types';

describe.each([
  ['date-fns', new DateFnsLib()],
  ['luxon', new LuxonLib()],
  ['temporal', new TemporalLib()],
])('%s time lib', (_name: string, dateTimeLib: DateTimeLib) => {
  test('#toCalendarDay', () => {
    const date = new Date('2021-01-15T01:00:00Z');

    // 1 AM UTC on Jan 15th...
    expect(dateTimeLib.toCalendarDay(date, 'UTC')).toEqual('2021-01-15');

    // ...is 6PM Pacific Jan 14th
    expect(dateTimeLib.toCalendarDay(date, 'America/Los_Angeles')).toEqual('2021-01-14');
  });

  test('#toTime', () => {
    // beginning of October 1st Pacific Daylight Time (UTC-7)
    expect(
      dateTimeLib.toTime(new Date('2021-10-02T02:00:00Z'), '00:00:00', 'America/Los_Angeles'),
    ).toEqual(new Date('2021-10-01T07:00:00Z'));

    // noon December 31st Eastern Standard Time (UTC-5)
    expect(
      dateTimeLib.toTime(new Date('2021-01-01T02:00:00Z'), '12:00:00', 'America/New_York'),
    ).toEqual(new Date('2020-12-31T17:00:00Z'));

    expect(
      dateTimeLib.toTime('2021-01-01', '12:00:00', 'America/New_York'),
    ).toEqual(new Date('2021-01-01T17:00:00Z'));
  });

  test('#startOfDay', () => {
    // beginning of October 1st Pacific Daylight Time
    expect(
      dateTimeLib.startOfDay(new Date('2021-10-02T02:00:00Z'), 'America/Los_Angeles'),
    ).toEqual(new Date('2021-10-01T07:00:00Z'));

    // beginning of December 31st Eastern Standard Time
    expect(
      dateTimeLib.startOfDay(new Date('2021-01-01T02:00:00Z'), 'America/New_York'),
    ).toEqual(new Date('2020-12-31T05:00:00Z'));

    expect(
      dateTimeLib.startOfDay('2021-01-01', 'America/New_York'),
    ).toEqual(new Date('2021-01-01T05:00:00Z'));
  });

  test('#endOfDay', () => {
    // end of October 1st Pacific Daylight Time
    expect(
      dateTimeLib.endOfDay(new Date('2021-10-02T02:00:00Z'), 'America/Los_Angeles'),
    ).toEqual(new Date('2021-10-02T06:59:59Z'));

    // end of December 31st Eastern Standard Time
    expect(
      dateTimeLib.endOfDay(new Date('2021-01-01T02:00:00Z'), 'America/New_York'),
    ).toEqual(new Date('2021-01-01T04:59:59Z'));

    expect(
      dateTimeLib.endOfDay('2021-01-01', 'America/New_York'),
    ).toEqual(new Date('2021-01-02T04:59:59Z'));
  });

  test('#addDays', () => {
    expect(
      dateTimeLib.addDays(new Date('2021-10-01T04:00:00Z'), 4),
    ).toEqual(new Date('2021-10-05T04:00:00Z'));
  });

  test('#daysBetween', () => {
    expect(
      dateTimeLib.daysBetween(
        // noon UTC on 10/1
        new Date('2021-10-01T12:00:00Z'),
        // midnight UTC on 10/4, 2.5 days later
        // implementations should round down
        new Date('2021-10-04T00:00:00Z'),
      ),
    ).toEqual(2);

    expect(
      dateTimeLib.daysBetween('2021-10-01', '2021-10-03'),
    ).toEqual(2);
  });
});
