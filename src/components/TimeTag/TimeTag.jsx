/* eslint-disable no-shadow */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styles from './TimeTag.module.scss';

import useComponentVisible from '../../hooks/useComponentVisible';

export default function TimeTag({ time, onChange, disabled = false }) {
  // const [value, setValue] = useState(new Date(time));
  const [hour, setHour] = useState(new Date(time).getHours());
  const [minute, setMinute] = useState(new Date(time).getMinutes());
  const [period, setPeriod] = useState(
    new Date(time).getHours() < 12 ? 'AM' : 'PM',
  );

  const [isEdit, setIsEdit] = useState(false);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  function handleChangeHour(e) {
    const hourString = e.target.value;
    const hourNumber = parseInt(hourString, 10);
    if (hourNumber < 24) {
      setHour(hourNumber);
      if (hourNumber >= 12) setPeriod('PM');
      else setPeriod('AM');
    }
  }

  function handleChangeMinute(e) {
    const minuteString = e.target.value;
    const minuteNumber = parseInt(minuteString, 10);
    if (minuteNumber < 60) {
      setMinute(minuteNumber);
    }
  }

  function handleChangePeriod(newPeriod) {
    setPeriod(newPeriod);
    if (newPeriod === 'AM' && hour >= 12) {
      setHour(hour - 12);
    } else if (newPeriod === 'PM' && hour < 12) {
      setHour(hour + 12);
    }
  }

  useEffect(() => {
    const newDate = new Date(time);
    newDate.setHours(parseInt(hour, 10));
    newDate.setMinutes(parseInt(minute, 10));
    // onChange(newDate);
  }, [hour, minute, period]);

  useEffect(() => {
    if (!isComponentVisible) setIsEdit(false);
  }, [isComponentVisible]);

  useEffect(() => {
    if (isEdit) setIsComponentVisible(true);
  }, [isEdit]);

  return (
    <div
      ref={ref}
      className={[styles.container, isEdit ? styles.selected : null].join(' ')}
    >
      <div className={styles.time} onClick={() => setIsEdit(true)}>
        <div className={styles.hourMinute}>
          <input
            type="text"
            value={String(hour).padStart(2, '0')}
            onChange={handleChangeHour}
            onFocus={(e) => e.target.select()}
            disabled={disabled}
          />
          <p>h</p>
          <input
            type="text"
            value={String(minute).padStart(2, '0')}
            onChange={handleChangeMinute}
            onFocus={(e) => e.target.select()}
            disabled={disabled}
          />
        </div>
        <div className={styles.apm}>
          {period === 'AM' ? (
            <>
              <p className={styles.choose}>AM</p>
              <p onClick={() => disabled || handleChangePeriod('PM')}>PM</p>
            </>
          ) : (
            <>
              <p onClick={() => disabled || handleChangePeriod('AM')}>AM</p>
              <p className={styles.choose}>PM</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

TimeTag.propTypes = {
  time: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

TimeTag.defaultProps = {
  disabled: false,
};
