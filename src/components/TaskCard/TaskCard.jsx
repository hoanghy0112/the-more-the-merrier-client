/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import Draggable from 'react-draggable';

import PropTypes from 'prop-types';

import DescriptionPopUpMinimize from '../DescriptionPopUpMinimize/PopUpMinimize';
import HoverBox from '../HoverBox/HoverBox';

import { changeTask } from '../../features/tasksManagement/TasksSlice';
import styles from './TaskCard.module.scss';

export default function TaskCard({ task, rect, width, startDate }) {
  const dispatch = useDispatch();

  const [isDrag, setIsDrag] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const {
    title,
    time: { from, to },
  } = task;

  const top = ((new Date(from).getTime() % 86400000) / 86400000) * 1200;

  const height =
    ((new Date(to).getTime() - new Date(from).getTime()) / 86400000) * 1200;

  const column = new Date(from).getDate() - new Date(startDate).getDate();

  console.log(
    { column },
    new Date(from).getDate(),
    new Date(startDate).getDate(),
    title,
  );

  function handleDragStop(event, { lastX, lastY }) {
    const deltaDay = (lastX / width) * 24 * 60 * 60 * 1000;
    const deltaMinutes = (lastY / 1200) * 24 * 60 * 60 * 1000;
    const newFrom = new Date(
      parseInt(new Date(startDate).getTime() / 86400000, 10) * 86400000 +
        deltaDay +
        deltaMinutes,
    );

    dispatch(
      changeTask({
        _id: task._id,
        time: {
          from: newFrom.toISOString(),
          to: new Date(
            newFrom.getTime() +
              new Date(to).getTime() -
              new Date(from).getTime(),
          ).toISOString(),
        },
      }),
    );
  }

  return (
    <Draggable
      onMouseDown={(e) => e.stopPropagation()}
      onMouseMove={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      bounds="parent"
      grid={[width, 50 / 12]}
      position={{ x: column * width, y: top }}
      onStart={() => setIsDrag(true)}
      onStop={(...params) => {
        setIsDrag(false);
        handleDragStop(...params);
      }}
    >
      <div
        className={styles.drag}
        style={{ width, height, zIndex: isHovering ? 20 : 10 }}
      >
        <HoverBox
          mainBox={
            <div className={styles.task}>
              <div className={styles.taskContent}>
                <p>{title}</p>
              </div>
            </div>
          }
          infoBox={<DescriptionPopUpMinimize data={task} />}
          onOpen={setIsHovering}
          parentRect={rect}
          canAppear={!isDrag}
        />
      </div>
    </Draggable>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    time: {
      from: PropTypes.instanceOf(Date),
      to: PropTypes.instanceOf(Date),
    },
  }).isRequired,
  width: PropTypes.number.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  rect: PropTypes.instanceOf(DOMRect).isRequired,
};

TaskCard.defaultProps = {};
