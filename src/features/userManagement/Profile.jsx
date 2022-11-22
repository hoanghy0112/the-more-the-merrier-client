import React from 'react';
import { useSelector } from 'react-redux';

import styles from './Profile.module.scss';
import { selectUserProfile } from './ProfileSlice';

export default function Profile() {
  const user = useSelector(selectUserProfile);

  return (
    <div className={styles.container}>
      {user ? (
        <>
          <div className={styles.imageContainer}>
            {user?.photo ? <img src={user.photo} alt="avatar" /> : <div />}
          </div>
          <div className={styles.nameContainer}>
            <div className={styles.name}>
              <p>{`${user.familyName} ${user.givenName}`}</p>
            </div>
            <p className={styles.email}>{user.email}</p>
          </div>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
