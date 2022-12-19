import React from 'react';

import PropTypes from 'prop-types';

import styles from './PrimaryButton.module.scss';

export default function PrimaryButton({ title, disabled, reversed, onClick }) {
  return (
    <button
      type="button"
      onClick={!disabled && onClick}
      className={`${styles.primaryButton} ${disabled && styles.disabled} ${
        reversed && styles.reversed
      }`}
    >
      {title}
    </button>
  );
}

PrimaryButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  reversed: PropTypes.bool,
};

PrimaryButton.defaultProps = {
  title: 'None title',
  onClick: () => {},
  disabled: false,
  reversed: false,
};
