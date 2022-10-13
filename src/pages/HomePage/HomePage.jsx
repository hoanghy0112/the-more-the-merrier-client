import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Profile from '../../features/userManagement/Profile';

import styles from './HomePage.module.scss';

export default function HomePage() {
  useEffect(() => {
    // dispatch(getUserProfile());
  }, []);

  return (
<<<<<<< HEAD
    // <Calendar />
    <div>
      This is Home page
      <TabButton isSelected={false} />
      <Tag type="tagPending" shape="rectangle" input="UIT" />
      <DateTimePicker startDay={new Date()} hanldeChangeStartDay={() => {}} />
      <Calendar />
=======
    <div className={styles.container}>
      <div className={styles.informationBox}>
        <Profile />
      </div>
      <div className={styles.mainBox}>
        <div className={styles.header}>Logo</div>
        <Outlet />
      </div>
>>>>>>> af46f53adf33c581bedd4b8aa1eb8e2c3a176281
    </div>
  );
}
