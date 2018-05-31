import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mergeStyles from '@jasonleibowitz/merge-styles';

const formatDate = date => date.replace('+00:00', 'Z');

export default function AddToCalendar(WrappedButton, WrappedDropdown) {
  return class AddToCalendarWrapped extends Component {
    static propTypes = {
      buttonText: PropTypes.string,
      event: PropTypes.shape({
        description: PropTypes.string,
        endTime: PropTypes.string,
        location: PropTypes.string,
        startTime: PropTypes.string,
        title: PropTypes.string,
      }).isRequired,
      isModal: PropTypes.bool,
      items: PropTypes.array,
      theme: PropTypes.shape({
        component: PropTypes.string,
        container: PropTypes.string,
        link: PropTypes.string,
      }),
    };

    static defaultProps = {
      buttonText: 'Add to Calendar',
      isModal: true,
      items: ['Google', 'Outlook', 'iCal', 'Yahoo'],
    };

    state = {
      dropdownOpen: false,
    };

    buildUrl = (event, itemName) => {
      let calendarUrl;

      switch (itemName) {
        case 'Google':
          calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${
            event.startDate
          }/${event.endDate}&location=${encodeURIComponent(
            event.location,
          )}&text=${encodeURIComponent(
            event.title,
          )}&details=${encodeURIComponent(event.description)}`;
          break;
        case 'Yahoo':
          calendarUrl = `https://calendar.yahoo.com/v=60&view=d&type=20&title=${encodeURIComponent(
            event.title,
          )}&st=${
            event.startTime
          }&dur=2:00&desc=${encodeURIComponent(
            event.description,
          )}&in_loc=${encodeURIComponent(event.location)}`;
          break;
        case 'OutlookWeb':
          calendarUrl = `https://outlook.live.com/owa/?rru=addevent&startdt=${
            event.startTime
          }&enddt=${event.endTime}&subject=${encodeURIComponent(
            event.title,
          )}&location=${encodeURIComponent(
            event.location,
          )}&body=${encodeURIComponent(
            event.description,
          )}&allday=false&uid=123&path=/calendar/view/Month`;
          break;
        default:
          calendarUrl = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            `URL:${document.URL}`,
            `DTSTART:${event.startTime}`,
            `DTEND:${event.endTime}`,
            `SUMMARY:${event.title}`,
            `DESCRIPTION:${event.description}`,
            `LOCATION:${event.location}`,
            'END:VEVENT',
            'END:VCALENDAR',
          ].join('\n');
      }

      return calendarUrl;
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
      const mergedStyles = mergeStyles(
        {
          component: null,
          container: null,
          link: null,
        },
        this.props.theme,
      );

      return (
        <div className={mergedStyles.container}>
          <WrappedButton
            {...this.props}
            className={mergedStyles.component}
            onClick={this.handleDropdownToggle}
          >
            {this.props.buttonText}
          </WrappedButton>
          {!this.props.isModal ||
            (this.state.dropdownOpen && (
              <WrappedDropdown
                isOpen={this.state.dropdownOpen}
                onRequestClose={this.handleDropdownToggle}
                shouldCloseOnOverlayClick={true}
              >
                {this.props.items.map(item => (
                  <a
                    key={item}
                    className={mergedStyles.link}
                    onClick={this.handleCalendarButtonClick}
                    href={this.buildUrl(this.props.event, item)}
                    rel="noopener noreferrer"
                    target="_blank"
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
