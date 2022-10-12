/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';

import PropTypes from 'prop-types';

import { ICON_CALENDAR } from '../../assets/icons';

import styles from './DateTimePicker.module.scss';

import 'react-day-picker/dist/style.css';

export default function DateTimePicker({ startDay, hanldeChangeStartDay }) {
  const [isOpenDateTimePicker, setIsOpenDateTimePicker] = useState(false);
  const [selected, setSelected] = useState(startDay);
  const selectedDay = startDay;

  useEffect(() => {
    if (!selected) hanldeChangeStartDay(new Date());
    else hanldeChangeStartDay(selected);
  }, [selected]);

  return (
    <div>
      <div className={styles['date-time-picker-container']}>
        <div className={styles['selected-month']}>
          {format(selectedDay, 'LLLL')}
        </div>
        <div
          onClick={() => setIsOpenDateTimePicker(!isOpenDateTimePicker)}
          className={styles['date-time-picker-logo']}
        >
          <img src={ICON_CALENDAR} alt="Calendar" />
        </div>
      </div>
      {isOpenDateTimePicker && (
        <div className={styles['date-time-picker']}>
          <DayPicker mode="single" selected={selected} onSelect={setSelected} />
        </div>
      )}
    </div>
  );
}

DateTimePicker.propTypes = {
  startDay: PropTypes.instanceOf(Date).isRequired,
  hanldeChangeStartDay: PropTypes.func.isRequired,
};
