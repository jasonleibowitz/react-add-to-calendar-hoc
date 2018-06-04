[![npm version](https://badge.fury.io/js/react-add-to-calendar-hoc.svg)](https://badge.fury.io/js/react-add-to-calendar-hoc)
[![Travis](https://img.shields.io/travis/jasonleibowitz/react-add-to-calendar-hoc.svg)](https://travis-ci.org/jasonleibowitz/react-add-to-calendar-hoc)
[![Coverage Status](https://coveralls.io/repos/github/jasonleibowitz/react-add-to-calendar-hoc/badge.svg)](https://coveralls.io/github/jasonleibowitz/react-add-to-calendar-hoc)

# React Add to Calendar HOC

Coming Soon

## What does this package do?

## Why is this necessary?

## Installation
```
npm install -S react-add-to-calendar-hoc
// or
yarn add react-add-to-calendar-hoc
```

## Usage

#### Dropdown Example
```
// components/my-button-component.jsx
import React from 'react';
import styles from './styles.js'; // You can style your component however you want

export default function Button({ children, onClick }) {
  return (
    <button
      className={styles}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

<details><summary>Dropdown Component</summary>
```
// components/my-dropdown-component.jsx
import React from 'react';
import styles from './styles.js'; // You can style your component however you want

export default function Dropdown({ children }) {
  return (
    <div className={styles}>
      {children}
    </div>
  );
}
```
</details>

```
import React from 'react';
import moment from 'moment';
import ReactAddToCalendarHOC from 'react-add-to-calendar-hoc';
import Button from 'components/my-button-component';
import Dropdown from 'components/my-dropdown-component';

const AddToCalendar = AddToCalendarHOC(Button, Dropdown);

export default function Component({ event }) {
  const startDatetime = moment(event.startDatetime).utc().format('YYYYMMDDTHHmmssZ');
  const endDatetime = moment(event.startDatetime).utc().format('YYYYMMDDTHHmmssZ');
  const duration = endTime.diff(startTime, 'hours');
  return (
    <AddToCalendar
      event={{
        description: event.description,
        duration,
        endDatetime,
        location: event.location,
        startDatetime,
        title: event.title,
      }}
    />
  );
}
```


#### Props
The component takes the following props

| Prop         | Type          | Required  |  Default                             |  Description |
|--------------|---------------|-----------|--------------------------------------|---|
|buttonProps   |object         |           |`{}`                                  |   |
|buttonText    |string         |           |`Add to Calendar`                     |   |
|className     |string         |           |`null`                                |   |
|dropdownProps |object         |           |`{}`                                  |   |
|event         |object         |Yes        |                                      |   |
|isModal       |bool           |           |`true`                                |   |
|items         |array of enums |           |`[GOOGLE, ICAL, OUTLOOK_WEB, YAHOO]`  |   |
|linkProps     |object         |           |`{}`                                  |   |

#### Event Object Shape
All of these properties are required.

| Prop         | Type          | Description |
|--------------|---------------|-------------|
|description   |string  |Description of event. Put in the notes or body section of event.                                                                                 |
|duration      |number  |Duration of event in hours. e.g. `2:00` or `2`. This is only used for Yahoo.                                                                     |
|endDatetime   |string  |End date time of event. Must be formatted in `YYYYMMDDTHHmmssZ` format. Use any date lib you want, but the format must match this.               |
|location      |string  |Location of event. Use an address for best specificity and for Google Maps to populate a Map. Sometimes a location name will also populate a map. |
|startDatetime |string  |Start date time of event. Must be formatted in `YYYYMMDDTHHmmssZ` format. Use any date lib you want, but the format must match this.             |
|title         |string  |Name of your event.                                                                                                                              |

## Development

## License
MIT