import moment from 'moment';
import { SHARE_SITES } from './enums';
import { buildShareUrl, formatDate } from './utils';

const testEvent = {
  description: 'Description of event. Going to have a lot of fun doing things that we scheduled ahead of time.',
  duration: '2',
  endDatetime: '20150126T020000+00:00',
  location: 'NYC',
  startDatetime: '20150126T000000+00:00',
  title: 'Super Fun Event',
}

describe('formatDate', () => {
  it('replaces +00:00 from a date string with Z', () => {
    expect(formatDate('20180603T172721+00:00')).toEqual('20180603T172721Z');
  });
});

describe('buildShareUrl', () => {
  it('returns a proper Google share URL', () => {
    const result = buildShareUrl(testEvent, SHARE_SITES.GOOGLE);
    expect(result).toEqual('https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20150126T000000Z/20150126T020000Z&location=NYC&text=Super%20Fun%20Event&details=Description%20of%20event.%20Going%20to%20have%20a%20lot%20of%20fun%20doing%20things%20that%20we%20scheduled%20ahead%20of%20time.');
  });

  it('returns a proper Yahoo share URL', () => {
    const result = buildShareUrl(testEvent, SHARE_SITES.YAHOO);
    expect(result).toEqual('https://calendar.yahoo.com/v=60&view=d&type=20&title=Super%20Fun%20Event&st=20150126T000000Z&dur=2&desc=Description%20of%20event.%20Going%20to%20have%20a%20lot%20of%20fun%20doing%20things%20that%20we%20scheduled%20ahead%20of%20time.&in_loc=NYC');
  });

  it('returns a proper Outlook Web share URL', () => {
    const result = buildShareUrl(testEvent, SHARE_SITES.OUTLOOK_WEB);
    expect(result).toEqual('https://outlook.live.com/owa/?rru=addevent&startdt=20150126T000000Z&enddt=20150126T020000Z&subject=Super%20Fun%20Event&location=NYC&body=Description%20of%20event.%20Going%20to%20have%20a%20lot%20of%20fun%20doing%20things%20that%20we%20scheduled%20ahead%20of%20time.&allday=false&uid=123&path=/calendar/view/Month');
  });

  it('returns a proper iCal content object', () => {
    const result = buildShareUrl(testEvent, SHARE_SITES.ICAL);
    expect(result).toEqual('BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nURL:about:blank\nDTSTART:20150126T000000+00:00\nDTEND:20150126T020000+00:00\nSUMMARY:Super Fun Event\nDESCRIPTION:Description of event. Going to have a lot of fun doing things that we scheduled ahead of time.\nLOCATION:NYC\nEND:VEVENT\nEND:VCALENDAR');
  })
});