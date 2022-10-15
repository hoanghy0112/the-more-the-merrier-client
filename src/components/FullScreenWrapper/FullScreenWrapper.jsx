import React, { useLayoutEffect, useState } from 'react';

import PropTypes from 'prop-types';

import styles from './FullScreenWrapper.module.scss';

export default function FullScreenWrapper({
  isOpen,
  clickOutsideToHide,
  children,
}) {
  const [open, setOpen] = useState(isOpen);

  useLayoutEffect(() => {
    if (!clickOutsideToHide) {
      setOpen(isOpen);
    }
  }, [isOpen]);

  function handleClick(e) {
    e.stopPropagation();

    if (clickOutsideToHide) setOpen(!open);
  }

  return (
    <div
      onClick={handleClick}
      onKeyDown={() => {}}
      className={styles.container}
      style={{
        visibility: open,
      }}
    >
      <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

FullScreenWrapper.propTypes = {
  isOpen: PropTypes.bool,
  clickOutsideToHide: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

FullScreenWrapper.defaultProps = {
  children: '',
  isOpen: false,
  clickOutsideToHide: true,
};
