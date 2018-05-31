import React from "react";
import { render } from "react-dom";
import AddToCalendarHOC from "../../lib";
import Button from './Button';
import Dropdown from './Dropdown';
import "./styles.css";

const AddToCalendar = AddToCalendarHOC(Button, Dropdown);

function Demo() {
  return (
    <div>
      <h1>Demo with examples of the component</h1>
      <AddToCalendar
        event={{
          description: 'This is a smple event provided as an example only',
          duration: '2:00',
          endTime: '20160916T214500-04:00',
          location: 'NYC',
          startTime: '20160916T201500-04:00',
          title: 'Sample Event',
        }}
      />
    </div>
  );
}

render(<Demo />, document.getElementById("app"));
