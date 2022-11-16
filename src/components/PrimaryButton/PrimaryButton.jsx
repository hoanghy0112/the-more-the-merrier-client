import React from 'react';

import PropTypes from 'prop-types';

import styles from './PrimaryButton.module.scss';

export default function PrimaryButton({ title, onClick }) {
  return (
    <button type="button" onClick={onClick} className={styles.primaryButton}>
      {title}
    </button>
  );
}

PrimaryButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

PrimaryButton.defaultProps = {
  title: 'None title',
  onClick: () => {},
};
