/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Draggable from 'react-draggable';

import PropTypes from 'prop-types';

import DescriptionPopUpMinimize from '../DescriptionPopUpMinimize/PopUpMinimize';
import HoverBox from '../HoverBox/HoverBox';

import { changeTask } from '../../features/tasksManagement/TasksSlice';
import styles from './TaskCard.module.scss';
import { selectTagsWithIDs } from '../../features/tagsManagement/TagsSlice';
import moment from 'moment/moment';

export default function TaskCard({ task, rect, width, startDate }) {
  const dispatch = useDispatch();

  const [isDrag, setIsDrag] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const {
    title,
    time: { from, to },
    tags: tagIDs,
  } = task;

  const tags = useSelector(selectTagsWithIDs(tagIDs));

  // const top = ((new Date(from).getTime() % 86400000) / 86400000) * 1200;
  const fromDate = new Date(from);
  const top =
    ((fromDate.getHours() * 60 + fromDate.getMinutes()) / (24 * 60)) * 1200;

  const height =
    ((new Date(to).getTime() - new Date(from).getTime()) / 86400000) * 1200;

  // const column = new Date(from).getDate() - new Date(startDate).getDate();
  const column = moment(new Date(from)).diff(new Date(startDate), 'd');

  function handleDragStop(event, { lastX, lastY }) {
    // const deltaDay = (lastX / width) * 24 * 60 * 60 * 1000;
    // const deltaMinutes = (lastY / 1200) * 24 * 60 * 60 * 1000;
    // const newFrom = new Date(
    //   parseInt(new Date(startDate).getTime() / 86400000, 10) * 86400000 +
    //     deltaDay +
    //     deltaMinutes,
    // );
    const newFrom = new Date(
      startDate.getYear() + 1900,
      startDate.getMonth(),
      startDate.getDate() + Math.round(lastX / width),
      parseInt((lastY / 1200) * 24, 10),
      parseInt((lastY / 1200) * 24 * 60, 10) % 60,
      // parseInt(new Date(startDate).getTime() / 86400000, 10) * 86400000 +
      //   deltaDay +
      //   deltaMinutes,
    );

    dispatch(
      changeTask({
        _id: task._id,
        time: {
          from: newFrom.getTime(),
          to: new Date(
            newFrom.getTime() +
              new Date(to).getTime() -
              new Date(from).getTime(),
          ).getTime(),
        },
      }),
    );
  }

  const primaryColor = (() => {
    switch (task.priority) {
      case 1:
        return '#1572A1';

      case 2:
        return '#9AD0EC';

      case 3:
        return '#EFDAD7';

      case 4:
        return '#E3BEC6';

      default:
        return '#EFDAD7';
    }
  })();

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
        style={{
          width,
          height,
          zIndex: isHovering ? 20 : 10,
          '--color': primaryColor,
          color: task.priority === 1 ? 'white' : 'black',
        }}
      >
        <HoverBox
          mainBox={
            <div
              className={[
                styles.task,
                new Date(to) < new Date() && styles.passed,
              ].join(' ')}
            >
              <div className={styles.taskContent}>
                <p>{title}</p>
                <div className={styles.tags}>
                  {tags.map((tag) => (
                    <p style={{ backgroundColor: tag.color }}>{tag.title}</p>
                  ))}
                </div>
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
    priority: PropTypes.number,
    time: {
      from: PropTypes.instanceOf(Date),
      to: PropTypes.instanceOf(Date),
    },
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  width: PropTypes.number.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  rect: PropTypes.instanceOf(DOMRect).isRequired,
};

TaskCard.defaultProps = {};
