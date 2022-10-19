import React from 'react';
import PropTypes from 'prop-types';
import {
  ICON_FLAG,
  ICON_BOOK,
  ICON_COMPLETED,
  ICON_PENDING,
  ICON_HAT,
} from '../../assets/icons';
import styles from './Tag.module.scss';

export default function Tag({ type, input = '', shape }) {
  switch (type) {
    case 'tagFlag_1':
      return (
        <span
          className={[styles.container, styles[shape]].join(' ')}
          style={{ backgroundColor: '#1572A1' }}
        >
          <ICON_FLAG color="white" />
        </span>
      );
    case 'tagFlag_2':
      return (
        <span
          className={[styles.container, styles[shape]].join(' ')}
          style={{ backgroundColor: '#9AD0EC' }}
        >
          <ICON_FLAG color="black" />
        </span>
      );
    case 'tagFlag_3':
      return (
        <span
          className={[styles.container, styles[shape]].join(' ')}
          style={{ backgroundColor: '#EFDAD7' }}
        >
          {input}
          <ICON_FLAG color="black" />
        </span>
      );
    case 'tagFlag_4':
      return (
        <span
          className={[styles.container, styles[shape]].join(' ')}
          style={{ backgroundColor: '#E3BEC6' }}
        >
          <ICON_FLAG color="black" />
        </span>
      );
    case 'tagCompleted':
      return (
        <span
          className={[styles.container, styles[shape]].join(' ')}
          style={{ backgroundColor: '#0DCF4F' }}
        >
          <img src={ICON_COMPLETED} alt="Completed" />
        </span>
      );
    case 'tagPending':
      return (
        <span
          className={[styles.container, styles[shape]].join(' ')}
          style={{ backgroundColor: '#0DCF4F' }}
        >
          <img src={ICON_PENDING} alt="Pending" />
        </span>
      );
    case 'tagLearn':
      return (
        <span
          className={[styles.container, styles[shape]].join(' ')}
          style={{ backgroundColor: '#0066FF', paddingRight: 1, paddingTop: 1 }}
        >
          <img src={ICON_BOOK} alt="Learning" />
        </span>
      );
    case 'tagTask':
      return (
        <span
          className={[styles.container, styles[shape]].join(' ')}
          style={{
            backgroundColor: '#F9B022',
          }}
        >
          <span className={styles.textTag}>{input}</span>
        </span>
      );
    case 'tagUIT':
      return (
        <span
          className={[styles.container, styles[shape]].join(' ')}
          style={{ backgroundColor: '#F9B022' }}
        >
          <img
            src={ICON_HAT}
            alt="uit"
            style={{ width: '55%', height: '55%' }}
          />
        </span>
      );
    default:
      return <h3>This tag is not include component</h3>;
  }
}

Tag.propTypes = {
  type: PropTypes.string.isRequired,
  input: PropTypes.string.isRequired,
  shape: PropTypes.string.isRequired,
};
