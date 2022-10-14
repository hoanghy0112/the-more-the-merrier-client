import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/signInWithGoogleAPI';

import styles from './Profile.module.scss';
import { getUserProfile, selectUserProfile } from './ProfileSlice';

export default function Profile() {
  // const {} = useSelector(selectUserProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUserProfile);

  useEffect(() => {
    onAuthStateChanged(auth, (userProfile) => {
      if (userProfile) {
        dispatch(getUserProfile());
      } else {
        navigate('/authentication');
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
            <div className={styles.name}>
              <p>{`${user.familyName} ${user.givenName}`}</p>
            </div>
            <p className={styles.email}>
              {/* {`${user.email.substring(0, 10)}...`} */}
              {user.email}
            </p>
          </div>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
