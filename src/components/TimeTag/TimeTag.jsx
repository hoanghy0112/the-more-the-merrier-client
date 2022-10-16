/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './TimeTag.module.scss';

import TimePicker from '../TimePicker/TimePicker';

import { useState } from 'react';

export default function TimeTag({ time, onChange }) {
  const [isEdit, setIsEdit] = useState(false);

  const handleChangeTime = (time) => {
    onChange(time);
    setIsEdit(false);
  };

  return (
    <div className={styles.container}>
      <p className={styles.time} onClick={() => setIsEdit(!isEdit)}>
        {`${time.getHours()}h${time.getMinutes()} ${
          time || new Date().getHours() < 12 ? 'AM' : 'PM'
        }`}
      </p>
      <div className={styles.timePicker}>
        {isEdit === true && (
          <TimePicker time={time} handleChangeTime={handleChangeTime} />
        )}
      </div>
    </div>
  );
}

TimeTag.propTypes = {
  time: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};
