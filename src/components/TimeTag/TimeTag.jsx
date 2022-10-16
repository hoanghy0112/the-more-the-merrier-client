import React from 'react';
import PropTypes from 'prop-types';
import styles from './TimeTag.module.scss';

import TimePicker from '../TimePicker/TimePicker';

import { useState } from 'react';

export default function TimeTag({ time, onChange }) {

  const [isEdit, setIsEdit] = useState(false)

  const handleChangeTime = (time) => {
    console.log(time)
    onChange(time)
    setIsEdit(false)
  }

  return (
    <>
    {
    isEdit === false &&
    <div className={styles.container} onClick={() => setIsEdit(!isEdit)}>
      <p className={styles.time}>
        {`${time.getHours()}h${time.getMinutes()} ${
          time||new Date().getHours() < 12 ? 'AM' : 'PM'}`}
      </p>
    </div>}
    {isEdit === true && <TimePicker time={time} handleChangeTime={handleChangeTime}/>}
    </>
  );
}

TimeTag.propTypes = {
  time: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};
