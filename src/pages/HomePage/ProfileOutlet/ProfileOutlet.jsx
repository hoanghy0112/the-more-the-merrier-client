import React from 'react';
import { useSelector } from 'react-redux';

import styles from './ProfileOutlet.module.scss';
import { selectUserProfile } from '../../../features/userManagement/ProfileSlice';

import Info from '../../../components/UserProfile/Info/Info';
import BusyChart from '../../../components/UserProfile/BusyChart/BusyChart';
import GroupList from '../../../components/UserProfile/GroupList/GroupList';

export default function ProfileOutlet() {
  const user = useSelector(selectUserProfile);
  return (
    <div className={styles.container}>
      <div className={styles.infochart}>
        <div className={styles.info}>
          <Info 
          familyName={user.familyName}
          givenName={user.givenName}
          email={user.email} 
          photo={user.photo}
          />
        </div>
        <div className={styles.chart}>
          <BusyChart />
        </div>
      </div>
      <div className={styles.groups}>
        <GroupList
        number={2}
        />
      </div>
    </div>
  );
}