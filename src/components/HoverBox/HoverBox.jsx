import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import styles from './HoverBox.module.scss';

export default function HoverBox({ mainBox, infoBox, parentRect, canAppear }) {
  const [isAppear, setIsAppear] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mainBoxRef = useRef();
  const infoBoxRef = useRef();

  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      if (canAppear) setIsAppear(isHovering);
    }, 500);

    return () => clearTimeout(timeout);
  }, [isHovering, canAppear]);

  useLayoutEffect(() => {
    if (!canAppear) setIsAppear(false);
  }, [canAppear]);

  const PADDING = 10;

  const left = useMemo(() => {
    if (mainBoxRef?.current && infoBoxRef?.current) {
      const mainBoxRect = mainBoxRef.current.getBoundingClientRect();
      const infoBoxRect = infoBoxRef.current.getBoundingClientRect();
      let l = mainBoxRect.width + PADDING;
      if (l + infoBoxRect.width + mainBoxRect.left > parentRect.right) {
        l = -infoBoxRect.width - PADDING;
      }

      return l;
    }
    return 0;
  }, [mainBoxRef, infoBoxRef, parentRect, isAppear, isHovering]);

  const top = useMemo(() => {
    if (mainBoxRef?.current && infoBoxRef?.current) {
      const mainBoxRect = mainBoxRef.current.getBoundingClientRect();
      const infoBoxRect = infoBoxRef.current.getBoundingClientRect();
      let t = 0;
      if (t + infoBoxRect.height + mainBoxRect.top > parentRect.bottom) {
        t = -infoBoxRect.height + mainBoxRect.height;
      }

      return t;
    }
    return 0;
  }, [mainBoxRef, infoBoxRef, parentRect, isAppear, isHovering]);

  function stopPropagation(e) {
    e.stopPropagation();
  }

  return (
    <div
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
      className={styles.container}
    >
      <div ref={mainBoxRef} className={styles.mainBox}>
        {mainBox}
      </div>
      <div
        onClick={stopPropagation}
        onMouseDown={stopPropagation}
        className={styles.infoBox}
        style={{ left, top }}
      >
        <div
          style={{
            visibility: isAppear && canAppear ? 'visible' : 'hidden',
          }}
          ref={infoBoxRef}
        >
          {infoBox}
        </div>
      </div>
    </div>
  );
}

HoverBox.propTypes = {
  mainBox: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  infoBox: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  canAppear: PropTypes.bool,
  parentRect: PropTypes.arrayOf(PropTypes.number),
};

HoverBox.defaultProps = {
  mainBox: <div />,
  infoBox: <div />,
  canAppear: true,
  parentRect: [0, 0, 0, 0],
};
