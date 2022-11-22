/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import moment from 'moment';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import TaskCard from '../../../../components/TaskCard/TaskCard';

import styles from './CalendarDisplayTask.module.scss';
import { selectCurrentGroupInfo } from '../../../groupsManagement/groupSlice';
import {
  selectSuggestionTime,
  selectSuggestionVisible,
} from '../../calendarSlice';

export default function CalendarDisplayTask({
  gridSize,
  rect,
  startDate,
  tasks,
  changeTask,
  groupTasks,
}) {
  const groupInfo = useSelector(selectCurrentGroupInfo);

  const suggestionVisible = useSelector(selectSuggestionVisible);
  const suggestionTime = useSelector(selectSuggestionTime);

  return (
    <>
      {tasks.map(({ _id }, index) => (
        <TaskCard
          key={_id}
          task={tasks[index]}
          width={gridSize}
          rect={rect}
          startDate={startDate}
          changeTask={changeTask}
        />
      ))}

      {groupTasks.map(({ from, to }) => (
        <div
          className={styles.groupTask}
          style={{
            top: `${
              (((new Date(from).getHours() * 60 + new Date(from).getMinutes()) %
                (24 * 60)) /
                (24 * 60)) *
              1200
            }px`,
            left: `${
              moment(new Date(from)).diff(new Date(startDate), 'days') *
              gridSize
            }px`,
            width: `${gridSize - 6}px`,
            height: `${
              (moment(new Date(to)).diff(new Date(from), 'hours', true) / 24) *
              1200
            }px`,
            opacity: 1 / ((groupInfo?.users?.length || 0) + 1),
          }}
        />
      ))}

      {suggestionVisible &&
        suggestionTime.map(({ from, to }) => (
          <div
            className={styles.suggestionTask}
            style={{
              top: `${
                (((new Date(from).getHours() * 60 +
                  new Date(from).getMinutes()) %
                  (24 * 60)) /
                  (24 * 60)) *
                1200
              }px`,
              left: `${
                moment(new Date(from)).diff(new Date(startDate), 'days') *
                gridSize
              }px`,
              width: `${gridSize - 6}px`,
              height: `${
                (moment(new Date(to)).diff(new Date(from), 'hours', true) /
                  24) *
                1200
              }px`,
              opacity: 1 / ((groupInfo?.users?.length || 0) + 1),
            }}
          />
        ))}
    </>
  );
}

CalendarDisplayTask.propTypes = {
  gridSize: PropTypes.number.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  rect: PropTypes.instanceOf(DOMRect).isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      priority: PropTypes.number,
      time: {
        from: PropTypes.instanceOf(Date),
        to: PropTypes.instanceOf(Date),
      },
      tags: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  changeTask: PropTypes.func.isRequired,
  groupTasks: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.instanceOf(Date),
      to: PropTypes.instanceOf(Date),
    }),
  ),
};

CalendarDisplayTask.defaultProps = {
  tasks: [],
  groupTasks: [],
};
