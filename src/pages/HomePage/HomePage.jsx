import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './HomePage.module.scss';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.informationBox}>InformationBox</div>
      <div className={styles.mainBox}>
        <div className={styles.header}>Logo</div>
        <Outlet />
      </div>
    </div>
  );
}
