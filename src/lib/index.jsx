import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SHARE_SITES } from './enums';
import { buildShareUrl, formatDate } from './utils';

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
      items: PropTypes.arrayOf(PropTypes.oneOf(Object.values(SHARE_SITES))),
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
