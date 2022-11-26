import React from 'react';
import { useSelector } from 'react-redux';

import styles from './ProfileOutlet.module.scss';
import { selectUserProfile } from '../../../features/userManagement/ProfileSlice';

import Info from '../../../components/UserProfile/Info';

export default function ProfileOutlet() {
  const user = useSelector(selectUserProfile);
  return (
    <div className={styles.container}>
      <Info 
      familyName={user.familyName}
      givenName={user.givenName}
      email={user.email} 
      photo={user.photo}
      />
    </div>
  );
}