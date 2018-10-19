"use strict";

var _moment = _interopRequireDefault(require("moment"));

var _enums = require("./enums");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testEvent = {
  description: 'Description of event. Going to have a lot of fun doing things that we scheduled ahead of time.',
  duration: '0200',
  endDatetime: '20150126T020000+00:00',
  location: 'NYC',
  startDatetime: '20150126T000000+00:00',
  title: 'Super Fun Event'
};
describe('formatDate', function () {
  it('replaces +00:00 from a date string with Z', function () {
    expect((0, _utils.formatDate)('20180603T172721+00:00')).toEqual('20180603T172721Z');
  });
});
describe('buildShareUrl', function () {
  it('returns a proper Google share URL', function () {
    var result = (0, _utils.buildShareUrl)(testEvent, _enums.SHARE_SITES.GOOGLE);
    expect(result).toEqual('https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20150126T000000Z/20150126T020000Z&location=NYC&text=Super%20Fun%20Event&details=Description%20of%20event.%20Going%20to%20have%20a%20lot%20of%20fun%20doing%20things%20that%20we%20scheduled%20ahead%20of%20time.');
  });
  it('returns a proper Yahoo share URL', function () {
    var result = (0, _utils.buildShareUrl)(testEvent, _enums.SHARE_SITES.YAHOO);
    expect(result).toEqual('https://calendar.yahoo.com/?v=60&view=d&type=20&title=Super%20Fun%20Event&st=20150126T000000Z&dur=0200&desc=Description%20of%20event.%20Going%20to%20have%20a%20lot%20of%20fun%20doing%20things%20that%20we%20scheduled%20ahead%20of%20time.&in_loc=NYC');
  });
  it('returns a proper iCal content object', function () {
    var result = (0, _utils.buildShareUrl)(testEvent, _enums.SHARE_SITES.ICAL);
    expect(result).toEqual('BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nURL:about:blank\nMETHOD:PUBLISH\nDTSTART:20150126T000000Z\nDTEND:20150126T020000Z\nSUMMARY:Super Fun Event\nDESCRIPTION:Description of event. Going to have a lot of fun doing things that we scheduled ahead of time.\nLOCATION:NYC\nEND:VEVENT\nEND:VCALENDAR');
  });
  it('prepends a data URL when userAgent is mobile', function () {
    navigator.__defineGetter__('userAgent', function () {
      return "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1";
    });

    var result = (0, _utils.buildShareUrl)(testEvent, _enums.SHARE_SITES.ICAL);
    expect(result).toEqual(encodeURI('data:text/calendar;charset=utf8,BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nURL:about:blank\nMETHOD:PUBLISH\nDTSTART:20150126T000000Z\nDTEND:20150126T020000Z\nSUMMARY:Super Fun Event\nDESCRIPTION:Description of event. Going to have a lot of fun doing things that we scheduled ahead of time.\nLOCATION:NYC\nEND:VEVENT\nEND:VCALENDAR'));
  });
});