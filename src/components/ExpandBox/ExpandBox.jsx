import React from 'react';

import PropTypes from 'prop-types';

import styles from './ExpandBox.module.scss';
import { ICON_CHEVRON_UP } from '../../assets/icons';

export default function ExpandBox({ title, children, className, style }) {
  return (
    <div className={`${styles.container} ${className}`} style={style}>
      <div className={styles.title}>
        <div className={styles.daskTitle}>
          <p>{title}</p>
          <div />
        </div>
        <ICON_CHEVRON_UP className={styles.icon} />
      </div>
      <div className={styles.contentBox}>{children}</div>
    </div>
  );
}

ExpandBox.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
};

ExpandBox.defaultProps = {
  title: 'Untitled tag',
  children: '',
  className: '',
  style: {},
};
