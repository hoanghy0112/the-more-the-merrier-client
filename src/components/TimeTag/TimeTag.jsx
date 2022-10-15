import React from 'react';
import PropTypes from 'prop-types';
import styles from './TimeTag.module.scss';

export default function TimeTag({ time, onChange }) {
  return (
    <div className={styles.container} onClick={onChange}>
      <p className={styles.time}>
        {`${time.getHours() % 12}h${time.getMinutes()} ${
          time.getHours() < 12 ? 'AM' : 'PM'
        }`}
      </p>
    </div>
  );
}

TimeTag.propTypes = {
  time: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};
