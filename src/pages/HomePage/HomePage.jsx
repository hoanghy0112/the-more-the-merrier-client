import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Profile from '../../features/userManagement/Profile';

import styles from './HomePage.module.scss';

export default function HomePage() {
  useEffect(() => {
    // dispatch(getUserProfile());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.informationBox}>
        <Profile />
      </div>
      <div className={styles.mainBox}>
        <div className={styles.header}>Logo</div>
        <Outlet />
      </div>
    </div>
  );
}
