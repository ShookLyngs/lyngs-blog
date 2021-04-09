import dayjs from 'dayjs';

// relative time
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

// calendar
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(calendar);

// locale
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

// export
export { dayjs };

export function localeDateTime(targetTime) {
  const target = dayjs(targetTime);
  const now = dayjs();
  const hours = now.diff(target, 'h');
  const days = now.diff(target, 'd');
  const years = now.diff(target, 'y');

  if (hours <= 6) {
    return target.fromNow();
  } else if (days < 2) {
    return target.calendar(now, {
      sameDay: '[今天] HH:mm',
      nextDay: '[明天] HH:mm',
      lastDay: '[昨天] HH:mm',
      sameElse: 'YYYY年 M月DD日',
    });
  } else if (years < 1) {
    return target.format('M月D日 HH:mm');
  } else {
    return target.format('YYYY年 M月D日 HH:mm');
  }
}