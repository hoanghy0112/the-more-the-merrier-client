/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TimeTag.module.scss';

import TimePicker from '../TimePicker/TimePicker';
import { isValidDate } from '../../utils/date';

export default function TimeTag({ time, onChange, disabled = false }) {
  const [isEdit, setIsEdit] = useState(false);

  const handleChangeTime = (newTime) => {
    if (!isValidDate(new Date(newTime))) return;
    onChange(new Date(newTime));
    setIsEdit(false);
  };

  return (
    <div className={styles.container}>
      <p className={styles.time} onClick={() => setIsEdit(!isEdit)}>
        {`${new Date(time).getHours()}h${String(
          new Date(time).getMinutes(),
        ).padStart(2, '0')} ${
          (new Date(time) || new Date().getHours()) - 7 < 12 ? 'AM' : 'PM'
        }`}
      </p>
      <div className={styles.timePicker}>
        {isEdit === true && !disabled && (
          <TimePicker
            time={new Date(time)}
            handleChangeTime={handleChangeTime}
          />
        )}
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
