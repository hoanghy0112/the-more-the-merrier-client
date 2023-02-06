/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import Draggable from 'react-draggable';

import moment from 'moment/moment';
import PropTypes from 'prop-types';

import DescriptionPopUpMinimize from '../DescriptionPopUpMinimize/PopUpMinimize';
import HoverBox from '../HoverBox/HoverBox';

import { selectTagsWithIDs } from '../../features/tagsManagement/TagsSlice';

import styles from './TaskCard.module.scss';
import CenteredModal from '../CenteredModal/CenteredModal';
import CreateNewTask from '../CreateNewTask/CreateNewTask';
import TaskPopUp from '../TaskPopUp/TaskPopUp';
import { selectUserProfile } from '../../features/userManagement/ProfileSlice';
import { getColorOfGroupTask } from '../../utils/taskColor.util';

export default function TaskCard({
  task,
  rect,
  width,
  startDate,
  changeTask,
  isGroup,
}) {
  const [isDrag, setIsDrag] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const userInfo = useSelector(selectUserProfile);

  const {
    title,
    time: { from, to },
    tags: tagIDs,
  } = task;

  const tags = useSelector(selectTagsWithIDs(tagIDs || []));

  const fromDate = new Date(from);
  const top =
    ((fromDate.getHours() * 60 + fromDate.getMinutes()) / (24 * 60)) * 1200;

  const height =
    ((new Date(to).getTime() - new Date(from).getTime()) / 86400000) * 1200;

  const column = moment(new Date(from)).diff(new Date(startDate), 'd');

  const isEditable = task?.admin === userInfo?._id;

  function handleDragStop(event, { lastX, lastY }) {
    const newFrom = new Date(
      startDate.getYear() + 1900,
      startDate.getMonth(),
      startDate.getDate() + Math.round(lastX / width),
      parseInt((lastY / 1200) * 24, 10),
      parseInt((lastY / 1200) * 24 * 60, 10) % 60,
    );

    changeTask({
      _id: task._id,
      time: {
        from: newFrom.getTime(),
        to: new Date(
          newFrom.getTime() + new Date(to).getTime() - new Date(from).getTime(),
        ).getTime(),
      },
    });
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
      onStart={() => setTimeout(() => setIsDrag(true), 400)}
      onStop={(...params) => {
        setTimeout(() => setIsDrag(false), 400);
        handleDragStop(...params);
      }}
      disabled={(task.belongTo && !isGroup) || !isEditable}
    >
      <div
        className={styles.drag}
        style={{
          width,
          height,
          zIndex: isHovering
            ? 200
            : (task.belongTo && !isGroup) || !isEditable
            ? 250
            : 160,
          '--color': primaryColor,
          color: task.priority === 1 ? 'white' : 'black',
        }}
      >
        <HoverBox
          mainBox={
            <div
              className={[
                styles.task,
                task?.belongTo && !isGroup ? styles.group : null,
                new Date(to) < new Date() && styles.passed,
              ].join(' ')}
              onClick={() => {
                if (!isDrag) setIsOpen(true);
              }}
              style={
                task?.belongTo && !isGroup
                  ? {
                      backgroundColor: getColorOfGroupTask(task, userInfo._id),
                    }
                  : {}
              }
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
          infoBox={
            <DescriptionPopUpMinimize
              onChange={changeTask}
              isGroup={isGroup}
              data={task}
            />
          }
          onOpen={setIsHovering}
          parentRect={rect}
          canAppear={!isDrag && (isGroup || !task.belongTo)}
        />

        {(isGroup && task?.admin === userInfo?._id) || !task?.belongTo ? (
          <CenteredModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <CreateNewTask
              onChange={(data) => {
                changeTask(data);
                setIsOpen(false);
              }}
              isGroup={isGroup}
              data={task}
            />
          </CenteredModal>
        ) : (
          <>
            {task?._id ? (
              <TaskPopUp
                id={task._id}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
              />
            ) : null}
          </>
        )}
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
  changeTask: PropTypes.func.isRequired,
  isGroup: PropTypes.bool,
};

TaskCard.defaultProps = {
  isGroup: false,
};
