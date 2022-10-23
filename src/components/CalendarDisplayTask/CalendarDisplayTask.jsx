/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import TaskCard from '../TaskCard/TaskCard';
import { changeTask } from '../../features/tasksManagement/TasksSlice';

export default function CalendarDisplayTask({
  gridSize,
  tasks,
  rect,
  startDate,
}) {
  const dispatch = useDispatch();

  function handleChange(newData) {
    dispatch(changeTask(newData));
  }

  return (
    <>
      {tasks.map(({ _id }, index) => (
        <TaskCard
          key={_id}
          task={tasks[index]}
          width={gridSize}
          rect={rect}
          startDate={startDate}
          onChange={handleChange}
        />
      ))}
    </>
  );
}

CalendarDisplayTask.propTypes = {
  gridSize: PropTypes.number.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      column: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
  ).isRequired,
  // setTasks: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  rect: PropTypes.instanceOf(DOMRect).isRequired,
};

CalendarDisplayTask.defaultProps = {};
