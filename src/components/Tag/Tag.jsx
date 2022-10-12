import React from 'react';
import PropTypes from 'prop-types';
import {
  ICON_FLAG,
  ICON_BOOK,
  ICON_COMPLETED,
  ICON_PENDING,
} from '../../assets/icons';
import styles from './Tag.module.scss';

export default function Tag({ type }) {
  switch (type) {
    case 'tagFlag_1':
      return (
        <div className={styles.container}>
          <ICON_FLAG color="white" />
        </div>
      );
    case 'tagFlag_2':
      return (
        <div className={styles.container} style={{ backgroundColor: '#9AD0EC' }}>
          <ICON_FLAG color="black" />
        </div>
      );
    case 'tagFlag_3':
      return (
        <div className={styles.container} style={{ backgroundColor: '#EFDAD7' }}>
          <ICON_FLAG color="black" />
        </div>
      );
    case 'tagFlag_4':
      return (
        <div className={styles.container} style={{ backgroundColor: '#E3BEC6' }}>
          <ICON_FLAG color="black" />
        </div>
      );
    case 'tagCompleted':
      return (
        <div className={styles.container} style={{ backgroundColor: '#0DCF4F' }}>
          <img src={ICON_COMPLETED} alt="Completed" />
        </div>
      );
    case 'tagPending':
      return (
        <div className={styles.container} style={{ backgroundColor: '#0DCF4F' }}>
          <img src={ICON_PENDING} alt="Pending" />
        </div>
      );
    case 'tagLearn':
      return (
        <div
          className={styles.container}
          style={{ backgroundColor: '#0066FF', paddingRight: 1, paddingTop: 1 }}
        >
          <img src={ICON_BOOK} alt="Learning" />
        </div>
      );
    default:
      return <h3>This tag is not include component</h3>;
  }
}

Tag.propTypes = {
  type: PropTypes.string.isRequired,
};
