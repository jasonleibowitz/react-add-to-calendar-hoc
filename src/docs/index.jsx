import 'core-js/es6';
import 'core-js/es7';

import React from "react";
import { render } from "react-dom";
import AddToCalendarHOC, { SHARE_SITES } from "../../lib";
import Button from './Button';
import Dropdown from './Dropdown';
import CalendarModal from './Modal';
import moment from 'moment-timezone';
import CodeSnippet from './CodeSnippet';
import { css } from 'emotion';
import "./styles.css";

const pageStyles = css`
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 75%;
    padding: 0;
  }
`;

const componentStyles = css`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 0 0 30px;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const linkStyles = css`
  text-decoration: none;
  display: block;
  color: #E42D2D;
  font-size: 18px;
  text-align: center;
  padding: 6px;
`;

const titleStyles = css`
  margin: 75px 0;
  text-align: center;
`;

const highlightText = css`
  font-family: Courier;
  font-style: italic;
  color: rgb(218, 49, 80);
  background-color: #FFF;
  padding: 1px 4px;
`;

const subTitleStyles = css`
  margin: 50px 0;
  text-align: center;
`;

const paragraphStyles = css`
  margin: 30px auto;
  width: 80%;
`;

const startDatetime = moment().utc().add(2, 'days');
const endDatetime = startDatetime.clone().add(2, 'hours');
const event = {
  description: 'Description of event. Going to have a lot of fun doing things that we scheduled ahead of time.',
  duration: '0200',
  endDatetime: endDatetime.format('YYYYMMDDTHHmmssZ'),
  location: 'NYC',
  startDatetime: startDatetime.format('YYYYMMDDTHHmmssZ'),
  title: 'Super Fun Event',
}

const eventInDifferentTimezone = {
  ...event,
  location: 'London',
  endDatetime: moment().tz('Europe/London').add(2, 'days').add(2, 'hours').format('YYYYMMDDTHHmmss'),
  startDatetime: moment().tz('Europe/London').add(2, 'days').format('YYYYMMDDTHHmmss'),
  timezone: 'Europe/London',
}

const AddToCalendarDropdown = AddToCalendarHOC(Button, Dropdown);
const AddToCalendarModal = AddToCalendarHOC(Button, CalendarModal);
const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

function Demo() {
  return (
    <div className={pageStyles}>
      <h1 className={titleStyles}>
        Examples of React Add to Calendar HOC
      </h1>
      <div>
        <h2 className={subTitleStyles}>Event passed into examples</h2>
        <CodeSnippet>
          {`
  const startDatetime = moment().utc().add(2, 'days');
  const endDatetime = startDatetime.clone().add(2, 'hours');
  const duration = endDatetime.diff(startDatetime, 'hours');
  const event = {
    description: 'Description of event. Going to have a lot of fun doing things that we scheduled ahead of time.',
    duration,
    endDatetime: endDatetime.format('YYYYMMDDTHHmmssZ'),
    location: 'NYC',
    startDatetime: startDatetime.format('YYYYMMDDTHHmmssZ'),
    title: 'Super Fun Event',
  }
          `}
        </CodeSnippet>
      </div>
      <h2 className={subTitleStyles}>Dropdown Example</h2>
      <AddToCalendarDropdown
        className={componentStyles}
        linkProps={{
          className: linkStyles,
        }}
        event={event}
      />
      <CodeSnippet>
      {`
  const AddToCalendarDropdown = AddToCalendarHOC(Button, Dropdown);
  ...
  <AddToCalendarDropdown
    className={componentStyles}
    linkProps={{
      className: linkStyles,
    }}
    event={event}
  />
      `}
      </CodeSnippet>

      <h2 className={subTitleStyles}>Modal Example</h2>
      <AddToCalendarModal
        className={componentStyles}
        linkProps={{
          className: linkStyles,
        }}
        event={event}
      />
      <CodeSnippet>
      {`
  const AddToCalendarModal = AddToCalendarHOC(Button, CalendarModal);
  ...
  <AddToCalendarModal
    className={componentStyles}
    linkProps={{
      className: linkStyles,
    }}
    event={event}
  />
      `}
      </CodeSnippet>

      <h2 className={subTitleStyles}>Custom Button Text</h2>
      <AddToCalendarModal
        className={componentStyles}
        buttonText="Custom Button Text"
        linkProps={{
          className: linkStyles,
        }}
        event={event}
      />
      <CodeSnippet>
      {`
  const AddToCalendarModal = AddToCalendarHOC(Button, CalendarModal);
  ...
  <AddToCalendarModal
    className={componentStyles}
    buttonText="Custom Button Text"
    linkProps={{
      className: linkStyles,
    }}
    event={event}
  />
      `}
      </CodeSnippet>

      <h2 className={subTitleStyles}>Customized Item List Example</h2>
      <AddToCalendarModal
        className={componentStyles}
        linkProps={{
          className: linkStyles,
        }}
        event={event}
        items={[SHARE_SITES.GOOGLE, SHARE_SITES.ICAL]}
      />
      <CodeSnippet>
      {`
  const AddToCalendarModal = AddToCalendarHOC(Button, CalendarModal);
  ...
  <AddToCalendarModal
    className={componentStyles}
    linkProps={{
      className: linkStyles,
    }}
    event={event}
    items={[SHARE_SITES.GOOGLE, SHARE_SITES.ICAL]}
  />
      `}
      </CodeSnippet>

      <h2 className={subTitleStyles}>Handle iPhone Options</h2>
      <p className={paragraphStyles}>iPhones don't allow users to select which app they want to open ics files with, so there is no reason to offer both iCal and Outlook options for users on iOS devices. This example shows how to conditionally change which items to display based on the user's device.</p>
      <AddToCalendarModal
        className={componentStyles}
        linkProps={{
          className: linkStyles,
        }}
        event={event}
        items={isiOS ? [SHARE_SITES.GOOGLE, SHARE_SITES.ICAL, SHARE_SITES.YAHOO] : undefined}
      />
      <CodeSnippet>
      {`
  const AddToCalendarModal = AddToCalendarHOC(Button, CalendarModal);
  const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  ...
  <AddToCalendarModal
    className={componentStyles}
    linkProps={{
      className: linkStyles,
    }}
    event={event}
    items={isiOS ? [SHARE_SITES.GOOGLE, SHARE_SITES.ICAL, SHARE_SITES.YAHOO] : null}
  />
      `}
      </CodeSnippet>

    <h2 className={subTitleStyles}>Handle Timezones</h2>
      <p className={paragraphStyles}>To support events in a specific timezone you have to do a couple of things. First, pass in an additional property, <span className={highlightText}>timezone</span>. The value of this should be a valid TZ environment variable (<a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones" target="_blank" rel="noopener noreferrer">See here</a> for a list).</p>
      <p className={paragraphStyles}>You should also pass the value of <span className={highlightText}>startDatetime</span> and <span className={highlightText}>endDatetime</span> as local values and not UTC. In other words, if you want to create an event at 11am EST you should pass in a time value of 11am, not 7am UTC (EST has -04:00 offset). You can do this by formatting the date as <span className={highlightText}>YYYYMMDDTHHmmss</span> - without the Z property.</p>
      <p className={paragraphStyles}>Doing this will result in two things -- regardless of the timezone of your users, the event will always be created at the correct time for the timezone set. Secondly, the event will now include timezone information, i.e. it will say Eastern Time.</p>
      <AddToCalendarModal
        className={componentStyles}
        linkProps={{
          className: linkStyles,
        }}
        event={eventInDifferentTimezone}
      />
      <CodeSnippet>
      {`
  const AddToCalendarModal = AddToCalendarHOC(Button, CalendarModal);
  const eventInDifferentTimezone = {
    ...event,
    location: 'London',
    endDatetime: moment().tz('Europe/London').add(2, 'days').add(2, 'hours').format('YYYYMMDDTHHmmss'),
    startDatetime: moment().tz('Europe/London').add(2, 'days').format('YYYYMMDDTHHmmss'),
    timezone: 'Europe/London',
  }
  ...
  <AddToCalendarModal
    className={componentStyles}
    linkProps={{
      className: linkStyles,
    }}
    event={eventInDifferentTimezone}
  />
      `}
      </CodeSnippet>
    </div>
  );
}

render(<Demo />, document.getElementById("app"));
