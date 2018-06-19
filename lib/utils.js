"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildShareUrl = exports.isMobile = exports.formatDate = void 0;

var _enums = require("./enums");

/**
 * Converts Date String with UTC timezone to date consumable by calendar
 * apps. Changes +00:00 to Z.
 * @param {string} Date in YYYYMMDDTHHmmssZ format
 * @returns {string} Date with +00:00 replaceed with Z
 */
var formatDate = function formatDate(date) {
  return date && date.replace('+00:00', 'Z');
};
/**
 * Tests provided UserAgent against Known Mobile User Agents
 * @param {string} userAgent
 * @returns {bool} isMobileDevice
 */


exports.formatDate = formatDate;

var isMobile = function isMobile() {
  return /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(window.navigator.userAgent || window.navigator.vendor || window.opera);
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


exports.isMobile = isMobile;

var googleShareUrl = function googleShareUrl(_ref) {
  var description = _ref.description,
      endDatetime = _ref.endDatetime,
      location = _ref.location,
      startDatetime = _ref.startDatetime,
      title = _ref.title;
  return "https://calendar.google.com/calendar/render?action=TEMPLATE&dates=".concat(startDatetime, "/").concat(endDatetime, "&location=").concat(location, "&text=").concat(title, "&details=").concat(description);
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
  var description = _ref3.description,
      endDatetime = _ref3.endDatetime,
      location = _ref3.location,
      startDatetime = _ref3.startDatetime,
      title = _ref3.title;
  var content = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT', "URL:".concat(document.URL), "DTSTART:".concat(startDatetime), "DTEND:".concat(endDatetime), "SUMMARY:".concat(title), "DESCRIPTION:".concat(description), "LOCATION:".concat(location), 'END:VEVENT', 'END:VCALENDAR'].join('\n');
  return isMobile() ? encodeURI("data:text/calendar;charset=utf8,".concat(content)) : content;
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


var buildShareUrl = function buildShareUrl(_ref4, type) {
  var description = _ref4.description,
      duration = _ref4.duration,
      endDatetime = _ref4.endDatetime,
      location = _ref4.location,
      startDatetime = _ref4.startDatetime,
      title = _ref4.title;
  var encodeURI = type !== _enums.SHARE_SITES.ICAL;
  var data = {
    description: encodeURI ? encodeURIComponent(description) : description,
    duration: duration,
    endDatetime: formatDate(endDatetime),
    location: encodeURI ? encodeURIComponent(location) : location,
    startDatetime: formatDate(startDatetime),
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