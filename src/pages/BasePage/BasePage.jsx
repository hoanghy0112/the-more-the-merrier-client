import React from 'react';
import PropTypes from 'prop-types';

import styles from './BasePage.module.scss';

export default function BasePage({ children }) {
  return (
    <div className={styles.container}>
      <div>Information box</div>
      {children}
    </div>
  );
}

BasePage.propTypes = {
  children: PropTypes.node,
};

BasePage.defaultProps = {
  children: '',
};
