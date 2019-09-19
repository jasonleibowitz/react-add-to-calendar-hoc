"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AddToCalendar;
Object.defineProperty(exports, "SHARE_SITES", {
  enumerable: true,
  get: function get() {
    return _enums.SHARE_SITES;
  }
});

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _enums = require("./enums");

var _utils = require("./utils");

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
        var filename = _this.props.filename;
        e.preventDefault();
        var url = e.currentTarget.getAttribute('href');

        if (url.startsWith('BEGIN')) {
          var blob = new Blob([url], {
            type: 'text/calendar;charset=utf-8'
          });

          if ((0, _utils.isInternetExplorer)()) {
            window.navigator.msSaveOrOpenBlob(blob, "".concat(filename, ".ics"));
          } else {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute('download', "".concat(filename, ".ics"));
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
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

        var _this$props = this.props,
            buttonProps = _this$props.buttonProps,
            buttonText = _this$props.buttonText,
            className = _this$props.className,
            dropdownProps = _this$props.dropdownProps,
            event = _this$props.event,
            items = _this$props.items,
            linkProps = _this$props.linkProps;
        return _react.default.createElement("div", {
          className: className
        }, _react.default.createElement(WrappedButton, _extends({}, buttonProps, {
          onClick: this.handleDropdownToggle
        }), buttonText), this.state.dropdownOpen && _react.default.createElement(WrappedDropdown, _extends({}, dropdownProps, {
          isOpen: this.state.dropdownOpen,
          onRequestClose: this.handleDropdownToggle
        }), items.map(function (item) {
          return _react.default.createElement("a", _extends({}, linkProps, {
            key: item,
            onClick: _this2.handleCalendarButtonClick,
            href: (0, _utils.buildShareUrl)(event, item)
          }), item);
        })));
      }
    }]);

    return AddToCalendarWrapped;
  }(_react.Component), _defineProperty(_class, "propTypes", {
    buttonProps: _propTypes.default.shape(),
    buttonText: _propTypes.default.node,
    className: _propTypes.default.string,
    dropdownProps: _propTypes.default.shape(),
    event: _propTypes.default.shape({
      description: _propTypes.default.string,
      duration: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
      endDatetime: _propTypes.default.string.isRequired,
      location: _propTypes.default.string,
      startDatetime: _propTypes.default.string.isRequired,
      title: _propTypes.default.string
    }).isRequired,
    filename: _propTypes.default.string,
    items: _propTypes.default.arrayOf(_propTypes.default.oneOf(Object.keys(_enums.SHARE_SITES).map(function (itm) {
      return _enums.SHARE_SITES[itm];
    }))),
    linkProps: _propTypes.default.shape()
  }), _defineProperty(_class, "defaultProps", {
    buttonProps: {},
    buttonText: 'Add to Calendar',
    className: null,
    dropdownProps: {},
    filename: 'download',
    items: Object.keys(_enums.SHARE_SITES).map(function (itm) {
      return _enums.SHARE_SITES[itm];
    }),
    linkProps: {}
  }), _temp2;
}