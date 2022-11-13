import React from 'react';
import CalendarBoard from '../../calendar/components/CalendarCreateTask/CalendarCreateTask';

import styles from './GroupDetailPage.module.scss';

export default function GroupDetailPage() {
  return (
    <div className={styles.container}>
      <div>
        <CalendarBoard />
      </div>
    </div>
  );
}
