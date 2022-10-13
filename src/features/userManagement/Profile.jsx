import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase/signInWithGoogleAPI';

import styles from './Profile.module.scss';
import { getUserProfile, selectUserProfile } from './ProfileSlice';

export default function Profile() {
  // const {} = useSelector(selectUserProfile);
  const dispatch = useDispatch();

  const user = useSelector(selectUserProfile);

  useEffect(() => {
    onAuthStateChanged(auth, (userProfile) => {
      if (userProfile) {
        dispatch(getUserProfile());
      } else {
        console.log('Please sign up');
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      {user ? (
        <>
          <div className={styles.imageContainer}>
            <img src={user.photo} alt="avatar" />
          </div>
          <div className={styles.nameContainer}>
            <p className={styles.name}>
              {`${user.familyName} ${user.givenName}`}
            </p>
            <p className={styles.email}>{user.email}</p>
          </div>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
