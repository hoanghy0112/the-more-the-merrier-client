import React, { useState } from 'react';
import DateTimePicker from '../../../components/DateTimePicker/DateTimePicker';

import Calendar from '../../../features/calendar/components/Calendar/Calendar';

// import styles from './ScheduleOutlet.module.scss';
import styles from './ScheduleOutlet.module.scss';

export default function ScheduleOutlet() {
  const [date, setDate] = useState(new Date());

  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        <div className={styles.picker}>
          <DateTimePicker startDay={date} hanldeChangeStartDay={setDate} />
        </div>
        <div className={styles.calendarMain}>
          <Calendar startDate={date} />
        </div>
      </div>
      <div className={styles.sideMenu}>tag</div>
    </div>
  );
}
