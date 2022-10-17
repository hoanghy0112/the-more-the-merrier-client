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
  width,
  startDate,
  onDragStop,
  onChange,
}) {
  const [isDrag, setIsDrag] = useState(false);

  const {
    title,
    time: { from, to },
  } = task;

  const top = ((new Date(from).getTime() % 86400000) / 86400000) * 1200;

  const height =
    ((new Date(to).getTime() - new Date(from).getTime()) / 86400000) * 1200;

  const column =
    parseInt(new Date(from).getTime() / 86400000, 10) -
    parseInt(new Date(startDate).getTime() / 86400000, 10);

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
          infoBox={<DescriptionPopUpMinimize data={task} onChange={onChange} />}
          parentRect={rect}
          canAppear={!isDrag}
        />
      </div>
    </Draggable>
  );
}

TaskCard.propTypes = {
  // title: PropTypes.string,
  task: PropTypes.shape({
    title: PropTypes.string,
    time: {
      from: PropTypes.instanceOf(Date),
      to: PropTypes.instanceOf(Date),
    },
  }).isRequired,
  top: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  // height: PropTypes.number.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  onDragStop: PropTypes.func.isRequired,
  rect: PropTypes.instanceOf(DOMRect).isRequired,
};

TaskCard.defaultProps = {};
