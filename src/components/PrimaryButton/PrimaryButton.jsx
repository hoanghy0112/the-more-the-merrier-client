import React from 'react';

import PropTypes from 'prop-types';

import styles from './PrimaryButton.module.scss';

export default function PrimaryButton({
  title,
  backgroundColor,
  shadowColor,
  disabled,
  reversed,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={!disabled && onClick}
      style={{
        '--background-color': backgroundColor,
        '--shadow-color': shadowColor,
      }}
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
  backgroundColor: PropTypes.string,
  shadowColor: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  reversed: PropTypes.bool,
};

PrimaryButton.defaultProps = {
  title: 'None title',
  onClick: () => {},
  disabled: false,
  reversed: false,
  backgroundColor: '#00a6ca',
  shadowColor: 'rgb(58, 229, 206)',
};
