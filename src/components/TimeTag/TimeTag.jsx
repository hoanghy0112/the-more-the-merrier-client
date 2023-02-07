/* eslint-disable no-shadow */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styles from './TimeTag.module.scss';

import useComponentVisible from '../../hooks/useComponentVisible';

export default function TimeTag({ time, onChange, disabled = false }) {
  // const [value, setValue] = useState(new Date(time));
  const [hour, setHour] = useState(
    String(new Date(time).getHours()).padStart(2, '0'),
  );
  const [minute, setMinute] = useState(
    String(new Date(time).getMinutes()).padStart(2, '0'),
  );
  const [period, setPeriod] = useState(
    new Date(time).getHours() < 12 ? 'AM' : 'PM',
  );

  const [isEdit, setIsEdit] = useState(false);
  const { ref, refCallback, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  function handleChangeHour(e) {
    const hourString = e.target.value;
    const hourNumber = parseInt(hourString, 10);
    if (hourNumber < 12) {
      setHour(String(hourNumber).padStart(2, '0'));
    }
  }

  function handleChangeMinute(e) {
    const minuteString = e.target.value;
    const minuteNumber = parseInt(minuteString, 10);
    if (minuteNumber < 60) {
      setMinute(String(minuteNumber).padStart(2, '0'));
    }
  }

  useEffect(() => {
    const newDate = new Date(time);
    newDate.setHours(parseInt(hour, 10) + (period === 'AM' ? 0 : 12));
    newDate.setMinutes(parseInt(minute, 10));
    onChange(newDate);
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
            value={hour}
            onChange={handleChangeHour}
            onFocus={(e) => e.target.select()}
          />
          <p>h</p>
          <input
            type="text"
            value={minute}
            onChange={handleChangeMinute}
            onFocus={(e) => e.target.select()}
          />
        </div>
        <div className={styles.apm}>
          {period === 'AM' ? (
            <>
              <p className={styles.choose}>AM</p>
              <p onClick={() => setPeriod('PM')}>PM</p>
            </>
          ) : (
            <>
              <p onClick={() => setPeriod('AM')}>AM</p>
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
