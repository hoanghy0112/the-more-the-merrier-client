/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import PropTypes from 'prop-types';

import TaskCard from '../TaskCard/TaskCard';

export default function CalendarDisplayTask({ gridSize, tasks, setTasks }) {
  return (
    <>
      {tasks.map(({ id, top, column, height }, index) => (
        <TaskCard
          key={id}
          width={gridSize}
          height={height}
          column={column}
          top={top}
          onDragStop={(event, { lastX, lastY }) => {
            const newTasks = tasks;
            newTasks[index].column = lastX / gridSize;
            newTasks[index].top = lastY;
            setTasks([...newTasks]);
          }}
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
  setTasks: PropTypes.func.isRequired,
};

CalendarDisplayTask.defaultProps = {};
