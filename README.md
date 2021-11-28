# Testing JS Time Libraries

This is a simple project that implements a quick and dirty interface that demonstrates how various libraries handle
datetime manipulation.

## TL;DR

- `date-fns` is good for front-end because you don't need as much timezone math and its tree-shakeable.
- `luxon` has superior timezone support and is great for server-side, where the server doesn't have a good concept of
  "local time" (thus having to work in arbitrary time zones more often) and tree-shaking isn't a requirement.
- `Temporal` will be superior when its native (or at least has a stable polyfill).

## Libraries Included

### `date-fns` + `date-fns-tz`

date-fns website: [https://date-fns.org](https://date-fns.org)  
date-fns-tz website: [https://github.com/marnusw/date-fns-tz](https://github.com/marnusw/date-fns-tz#readme)

Pros:

- Works with native JS `Date`
- Extensive and intuitive functional library
- Tree-shakes nicely if you're into that sort of thing

Cons:

- No built-in timezone support.
- `date-fns-tz` isn't the most elegant timezone support
- Uses different format strings from Moment.js (and `date-fns-timezone` if you use that library)

### `luxon`

Website: [https://moment.github.io/luxon](https://moment.github.io/luxon)

Pros:

- A lot like Moment.js but without all its baggage (its immutable!)
- Great timezone support
- Fluent API

Cons:

- Smaller feature set than date-fns
- Requires wrapper objects (Luxon's `DateTime`)
- Not tree-shakeable

### `Temporal`

TC39 Docs: [https://tc39.es/proposal-temporal/docs/](https://tc39.es/proposal-temporal/docs/)  
Polyfill
implementation: [https://github.com/js-temporal/temporal-polyfill](https://github.com/js-temporal/temporal-polyfill)

Pros:

- An official Stage 3 TS39 proposal, which means it'll be a native implementation at some point.
- Robust conceptualization of Instants (timestamps), ZonedDateTimes (timestamps with timezones), PlainDates, PlainTimes,
  and more!

Cons:

- Still a work-in-progress and should not be used in production

## Acknowledgements

Skypack Blog's
["The best JavaScript date libraries in 2021"](https://www.skypack.dev/blog/2021/02/the-best-javascript-date-libraries/)
which gave me inspiration and a list to try.

Project template originally cloned from
[https://github.com/jsynowiec/node-typescript-boilerplate](https://github.com/jsynowiec/node-typescript-boilerplate)