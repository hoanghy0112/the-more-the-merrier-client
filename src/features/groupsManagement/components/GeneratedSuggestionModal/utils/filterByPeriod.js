/* eslint-disable implicit-arrow-linebreak */
import moment from 'moment';

export default function filterByPeriod(timeList, howLong) {
  const filteredTime = [...timeList];

  if (howLong === 'từ 1-2 giờ') {
    return filteredTime.filter(
      ({ from, to }) => moment(to).diff(new Date(from), 'hour', true) > 1,
    );
  }
  if (howLong === 'từ 2-4 giờ') {
    return filteredTime.filter(
      ({ from, to }) => moment(to).diff(new Date(from), 'hour', true) > 2,
    );
  }
  if (howLong === 'khoảng một buổi') {
    return filteredTime.filter(
      ({ from, to }) => moment(to).diff(new Date(from), 'hour', true) > 4,
    );
  }
  if (howLong === 'cả ngày') {
    return filteredTime.filter(
      ({ from, to }) => moment(to).diff(new Date(from), 'hour', true) > 12,
    );
  }

  filteredTime.sort(
    (a, b) => new Date(a.from).getTime() - new Date(b.from).getTime(),
  );

  return filteredTime;
}
