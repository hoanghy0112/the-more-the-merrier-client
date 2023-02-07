import PropTypes from 'prop-types';
import React from 'react';
import { ICON_GROUP, ICON_HOUSE, ICON_PROFILE } from '../../assets/icons';
import styles from './TabButton.module.scss';

export default function TabButton({ isSelected, onClick, type }) {
  const icon = (() => {
    switch (type) {
      case 'Home':
        return (
          <ICON_HOUSE
            color={isSelected ? 'white' : 'black'}
            className={styles.house}
          />
        );
      case 'Group':
        return (
          <ICON_GROUP
            color={isSelected ? 'white' : 'black'}
            className={styles.house}
          />
        );
      case 'Profile':
        return (
          <ICON_PROFILE
            color={isSelected ? 'white' : 'black'}
            className={styles.house}
          />
        );
      default:
        return (
          <ICON_HOUSE
            color={isSelected ? 'white' : 'black'}
            className={styles.house}
          />
        );
    }
  })();
  return (
    <button
      type="button"
      className={`${styles.selected} ${
        isSelected && styles['dark-background']
      }`}
      onClick={onClick}
    >
      {icon}
      <p
        className={`${styles['home-text']} ${
          isSelected ? styles['light-text'] : styles['dark-text']
        }`}
      >
        {type}
      </p>
    </button>
  );
}

TabButton.propTypes = {
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['Home', 'Group', 'Setting']),
};

TabButton.defaultProps = {
  isSelected: false,
  type: 'Home',
};
