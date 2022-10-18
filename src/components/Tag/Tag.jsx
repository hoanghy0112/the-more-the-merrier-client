import React from 'react';
import PropTypes from 'prop-types';
import {
  ICON_FLAG,
  ICON_BOOK,
  ICON_COMPLETED,
  ICON_PENDING,
} from '../../assets/icons';
import styles from './Tag.module.scss';

export default function Tag({ type, input, shape }) {
  switch (type) {
    case '1':
      return (
        <span
          className={[styles.container, styles[shape]].join(' ')}
          style={{ backgroundColor: '#1572A1' }}
        >
          <ICON_FLAG color="white" />
        </span>
      );
    case '2':
      return (
        <span
          className={[styles.container, styles[shape]].join(' ')}
          style={{ backgroundColor: '#9AD0EC' }}
        >
          <ICON_FLAG color="black" />
        </span>
      );
    case '3':
      return (
        <span
          className={[styles.container, styles[shape]].join(' ')}
          style={{ backgroundColor: '#EFDAD7' }}
        >
          <ICON_FLAG color="black" />
        </span>
      );
    case '4':
      return (
        <span
          className={[styles.container, styles[shape]].join(' ')}
          style={{ backgroundColor: '#E3BEC6' }}
        >
          <ICON_FLAG color="black" />
        </span>
      );
    case 'completed':
      return (
        <span
          className={[styles.container, styles[shape]].join(' ')}
          style={{ backgroundColor: '#0DCF4F' }}
        >
          <img src={ICON_COMPLETED} alt="Completed" />
        </span>
      );
    case 'pending':
      return (
        <span
          className={[styles.container, styles[shape]].join(' ')}
          style={{ backgroundColor: '#0DCF4F' }}
        >
          <img src={ICON_PENDING} alt="Pending" />
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
