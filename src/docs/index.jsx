import React from "react";
import { render } from "react-dom";
import AddToCalendarHOC from "../../lib";
import Button from './Button';
import Dropdown from './Dropdown';
import CalendarModal from './Modal';
import { css } from 'emotion';
import "./styles.css";

const pageStyles = css`
  width: 75%;
  margin: 0 auto;
`;

const componentStyles = css`
  width: 50%;
  margin: 0 auto;
`;

const linkStyles = css`
  text-decoration: none;
  display: block;
  color: #E42D2D;
  font-size: 18px;
  text-align: center;
  padding: 6px;
`;

const event = {
  description: 'This is a smple event provided as an example only',
  duration: '2:00',
  endDatetime: '20180604T192913+00:00',
  location: 'NYC',
  startDatetime: '20180604T172932+00:00',
  title: 'Sample Event',
}

const AddToCalendarDropdown = AddToCalendarHOC(Button, Dropdown);
const AddToCalendarModal = AddToCalendarHOC(Button, CalendarModal);

function Demo() {
  return (
    <div className={pageStyles}>
      <h1>Demo with examples of the component</h1>
      <h2>Dropdown Example</h2>
      <AddToCalendarDropdown
        className={componentStyles}
        linkProps={{
          className: linkStyles,
        }}
        event={event}
      />

      <h2>Modal Example</h2>
      <AddToCalendarModal
        className={componentStyles}
        linkProps={{
          className: linkStyles,
        }}
        event={event}
      />
    </div>
  );
}

render(<Demo />, document.getElementById("app"));
