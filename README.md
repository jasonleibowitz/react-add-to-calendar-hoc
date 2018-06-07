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

## Usage

### Dropdown Example
<details>
<summary>Button Component</summary>

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
</details>

<details>
<summary>Dropdown Component</summary>

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

### Modal Example
<details>
<summary>Button Component</summary>

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
</details>

<details>
<summary>Modal Component</summary>

```
import React from 'react';
import Modal from 'react-modal'; // You don't have to use react-modal, just consume the callback
import Button from 'components/my-button-component';
import styles from './styles.js' // You can style your component however you want

export default function CalendarModal({
  children,
  isOpen,
  onRequestClose,
}) {
return (
  <Modal
    className={styles}
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    shouldCloseOnOverlayClick={true}
  >
    <h2>Add to Calendar</h2>
    <div>{children}</div>
    <Button onClick={onRequestClose}>Cancel</Button>
  </Modal>
);
```
</details>

```
import React from 'react';
import moment from 'moment';
import ReactAddToCalendarHOC from 'react-add-to-calendar-hoc';
import Button from 'components/my-button-component';
import Modal from 'components/my-modal-component';

const AddToCalendar = AddToCalendarHOC(Button, Modal);

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

### Customize list of calendar links
```
import React from 'react';
import moment from 'moment';
import ReactAddToCalendarHOC, { SHARE_SITES } from 'react-add-to-calendar-hoc';
import Button from 'components/my-button-component';
import Modal from 'components/my-modal-component';

const AddToCalendar = AddToCalendarHOC(Button, Modal);

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
      items={[SHARE_SITES.GOOGLE, SHARE_SITES.ICAL]}
    />
  );
```

#### Props
The component takes the following props

| Prop         | Type          | Required  |  Default                             |  Description |
|--------------|---------------|-----------|--------------------------------------|---|
|buttonProps   |object         |           |`{}`                                  |Spread props to the button component you pass in to the HOC   |
|buttonText    |string         |           |`Add to Calendar`                     |Text to render in the button   |
|className     |string         |           |`null`                                |className to use on AddToCalendar container   |
|dropdownProps |object         |           |`{}`                                  |Spread props to the dropdown or modal component you pass in to the HOC   |
|event         |object         |Yes        |                                      |Event object we use to create calendar links   |
|items         |array of enums |           |`[GOOGLE, ICAL, OUTLOOK, YAHOO]`  |By default AddToCalendar renders all of these calendar links. To render a subset of these or to list them in a different order, provide a list of items using the enum SHARE_SITES, which is a named import from the library   |
|linkProps     |object         |           |`{}`                                  |Spread props to the link components we render for each calendar item   |

#### Event Object Shape
All of these properties are required.

| Prop         | Type          | Description |
|--------------|---------------|-------------|
|description   |string  |Description of event. Put in the notes or body section of event.                                                                                 |
|duration      |string  |Duration of event in hours. Must be four digits, e.g. `0200` or `0130`. This is only used for Yahoo.                                                                     |
|endDatetime   |string  |End date time of event. Must be formatted in `YYYYMMDDTHHmmssZ` format. Use any date lib you want, but the format must match this.               |
|location      |string  |Location of event. Use an address for best specificity and for Google Maps to populate a Map. Sometimes a location name will also populate a map. |
|startDatetime |string  |Start date time of event. Must be formatted in `YYYYMMDDTHHmmssZ` format. Use any date lib you want, but the format must match this.             |
|title         |string  |Name of your event.                                                                                                                              |

## Dependencies
React Add to Calendar HOC has _zero_ external dependencies.

## Reporting Issues
If you believe you've found an issue, please [report it](https://github.com/jasonleibowitz/react-add-to-calendar-hoc/issues) along with any relevant details to reproduce it.

## Contributions
Coming Soon

## License
MIT
