"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildShareUrl = exports.escapeICSDescription = exports.isInternetExplorer = exports.isMobile = exports.formatDuration = exports.formatDate = void 0;

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _enums = require("./enums");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Converts Date String with UTC timezone to date consumable by calendar
 * apps. Changes +00:00 to Z.
 * @param {string} Date in YYYYMMDDTHHmmssZ format
 * @returns {string} Date with +00:00 replaceed with Z
 */
var formatDate = function formatDate(date) {
  return date && date.replace('+00:00', 'Z');
};

exports.formatDate = formatDate;

var formatDuration = function formatDuration(duration) {
  if (typeof duration === 'string') return duration;
  var parts = duration.toString().split('.');

  if (parts.length < 2) {
    parts.push('00');
  }

  return parts.map(function (part) {
    return part.length === 2 ? part : "0".concat(part);
  }).join('');
};
/**
 * Tests provided UserAgent against Known Mobile User Agents
 * @returns {bool} isMobileDevice
 */


exports.formatDuration = formatDuration;

var isMobile = function isMobile() {
  return /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(window.navigator.userAgent || window.navigator.vendor || window.opera);
};
/**
 * Tests userAgent to see if browser is IE
 * @returns {bool} isInternetExplorer
 */


exports.isMobile = isMobile;

var isInternetExplorer = function isInternetExplorer() {
  return /MSIE/.test(window.navigator.userAgent) || /Trident/.test(window.navigator.userAgent);
};

exports.isInternetExplorer = isInternetExplorer;

var escapeICSDescription = function escapeICSDescription(description) {
  return description.replace(/(\r?\n|<br ?\/?>)/g, '\\n');
};
/**
 * Takes an event object and returns a Google Calendar Event URL
 * @param {string} event.description
 * @param {string} event.endDatetime
 * @param {string} event.location
 * @param {string} event.startDatetime
 * @param {string} event.title
 * @returns {string} Google Calendar Event URL
 */


exports.escapeICSDescription = escapeICSDescription;

var googleShareUrl = function googleShareUrl(_ref) {
  var description = _ref.description,
      endDatetime = _ref.endDatetime,
      location = _ref.location,
      startDatetime = _ref.startDatetime,
      timezone = _ref.timezone,
      title = _ref.title;
  return "https://calendar.google.com/calendar/render?action=TEMPLATE&dates=".concat(startDatetime, "/").concat(endDatetime).concat(timezone && "&ctz=".concat(timezone), "&location=").concat(location, "&text=").concat(title, "&details=").concat(description);
};
/**
 * Takes an event object and returns a Yahoo Calendar Event URL
 * @param {string} event.description
 * @param {string} event.duration
 * @param {string} event.location
 * @param {string} event.startDatetime
 * @param {string} event.title
 * @returns {string} Yahoo Calendar Event URL
 */


var yahooShareUrl = function yahooShareUrl(_ref2) {
  var description = _ref2.description,
      duration = _ref2.duration,
      location = _ref2.location,
      startDatetime = _ref2.startDatetime,
      title = _ref2.title;
  return "https://calendar.yahoo.com/?v=60&view=d&type=20&title=".concat(title, "&st=").concat(startDatetime, "&dur=").concat(duration, "&desc=").concat(description, "&in_loc=").concat(location);
};
/**
 * Takes an event object and returns an array to be downloaded as ics file
 * @param {string} event.description
 * @param {string} event.endDatetime
 * @param {string} event.location
 * @param {string} event.startDatetime
 * @param {string} event.title
 * @returns {array} ICS Content
 */


var buildShareFile = function buildShareFile(_ref3) {
  var _ref3$description = _ref3.description,
      description = _ref3$description === void 0 ? '' : _ref3$description,
      _ref3$ctz = _ref3.ctz,
      ctz = _ref3$ctz === void 0 ? '' : _ref3$ctz,
      endDatetime = _ref3.endDatetime,
      _ref3$location = _ref3.location,
      location = _ref3$location === void 0 ? '' : _ref3$location,
      startDatetime = _ref3.startDatetime,
      _ref3$timezone = _ref3.timezone,
      timezone = _ref3$timezone === void 0 ? '' : _ref3$timezone,
      _ref3$title = _ref3.title,
      title = _ref3$title === void 0 ? '' : _ref3$title;
  var VTIMEZONEEntries = getVtimezoneFromMomentZone({
    timezone: timezone,
    startDatetime: startDatetime,
    endDatetime: endDatetime
  });
  var content = ['BEGIN:VCALENDAR', 'VERSION:2.0'].concat(_toConsumableArray(VTIMEZONEEntries), ['BEGIN:VEVENT', "URL:".concat(document.URL), 'METHOD:PUBLISH', // TODO: Will need to parse the date without Z for ics
  // This means I'll probably have to require a date lib - luxon most likely or datefns
  timezone === '' ? "DTSTART:".concat(startDatetime) : "DTSTART;TZID=".concat(timezone, ":").concat(startDatetime), timezone === '' ? "DTEND:".concat(endDatetime) : "DTEND;TZID=".concat(timezone, ":").concat(endDatetime), "SUMMARY:".concat(title), "DESCRIPTION:".concat(escapeICSDescription(description)), "LOCATION:".concat(location), 'END:VEVENT', 'END:VCALENDAR']).join('\n');
  return isMobile() ? encodeURI("data:text/calendar;charset=utf8,".concat(content)) : content;
};
/**
 * Takes a timezone, start and end date and returns VTIMEZONE entries
 * corresponding to DST changes during and around the event. N.B. This
 * is suboptimal for long-spanning or recurring events. For those cases
 * recurrence rules should be applied.
 * @param {string} event.timezone
 * @param {string} event.startDatetime
 * @param {string} event.endDatetime
 */


