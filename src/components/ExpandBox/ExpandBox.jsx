import React, { useRef, useState } from 'react';

import PropTypes from 'prop-types';

import styles from './ExpandBox.module.scss';
import { ICON_CHEVRON_UP } from '../../assets/icons';

export default function ExpandBox({ title, children, className, style }) {
  const [isExpand, setIsExpand] = useState(true);

  const contentRef = useRef();

  return (
    <div className={`${styles.container} ${className}`} style={style}>
      <button
        type="button"
        className={styles.title}
        onClick={() => setIsExpand((prev) => !prev)}
      >
        <div className={styles.dashTitle}>
          <p>{title}</p>
          <div />
        </div>
        <ICON_CHEVRON_UP
          style={{
            transform: `rotate(${isExpand ? 0 : 180}deg)`,
          }}
          className={styles.icon}
        />
      </button>
      <div
        className={`${styles.contentBox} ${isExpand || styles.expand}`}
        style={{
          height: contentRef?.current
            ? contentRef?.current.getBoundingClientRect().height
            : 0,
        }}
      >
        <div ref={contentRef}>{children}</div>
      </div>
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
