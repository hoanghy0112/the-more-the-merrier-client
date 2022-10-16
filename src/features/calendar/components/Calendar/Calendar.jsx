/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import { onAuthStateChanged } from 'firebase/auth';

import { useDispatch, useSelector } from 'react-redux';

import DateItem from '../../../../components/DateItem/DateItem';
import TimelineItem from '../../../../components/TimelineItem/TimelineItem';
// import { ResizableBox, Resizable } from "re-resizable";

import CalendarCreateTask from '../../../../components/CalendarCreateTask/CalendarCreateTask';
import CalendarDisplayTask from '../../../../components/CalendarDisplayTask/CalendarDisplayTask';
import useWindowSize from '../../../../hooks/useWindowSize';

import './Calendar.scss';
import {
  changeTask,
  getAllTasks,
  selectCurrentWeekTasks,
} from '../../../tasksManagement/TasksSlice';
import { auth } from '../../../../firebase/signInWithGoogleAPI';

export default function Calendar({ startDate }) {
  const dispatch = useDispatch();

  const [windowWidth] = useWindowSize();

  // const [tasks, setTask] = useState([]);
  const [taskRefPosition, setTaskRefPosition] = useState([]);

  const taskRef = useRef(null);

  const [gridSize, setGridSize] = useState(199);

  const tasks = useSelector(selectCurrentWeekTasks(startDate));

  function setTask({ id, time }) {
    dispatch(changeTask({ id, time }));
    // dispatch(getAllTasks());
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getAllTasks());
      }
    });

    return () => unsubscribe();
  }, []);

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
      <div className="calendar__main" onScroll={handleScroll}>
        <div className="timeline">
          {Array(24)
            .fill()
            .map((_, index) => (
              <TimelineItem time={index} />
            ))}
        </div>
        <div className="task">
          <div ref={taskRef}>
            <CalendarDisplayTask
              gridSize={gridSize}
              tasks={tasks}
              startDate={startDate}
              setTasks={({ id, time }) => setTask({ id, time })}
            />
            <CalendarCreateTask
              taskWrapperRect={taskRefPosition}
              gridSize={gridSize}
              startDate={startDate}
              addNewTask={({ title }) =>
                setTask((prev) => [
                  ...prev,
                  {
                    title,
                  },
                ])
              }
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
