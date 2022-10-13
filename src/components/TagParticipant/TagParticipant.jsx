import React from 'react';
import PropTypes from 'prop-types';
import styles from './TagParticipant.module.scss';
import { ICON_X } from '../../assets/icons';

export default function TagParticipant({ name, onClick }) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={styles.container} onClick={onClick}>
      <p className={styles.name}>{name}</p>
      <img src={ICON_X} alt="X" />
    </div>
  );
}

TagParticipant.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
