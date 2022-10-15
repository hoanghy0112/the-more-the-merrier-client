import React from 'react';

import PropTypes from 'prop-types';

import styles from './FullScreenWrapper.module.scss';

export default function FullScreenWrapper({ children }) {
  function handleClick(e) {
    e.stopPropagation();
  }
  return (
    <div
      onClick={handleClick}
      onKeyDown={() => {}}
      className={styles.container}
    >
      {children}
    </div>
  );
}

FullScreenWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

FullScreenWrapper.defaultProps = {
  children: '',
};
