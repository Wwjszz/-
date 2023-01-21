export interface TimeInterval {
  interval: string;
  year: number;
  month: number;
  date: number;
  hour: number;
  min: number;
  sec: number;
}

function toTwoDigit(params: string | number) {
  return params < 10 ? `0${params}` : params;
}

export function getDifference(Time: TimeInterval, curDate: Date = new Date()) {
  if (Time.year !== curDate.getFullYear()) {
    Time.interval = `${curDate.getFullYear() - Time.year}年前`;
    return;
  }

  if (Time.month !== curDate.getMonth() + 1) {
    Time.interval = `${curDate.getMonth() + 1 - Time.month}月前`;
    return;
  }

  if (Time.date !== curDate.getDate()) {
    Time.interval = `${curDate.getDate() - Time.date}天前`;
    return;
  }

  if (Time.hour !== curDate.getHours()) {
    Time.interval = `${curDate.getHours() - Time.hour}小时前`;
    return;
  }

  if (Time.min !== curDate.getMinutes()) {
    Time.interval = `${curDate.getMinutes() - Time.min}分钟前`;
    return;
  }

  if (Time.sec !== curDate.getSeconds()) {
    Time.interval = `${curDate.getSeconds() - Time.sec}秒前`;
    return;
  }

  Time.interval = '时间错误';
}

export function parseTimeString(Time: string): TimeInterval {
  const inter: TimeInterval = {
    interval: '',
    year: +Time.substring(0, 4),
    month: +Time.substring(5, 7),
    date: +Time.substring(8, 10),
    hour: +Time.substring(11, 13),
    min: +Time.substring(14, 16),
    sec: +Time.substring(17, 19),
  };
  return inter;
}

export function getTimeString(date: Date = new Date()) {
  const month: string | number = toTwoDigit(date.getMonth() + 1);
  const strDate: string | number = toTwoDigit(date.getDate());
  const strHour: string | number = toTwoDigit(date.getHours());
  const strMin: string | number = toTwoDigit(date.getMinutes());
  const strSec: string | number = toTwoDigit(date.getSeconds());

  return `${date.getFullYear()}-${month}-${strDate} ${strHour}:${strMin}:${strSec}`;
}

export function getDifferenceAfter(
  Time: TimeInterval,
  curDate: Date = new Date()
) {
  if (Time.year !== curDate.getFullYear()) {
    if (Time.year > curDate.getFullYear())
      Time.interval = `${Time.year - curDate.getFullYear()}年后`;
    else Time.interval = '已过期';
    return;
  }

  if (Time.month !== curDate.getMonth() + 1) {
    if (Time.month > curDate.getMonth() + 1)
      Time.interval = `${Time.month - (curDate.getMonth() + 1)}月后`;
    else Time.interval = '已过期';
    return;
  }

  if (Time.date !== curDate.getDate()) {
    if (Time.date > curDate.getDate())
      Time.interval = `${Time.date - curDate.getDate()}天后`;
    else Time.interval = '已过期';
    return;
  }

  if (Time.hour !== curDate.getHours()) {
    if (Time.hour > curDate.getHours())
      Time.interval = `${Time.hour - curDate.getHours()}小时后`;
    else Time.interval = '已过期';
    return;
  }

  if (Time.min !== curDate.getMinutes()) {
    if (Time.min > curDate.getMinutes())
      Time.interval = `${Time.min - curDate.getMinutes()}分钟后`;
    else Time.interval = '已过期';
    return;
  }

  if (Time.sec !== curDate.getSeconds()) {
    if (Time.sec > curDate.getSeconds())
      Time.interval = `${Time.sec - curDate.getSeconds()}秒后`;
    else Time.interval = '已过期';
  }
}
