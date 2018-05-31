"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AddToCalendar;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mergeStyles = _interopRequireDefault(require("@jasonleibowitz/merge-styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var formatDate = function formatDate(date) {
  return date.replace('+00:00', 'Z');
};

function AddToCalendar(WrappedButton, WrappedDropdown) {
  var _class, _temp2;

  return _temp2 = _class =
  /*#__PURE__*/
  function (_Component) {
    _inherits(AddToCalendarWrapped, _Component);

    function AddToCalendarWrapped() {
      var _getPrototypeOf2;

      var _temp, _this;

      _classCallCheck(this, AddToCalendarWrapped);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AddToCalendarWrapped)).call.apply(_getPrototypeOf2, [this].concat(args))), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        dropdownOpen: false
      }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "buildUrl", function (event, itemName) {
        var calendarUrl;

        switch (itemName) {
          case 'Google':
            calendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&dates=".concat(event.startDate, "/").concat(event.endDate, "&location=").concat(encodeURIComponent(event.location), "&text=").concat(encodeURIComponent(event.title), "&details=").concat(encodeURIComponent(event.description));
            break;

          case 'Yahoo':
            calendarUrl = "https://calendar.yahoo.com/v=60&view=d&type=20&title=".concat(encodeURIComponent(event.title), "&st=").concat(event.startTime, "&dur=2:00&desc=").concat(encodeURIComponent(event.description), "&in_loc=").concat(encodeURIComponent(event.location));
            break;

          case 'OutlookWeb':
            calendarUrl = "https://outlook.live.com/owa/?rru=addevent&startdt=".concat(event.startTime, "&enddt=").concat(event.endTime, "&subject=").concat(encodeURIComponent(event.title), "&location=").concat(encodeURIComponent(event.location), "&body=").concat(encodeURIComponent(event.description), "&allday=false&uid=123&path=/calendar/view/Month");
            break;

          default:
            calendarUrl = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT', "URL:".concat(document.URL), "DTSTART:".concat(event.startTime), "DTEND:".concat(event.endTime), "SUMMARY:".concat(event.title), "DESCRIPTION:".concat(event.description), "LOCATION:".concat(event.location), 'END:VEVENT', 'END:VCALENDAR'].join('\n');
        }

        return calendarUrl;
      }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleCalendarButtonClick", function (e) {
        e.preventDefault();
        var url = e.currentTarget.getAttribute('href');

        if (url.startsWith('BEGIN')) {
          var filename = 'download.ics';
          var blob = new Blob([url], {
            type: 'text/calendar;charset=utf-8'
          });
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          window.open(url, '_blank');
        }
      }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDropdownToggle", function (e) {
        e.preventDefault();

        _this.setState(function (prevState) {
          return {
            dropdownOpen: !prevState.dropdownOpen
          };
        });
      }), _temp));
    }

    _createClass(AddToCalendarWrapped, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var mergedStyles = (0, _mergeStyles.default)({
          component: null,
          container: null,
          link: null
        }, this.props.theme);
        return _react.default.createElement("div", {
          className: mergedStyles.container
        }, _react.default.createElement(WrappedButton, _extends({}, this.props, {
          className: mergedStyles.component,
          onClick: this.handleDropdownToggle
        }), this.props.buttonText), !this.props.isModal || this.state.dropdownOpen && _react.default.createElement(WrappedDropdown, {
          isOpen: this.state.dropdownOpen,
          onRequestClose: this.handleDropdownToggle,
          shouldCloseOnOverlayClick: true
        }, this.props.items.map(function (item) {
          return _react.default.createElement("a", {
            key: item,
            className: mergedStyles.link,
            onClick: _this2.handleCalendarButtonClick,
            href: _this2.buildUrl(_this2.props.event, item),
            rel: "noopener noreferrer",
            target: "_blank"
          }, item);
        })));
      }
    }]);

    return AddToCalendarWrapped;
  }(_react.Component), _defineProperty(_class, "propTypes", {
    buttonText: _propTypes.default.string,
    event: _propTypes.default.shape({
      description: _propTypes.default.string,
      endTime: _propTypes.default.string,
      location: _propTypes.default.string,
      startTime: _propTypes.default.string,
      title: _propTypes.default.string
    }).isRequired,
    isModal: _propTypes.default.bool,
    items: _propTypes.default.array,
    theme: _propTypes.default.shape({
      component: _propTypes.default.string,
      container: _propTypes.default.string,
      link: _propTypes.default.string
    })
  }), _defineProperty(_class, "defaultProps", {
    buttonText: 'Add to Calendar',
    isModal: true,
    items: ['Google', 'Outlook', 'iCal', 'Yahoo']
  }), _temp2;
}