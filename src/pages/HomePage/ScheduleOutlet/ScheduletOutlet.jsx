import React from 'react';

import Calendar from '../../../features/calendar/components/Calendar/Calendar';

// import styles from './ScheduleOutlet.module.scss';
import styles from './ScheduleOutlet.module.scss';

export default function ScheduleOutlet() {
  return (
    <div className={styles.container}>
      <Calendar />
    </div>
  );
}
