/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import {
  createNewTask,
  // getAllTasks,
  selectCurrentWeekTasks,
} from '../../../tasksManagement/TasksSlice';

import CalendarCreateTask from '../CalendarCreateTask/CalendarCreateTask';
import CalendarDisplayTask from '../CalendarDisplayTask/CalendarDisplayTask';
import useWindowSize from '../../../../hooks/useWindowSize';

import CalendarBoard from '../CalendarBoard/CalendarBoard';

import './Calendar.scss';

export default function Calendar({ startDate }) {
  const [windowWidth] = useWindowSize();

  const [taskRefPosition, setTaskRefPosition] = useState([]);

  const taskRef = useRef(null);

  const [gridSize, setGridSize] = useState(199);

  const tasks = useSelector(selectCurrentWeekTasks(startDate));

  useEffect(() => {
    if (taskRef?.current) {
      setGridSize(taskRef.current.getBoundingClientRect().width / 7);
    }
  }, [taskRef, windowWidth]);

  useEffect(() => {
    setTaskRefPosition(taskRef?.current?.getBoundingClientRect());
  }, []);

  function handleScroll() {
    setTaskRefPosition(taskRef?.current?.getBoundingClientRect());
  }

  return (
    <CalendarBoard onScroll={handleScroll} ref={taskRef}>
      <CalendarDisplayTask
        gridSize={gridSize}
        startDate={startDate}
        rect={taskRef?.current?.getBoundingClientRect()}
        tasks={tasks}
      />
      <CalendarCreateTask
        taskWrapperRect={taskRefPosition}
        gridSize={gridSize}
        startDate={startDate}
        createNewTask={createNewTask}
      />
    </CalendarBoard>
  );
}

Calendar.propTypes = {
  startDate: PropTypes.instanceOf(Date),
};

Calendar.defaultProps = {
  startDate: new Date(),
};
