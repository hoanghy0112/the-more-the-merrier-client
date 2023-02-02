import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  changeTask,
  createNewTask,
  selectCurrentWeekTasks,
  selectPersonalMonday,
} from '../../../tasksManagement/TasksSlice';

import Calendar from '../Calendar/Calendar';

export default function PersonalCalendar() {
  const dispatch = useDispatch();

  const startDate = useSelector(selectPersonalMonday);
  const tasks = useSelector(selectCurrentWeekTasks(startDate));

  return (
    <Calendar
      startDate={startDate}
      tasks={tasks}
      changeTask={(data) => dispatch(changeTask(data))}
      createNewTask={(data) => dispatch(createNewTask(data))}
    />
  );
}

PersonalCalendar.propTypes = {};

PersonalCalendar.defaultProps = {};
