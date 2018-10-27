import moment from 'moment';
import { SHARE_SITES } from './enums';
import { buildShareUrl, formatDate, formatDuration, isInternetExplorer, isMobile } from './utils';

const testEvent = {
  description: 'Description of event. Going to have a lot of fun doing things that we scheduled ahead of time.',
  duration: '0200',
  endDatetime: '20150126T020000+00:00',
  location: 'NYC',
  startDatetime: '20150126T000000+00:00',
  title: 'Super Fun Event',
}

const expectedOutputs = {
  google: 'https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20150126T000000Z/20150126T020000Z&location=NYC&text=Super%20Fun%20Event&details=Description%20of%20event.%20Going%20to%20have%20a%20lot%20of%20fun%20doing%20things%20that%20we%20scheduled%20ahead%20of%20time.',
  yahoo: 'https://calendar.yahoo.com/?v=60&view=d&type=20&title=Super%20Fun%20Event&st=20150126T000000Z&dur=0200&desc=Description%20of%20event.%20Going%20to%20have%20a%20lot%20of%20fun%20doing%20things%20that%20we%20scheduled%20ahead%20of%20time.&in_loc=NYC',
  ics: 'BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nURL:about:blank\nMETHOD:PUBLISH\nDTSTART:20150126T000000Z\nDTEND:20150126T020000Z\nSUMMARY:Super Fun Event\nDESCRIPTION:Description of event. Going to have a lot of fun doing things that we scheduled ahead of time.\nLOCATION:NYC\nEND:VEVENT\nEND:VCALENDAR',
  icsMobile: 'data:text/calendar;charset=utf8,BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nURL:about:blank\nMETHOD:PUBLISH\nDTSTART:20150126T000000Z\nDTEND:20150126T020000Z\nSUMMARY:Super Fun Event\nDESCRIPTION:Description of event. Going to have a lot of fun doing things that we scheduled ahead of time.\nLOCATION:NYC\nEND:VEVENT\nEND:VCALENDAR',
}

describe('formatDate', () => {
  it('replaces +00:00 from a date string with Z', () => {
    expect(formatDate('20180603T172721+00:00')).toEqual('20180603T172721Z');
  });
});

describe('formatDuration', () => {
  it ('converts number 2 to string 0200', () => {
    expect(formatDuration(2)).toEqual('0200');
  });

  it('converts number 2.25 to 0225', () => {
    expect(formatDuration(2.25)).toEqual('0225');
  });

  it('returns string 0200 as it was received', () => {
    expect(formatDuration('0200')).toEqual('0200');
  });
});

describe('buildShareUrl', () => {
  describe('Google', () => {
    it('returns a proper Google share URL', () => {
      const result = buildShareUrl(testEvent, SHARE_SITES.GOOGLE);
      expect(result).toEqual(expectedOutputs.google);
    });
  });

  describe('Yahoo', () => {
    it('returns a proper Yahoo share URL', () => {
      const result = buildShareUrl(testEvent, SHARE_SITES.YAHOO);
      expect(result).toEqual(expectedOutputs.yahoo)
    });

    it('returns a proper Yahoo share URL when duration is a number', () => {
      const result = buildShareUrl({...testEvent, duration: 2}, SHARE_SITES.YAHOO);
      expect(result).toEqual(expectedOutputs.yahoo);
    });
  });


  describe('iCal', () => {
    it('returns a proper iCal content object', () => {
      const result = buildShareUrl(testEvent, SHARE_SITES.ICAL);
      expect(result).toEqual(expectedOutputs.ics);
    });

    it('prepends a data URL when userAgent is mobile', () => {
      navigator.__defineGetter__('userAgent', function(){
        return "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1";
      });

      const result = buildShareUrl(testEvent, SHARE_SITES.ICAL);
      expect(result).toEqual(encodeURI(expectedOutputs.icsMobile));
    });
  });
});

describe('isInternetExplorer', () => {
  it('returns true is userAgent is IE 11', () => {
    navigator.__defineGetter__('userAgent', function(){
      return "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko";
    });

    const result = isInternetExplorer();
    expect(result).toBe(true);
  });

  it('returns true is userAgent is IE 10', () => {
    navigator.__defineGetter__('userAgent', function(){
      return "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729)";
    });

    const result = isInternetExplorer();
    expect(result).toBe(true);
  });

  it('returns true is userAgent is IE 9', () => {
    navigator.__defineGetter__('userAgent', function(){
      return "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E)";
    });

    const result = isInternetExplorer();
    expect(result).toBe(true);
  });

  it('returns false is userAgent is MS Edge', () => {
    navigator.__defineGetter__('userAgent', function(){
      return "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36";
    });

    const result = isInternetExplorer();
    expect(result).toBe(false);
  });

  it('returns false is userAgent is not IE', () => {
    navigator.__defineGetter__('userAgent', function(){
      return "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36";
    });

    const result = isInternetExplorer();
    expect(result).toBe(false);
  });
})

describe('isMobile', () => {
  it('returns true if userAgent is iPhone', () => {
    navigator.__defineGetter__('userAgent', function(){
      return "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1";
    });

    const result = isMobile();
    expect(result).toBe(true);
  });

  it('returns true if userAgent is Android', () => {
    navigator.__defineGetter__('userAgent', function(){
      return "Mozilla/5.0 (Linux; Android 8.0.0; SM-G965F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36";
    });

    const result = isMobile();
    expect(result).toBe(true);
  });

  it('returns false if userAgent is desktop', () => {
    navigator.__defineGetter__('userAgent', function(){
      return "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36";
    });

    const result = isMobile();
    expect(result).toBe(false);
  })
});