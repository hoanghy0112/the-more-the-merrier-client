/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { selectCurrentWeekTasks } from '../../features/tasksManagement/TasksSlice';
import TaskCard from '../TaskCard/TaskCard';

export default function CalendarDisplayTask({ gridSize, rect, startDate }) {
  const tasks = useSelector(selectCurrentWeekTasks(startDate));

  return (
    <>
      {tasks.map(({ _id }, index) => (
        <TaskCard
          key={_id}
          task={tasks[index]}
          width={gridSize}
          rect={rect}
          startDate={startDate}
        />
      ))}
    </>
  );
}

CalendarDisplayTask.propTypes = {
  gridSize: PropTypes.number.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  rect: PropTypes.instanceOf(DOMRect).isRequired,
};

CalendarDisplayTask.defaultProps = {};
