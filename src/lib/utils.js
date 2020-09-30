import moment from 'moment-timezone';
import {
  SHARE_SITES
} from './enums';


/**
 * Converts Date String with UTC timezone to date consumable by calendar
 * apps. Changes +00:00 to Z.
 * @param {string} Date in YYYYMMDDTHHmmssZ format
 * @returns {string} Date with +00:00 replaceed with Z
 */
export const formatDate = date => date && date.replace('+00:00', 'Z');

export const formatDuration = duration => {
  if (typeof duration === 'string') return duration;
  const parts = duration.toString().split('.');
  if (parts.length < 2) {
    parts.push('00');
  }

  return parts.map(part => part.length === 2 ? part : `0${part}`).join('');
};

/**
 * Tests provided UserAgent against Known Mobile User Agents
 * @returns {bool} isMobileDevice
 */
export const isMobile = () => /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(window.navigator.userAgent || window.navigator.vendor || window.opera);

/**
 * Tests userAgent to see if browser is IE
 * @returns {bool} isInternetExplorer
 */
export const isInternetExplorer = () => /MSIE/.test(window.navigator.userAgent) || /Trident/.test(window.navigator.userAgent);

export const escapeICSDescription = description => description.replace(/(\r?\n|<br ?\/?>)/g, '\\n');

/**
 * Takes an event object and returns a Google Calendar Event URL
 * @param {string} event.description
 * @param {string} event.endDatetime
 * @param {string} event.location
 * @param {string} event.startDatetime
 * @param {string} event.title
 * @returns {string} Google Calendar Event URL
 */
const googleShareUrl = ({
    description,
    endDatetime,
    location,
    startDatetime,
    timezone,
    title,
  }) =>
  `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${
    startDatetime
  }/${endDatetime}${timezone && `&ctz=${timezone}`}&location=${location}&text=${title}&details=${description}`;

/**
 * Takes an event object and returns a Yahoo Calendar Event URL
 * @param {string} event.description
 * @param {string} event.duration
 * @param {string} event.location
 * @param {string} event.startDatetime
 * @param {string} event.title
 * @returns {string} Yahoo Calendar Event URL
 */
const yahooShareUrl = ({
    description,
    duration,
    location,
    startDatetime,
    title,
  }) =>
  `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${title}&st=${
    startDatetime
  }&dur=${duration}&desc=${description}&in_loc=${location}`;

/**
 * Takes an event object and returns an array to be downloaded as ics file
 * @param {string} event.description
 * @param {string} event.endDatetime
 * @param {string} event.location
 * @param {string} event.startDatetime
 * @param {string} event.title
 * @returns {array} ICS Content
 */
const buildShareFile = ({
  description = '',
  ctz = '',
  endDatetime,
  location = '',
  startDatetime,
  timezone = '',
  title = '',
}) => {
  let VTIMEZONEEntries = getVtimezoneFromMomentZone(timezone)

  let content = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    ...VTIMEZONEEntries,
    'BEGIN:VEVENT',
    `URL:${document.URL}`,
    'METHOD:PUBLISH',
    // TODO: Will need to parse the date without Z for ics
    // This means I'll probably have to require a date lib - luxon most likely or datefns
    timezone === '' ? `DTSTART:${startDatetime}` : `DTSTART;TZID=${timezone}:${startDatetime}`,
    timezone === '' ? `DTEND:${endDatetime}` : `DTEND;TZID=${timezone}:${endDatetime}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${escapeICSDescription(description)}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\n');

  return isMobile() ? encodeURI(`data:text/calendar;charset=utf8,${content}`) : content;
}

/**
 * Takes a timezone and returns VTIMEZONE entries
 * @param {string} tzName
 * @param {number} MAX_OCCURENCES
 */
const getVtimezoneFromMomentZone = (tzName = '', MAX_OCCURENCES = 2) => {
  if (tzName === '') return [];

  const zone = moment.tz.zone(tzName);
  const header = `BEGIN:VTIMEZONE\nTZID:${tzName}`;
  const footer = 'END:VTIMEZONE';

  const nMaxLoops = Math.min(MAX_OCCURENCES, zone.untils.length - 1);

  const zTZitems = zone.untils.slice(0, nMaxLoops).map((until, i) => {
    const type = i % 2 === 0 ? 'STANDARD' : 'DAYLIGHT';
    const momDtStart = moment.tz(until, tzName);
    const momNext = moment.tz(zone.untils[i + 1], tzName);
    return `BEGIN:${type}
DTSTART:${momDtStart.format('YYYYMMDDTHHmmss')}
TZOFFSETFROM:${momDtStart.format('ZZ')}
TZOFFSETTO:${momNext.format('ZZ')}
TZNAME:${zone.abbrs[i]}
END:${type}`;
  });

  return [header, ...zTZitems, footer];
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
export const buildShareUrl = ({
    description = '',
    duration,
    endDatetime,
    location = '',
    startDatetime,
    timezone = '',
    title = ''
  },
  type,
) => {
  const encodeURI = type !== SHARE_SITES.ICAL && type !== SHARE_SITES.OUTLOOK;

  const data = {
    description: encodeURI ? encodeURIComponent(description) : description,
    duration: formatDuration(duration),
    endDatetime: formatDate(endDatetime),
    location: encodeURI ? encodeURIComponent(location) : location,
    startDatetime: formatDate(startDatetime),
    timezone,
    title: encodeURI ? encodeURIComponent(title) : title,
  };

  switch (type) {
    case SHARE_SITES.GOOGLE:
      return googleShareUrl(data);
    case SHARE_SITES.YAHOO:
      return yahooShareUrl(data);
    default:
      return buildShareFile(data);
  }
};