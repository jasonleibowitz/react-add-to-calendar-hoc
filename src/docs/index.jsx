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
          endDatetime: '20180604T192913+00:00',
          location: 'NYC',
          startDatetime: '20180604T172932+00:00',
          title: 'Sample Event',
        }}
      />
    </div>
  );
}

render(<Demo />, document.getElementById("app"));
