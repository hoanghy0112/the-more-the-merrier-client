import React from 'react';

import PropTypes from 'prop-types';

import styles from './PrimaryButton.module.scss';

export default function PrimaryButton({ title, disabled, onClick }) {
  return (
    <button
      type="button"
      onClick={!disabled && onClick}
      className={`${styles.primaryButton} ${disabled && styles.disabled}`}
    >
      {title}
    </button>
  );
}

PrimaryButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

PrimaryButton.defaultProps = {
  title: 'None title',
  onClick: () => {},
  disabled: false,
};
