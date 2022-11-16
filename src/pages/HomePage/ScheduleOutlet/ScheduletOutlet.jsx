/* eslint-disable react/jsx-no-bind */
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DateTimePicker from '../../../components/DateTimePicker/DateTimePicker';

import PersonalCalendar from '../../../features/calendar/components/PersonalCalendar/PersonalCalendar';
import TagsBar from '../../../features/tagsManagement/components/TagBar/TagsBar';
import { getAllTasks } from '../../../features/tasksManagement/TasksSlice';

import styles from './ScheduleOutlet.module.scss';

export default function ScheduleOutlet() {
  const dispatch = useDispatch();
  const now = new Date();

  const [date, setDate] = useState(
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - now.getDay() + 1,
    ),
  );

  function handleChangeDate(newDate) {
    setDate(
      new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate() - newDate.getDay() + 1,
      ),
    );
  }

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getAllTasks());
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        <div className={styles.picker}>
          <DateTimePicker
            startDay={date}
            hanldeChangeStartDay={handleChangeDate}
          />
        </div>
        <div className={styles.calendarMain}>
          <PersonalCalendar startDate={date} />
        </div>
      </div>
      <div className={styles.sideMenu}>
        <TagsBar />
      </div>
    </div>
  );
}
