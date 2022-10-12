import React from 'react';
import PropTypes from 'prop-types';
import styles from './TabButton.module.scss';
import { ICON_HOUSE } from '../../assets/icons';

export default function TabButton({ isSelected, onClick }) {
  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={`${styles.selected} ${
        isSelected || styles['light-background']
      }`}
      onClick={onClick}
    >
      <ICON_HOUSE
        color={isSelected ? 'white' : 'black'}
        className={styles.house}
      />
      <p
        className={`${styles['home-text']} ${
          isSelected ? styles['light-text'] : styles['dark-text']
        }`}
      >
        Home
      </p>
    </div>
  );
}

TabButton.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
