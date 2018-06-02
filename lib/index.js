"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AddToCalendar;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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
  return date && date.replace('+00:00', 'Z');
};

var SHARE_SITES = {
  GOOGLE: 'Google',
  ICAL: 'iCal',
  OUTLOOK_WEB: 'Outlook Web',
  YAHOO: 'Yahoo'
};

var googleShareUrl = function googleShareUrl(_ref) {
  var description = _ref.description,
      endDatetime = _ref.endDatetime,
      location = _ref.location,
      startDatetime = _ref.startDatetime,
      title = _ref.title;
  return "https://calendar.google.com/calendar/render?action=TEMPLATE&dates=".concat(startDatetime, "/").concat(endDatetime, "&location=").concat(location, "&text=").concat(title, "&details=").concat(description);
};

var yahooShareUrl = function yahooShareUrl(_ref2) {
  var description = _ref2.description,
      duration = _ref2.duration,
      location = _ref2.location,
      startDatetime = _ref2.startDatetime,
      title = _ref2.title;
  return "https://calendar.yahoo.com/v=60&view=d&type=20&title=".concat(title, "&st=").concat(startDatetime, "&dur=").concat(duration, "&desc=").concat(description, "&in_loc=").concat(location);
};

var outlookWebUrl = function outlookWebUrl(_ref3) {
  var description = _ref3.description,
      endDatetime = _ref3.endDatetime,
      location = _ref3.location,
      startDatetime = _ref3.startDatetime,
      title = _ref3.title;
  return "https://outlook.live.com/owa/?rru=addevent&startdt=".concat(startDatetime, "&enddt=").concat(endDatetime, "&subject=").concat(title, "&location=").concat(location, "&body=").concat(description, "&allday=false&uid=123&path=/calendar/view/Month");
};

var buildShareFile = function buildShareFile(_ref4) {
  var description = _ref4.description,
      endDatetime = _ref4.endDatetime,
      location = _ref4.location,
      startDatetime = _ref4.startDatetime,
      title = _ref4.title;
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT', "URL:".concat(document.URL), "DTSTART:".concat(startDatetime), "DTEND:".concat(endDatetime), "SUMMARY:".concat(title), "DESCRIPTION:".concat(description), "LOCATION:".concat(location), 'END:VEVENT', 'END:VCALENDAR'].join('\n');
};

var buildShareUrl = function buildShareUrl(_ref5, type) {
  var description = _ref5.description,
      duration = _ref5.duration,
      endDatetime = _ref5.endDatetime,
      location = _ref5.location,
      startDatetime = _ref5.startDatetime,
      title = _ref5.title;
  var encodeURI = type !== SHARE_SITES.ICAL;
  var data = {
    description: encodeURI ? encodeURIComponent(description) : description,
    duration: duration,
    endDatetime: formatDate(endDatetime),
    location: encodeURI ? encodeURIComponent(location) : location,
    startDatetime: formatDate(startDatetime),
    title: encodeURI ? encodeURIComponent(title) : title
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

        return _react.default.createElement("div", {
          className: this.props.className
        }, _react.default.createElement(WrappedButton, _extends({}, this.props.buttonProps, {
          onClick: this.handleDropdownToggle
        }), this.props.buttonText), !this.props.isModal || this.state.dropdownOpen && _react.default.createElement(WrappedDropdown, _extends({}, this.props.dropdownProps, {
          isOpen: this.state.dropdownOpen,
          onRequestClose: this.handleDropdownToggle,
          shouldCloseOnOverlayClick: true
        }), this.props.items.map(function (item) {
          return _react.default.createElement("a", _extends({}, _this2.props.linkProps, {
            key: item,
            onClick: _this2.handleCalendarButtonClick,
            href: buildShareUrl(_this2.props.event, item)
          }), item);
        })));
      }
    }]);

    return AddToCalendarWrapped;
  }(_react.Component), _defineProperty(_class, "propTypes", {
    buttonProps: _propTypes.default.shape(),
    buttonText: _propTypes.default.string,
    className: _propTypes.default.string,
    dropdownProps: _propTypes.default.shape(),
    event: _propTypes.default.shape({
      description: _propTypes.default.string,
      endDatetime: _propTypes.default.string,
      location: _propTypes.default.string,
      startDatetime: _propTypes.default.string,
      title: _propTypes.default.string
    }).isRequired,
    isModal: _propTypes.default.bool,
    items: _propTypes.default.oneOf(Object.values(SHARE_SITES)),
    linkProps: _propTypes.default.shape(),
    theme: _propTypes.default.shape({
      component: _propTypes.default.string,
      container: _propTypes.default.string,
      link: _propTypes.default.string
    })
  }), _defineProperty(_class, "defaultProps", {
    buttonProps: {},
    buttonText: 'Add to Calendar',
    className: null,
    dropdownProps: {},
    isModal: true,
    items: Object.values(SHARE_SITES),
    linkProps: {}
  }), _temp2;
}