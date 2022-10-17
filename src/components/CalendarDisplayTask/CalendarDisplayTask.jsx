/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import PropTypes from 'prop-types';

import TaskCard from '../TaskCard/TaskCard';

export default function CalendarDisplayTask({
  gridSize,
  tasks,
  rect,
  setTasks,
  startDate,
}) {
  return (
    <>
      {tasks.map(({ _id, time: { from, to }, title }, index) => (
        <TaskCard
          key={_id}
          title={title}
          task={tasks[index]}
          width={gridSize}
          rect={rect}
          startDate={startDate}
          onDragStop={(event, { lastX, lastY }) => {
            const deltaDay = (lastX / gridSize) * 24 * 60 * 60 * 1000;
            const deltaMinutes = (lastY / 1200) * 24 * 60 * 60 * 1000;
            const newFrom = new Date(
              parseInt(new Date(startDate).getTime() / 86400000, 10) *
                86400000 +
                deltaDay +
                deltaMinutes,
            );

            setTasks({
              id: _id,
              time: {
                from: newFrom.toISOString(),
                to: new Date(
                  newFrom.getTime() +
                    new Date(to).getTime() -
                    new Date(from).getTime(),
                ).toISOString(),
              },
            });
          }}
          onChange={setTasks}
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
  startDate: PropTypes.instanceOf(Date).isRequired,
  rect: PropTypes.instanceOf(DOMRect).isRequired,
};

CalendarDisplayTask.defaultProps = {};