var getVtimezoneFromMomentZone = function getVtimezoneFromMomentZone(_ref4) {
  var _ref4$timezone = _ref4.timezone,
      timezone = _ref4$timezone === void 0 ? "" : _ref4$timezone,
      startDatetime = _ref4.startDatetime,
      endDatetime = _ref4.endDatetime;
  if (timezone === "") return [];

  var zone = _momentTimezone.default.tz.zone(timezone);

  var header = "BEGIN:VTIMEZONE\nTZID:".concat(timezone);
  var footer = "END:VTIMEZONE"; // Find the timestamp for DST changes immediately before
  // and after the event.

  var prevDSTSwitch = zone.untils.findIndex(function (u) {
    return u > (0, _momentTimezone.default)(startDatetime).unix() * 1000;
  }) - 1;
  var lastDSTSwitch = zone.untils.findIndex(function (u) {
    return u > (0, _momentTimezone.default)(endDatetime).unix() * 1000;
  });
  var zTZitems = []; // Generate VTIMEZONE entries
  // FIXME: Handle case when lastDSTSwitch does not exist, or is the last entry

  for (var i = prevDSTSwitch; i < lastDSTSwitch + 1; i++) {
    // Determine which mode is ENDING. Even entries are DST, odd entries are standard.
    var type = i % 2 ? "STANDARD" : "DAYLIGHT";

    var momDtStart = _momentTimezone.default.tz(zone.untils[i - 1], timezone);

    var momNext = _momentTimezone.default.tz(zone.untils[i], timezone);

    zTZitems.push("BEGIN:".concat(type, "\nDTSTART:").concat(momDtStart.format("YYYYMMDDTHHmmss"), "\nTZOFFSETFROM:").concat(momDtStart.format("ZZ"), "\nTZOFFSETTO:").concat(momNext.format("ZZ"), "\nTZNAME:").concat(zone.abbrs[i], "\nEND:").concat(type));
  }

  return [header].concat(zTZitems, [footer]);
};
/**
 * Takes an event object and a type of URL and returns either a calendar event
 * URL or the contents of an ics file.
 * @param {string} event.description
 * @param {string} event.duration
 * @param {string} event.endDatetime
 * @param {string} event.location
 * @param {string} event.startDatetime
 * @param {string} event.title
 * @param {enum} type One of SHARE_SITES from ./enums
 */


var buildShareUrl = function buildShareUrl(_ref5, type) {
  var _ref5$description = _ref5.description,
      description = _ref5$description === void 0 ? '' : _ref5$description,
      duration = _ref5.duration,
      endDatetime = _ref5.endDatetime,
      _ref5$location = _ref5.location,
      location = _ref5$location === void 0 ? '' : _ref5$location,
      startDatetime = _ref5.startDatetime,
      _ref5$timezone = _ref5.timezone,
      timezone = _ref5$timezone === void 0 ? '' : _ref5$timezone,
      _ref5$title = _ref5.title,
      title = _ref5$title === void 0 ? '' : _ref5$title;
  var encodeURI = type !== _enums.SHARE_SITES.ICAL && type !== _enums.SHARE_SITES.OUTLOOK;
  var data = {
    description: encodeURI ? encodeURIComponent(description) : description,
    duration: formatDuration(duration),
    endDatetime: formatDate(endDatetime),
    location: encodeURI ? encodeURIComponent(location) : location,
    startDatetime: formatDate(startDatetime),
    timezone: timezone,
    title: encodeURI ? encodeURIComponent(title) : title
  };

  switch (type) {
    case _enums.SHARE_SITES.GOOGLE:
      return googleShareUrl(data);

    case _enums.SHARE_SITES.YAHOO:
      return yahooShareUrl(data);

    default:
      return buildShareFile(data);
  }
};

exports.buildShareUrl = buildShareUrl;