import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SHARE_SITES } from './enums';
import { buildShareUrl, isInternetExplorer } from './utils';

export { SHARE_SITES };
export default function AddToCalendar(WrappedButton, WrappedDropdown) {
  return class AddToCalendarWrapped extends Component {
    static propTypes = {
      buttonProps: PropTypes.shape(),
      buttonText: PropTypes.node,
      className: PropTypes.string,
      dropdownProps: PropTypes.shape(),
      event: PropTypes.shape({
        description: PropTypes.string,
        duration: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ]).isRequired,
        endDatetime: PropTypes.string.isRequired,
        location: PropTypes.string,
        startDatetime: PropTypes.string.isRequired,
        title: PropTypes.string,
        recurring: PropTypes.string,
      }).isRequired,
      filename: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.oneOf(
          Object.keys(SHARE_SITES).map(itm => SHARE_SITES[itm])
        )
      ),
      linkProps: PropTypes.shape(),
    };

    static defaultProps = {
      buttonProps: {},
      buttonText: 'Add to Calendar',
      className: null,
      dropdownProps: {},
      filename: 'download',
      items: Object.keys(SHARE_SITES).map(itm => SHARE_SITES[itm]),
      linkProps: {},
    };

    state = {
      dropdownOpen: false,
    };

    handleCalendarButtonClick = e => {
      const { filename } = this.props;
      e.preventDefault();
      const url = e.currentTarget.getAttribute('href');
      if (url.startsWith('BEGIN')) {
        const blob = new Blob([url], { type: 'text/calendar;charset=utf-8' });

        if (isInternetExplorer()) {
          window.navigator.msSaveOrOpenBlob(blob, `${filename}.ics`);
        } else {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.setAttribute('download', `${filename}.ics`);
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
