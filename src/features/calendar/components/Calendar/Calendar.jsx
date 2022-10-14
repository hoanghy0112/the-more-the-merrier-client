/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import DateItem from '../../../../components/DateItem/DateItem';
import TimelineItem from '../../../../components/TimelineItem/TimelineItem';
// import { ResizableBox, Resizable } from "re-resizable";

import CalendarCreateTask from '../../../../components/CalendarCreateTask/CalendarCreateTask';
import CalendarDisplayTask from '../../../../components/CalendarDisplayTask/CalendarDisplayTask';
import useWindowSize from '../../../../hooks/useWindowSize';
import './Calendar.scss';

export default function Calendar({ startDate }) {
  const [windowWidth] = useWindowSize();

  const [tasks, setTask] = useState([]);

  const taskRef = useRef(null);

  const [gridSize, setGridSize] = useState(199);

  useEffect(() => {
    if (taskRef?.current) {
      setGridSize(taskRef.current.getBoundingClientRect().width / 7);
    }
  }, [taskRef, windowWidth]);

  return (
    <div className="calendar__container">
      <div className="weekdays">
        {Array(7)
          .fill('')
          .map((_, index) => {
            const date = new Date(startDate);
            date.setDate(date.getDate() + index);
            return <DateItem date={date} />;
          })}
      </div>
      <div className="timeline">
        {Array(24)
          .fill()
          .map((_, index) => (
            <TimelineItem time={index} />
          ))}
        <div className="task">
          <div ref={taskRef}>
            <CalendarDisplayTask
              gridSize={gridSize}
              tasks={tasks}
              setTasks={setTask}
            />
            <CalendarCreateTask
              taskWrapperRect={taskRef?.current?.getBoundingClientRect()}
              gridSize={gridSize}
              addNewTask={setTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Calendar.propTypes = {
  startDate: PropTypes.instanceOf(Date),
};

Calendar.defaultProps = {
  startDate: new Date(),
};
