/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useEffect, useLayoutEffect, useState } from 'react';

import Draggable from 'react-draggable';

import PropTypes from 'prop-types';

import HoverBox from '../HoverBox/HoverBox';
import DescriptionPopUpMinimize from '../DescriptionPopUpMinimize/PopUpMinimize';

import styles from './TaskCard.module.scss';

export default function TaskCard({
  task,
  rect,
  title,
  top,
  width,
  height,
  column,
  onDragStop,
}) {
  const [isDrag, setIsDrag] = useState(false);
  const [isChoosing, setIsChoosing] = useState(false);

  const [isAppearDetail, setIsAppearDetail] = useState(false);

  return (
    <Draggable
      onMouseDown={(e) => e.stopPropagation()}
      onMouseMove={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      bounds="parent"
      grid={[width, 1]}
      position={{ x: column * width, y: top }}
      onStart={() => setIsDrag(true)}
      onStop={(...params) => {
        setIsDrag(false);
        onDragStop(...params);
      }}
    >
      <div className={styles.drag} style={{ width, height }}>
        <HoverBox
          mainBox={
            <div className={styles.task}>
              <div className={styles.taskContent}>
                <p>{title}</p>
              </div>
            </div>
          }
          infoBox={<DescriptionPopUpMinimize data={task} />}
          parentRect={rect}
          canAppear={!isDrag}
        />
      </div>
    </Draggable>
  );
}

TaskCard.propTypes = {
  title: PropTypes.string,
  top: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  onDragStop: PropTypes.func.isRequired,
};

TaskCard.defaultProps = {
  title: 'Untitled',
};
