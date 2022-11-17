/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable prefer-const */
import React from 'react';

import moment from 'moment';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import styles from './GeneratedSuggestionModal.module.scss';
import { selectGroupBusyTime } from '../../groupSlice';
import TimeTag from '../../../../components/TimeTag/TimeTag';

function filterByPeriod(startDate, busyTime, howLong) {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + ((7 - endDate.getDay()) % 7 || 7));
  endDate.setHours(23);
  endDate.setMinutes(59);
  endDate.setSeconds(59);

  let filteredTime = [
    {
      from: startDate,
      to: endDate,
    },
  ];

  let busyTimeList = [...busyTime];

  busyTimeList.sort(
    (a, b) => new Date(a.from).getTime() - new Date(b.from).getTime(),
  );

  busyTimeList.forEach(({ from, to }) => {
    const lastTime = filteredTime.slice(-1)[0];
    if (
      new Date(from) < new Date(lastTime.to) &&
      new Date(from) > new Date(lastTime.from) &&
      new Date(to) < new Date(lastTime.to) &&
      new Date(to) > new Date(lastTime.from)
    ) {
      const firstPiece = { from: lastTime.from, to: from };
      const secondPiece = { from: to, to: lastTime.to };
      filteredTime.pop();
      filteredTime.push(firstPiece, secondPiece);
    } else if (
      new Date(to) < new Date(lastTime.to) &&
      new Date(to) > new Date(lastTime.from)
    ) {
      const newPiece = { from: to, to: lastTime.to };
      filteredTime.pop();
      filteredTime.push(newPiece);
    }
  });

  let i = filteredTime.length - 1;
  while (i >= 0) {
    const { from: from_, to: to_ } = filteredTime[i];
    const from = new Date(from_);
    const to = new Date(to_);
    if (from.getDay() !== to.getDay()) {
      filteredTime.splice(i, 1);
      const middle = new Date(from);
      middle.setHours(23, 59, 59);
      filteredTime.push({
        from,
        to: middle,
      });
      const otherMiddle = new Date(from);
      otherMiddle.setDate(otherMiddle.getDate() + 1);
      otherMiddle.setHours(0, 0, 1);
      filteredTime.unshift({
        from: otherMiddle,
        to,
      });
      i += 1;
    }
    i -= 1;
  }

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
      ({ from, to }) =>
        ((from.getHours() > 6 && from.getHours < 8) ||
          (from.getHours() > 13 && from.getHours < 15) ||
          (from.getHours() > 17 && from.getHours < 20)) &&
        moment(to).diff(new Date(from), 'hour', true) > 4,
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

export default function GeneratedSuggestionModal({
  startDate,
  options: { howLong, timeOfDay, isWeekend },
}) {
  const busyTime = useSelector(selectGroupBusyTime);

  const filterdBusyTimeByPeriod = filterByPeriod(startDate, busyTime, howLong);
  console.log({ filterdBusyTimeByPeriod });

  return (
    <div className={styles.container}>
      <p className={styles.header}>There is some suggestion for you</p>
      <div className={styles.suggestionBox}>
        {filterdBusyTimeByPeriod.map(({ from, to }) => (
          <div className={styles.suggestion}>
            <p className={styles.day}>
              {new Date(from).getDay() === 0
                ? 'Chủ nhật'
                : `Thứ ${new Date(from).getDay() + 1}`}
            </p>
            <p className={styles.time}>
              {`Từ ${new Date(from).getHours()}h đến ${new Date(
                to,
              ).getHours()}h`}
            </p>
            {/* <div className={styles.time}>
              <TimeTag time={new Date(from)} />
              <TimeTag time={new Date(to)} />
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

GeneratedSuggestionModal.propTypes = {
  options: PropTypes.shape({
    howLong: PropTypes.string,
    timeOfDay: PropTypes.string,
    isWeekend: PropTypes.string,
  }),
  startDate: PropTypes.instanceOf(Date),
};

GeneratedSuggestionModal.defaultProps = {
  options: {
    howLong: 'ít hơn 1 giờ',
    timeOfDay: 'Buổi sáng',
    isWeekend: 'Cuối tuần',
  },
  startDate: new Date(),
};
