/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable prefer-const */
import React from 'react';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import PrimaryButton from '../../../../components/PrimaryButton/PrimaryButton';
import {
  setSuggestionTime,
  setSuggestionVisible,
} from '../../../calendar/calendarSlice';
import { selectGroupBusyTime } from '../../groupSlice';
import styles from './GeneratedSuggestionModal.module.scss';
import filterTime from './utils';

export default function GeneratedSuggestionModal({
  startDate,
  options: { howLong, timeOfDay, isWeekend },
  onClose,
}) {
  const dispatch = useDispatch();
  const busyTime = useSelector(selectGroupBusyTime);

  // const filterdBusyTimeByPeriod = filterByPeriod(startDate, busyTime, howLong);
  const filterdBusyTimeByPeriod = filterTime(
    startDate,
    busyTime,
    howLong,
    timeOfDay,
    isWeekend,
  );

  dispatch(setSuggestionTime(filterdBusyTimeByPeriod));

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
          </div>
        ))}
      </div>
      <PrimaryButton
        onClick={() => {
          dispatch(setSuggestionVisible(true));
          onClose();
        }}
        title="View in calendar"
      />
    </div>
  );
}

GeneratedSuggestionModal.propTypes = {
  options: PropTypes.shape({
    howLong: PropTypes.string,
    timeOfDay: PropTypes.instanceOf(Map),
    isWeekend: PropTypes.string,
  }),
  startDate: PropTypes.instanceOf(Date),
  onClose: PropTypes.func,
};

GeneratedSuggestionModal.defaultProps = {
  options: {
    howLong: 'ít hơn 1 giờ',
    timeOfDay: 'Buổi sáng',
    isWeekend: 'Cuối tuần',
  },
  startDate: new Date(),
  onClose: () => {},
};
