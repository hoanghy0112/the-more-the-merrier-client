/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DayPicker } from 'react-day-picker';

import PropTypes from 'prop-types';

import { ICON_CALENDAR_2 } from '../../assets/icons';

import styles from './DateTimePicker.module.scss';

import 'react-day-picker/dist/style.css';
import {
  selectPersonalDate,
  updatePersonalDate,
} from '../../features/tasksManagement/TasksSlice';
import { getTimeOfDate } from '../../utils/calendar.utils';
import { isValidDate } from '../../utils/date';

export default function DateTimePicker({ originalDate, disabled = false }) {
  const dispatch = useDispatch();
  const startDay = useSelector(selectPersonalDate);

  const [isOpenDateTimePicker, setIsOpenDateTimePicker] = useState(false);
  const [selected, setSelected] = useState(originalDate || startDay);

  useEffect(() => {
    if (!selected) hanldeChangeStartDay(new Date());
    else hanldeChangeStartDay(selected);
  }, [selected]);

  function hanldeChangeStartDay(date) {
    dispatch(updatePersonalDate(getTimeOfDate(date)));
  }

  function formatDay(date) {
    const month = new Date(date).getMonth() + 1;
    const weekday = new Date(date).getDay();
    const day = new Date(date).getDate();
    return `${
      weekday !== 0 ? `Thứ ${weekday + 1}` : 'Chủ nhật'
    }, Ngày ${day} Tháng ${month}`;
  }

  return (
    <div className={styles.container}>
      <div className={styles['date-time-picker-container']}>
        <div className={styles['selected-month']}>{formatDay(selected)}</div>
        <div
          onClick={() => setIsOpenDateTimePicker(!isOpenDateTimePicker)}
          className={styles['date-time-picker-logo']}
        >
          <img src={ICON_CALENDAR_2} alt="Calendar" />
        </div>
      </div>
      {isOpenDateTimePicker && !disabled && (
        <div className={styles['date-time-picker']}>
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) =>
              isValidDate(new Date(date)) && setSelected(date)
            }
          />
        </div>
      )}
    </div>
  );
}

DateTimePicker.propTypes = {
  disabled: PropTypes.bool,
};

DateTimePicker.defaultProps = {
  disabled: false,
};
