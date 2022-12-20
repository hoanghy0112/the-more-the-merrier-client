export const weekLabels = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export function getMonthLabels(month, year) {
  let monthDay = 0;

  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      monthDay = 31;
      break;

    case 2:
      if ((year % 100 !== 0 && year % 4 === 0) || year % 400 === 0) {
        monthDay = 29;
      } else monthDay = 28;
      break;

    default:
      monthDay = 30;
  }
  return Array(monthDay)
    .fill('')
    .map((_, index) => index + 1);
}

export const yearLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const VIEW_TYPE = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

export function getDayOfMonth(month, year) {
  let monthDay = 0;

  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      monthDay = 31;
      break;

    case 2:
      if ((year % 100 !== 0 && year % 4 === 0) || year % 400 === 0) {
        monthDay = 29;
      } else monthDay = 28;
      break;

    default:
      monthDay = 30;
  }

  return monthDay;
}
