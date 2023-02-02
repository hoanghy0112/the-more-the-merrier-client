/* eslint-disable react/prop-types */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Calendar from '../Calendar/Calendar';

import {
  changeTaskOfGroup,
  createTaskOfGroup,
  selectCurrentGroupInfo,
  selectGroupBusyTime,
  selectGroupTaskOfCurrentGroup,
} from '../../../groupsManagement/groupSlice';
import useGroupBusyTime from '../../../groupsManagement/hooks/useGroupBusyTime';
import useGroupTask from '../../../groupsManagement/hooks/useGroupTask';
import { selectPersonalStartAndEndOfWeek } from '../../../tasksManagement/TasksSlice';

export default function GroupCalendar() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { startDate, endDate } = useSelector(selectPersonalStartAndEndOfWeek);

  const groupID = location.pathname.split('/').slice(-1)[0];
  const currentGroupInfo = useSelector(selectCurrentGroupInfo);
  const groupBusyTimes = useSelector(selectGroupBusyTime);

  const tasks = useSelector(selectGroupTaskOfCurrentGroup);

  useGroupBusyTime(groupID, startDate, endDate);

  useGroupTask(groupID, startDate, endDate);

  return (
    <Calendar
      startDate={startDate}
      tasks={tasks}
      groupBusyTimes={groupBusyTimes}
      createNewTask={(data) => {
        dispatch(createTaskOfGroup({ groupID: currentGroupInfo._id, ...data }));
      }}
      changeTask={(data) => {
        dispatch(changeTaskOfGroup({ data }));
      }}
      isGroup
    />
  );
}

GroupCalendar.propTypes = {};

GroupCalendar.defaultProps = {};
