/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import TaskCard from '../../../../components/TaskCard/TaskCard';

import styles from './CalendarDisplayTask.module.scss';
import { selectCurrentGroupInfo } from '../../../groupsManagement/groupSlice';
import {
  selectSuggestionTime,
  selectSuggestionVisible,
} from '../../calendarSlice';
import TimeCard from '../TimeCard/TimeCard';

export default function CalendarDisplayTask({
  gridSize,
  rect,
  startDate,
  tasks,
  changeTask,
  groupBusyTimes,
  isGroup,
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
          isGroup={isGroup}
        />
      ))}

      {groupBusyTimes.map(({ from, to }) => (
        <TimeCard
          key={from + to}
          className={styles.groupTask}
          gridSize={gridSize}
          startDate={startDate}
          from={from}
          to={to}
          opacity={1 / ((groupInfo?.users?.length || 0) + 1) + 0.2}
        />
      ))}

      {suggestionVisible &&
        suggestionTime.map(({ from, to, busy }) => (
          <TimeCard
            key={from + to}
            className={styles.suggestionTask}
            gridSize={gridSize}
            startDate={startDate}
            from={from}
            to={to}
            busy={busy}
            opacity={1 / ((groupInfo?.users?.length || 0) + 1) + 0.2}
          />
        ))}

      <TimeCard
        className={styles.now}
        gridSize={gridSize}
        startDate={startDate}
        from={new Date()}
        to={new Date(new Date().getTime() + 5 * 60 * 1000)}
        opacity={1}
      />
    </>
  );
}

CalendarDisplayTask.propTypes = {
  gridSize: PropTypes.number.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  rect: PropTypes.instanceOf(DOMRect),
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
  groupBusyTimes: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.instanceOf(Date),
      to: PropTypes.instanceOf(Date),
    }),
  ),
  isGroup: PropTypes.bool,
};

CalendarDisplayTask.defaultProps = {
  tasks: [],
  groupBusyTimes: [],
  isGroup: false,
  rect: new DOMRect(0, 0, 0, 0),
};
