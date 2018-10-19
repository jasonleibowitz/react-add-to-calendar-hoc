import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SHARE_SITES } from './enums';
import { buildShareUrl, formatDate, isInternetExplorer } from './utils';

export { SHARE_SITES };
export default function AddToCalendar(WrappedButton, WrappedDropdown) {
  return class AddToCalendarWrapped extends Component {
    static propTypes = {
      buttonProps: PropTypes.shape(),
      buttonText: PropTypes.string,
      className: PropTypes.string,
      dropdownProps: PropTypes.shape(),
      event: PropTypes.shape({
        description: PropTypes.string,
        duration: PropTypes.string.isRequired,
        endDatetime: PropTypes.string.isRequired,
        location: PropTypes.string,
        startDatetime: PropTypes.string.isRequired,
        title: PropTypes.string,
      }).isRequired,
      items: PropTypes.arrayOf(PropTypes.oneOf(Object.values(SHARE_SITES))),
      linkProps: PropTypes.shape(),
    };

    static defaultProps = {
      buttonProps: {},
      buttonText: 'Add to Calendar',
      className: null,
      dropdownProps: {},
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

        if (isInternetExplorer()) {
          window.navigator.msSaveOrOpenBlob(blob, filename);
        } else {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } else {
        window.open(url, '_blank');
      }
    };

    handleDropdownToggle = e => {
      e.preventDefault();
      this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
    };

    render() {
      const { buttonProps, buttonText, className, dropdownProps, event, items, linkProps } = this.props;

      return (
        <div className={className}>
          <WrappedButton
            {...buttonProps}
            onClick={this.handleDropdownToggle}
          >
            {buttonText}
          </WrappedButton>
          {this.state.dropdownOpen && (
              <WrappedDropdown
                {...dropdownProps}
                isOpen={this.state.dropdownOpen}
                onRequestClose={this.handleDropdownToggle}
              >
                {items.map(item => (
                  <a
                    {...linkProps}
                    key={item}
                    onClick={this.handleCalendarButtonClick}
                    href={buildShareUrl(event, item)}
                  >
                    {item}
                  </a>
                ))}
              </WrappedDropdown>
            )}
        </div>
      );
    }
  };
}
