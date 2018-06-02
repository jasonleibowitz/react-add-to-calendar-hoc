import React, { Component } from 'react';
import PropTypes from 'prop-types';

const formatDate = date => date && date.replace('+00:00', 'Z');

const SHARE_SITES = {
  GOOGLE: 'Google',
  ICAL: 'iCal',
  OUTLOOK_WEB: 'Outlook Web',
  YAHOO: 'Yahoo',
};

const googleShareUrl = ({
  description,
  endDatetime,
  location,
  startDatetime,
  title,
}) =>
  `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${
    startDatetime
  }/${endDatetime}&location=${location}&text=${title}&details=${description}`;

const yahooShareUrl = ({
  description,
  duration,
  location,
  startDatetime,
  title,
}) =>
  `https://calendar.yahoo.com/v=60&view=d&type=20&title=${title}&st=${
    startDatetime
  }&dur=${duration}&desc=${description}&in_loc=${location}`;

const outlookWebUrl = ({
  description,
  endDatetime,
  location,
  startDatetime,
  title,
}) =>
  `https://outlook.live.com/owa/?rru=addevent&startdt=${startDatetime}&enddt=${
    endDatetime
  }&subject=${title}&location=${location}&body=${
    description
  }&allday=false&uid=123&path=/calendar/view/Month`;

const buildShareFile = ({
  description,
  endDatetime,
  location,
  startDatetime,
  title,
}) =>
  [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `URL:${document.URL}`,
    `DTSTART:${startDatetime}`,
    `DTEND:${endDatetime}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\n');

const buildShareUrl = (
  { description, duration, endDatetime, location, startDatetime, title },
  type,
) => {
  const encodeURI = type !== SHARE_SITES.ICAL;

  const data = {
    description: encodeURI ? encodeURIComponent(description) : description,
    duration,
    endDatetime: formatDate(endDatetime),
    location: encodeURI ? encodeURIComponent(location) : location,
    startDatetime: formatDate(startDatetime),
    title: encodeURI ? encodeURIComponent(title) : title,
  };

  switch (type) {
    case SHARE_SITES.GOOGLE:
      return googleShareUrl(data);
    case SHARE_SITES.YAHOO:
      return yahooShareUrl(data);
    case SHARE_SITES.OUTLOOK_WEB:
      return outlookWebUrl(data);
    default:
      return buildShareFile(data);
  }
};

export default function AddToCalendar(WrappedButton, WrappedDropdown) {
  return class AddToCalendarWrapped extends Component {
    static propTypes = {
      buttonProps: PropTypes.shape(),
      buttonText: PropTypes.string,
      className: PropTypes.string,
      dropdownProps: PropTypes.shape(),
      event: PropTypes.shape({
        description: PropTypes.string,
        endDatetime: PropTypes.string,
        location: PropTypes.string,
        startDatetime: PropTypes.string,
        title: PropTypes.string,
      }).isRequired,
      isModal: PropTypes.bool,
      items: PropTypes.oneOf(Object.values(SHARE_SITES)),
      linkProps: PropTypes.shape(),
    };

    static defaultProps = {
      buttonProps: {},
      buttonText: 'Add to Calendar',
      className: null,
      dropdownProps: {},
      isModal: true,
      items: Object.values(SHARE_SITES),
      linkProps: {},
    };

    state = {
      dropdownOpen: false,
    };

    handleCalendarButtonClick = e => {
      e.preventDefault();
      const url = e.currentTarget.getAttribute('href');
      if (url.startsWith('BEGIN')) {
        const filename = 'download.ics';
        const blob = new Blob([url], { type: 'text/calendar;charset=utf-8' });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(url, '_blank');
      }
    };

    handleDropdownToggle = e => {
      e.preventDefault();
      this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
    };

    render() {
      return (
        <div className={this.props.className}>
          <WrappedButton
            {...this.props.buttonProps}
            onClick={this.handleDropdownToggle}
          >
            {this.props.buttonText}
          </WrappedButton>
          {!this.props.isModal ||
            (this.state.dropdownOpen && (
              <WrappedDropdown
                {...this.props.dropdownProps}
                isOpen={this.state.dropdownOpen}
                onRequestClose={this.handleDropdownToggle}
                shouldCloseOnOverlayClick={true}
              >
                {this.props.items.map(item => (
                  <a
                    {...this.props.linkProps}
                    key={item}
                    onClick={this.handleCalendarButtonClick}
                    href={buildShareUrl(this.props.event, item)}
                  >
                    {item}
                  </a>
                ))}
              </WrappedDropdown>
            ))}
        </div>
      );
    }
  };
}
