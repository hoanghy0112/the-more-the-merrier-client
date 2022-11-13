import React from 'react';

import Calendar from '../../calendar/components/Calendar/Calendar';

import styles from './GroupDetailPage.module.scss';

export default function GroupDetailPage() {
  return (
    <div className={styles.container}>
      <div>
        <Calendar />
      </div>
    </div>
  );
}
