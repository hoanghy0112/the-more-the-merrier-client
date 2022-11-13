/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import PropTypes from 'prop-types';

import TaskCard from '../../../../components/TaskCard/TaskCard';

export default function CalendarDisplayTask({
  gridSize,
  rect,
  startDate,
  tasks,
}) {
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
};

CalendarDisplayTask.defaultProps = {
  tasks: [],
};
