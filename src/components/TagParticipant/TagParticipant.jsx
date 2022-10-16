/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './TagParticipant.module.scss';
import { ICON_X } from '../../assets/icons';

export default function TagParticipant({ name, onClick, onClose }) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={styles.container} onClick={onClick}>
      <p className={styles.name}>{name}</p>
      <img
        onClick={onClose}
        src={ICON_X}
        alt="X"
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
}

TagParticipant.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
};

TagParticipant.defaultProps = {
  onClick: () => {},
  onClose: () => {},
};
