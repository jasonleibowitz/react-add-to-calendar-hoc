[![npm version](https://badge.fury.io/js/react-add-to-calendar-hoc.svg)](https://badge.fury.io/js/react-add-to-calendar-hoc)
[![Travis](https://img.shields.io/travis/jasonleibowitz/react-add-to-calendar-hoc.svg)](https://travis-ci.org/jasonleibowitz/react-add-to-calendar-hoc)
[![Coverage Status](https://coveralls.io/repos/github/jasonleibowitz/react-add-to-calendar-hoc/badge.svg)](https://coveralls.io/github/jasonleibowitz/react-add-to-calendar-hoc)

# React Add to Calendar HOC

## What is This?

React Add to Calendar HOC is a very lightweight and flexible higher order component that allows you to add _add to calendar_ functionality to your own components. Use your own button component and either dropdown component or modal component.

## Why Should I Use This?

If you want to add "add to calendar" functionality to your application, this is the lightest-weight and most flexibly library that does this. Other libraries that provide this functionality are over 21x the bundle size and don't give you the flexibility of using your own components. There are also no external dependencies to worry about.

In your project you most likely already have reusable button components to other styles. Rather than dictating what your Add to Calendar component looks like, you provide your own components for this library to add functionality to. You can style your components with CSS in JS, CSS Modules or anything else. This library doesn't care what you use or dictate changes to how you do things.

It also doesn't have a bundled date library with it either, giving you the flexibility to use whatever library you want. MomentJS is the most popular, but it's incredibly large. You're in charge of formatting the dateTime string and providing it to this lib. It doesn't care what date lib you use.

## Examples

View examples [here](http://leibowitz.me/react-add-to-calendar-hoc/docs/).

## Installation

Using [npm](https://www.npmjs.com/package/react-add-to-calendar-hoc)

```
npm install react-add-to-calendar-hoc --save
yarn add react-add-to-calendar-hoc
```

Then, using a module bundler that supports either CommonJS or ES2015 modules, such as [webpack](https://github.com/webpack/webpack):

```
// Using an ES6 transpiler like Babel
import AddToCalendarHOC from 'react-add-to-calendar-hoc';

// Not using an ES6 transpiler
var AddToCalendarHOC = require('react-add-to-calendar-hoc');
```

#### Props

The component takes the following props

| Prop          | Type           | Required | Default                          | Description                                                                                                                                                                                                                  |
| ------------- | -------------- | -------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| buttonProps   | object         |          | `{}`                             | Spread props to the button component you pass in to the HOC                                                                                                                                                                  |
| buttonText    | string         |          | `Add to Calendar`                | Text to render in the button                                                                                                                                                                                                 |
| className     | string         |          | `null`                           | className to use on AddToCalendar container                                                                                                                                                                                  |
| dropdownProps | object         |          | `{}`                             | Spread props to the dropdown or modal component you pass in to the HOC                                                                                                                                                       |
| event         | object         | Yes      |                                  | Event object we use to create calendar links                                                                                                                                                                                 |
| items         | array of enums |          | `[GOOGLE, ICAL, OUTLOOK, YAHOO]` | By default AddToCalendar renders all of these calendar links. To render a subset of these or to list them in a different order, provide a list of items using the enum SHARE_SITES, which is a named import from the library |
| linkProps     | object         |          | `{}`                             | Spread props to the link components we render for each calendar item                                                                                                                                                         |

#### Event Object Shape

All of these properties are required.

| Prop          | Type             | Description                                                                                                                                                                              |
| ------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| description   | string           | Description of event. Put in the notes or body section of event.                                                                                                                         |
| duration      | string or number | Duration of event in hours. If string, must be four digits, e.g. `'0200'` or `'0130'`. If number, must represent hours in decimal form, i.e. `2` or `2.15`. This is only used for Yahoo. |
| endDatetime   | string           | End date time of event. Must be formatted in `YYYYMMDDTHHmmssZ` format or `YYYYMMDDTHHmmss` if timezone is also provided. Use any date lib you want, but the format must match this.     |
| location      | string           | Location of event. Use an address for best specificity and for Google Maps to populate a Map. Sometimes a location name will also populate a map.                                        |
| startDatetime | string           | Start date time of event. Must be formatted in `YYYYMMDDTHHmmssZ` format or `YYYYMMDDTHHmmss` if timezone is also provided. Use any date lib you want, but the format must match this.   |
| timezone      | string           | Valid TZ env variable. See list of [valid options here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).                                                                   |
| title         | string           | Name of your event.                                                                                                                                                                      |

#### Helper functions

| Function       | Arguments | Description                                                                                                                |
| -------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| onRequestClose | event     | Handles closing of the modal or dropdown. Can be applied to the Button in the provided Overlay to return to previous view. |

## Dependencies

React Add to Calendar HOC has _zero_ external dependencies.

## Edge Cases

Because this library aims to be extremely unopinionated and lightweight it doesn't handle most edge cases, instead letting you handle them as you'd like. Here are some common edge cases and recommendations for what to do.

#### Open in Outlook doesn't work on iOS

The option to download an ICS file to open in Outlook won't work on iOS because iOS devices don't let you choose which app to open certain files in. iOS devices will always open any ics in the default calendar overlay.

You can handle this case by checking if the user's device is iOS and then customizing the list of items. There's an example in the docs to handle this exact edge case. Look for the section "Handle iPhone Options".

#### How do I specify an event in a specific timezone

Instead of passing `startDatetime` and `endDatetime` as UTC values pass in local time formats, i.e. `YYYYMMDDTHHmmss` and also provide a valid `timezone` property. (For a list of valid properties [see the TZ column here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)).

Doing this will ensure that regardless of the user's local timezone the event created will always be in the correct time for the timezone you specified. It will also include a timezone property in the created event so the user knows what timezone the event is in.

## Reporting Issues

If you believe you've found an issue, please [report it](https://github.com/jasonleibowitz/react-add-to-calendar-hoc/issues) along with any relevant details to reproduce it.

## Contributions

Coming Soon

## Compatibility

<img src="https://www.browserstack.com/images/mail/chrome-on-ios/chrome-on-ios-bslogo.png" width="250">

This component is expected to work on modern browsers, but if it breaks on a particular browser please [file an issue](https://github.com/jasonleibowitz/react-add-to-calendar-hoc/issues/new?template=1.Bug_report.md). We can check the problem using [browserstack](http://browserstack.com) - a great service for cross-browser testing. They also support open source projects like this one.

## License

MIT
