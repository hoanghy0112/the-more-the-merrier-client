/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import DateTimePicker from '../../../components/DateTimePicker/DateTimePicker';

import Calendar from '../../../features/calendar/components/Calendar/Calendar';
import TagsBar from '../../../features/tagsManagement/components/TagBar/TagsBar';

// import styles from './ScheduleOutlet.module.scss';
import styles from './ScheduleOutlet.module.scss';

export default function ScheduleOutlet() {
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
          <Calendar startDate={date} />
        </div>
      </div>
      <div className={styles.sideMenu}>
        <TagsBar />
      </div>
    </div>
  );
}
