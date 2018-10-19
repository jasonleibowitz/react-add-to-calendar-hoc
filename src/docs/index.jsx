import 'core-js/es6';
import 'core-js/es7';

import React from "react";
import { render } from "react-dom";
import AddToCalendarHOC, { SHARE_SITES } from "../../lib";
import Button from './Button';
import Dropdown from './Dropdown';
import CalendarModal from './Modal';
import moment from 'moment';
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

const subTitleSTyles = css`
  margin: 50px 0;
  text-align: center;
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

const AddToCalendarDropdown = AddToCalendarHOC(Button, Dropdown);
const AddToCalendarModal = AddToCalendarHOC(Button, CalendarModal);

function Demo() {
  return (
    <div className={pageStyles}>
      <h1 className={titleStyles}>
        Examples of React Add to Calendar HOC
      </h1>
      <div>
        <h2 className={subTitleSTyles}>Event passed into examples</h2>
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
      <h2 className={subTitleSTyles}>Dropdown Example</h2>
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

      <h2 className={subTitleSTyles}>Modal Example</h2>
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

      <h2 className={subTitleSTyles}>Customized Item List Example</h2>
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
    </div>
  );
}

render(<Demo />, document.getElementById("app"));
