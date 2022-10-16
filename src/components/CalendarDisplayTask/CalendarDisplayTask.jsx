/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import PropTypes from 'prop-types';

import TaskCard from '../TaskCard/TaskCard';

export default function CalendarDisplayTask({ gridSize, tasks, setTasks, startDate }) {
  return (
    <>
      {tasks.map(({ _id, time: { from, to } }, index) => (
        <TaskCard
          key={_id}
          width={gridSize}
          height={
            ((new Date(to).getTime() - new Date(from).getTime()) / 86400000) *
            1200
          }
          column={
            parseInt(new Date(from).getTime() / 86400000, 10) -
            parseInt(new Date(startDate).getTime() / 86400000, 10)
          }
          top={((new Date(from).getTime() % 86400000) / 86400000) * 1200}
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
