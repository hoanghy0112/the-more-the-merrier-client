import React from 'react';
import PropTypes from 'prop-types';
import styles from './TimeTag.module.scss';

export default function TimeTag({ time, onClick }) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={styles.container} onClick={onClick}>
      <p className={styles.time}>{time}</p>
    </div>
  );
}

TimeTag.propTypes = {
  time: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
