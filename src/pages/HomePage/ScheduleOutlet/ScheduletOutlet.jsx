/* eslint-disable react/jsx-no-bind */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '../../../components/DateTimePicker/DateTimePicker';

import PersonalCalendar from '../../../features/calendar/components/PersonalCalendar/PersonalCalendar';
import TagsBar from '../../../features/tagsManagement/components/TagBar/TagsBar';

import {
  selectPersonalStartAndEndOfWeek,
  updatePersonalDate,
} from '../../../features/tasksManagement/TasksSlice';
import usePersonalTask from '../../../features/tasksManagement/hooks/usePersonalTask';
import styles from './ScheduleOutlet.module.scss';
import { getTimeOfDate } from '../../../utils/calendar.utils';
import InstructionModal from '../../../components/InstructionModal/InstructionModal';

export default function ScheduleOutlet() {
  const dispatch = useDispatch();

  const { startDate, endDate } = useSelector(selectPersonalStartAndEndOfWeek);
  usePersonalTask(startDate, endDate);

  useEffect(() => {
    dispatch(updatePersonalDate(getTimeOfDate(new Date())));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        <div className={styles.picker}>
          <DateTimePicker />
          <InstructionModal />
        </div>
        <div className={styles.calendarMain}>
          <PersonalCalendar />
        </div>
      </div>
      <div className={styles.sideMenu}>
        <TagsBar />
      </div>
    </div>
  );
}
